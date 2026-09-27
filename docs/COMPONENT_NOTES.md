# Community Component Notes

Working notes for every external component added to the catalog, plus pipeline gotchas found while adding them. Claude maintains this file. Add a section per component when it is registered.

Components live in `remotion/community/`, their catalog entries in `remotion/community/manifest.js`.

## How a component gets added

1. `write_component_file` saves the pasted source unchanged into `remotion/community/`.
2. `register_component { entry, persist: true }` writes the manifest entry: import path, npm packages, `sizeMode`, default props, inspector controls, preview kind.
3. Verify with `add_asset`, `check_scene`, `export_remotion` and `render_still`, then look at the PNG.

## Pipeline notes

- **Remotion version:** 4.0.526 is installed in `render-project/`. Remotion Elements built on `Interactive.withSchema` or `<Solid>` effects need 4.0.5xx or newer.
- **Version pinning:** `@remotion/*` packages must match the installed `remotion` version exactly. Since 2026-09-27 the render step pins missing `@remotion/*` installs to that version, e.g. `@remotion/effects@4.0.526`. `render-project/package.json` records them with a caret range, so keep versions aligned if you run `npm install` by hand.
- **Transform props:** Elements expose `Interactive.transformSchema` props such as `style.translate` and `style.scale`. They are not mapped, because the scene layer already positions, scales and rotates each asset.
- **Base props:** `Interactive.baseSchema` props such as `from`, `durationInFrames` and `trimBefore` are not mapped either. Timing comes from our keyframes. Voice Note is the exception, see below.
- **Keyframe interpolation:** colours and other strings switch at the next keyframe instead of fading. Numbers interpolate.
- **Previews are approximations:** the studio draws a stand-in from the schema. Only `render_still` or `render_scene` shows the real component.
- **Z-order fix, 2026-09-27:** `SceneRenderer` used to draw every external component in one HTML layer above all SVG layers. A full-frame external background therefore covered the whole scene in the render, while the studio preview looked right. Layers now render in scene-tree order, with consecutive SVG assets sharing one `<svg>`. 3D layers are still always on top.
- **Full-frame backgrounds:** register with `fullFrame: true` and `sizeMode: none`. Refit then resizes their box on aspect changes, and `check_scene` treats them as the background. Add them first so they are the back layer.
- **Preview guard, 2026-09-27:** the `paper` preview used to loop forever when `gridSize` was 0. It now draws a grid only when `gridSize` is at least 4, and defaults to no grid.
- **Several studio pages, fixed 2026-09-27:** every open `index.html` retries the bridge every 4 seconds. The server used to send commands to whichever page connected last. A test run was therefore split between a headless page and the user's open tab: components registered on one page, then `add_asset` failed on the other, and test edits landed in the user's scene. The server now:
  - sends commands to one stable page, the earliest connected, unless `select_studio` pins another;
  - sends `register_component` to every open page, so catalogs cannot diverge;
  - lists all pages in `studio_status`.
- **Isolated testing:** open the studio as `index.html?bridge=ws://localhost:7778` and start the server with `STUDIO_WS_PORT=7778`. Tests then never touch a studio on the default port 7777.
- **`clear_scene` keeps the canvas size,** as well as fps and duration. Call `set_aspect` and `set_timeline` again when the next scene needs different ones. This mis-framed the first Liquid Contours test scene.
- **Composition-length loops:** Moving Waves and Moving Zigzags tie their motion to `durationInFrames`. They flow exactly one loop per composition, whatever its length. A longer video means slower motion, not more loops.
- **Non-keyframable controls, 2026-09-27:** controls marked `keyframable: false` in the manifest write their value to every keyframe of the asset, and the inspector labels them "WHOLE CLIP". This matches Remotion's own schemas: caption lists, bar counts and clip lengths should not change mid-clip. Before this, a caption edit at frame 25 created a new keyframe, so frames 0 to 24 kept the old captions. Agents get the same behaviour with `set_property { allKeyframes: true }`. `list_catalog` reports the flag on each control.
- **JSON control kind:** `kind: "json"` is a text box for structured props such as `captions`. Invalid JSON gets a red border and is not written until it parses.
- **`build_captions` tool:** turns script text into timed words, evenly spaced at a words-per-minute rate with a pause after each sentence. It also accepts an SRT file and spreads each cue's words across the cue. It returns `@remotion/captions` `Caption[]`, with a leading space on every word but the first, which is the format the caption components expect. For real speech, word timings from a transcriber are more accurate.
- **Pinned installs:** captions brought in `@remotion/google-fonts`, `@remotion/layout-utils` and `@remotion/rounded-text-box`. All were installed at 4.0.526 by the version-pinning render step, and the first render took 117 seconds including the installs.
- **TypeScript target:** `render-project/tsconfig.json` targets ES2021, because Elements use `String.replaceAll`.

