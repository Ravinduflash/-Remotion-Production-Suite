# Remotion Production Suite

A browser-based, multi-asset scene builder for Remotion videos with an MCP surface so AI agents can choreograph full timelines from a script.

```
index.html + catalog.js + studio.js   ← the studio (no build step, open in a browser)
remotion/                             ← the matching Remotion component library (TSX)
remotion/community/                   ← pasted / third-party components + manifest.js (asset registry)
mcp/server.mjs                        ← MCP server: tools → WebSocket → StudioAPI, plus render & registry tools
render-project/                       ← headless Remotion project used by render_scene / render_still
legacy/index.single-stickman.html     ← the original one-stickman FK studio
```

## Quick start

1. Open `index.html` in Chrome or Edge. A demo fight scene loads and plays.
2. Left column: **Asset Catalog** (Characters / Environments / Widgets / 3D) → `+ Add`. **Scene Tree** lists layers (top = front) with reorder, hide, lock, rename, delete.
3. Center: click an asset to select it. Drag to move, corner handles to scale, the red knob to rotate (Shift snaps 15°). The **Property Inspector** overlay changes per asset type: joint sliders for stickmen, ticker/data fields for charts, transform + colours for environments, material and rotation for 3D meshes. Every edit auto-keys the frame under the playhead.
4. Right column: prompt choreographer and martial-arts presets (characters), **Component Modifiers** (context-aware generators: bullish/bearish/reveal for charts, count-up, pop-in, pan, spin, bounce…), and the **Export JSON / Export Remotion Code** boxes.
5. Bottom: multi-track timeline. One lane per asset, diamonds are keyframes. Click a lane to scrub, click a diamond to load it, drag a diamond to retime it. Frame / total / fps / speed / loop controls on the toolbar.

**Aspect ratio**: the ASPECT select in the viewport toolbar switches between 16:9, 9:16, 1:1, 4:5, 4:3, 3:4, 21:9, 2:3, 4K and 9:16-4K, or type a custom width and height. With **Refit** on, asset positions are re-mapped proportionally, full-frame backgrounds resize to the new frame, and non-environment assets scale by the smaller axis factor so a 16:9 scene converts to a usable 9:16 short in one click. The Remotion export follows the size automatically.

**Check** (header) runs the scene validator and shows a report: off-screen assets, characters sinking below the floor, overlapping characters, title-safe violations, keyframes past the duration, missing background, unused duration, required npm packages, plus a composition summary. **Render** (header, enabled when the MCP server is linked) renders an MP4 through the render project and shows the output path.

Shortcuts: `Space` play, `←/→` step (Shift = 10), `K` add keyframe, `Del` delete selected keyframe, `Ctrl+Z / Ctrl+Y` undo/redo, `Ctrl+D` duplicate layer, `Esc` deselect.

## Data model (the JSON timeline matrix)

```ts
interface Keyframe {
  frame: number;
  easing?: 'linear' | 'easeInOut' | 'easeOut' | 'spring';   // to the next keyframe
  properties: {
    baseX?: number; baseY?: number; scale?: number; rotation?: number; opacity?: number;
    customProperties?: Record<string, any>;   // limb angles, chart data, text, three.js material…
  };
}
interface SceneAsset {
  id: string;
  type: 'character' | 'environment' | 'widget' | 'text' | 'three';
  componentName: string;   // React component in remotion/SceneRenderer.tsx REGISTRY
  catalogId?: string;      // entry in catalog.js
  name: string; visible?: boolean; locked?: boolean; easing?: Easing;
  keyframes: Keyframe[];
}
interface RemotionWorkspaceState {
  name: string; width: number; height: number; fps: number; totalFrames: number;
  currentFrame: number; background: string; selectedAssetId: string | null;
  assets: SceneAsset[];    // index 0 = back layer
}
```

Interpolation is shared by the studio (`studio.js`) and Remotion (`SceneRenderer.tsx`): numbers lerp, equal-length numeric arrays lerp element-wise (so chart data morphs), strings and booleans hold until the next keyframe. A keyframe's `properties` may be partial when written through the API; missing keys are filled from the interpolated state at that frame.

