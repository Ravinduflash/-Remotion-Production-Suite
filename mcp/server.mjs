#!/usr/bin/env node
/**
 * Remotion Production Suite — MCP server
 *
 * Exposes the studio's StudioAPI to any MCP client (Claude Code, Claude Desktop, agents) as tools,
 * plus server-side capabilities the browser cannot do itself: rendering MP4/PNG through the
 * bundled render-project, and writing/registering community components on disk.
 *
 * Transport to the client : stdio (MCP)
 * Transport to the studio : WebSocket bridge (the browser UI auto-connects to ws://localhost:7777)
 *
 *   claude mcp add remotion-studio -- node /abs/path/to/mcp/server.mjs
 *
 * stdout is reserved for MCP framing — log to stderr only.
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { WebSocketServer } from 'ws';
import { z } from 'zod';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORKSPACE = path.resolve(__dirname, '..');
const REMOTION_DIR = path.join(WORKSPACE, 'remotion');
const COMMUNITY_DIR = path.join(REMOTION_DIR, 'community');
const RENDER_PROJECT = process.env.STUDIO_RENDER_PROJECT ? path.resolve(process.env.STUDIO_RENDER_PROJECT) : path.join(WORKSPACE, 'render-project');
const PORT = Number(process.env.STUDIO_WS_PORT || 7777);
const TIMEOUT_MS = Number(process.env.STUDIO_CALL_TIMEOUT || 15000);
const WAIT_MS = Number(process.env.STUDIO_RENDER_WAIT || 50000); // how long render tools block before returning a job id
const log = (...a) => console.error('[remotion-studio-mcp]', ...a);

/* ---------------- WebSocket bridge to the browser UI ---------------- */
// Several studio pages can be connected at once (e.g. the user's open tab plus a headless test page,
// and every page retries the bridge every 4s). Commands must go to ONE stable page, never "whichever
// connected last": the target is the pinned client if set, otherwise the earliest-connected open page.
const clients = new Map();  // clientId → { ws, clientId, connectedAt, href, title }
let pinnedClientId = null;  // set with select_studio
let lastState = null;       // last pushed RemotionWorkspaceState from the target page (served when offline)
let studioMethods = [];     // methods advertised by the target page on hello
const pending = new Map();
let seq = 0, clientSeq = 0;

const openClients = () => [...clients.values()].filter(c => c.ws.readyState === 1).sort((a, b) => a.connectedAt - b.connectedAt);
function target() { const open = openClients(); return open.find(c => c.clientId === pinnedClientId) || open[0] || null; }
const describeClients = () => { const t = target(); return openClients().map(c => ({ clientId: c.clientId, href: c.href, title: c.title, connectedAt: new Date(c.connectedAt).toISOString(), target: c === t, pinned: c.clientId === pinnedClientId })); };

const wss = new WebSocketServer({ port: PORT });
wss.on('listening', () => log(`bridge listening on ws://localhost:${PORT}`));
wss.on('connection', (ws) => {
  const client = { ws, clientId: `studio_${++clientSeq}`, connectedAt: Date.now(), href: null, title: null };
  clients.set(client.clientId, client);
  log(`studio UI connected (${client.clientId}; ${openClients().length} open; target ${target() && target().clientId})`);
  ws.on('message', async (raw) => {
    let msg; try { msg = JSON.parse(raw.toString()); } catch { return; }
    if (msg.event === 'hello') { client.href = msg.href || null; client.title = msg.title || null; if (target() === client) studioMethods = msg.api || []; return; }
    if (msg.event === 'state') { if (target() === client) lastState = msg.state; return; }
    if (msg.event === 'render') { // UI "Render" button → run a job and report back
      const job = createJob('render', msg.params || {});
      const progress = (message) => { try { ws.send(JSON.stringify({ event: 'renderProgress', id: msg.id, message })); } catch { } };
      runJob(job, progress).then(() => ws.send(JSON.stringify({ event: 'renderResult', id: msg.id, ok: job.status === 'done', outFile: job.outFile, error: job.error, log: job.log.slice(-1500) }))).catch(() => { });
      return;
    }
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject, timer } = pending.get(msg.id); clearTimeout(timer); pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error)) : resolve(msg.result);
    }
  });
  ws.on('close', () => { clients.delete(client.clientId); if (pinnedClientId === client.clientId) pinnedClientId = null; log(`studio UI disconnected (${client.clientId}; ${openClients().length} open)`); });
  ws.on('error', (e) => log('socket error', e.message));
});

