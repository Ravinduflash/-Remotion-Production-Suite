import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
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
  external?: ExternalDescriptor;
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
  delete cp.facing;
  return Object.keys(style).length ? { ...cp, style } : cp;
}

/* ---------------- the master renderer ---------------- */
export interface SceneRendererProps {
  scene: SceneState;
  /** External / community components keyed by componentName (MasterScene.tsx generates this). */
  registry?: Record<string, React.ComponentType<any>>;
}

export const SceneRenderer: React.FC<SceneRendererProps> = ({ scene, registry = {} }) => {
  const frame = useCurrentFrame();
  const { width: W, height: H } = scene;
  const layers = scene.assets.filter(a => a.visible !== false).map(asset => ({ asset, p: sampleAsset(asset, frame) }));
  const isHtml = (a: SceneAsset) => a.renderTarget === 'html' || a.type === 'external';
  const threeLayers = layers.filter(l => l.asset.type === 'three');
  const lookup = (name: string) => registry[name] || REGISTRY[name];

  // Keep true z-order (index 0 = back) across SVG and HTML assets: consecutive SVG assets share one
  // full-frame <svg>; each HTML (external) asset is its own absolutely positioned layer in between.
  // 3D layers render last, in one <ThreeCanvas> on top (same as the studio preview).
  type Segment = { kind: 'svg'; items: typeof layers } | { kind: 'html'; item: (typeof layers)[number] };
  const segments: Segment[] = [];
  for (const l of layers) {
    if (l.asset.type === 'three') continue;
    if (isHtml(l.asset)) { segments.push({ kind: 'html', item: l }); continue; }
    const last = segments[segments.length - 1];
    if (last && last.kind === 'svg') last.items.push(l); else segments.push({ kind: 'svg', items: [l] });
  }

  return (
    <AbsoluteFill style={{ backgroundColor: scene.background || '#0a0a0f' }}>
      {segments.map((seg, si) => {
        if (seg.kind === 'svg') {
          return (
            <svg key={`svg_${si}`} width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0 }}>
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
        return (
          <div key={asset.id} style={{ position: 'absolute', left: p.baseX, top: p.baseY, width: cp.width, height: cp.height, opacity: p.opacity, transform: `rotate(${p.rotation}deg) scale(${p.scale})`, transformOrigin: '0 0' }}>
            <C {...externalProps(asset, p)} />
          </div>
        );
      })}

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
