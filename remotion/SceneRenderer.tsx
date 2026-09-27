import React from 'react';
import { AbsoluteFill, Sequence, continueRender, delayRender, useCurrentFrame } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { AdvancedStickman, StickmanAngles } from './AdvancedStickman';
import { SkyGradient, FloorLine, House, StreetBlock, IndoorRoom, Tree } from './Environments';
import { TradingChart, BarChart, TextCard, Counter } from './Widgets';
import { ThreePrimitive, StudioLights } from './ThreePrimitives';

/* =====================================================================
   JSON TIMELINE MATRIX — the schema exported by the Production Suite
   (scene.json / MasterScene.tsx). Keep in sync with studio.js.
   ===================================================================== */
export type Easing = 'linear' | 'easeInOut' | 'easeOut' | 'spring';

export interface Keyframe {
  frame: number;
  easing?: Easing; // easing used from this keyframe to the next
  properties: {
    baseX?: number;
    baseY?: number;
    scale?: number;
    rotation?: number;
    opacity?: number;
    customProperties?: Record<string, any>; // rig angles, chart data, text, three.js material, component props…
  };
}

/** How to import and feed an external / community component (see catalog.js EXTERNAL_CATALOG). */
export interface ExternalDescriptor {
  importPath: string;            // '@remotion/shapes' | 'remotion' | './community/Foo' (relative to remotion/)
  exportName: string;            // 'Star' | 'default'
  package?: string;              // npm package to install in the render project
  packages?: string[];           // several npm packages (e.g. @remotion/media + @remotion/media-utils)
  sizeMode?: 'style' | 'props' | 'none';
  omitProps?: string[];          // customProperties keys not forwarded
  styleMap?: Record<string, string>; // customProperties key → CSS property (e.g. fit → objectFit)
  /** Wrapper components (remocn Backdrop / Drift / Stage / ChatToPreviewLayout): the layers listed in the asset's
   *  `wraps` are rendered as this component's children, on a canvas the size of the composition.
   *  fit: 'full' (1:1) | 'backdrop' (cover the inset frame; inset = customProperties.padding % of width) |
   *       'stage' (0.84 × width plane; height from customProperties.contentSize) | 'slot' (unscaled, slot-relative) |
   *       'window' (cover a media window of window.w × window.h, as fractions of customProperties.width — remocn Polaroid).
   *  slots: named props (e.g. ['chat','preview']); then `wraps` is { slot: ids[] } instead of ids[]. */
  children?: { prop?: string; fit?: 'full' | 'backdrop' | 'stage' | 'slot' | 'window'; slots?: string[]; window?: { w: number; h: number } };
  /** Containers whose children are plain text (remocn PaperSticker): children = <span style>{customProperties[prop]}</span>;
   *  styleMap maps customProperties keys to the span's CSS (e.g. { fontSize: 'fontSize' }); those keys are not forwarded. */
  textChildren?: { prop: string; styleMap?: Record<string, string> };
  /** Forward customProperties under another prop name after the layer-box sizing, e.g. { cardWidth: 'width' } when the
   *  component's own width/height props mean something else than the layer box (remocn Reel card, chart viewBox). */
  renameProps?: Record<string, string>;
  /** The export is a @remotion/transitions presentation factory (remocn grainDissolve, waveWipe…), not a component.
   *  The layer wraps two slots, `from` and `to` (children.slots), and plays the presentation between them over
   *  customProperties.transitionFrames starting at layer frame customProperties.transitionAt — like TransitionSeries
   *  with linearTiming, but the wrapped layers keep composition time. Every other prop is passed to the factory.
   *  { waitFor: css selector }: during the transition each frame is held until that selector matches inside the layer,
   *  plus a few animation frames — for shaders that paint asynchronously (paper-design mounts after an image decode). */
  transition?: boolean | { waitFor?: string };
  /** CSS custom properties set on this layer only, e.g. { '--font-geist-sans': 'Segoe UI, sans-serif' } so a component renders in the font it measures with. */
  cssVars?: Record<string, string>;
  /** Constant style on the layer box, e.g. { display: 'flex', alignItems: 'center', justifyContent: 'center' } to centre an inline component (remocn RolodexFlip / ValueSwap). */
  layerStyle?: Record<string, any>;
}