## Components

### Audio Oscilloscope

- **Catalog id:** `community_audio_oscilloscope`
- **File:** `AudioOscilloscope.tsx`, from Remotion Elements `audio/oscilloscope`, saved verbatim
- **Packages:** `@remotion/media`, `@remotion/media-utils`
- **Size:** fixed 900×300, so `sizeMode: none`
- **Controls:** audio source, waveform colour, line width, amplitude and time window. All are keyframable.
- **Preview:** `waveform`, an animated line
- **Verified:** 2026-09-27, [oscilloscope-f45.png](renders/oscilloscope-f45.png)
- **Notes:** plays its own audio track. Two oscilloscopes on the same file play the audio twice.

### Voice Note

- **Catalog id:** `community_voice_note`
- **File:** `AudioWaveformProgress.tsx`, from Remotion Elements `audio/waveform-progress`, saved verbatim
- **Packages:** `@remotion/media`, `@remotion/media-utils`
- **Size:** fixed 900×300
- **Controls:** audio source, played and unplayed colours, and amplitude are keyframable. Bar count, bar gap and clip length are fixed, matching the element's `keyframable: false`.
- **Preview:** `bars`. The played colour follows the playhead.
- **Verified:** 2026-09-27, [voice-note-f135.png](renders/voice-note-f135.png). Played colour reached about 50% at frame 135 of 271.
- **Notes:** progress runs 0 to 100% over `durationInFrames`, which defaults to 271, the length of the sample MP3. Set it to the new file's length in frames when swapping audio. It is also the element's own `<Sequence>` duration, so the component disappears after that many frames.

### Mirrored Spectrum

- **Catalog id:** `community_mirrored_spectrum`
- **File:** `MirroredAudioSpectrum.tsx`, from Remotion Elements `audio/mirrored-spectrum`, saved verbatim
- **Packages:** `@remotion/media`, `@remotion/media-utils`
- **Size:** fixed 900×300
- **Controls:** audio source, bar colour and sensitivity are keyframable. Number of bars is fixed, in steps of 2 so there is always a centre bar.
- **Preview:** `spectrum`, mirrored pulsing bars. The preview is taller and busier than the real render.
- **Verified:** 2026-09-27, [mirrored-spectrum-f60.png](renders/mirrored-spectrum-f60.png)
- **Notes:** a bar-colour keyframe switches colour instantly. A sensitivity keyframe animates smoothly.

### Notebook Paper

- **Catalog id:** `community_notebook_paper`
- **File:** `NotebookPaper.tsx`, from Remotion Elements `backgrounds/notebook-paper`, saved verbatim
- **Packages:** `@remotion/effects`, first install on 2026-09-27, pinned to 4.0.526
- **Size:** full frame via `useVideoConfig()`. The manifest sets `fullFrame: true`, so aspect-ratio refit resizes its box. Verified at 16:9 and 9:16.
- **Controls:** none. The component takes no props, and its paper and grid settings are hard-coded.
- **Preview:** `paper`, white with a 54 px grid
- **Verified:** 2026-09-27, [notebook-paper-f25.png](renders/notebook-paper-f25.png), 9:16 with a stickman and a title on top
- **Notes:**
  - Add it first so it is the back layer.
  - Use dark strokes on characters and text, since the default stickman is white.
  - `check_scene` counts it as a background and leaves it out of overlap and off-screen checks.
  - To make grid size or colours editable, the source would need props. It is saved verbatim, so that would be a deliberate edit.