## Rendering with Remotion

In a Remotion project (`npx create-video@latest`):

```bash
npm i three @react-three/fiber @remotion/three      # only needed for 3D layers
cp -r remotion/ src/remotion/
```

Then either:

- **scene.json route**: put the studio's `scene.json` in `src/remotion/` and register `RemotionRoot` from `src/remotion/Root.tsx` in `src/index.ts`, or
- **code route**: download `MasterScene.tsx` + `Root.tsx` from the Export dialog into `src/`. `MasterScene.tsx` embeds the scene as a typed `SCENE` constant and renders `<SceneRenderer scene={SCENE} />`, which maps `SCENE.assets` in z-order inside one `<Composition>`.

```bash
npx remotion render src/index.ts MasterScene out/master.mp4
```

3D layers render in `<ThreeCanvas>` with an orthographic camera whose units are composition pixels, so `baseX/baseY` mean the same thing for SVG and 3D layers. As in the studio, the 3D canvas sits above the SVG layers.

## StudioAPI (the MCP surface)

All mutations run through `window.StudioAPI` in `studio.js`. Each method takes one JSON object, returns JSON, and triggers a re-render, so the same functions serve the UI, the browser console, and the MCP bridge.

| Method | Params |
| --- | --- |
| `listCatalog()` | — → every addable asset with defaults, control schema, presets, modifiers |
| `getState()` / `setState({state})` / `clearScene()` | |
| `addAsset` | `{catalogId, id?, name?, properties?, keyframes?, frame?, index?}` |
| `updateAsset` | `{assetId, name?, visible?, locked?, easing?}` |
| `deleteAsset` / `duplicateAsset` / `selectAsset` | `{assetId}` |
| `reorderAsset` | `{assetId, direction: up\|down\|top\|bottom}` or `{assetId, index}` |
| `updateAssetKeyframe` | `{assetId, frame, properties (partial, merged), easing?}` |
| `setKeyframes` / `removeKeyframe` / `moveKeyframe` | `{assetId, keyframes[]}` / `{assetId, frame}` / `{assetId, frame, toFrame}` |
| `setProperty` | `{assetId, key, value, custom?, frame?}` |
| `applyPreset` | `{assetId, preset, startFrame?, mirror?, play?}` |
| `applyModifier` | `{assetId, modifier, startFrame?, duration?}` |
| `generateFromPrompt` | `{prompt, assetId?, startFrame?}` |
| `changeCurrentFrame` / `setTimeline` / `play` / `pause` | `{frame}` / `{totalFrames?, fps?, aspect?, background?, name?}` |
| `setAspect` / `listAspectRatios` | `{preset}` or `{width, height}`, `refit?` (default true) |
| `validateScene()` | → `{ok, score, errors[], warnings[], info[]}` with fixes |
| `registerComponent` | `{entry}` community wrapper (see below) |
| `exportJSON()` / `exportRemotion()` | → `scene.json` string / `{files: {…}}` |

## Rendering from the MCP server

`render_scene` and `render_still` produce real Remotion output without leaving the agent loop:

1. The server asks the studio for the export bundle, copies `remotion/` into `render-project/src/remotion/` and writes `src/MasterScene.tsx`.
2. It installs missing npm packages listed in the bundle (`@remotion/shapes`, `three`, community packages…).
3. It runs `npx remotion render` (or `remotion still`) and returns the absolute output path. Long jobs return a `jobId`; poll `render_status`.

The first run does `npm install` in `render-project/` and lets Remotion download its headless Chrome, which takes several minutes. Run `cd render-project && npm install` once up front to avoid the tool timing out. `render_still {frame, scale:0.5}` is the cheap way for an agent to look at real pixels, critique, adjust, and repeat.

## External and community components (asset registry)

Per-component notes, versions, verification renders and pipeline gotchas are kept in [docs/COMPONENT_NOTES.md](docs/COMPONENT_NOTES.md).