export interface SceneAsset {
  id: string;
  type: 'character' | 'environment' | 'widget' | 'text' | 'three' | 'external';
  componentName: keyof typeof REGISTRY | string;
  catalogId?: string;
  name: string;
  visible?: boolean;
  locked?: boolean;
  easing?: Easing;
  renderTarget?: 'svg' | 'html';
  /** External layers only: the component's own frame 0 happens at this composition frame (wrapped in <Sequence from>). */
  startFrame?: number;
  /** External layers only: unmount after this many frames. */
  durationInFrames?: number;
  external?: ExternalDescriptor;
  /** Wrapper layers only: ids of the layers rendered as this component's children (or { slot: ids[] }). */
  wraps?: string[] | Record<string, string[]>;
  preview?: Record<string, any>;
  keyframes: Keyframe[];
}

export interface SceneState {
  version?: number;
  name?: string;
  width: number;
  height: number;
  fps: number;
  totalFrames: number;
  currentFrame?: number;
  background?: string;
  selectedAssetId?: string | null;
  assets: SceneAsset[]; // index 0 = back layer
}

export interface Sampled { baseX: number; baseY: number; scale: number; rotation: number; opacity: number; customProperties: Record<string, any> }

/* ---------------- interpolation (identical to the studio preview) ---------------- */
const EASE: Record<Easing, (t: number) => number> = {
  linear: t => t,
  easeInOut: t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  easeOut: t => 1 - Math.pow(1 - t, 3),
  spring: t => {
    if (t <= 0) return 0; if (t >= 1) return 1;
    const mass = 0.5, damping = 12, omega = Math.sqrt(20 / mass), zeta = damping / (2 * Math.sqrt(20 * mass));
    const decay = Math.exp(-zeta * omega * t * 2.5), osc = Math.cos(omega * t * 6);
    return 1 - decay * (1 - t) * (0.5 + 0.5 * osc);
  },
};
const isNum = (v: unknown): v is number => typeof v === 'number' && !isNaN(v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function lerpValue(a: any, b: any, t: number): any {
  if (a === undefined) return b; if (b === undefined) return a;
  if (isNum(a) && isNum(b)) return lerp(a, b, t);
  if (Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every(isNum) && b.every(isNum)) return a.map((v, i) => lerp(v, b[i], t));
  if (a && b && typeof a === 'object' && typeof b === 'object' && !Array.isArray(a) && !Array.isArray(b)) {
    const out: Record<string, any> = {};
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) out[k] = lerpValue(a[k], b[k], t);
    return out;
  }
  return t < 1 ? a : b; // strings / booleans hold their value until the next keyframe
}

const fill = (p: Keyframe['properties'] | undefined): Sampled => ({ baseX: 0, baseY: 0, scale: 1, rotation: 0, opacity: 1, ...(p || {}), customProperties: { ...((p && p.customProperties) || {}) } });

export function sampleAsset(asset: SceneAsset, frame: number): Sampled {
  const kfs = [...asset.keyframes].sort((a, b) => a.frame - b.frame);
  if (!kfs.length) return fill(undefined);
  if (frame <= kfs[0].frame) return fill(kfs[0].properties);
  const last = kfs[kfs.length - 1];
  if (frame >= last.frame) return fill(last.properties);
  let i = 0; while (i < kfs.length - 1 && !(frame >= kfs[i].frame && frame <= kfs[i + 1].frame)) i++;
  const prev = kfs[i], next = kfs[i + 1];
  const t = (frame - prev.frame) / Math.max(1, next.frame - prev.frame);
  const e = EASE[prev.easing || asset.easing || 'linear'](t);
  return lerpValue(fill(prev.properties), fill(next.properties), e) as Sampled;
}