function sendTo(client, method, params) {
  return new Promise((resolve, reject) => {
    const id = ++seq;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`Studio call timed out: ${method}`)); }, TIMEOUT_MS);
    pending.set(id, { resolve, reject, timer });
    client.ws.send(JSON.stringify({ id, method, params }));
  });
}
function call(method, params = {}) {
  const t = target();
  if (!t) return Promise.reject(new Error(`Studio UI is not connected. Open index.html in a browser — it auto-connects to ws://localhost:${PORT} (header pill turns green).`));
  return sendTo(t, method, params);
}
/** Catalog changes (register_component) go to every open page so their catalogs never diverge. */
async function broadcast(method, params = {}) {
  const t = target(); if (!t) throw new Error('Studio UI is not connected.');
  const result = await sendTo(t, method, params);
  const others = openClients().filter(c => c !== t);
  const settled = await Promise.allSettled(others.map(c => sendTo(c, method, params)));
  return { result, alsoApplied: others.map((c, i) => ({ clientId: c.clientId, ok: settled[i].status === 'fulfilled' })) };
}

/* ---------------- render jobs ---------------- */
const jobs = new Map();
let jobSeq = 0;
function createJob(kind, params) { const id = `${kind}_${Date.now().toString(36)}_${++jobSeq}`; const job = { id, kind, params, status: 'queued', progress: 0, log: '', outFile: null, error: null, startedAt: Date.now(), finishedAt: null }; jobs.set(id, job); return job; }
const publicJob = (j) => ({ jobId: j.id, kind: j.kind, status: j.status, progress: j.progress, outFile: j.outFile, error: j.error, seconds: Math.round(((j.finishedAt || Date.now()) - j.startedAt) / 1000), logTail: j.log.slice(-1200) });