### Paper Texture

- **Catalog id:** `community_paper_texture`
- **File:** `PaperTexture.tsx`, from Remotion Elements `backgrounds/paper-texture`, saved verbatim
- **Packages:** `@remotion/effects`, already installed at 4.0.526
- **Size:** full frame via `useVideoConfig()`, `fullFrame: true`
- **Controls:** none. The component takes no props.
- **Preview:** `paper` with no grid, a plain off-white box. The real grain and creases only show in the render.
- **Verified:** 2026-09-27, [paper-texture-f0.png](renders/paper-texture-f0.png) and [paper-texture-f60.png](renders/paper-texture-f60.png). The two frames differ, which confirms the texture animates.
- **Notes:**
  - It re-seeds the grain in 30 steps over the first 120 frames of the layer, then holds the last pattern. Past frame 120 it is static.
  - It renders light grey rather than pure white, because of the paper shading.
  - Use dark text and strokes on top.

### Rotating Starburst

- **Catalog id:** `community_rotating_starburst`
- **File:** `RotatingStarburst.tsx`, from Remotion Elements `backgrounds/rotating-starburst`, saved verbatim
- **Packages:** `@remotion/effects`
- **Size:** full frame via `useVideoConfig()`, `fullFrame: true`
- **Controls:** none. The 28 rays, the two blues and the speed are hard-coded.
- **Preview:** `starburst`, 28 rotating wedges that follow the playhead at the same speed as the component
- **Verified:** 2026-09-27, [rotating-starburst-f118.png](renders/rotating-starburst-f118.png), 9:16 with a stickman roundhouse kick and a title on top
- **Notes:**
  - It rotates 360° every 2000 frames, about 66 seconds at 30 fps, so the motion is very slow. At frame 120 it has turned about 22°.
  - The rotation keeps going past frame 2000, because this `interpolate` is not clamped.
  - The rays centre on the frame, so they stay centred after an aspect change.
  - Use dark strokes on characters, since the background is light.

### Moving Waves

- **Catalog id:** `community_moving_waves`
- **File:** `MovingWaves.tsx`, from Remotion Elements `backgrounds/moving-waves`, saved verbatim
- **Packages:** `@remotion/effects`
- **Size:** full frame, `fullFrame: true`
- **Controls:** none. The component takes no props.
- **Preview:** `bands` with style `waves`, following the playhead and the composition length
- **Verified:** 2026-09-27, [moving-waves-f30.png](renders/moving-waves-f30.png), 16:9 with a stickman jab and a title. Frames 0 and 30 differ.
- **Notes:**
  - The bands move 448 px over the whole composition. That is 4 full band periods, so the last frame meets the first seamlessly.
  - Speed depends on the composition length.
  - It reads the composition's `durationInFrames`, not the layer's, so it is best as a whole-video background.

### Moving Zigzags

- **Catalog id:** `community_moving_zigzags`
- **File:** `MovingZigzags.tsx`, from Remotion Elements `backgrounds/moving-zigzags`, saved verbatim
- **Packages:** `@remotion/effects`
- **Size:** full frame, `fullFrame: true`
- **Controls:** none
- **Preview:** `bands` with style `zigzag`
- **Verified:** 2026-09-27, [moving-zigzags-f30.png](renders/moving-zigzags-f30.png), 9:16 with a stickman uppercut. Frames 0 and 30 differ.
- **Notes:** it moves 480 px, 6 band periods, over the composition. Otherwise the same caveats as Moving Waves apply.

### Liquid Contours