/* ---------------- built-in registry: componentName → React component ---------------- */
type CP = Record<string, any>;
const Stickman: React.FC<CP> = cp => (
  <AdvancedStickman baseX={0} baseY={0} angles={cp as StickmanAngles} strokeColor={cp.strokeColor} leftLimbColor={cp.leftLimbColor} strokeWidth={cp.strokeWidth} shadow={cp.shadow !== false} />
);
export const REGISTRY: Record<string, React.FC<any>> = {
  AdvancedStickman: Stickman,
  SkyGradient, FloorLine, House, StreetBlock, IndoorRoom, Tree,
  TradingChart, BarChart, TextCard, Counter,
  ThreePrimitive, // rendered through <ThreeCanvas>, not the SVG layer
};

const transformOf = (p: Sampled) => `translate(${p.baseX} ${p.baseY}) rotate(${p.rotation}) scale(${p.scale * (p.customProperties.facing === -1 ? -1 : 1)} ${p.scale})`;

/** Build the props for an external component from sampled customProperties. */
export function externalProps(asset: SceneAsset, p: Sampled): Record<string, any> {
  const ext = asset.external || { importPath: '', exportName: '', sizeMode: 'style' as const };
  const cp = { ...p.customProperties };
  const style: Record<string, any> = {};
  if (ext.styleMap) for (const [k, css] of Object.entries(ext.styleMap)) { if (cp[k] !== undefined) style[css] = cp[k]; }
  (ext.omitProps || []).forEach(k => delete cp[k]);
  if (ext.sizeMode === 'style' || !ext.sizeMode) { style.width = cp.width; style.height = cp.height; delete cp.width; delete cp.height; }
  else if (ext.sizeMode === 'none') { delete cp.width; delete cp.height; }
  if (ext.textChildren) {
    const ts: Record<string, any> = {};
    for (const [k, css] of Object.entries(ext.textChildren.styleMap || {})) { if (cp[k] !== undefined) ts[css] = cp[k]; delete cp[k]; }
    cp.children = <span style={ts}>{String(cp[ext.textChildren.prop] ?? '')}</span>;
    delete cp[ext.textChildren.prop];
  }
  if (ext.renameProps) for (const [from, to] of Object.entries(ext.renameProps)) { if (from in cp) { cp[to] = cp[from]; delete cp[from]; } }
  delete cp.facing;
  return Object.keys(style).length ? { ...cp, style } : cp;
}

/** Plays a TransitionPresentation between two already-built scenes, the way TransitionSeries + linearTiming does:
 *  `from` alone before `at`, both (exiting under entering) for `frames` frames, then `to` alone. Inside the
 *  transition the presentation sees its own frame 0 at `at`; the scenes are shifted back to keep their own time. */
const TransitionLayer: React.FC<{ factory: (props: Record<string, any>) => { component: React.ComponentType<any>; props: Record<string, any> }; passedProps: Record<string, any>; at: number; frames: number; from?: React.ReactNode; to?: React.ReactNode; waitFor?: string }> = ({ factory, passedProps, at, frames, from, to, waitFor }) => {
  const frame = useCurrentFrame();
  const T = Math.max(1, Math.round(frames));
  const during = frame >= at && frame < at + T;
  const box = React.useRef<HTMLDivElement>(null);
  // paper-design shaders apply each frame's uniforms after an async image decode and paint on the next animation frame;
  // remocn's wrappers only hold the first render for two frames, so the capture could miss the field. Hold every frame.
  React.useLayoutEffect(() => {
    if (!during || !waitFor) return;
    const handle = delayRender(`transition paint ${frame}`, { timeoutInMilliseconds: 60000 });
    let raf = 0, done = false, settle = -1; const t0 = performance.now();
    const finish = () => { if (!done) { done = true; continueRender(handle); } };
    const tick = () => {
      if (done) return;
      if (settle < 0 && ((box.current && box.current.querySelector(waitFor)) || performance.now() - t0 > 15000)) settle = 4;
      if (settle === 0) return finish();
      if (settle > 0) settle--;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); finish(); };
  }, [frame, during, waitFor]);
  if (frame < at) return <AbsoluteFill>{from}</AbsoluteFill>;
  if (frame >= at + T) return <AbsoluteFill>{to}</AbsoluteFill>;
  const pres = factory(passedProps), P = pres.component;
  const p = Math.min(1, Math.max(0, (frame - at) / T));
  const keep = (node: React.ReactNode) => <Sequence from={-at} layout="none">{node}</Sequence>;
  return (
    <AbsoluteFill ref={box}>
      <Sequence from={at} durationInFrames={T} layout="none" name="transition">
        <P presentationDirection="exiting" presentationProgress={p} presentationDurationInFrames={T} passedProps={pres.props}>{keep(from)}</P>
        <P presentationDirection="entering" presentationProgress={p} presentationDurationInFrames={T} passedProps={pres.props}>{keep(to)}</P>
      </Sequence>
    </AbsoluteFill>
  );
};