function copyDir(src, dst) { fs.mkdirSync(dst, { recursive: true }); for (const e of fs.readdirSync(src, { withFileTypes: true })) { const s = path.join(src, e.name), d = path.join(dst, e.name); if (e.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d); } }
function run(cmd, args, cwd, onLine) {
  return new Promise((resolve) => {
    const isWin = process.platform === 'win32';
    const child = spawn(isWin ? `${cmd}.cmd` : cmd, args, { cwd, shell: isWin, env: { ...process.env, FORCE_COLOR: '0', CI: '1' } });
    let out = '';
    const feed = (d) => { const t = d.toString(); out += t; t.split(/\r?\n|\r/).forEach(l => l.trim() && onLine && onLine(l.trim())); };
    child.stdout.on('data', feed); child.stderr.on('data', feed);
    child.on('error', (e) => resolve({ code: -1, out: out + '\n' + e.message }));
    child.on('close', (code) => resolve({ code, out }));
  });
}
async function runJob(job, progress = () => { }) {
  const say = (m) => { job.log += m + '\n'; progress(m); };
  try {
    if (!fs.existsSync(path.join(RENDER_PROJECT, 'package.json'))) throw new Error(`Render project not found at ${RENDER_PROJECT}. Set STUDIO_RENDER_PROJECT or restore render-project/.`);
    job.status = 'exporting'; say('Exporting scene from studio…');
    const bundle = await call('exportRemotion');
    // 1. sync component library + export into the render project
    copyDir(REMOTION_DIR, path.join(RENDER_PROJECT, 'src', 'remotion'));
    fs.writeFileSync(path.join(RENDER_PROJECT, 'src', 'MasterScene.tsx'), bundle.files['MasterScene.tsx']);
    fs.writeFileSync(path.join(RENDER_PROJECT, 'src', 'scene.json'), bundle.files['scene.json']);
    // 2. dependencies
    const nm = path.join(RENDER_PROJECT, 'node_modules');
    if (!fs.existsSync(nm)) { job.status = 'installing'; say('First run: npm install in render-project (this can take a few minutes)…'); const r = await run('npm', ['install', '--no-audit', '--no-fund'], RENDER_PROJECT, (l) => { if (/added|warn|ERR/.test(l)) say(l); }); if (r.code !== 0) throw new Error('npm install failed:\n' + r.out.slice(-2000)); }
    const remotionVersion = (() => { try { return JSON.parse(fs.readFileSync(path.join(nm, 'remotion', 'package.json'), 'utf8')).version; } catch { return null; } })();
    // @remotion/* packages must match the installed remotion version exactly, or Remotion refuses to render.
    const missing = (bundle.packages || []).filter(p => !fs.existsSync(path.join(nm, ...p.split('/')))).map(p => (remotionVersion && (p.startsWith('@remotion/') || p === 'remotion') && !/@[\d^~]/.test(p.slice(1))) ? `${p}@${remotionVersion}` : p);
    if (missing.length) { job.status = 'installing'; say('Installing missing packages: ' + missing.join(' ')); const r = await run('npm', ['install', '--no-audit', '--no-fund', ...missing], RENDER_PROJECT, () => { }); if (r.code !== 0) throw new Error('npm install failed for ' + missing.join(' ') + ':\n' + r.out.slice(-2000)); }
    // 3. render
    fs.mkdirSync(path.join(RENDER_PROJECT, 'out'), { recursive: true });
    const safeName = String(job.params.outName || bundle.name || 'master').replace(/[^\w.-]+/g, '_');
    job.status = 'rendering';
    let args;
    if (job.kind === 'still') {
      const frame = Math.max(0, Math.round(job.params.frame || 0));
      job.outFile = path.join(RENDER_PROJECT, 'out', `${safeName}-f${frame}.png`);
      args = ['remotion', 'still', 'src/index.ts', 'MasterScene', job.outFile, `--frame=${frame}`, '--overwrite'];
      if (job.params.scale) args.push(`--scale=${job.params.scale}`);
    } else {
      const codec = job.params.codec || 'h264'; const ext = codec === 'gif' ? 'gif' : codec === 'vp8' || codec === 'vp9' ? 'webm' : codec === 'prores' ? 'mov' : 'mp4';
      job.outFile = path.join(RENDER_PROJECT, 'out', `${safeName}.${ext}`);
      args = ['remotion', 'render', 'src/index.ts', 'MasterScene', job.outFile, `--codec=${codec}`, '--overwrite'];
      if (job.params.scale) args.push(`--scale=${job.params.scale}`);
      if (job.params.frames) args.push(`--frames=${job.params.frames}`);
      if (job.params.concurrency) args.push(`--concurrency=${job.params.concurrency}`);
      if (job.params.muted) args.push('--muted');
    }
    say(`npx ${args.join(' ')}`);
    const r = await run('npx', args, RENDER_PROJECT, (l) => { const m = l.match(/(\d+)\/(\d+)/); if (m && /render|frame/i.test(l)) { job.progress = Math.round(+m[1] / +m[2] * 100); } if (/Rendered|Encoded|Bundled|Error|error|Downloading|Chrome/i.test(l)) say(l); });
    if (r.code !== 0) throw new Error(`remotion exited with code ${r.code}:\n` + r.out.slice(-3000));
    if (!fs.existsSync(job.outFile)) throw new Error('Render finished but output file is missing:\n' + r.out.slice(-2000));
    job.status = 'done'; job.progress = 100; job.finishedAt = Date.now(); say(`Done → ${job.outFile} (${(fs.statSync(job.outFile).size / 1048576).toFixed(2)} MB)`);
  } catch (e) { job.status = 'error'; job.error = e.message; job.finishedAt = Date.now(); say('ERROR ' + e.message); }
  return job;
}
async function startAndMaybeWait(job, wait) {
  const p = runJob(job);
  if (wait === false) return { ...publicJob(job), note: 'Running in background. Poll render_status with this jobId.' };
  await Promise.race([p, new Promise(r => setTimeout(r, WAIT_MS))]);
  return job.status === 'done' || job.status === 'error' ? publicJob(job) : { ...publicJob(job), note: `Still ${job.status} after ${Math.round(WAIT_MS / 1000)}s. Poll render_status {jobId} until status is done.` };
}