Any Remotion component can become a catalog asset. Built-in wrappers cover remotion's `<Img>`, `<OffthreadVideo>`, `<Audio>`, `@remotion/gif` and the `@remotion/shapes` primitives (Media and Community tabs). To add code you found on remotion.dev, GitHub or a blog:

1. Save the component into `remotion/community/<Name>.tsx` (MCP: `write_component_file`).
2. Describe it in `remotion/community/manifest.js` (MCP: `register_component { entry, persist: true }`): `external.importPath`, `exportName`, optional npm `package`, `sizeMode` (`style` passes `style={{width,height}}`, `props` passes width/height props, `none`), `defaults.customProperties`, inspector `controls`, and a `preview` kind (`card`, `text`, `image`, `video`, `audio`, `shape`).
3. It appears under Catalog → Community, gets generic modifiers (fade, slide, pop, spin, Ken Burns), and the export imports it and hands it to `SceneRenderer` through the `registry` prop. External components render in scene-tree order alongside SVG layers; only 3D layers are always on top.

The preview in the studio is an approximation drawn from the schema. The Remotion render uses the real component.

**Example: Remotion Elements.** `remotion/community/AudioOscilloscope.tsx` is the Oscilloscope element from remotion.dev saved verbatim. Its manifest entry maps the element's schema (`audioSrc`, `lineColor`, `lineWidth`, `amplitude`, `windowInSeconds`) to inspector controls, uses `sizeMode: "none"` because the element sizes itself at 900×300, and lists two npm packages with `packages: ["@remotion/media", "@remotion/media-utils"]`. Elements built on `Interactive.withSchema` need remotion 4.0.5xx or newer. Their `transformSchema` props (`style.translate`, `style.scale`…) are not needed, because the scene layer already positions, scales and rotates the component.

## MCP server

```bash
cd mcp && npm install
claude mcp add remotion-studio -- node "C:/path/to/mcp/server.mjs"
```

Start the MCP client, then open `index.html`. If several studio pages are open, commands go to the earliest-connected one; `studio_status` lists them and `select_studio` switches. Open `index.html?bridge=ws://localhost:7778` together with `STUDIO_WS_PORT=7778` to run an isolated second bridge. The studio auto-connects to `ws://localhost:7777` (click the header pill to change the URL); the pill turns green when linked. Agent workflow:

1. `list_catalog` → learn assets, control keys, presets, modifiers.
2. `set_timeline`, `add_asset` per script beat (choose stable ids like `hero`, `rival`, `odds_chart`).
3. `apply_preset` / `apply_modifier` / `set_keyframe` to choreograph; `set_frame` + `studio_status` to inspect.
4. `export_remotion` → files for the Remotion project.

Other tools: `build_captions` (script text or SRT → `Caption[]` for the caption components), `select_studio`, `set_aspect`, `list_aspect_ratios`, `check_scene`, `render_scene`, `render_still`, `render_status`, `write_component_file`, `read_component_file`, `list_component_files`, `register_component`, `unregister_component`. `call_studio {method, params}` reaches any StudioAPI method; the `studio://scene` resource exposes the live state. `get_scene` falls back to the last pushed state if the browser is closed.

## Adding your own asset

1. `catalog.js`: add an entry to `CATALOG` with `id`, `tab`, `type`, `componentName`, `defaults` (initial `Keyframe.properties`), `controls` (drives the inspector and the MCP schema) and `render(customProperties, ctx)` returning an SVG string in local coordinates. Optionally add generators to `MODIFIERS[type]`.
2. `remotion/`: implement the same `componentName` as a React component taking `customProperties` as props, and register it in `REGISTRY` in `SceneRenderer.tsx`.

Keep the geometry identical in both so the preview matches the render. Prebaked open-source Remotion components can be wrapped the same way: give them a catalog entry whose SVG `render` is a lightweight proxy of the real thing.

## Notes and limits

- The 3D overlay needs network access to load three.js from jsdelivr on first open; offline it shows a dashed placeholder and everything else still works.
- Keyframe `properties` exported by the studio are always complete; hand-written partial keyframes are filled from the interpolated state.
- `legacy/index.single-stickman.html` is unchanged from the original single-rig studio.