- **Catalog id:** `community_liquid_contours`
- **File:** `LiquidContours.tsx`, from Remotion Elements `backgrounds/liquid-contours`, saved verbatim
- **Packages:** `@remotion/effects`
- **Size:** full frame, `fullFrame: true`
- **Controls:** none
- **Preview:** `bands` with style `contours`, a rough stand-in. The real contours are organic and different.
- **Verified:** 2026-09-27, [liquid-contours-f0.png](renders/liquid-contours-f0.png) and [liquid-contours-f120.png](renders/liquid-contours-f120.png) at 1:1. The two frames differ.
- **Notes:**
  - The phase drifts from 3.23 to 4.23 over 240 frames, which is slow and calm.
  - The `interpolate` is not clamped, so the drift keeps going past frame 240 and never stops.

### Basic Captions

- **Catalog id:** `community_basic_captions`
- **File:** `BasicCaptions.tsx`, from Remotion Elements `captions/basic-captions`, saved verbatim
- **Packages:** `@remotion/captions`
- **Size:** `sizeMode: props`, so the component receives `width` and `height` and sizes its caption area from them.
- **Controls:**
  - `captions` is a JSON list for the whole clip. Build it with `build_captions`.
  - The time between caption pages, in ms, is also whole-clip.
  - Width and height are keyframable.
- **Preview:** `captions` with style `basic`. It uses Remotion's page rule and balanced two-line wrapping, and matched the render's line breaks.
- **Verified:** 2026-09-27, [captions-f25.png](renders/captions-f25.png) and [captions-f70.png](renders/captions-f70.png), top row. Pages are 2 seconds long, grey box, Arial.
- **Notes:**
  - It shows at most 2 lines and clips the rest.
  - A new page starts only when a word begins more than `combineTokensWithinMilliseconds` after the page start.

### Rounded Captions

- **Catalog id:** `community_rounded_captions`
- **File:** `RoundedCaptions.tsx`, from Remotion Elements `captions/rounded-captions`. It is verbatim except for one line marked `LOCAL FIX`.
- **Packages:** `@remotion/captions`, `@remotion/google-fonts` for Figtree, `@remotion/layout-utils`, `@remotion/rounded-text-box`
- **Size:** `sizeMode: props`, so the component receives `width` and `height` and sizes its caption area from them.
- **Controls:**
  - `captions` is a JSON list for the whole clip. Build it with `build_captions`.
  - The time between caption pages, in ms, is also whole-clip.
  - Width and height are keyframable.
- **Preview:** `captions` with style `rounded`. The real component fits the text to the box with `fitTextOnNLines`, so its line breaks can differ from the preview.
- **Verified:** 2026-09-27, middle row of the same renders
- **Local fix:**
  - The source passes `lineHeight` as a number to `measureText`, whose type expects strings. That fails `tsc`.
  - It is now passed as `String(lineHeight)`. The browser converts the number to the same string anyway.
  - Frame 25 rendered byte-identical before and after the fix.
- **Notes:** it downloads the Figtree font from Google Fonts on every render, so renders need network access.

### Moving Pill Captions

- **Catalog id:** `community_moving_pill_captions`
- **File:** `MovingPillCaptions.tsx`, from Remotion Elements `captions/moving-pill-captions`, saved verbatim
- **Packages:** `@remotion/captions`, `@remotion/google-fonts` for Montserrat, `@remotion/layout-utils`
- **Size:** `sizeMode: props`, so the component receives `width` and `height` and sizes its caption area from them.
- **Controls:**
  - `captions` is a JSON list for the whole clip. Build it with `build_captions`.
  - The time between caption pages, in ms, is also whole-clip.
  - Width and height are keyframable.
- **Preview:** `captions` with style `pill`, which highlights the latest spoken word
- **Verified:** 2026-09-27, bottom row. The pill sat on "starts" at frame 25 and on "single" at frame 70, matching the word timings. Default area is 682×252 with 0.8-second pages.
- **Notes:**
  - The pill glides between words over 5 frames.
  - It needs network access for Montserrat.
  - The white text has a heavy black stroke, so it reads on any background.

### Typewriter Text

- **Catalog id:** `community_typewriter`
- **File:** `TypewriterText.tsx`, a sample written for this project, not from Remotion Elements
- **Packages:** none
- **Size:** `sizeMode: style`, width and height passed as `style`
- **Notes:** the pattern to copy for hand-written components that take plain props.