/* ---------------- community component files / manifest ---------------- */
const MANIFEST = path.join(COMMUNITY_DIR, 'manifest.js');
const manifestStart = (t) => { const k = t.indexOf('window.CommunityManifest'); return k < 0 ? -1 : t.indexOf('[', k); };
function readManifest() { if (!fs.existsSync(MANIFEST)) return []; const t = fs.readFileSync(MANIFEST, 'utf8'); const a = manifestStart(t), b = t.lastIndexOf(']'); if (a < 0 || b < 0) return []; try { return JSON.parse(t.slice(a, b + 1)); } catch (e) { throw new Error('manifest.js is not parseable JSON: ' + e.message); } }
function writeManifest(entries) { const t = fs.existsSync(MANIFEST) ? fs.readFileSync(MANIFEST, 'utf8') : 'window.CommunityManifest = [];\n'; const a = manifestStart(t), b = t.lastIndexOf(']'); const head = a >= 0 ? t.slice(0, a) : t + '\nwindow.CommunityManifest = '; const tail = b >= 0 ? t.slice(b + 1) : ';\n'; fs.writeFileSync(MANIFEST, head + JSON.stringify(entries, null, 2) + tail); }
const safeFile = (name) => { if (!/^[\w-]+\.(tsx|ts|jsx|js|css|json)$/.test(name)) throw new Error('fileName must match /^[\\w-]+\\.(tsx|ts|jsx|js|css|json)$/'); return path.join(COMMUNITY_DIR, name); };

/* ---------------- MCP server ---------------- */
const server = new McpServer({ name: 'remotion-production-suite', version: '1.1.0' });
const asText = (v) => ({ content: [{ type: 'text', text: typeof v === 'string' ? v : JSON.stringify(v, null, 2) }] });
function tool(name, description, shape, handler) {
  server.registerTool(name, { description, inputSchema: shape }, async (args) => {
    try { return asText(await handler(args || {})); }
    catch (e) { return { content: [{ type: 'text', text: `ERROR: ${e.message}` }], isError: true }; }
  });
}

const props = z.object({ baseX: z.number().optional(), baseY: z.number().optional(), scale: z.number().optional(), rotation: z.number().optional(), opacity: z.number().optional(), customProperties: z.record(z.any()).optional() }).passthrough();
const keyframe = z.object({ frame: z.number(), easing: z.enum(['linear', 'easeInOut', 'easeOut', 'spring']).optional(), properties: props });
const easing = z.enum(['linear', 'easeInOut', 'easeOut', 'spring']).optional();

/* --- status & discovery --- */
tool('studio_status', 'Is the browser studio connected? Returns connection state, render project path and a scene summary.', {}, async () => ({
  connected: !!target(), studios: describeClients(), bridge: `ws://localhost:${PORT}`, renderProject: RENDER_PROJECT, renderProjectInstalled: fs.existsSync(path.join(RENDER_PROJECT, 'node_modules')), methods: studioMethods,
  scene: lastState ? { name: lastState.name, size: `${lastState.width}x${lastState.height}`, fps: lastState.fps, totalFrames: lastState.totalFrames, currentFrame: Math.round(lastState.currentFrame || 0), assets: lastState.assets.map(a => ({ id: a.id, name: a.name, type: a.type, componentName: a.componentName, keyframes: a.keyframes.length, visible: a.visible !== false })) } : null,
}));
tool('select_studio', 'Choose which connected studio page receives commands, when several are open (see studio_status.studios). Omit clientId to go back to the default: the earliest-connected page.', { clientId: z.string().optional() }, (a) => { if (a.clientId && !openClients().some(c => c.clientId === a.clientId)) throw new Error('No open studio with clientId ' + a.clientId); pinnedClientId = a.clientId || null; return { target: target() && target().clientId, studios: describeClients() }; });
tool('list_catalog', 'All assets that can be added to a scene (characters, environments, widgets, 3D, media, community), with default properties, inspector control schemas, presets and modifiers. Call this first so you know what you can build with.', {}, () => call('listCatalog'));
tool('list_presets', 'Martial-arts choreography presets that can be applied to character assets.', {}, () => call('listPresets'));
tool('list_modifiers', 'Context-aware motion generators available for an asset (bullish/bearish for charts, spin for 3D, fade/pop for text and media…).', { assetId: z.string().optional() }, (a) => call('listModifiers', a));
tool('list_aspect_ratios', 'Composition size presets (16:9, 9:16, 1:1, 4:5, 4:3, 3:4, 21:9, 2:3, 4K, 9:16-4K) and which one is active.', {}, () => call('listAspectRatios'));

