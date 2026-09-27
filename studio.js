/* =====================================================================
   REMOTION PRODUCTION SUITE — STUDIO CORE
   State (RemotionWorkspaceState) → StudioAPI (mutations, MCP surface)
   → renderers (viewport / inspector / scene tree / timeline / export)
   ===================================================================== */
(function () {
  'use strict';
  const { CATALOG, CATALOG_BY_ID, PRESETS, MODIFIERS, GUARD, JOINT_KEYS, ASPECT_PRESETS, calcRig, presetFromPrompt, buildExternalEntry, esc } = window.StudioCatalog;

  /* ---------------- UTILS ---------------- */
  const $ = id => document.getElementById(id);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const clone = o => JSON.parse(JSON.stringify(o));
  const uid = (p) => p + '_' + Math.random().toString(36).slice(2, 7);
  const round2 = n => Math.round(n * 100) / 100;
  const isNum = v => typeof v === 'number' && !isNaN(v);
  const wrapIds = a => !a || !a.wraps ? [] : Array.isArray(a.wraps) ? a.wraps : Object.values(a.wraps).flat(); // wrapper layer → ids of the layers it renders as children
  const wrapperOf = id => store.assets.find(o => wrapIds(o).includes(id));
  function setWraps(a, value) { // value: ids[] | { slot: ids[] } | "a, b" | "chat: a, b; preview: c" | null
    const spec = a.external && a.external.children; if (!spec) throw new Error(`"${a.name}" is not a wrapper component (its catalog entry has no external.children)`);
    const list = v => (Array.isArray(v) ? v : String(v).split(',')).map(x => String(x).trim()).filter(Boolean);
    let norm = value;
    if (typeof value === 'string') norm = value.includes(':') ? Object.fromEntries(value.split(';').map(part => part.split(':')).filter(kv => kv.length === 2).map(([k, v]) => [k.trim(), list(v)])) : list(value);
    if (norm === null || (Array.isArray(norm) && !norm.length) || (!Array.isArray(norm) && typeof norm === 'object' && !Object.values(norm).flat().length)) { delete a.wraps; return; }
    if (spec.slots) { if (Array.isArray(norm)) norm = { [spec.slots[0]]: norm }; Object.keys(norm).forEach(k => { if (!spec.slots.includes(k)) throw new Error(`Unknown slot "${k}"; "${a.name}" has slots: ${spec.slots.join(', ')}`); norm[k] = list(norm[k]); }); }
    else if (!Array.isArray(norm)) norm = list(Object.values(norm).flat());
    const ids = Array.isArray(norm) ? norm : Object.values(norm).flat();
    ids.forEach(id => { const c = getAsset(id); if (!c) throw new Error('Unknown assetId in wraps: ' + id); if (id === a.id) throw new Error('A layer cannot wrap itself'); if (c.type === 'three') throw new Error('3D layers render in the shared ThreeCanvas and cannot be wrapped'); const o = wrapperOf(id); if (o && o !== a) throw new Error(`"${c.name}" is already wrapped by "${o.name}"`); });
    const reaches = (id, seen) => { if (id === a.id) return true; if (seen.has(id)) return false; seen.add(id); return wrapIds(getAsset(id)).some(c => reaches(c, seen)); };
    if (ids.some(id => reaches(id, new Set()))) throw new Error('That wrapping would create a cycle');
    a.wraps = norm;
  }
  const SVGNS = 'http://www.w3.org/2000/svg';
  function toast(msg) { const t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 1400); }
  function download(name, text) { const blob = new Blob([text], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
  function copy(text) { navigator.clipboard.writeText(text).then(() => toast('Copied to clipboard')); }

  const EASE = {
    linear: t => t,
    easeInOut: t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    easeOut: t => 1 - Math.pow(1 - t, 3),
    spring: (t) => { if (t <= 0) return 0; if (t >= 1) return 1; const mass = 0.5, damping = 12; const omega = Math.sqrt(20 / mass); const zeta = damping / (2 * Math.sqrt(20 * mass)); const decay = Math.exp(-zeta * omega * t * 2.5); const osc = Math.cos(omega * t * 6); return 1 - decay * (1 - t) * (0.5 + 0.5 * osc); }
  };

  /* ---------------- STATE ---------------- */
  // RemotionWorkspaceState (see README / SceneRenderer.tsx for the TypeScript interface)
  let store = { version: 1, name: 'Untitled Scene', width: 1920, height: 1080, fps: 60, totalFrames: 120, currentFrame: 0, background: '#0a0a0f', selectedAssetId: null, assets: [] };
  const ui = { tab: 'characters', isPlaying: false, loop: true, speed: 1, selectedKeyframe: null, drag: null, lastTime: 0, fpsSmooth: 60, inspectorAsset: null, bridgeUrl: new URLSearchParams(location.search).get('bridge') || localStorage.getItem('rps.bridgeUrl') || 'ws://localhost:7777' };
  const history = { past: [], future: [], last: '' };
  const listeners = new Set();

  function snapshot() { return JSON.stringify(store); }
  function pushHistory() { const s = snapshot(); if (s === history.last) return; if (history.last) history.past.push(history.last); if (history.past.length > 60) history.past.shift(); history.future = []; history.last = s; updateUndoButtons(); }
  function undo() { if (!history.past.length) return; history.future.push(history.last); history.last = history.past.pop(); store = JSON.parse(history.last); commit({ structure: true }); toast('Undo'); }
  function redo() { if (!history.future.length) return; history.past.push(history.last); history.last = history.future.pop(); store = JSON.parse(history.last); commit({ structure: true }); toast('Redo'); }
  function updateUndoButtons() { $('undoBtn').disabled = !history.past.length; $('redoBtn').disabled = !history.future.length; }

  const getAsset = id => store.assets.find(a => a.id === id) || null;
  const selected = () => getAsset(store.selectedAssetId);
  const synthCache = new Map();
  const catalogOf = asset => {
    const hit = CATALOG_BY_ID[asset.catalogId] || CATALOG.find(c => c.componentName === asset.componentName);
    if (hit) return hit;
    if (asset.external) { if (!synthCache.has(asset.id)) synthCache.set(asset.id, buildExternalEntry({ id: asset.catalogId || asset.id, componentName: asset.componentName, external: asset.external, defaults: asset.keyframes[0] && asset.keyframes[0].properties, preview: asset.preview })); return synthCache.get(asset.id); }
    return null;
  };

  /* ---------------- SAMPLING / INTERPOLATION ---------------- */
  function lerpValue(a, b, t) {
    if (a === undefined) return b; if (b === undefined) return a;
    if (isNum(a) && isNum(b)) return lerp(a, b, t);
    if (Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every(isNum) && b.every(isNum)) return a.map((v, i) => lerp(v, b[i], t));
    if (a && b && typeof a === 'object' && typeof b === 'object' && !Array.isArray(a) && !Array.isArray(b)) { const out = {}; for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) out[k] = lerpValue(a[k], b[k], t); return out; }
    return t < 1 ? a : b; // strings / booleans hold
  }
  function fillDefaults(asset, props) {
    const cat = catalogOf(asset); const d = cat ? cat.defaults : { baseX: 0, baseY: 0, scale: 1, rotation: 0, opacity: 1, customProperties: {} };
    const out = Object.assign({}, d, props || {}); out.customProperties = Object.assign({}, d.customProperties || {}, (props && props.customProperties) || {}); return out;
  }
  function sampleAsset(asset, frame) {
    const kfs = asset.keyframes;
    if (!kfs || !kfs.length) return fillDefaults(asset, null);
    if (frame <= kfs[0].frame) return fillDefaults(asset, kfs[0].properties);
    const last = kfs[kfs.length - 1];
    if (frame >= last.frame) return fillDefaults(asset, last.properties);
    let i = 0; while (i < kfs.length - 1 && !(frame >= kfs[i].frame && frame <= kfs[i + 1].frame)) i++;
    const prev = kfs[i], next = kfs[i + 1];
    const t = (frame - prev.frame) / Math.max(1, next.frame - prev.frame);
    const easing = prev.easing || asset.easing || 'linear';
    const e = (EASE[easing] || EASE.linear)(t);
    return lerpValue(fillDefaults(asset, prev.properties), fillDefaults(asset, next.properties), e);
  }
  /** Non-keyframable values (Remotion schema keyframable:false, e.g. captions, bar counts): same value on every keyframe. */
  function writeAllKeyframes(asset, partial) {
    if (!asset.keyframes.length) { writeKeyframe(asset, store.currentFrame, partial); return; }
    asset.keyframes.forEach(k => { const cp = Object.assign({}, k.properties.customProperties || {}, partial.customProperties || {}); Object.assign(k.properties, partial); k.properties.customProperties = cp; });
  }
  function sortKfs(asset) { asset.keyframes.sort((a, b) => a.frame - b.frame); }
  function writeKeyframe(asset, frame, partial, opts) {
    frame = Math.max(0, Math.round(frame));
    let kf = asset.keyframes.find(k => k.frame === frame);
    if (!kf) { kf = { frame, properties: sampleAsset(asset, frame) }; asset.keyframes.push(kf); }
    else if (opts && opts.merge === false) { kf.properties = fillDefaults(asset, partial); }
    if (partial) { const cp = Object.assign({}, kf.properties.customProperties || {}, partial.customProperties || {}); Object.assign(kf.properties, partial); kf.properties.customProperties = cp; }
    if (opts && opts.easing) kf.easing = opts.easing;
    sortKfs(asset);
    if (frame > store.totalFrames) store.totalFrames = frame;
    return kf;
  }

  /* ---------------- COMMIT / RENDER PIPELINE ---------------- */
  let notifyTimer = null;
  function commit(opts) {
    opts = opts || {};
    if (opts.structure) { buildSceneTree(); buildTimelineTracks(); buildInspector(); buildModifiers(); updatePresetTarget(); }
    frameUpdate();
    if (opts.history !== false) pushHistory();
    updateExportBoxes();
    clearTimeout(notifyTimer); notifyTimer = setTimeout(() => listeners.forEach(fn => { try { fn(store); } catch (e) { console.error(e); } }), 60);
  }
  function frameUpdate() { renderViewport(); syncInspectorValues(); updatePlayhead(); updateHeader(); }
  function updateHeader() {
    $('frameCounter').textContent = Math.floor(store.currentFrame); $('totalCounter').textContent = store.totalFrames;
    $('inFrame').value = Math.floor(store.currentFrame); $('inTotal').value = store.totalFrames; $('inFps').value = String(store.fps);
    $('timeLabel').textContent = (store.currentFrame / store.fps).toFixed(2) + 's'; $('durationLabel').textContent = (store.totalFrames / store.fps).toFixed(2) + 's';
    $('layerCount').textContent = store.assets.length + ' LAYERS';
    const s = selected(); $('btnAddKF').disabled = !s; $('btnDupAsset').disabled = !s; $('btnDelKF').disabled = !ui.selectedKeyframe;
  }

  /* =====================================================================
     STUDIO API — every mutation the UI performs goes through here.
     These are the MCP endpoints (mcp/server.mjs proxies them 1:1).
     ===================================================================== */
  const StudioAPI = {
    describe() { return Object.keys(StudioAPI).filter(k => typeof StudioAPI[k] === 'function').map(k => ({ method: k, doc: API_DOCS[k] || '' })); },
    getState() { return clone(store); },
    setState(p) { const s = p && p.state ? p.state : p; if (!s || !Array.isArray(s.assets)) throw new Error('state.assets[] required'); store = Object.assign({ version: 1, name: 'Imported', width: 1920, height: 1080, fps: 60, totalFrames: 120, currentFrame: 0, background: '#0a0a0f', selectedAssetId: null }, clone(s)); store.assets.forEach(a => { a.keyframes = a.keyframes || []; sortKfs(a); if (!a.catalogId) { const c = CATALOG.find(c => c.componentName === a.componentName); if (c) a.catalogId = c.id; } if (a.visible === undefined) a.visible = true; if (a.locked === undefined) a.locked = false; }); if (!getAsset(store.selectedAssetId)) store.selectedAssetId = null; ui.selectedKeyframe = null; commit({ structure: true }); return { ok: true, assets: store.assets.length }; },
    clearScene() { store.assets = []; store.selectedAssetId = null; ui.selectedKeyframe = null; store.currentFrame = 0; commit({ structure: true }); return { ok: true }; },
    listCatalog() { return CATALOG.map(c => ({ catalogId: c.id, tab: c.tab, type: c.type, componentName: c.componentName, name: c.name, description: c.desc, defaults: clone(c.defaults), controls: clone(c.controls).map(g => ({ group: g.group, items: g.items.map(({ key, label, kind, min, max, step, options, keyframable }) => ({ key, label, kind, min, max, step, options, keyframable })) })), presets: c.type === 'character' ? Object.keys(PRESETS) : [], modifiers: (MODIFIERS[c.type] || []).filter(m => !m.only || m.only === c.componentName).map(m => ({ id: m.id, label: m.label, description: m.desc })), ...(c.external && c.external.children ? { children: clone(c.external.children), wrapsHint: 'wrapper: update_asset { wraps } to render other layers inside it' } : {}), ...(c.defaultDurationInFrames ? { defaultDurationInFrames: c.defaultDurationInFrames } : {}) })); },
    listPresets() { return Object.entries(PRESETS).map(([k, p]) => ({ preset: k, label: p.label, description: p.desc, frames: p.kf[p.kf.length - 1].frame })); },
    listModifiers(p) { const a = p && p.assetId ? getAsset(p.assetId) : selected(); if (!a) return []; return (MODIFIERS[a.type] || []).filter(m => !m.only || m.only === a.componentName).map(m => ({ id: m.id, label: m.label, description: m.desc })); },

    addAsset(p) {
      p = p || {}; const cat = CATALOG_BY_ID[p.catalogId] || CATALOG.find(c => c.componentName === p.componentName);
      if (!cat) throw new Error('Unknown catalogId: ' + p.catalogId);
      const id = p.id && !getAsset(p.id) ? p.id : uid(cat.id);
      const props = fillDefaults({ catalogId: cat.id }, p.properties || {});
      const asset = { id, type: cat.type, componentName: cat.componentName, catalogId: cat.id, name: p.name || cat.name, visible: true, locked: false, easing: p.easing || cat.easing || 'linear', keyframes: [{ frame: Math.max(0, Math.round(p.frame || 0)), properties: props }] };
      if (cat.defaultDurationInFrames && p.durationInFrames === undefined) asset.durationInFrames = cat.defaultDurationInFrames;
      if (p.startFrame !== undefined) asset.startFrame = Math.max(0, Math.round(p.startFrame)); if (p.durationInFrames) asset.durationInFrames = Math.round(p.durationInFrames);
      if (cat.external) { asset.external = clone(cat.external); asset.renderTarget = cat.renderTarget || 'html'; if (cat.preview) asset.preview = clone(cat.preview); }
      if (Array.isArray(p.keyframes) && p.keyframes.length) { asset.keyframes = p.keyframes.map(k => ({ frame: Math.round(k.frame || 0), properties: fillDefaults(asset, k.properties), easing: k.easing })); sortKfs(asset); }
      if (typeof p.index === 'number') store.assets.splice(clamp(p.index, 0, store.assets.length), 0, asset); else store.assets.push(asset);
      store.selectedAssetId = id; ui.selectedKeyframe = null; commit({ structure: true }); return clone(asset);
    },
    duplicateAsset(p) { const a = getAsset(p && p.assetId || store.selectedAssetId); if (!a) throw new Error('No asset'); const c = clone(a); c.id = uid(a.catalogId || 'asset'); c.name = a.name + ' copy'; delete c.wraps; /* a layer can only be in one wrapper */ c.keyframes.forEach(k => { k.properties.baseX = (k.properties.baseX || 0) + 60; }); const i = store.assets.indexOf(a); store.assets.splice(i + 1, 0, c); store.selectedAssetId = c.id; commit({ structure: true }); return clone(c); },
    deleteAsset(p) { const id = p && p.assetId; const i = store.assets.findIndex(a => a.id === id); if (i < 0) throw new Error('Unknown assetId: ' + id); store.assets.splice(i, 1); store.assets.forEach(o => { if (!o.wraps) return; if (Array.isArray(o.wraps)) o.wraps = o.wraps.filter(x => x !== id); else Object.keys(o.wraps).forEach(k => { o.wraps[k] = o.wraps[k].filter(x => x !== id); }); if (!wrapIds(o).length) delete o.wraps; }); if (store.selectedAssetId === id) store.selectedAssetId = null; if (ui.selectedKeyframe && ui.selectedKeyframe.assetId === id) ui.selectedKeyframe = null; commit({ structure: true }); return { ok: true }; },
    updateAsset(p) { const a = getAsset(p.assetId); if (!a) throw new Error('Unknown assetId'); ['name', 'visible', 'locked', 'easing'].forEach(k => { if (p[k] !== undefined) a[k] = p[k]; });
      ['startFrame', 'durationInFrames'].forEach(k => { if (p[k] === undefined) return; const v = p[k] === null || p[k] === '' ? null : Math.round(Number(p[k])); if (v === null || isNaN(v)) delete a[k]; else { if (k === 'startFrame' && v < 0) throw new Error('startFrame must be ≥ 0'); if (k === 'durationInFrames' && v < 1) throw new Error('durationInFrames must be ≥ 1'); a[k] = v; } });
      if (p.wraps !== undefined) setWraps(a, p.wraps); commit({ structure: true }); return clone(a); },
    selectAsset(p) { const id = p ? p.assetId : null; if (id && !getAsset(id)) throw new Error('Unknown assetId'); store.selectedAssetId = id || null; ui.selectedKeyframe = null; commit({ structure: true, history: false }); return { selectedAssetId: store.selectedAssetId }; },
    reorderAsset(p) { const a = getAsset(p.assetId); if (!a) throw new Error('Unknown assetId'); const i = store.assets.indexOf(a); let j = i; if (typeof p.index === 'number') j = p.index; else if (p.direction === 'up') j = i + 1; else if (p.direction === 'down') j = i - 1; else if (p.direction === 'top') j = store.assets.length - 1; else if (p.direction === 'bottom') j = 0; j = clamp(j, 0, store.assets.length - 1); store.assets.splice(i, 1); store.assets.splice(j, 0, a); commit({ structure: true }); return { index: j }; },

    updateAssetKeyframe(p) { const a = getAsset(p.assetId); if (!a) throw new Error('Unknown assetId'); const frame = p.frame === undefined ? store.currentFrame : p.frame; const kf = writeKeyframe(a, frame, p.properties || {}, { merge: p.merge !== false, easing: p.easing }); commit({ structure: true }); return clone(kf); },
    setKeyframes(p) { const a = getAsset(p.assetId); if (!a) throw new Error('Unknown assetId'); a.keyframes = (p.keyframes || []).map(k => ({ frame: Math.max(0, Math.round(k.frame || 0)), properties: fillDefaults(a, k.properties), easing: k.easing })); sortKfs(a); store.totalFrames = Math.max(store.totalFrames, ...a.keyframes.map(k => k.frame)); commit({ structure: true }); return clone(a.keyframes); },
    removeKeyframe(p) { const a = getAsset(p.assetId); if (!a) throw new Error('Unknown assetId'); const i = a.keyframes.findIndex(k => k.frame === Math.round(p.frame)); if (i < 0) throw new Error('No keyframe at frame ' + p.frame); if (a.keyframes.length === 1) throw new Error('An asset needs at least one keyframe'); a.keyframes.splice(i, 1); ui.selectedKeyframe = null; commit({ structure: true }); return { ok: true }; },
    moveKeyframe(p) { const a = getAsset(p.assetId); if (!a) throw new Error('Unknown assetId'); const kf = a.keyframes.find(k => k.frame === Math.round(p.frame)); if (!kf) throw new Error('No keyframe at frame ' + p.frame); const to = clamp(Math.round(p.toFrame), 0, 100000); if (a.keyframes.some(k => k !== kf && k.frame === to)) throw new Error('Keyframe exists at ' + to); kf.frame = to; sortKfs(a); if (to > store.totalFrames) store.totalFrames = to; if (ui.selectedKeyframe && ui.selectedKeyframe.assetId === a.id) ui.selectedKeyframe.frame = to; commit({ structure: true, history: p.history !== false }); return clone(kf); },
    addKeyframeAtCurrent(p) { const a = getAsset(p && p.assetId || store.selectedAssetId); if (!a) throw new Error('No asset selected'); const kf = writeKeyframe(a, store.currentFrame, {}); ui.selectedKeyframe = { assetId: a.id, frame: kf.frame }; commit({ structure: true }); return clone(kf); },

    applyPreset(p) {
      const a = getAsset(p.assetId || store.selectedAssetId); if (!a) throw new Error('No asset'); if (a.type !== 'character') throw new Error('Presets apply to character assets');
      const preset = typeof p.preset === 'string' ? PRESETS[p.preset] : p.preset; if (!preset) throw new Error('Unknown preset: ' + p.preset);
      const start = Math.round(p.startFrame === undefined ? store.currentFrame : p.startFrame);
      const base = sampleAsset(a, start); const facing = p.mirror ? -(base.customProperties.facing || 1) : (base.customProperties.facing || 1);
      const len = preset.kf[preset.kf.length - 1].frame;
      a.keyframes = a.keyframes.filter(k => k.frame < start || k.frame > start + len);
      preset.kf.forEach(k => { const props = clone(base); props.baseX = base.baseX + (k.dx || 0) * facing; props.baseY = base.baseY + (k.dy || 0); props.customProperties = Object.assign({}, base.customProperties, GUARD, k.angles || {}, { facing }); a.keyframes.push({ frame: start + k.frame, properties: props, easing: p.easing || 'spring' }); });
      sortKfs(a); store.totalFrames = Math.max(store.totalFrames, start + len); store.selectedAssetId = a.id; commit({ structure: true });
      if (p.play !== false && !ui.isPlaying) { store.currentFrame = start; StudioAPI.play(); }
      return { ok: true, startFrame: start, endFrame: start + len, keyframes: preset.kf.length };
    },
    generateFromPrompt(p) { const { key, preset, mirror } = presetFromPrompt(p.prompt || ''); const a = getAsset(p.assetId || store.selectedAssetId) || store.assets.find(x => x.type === 'character'); if (!a) throw new Error('Add a character first'); const r = StudioAPI.applyPreset({ assetId: a.id, preset, mirror, startFrame: p.startFrame, play: p.play }); return Object.assign({ preset: key, mirror, assetId: a.id }, r); },
    applyModifier(p) {
      const a = getAsset(p.assetId || store.selectedAssetId); if (!a) throw new Error('No asset');
      const mod = (MODIFIERS[a.type] || []).find(m => m.id === p.modifier); if (!mod) throw new Error('Unknown modifier ' + p.modifier + ' for type ' + a.type);
      const start = Math.round(p.startFrame === undefined ? store.currentFrame : p.startFrame);
      const base = sampleAsset(a, start); const steps = mod.steps(base);
      const total = steps[steps.length - 1].offset || 0; const factor = p.duration && total ? p.duration / total : 1;
      if (!mod.instant) a.keyframes = a.keyframes.filter(k => k.frame < start || k.frame > start + Math.round(total * factor));
      steps.forEach(s => writeKeyframe(a, start + Math.round(s.offset * factor), s.props, { easing: p.easing }));
      store.selectedAssetId = a.id; commit({ structure: true }); return { ok: true, startFrame: start, endFrame: start + Math.round(total * factor) };
    },
    setProperty(p) { // convenience: set one property (or customProperties.key) on the keyframe at frame (auto-key)
      const a = getAsset(p.assetId || store.selectedAssetId); if (!a) throw new Error('No asset'); const frame = p.frame === undefined ? store.currentFrame : p.frame;
      const partial = p.custom ? { customProperties: { [p.key]: p.value } } : { [p.key]: p.value }; if (p.allKeyframes) writeAllKeyframes(a, partial); else writeKeyframe(a, frame, partial); commit({ structure: p.structure !== false, history: p.history !== false }); return { ok: true };
    },

    changeCurrentFrame(p) { const f = typeof p === 'number' ? p : p.frame; store.currentFrame = clamp(Number(f) || 0, 0, store.totalFrames); ui.selectedKeyframe = null; commit({ history: false }); return { currentFrame: store.currentFrame }; },
    setTimeline(p) { if (p.totalFrames) store.totalFrames = Math.max(1, Math.round(p.totalFrames)); if (p.fps) store.fps = Math.round(p.fps); if (p.aspect || p.width || p.height) return StudioAPI.setAspect(p); if (p.background) store.background = p.background; if (p.name) store.name = p.name; store.currentFrame = clamp(store.currentFrame, 0, store.totalFrames); applyCanvasSize(); commit({ structure: true }); return { totalFrames: store.totalFrames, fps: store.fps, width: store.width, height: store.height }; },
    listAspectRatios() { return ASPECT_PRESETS.map(a => Object.assign({}, a, { active: a.width === store.width && a.height === store.height })); },
    setAspect(p) {
      p = p || {}; const preset = p.preset || p.aspect ? ASPECT_PRESETS.find(a => a.id === (p.preset || p.aspect)) : null;
      if ((p.preset || p.aspect) && !preset) throw new Error('Unknown aspect preset. Use one of: ' + ASPECT_PRESETS.map(a => a.id).join(', '));
      const W = Math.round(preset ? preset.width : (p.width || store.width)), H = Math.round(preset ? preset.height : (p.height || store.height));
      if (W < 16 || H < 16) throw new Error('Invalid size');
      const sx = W / store.width, sy = H / store.height;
      if (p.refit !== false && (sx !== 1 || sy !== 1)) {
        store.assets.forEach(a => { const cat = catalogOf(a) || {}; a.keyframes.forEach(k => { const pr = k.properties; if (isNum(pr.baseX)) pr.baseX = round2(pr.baseX * sx); if (isNum(pr.baseY)) pr.baseY = round2(pr.baseY * sy); const cp = pr.customProperties || {};
          if (cat.fullFrame) { if (isNum(cp.width)) cp.width = W; if (isNum(cp.height)) cp.height = H; if (isNum(cp.floorY)) cp.floorY = round2(cp.floorY * sy); if (isNum(cp.sunX)) cp.sunX = round2(cp.sunX * sx); if (isNum(cp.sunY)) cp.sunY = round2(cp.sunY * sy); if (isNum(cp.windowX)) cp.windowX = round2(cp.windowX * sx); if (isNum(cp.windowY)) cp.windowY = round2(cp.windowY * sy); }
          else if (cat.fullWidth) { if (isNum(cp.width)) cp.width = W; }
          else if (p.scaleAssets !== false && a.type !== 'environment' && Math.abs(sx - sy) > 0.01) { pr.scale = round2((pr.scale || 1) * Math.min(sx, sy)); } }); });
      }
      store.width = W; store.height = H; if (p.background) store.background = p.background; if (p.name) store.name = p.name;
      applyCanvasSize(); commit({ structure: true }); return { width: W, height: H, aspect: preset ? preset.id : aspectLabel(W, H), refit: p.refit !== false };
    },
    play() { ui.isPlaying = true; ui.lastTime = 0; $('playBtn').textContent = '❚❚ PAUSE'; $('tlPlay').textContent = '❚❚'; return { playing: true }; },
    pause() { ui.isPlaying = false; $('playBtn').textContent = '▶ PLAY'; $('tlPlay').textContent = '▶'; commit({ history: false }); return { playing: false }; },
    togglePlay() { return ui.isPlaying ? StudioAPI.pause() : StudioAPI.play(); },

    registerComponent(p) {
      const m = p && p.entry ? p.entry : p; const entry = buildExternalEntry(m);
      const i = CATALOG.findIndex(c => c.id === entry.id); if (i >= 0) CATALOG[i] = entry; else CATALOG.push(entry); CATALOG_BY_ID[entry.id] = entry; synthCache.clear();
      buildCatalog(); commit({ structure: true, history: false }); return { ok: true, catalogId: entry.id, componentName: entry.componentName, external: entry.external, controls: entry.controls };
    },
    validateScene(p) { return validateScene(p || {}); },
    exportJSON() { return JSON.stringify(exportState(), null, 2); },
    exportRemotion() { return buildRemotionBundle(); },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
  };
  const API_DOCS = {
    getState: 'Full RemotionWorkspaceState JSON.', setState: '{state} replace the whole scene.', clearScene: 'Remove all assets.', listCatalog: 'All addable assets with control schemas, presets and modifiers.', listPresets: 'Martial-arts choreography presets for characters.', listModifiers: '{assetId?} context-aware motion generators.',
    addAsset: '{catalogId, id?, name?, properties?, keyframes?, frame?, index?}', duplicateAsset: '{assetId}', deleteAsset: '{assetId}', updateAsset: '{assetId, name?, visible?, locked?, easing?, startFrame?, durationInFrames?, wraps?: ids[] | {slot: ids[]} | null}', selectAsset: '{assetId|null}', reorderAsset: '{assetId, direction: up|down|top|bottom | index}',
    updateAssetKeyframe: '{assetId, frame, properties (partial, merged), easing?, merge?}', setKeyframes: '{assetId, keyframes[]} replace track.', removeKeyframe: '{assetId, frame}', moveKeyframe: '{assetId, frame, toFrame}', addKeyframeAtCurrent: '{assetId?}',
    applyPreset: '{assetId, preset, startFrame?, mirror?, play?}', generateFromPrompt: '{prompt, assetId?, startFrame?}', applyModifier: '{assetId, modifier, startFrame?, duration?}', setProperty: '{assetId, key, value, custom?, frame?, allKeyframes?}',
    setAspect: '{preset: 16:9|9:16|1:1|4:5|4:3|3:4|21:9|2:3|4K|9:16-4K | width,height, refit?=true}', listAspectRatios: '', registerComponent: '{entry:{id, componentName, external:{importPath, exportName, package?, sizeMode}, defaults, controls, preview}}', validateScene: '→ {ok, score, errors[], warnings[], info[]}',
    changeCurrentFrame: '{frame}', setTimeline: '{totalFrames?, fps?, width?, height?, background?, name?}', play: '', pause: '', togglePlay: '', exportJSON: 'scene.json string', exportRemotion: '{files:{name:code}}', describe: 'This list.'
  };
  window.StudioAPI = StudioAPI;

  /* =====================================================================
     VIEWPORT
     ===================================================================== */
  const stage = $('stage');
  function aspectLabel(w, h) { const g = (a, b) => b ? g(b, a % b) : a; const d = g(w, h); const rw = w / d, rh = h / d; return rw <= 64 && rh <= 64 ? `${rw}:${rh}` : (w / h).toFixed(2) + ':1'; }
  function fitStage() { const area = $('stageArea'), box = $('stageBox'); const sw = Math.max(50, area.clientWidth - 24), sh = Math.max(50, area.clientHeight - 24); const k = Math.min(sw / store.width, sh / store.height); box.style.width = Math.floor(store.width * k) + 'px'; box.style.height = Math.floor(store.height * k) + 'px'; }
  function applyCanvasSize() { stage.setAttribute('viewBox', `0 0 ${store.width} ${store.height}`); $('bgRect').setAttribute('width', store.width); $('bgRect').setAttribute('height', store.height); fitStage(); renderGrid(); ThreeBridge.resize(); syncAspectUI(); }
  function syncAspectUI() { const sel = $('aspectSelect'); const hit = ASPECT_PRESETS.find(a => a.width === store.width && a.height === store.height); sel.value = hit ? hit.id : 'custom'; $('inW').value = store.width; $('inH').value = store.height; $('canvasSize').textContent = store.width + '×' + store.height + ' • ' + aspectLabel(store.width, store.height); }
  new ResizeObserver(() => fitStage()).observe($('stageArea'));
  function renderGrid() {
    const g = $('grid'); let s = ''; if ($('chkGrid').checked) { for (let x = 0; x <= store.width; x += 80) s += `<line x1="${x}" y1="0" x2="${x}" y2="${store.height}" class="grid-line" opacity="${x % 320 === 0 ? 0.6 : 0.2}"/>`; for (let y = 0; y <= store.height; y += 80) s += `<line x1="0" y1="${y}" x2="${store.width}" y2="${y}" class="grid-line" opacity="${y % 320 === 0 ? 0.6 : 0.2}"/>`; } g.innerHTML = s;
    const sf = $('safeLayer'); sf.innerHTML = $('chkSafe').checked ? `<rect x="${store.width * 0.05}" y="${store.height * 0.05}" width="${store.width * 0.9}" height="${store.height * 0.9}" fill="none" stroke="#ffd60a" stroke-width="2" stroke-dasharray="14 10" opacity="0.5"/><rect x="${store.width * 0.1}" y="${store.height * 0.1}" width="${store.width * 0.8}" height="${store.height * 0.8}" fill="none" stroke="#ffd60a" stroke-width="1" opacity="0.35"/>` : '';
  }
  const transformOf = (p) => `translate(${round2(p.baseX)} ${round2(p.baseY)}) rotate(${round2(p.rotation || 0)}) scale(${round2((p.scale || 1) * (p.customProperties.facing === -1 ? -1 : 1))} ${round2(p.scale || 1)})`;

  function renderViewport() {
    $('bgRect').setAttribute('fill', store.background);
    const f = store.currentFrame; let svg = '', hits = ''; const threeLayers = []; const samples = {};
    // Wrapped layers (remocn Backdrop / Drift / Stage / ChatToPreviewLayout) are drawn inside their wrapper, not at top level
    const drawAsset = (asset, depth) => {
      if (asset.visible === false) return ''; const cat = catalogOf(asset); if (!cat) return ''; const p = sampleAsset(asset, f); samples[asset.id] = p;
      if (asset.type === 'three') { threeLayers.push({ asset, p }); const sz = (p.customProperties.size || 200) * (p.scale || 1) / 2; hits += `<rect class="asset hit ${asset.locked ? 'locked' : ''}" data-id="${asset.id}" x="${p.baseX - sz}" y="${p.baseY - sz}" width="${sz * 2}" height="${sz * 2}" fill="transparent"/>`; return ThreeBridge.ready ? '' : `<g class="asset three-placeholder" data-id="${asset.id}" transform="${transformOf(p)}" opacity="${p.opacity}">${cat.render(p.customProperties, { uid: asset.id })}</g>`; }
      const local = f - (asset.startFrame || 0); if (asset.type === 'external' && (local < 0 || (asset.durationInFrames && local >= asset.durationInFrames))) return ''; // layer not active at this frame
      const slots = !asset.wraps || depth > 6 ? null : Array.isArray(asset.wraps) ? { children: asset.wraps } : asset.wraps;
      const ctx = { uid: asset.id, entry: cat, frame: asset.type === 'external' ? local : f, totalFrames: store.totalFrames, layerDuration: asset.durationInFrames || store.totalFrames - (asset.startFrame || 0), fps: store.fps, compW: store.width, compH: store.height, hasChildren: !!(slots && Object.values(slots).flat().length), slotFilled: slots ? Object.fromEntries(Object.entries(slots).map(([k, v]) => [k, v.length > 0])) : {} };
      let inner = cat.render(p.customProperties, ctx);
      // slots paint in geo z order (Page Turn keeps its exiting page above the entering scene)
      if (slots && window.StudioCatalog.wrapGeometry) { const geo = window.StudioCatalog.wrapGeometry(p.customProperties, ctx);
        Object.entries(slots).sort(([a], [b]) => ((geo[a] || {}).z || 0) - ((geo[b] || {}).z || 0)).forEach(([slot, ids]) => { const g = geo[slot] || geo.children || { transform: '' }; const kids = store.assets.filter(k => ids.includes(k.id)).map(k => drawAsset(k, depth + 1)).join(''); const cid = `wrapclip_${asset.id}_${slot}`;
          inner += `<g transform="${g.transform}" opacity="${g.opacity ?? 1}">${g.clip ? `<clipPath id="${cid}"><rect width="${g.clip.w}" height="${g.clip.h}" rx="${g.clip.r || 0}"/></clipPath>` : ''}<g ${g.clip ? `clip-path="url(#${cid})"` : ''}><g transform="${g.inner || ''}">${kids}</g></g></g>`; }); }
      return `<g class="asset ${asset.locked ? 'locked' : ''}" data-id="${asset.id}" transform="${transformOf(p)}" opacity="${round2(p.opacity ?? 1)}">${inner}</g>`;
    };
    store.assets.forEach(asset => { if (!wrapperOf(asset.id)) svg += drawAsset(asset, 0); });
    $('assetsLayer').innerHTML = svg; $('hitLayer').innerHTML = hits;
    ThreeBridge.sync(threeLayers);
    renderGhosts(); renderSelection(samples);
  }
  function renderGhosts() {
    const g = $('ghostLayer'); const a = selected(); if (!$('chkGhost').checked || !a || a.type !== 'character') { g.innerHTML = ''; return; }
    const cat = catalogOf(a); g.innerHTML = a.keyframes.map(k => { const p = fillDefaults(a, k.properties); return `<g transform="${transformOf(p)}">${cat.render(Object.assign({}, p.customProperties, { strokeWidth: 3, shadow: false }), { uid: a.id + '_g', joints: false })}</g>`; }).join('');
  }
  function assetCorners(asset, p) {
    // local bbox → world quad
    let bb;
    if (asset.type === 'three') { const s = (p.customProperties.size || 200) / 2; bb = { x: -s, y: -s, width: s * 2, height: s * 2 }; }
    else { const g = $('assetsLayer').querySelector(`g.asset[data-id="${asset.id}"]`); if (!g) return null; try { bb = g.getBBox(); } catch (e) { return null; } }
    const sx = (p.scale || 1) * (p.customProperties.facing === -1 ? -1 : 1), sy = p.scale || 1, r = (p.rotation || 0) * Math.PI / 180, cos = Math.cos(r), sin = Math.sin(r);
    const map = (x, y) => { const lx = x * sx, ly = y * sy; return { x: p.baseX + lx * cos - ly * sin, y: p.baseY + lx * sin + ly * cos }; };
    return { pts: [map(bb.x, bb.y), map(bb.x + bb.width, bb.y), map(bb.x + bb.width, bb.y + bb.height), map(bb.x, bb.y + bb.height)], center: map(bb.x + bb.width / 2, bb.y + bb.height / 2), top: map(bb.x + bb.width / 2, bb.y) };
  }
  function renderSelection(samples) {
    const layer = $('selLayer'); const a = selected(); if (!a || a.visible === false) { layer.innerHTML = ''; return; }
    const p = samples[a.id] || sampleAsset(a, store.currentFrame); const q = assetCorners(a, p); if (!q) { layer.innerHTML = ''; return; }
    const hs = 16; const pts = q.pts.map(c => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
    let s = `<polygon class="sel-box" points="${pts}" data-sel="move"/>`;
    if (!a.locked) { q.pts.forEach((c, i) => { s += `<rect class="sel-handle" data-sel="scale" data-i="${i}" x="${(c.x - hs / 2).toFixed(1)}" y="${(c.y - hs / 2).toFixed(1)}" width="${hs}" height="${hs}"/>`; });
      const rot = { x: q.top.x + (q.top.x - q.center.x) * 0.25, y: q.top.y + (q.top.y - q.center.y) * 0.25 - 36 }; s += `<line x1="${q.top.x}" y1="${q.top.y}" x2="${rot.x}" y2="${rot.y}" stroke="#ff3b30" stroke-width="1.5" opacity="0.7"/><circle class="sel-rot" data-sel="rotate" cx="${rot.x}" cy="${rot.y}" r="9"/>`; }
    s += `<text x="${q.pts[0].x}" y="${q.pts[0].y - 12}" fill="#ff3b30" font-family="JetBrains Mono, monospace" font-size="14">${esc(a.name)} <tspan fill="#8a8aa0">• ${a.componentName}</tspan></text>`;
    layer.innerHTML = s;
  }
  function svgPoint(e) { const pt = stage.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; return pt.matrixTransform(stage.getScreenCTM().inverse()); }

  stage.addEventListener('pointerdown', e => {
    const selEl = e.target.closest('[data-sel]'); const assetEl = e.target.closest('.asset');
    const pt = svgPoint(e);
    if (selEl) { const a = selected(); if (!a || a.locked) return; const p = sampleAsset(a, store.currentFrame); const q = assetCorners(a, p); ui.drag = { mode: selEl.dataset.sel, asset: a, start: pt, p0: clone(p), center: q ? q.center : { x: p.baseX, y: p.baseY } }; stage.setPointerCapture(e.pointerId); e.preventDefault(); return; }
    if (assetEl) { const a = getAsset(assetEl.dataset.id); if (!a) return; if (store.selectedAssetId !== a.id) { store.selectedAssetId = a.id; ui.selectedKeyframe = null; commit({ structure: true, history: false }); } if (a.locked) return; const p = sampleAsset(a, store.currentFrame); ui.drag = { mode: 'move', asset: a, start: pt, p0: clone(p) }; stage.setPointerCapture(e.pointerId); e.preventDefault(); return; }
    if (store.selectedAssetId) { store.selectedAssetId = null; ui.selectedKeyframe = null; commit({ structure: true, history: false }); }
  });
  stage.addEventListener('pointermove', e => {
    const d = ui.drag; if (!d) return; const pt = svgPoint(e); const a = d.asset;
    if (d.mode === 'move') writeKeyframe(a, store.currentFrame, { baseX: round2(d.p0.baseX + pt.x - d.start.x), baseY: round2(d.p0.baseY + pt.y - d.start.y) });
    else if (d.mode === 'scale') { const d0 = Math.hypot(d.start.x - d.center.x, d.start.y - d.center.y) || 1; const d1 = Math.hypot(pt.x - d.center.x, pt.y - d.center.y); writeKeyframe(a, store.currentFrame, { scale: round2(clamp(d.p0.scale * d1 / d0, 0.05, 20)) }); }
    else if (d.mode === 'rotate') { const a0 = Math.atan2(d.start.y - d.center.y, d.start.x - d.center.x), a1 = Math.atan2(pt.y - d.center.y, pt.x - d.center.x); let deg = (d.p0.rotation || 0) + (a1 - a0) * 180 / Math.PI; if (e.shiftKey) deg = Math.round(deg / 15) * 15; writeKeyframe(a, store.currentFrame, { rotation: round2(deg) }); }
    d.moved = true; frameUpdate();
  });
  const endDrag = e => { if (!ui.drag) return; const moved = ui.drag.moved; ui.drag = null; if (moved) commit({ structure: true }); };
  stage.addEventListener('pointerup', endDrag); stage.addEventListener('pointercancel', endDrag);

  /* ---------------- THREE.JS OVERLAY ---------------- */
  const ThreeBridge = {
    ready: false, failed: false, THREE: null, renderer: null, scene: null, camera: null, meshes: new Map(),
    async init() {
      const canvas = $('threeCanvas');
      try {
        const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
        this.THREE = THREE; this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }); this.renderer.setClearColor(0x000000, 0);
        this.scene = new THREE.Scene(); this.scene.add(new THREE.AmbientLight(0xffffff, 0.7)); const dir = new THREE.DirectionalLight(0xffffff, 1.2); dir.position.set(400, 600, 1000); this.scene.add(dir); const dir2 = new THREE.DirectionalLight(0x64d2ff, 0.4); dir2.position.set(-600, -200, 400); this.scene.add(dir2);
        this.camera = new THREE.OrthographicCamera(-960, 960, 540, -540, -5000, 5000); this.camera.position.z = 1000;
        this.ready = true; $('threeStatus').textContent = '3D ✓'; this.resize(); renderViewport();
      } catch (err) { console.warn('three.js unavailable', err); this.failed = true; $('threeStatus').textContent = '3D offline'; renderViewport(); }
    },
    resize() { if (!this.ready) return; const box = $('stageBox'); const w = box.clientWidth || 1, h = box.clientHeight || 1; this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1)); this.renderer.setSize(w, h, false); this.camera.left = -store.width / 2; this.camera.right = store.width / 2; this.camera.top = store.height / 2; this.camera.bottom = -store.height / 2; this.camera.updateProjectionMatrix(); },
    geometry(shape) { const T = this.THREE; switch (shape) { case 'sphere': return new T.SphereGeometry(0.5, 48, 32); case 'torusKnot': return new T.TorusKnotGeometry(0.32, 0.1, 160, 24); case 'cylinder': return new T.CylinderGeometry(0.4, 0.4, 1, 48); case 'icosahedron': return new T.IcosahedronGeometry(0.55, 1); default: return new T.BoxGeometry(1, 1, 1); } },
    sync(layers) {
      if (!this.ready) return; const T = this.THREE; const seen = new Set();
      layers.forEach(({ asset, p }, order) => {
        const cp = p.customProperties; let m = this.meshes.get(asset.id);
        if (!m || m.userData.shape !== cp.shape) { if (m) { this.scene.remove(m); m.geometry.dispose(); } m = new T.Mesh(this.geometry(cp.shape), new T.MeshStandardMaterial({ transparent: true })); m.userData.shape = cp.shape; this.scene.add(m); this.meshes.set(asset.id, m); }
        const size = (cp.size || 200) * (p.scale || 1); m.scale.set(size, size, size);
        m.position.set(p.baseX - store.width / 2, store.height / 2 - p.baseY, (cp.depth || 0));
        const r = Math.PI / 180; m.rotation.set((cp.rotX || 0) * r, (cp.rotY || 0) * r, ((cp.rotZ || 0) - (p.rotation || 0)) * r);
        m.material.color.set(cp.color || '#bf5af2'); m.material.emissive.set(cp.emissive || '#000000'); m.material.metalness = cp.metalness ?? 0.4; m.material.roughness = cp.roughness ?? 0.35; m.material.wireframe = !!cp.wireframe; m.material.opacity = p.opacity ?? 1; m.renderOrder = order; m.visible = true; seen.add(asset.id);
      });
      this.meshes.forEach((m, id) => { if (!seen.has(id)) { this.scene.remove(m); m.geometry.dispose(); this.meshes.delete(id); } });
      this.renderer.render(this.scene, this.camera);
    }
  };
  new ResizeObserver(() => { ThreeBridge.resize(); if (ThreeBridge.ready) renderViewport(); }).observe($('stageBox'));

  /* =====================================================================
     DYNAMIC PROPERTY INSPECTOR
     ===================================================================== */
  const TRANSFORM_CONTROLS = { group: 'Transform', items: [
    { key: 'baseX', label: 'X POSITION', kind: 'range', min: -400, max: 2320, step: 1, top: true }, { key: 'baseY', label: 'Y POSITION', kind: 'range', min: -400, max: 1480, step: 1, top: true },
    { key: 'scale', label: 'SCALE', kind: 'range', min: 0.05, max: 4, step: 0.01, top: true }, { key: 'rotation', label: 'ROTATION', kind: 'range', min: -180, max: 180, step: 1, top: true }, { key: 'opacity', label: 'OPACITY', kind: 'range', min: 0, max: 1, step: 0.01, top: true }] };
  const TYPE_LABEL = { character: 'JOINT RIG • FK CHAIN', environment: 'ENVIRONMENT • TRANSFORM', widget: 'WIDGET • DATA-DRIVEN', text: 'TEXT OVERLAY', three: 'THREE.JS MESH • @remotion/three', external: 'EXTERNAL REMOTION COMPONENT' };
  const TYPE_ICON = { character: '🥋', environment: '🏙️', widget: '📈', text: '🔤', three: '🧊', external: '🧩' };

  function buildInspector() {
    const a = selected(); const body = $('inspBody'); ui.inspectorAsset = a ? a.id : null;
    if (!a) { $('inspTitle').textContent = 'No selection'; $('inspSub').textContent = 'SELECT A LAYER TO INSPECT'; body.innerHTML = `<div class="insp-note">Click an asset in the viewport or the Scene Tree. Sliders write to the keyframe at the current frame (auto-key).</div>`; return; }
    const cat = catalogOf(a); $('inspTitle').textContent = a.name; $('inspSub').textContent = (TYPE_LABEL[a.type] || a.type.toUpperCase()) + ' • ' + a.componentName;
    const groups = [TRANSFORM_CONTROLS].concat(cat ? cat.controls : []);
    const timing = a.type === 'external' ? `<div class="ctrl-group"><div class="g-title">Layer timing • component frame 0 = start frame</div><div class="slider-row"><div class="slider-header"><span>START FRAME</span></div><input type="number" min="0" step="1" data-asset-field="startFrame" value="${a.startFrame || 0}"></div><div class="slider-row"><div class="slider-header"><span>DURATION (frames, empty = to the end)</span></div><input type="number" min="1" step="1" data-asset-field="durationInFrames" value="${a.durationInFrames || ''}"></div>${a.external && a.external.children ? `<div class="slider-row"><div class="slider-header"><span>WRAPS LAYERS (ids${a.external.children.slots ? '; ' + a.external.children.slots.map(x => x + ': a, b').join('; ') : ', comma-separated'})</span></div><input type="text" data-asset-field="wraps" value="${esc(a.wraps ? (Array.isArray(a.wraps) ? a.wraps.join(', ') : Object.entries(a.wraps).map(([k, v]) => k + ': ' + v.join(', ')).join('; ')) : '')}"></div>` : ''}</div>` : '';
    let html = timing + `<div class="slider-row inline"><span class="mono" style="font-size:9.5px;color:var(--muted)">TRACK EASING</span><select data-asset-field="easing" style="width:120px">${['linear', 'easeInOut', 'easeOut', 'spring'].map(e => `<option value="${e}" ${a.easing === e ? 'selected' : ''}>${e}</option>`).join('')}</select></div>`;
    groups.forEach(g => {
      html += `<div class="ctrl-group"><div class="g-title">${esc(g.group)}</div>`;
      g.items.forEach(c0 => { const c = c0.keyframable === false ? Object.assign({}, c0, { label: c0.label + ' • WHOLE CLIP' }) : c0;
        const path = c.top ? 'top' : 'cp'; const attrs = `data-key="${c.key}" data-path="${path}" data-kind="${c.kind}"${c.keyframable === false ? ' data-static="1"' : ''}`;
        if (c.kind === 'range') html += `<div class="slider-row ${c.left ? 'left-limb' : ''}"><div class="slider-header"><span>${esc(c.label)}</span><span class="val" data-val="${c.key}">0</span></div><input type="range" ${attrs} min="${c.min}" max="${c.max}" step="${c.step || 1}"></div>`;
        else if (c.kind === 'checkbox') html += `<div class="slider-row inline"><span class="mono" style="font-size:9.5px;color:var(--muted)">${esc(c.label)}</span><input type="checkbox" ${attrs}></div>`;
        else if (c.kind === 'select') html += `<div class="slider-row"><div class="slider-header"><span>${esc(c.label)}</span></div><select ${attrs}>${c.options.map(o => `<option value="${esc(o[0])}">${esc(o[1])}</option>`).join('')}</select></div>`;
        else if (c.kind === 'json') html += `<div class="slider-row"><div class="slider-header"><span>${esc(c.label)}</span><span class="val" data-val="${c.key}">JSON</span></div><textarea ${attrs} rows="7" spellcheck="false" style="width:100%;background:#0f0f18;border:1px solid var(--border);color:var(--text);border-radius:6px;padding:5px 7px;font-family:'JetBrains Mono',monospace;font-size:10px;outline:none;resize:vertical"></textarea></div>`;
        else if (c.kind === 'multiline') html += `<div class="slider-row"><div class="slider-header"><span>${esc(c.label)}</span></div><textarea ${attrs} rows="6" spellcheck="false" style="width:100%;background:#0f0f18;border:1px solid var(--border);color:var(--text);border-radius:6px;padding:5px 7px;font-family:'JetBrains Mono',monospace;font-size:11px;outline:none;resize:vertical"></textarea></div>`; // one item per line
        else if (c.kind === 'color') html += `<div class="slider-row"><div class="slider-header"><span>${esc(c.label)}</span><span class="val" data-val="${c.key}"></span></div><input type="color" ${attrs}></div>`;
        else html += `<div class="slider-row"><div class="slider-header"><span>${esc(c.label)}</span></div><input type="${c.kind === 'number' ? 'number' : 'text'}" ${attrs} ${c.kind === 'number' ? 'step="any"' : ''}></div>`;
      });
      html += '</div>';
    });
    if (a.type === 'character') html += `<div class="insp-note"><b style="color:var(--green)">FK CHAIN:</b> hand = shoulder + elbow + wrist • foot = hip + knee + ankle − 90°. Red = left limbs (depth).</div>`;
    if (a.type === 'external' && a.external) html += `<div class="insp-note">Preview is an approximation. Renders as <b style="color:var(--cyan)">&lt;${esc(a.componentName)}&gt;</b> from <b>${esc(a.external.importPath)}</b>${a.external.package ? ' (npm: ' + esc(a.external.package) + ')' : ''} at its scene-tree position (as an HTML layer).</div>`;
    if (a.type === 'three') html += `<div class="insp-note">Rendered on the WebGL overlay (always above SVG layers, same as &lt;ThreeCanvas&gt; in Remotion). X/Y map 1:1 to composition pixels via an orthographic camera.</div>`;
    body.innerHTML = html; syncInspectorValues();
  }
  function syncInspectorValues() {
    const a = selected(); if (!a || ui.inspectorAsset !== a.id) return; const p = sampleAsset(a, store.currentFrame); const body = $('inspBody');
    body.querySelectorAll('[data-key]').forEach(el => {
      const key = el.dataset.key; const v = el.dataset.path === 'top' ? p[key] : p.customProperties[key]; const kind = el.dataset.kind;
      if (document.activeElement === el && (kind === 'text' || kind === 'multiline' || kind === 'number' || kind === 'numlist' || kind === 'json')) return;
      if (kind === 'range') { el.value = isNum(v) ? v : 0; const out = body.querySelector(`[data-val="${key}"]`); if (out) out.textContent = isNum(v) ? (Number.isInteger(+el.step) || el.step === '1' ? Math.round(v) : (+v).toFixed(2)) : '—'; }
      else if (kind === 'checkbox') el.checked = !!v;
      else if (kind === 'select') el.value = String(v);
      else if (kind === 'color') { const hex = /^#[0-9a-f]{6}$/i.test(String(v)) ? v : '#000000'; el.value = hex; const out = body.querySelector(`[data-val="${key}"]`); if (out) out.textContent = String(v ?? ''); }
      else if (kind === 'numlist') el.value = Array.isArray(v) ? v.map(x => round2(x)).join(', ') : '';
      else if (kind === 'multiline') el.value = v === undefined || v === null ? '' : String(v);
      else if (kind === 'json') { el.value = v === undefined ? '' : JSON.stringify(v, null, 1); el.style.borderColor = ''; const out = body.querySelector(`[data-val="${key}"]`); if (out) out.textContent = Array.isArray(v) ? v.length + ' items' : 'JSON'; }
      else el.value = v ?? '';
    });
  }
  function readControl(el) {
    const kind = el.dataset.kind; if (kind === 'range' || kind === 'number') return parseFloat(el.value); if (kind === 'checkbox') return el.checked;
    if (kind === 'numlist') return el.value.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
    if (kind === 'json') { try { const v = JSON.parse(el.value); el.style.borderColor = ''; return v; } catch (e) { el.style.borderColor = 'var(--accent)'; return undefined; } }
    if (kind === 'select') { const v = el.value; return /^-?\d+(\.\d+)?$/.test(v) ? Number(v) : v; } return el.value;
  }
  $('inspBody').addEventListener('input', e => { const el = e.target; if (!el.dataset.key) return; const a = selected(); if (!a || a.locked) return; const v = readControl(el); if (el.dataset.kind === 'number' && isNaN(v)) return; if (el.dataset.kind === 'json' && v === undefined) return; const partial = el.dataset.path === 'top' ? { [el.dataset.key]: v } : { customProperties: { [el.dataset.key]: v } }; if (el.dataset.static) writeAllKeyframes(a, partial); else writeKeyframe(a, store.currentFrame, partial); frameUpdate(); if (el.dataset.kind === 'range') { const out = $('inspBody').querySelector(`[data-val="${el.dataset.key}"]`); if (out) out.textContent = el.step === '1' ? Math.round(v) : v.toFixed(2); } });
  $('inspBody').addEventListener('change', e => { const el = e.target; if (el.dataset.assetField) { const a = selected(); if (a) { try { StudioAPI.updateAsset({ assetId: a.id, [el.dataset.assetField]: el.value }); } catch (err) { toast(err.message); } } return; } if (!el.dataset.key) return; const a = selected(); if (!a || a.locked) return; commit({ structure: true }); });
  $('inspHead').addEventListener('click', () => $('inspector').classList.toggle('collapsed'));

  /* =====================================================================
     COLUMN A — CATALOG + SCENE TREE
     ===================================================================== */
  function buildCatalog() {
    const list = $('catalogList'); const items = CATALOG.filter(c => c.tab === ui.tab); $('catalogCount').textContent = CATALOG.length;
    list.innerHTML = items.map(c => `<div class="cat-item"><div class="cat-icon">${c.icon}</div><div class="cat-meta"><b>${esc(c.name)}</b><small>${esc(c.desc)} • <span class="type-${c.type}">${c.componentName}</span></small></div><button class="btn sm green" data-add="${c.id}">+ Add</button></div>`).join('');
  }
  $('catalogTabs').addEventListener('click', e => { const t = e.target.closest('.tab'); if (!t) return; ui.tab = t.dataset.tab; $('catalogTabs').querySelectorAll('.tab').forEach(x => x.classList.toggle('active', x === t)); buildCatalog(); });
  $('catalogList').addEventListener('click', e => { const b = e.target.closest('[data-add]'); if (!b) return; const a = StudioAPI.addAsset({ catalogId: b.dataset.add, frame: 0 }); toast('Added ' + a.name); });
  document.querySelectorAll('.drawer-head').forEach(h => h.addEventListener('click', () => { const d = $(h.dataset.drawer); const open = document.querySelectorAll('.drawer.open'); if (d.classList.contains('open') && open.length === 1) return; d.classList.toggle('open'); }));

  function buildSceneTree() {
    const list = $('treeList'); if (!store.assets.length) { list.innerHTML = `<div class="empty">Scene is empty.<br>Add assets from the catalog above.</div>`; return; }
    list.innerHTML = store.assets.slice().reverse().map((a, ri) => { const i = store.assets.length - 1 - ri; return `<div class="tree-row ${a.id === store.selectedAssetId ? 'selected' : ''} ${a.visible === false ? 'hidden-asset' : ''}" data-id="${a.id}">
      <div class="t-icon type-${a.type}">${TYPE_ICON[a.type] || '▣'}</div>
      <div class="t-name" data-name><span>${esc(a.name)}</span><small class="type-${a.type}">${wrapperOf(a.id) ? '↳ in ' + esc(wrapperOf(a.id).name) + ' • ' : ''}${a.componentName} • ${a.keyframes.length} KF${a.wraps ? ' • wraps ' + wrapIds(a).length : ''}</small></div>
      <button class="tbtn" data-act="up" title="Bring forward" ${i === store.assets.length - 1 ? 'disabled' : ''}>▲</button><button class="tbtn" data-act="down" title="Send backward" ${i === 0 ? 'disabled' : ''}>▼</button>
      <button class="tbtn ${a.visible !== false ? 'on' : ''}" data-act="vis" title="Show/Hide">${a.visible !== false ? '👁' : '◌'}</button>
      <button class="tbtn lock ${a.locked ? 'on' : ''}" data-act="lock" title="Lock/Unlock">${a.locked ? '🔒' : '🔓'}</button>
      <button class="tbtn del" data-act="del" title="Delete layer">✕</button></div>`; }).join('');
  }
  $('treeList').addEventListener('click', e => {
    const row = e.target.closest('.tree-row'); if (!row) return; const id = row.dataset.id; const act = e.target.closest('[data-act]');
    if (!act) { StudioAPI.selectAsset({ assetId: id }); return; }
    const a = getAsset(id); switch (act.dataset.act) {
      case 'up': StudioAPI.reorderAsset({ assetId: id, direction: 'up' }); break; case 'down': StudioAPI.reorderAsset({ assetId: id, direction: 'down' }); break;
      case 'vis': StudioAPI.updateAsset({ assetId: id, visible: a.visible === false }); break; case 'lock': StudioAPI.updateAsset({ assetId: id, locked: !a.locked }); break;
      case 'del': if (confirm(`Delete layer "${a.name}"?`)) StudioAPI.deleteAsset({ assetId: id }); break;
    }
  });
  $('treeList').addEventListener('dblclick', e => { const nm = e.target.closest('[data-name]'); if (!nm) return; const row = nm.closest('.tree-row'); const a = getAsset(row.dataset.id); nm.innerHTML = `<input value="${esc(a.name)}">`; const inp = nm.querySelector('input'); inp.focus(); inp.select(); const done = () => { const v = inp.value.trim(); if (v && v !== a.name) StudioAPI.updateAsset({ assetId: a.id, name: v }); else buildSceneTree(); }; inp.addEventListener('blur', done); inp.addEventListener('keydown', ev => { if (ev.key === 'Enter') inp.blur(); if (ev.key === 'Escape') { inp.value = a.name; inp.blur(); } }); });

  /* =====================================================================
     COLUMN C — PROMPT, PRESETS, MODIFIERS, EXPORT BOXES
     ===================================================================== */
  function buildPresetGrid() { $('presetGrid').innerHTML = Object.entries(PRESETS).map(([k, p]) => `<button class="preset-btn" data-preset="${k}"><b>${esc(p.label)}</b><small>${esc(p.desc)} • ${p.kf[p.kf.length - 1].frame}f</small></button>`).join(''); }
  function updatePresetTarget() { const a = selected(); const ok = a && a.type === 'character'; $('presetGrid').classList.toggle('disabled', !ok); $('presetTarget').textContent = ok ? '→ ' + a.name.toUpperCase() : (store.assets.some(x => x.type === 'character') ? 'SELECT A CHARACTER' : 'NO CHARACTER'); }
  $('presetGrid').addEventListener('click', e => { const b = e.target.closest('[data-preset]'); if (!b) return; try { const r = StudioAPI.applyPreset({ assetId: store.selectedAssetId, preset: b.dataset.preset }); toast(`${PRESETS[b.dataset.preset].label} → frames ${r.startFrame}–${r.endFrame}`); } catch (err) { toast(err.message); } });
  $('btnGenerate').addEventListener('click', () => { const v = $('aiPrompt').value.trim(); if (!v) return; try { const r = StudioAPI.generateFromPrompt({ prompt: v }); toast(`Generated "${r.preset}"${r.mirror ? ' (mirrored)' : ''}`); } catch (err) { toast(err.message); } });
  $('aiPrompt').addEventListener('keydown', e => { if (e.key === 'Enter') $('btnGenerate').click(); });

  function buildModifiers() {
    const a = selected(); const grid = $('modGrid');
    if (!a) { grid.innerHTML = ''; $('modTarget').textContent = '—'; $('modHint').textContent = 'Select a layer to see context-aware motion generators.'; return; }
    const mods = (MODIFIERS[a.type] || []).filter(m => !m.only || m.only === a.componentName);
    $('modTarget').textContent = a.componentName.toUpperCase(); $('modHint').textContent = `Generators write keyframes for "${a.name}" starting at the current frame.`;
    grid.innerHTML = mods.map(m => `<button class="mod-btn" data-mod="${m.id}"><b>${esc(m.label)}</b><small>${esc(m.desc)}</small></button>`).join('') || `<div class="hint">No modifiers for this type.</div>`;
  }
  $('modGrid').addEventListener('click', e => { const b = e.target.closest('[data-mod]'); if (!b) return; try { const r = StudioAPI.applyModifier({ assetId: store.selectedAssetId, modifier: b.dataset.mod }); toast(`Modifier applied → ${r.startFrame}–${r.endFrame}`); } catch (err) { toast(err.message); } });

  function updateExportBoxes() {
    const json = StudioAPI.exportJSON(); const kfs = store.assets.reduce((n, a) => n + a.keyframes.length, 0);
    $('stAssets').textContent = store.assets.length + ' assets'; $('stKfs').textContent = kfs + ' keyframes'; $('stBytes').textContent = (json.length / 1024).toFixed(1) + ' kb';
    $('stComps').textContent = new Set(store.assets.map(a => a.componentName)).size + ' components'; $('stDur').textContent = (store.totalFrames / store.fps).toFixed(1) + 's @ ' + store.fps + 'fps';
    $('jsonPreview').textContent = json.split('\n').slice(0, 9).join('\n'); $('codePreview').textContent = buildMasterScene().split('\n').slice(0, 9).join('\n');
  }
  document.querySelectorAll('[data-export]').forEach(b => b.addEventListener('click', () => { const kind = b.dataset.export, act = b.dataset.act; const bundle = StudioAPI.exportRemotion(); const file = kind === 'json' ? 'scene.json' : 'MasterScene.tsx'; if (act === 'copy') copy(bundle.files[file]); else if (act === 'download') download(file, bundle.files[file]); else openModal(file); }));
  $('exportBtn').addEventListener('click', () => openModal('MasterScene.tsx'));

  /* ---------------- EXPORT MODAL ---------------- */
  let modalFiles = null, modalActive = null;
  function openModal(active, files) { modalFiles = files || (modalFiles && modalFiles[active] && files === undefined && !(active in StudioAPI.exportRemotion().files) ? modalFiles : StudioAPI.exportRemotion().files); modalActive = active in modalFiles ? active : Object.keys(modalFiles)[0]; $('modalTabs').innerHTML = Object.keys(modalFiles).map(f => `<div class="tab ${f === modalActive ? 'active' : ''}" data-file="${f}">${f}</div>`).join(''); $('modalCode').textContent = modalFiles[modalActive]; $('modalInfo').textContent = `${modalActive} • ${(modalFiles[modalActive].length / 1024).toFixed(1)} kb`; $('modalBg').classList.add('open'); }
  $('modalTabs').addEventListener('click', e => { const t = e.target.closest('[data-file]'); if (!t) return; openModal(t.dataset.file, modalFiles); });
  $('modalClose').addEventListener('click', () => $('modalBg').classList.remove('open')); $('modalBg').addEventListener('click', e => { if (e.target === $('modalBg')) $('modalBg').classList.remove('open'); });
  $('modalCopy').addEventListener('click', () => copy(modalFiles[modalActive])); $('modalDownload').addEventListener('click', () => download(modalActive, modalFiles[modalActive]));
  $('modalDownloadAll').addEventListener('click', () => Object.entries(modalFiles).forEach(([n, c], i) => setTimeout(() => download(n, c), i * 250)));

  $('importBtn').addEventListener('click', () => { const input = document.createElement('input'); input.type = 'file'; input.accept = '.json'; input.onchange = e => { const r = new FileReader(); r.onload = () => { try { StudioAPI.setState(JSON.parse(r.result)); toast('Scene imported'); } catch (err) { alert('Invalid scene JSON: ' + err.message); } }; r.readAsText(e.target.files[0]); }; input.click(); });

  /* =====================================================================
     MULTI-TRACK TIMELINE
     ===================================================================== */
  function tickStep() { const target = 14; const steps = [1, 2, 5, 10, 15, 20, 30, 60, 90, 120, 150, 300, 600]; return steps.find(s => store.totalFrames / s <= target) || 600; }
  function buildTimelineTracks() {
    const grid = $('tlGrid'); const total = Math.max(1, store.totalFrames); const step = tickStep();
    let ticks = ''; for (let f = 0; f <= total; f += step) ticks += `<div class="tick" style="left:${(f / total * 100).toFixed(3)}%"><span>${f}</span></div>`;
    let laneTicks = ''; for (let f = 0; f <= total; f += step) laneTicks += `<div class="lane-tick" style="left:${(f / total * 100).toFixed(3)}%"></div>`;
    let html = `<div class="tl-row ruler"><div class="tl-label">FRAMES • ${store.fps}FPS</div><div class="tl-lane" data-lane="ruler">${ticks}</div></div>`;
    store.assets.slice().reverse().forEach(a => {
      const sel = ui.selectedKeyframe && ui.selectedKeyframe.assetId === a.id ? ui.selectedKeyframe.frame : null;
      const first = a.keyframes[0], last = a.keyframes[a.keyframes.length - 1];
      const span = first && last && last.frame > first.frame ? `<div class="kf-span" style="left:${(first.frame / total * 100).toFixed(3)}%;width:${((last.frame - first.frame) / total * 100).toFixed(3)}%"></div>` : '';
      const layerSpan = a.type === 'external' && (a.startFrame || a.durationInFrames) ? `<div class="layer-span" title="layer active ${a.startFrame || 0}–${a.durationInFrames ? (a.startFrame || 0) + a.durationInFrames : 'end'}" style="left:${((a.startFrame || 0) / total * 100).toFixed(3)}%;width:${(Math.min(total - (a.startFrame || 0), a.durationInFrames || total) / total * 100).toFixed(3)}%"></div>` : '';
      const kfs = layerSpan + a.keyframes.map(k => `<div class="kf ${a.type} ${sel === k.frame ? 'active' : ''}" data-frame="${k.frame}" style="left:${(k.frame / total * 100).toFixed(3)}%" title="${esc(a.name)} @ ${k.frame}"></div>`).join('');
      html += `<div class="tl-row ${a.id === store.selectedAssetId ? 'selected' : ''} ${a.visible === false ? 'hidden-asset' : ''}" data-id="${a.id}"><div class="tl-label"><span class="type-${a.type}">${TYPE_ICON[a.type] || '▣'}</span><span style="overflow:hidden;text-overflow:ellipsis">${esc(a.name)}</span><small>${a.keyframes.length}◆</small></div><div class="tl-lane" data-lane="${a.id}">${laneTicks}${span}${kfs}</div></div>`;
    });
    if (!store.assets.length) html += `<div class="empty">No tracks yet — every asset added to the scene gets its own keyframe lane here.</div>`;
    html += `<div class="playhead" id="playhead"><span class="playhead-label" id="playheadLabel"></span></div>`;
    grid.innerHTML = html; updatePlayhead();
  }
  function laneGeom() { const lane = $('tlGrid').querySelector('.tl-lane'); if (!lane) return null; return { left: lane.offsetLeft, width: lane.clientWidth || 1 }; }
  function updatePlayhead() { const ph = $('playhead'); if (!ph) return; const g = laneGeom(); if (!g) return; const pct = clamp(store.currentFrame / Math.max(1, store.totalFrames), 0, 1); ph.style.left = (g.left + pct * g.width) + 'px'; $('playheadLabel').textContent = Math.floor(store.currentFrame) + 'f'; }
  function frameFromEvent(e, laneEl) { const r = laneEl.getBoundingClientRect(); return clamp(Math.round((e.clientX - r.left) / r.width * store.totalFrames), 0, store.totalFrames); }

  $('tlGrid').addEventListener('pointerdown', e => {
    const kfEl = e.target.closest('.kf'); const lane = e.target.closest('.tl-lane'); const label = e.target.closest('.tl-label');
    if (label) { const row = label.closest('.tl-row'); if (row && row.dataset.id) StudioAPI.selectAsset({ assetId: row.dataset.id }); return; }
    if (!lane) return; const laneId = lane.dataset.lane;
    if (kfEl) { const asset = getAsset(laneId); ui.tlDrag = { kind: 'kf', asset, frame: +kfEl.dataset.frame, lane, startX: e.clientX, moved: false }; $('tlGrid').setPointerCapture(e.pointerId); e.preventDefault(); return; }
    ui.tlDrag = { kind: 'scrub', lane }; $('tlGrid').setPointerCapture(e.pointerId);
    if (laneId !== 'ruler' && store.selectedAssetId !== laneId) { store.selectedAssetId = laneId; ui.selectedKeyframe = null; commit({ structure: true, history: false }); }
    if (ui.isPlaying) StudioAPI.pause(); store.currentFrame = frameFromEvent(e, lane); ui.selectedKeyframe = null; frameUpdate();
  });
  $('tlGrid').addEventListener('pointermove', e => {
    const d = ui.tlDrag; if (!d) return;
    if (d.kind === 'scrub') { store.currentFrame = frameFromEvent(e, d.lane); frameUpdate(); return; }
    if (Math.abs(e.clientX - d.startX) > 4) d.moved = true;
    if (d.moved) { const to = frameFromEvent(e, d.lane); if (to !== d.frame && !d.asset.keyframes.some(k => k.frame === to)) { try { StudioAPI.moveKeyframe({ assetId: d.asset.id, frame: d.frame, toFrame: to, history: false }); d.frame = to; } catch (err) { } } }
  });
  const endTlDrag = () => { const d = ui.tlDrag; if (!d) return; ui.tlDrag = null;
    if (d.kind === 'kf') { if (d.moved) { commit({ structure: true }); } else { store.selectedAssetId = d.asset.id; store.currentFrame = d.frame; ui.selectedKeyframe = { assetId: d.asset.id, frame: d.frame }; if (ui.isPlaying) StudioAPI.pause(); commit({ structure: true, history: false }); } }
    else commit({ history: false }); };
  $('tlGrid').addEventListener('pointerup', endTlDrag); $('tlGrid').addEventListener('pointercancel', endTlDrag);
  new ResizeObserver(updatePlayhead).observe($('tlScroll'));

  /* transport */
  $('tlStart').addEventListener('click', () => StudioAPI.changeCurrentFrame({ frame: 0 }));
  $('tlEnd').addEventListener('click', () => StudioAPI.changeCurrentFrame({ frame: store.totalFrames }));
  $('tlPlay').addEventListener('click', () => StudioAPI.togglePlay()); $('playBtn').addEventListener('click', () => StudioAPI.togglePlay());
  $('tlLoop').addEventListener('click', () => { ui.loop = !ui.loop; $('tlLoop').classList.toggle('active', ui.loop); });
  $('inFrame').addEventListener('change', e => StudioAPI.changeCurrentFrame({ frame: +e.target.value }));
  $('inTotal').addEventListener('change', e => StudioAPI.setTimeline({ totalFrames: +e.target.value }));
  $('inFps').addEventListener('change', e => StudioAPI.setTimeline({ fps: +e.target.value }));
  $('inSpeed').addEventListener('input', e => { ui.speed = +e.target.value; $('vSpeed').textContent = ui.speed.toFixed(1) + 'x'; });
  $('btnAddKF').addEventListener('click', () => { try { StudioAPI.addKeyframeAtCurrent(); toast('Keyframe added'); } catch (err) { toast(err.message); } });
  $('btnDelKF').addEventListener('click', () => { const k = ui.selectedKeyframe; if (!k) return; try { StudioAPI.removeKeyframe(k); toast('Keyframe removed'); } catch (err) { toast(err.message); } });
  $('btnDupAsset').addEventListener('click', () => { try { StudioAPI.duplicateAsset({}); } catch (err) { toast(err.message); } });
  ['chkGrid', 'chkSafe'].forEach(id => $(id).addEventListener('change', renderGrid)); $('chkGhost').addEventListener('change', renderViewport);
  $('undoBtn').addEventListener('click', undo); $('redoBtn').addEventListener('click', redo);

  /* ---------------- PLAYBACK LOOP ---------------- */
  function tick(ts) {
    if (!ui.lastTime) ui.lastTime = ts; const dt = Math.min(0.1, (ts - ui.lastTime) / 1000); ui.lastTime = ts;
    if (ui.isPlaying) {
      store.currentFrame += dt * store.fps * ui.speed;
      if (store.currentFrame >= store.totalFrames) { if (ui.loop) store.currentFrame = 0; else { store.currentFrame = store.totalFrames; StudioAPI.pause(); } }
      frameUpdate(); if (dt > 0) { ui.fpsSmooth = ui.fpsSmooth * 0.9 + (1 / dt) * 0.1; $('fpsCounter').textContent = Math.round(ui.fpsSmooth); }
    }
    requestAnimationFrame(tick);
  }

  /* ---------------- KEYBOARD ---------------- */
  document.addEventListener('keydown', e => {
    const tag = (e.target.tagName || '').toLowerCase(); if (tag === 'input' || tag === 'select' || tag === 'textarea') return;
    if (e.code === 'Space') { e.preventDefault(); StudioAPI.togglePlay(); }
    else if (e.key === 'ArrowLeft') { StudioAPI.changeCurrentFrame({ frame: Math.floor(store.currentFrame) - (e.shiftKey ? 10 : 1) }); }
    else if (e.key === 'ArrowRight') { StudioAPI.changeCurrentFrame({ frame: Math.floor(store.currentFrame) + (e.shiftKey ? 10 : 1) }); }
    else if (e.key.toLowerCase() === 'k') { try { StudioAPI.addKeyframeAtCurrent(); } catch (err) { } }
    else if (e.key === 'Delete' || e.key === 'Backspace') { if (ui.selectedKeyframe) { try { StudioAPI.removeKeyframe(ui.selectedKeyframe); } catch (err) { toast(err.message); } } }
    else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); }
    else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') { e.preventDefault(); redo(); }
    else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') { e.preventDefault(); if (selected()) StudioAPI.duplicateAsset({}); }
    else if (e.key === 'Escape') { if ($('modalBg').classList.contains('open')) $('modalBg').classList.remove('open'); else StudioAPI.selectAsset(null); }
  });

  /* =====================================================================
     SCENE VALIDATION (check_scene) — structured critique for agents & humans
     ===================================================================== */
  function localBBox(asset, p) {
    const cp = p.customProperties || {};
    if (asset.type === 'three') { const s = (cp.size || 200) / 2; return { x: -s, y: -s, width: s * 2, height: s * 2 }; }
    // External components render inside their layer box; measuring the preview would sample frame 0, where entrance animations may still be off-box
    if (asset.type === 'external' && isNum(cp.width) && isNum(cp.height)) return { x: 0, y: 0, width: +cp.width, height: +cp.height };
    const cat = catalogOf(asset); if (!cat) return null;
    const layer = $('measureLayer'); layer.innerHTML = `<g>${cat.render(cp, { uid: 'm_' + asset.id, entry: cat })}</g>`;
    try { const bb = layer.firstChild.getBBox(); return { x: bb.x, y: bb.y, width: bb.width, height: bb.height }; } catch (e) { return null; } finally { layer.innerHTML = ''; }
  }
  function worldAABB(asset, p) {
    const bb = localBBox(asset, p); if (!bb || (!bb.width && !bb.height)) return null;
    const sx = (p.scale || 1) * (p.customProperties.facing === -1 ? -1 : 1), sy = p.scale || 1, r = (p.rotation || 0) * Math.PI / 180, cos = Math.cos(r), sin = Math.sin(r);
    const pts = [[bb.x, bb.y], [bb.x + bb.width, bb.y], [bb.x + bb.width, bb.y + bb.height], [bb.x, bb.y + bb.height]].map(([x, y]) => { const lx = x * sx, ly = y * sy; return [p.baseX + lx * cos - ly * sin, p.baseY + lx * sin + ly * cos]; });
    const xs = pts.map(q => q[0]), ys = pts.map(q => q[1]); return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
  }
  function validateScene(opts) {
    const errors = [], warnings = [], info = []; const W = store.width, H = store.height, T = store.totalFrames;
    const push = (arr, code, message, extra) => arr.push(Object.assign({ code, message }, extra || {}));
    if (!store.assets.length) push(errors, 'no_assets', 'Scene has no assets. Add a background and at least one subject.');
    const frameSet = new Set([0, T, Math.round(T / 2)]); store.assets.forEach(a => a.keyframes.forEach(k => frameSet.add(k.frame)));
    let frames = [...frameSet].filter(f => f >= 0 && f <= T).sort((x, y) => x - y); if (frames.length > 48) { const step = frames.length / 48; frames = Array.from({ length: 48 }, (_, i) => frames[Math.floor(i * step)]); }
    const floors = store.assets.filter(a => a.visible !== false && ['FloorLine', 'StreetBlock'].includes(a.componentName)).map(a => sampleAsset(a, 0).baseY).concat(store.assets.filter(a => a.componentName === 'IndoorRoom').map(a => sampleAsset(a, 0).baseY + (sampleAsset(a, 0).customProperties.floorY || 820)));
    const floorY = floors.length ? Math.min(...floors) : null;
    const vis = store.assets.filter(a => a.visible !== false);
    let lastKf = 0;
    store.assets.forEach(a => {
      const cat = catalogOf(a);
      if (!a.keyframes.length) push(errors, 'asset_no_keyframes', `"${a.name}" has no keyframes.`, { assetId: a.id, fix: 'set_keyframe with frame 0' });
      if (!cat) push(errors, 'component_unknown', `"${a.name}" uses unknown component ${a.componentName}.`, { assetId: a.id, fix: 'register_component or use a catalog asset' });
      a.keyframes.forEach(k => { lastKf = Math.max(lastKf, k.frame); if (k.frame > T) push(errors, 'keyframe_beyond_duration', `"${a.name}" keyframe at ${k.frame} is after totalFrames ${T}.`, { assetId: a.id, frame: k.frame, fix: `set_timeline totalFrames ≥ ${k.frame} or move_keyframe` });
        const bad = []; const walk = (o, path) => { for (const key in o) { const v = o[key]; if (typeof v === 'number' && !isFinite(v)) bad.push(path + key); else if (v && typeof v === 'object' && !Array.isArray(v)) walk(v, path + key + '.'); } }; walk(k.properties, ''); if (bad.length) push(errors, 'invalid_numeric', `"${a.name}" @${k.frame} has NaN/∞ in ${bad.join(', ')}.`, { assetId: a.id, frame: k.frame }); });
      if (a.type === 'external' && (a.startFrame || 0) >= T) push(errors, 'layer_starts_after_end', `"${a.name}" starts at frame ${a.startFrame}, after the composition ends (${T}).`, { assetId: a.id, fix: 'update_asset startFrame lower, or set_timeline totalFrames higher' });
      if (a.type === 'external' && a.durationInFrames && (a.startFrame || 0) + a.durationInFrames > T) push(warnings, 'layer_cut_off', `"${a.name}" runs to frame ${(a.startFrame || 0) + a.durationInFrames} but the composition ends at ${T}.`, { assetId: a.id });
      if (a.visible === false) push(info, 'hidden_layer', `"${a.name}" is hidden and will not render.`, { assetId: a.id });
      if (a.keyframes.length && a.keyframes.every(k => (k.properties.opacity ?? 1) <= 0.01)) push(warnings, 'always_transparent', `"${a.name}" has opacity 0 on every keyframe.`, { assetId: a.id });
      if (a.componentName === 'TradingChart' || a.componentName === 'BarChart') a.keyframes.forEach(k => { const d = (k.properties.customProperties || {}).data || (k.properties.customProperties || {}).values; if (!Array.isArray(d) || d.length < 2) push(errors, 'chart_insufficient_data', `"${a.name}" @${k.frame} needs ≥2 data points.`, { assetId: a.id, frame: k.frame }); });
      if (a.keyframes.some(k => (k.properties.scale || 1) > 6)) push(warnings, 'huge_scale', `"${a.name}" is scaled above 6×; check it is intentional.`, { assetId: a.id });
      if (a.external && (a.external.package || (a.external.packages || []).length)) { const pk = [a.external.package].concat(a.external.packages || []).filter(Boolean); push(info, 'external_package', `"${a.name}" needs npm ${pk.join(', ')} in the render project.`, { assetId: a.id, packages: pk }); }
      if (a.type === 'three' && !ThreeBridge.ready) push(info, 'three_offline', `"${a.name}" preview is a placeholder (three.js offline); the Remotion render is unaffected.`, { assetId: a.id });
    });
    const skipBox = a => a.type === 'environment' || (catalogOf(a) || {}).fullFrame || (a.preview && a.preview.kind === 'audio') || a.componentName === 'Audio';
    const boxes = {}; frames.forEach(f => { boxes[f] = {}; vis.forEach(a => { if (skipBox(a)) return; const p = sampleAsset(a, f); if ((p.opacity ?? 1) < 0.05) return; const bb = worldAABB(a, p); if (bb) boxes[f][a.id] = bb; }); });
    const offscreen = {}, clipping = {}, unsafe = {}, overlaps = {};
    frames.forEach(f => {
      const bx = boxes[f]; const ids = Object.keys(bx);
      ids.forEach(id => { const b = bx[id]; const a = getAsset(id);
        if (b.maxX < 0 || b.minX > W || b.maxY < 0 || b.minY > H) (offscreen[id] = offscreen[id] || []).push(f);
        if (a.type === 'character' && floorY !== null) { const legReach = 123 * (sampleAsset(a, f).scale || 1); if (b.maxY > floorY + legReach + 40) (clipping[id] = clipping[id] || []).push(f); }
        if ((a.type === 'text' || a.type === 'widget') && (b.minX < W * 0.05 || b.maxX > W * 0.95 || b.minY < H * 0.05 || b.maxY > H * 0.95) && !(b.maxX < 0 || b.minX > W || b.maxY < 0 || b.minY > H)) (unsafe[id] = unsafe[id] || []).push(f); });
      const chars = ids.filter(id => getAsset(id).type === 'character');
      for (let i = 0; i < chars.length; i++) for (let j = i + 1; j < chars.length; j++) { const A = bx[chars[i]], B = bx[chars[j]]; const ix = Math.max(0, Math.min(A.maxX, B.maxX) - Math.max(A.minX, B.minX)), iy = Math.max(0, Math.min(A.maxY, B.maxY) - Math.max(A.minY, B.minY)); const inter = ix * iy; const small = Math.min((A.maxX - A.minX) * (A.maxY - A.minY), (B.maxX - B.minX) * (B.maxY - B.minY)) || 1; if (inter / small > 0.4) { const key = chars[i] + '|' + chars[j]; (overlaps[key] = overlaps[key] || []).push(f); } }
    });
    const rng = fr => fr.length === 1 ? `frame ${fr[0]}` : `frames ${fr[0]}–${fr[fr.length - 1]} (${fr.length} sampled)`;
    Object.entries(offscreen).forEach(([id, fr]) => push(fr.length === frames.length ? errors : warnings, 'offscreen', `"${getAsset(id).name}" is fully outside the ${W}×${H} frame at ${rng(fr)}.`, { assetId: id, frames: fr, fix: 'set_keyframe baseX/baseY inside the frame or set_aspect refit' }));
    Object.entries(clipping).forEach(([id, fr]) => push(warnings, 'character_below_floor', `"${getAsset(id).name}" sinks below the floor line (y=${Math.round(floorY)}) at ${rng(fr)}. baseY is the hip; feet land ≈123×scale px lower.`, { assetId: id, frames: fr, fix: 'raise baseY (hip) or adjust hip/knee angles' }));
    Object.entries(unsafe).forEach(([id, fr]) => push(warnings, 'outside_safe_area', `"${getAsset(id).name}" leaves the 5% title-safe area at ${rng(fr)}.`, { assetId: id, frames: fr }));
    Object.entries(overlaps).forEach(([key, fr]) => { const [a, b] = key.split('|'); push(warnings, 'characters_overlap', `"${getAsset(a).name}" and "${getAsset(b).name}" overlap heavily at ${rng(fr)}.`, { assetIds: [a, b], frames: fr, fix: 'separate baseX or offset the choreography start frames' }); });
    const coversFrame = a => { if (a.type !== 'external' || wrapperOf(a.id)) return false; const bb = worldAABB(a, sampleAsset(a, 0)); return !!bb && bb.minX <= 1 && bb.minY <= 1 && bb.maxX >= W - 1 && bb.maxY >= H - 1; }; // e.g. a 1280×720 remocn layout at scale 1.5
    if (store.assets.length && !vis.some(a => a.type === 'environment' || a.componentName === 'Img' || a.componentName === 'OffthreadVideo' || (catalogOf(a) || {}).fullFrame || coversFrame(a))) push(warnings, 'no_background', 'No environment or media background; the scene renders on a flat colour.', { fix: 'add_asset sky_gradient / indoor_room / remotion_img' });
    store.assets.forEach(a => { const missing = wrapIds(a).filter(id => !getAsset(id)); if (missing.length) push(warnings, 'wrap_missing', `"${a.name}" wraps missing layers: ${missing.join(', ')}.`, { assetId: a.id, fix: 'update_asset wraps with existing ids' }); if (a.wraps && !(a.external && a.external.children)) push(warnings, 'wrap_unsupported', `"${a.name}" has wraps but its component takes no children.`, { assetId: a.id }); });
    // External components animate inside their layer span, so a layer running to its end counts as motion, not just its keyframes
    vis.forEach(a => { if (a.type !== 'external') return; const cat = catalogOf(a) || {}; const dur = a.durationInFrames || cat.defaultDurationInFrames || T - (a.startFrame || 0); lastKf = Math.max(lastKf, Math.min(T, (a.startFrame || 0) + dur)); });
    // Craft (remocn.dev/docs/craft): stagger sibling entrances 3–6 frames; sentence case and default tracking on your own text
    const entrances = {}; vis.forEach(a => { if (skipBox(a) || !a.keyframes.length) return; const kfs = a.keyframes.slice().sort((x, y) => x.frame - y.frame);
      const firstVisible = kfs.find(k => (k.properties.opacity ?? 1) >= 0.05); if (!firstVisible) return; const f = a.type === 'external' ? Math.max(a.startFrame || 0, firstVisible.frame) : firstVisible.frame; (entrances[f] = entrances[f] || []).push(a.id); });
    Object.entries(entrances).forEach(([f, ids]) => { if (ids.length >= 3) push(warnings, 'simultaneous_entrances', `${ids.length} layers enter together at frame ${f}: ${ids.map(id => `"${getAsset(id).name}"`).join(', ')}. Landing a group on one frame reads robotic.`, { assetIds: ids, frame: +f, fix: 'stagger entrances 3–6 frames apart (startFrame, or the first visible keyframe)' }); });
    vis.forEach(a => { if (a.type !== 'text') return; const cp = sampleAsset(a, 0).customProperties || {}; const caps = [cp.text, cp.subtitle].filter(t => typeof t === 'string' && /[A-Z]{2}/.test(t) && t.replace(/[^A-Za-z]/g, '').length >= 4 && t === t.toUpperCase());
      if (caps.length || (cp.letterSpacing || 0) > 2) push(info, 'craft_text_style', `"${a.name}" uses ${caps.length ? 'ALL-CAPS text' : ''}${caps.length && (cp.letterSpacing || 0) > 2 ? ' and ' : ''}${(cp.letterSpacing || 0) > 2 ? `wide tracking (${cp.letterSpacing}px)` : ''}; generated videos read as machine-made when every line is styled this way.`, { assetId: a.id, fix: 'prefer sentence case and default letter-spacing unless the design calls for it' }); });
    if (store.assets.length && lastKf < T * 0.5 && T > 30) push(warnings, 'unused_duration', `Last keyframe is at ${lastKf} but the composition lasts ${T} frames; the second half is static.`, { fix: `set_timeline totalFrames ≈ ${lastKf + Math.round(store.fps / 2)} or add motion` });
    if (vis.some(a => a.type === 'character') && !vis.some(a => a.type === 'character' && a.keyframes.length > 1)) push(info, 'static_characters', 'Characters have a single pose; apply_preset or apply_modifier to animate.', {});
    const aspect = aspectLabel(W, H); const preset = ASPECT_PRESETS.find(a => a.width === W && a.height === H);
    push(info, 'composition', `${W}×${H} (${aspect}${preset ? ' • ' + preset.label : ''}) • ${T} frames @ ${store.fps}fps = ${(T / store.fps).toFixed(2)}s • ${store.assets.length} layers`, { width: W, height: H, aspect, fps: store.fps, totalFrames: T });
    const score = Math.max(0, 100 - errors.length * 20 - warnings.length * 6);
    return { ok: errors.length === 0, score, summary: `${errors.length} errors, ${warnings.length} warnings, ${info.length} notes`, errors, warnings, info, checkedFrames: frames };
  }
  function formatReport(r) { const line = it => `  [${it.code}] ${it.message}${it.fix ? '\n      → ' + it.fix : ''}`; return [`SCENE CHECK — ${r.ok ? 'PASS' : 'FAIL'} • score ${r.score}/100 • ${r.summary}`, '', 'ERRORS', ...(r.errors.length ? r.errors.map(line) : ['  none']), '', 'WARNINGS', ...(r.warnings.length ? r.warnings.map(line) : ['  none']), '', 'NOTES', ...r.info.map(line), '', `checked frames: ${r.checkedFrames.join(', ')}`].join('\n'); }
  $('checkBtn').addEventListener('click', () => { const r = validateScene({}); openModal('scene-check.txt', { 'scene-check.txt': formatReport(r), 'scene-check.json': JSON.stringify(r, null, 2) }); });
  $('renderBtn').addEventListener('click', () => Bridge.requestRender({ codec: 'h264' }));
  $('aspectSelect').addEventListener('change', e => { if (e.target.value === 'custom') return; StudioAPI.setAspect({ preset: e.target.value, refit: $('chkRefit').checked }); toast('Aspect → ' + e.target.value); });
  const applyCustomSize = () => { const w = +$('inW').value, h = +$('inH').value; if (w >= 16 && h >= 16 && (w !== store.width || h !== store.height)) StudioAPI.setAspect({ width: w, height: h, refit: $('chkRefit').checked }); };
  $('inW').addEventListener('change', applyCustomSize); $('inH').addEventListener('change', applyCustomSize);

  /* =====================================================================
     EXPORT GENERATORS
     ===================================================================== */
  function exportState() { const s = clone(store); delete s.selectedAssetId; s.assets.forEach(a => a.keyframes.forEach(k => { k.frame = Math.round(k.frame); walkRound(k.properties); })); return s; }
  function walkRound(o) { for (const k in o) { if (isNum(o[k])) o[k] = round2(o[k]); else if (Array.isArray(o[k])) o[k] = o[k].map(v => isNum(v) ? round2(v) : v); else if (o[k] && typeof o[k] === 'object') walkRound(o[k]); } }
  function buildMasterScene() {
    const s = exportState(); const comps = [...new Set(s.assets.map(a => a.componentName))];
    return [
      `// Generated by Remotion Production Suite — ${new Date().toISOString()}`,
      `// Scene: ${s.name} • ${s.width}x${s.height} @ ${s.fps}fps • ${s.totalFrames} frames • ${s.assets.length} layers`,
      `// Components used: ${comps.join(', ') || '(none)'}`,
      `import React from 'react';`,
      `import { SceneRenderer, type SceneState } from './remotion/SceneRenderer';`,
    ].concat(externalImports(s)).concat([
      ``,
      `// Every layer is one entry in SCENE.assets; SceneRenderer maps the array in z-order`,
      `// (index 0 = back) and interpolates each asset's keyframes at useCurrentFrame().`,
      `export const SCENE: SceneState = ${JSON.stringify(s, null, 2)};`,
      ``,
      `// External / community components referenced by SCENE.assets[].external`,
      `const EXTERNAL_REGISTRY = { ${externalsOf(s).map(e => e.exportName === 'default' ? e.componentName : e.exportName).join(', ')} };`,
      ``,
      `export const MasterScene: React.FC = () => <SceneRenderer scene={SCENE} registry={EXTERNAL_REGISTRY} />;`,
      `export default MasterScene;`,
    ]).join('\n');
  }
  function externalsOf(s) { const seen = new Map(); (s || store).assets.forEach(a => { if (a.external && !seen.has(a.componentName)) seen.set(a.componentName, Object.assign({ componentName: a.componentName }, a.external)); }); return [...seen.values()]; }
  function externalImports(s) {
    const groups = new Map();
    externalsOf(s).forEach(e => { const path = e.importPath.startsWith('./') ? './remotion/' + e.importPath.slice(2) : e.importPath; if (!groups.has(path)) groups.set(path, { named: [], def: null }); if (e.exportName === 'default') groups.get(path).def = e.componentName; else groups.get(path).named.push(e.exportName); });
    return [...groups.entries()].map(([path, g]) => `import ${[g.def, g.named.length ? `{ ${g.named.join(', ')} }` : null].filter(Boolean).join(', ')} from '${path}';`);
  }
  function buildRoot() {
    const s = store; return [
      `import React from 'react';`, `import { Composition } from 'remotion';`, `import { MasterScene, SCENE } from './MasterScene';`, ``,
      `export const RemotionRoot: React.FC = () => (`, `  <>`, `    <Composition`, `      id="MasterScene"`, `      component={MasterScene}`, `      durationInFrames={SCENE.totalFrames} // ${s.totalFrames}`, `      fps={SCENE.fps} // ${s.fps}`, `      width={SCENE.width} // ${s.width}`, `      height={SCENE.height} // ${s.height}`, `    />`, `  </>`, `);`, ``,
      `// Render: npx remotion render src/index.ts MasterScene out/master.mp4`, `// 3D layers need: npm i three @react-three/fiber @remotion/three`, `// External components need their packages, see export bundle .packages`,
    ].join('\n');
  }
  function buildRemotionBundle() {
    const files = { 'scene.json': StudioAPI.exportJSON(), 'MasterScene.tsx': buildMasterScene(), 'Root.tsx': buildRoot(), 'mcp-manifest.json': JSON.stringify({ generatedAt: new Date().toISOString(), api: StudioAPI.describe(), catalog: StudioAPI.listCatalog() }, null, 2) };
    const renderTimeoutMs = Math.max(0, ...store.assets.map(a => Number((catalogOf(a) || {}).renderTimeoutMs) || 0)) || undefined;
    return { renderTimeoutMs, files, componentsUsed: [...new Set(store.assets.map(a => a.componentName))], threeUsed: store.assets.some(a => a.type === 'three'), externals: externalsOf(store), packages: [...new Set(externalsOf(store).flatMap(e => [e.package].concat(e.packages || [])).filter(Boolean).concat(store.assets.some(a => a.type === 'three') ? ['three', '@react-three/fiber', '@remotion/three'] : []))], width: store.width, height: store.height, fps: store.fps, totalFrames: store.totalFrames, name: store.name };
  }

  /* =====================================================================
     MCP BRIDGE — WebSocket JSON-RPC to mcp/server.mjs
     Incoming  : {id, method, params}   →  StudioAPI[method](params)
     Outgoing  : {id, result} | {id, error}   and   {event:'state', state} on every commit
     ===================================================================== */
  const Bridge = {
    ws: null, retry: null,
    connect() {
      clearTimeout(this.retry); try { this.ws && this.ws.close(); } catch (e) { }
      let ws; try { ws = new WebSocket(ui.bridgeUrl); } catch (e) { this.status(false); this.retry = setTimeout(() => this.connect(), 4000); return; }
      this.ws = ws;
      ws.onopen = () => { this.status(true); ws.send(JSON.stringify({ event: 'hello', role: 'studio', href: location.href, title: document.title, api: StudioAPI.describe().map(d => d.method) })); ws.send(JSON.stringify({ event: 'state', state: store })); };
      ws.onclose = () => { this.status(false); this.retry = setTimeout(() => this.connect(), 4000); };
      ws.onerror = () => { };
      ws.onmessage = async (ev) => {
        let msg; try { msg = JSON.parse(ev.data); } catch (e) { return; } if (!msg) return;
        if (msg.event === 'renderProgress') { toast('⏳ ' + (msg.message || 'rendering…')); return; }
        if (msg.event === 'renderResult') { $('renderBtn').disabled = false; $('renderBtn').textContent = '⬇ Render'; if (msg.ok) { toast('✓ Rendered → ' + msg.outFile); openModal('render.log', { 'render.log': `RENDER OK\n\n${msg.outFile}\n\n${msg.log || ''}` }); } else { toast('Render failed'); openModal('render.log', { 'render.log': `RENDER FAILED\n\n${msg.error || ''}\n\n${msg.log || ''}` }); } return; }
        if (!msg.method) return;
        try { const fn = StudioAPI[msg.method]; if (typeof fn !== 'function' || msg.method === 'subscribe') throw new Error('Unknown method ' + msg.method); const result = await fn(msg.params || {}); ws.send(JSON.stringify({ id: msg.id, result: result === undefined ? { ok: true } : result })); }
        catch (err) { ws.send(JSON.stringify({ id: msg.id, error: String(err && err.message || err) })); }
      };
    },
    status(on) { $('mcpPill').classList.toggle('online', on); $('mcpText').textContent = on ? 'MCP LINKED • ' + ui.bridgeUrl.replace('ws://', '') : 'MCP OFFLINE'; $('renderBtn').disabled = !on; $('renderBtn').title = on ? 'Render MP4 through the MCP server (render-project/)' : 'Start mcp/server.mjs to enable rendering'; },
    requestRender(params) { if (!this.ws || this.ws.readyState !== 1) { toast('Start mcp/server.mjs first'); return; } $('renderBtn').disabled = true; $('renderBtn').textContent = '⏳ Rendering…'; this.ws.send(JSON.stringify({ event: 'render', id: 'ui_' + Date.now(), params: params || {} })); },
    push(state) { if (this.ws && this.ws.readyState === 1) this.ws.send(JSON.stringify({ event: 'state', state })); }
  };
  $('mcpPill').addEventListener('click', () => { const v = prompt('MCP bridge WebSocket URL (mcp/server.mjs):', ui.bridgeUrl); if (v) { ui.bridgeUrl = v.trim(); localStorage.setItem('rps.bridgeUrl', ui.bridgeUrl); Bridge.connect(); } });
  StudioAPI.subscribe(s => Bridge.push(s));

  /* =====================================================================
     INIT + DEMO SCENE
     ===================================================================== */
  function demoScene() {
    StudioAPI.addAsset({ catalogId: 'sky_gradient', name: 'Night Sky' });
    StudioAPI.addAsset({ catalogId: 'street_block', name: 'Downtown Street' });
    StudioAPI.addAsset({ catalogId: 'floor_line', name: 'Studio Floor' });
    const hero = StudioAPI.addAsset({ catalogId: 'stickman_fighter', name: 'Hero', properties: { baseX: 620, baseY: 820, scale: 1.35 } });
    const rival = StudioAPI.addAsset({ catalogId: 'stickman_rival', name: 'Rival', properties: { baseX: 1300, baseY: 820, scale: 1.35 } });
    const title = StudioAPI.addAsset({ catalogId: 'text_card', name: 'Round Title', properties: { baseX: 640, baseY: 70 } });
    StudioAPI.applyModifier({ assetId: title.id, modifier: 'popIn', startFrame: 0 });
    const chart = StudioAPI.addAsset({ catalogId: 'trading_chart', name: 'Fight Odds', properties: { baseX: 1330, baseY: 90, scale: 0.75, customProperties: { ticker: 'HERO / RIVAL', targetPrice: 135, data: [100, 104, 101, 108, 112, 109, 118, 124, 121, 130] } } });
    StudioAPI.applyModifier({ assetId: chart.id, modifier: 'reveal', startFrame: 10, duration: 70 });
    const emblem = StudioAPI.addAsset({ catalogId: 'three_knot', name: 'Hero Emblem', properties: { baseX: 330, baseY: 250, customProperties: { size: 170 } } });
    StudioAPI.applyModifier({ assetId: emblem.id, modifier: 'spinY', startFrame: 0, duration: 120 });
    StudioAPI.applyPreset({ assetId: hero.id, preset: 'jab', startFrame: 10, play: false });
    StudioAPI.applyPreset({ assetId: rival.id, preset: 'block', startFrame: 22, play: false });
    StudioAPI.applyPreset({ assetId: hero.id, preset: 'roundhouse', startFrame: 50, play: false });
    StudioAPI.applyPreset({ assetId: rival.id, preset: 'knockdown', startFrame: 66, play: false });
    StudioAPI.setTimeline({ totalFrames: 120, name: 'Demo Fight' });
    StudioAPI.selectAsset({ assetId: hero.id }); store.currentFrame = 0;
    history.past = []; history.future = []; history.last = snapshot(); updateUndoButtons();
  }

  $('aspectSelect').innerHTML = ASPECT_PRESETS.map(a => `<option value="${a.id}">${a.id} • ${a.width}×${a.height}</option>`).join('') + '<option value="custom">Custom</option>';
  (window.CommunityManifest || []).forEach(m => { try { const e = buildExternalEntry(m); const i = CATALOG.findIndex(c => c.id === e.id); if (i >= 0) CATALOG[i] = e; else CATALOG.push(e); CATALOG_BY_ID[e.id] = e; } catch (err) { console.warn('community manifest entry skipped', m, err); } });
  buildCatalog(); buildPresetGrid(); applyCanvasSize(); ThreeBridge.init(); Bridge.connect();
  demoScene(); commit({ structure: true, history: false });
  requestAnimationFrame(tick);
  setTimeout(() => StudioAPI.play(), 500);
})();