/* ---------------- the master renderer ---------------- */
export interface SceneRendererProps {
  scene: SceneState;
  /** External / community components keyed by componentName (MasterScene.tsx generates this). */
  /** Components — or, for `external.transition` entries, @remotion/transitions presentation factories. */
  registry?: Record<string, React.ComponentType<any> | ((props: any) => any)>;
}

export const SceneRenderer: React.FC<SceneRendererProps> = ({ scene, registry = {} }) => {
  const frame = useCurrentFrame();
  const { width: W, height: H } = scene;
  const all = scene.assets.filter(a => a.visible !== false).map(asset => ({ asset, p: sampleAsset(asset, frame) }));
  type Layer = (typeof all)[number];
  const byId = new Map(all.map(l => [l.asset.id, l] as const));
  const wrapIds = (a: SceneAsset): string[] => !a.wraps ? [] : Array.isArray(a.wraps) ? a.wraps : Object.values(a.wraps).flat();
  const wrapped = new Set(all.flatMap(l => wrapIds(l.asset)));
  const layers = all.filter(l => !wrapped.has(l.asset.id)); // wrapped layers render inside their wrapper
  const isHtml = (a: SceneAsset) => a.renderTarget === 'html' || a.type === 'external';
  const threeLayers = layers.filter(l => l.asset.type === 'three');
  const lookup = (name: string) => (registry[name] || REGISTRY[name]) as React.ComponentType<any> | undefined; // transition factories are called, not rendered (TransitionLayer)

  // Keep true z-order (index 0 = back) across SVG and HTML assets: consecutive SVG assets share one
  // full-frame <svg>; each HTML (external) asset is its own absolutely positioned layer in between.
  // 3D layers render last, in one <ThreeCanvas> on top (same as the studio preview).
  const renderLayers = (list: Layer[], cw: number, ch: number, seen: Set<string>): React.ReactNode[] => {
    type Segment = { kind: 'svg'; items: Layer[] } | { kind: 'html'; item: Layer };
    const segments: Segment[] = [];
    for (const l of list) {
      if (l.asset.type === 'three') continue;
      if (isHtml(l.asset)) { segments.push({ kind: 'html', item: l }); continue; }
      const last = segments[segments.length - 1];
      if (last && last.kind === 'svg') last.items.push(l); else segments.push({ kind: 'svg', items: [l] });
    }
    return segments.map((seg, si) => {
      if (seg.kind === 'svg') {
        return (
          <svg key={`svg_${si}`} width={cw} height={ch} viewBox={`0 0 ${cw} ${ch}`} style={{ position: 'absolute', inset: 0 }}>
            {seg.items.map(({ asset, p }) => {
              const C = lookup(asset.componentName);
              if (!C) return null;
              return (
                <g key={asset.id} transform={transformOf(p)} opacity={p.opacity}>
                  <C {...p.customProperties} uid={asset.id} />
                </g>
              );
            })}
          </svg>
        );
      }
      // External / community React components (remotion <Img>, @remotion/shapes, pasted Elements…)
      const { asset, p } = seg.item;
      const C = lookup(asset.componentName);
      if (!C) return null;
      const cp = p.customProperties;
      const props = externalProps(asset, p);
      const spec = asset.external && asset.external.children;
      if (spec && asset.wraps && !seen.has(asset.id)) {
        const inner = new Set(seen).add(asset.id);
        const kidsOf = (ids: string[]) => scene.assets.filter(a => ids.includes(a.id)).map(a => byId.get(a.id)).filter(Boolean) as Layer[];
        const canvas = (ids: string[], fit: string) => {
          let left = 0, top = 0, scale = 1, w = W, h = H;
          if (fit === 'backdrop') { const pad = ((typeof cp.padding === 'number' ? cp.padding : 4) / 100) * W, fw = W - 2 * pad, fh = H - 2 * pad; scale = Math.max(fw / W, fh / H); left = (fw - W * scale) / 2; top = (fh - H * scale) / 2; }
          else if (fit === 'window') { const win = spec.window || { w: 1, h: 1 }, cw = typeof cp.width === 'number' ? cp.width : W, ww = win.w * cw, wh = win.h * cw; scale = Math.max(ww / W, wh / H); left = (ww - W * scale) / 2; top = (wh - H * scale) / 2; }
          else if (fit === 'stage') { const cs = cp.contentSize; h = cs && cs.width > 0 && cs.height > 0 ? W * (cs.height / cs.width) : H; scale = 0.84; }
          const body = <div style={{ position: 'absolute', left, top, width: w, height: h, transform: `scale(${scale})`, transformOrigin: '0 0' }}>{renderLayers(kidsOf(ids), w, h, inner)}</div>;
          // children keep composition time even though the wrapper itself sits inside <Sequence from={startFrame}>
          return asset.startFrame ? <Sequence from={-asset.startFrame} layout="none">{body}</Sequence> : body;
        };
        if (spec.slots && !Array.isArray(asset.wraps)) { for (const slot of spec.slots) { const ids = (asset.wraps as Record<string, string[]>)[slot]; if (ids && ids.length) props[slot] = canvas(ids, 'slot'); } }
        else if (Array.isArray(asset.wraps) && asset.wraps.length) props[spec.prop || 'children'] = canvas(asset.wraps, spec.fit || 'full');
      }
      let el: React.ReactNode = <C {...props} />;
      if (asset.external && asset.external.transition) {
        const { from, to, transitionAt, transitionFrames, ...passed } = props;
        const tr = asset.external.transition;
        el = <TransitionLayer factory={C as any} passedProps={passed} at={typeof transitionAt === 'number' ? transitionAt : 30} frames={typeof transitionFrames === 'number' ? transitionFrames : 60} from={from} to={to} waitFor={typeof tr === 'object' ? tr.waitFor : undefined} />;
      }
      return (
        <div key={asset.id} style={{ ...(asset.external && asset.external.layerStyle), ...(asset.external && asset.external.cssVars), position: 'absolute', left: p.baseX, top: p.baseY, width: cp.width, height: cp.height, opacity: p.opacity, transform: `rotate(${p.rotation}deg) scale(${p.scale})`, transformOrigin: '0 0' }}>
          {asset.startFrame || asset.durationInFrames ? (
            <Sequence from={asset.startFrame || 0} durationInFrames={asset.durationInFrames} layout="none" name={asset.name}>
              {el}
            </Sequence>
          ) : (
            el
          )}
        </div>
      );
    });
  };

  return (
    // remocn components use var(--font-geist-sans/-mono) from their Next.js template. Left undefined, the whole font-family
    // declaration is invalid and the text falls back to the browser's serif default, so give the variables a sans/mono stack.
    <AbsoluteFill style={{ backgroundColor: scene.background || '#0a0a0f', ['--font-geist-sans' as any]: 'Geist, Inter, "Segoe UI", Arial, sans-serif', ['--font-geist-mono' as any]: '"Geist Mono", "JetBrains Mono", Consolas, monospace' }}>
      {renderLayers(layers, W, H, new Set())}

      {/* 3D layers */}
      {threeLayers.length > 0 && (
        <ThreeCanvas
          width={W}
          height={H}
          orthographic
          camera={{ left: -W / 2, right: W / 2, top: H / 2, bottom: -H / 2, near: -5000, far: 5000, position: [0, 0, 1000] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <StudioLights />
          {threeLayers.map(({ asset, p }) => (
            <ThreePrimitive
              key={asset.id}
              {...p.customProperties}
              position={[p.baseX - W / 2, H / 2 - p.baseY, p.customProperties.depth || 0]}
              scale={p.scale}
              rotation2D={p.rotation}
              opacity={p.opacity}
            />
          ))}
        </ThreeCanvas>
      )}
    </AbsoluteFill>
  );
};

export default SceneRenderer;