/* --- scene --- */
tool('get_scene', 'Full RemotionWorkspaceState JSON (assets with keyframes, timeline settings).', {}, async () => { try { return await call('getState'); } catch (e) { if (lastState) return { offline: true, ...lastState }; throw e; } });
tool('set_scene', 'Replace the whole scene with a RemotionWorkspaceState JSON object.', { state: z.record(z.any()) }, (a) => call('setState', a));
tool('clear_scene', 'Remove every asset from the scene. Keeps the canvas size, fps and duration: call set_aspect / set_timeline afterwards if the next scene needs different ones.', {}, () => call('clearScene'));
tool('set_aspect', 'Set the composition aspect ratio / size. preset from list_aspect_ratios, or explicit width+height. refit (default true) re-maps asset positions and full-frame backgrounds to the new size.', { preset: z.string().optional(), width: z.number().optional(), height: z.number().optional(), refit: z.boolean().optional() }, (a) => call('setAspect', a));
tool('set_timeline', 'Set totalFrames, fps, background colour or scene name (use set_aspect for size).', { totalFrames: z.number().optional(), fps: z.number().optional(), background: z.string().optional(), name: z.string().optional() }, (a) => call('setTimeline', a));
tool('check_scene', 'Validate the scene and get structured critique: off-screen assets, characters clipping the floor, overlapping characters, title-safe violations, keyframes past the duration, missing background, unused duration, required npm packages. Returns {ok, score, errors[], warnings[], info[]} with suggested fixes. Run it after building and before rendering.', {}, () => call('validateScene'));

/* --- assets --- */
tool('add_asset', 'Add a catalog asset to the scene as a new layer. properties override the catalog defaults for the first keyframe; keyframes[] can define the whole track at once.', {
  catalogId: z.string().describe('from list_catalog, e.g. stickman_fighter, house, trading_chart, three_box, remotion_img, shape_star'),
  id: z.string().optional().describe('stable id you choose, e.g. "hero"'), name: z.string().optional(), frame: z.number().optional().describe('frame of the first keyframe (default 0)'),
  properties: props.optional(), keyframes: z.array(keyframe).optional(), index: z.number().optional().describe('layer index, 0 = back'),
}, (a) => call('addAsset', a));
tool('update_asset', 'Rename, hide/show, lock/unlock or change the default easing of a layer.', { assetId: z.string(), name: z.string().optional(), visible: z.boolean().optional(), locked: z.boolean().optional(), easing }, (a) => call('updateAsset', a));
tool('delete_asset', 'Remove a layer.', { assetId: z.string() }, (a) => call('deleteAsset', a));
tool('duplicate_asset', 'Duplicate a layer (offset 60px).', { assetId: z.string() }, (a) => call('duplicateAsset', a));
tool('reorder_asset', 'Change z-order. direction up = towards the front.', { assetId: z.string(), direction: z.enum(['up', 'down', 'top', 'bottom']).optional(), index: z.number().optional() }, (a) => call('reorderAsset', a));
tool('select_asset', 'Select a layer in the UI (drives the inspector / presets panel).', { assetId: z.string().nullable() }, (a) => call('selectAsset', a));

/* --- keyframes & motion --- */
tool('set_keyframe', 'Create or update the keyframe of an asset at a frame. properties are merged into the interpolated state at that frame, so pass only what changes (e.g. {customProperties:{rightShoulder:15}}).', { assetId: z.string(), frame: z.number(), properties: props, easing, merge: z.boolean().optional() }, (a) => call('updateAssetKeyframe', a));
tool('set_keyframes', 'Replace the entire keyframe track of an asset.', { assetId: z.string(), keyframes: z.array(keyframe) }, (a) => call('setKeyframes', a));
tool('remove_keyframe', 'Delete the keyframe at a frame.', { assetId: z.string(), frame: z.number() }, (a) => call('removeKeyframe', a));
tool('move_keyframe', 'Retime a keyframe.', { assetId: z.string(), frame: z.number(), toFrame: z.number() }, (a) => call('moveKeyframe', a));
tool('set_property', 'Set one property (or one customProperties key with custom:true) on the keyframe at a frame (auto-keys).', { assetId: z.string(), key: z.string(), value: z.any(), custom: z.boolean().optional(), frame: z.number().optional() }, (a) => call('setProperty', a));
tool('apply_preset', 'Apply a martial-arts preset to a character starting at startFrame (relative motion, keeps position/colours). mirror flips facing.', { assetId: z.string(), preset: z.string(), startFrame: z.number().optional(), mirror: z.boolean().optional(), play: z.boolean().optional() }, (a) => call('applyPreset', { ...a, play: a.play ?? false }));
tool('apply_modifier', 'Apply a context-aware motion generator (see list_modifiers) to an asset starting at startFrame; duration rescales it.', { assetId: z.string(), modifier: z.string(), startFrame: z.number().optional(), duration: z.number().optional() }, (a) => call('applyModifier', a));
tool('generate_from_prompt', 'Keyword choreography: "crouching low sweep kick, arms flare" → preset + modifiers on a character.', { prompt: z.string(), assetId: z.string().optional(), startFrame: z.number().optional() }, (a) => call('generateFromPrompt', { ...a, play: false }));
tool('set_frame', 'Move the playhead.', { frame: z.number() }, (a) => call('changeCurrentFrame', a));
tool('play', 'Start playback in the UI.', {}, () => call('play'));
tool('pause', 'Pause playback in the UI.', {}, () => call('pause'));

/* --- export & render --- */
tool('export_json', 'scene.json for remotion/Root.tsx.', {}, () => call('exportJSON'));
tool('export_remotion', 'Full export bundle: scene.json, MasterScene.tsx, Root.tsx, mcp-manifest.json, plus .packages (npm deps needed). Pass file to get a single file as text.', { file: z.string().optional() }, async (a) => { const b = await call('exportRemotion'); return a.file ? (b.files[a.file] ?? `Unknown file. Available: ${Object.keys(b.files).join(', ')}`) : b; });
tool('render_scene', `Render the current scene to a video with Remotion (real pixels, not the preview). Syncs remotion/ + the export into ${path.basename(RENDER_PROJECT)}/, installs missing packages, runs "npx remotion render". Blocks up to ${Math.round(WAIT_MS / 1000)}s then returns a jobId to poll with render_status. First run also needs npm install + Chrome download (minutes). Returns the absolute output path.`, {
  codec: z.enum(['h264', 'h265', 'vp8', 'vp9', 'prores', 'gif']).optional(), scale: z.number().optional().describe('e.g. 0.5 for a fast half-res proof'), frames: z.string().optional().describe('range like "0-59"'), outName: z.string().optional(), concurrency: z.number().optional(), muted: z.boolean().optional(), wait: z.boolean().optional().describe('false → return immediately with jobId'),
}, (a) => startAndMaybeWait(createJob('render', a), a.wait));
tool('render_still', 'Render ONE frame to PNG with Remotion — the cheapest way for an agent to see the real output. Read the returned PNG path with your file/image tool, critique, adjust, repeat.', { frame: z.number(), scale: z.number().optional(), outName: z.string().optional(), wait: z.boolean().optional() }, (a) => startAndMaybeWait(createJob('still', a), a.wait));
tool('render_status', 'Status of a render job (queued|exporting|installing|rendering|done|error), progress %, output path and log tail. Omit jobId to list all jobs.', { jobId: z.string().optional() }, (a) => a.jobId ? (jobs.has(a.jobId) ? publicJob(jobs.get(a.jobId)) : (() => { throw new Error('Unknown jobId'); })()) : [...jobs.values()].map(publicJob));

/* --- community / external components (asset registry over the Remotion ecosystem) --- */
tool('list_component_files', 'List component source files in remotion/community/ and the registered manifest entries.', {}, () => ({ dir: COMMUNITY_DIR, files: fs.existsSync(COMMUNITY_DIR) ? fs.readdirSync(COMMUNITY_DIR).filter(f => f !== 'manifest.js') : [], manifest: readManifest().map(m => ({ id: m.id, componentName: m.componentName, importPath: m.external && m.external.importPath })) }));
tool('read_component_file', 'Read a file from remotion/community/.', { fileName: z.string() }, (a) => fs.readFileSync(safeFile(a.fileName), 'utf8'));
tool('write_component_file', 'Save Remotion component source code (e.g. pasted from remotion.dev, GitHub or a blog) into remotion/community/<fileName>. Then call register_component to describe its props so it appears in the catalog. Component must be a React component exported by name (or default) that takes plain props; it may use useCurrentFrame/useVideoConfig/spring/interpolate from remotion.', { fileName: z.string().describe('e.g. GlitchTitle.tsx'), code: z.string(), overwrite: z.boolean().optional() }, (a) => { const f = safeFile(a.fileName); if (fs.existsSync(f) && !a.overwrite) throw new Error('File exists; pass overwrite:true'); fs.mkdirSync(COMMUNITY_DIR, { recursive: true }); fs.writeFileSync(f, a.code); return { ok: true, path: f, next: `register_component { entry: { id, componentName: '<ExportName>', external: { importPath: './community/${a.fileName.replace(/\.(tsx|ts|jsx|js)$/, '')}', exportName: '<ExportName>|default', sizeMode: 'style' }, defaults: { customProperties: {...} }, controls: [...] }, persist: true }` }; });
tool('register_component', 'Register an external/community Remotion component as a catalog asset (wrapper with a prop schema). external.importPath is an npm package ("@remotion/shapes") or a file relative to remotion/ ("./community/GlitchTitle"); external.package installs it in the render project; sizeMode: style (style={{width,height}}) | props | none. controls drive the inspector; preview {kind: card|text|image|video|audio|shape}. persist:true also writes it into remotion/community/manifest.js so it survives reloads.', {
  entry: z.object({ id: z.string(), componentName: z.string(), name: z.string().optional(), desc: z.string().optional(), icon: z.string().optional(), tab: z.string().optional(),
    external: z.object({ importPath: z.string(), exportName: z.string(), package: z.string().optional(), packages: z.array(z.string()).optional(), sizeMode: z.enum(['style', 'props', 'none']).optional(), omitProps: z.array(z.string()).optional(), styleMap: z.record(z.string()).optional() }),
    defaults: z.record(z.any()).optional(), controls: z.array(z.record(z.any())).optional(), preview: z.record(z.any()).optional(), easing }).passthrough(),
  persist: z.boolean().optional(),
}, async (a) => { const b = await broadcast('registerComponent', { entry: a.entry }); const r = { ...b.result, alsoAppliedTo: b.alsoApplied }; if (a.persist) { const m = readManifest(); const i = m.findIndex(x => x.id === a.entry.id); if (i >= 0) m[i] = a.entry; else m.push(a.entry); writeManifest(m); r.persisted = MANIFEST; } return r; });
tool('unregister_component', 'Remove a community component from remotion/community/manifest.js (takes effect after the studio reloads).', { id: z.string() }, (a) => { const m = readManifest(); const n = m.filter(x => x.id !== a.id); writeManifest(n); return { removed: m.length - n.length }; });
tool('call_studio', 'Escape hatch: call any StudioAPI method by name (see studio_status.methods).', { method: z.string(), params: z.record(z.any()).optional() }, (a) => call(a.method, a.params || {}));

server.registerResource('scene', 'studio://scene', { description: 'Live RemotionWorkspaceState pushed by the studio UI', mimeType: 'application/json' }, async (uri) => ({ contents: [{ uri: uri.href, mimeType: 'application/json', text: JSON.stringify(lastState || { note: 'studio not connected yet' }, null, 2) }] }));

const transport = new StdioServerTransport();
await server.connect(transport);
log(`MCP server ready (stdio) • render project: ${RENDER_PROJECT}`);
