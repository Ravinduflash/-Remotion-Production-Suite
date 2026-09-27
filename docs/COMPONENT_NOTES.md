# Community Component Notes

Working notes for every external component added to the catalog, plus pipeline gotchas found while adding them. Claude maintains this file. Add a section per component when it is registered.

Components live in `remotion/community/`, their catalog entries in `remotion/community/manifest.js`.

## How a component gets added

1. `write_component_file` saves the pasted source unchanged into `remotion/community/`.
2. `register_component { entry, persist: true }` writes the manifest entry: import path, npm packages, `sizeMode`, default props, inspector controls, preview kind.
3. Verify with `add_asset`, `check_scene`, `export_remotion` and `render_still`, then look at the PNG.

## Pipeline notes

- **Remotion version:** 4.0.526 is installed in `render-project/`. Remotion Elements built on `Interactive.withSchema` or `<Solid>` effects need 4.0.5xx or newer. Since 2026-09-27 every `remotion` and `@remotion/*` dependency is pinned to exactly `4.0.526` in `package.json`, so a fresh install cannot mix versions.
- **React 19, since 2026-09-27:** the render project now runs React 19.3 with `@react-three/fiber` 9.8. Remotion Elements are written for React 19.
  - **The failure:** React 18 appends `px` to plain numbers on CSS properties missing from its unitless list. So Popping Word's `scale: 1.03` became `scale: 1.03px`. The browser dropped that as invalid, with no error, and the pop never happened.
  - **The check:** a regression scene rendered on React 18 and React 19 differs only in one small box around the popping word, 0.22% of the frame. That word is now 2.7% wider, the intended 3% pop. The 3D knot, stickman, environments, chart, shape, image and spectrum are pixel-identical, see [regression-compare.png](renders/regression-compare.png). An effects background was also re-verified.
  - **Rule of thumb:** when an Element's numeric style seems to have no effect, suspect React's unit handling first.
  - **Upgrade note:** upgrading needed a fresh install because npm's resolver stuck on the old React 18 tree. Move `node_modules/.remotion` aside first, which holds Remotion's 270 MB headless Chrome, then restore it.
- **Version pinning:** `@remotion/*` packages must match the installed `remotion` version exactly. Since 2026-09-27 the render step pins missing `@remotion/*` installs to that version, e.g. `@remotion/effects@4.0.526`. From 2026-09-27 (News Article Highlight) those installs also use `--save-exact`, so `package.json` records `4.0.526` rather than `^4.0.526`. Other packages keep npm's default caret range. Keep versions aligned if you run `npm install` by hand.
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
- **Layer-length timing:** since 2026-09-27 the preview context carries `layerDuration`, meaning the layer's `durationInFrames`, or the rest of the composition when it is unset. Inside the render's `<Sequence>`, `useVideoConfig().durationInFrames` returns that same value, so components that time their exit from it, such as Polaroid Pictures, preview correctly.
- **Composition-length loops:** Moving Waves and Moving Zigzags tie their motion to `durationInFrames`. They flow exactly one loop per composition, whatever its length. A longer video means slower motion, not more loops.
- **Non-keyframable controls, 2026-09-27:** controls marked `keyframable: false` in the manifest write their value to every keyframe of the asset, and the inspector labels them "WHOLE CLIP". This matches Remotion's own schemas: caption lists, bar counts and clip lengths should not change mid-clip. Before this, a caption edit at frame 25 created a new keyframe, so frames 0 to 24 kept the old captions. Agents get the same behaviour with `set_property { allKeyframes: true }`. `list_catalog` reports the flag on each control.
- **JSON control kind:** `kind: "json"` is a text box for structured props such as `captions`. Invalid JSON gets a red border and is not written until it parses.
- **`build_captions` tool:** turns script text into timed words, evenly spaced at a words-per-minute rate with a pause after each sentence. It also accepts an SRT file and spreads each cue's words across the cue. It returns `@remotion/captions` `Caption[]`, with a leading space on every word but the first, which is the format the caption components expect. For real speech, word timings from a transcriber are more accurate.
- **Pinned installs:** captions brought in `@remotion/google-fonts`, `@remotion/layout-utils` and `@remotion/rounded-text-box`. All were installed at 4.0.526 by the version-pinning render step, and the first render took 117 seconds including the installs.
- **Layer timing, added 2026-09-27:** external components can have `startFrame` and `durationInFrames`, set with `update_asset` or the inspector's Layer Timing fields. Pass `null` to clear either one.
  - In the render the component sits inside `<Sequence from={startFrame} durationInFrames={…} layout="none">`. Its own `useCurrentFrame()` is therefore 0 at the layer's start, and the component is not shown before or after its span.
  - Before this, every external component animated from frame 0 of the whole video. A chart placed at second 20 would have finished its animation long before appearing.
  - The studio preview uses the same local frame, and the timeline draws each timed layer's span.
  - `check_scene` reports `layer_starts_after_end` as an error and `layer_cut_off` as a warning.
  - **Verified** on the Number Counter with start 60 and duration 120: hidden at frames 59 and 181, finished at frame 150. See [data-contact.png](renders/data-contact.png).
  - **Scope:** built-in assets such as stickmen and widgets still use keyframes for timing. Layer timing applies only to external components.
- **Fixed-size Elements on other aspect ratios:** many Remotion Elements are laid out in fixed pixels for 1920×1080, for example a 680 px pie or a 1080 px bar plot. For narrower frames, keep the layer box at 1920×1080 and scale the whole layer instead of shrinking the box: `scale = frameWidth / 1920`, with `baseY` centring it. This was verified with the Pie Chart at 1:1, see [pie-1x1-scaled-f75.png](renders/pie-1x1-scaled-f75.png).
- **HtmlInCanvas, from 2026-09-27:** Shine and Tear draw their content into a canvas through Remotion's `<HtmlInCanvas>`. It needs Chrome 148 or newer with the `CanvasDrawElement` feature.
  - Remotion's renderer switches that feature on for every render, in `@remotion/renderer/dist/open-browser.js`, and its headless Chrome is 149.0.7790.0. So real renders work.
  - An ordinary browser or Remotion Studio shows `HTML_IN_CANVAS_UNSUPPORTED_MESSAGE` unless `chrome://flags/#canvas-draw-element` is enabled.
  - The studio preview here does not need the feature, because it draws its own SVG approximation.
- **Default layer duration, added 2026-09-27:** a manifest entry can set `defaultDurationInFrames`. `add_asset` then gives the layer that duration automatically, and `add_asset` also accepts `startFrame` and `durationInFrames` directly. Use it for self-contained clips such as Rotating Cards, whose `productCollectionDurationInFrames` is 150.
- **Hard-coded remote images:** Rotating Cards, Picture in Picture and Slide to Split Screen, like Shine and Tear, load `remotion.media` images. Renders need network access, and using your own scenes means editing the source.
- **Render timeouts, from 2026-09-27:** Remotion gives each frame 30 seconds to finish loading. A manifest entry can declare `renderTimeoutMs`. `render_scene` and `render_still` pass the largest one in the scene as `--timeout`, and both also accept `timeoutMs`. The two maps use 180000. The first cold flyover render, with fresh packages and uncached worker and tiles, blew the 30-second limit. Warm, it loads in about 3 seconds.
- **Heavy renders starving the machine, fixed 2026-09-27:** software-WebGL renders such as the map flyover's 4096 px plate filled all 4 cores.
  - **The effect:** a separate do-nothing Node process measured 15.7 seconds of timer lag. The MCP server stalled for 22 to 29 seconds, so `render_still` overran the 60-second client limit.
  - **Two causes:** the render processes ran at normal priority, and Chrome raises its own GPU process to AboveNormal.
  - **The fix:** the render subprocess now starts at below-normal priority, which its children inherit. During a render, one long-lived PowerShell loop re-demotes any `chrome-headless-shell` process that raises itself; a fresh PowerShell every few seconds cost too much CPU on this machine.
  - **The result:** the slowest status poll during a map render dropped from 29 s to 62 ms.
  - `STUDIO_RENDER_PRIORITY=normal` turns this off.
- **Server wait lowered to 40 seconds:** render tools now wait 40 s, previously 50 s, before returning a job id. That stays under the 60-second request timeout many MCP clients use.
- **TypeScript target:** `render-project/tsconfig.json` targets ES2022, since 2026-09-27, because Map Flyover uses `Array.prototype.at`. It was ES2021 before, for Elements that use `String.replaceAll`.

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

### Popping Word Captions

- **Catalog id:** `community_popping_word_captions`
- **File:** `PoppingWordCaptions.tsx`, from Remotion Elements `captions/popping-word-captions`, saved verbatim
- **Packages:** `@remotion/captions`, `@remotion/google-fonts` for Montserrat, `@remotion/layout-utils`
- **Size:** `sizeMode: props`, default 682×252 with 0.8-second pages
- **Controls:** `captions` is whole-clip. Time between pages, width and height are also available.
- **Preview:** `captions` with style `pop`. The spoken word turns blue and is drawn 3% larger.
- **Verified:** 2026-09-27, [word-captions-f26.png](renders/word-captions-f26.png) and [word-captions-f70.png](renders/word-captions-f70.png), top row. It highlighted "starts" and "single" on time. At frame 28 the popping word measured 225 px wide against 219 px for the same word in Word Highlight.
- **Notes:**
  - The word being spoken turns blue and springs to 1.03× over up to 4 frames, then shrinks back before it ends.
  - The pop is subtle by design.
  - It **needs React 19**. On React 18 the scale is silently ignored and the component looks exactly like Word Highlight.

### Word Highlight Captions

- **Catalog id:** `community_word_highlight_captions`
- **File:** `WordHighlightCaptions.tsx`, from Remotion Elements `captions/word-highlight-captions`, saved verbatim
- **Packages:** `@remotion/captions`, `@remotion/google-fonts` for Montserrat, `@remotion/layout-utils`
- **Size:** `sizeMode: props`, default 682×252 with 0.8-second pages
- **Controls:** the same as Popping Word Captions
- **Preview:** `captions` with style `highlight`
- **Verified:** 2026-09-27, bottom row of the same renders
- **Notes:**
  - It is the same as Popping Word Captions without the scale.
  - Between words, during a pause, no word is blue. Moving Pill differs here: its pill stays on the last spoken word.

### Horizontal Bar Chart

- **Catalog id:** `community_horizontal_bar_chart`
- **File:** `HorizontalBarChart.tsx`, from Remotion Elements `data/horizontal-bar-chart`, saved verbatim
- **Packages:** `@remotion/google-fonts` for Inter
- **Size:** it fills the layer box, `sizeMode: none`. It is registered full-frame, so aspect refit resizes it.
- **Controls:** box width and height only. The data is hard-coded: Jonny 18 highlighted, Igor 17, Mehmet 10.
- **Preview:** `hbars`, which reproduces the bar wipe, label fade and value fade timings
- **Verified:** 2026-09-27, [data-bars-f90.png](renders/data-bars-f90.png) with start 30. Nothing shows at frame 20.
- **Notes:**
  - The bars start at local frames 8, 14 and 20. Each wipes in over frames 14 to 47 of its own time.
  - The whole chart settles about 67 frames after the layer starts. At local frame 60, Mehmet's value is still being revealed.
  - To change the data, edit the `data` array in the source. It is not a prop.

### Line Chart

- **Catalog id:** `community_line_chart`
- **File:** `LineChart.tsx`, from Remotion Elements `data/line-chart`, saved verbatim
- **Packages:** `@remotion/google-fonts` for Inter
- **Size:** it fills the layer box and is full-frame. The plot is a fixed 640 px tall with 160 px padding on every side, so it is designed for 1920×1080. In 9:16 the plot is stretched narrow but still works.
- **Controls:** box size only. The data, Mar to Sep and 24 to 74K, is hard-coded.
- **Preview:** `linechart`, which covers the line draw, dot pops and badge
- **Verified:** 2026-09-27, [data-line-f80.png](renders/data-line-f80.png) at 9:16
- **Notes:**
  - The line draws over local frames 14 to 58.
  - The "74K" badge springs in over frames 58 to 70.
  - The badge's `scale` is passed as a string, so it would have worked on React 18 too.

### Number Counter

- **Catalog id:** `community_number_counter`
- **File:** `NumberCounter.tsx`, from Remotion Elements `data/number-counter`, saved verbatim
- **Packages:** `@remotion/google-fonts` for Inter
- **Size:** it centres in the layer box, 1000×260 by default. The text is dark #171717, so it needs a light background.
- **Controls:** box size only. The target 24,813 and the 90-frame duration are hard-coded.
- **Preview:** `numcounter`, which uses the same curve as the real component
- **Verified:** 2026-09-27, [data-counter-f150.png](renders/data-counter-f150.png): start 60, duration 120, over Paper Texture
- **Notes:**
  - **It ends at 24,789, not 24,813.** `Easing.out(Easing.exp)` tops out at 1 − 2⁻¹⁰ ≈ 0.99902, and 24,813 × 0.99902 rounds to 24,789. This is upstream behaviour, not a timing error: frame 150 is exactly local frame 90.
  - A different easing in the source, such as `Easing.out(Easing.cubic)`, would land exactly on the target.

### Pie Chart

- **Catalog id:** `community_pie_chart`
- **File:** `PieChart.tsx`, from Remotion Elements `data/pie-chart`, saved verbatim
- **Packages:** `@remotion/google-fonts` for Inter
- **Size:** it fills the layer box and is full-frame. The pie is a fixed 680 px, then a 72 px gap, then the legend, which takes the remaining width.
- **Controls:** box size only. The data is hard-coded: Focused work 42%, Meetings 26%, Planning 18%, Admin 14%.
- **Preview:** `pie`, which covers the slice sweep and the legend wipe
- **Verified:** 2026-09-27, [pie-16x9-f75.png](renders/pie-16x9-f75.png), with mid-animation and aspect tests in [data2-contact.png](renders/data2-contact.png)
- **Notes:**
  - The slices sweep 0 to 360° over frames 8 to 60.
  - The legend rows wipe in over frames 8 to 52.
  - The pie scales 0.96 to 1 using `output: 'perceptual-scale'`, which needs Remotion 4.0.5xx.
  - **At 1:1 or 9:16 the legend is cut off** when the box shrinks to the frame. Keep the box at 1920×1080 and scale the layer instead. At 1:1 that means scale 0.5625 and baseY 236.

### Vertical Bar Chart

- **Catalog id:** `community_vertical_bar_chart`
- **File:** `VerticalBarChart.tsx`, from Remotion Elements `data/vertical-bar-chart`, saved verbatim
- **Packages:** `@remotion/google-fonts` for Inter
- **Size:** it fills the layer box and is full-frame. The plot is a fixed 1080 px wide, with three 280 px bars.
- **Controls:** box size only. The data is hard-coded: Jonny 34, Igor 89, Mehmet 163 highlighted.
- **Preview:** `vbars`, which covers bar growth, value pop-up and label rise with the same per-bar timings
- **Verified:** 2026-09-27, [vbars-16x9-f110.png](renders/vbars-16x9-f110.png). The preview at frame 55 matched the render: Jonny done, Igor growing with no value yet, Mehmet not started.
- **Notes:**
  - Bar *i* starts growing at local frame 22 + 24*i*.
  - Mehmet, the last bar, finishes around frame 94.
  - In 9:16 the 1080 px plot exactly fills a 1080 px-wide frame, ignoring the 56 px padding. It works, but has no side margin, so scale the layer down slightly if you want one.

### Wiggling Callout

- **Catalog id:** `community_wiggling_callout`
- **File:** `ProductDiscountCallout.tsx`, from Remotion Elements `commerce/product-discount-callout`, saved verbatim
- **Packages:** `@remotion/shapes` for `makeCallout`, and `@remotion/google-fonts` for Inter
- **Size:** it is laid out in absolute pixels. The 600×370 bubble sits at 80, 195 inside the layer box, which defaults to 760×640. To make it bigger or smaller, scale the layer rather than resizing the box.
- **Controls:** box size only. The "-20%" text and blue colour are hard-coded.
- **Preview:** `callout`, with the same wiggle keyframes and easing
- **Verified:** 2026-09-27, [commerce-contact.png](renders/commerce-contact.png): tilted about 10° at frame 7, level at frame 40
- **Notes:**
  - It rotates 0 → 10° → −7° → 3° → 0° over frames 0 to 26, pivoting at the bottom centre.
  - It uses `interpolate` with string output such as `'10deg'`, which Remotion 4.0.5xx supports.
  - Use layer timing, `startFrame`, to wiggle it in at a chosen moment.

### Shine

- **Catalog id:** `community_shine`
- **File:** `Shine.tsx`, from Remotion Elements `commerce/shine`, saved verbatim
- **Packages:** `@remotion/effects` for the `scale` and `shine` effects
- **Size:** a fixed 1280×720 canvas, with the image drawn at 0.75 scale inside it
- **Controls:** box size only
- **Preview:** `canvasfx` with style `shine`, a white diagonal band crossing the image
- **Verified:** 2026-09-27, contact sheet row 2 middle. Frames 0 and 22 differ.
- **Notes:**
  - The shine sweeps once over frames 0 to 44 at a 30° angle.
  - **The image URL is hard-coded** to `remotion.media/elements/commerce-tear-a-graphic.png`, so renders need network access.
  - To shine your own content, replace the `<CanvasImage src=…>` or put any HTML inside `<HtmlInCanvas>`. That is a deliberate edit to the source.
  - It needs HtmlInCanvas; see the pipeline notes.

### Tear Apart

- **Catalog id:** `community_tear`
- **File:** `Tear.tsx`, from Remotion Elements `commerce/tear`, saved verbatim
- **Packages:** `@remotion/effects` for the `scale` and `tear` effects
- **Size:** a fixed 1280×720 canvas, with the image at 0.75 scale
- **Controls:** box size only
- **Preview:** `canvasfx` with style `tear`, two halves with a narrow jagged gap. It was tuned to match the render.
- **Verified:** 2026-09-27: intact at frame 10, torn with about 5° of rotation at frame 30
- **Notes:**
  - The tear springs over frames 15 to 25, with jaggedness 24 and 5° rotation, then holds.
  - The image URL is hard-coded, as in Shine.
  - It needs HtmlInCanvas.

### Rotating Cards

- **Catalog id:** `community_rotating_cards`
- **File:** `ProductCollection.tsx`, from Remotion Elements `commerce/product-collection`, saved verbatim. The export is `ProductCollection`, and the file also exports `productCollectionDurationInFrames = 150`.
- **Packages:** `@remotion/google-fonts` for Inter
- **Size:** a fixed 900×660 stage at 60, 180 inside a 1080×1080 layer box. Scale the layer to resize it.
- **Layer duration:** 150 frames by default, through `defaultDurationInFrames`
- **Controls:** box size only. The labels A, B and C and the images are hard-coded. Card C is the blue image with `hue-rotate(-65deg)`, which renders green.
- **Preview:** `cards`, with the same scroll, entry and fade timing
- **Verified:** 2026-09-27, [layouts-contact.png](renders/layouts-contact.png): A entering at frame 10, B centred at 60, C centred at 110
- **Notes:**
  - It fades in over frames 0 to 10 and out over 142 to 149. The centre card changes over frames 24 to 122.
  - It is a self-contained clip: a 150-frame layer is exactly one play-through.

### Picture in Picture

- **Catalog id:** `community_picture_in_picture`
- **File:** `PictureInPictureTransition.tsx`, from Remotion Elements `layouts/picture-in-picture-transition`, saved verbatim
- **Packages:** none beyond `remotion`
- **Size:** it is full-frame through `AbsoluteFill`, but **built for 1920×1080**. The final position is a hard-coded `translate: 1363px 23px`, so on other sizes the box lands in the wrong place. For other aspect ratios, use a 1920×1080 box and scale the layer.
- **Controls:** box size only. Scenes A and B are hard-coded images with letters.
- **Preview:** `pip`
- **Verified:** 2026-09-27: full frame at 0, boxed at the top right at 60
- **Notes:**
  - Scene A shrinks to 0.38×, is cropped to about 40% width, and rounds to a 48 px corner radius over frames 15 to 50, with a spring.
  - To use your own scenes, replace the two `Interactive.Div` children. That is a source edit.

### Slide to Split Screen

- **Catalog id:** `community_split_screen`
- **File:** `SlideToSplitScreen.tsx`, from Remotion Elements `layouts/slide-to-split-screen`, saved verbatim
- **Packages:** none beyond `remotion`
- **Size:** full-frame, sized from `useVideoConfig()`, so it adapts to any aspect ratio. Verified at 16:9 and 9:16.
- **Controls:** box size only
- **Preview:** `split`
- **Verified:** 2026-09-27: open 60/40 with a 15 px white divider at frame 70, in both aspects
- **Notes:**
  - It opens over frames 20 to 52, holds, then closes back to full frame over 98 to 130.
  - Because it reads the **composition** size, not the layer box, it is meant to cover the whole frame. Scaling the layer does not change its internal layout.

### A-to-B Map Flyover

- **Catalog id:** `community_map_flyover`
- **File:** `MapFlyover.tsx`, from Remotion Elements `maps/map-flyover`, saved verbatim
- **Packages:** `maplibre-gl` and `@turf/turf`. Neither is a Remotion package, so they are not version-pinned. The file also imports `maplibre-gl/dist/maplibre-gl.css`, which Remotion's bundler handles.
- **Size:** full frame, sized from `useVideoConfig()`. It renders a 4096 px MapLibre "plate" and pans a camera across it.
- **Controls:**
  - Whole clip: `origin` and `destination` as `[longitude, latitude]`, and the origin and destination labels.
  - Keyframable: route colour, and route width from 2 to 24.
- **Render timeout:** 180000 ms
- **Preview:** `map` with style `flyover`, a stylised stand-in without tiles
- **Verified:** 2026-09-27, [maps-contact.png](renders/maps-contact.png), top row, London to Tokyo: London at frame 0, route over Russia at frame 100, arriving in Tokyo at 240.
- **Timing:** travel eases over frames 0 to 205. The destination marker appears at 210 to 234, and the label fades in at 232 to 240. About a 245-frame clip.
- **Network at render time:**
  - The MapLibre worker script, `unpkg.com/maplibre-gl@<version>/dist/maplibre-gl-worker.mjs`.
  - NASA GIBS Blue Marble tiles, up to zoom 8.
- **Cost:** it renders with WebGL. On this 4-core machine, with software WebGL, one frame takes about 50 seconds direct and 100 seconds through MCP at below-normal priority. Budget heavily for full videos.

### Watercolor Map

- **Catalog id:** `community_watercolor_map`
- **File:** `WatercolorMap.tsx`, from Remotion Elements `maps/watercolor-map`, saved verbatim
- **Packages:** `@remotion/google-fonts` for Lora
- **Size:** full frame, sized from `useVideoConfig()`. The tile zoom is picked from the route length, assuming a 1920 px width.
- **Controls:** the same as Map Flyover, with `routeWidth` from 4 to 30.
- **Render timeout:** 180000 ms
- **Preview:** `map` with style `watercolor`, covering the arc, markers and labels
- **Verified:** 2026-09-27, bottom row, with a **custom route** set through props, Colombo `[79.8612, 6.9271]` to Paris `[2.3522, 48.8566]`: Colombo label at frame 0, arrival with the Paris label at 160. Each frame took about 35 seconds.
- **Timing:** the camera and route travel over frames 40 to 130. The destination marker and label spring in from frame 130. About a 155-frame clip.
- **Network:** tiles come from `watercolormaps.collection.cooperhewitt.org`. The attribution "Map tiles by Stamen Design, CC BY 3.0 · Data by OpenStreetMap, CC BY-SA" is drawn in the bottom-right corner, so keep it visible.

### Location Lower Third

- **Catalog id:** `community_location_lower_third`
- **File:** `LocationLowerThird.tsx`, from Remotion Elements `overlays/location-lower-third`, saved verbatim
- **Packages:** none. The font is Arial or Helvetica.
- **Size:** a fixed 680×138 layout, `sizeMode: none`. The default box is at (96, 846), bottom-left on 16:9.
- **Controls:** box size only. The text "Berlin, Germany" is a hard-coded constant.
- **Preview:** `lowerthird` with style `location`
- **Verified:** 2026-09-27, [overlays-contact.png](renders/overlays-contact.png) rows 1 to 3:
  - Frame 12: the pin outline is drawn and the fill fades in.
  - Frame 45: the pin and the text are fully in.
  - Frame 104: the text is wiped almost away.
- **Notes:**
  - Timeline:
    - Frames 0 to 21: the pin draws, fills and drops in.
    - Frames 14 to 38: the text wipes in with a spring `cropRight`.
    - Frames 88 to 119: everything leaves.
  - `defaultDurationInFrames: 120`.
  - **The text is near-black (#18181b),** so it is designed for light footage. On a dark background it barely reads, as in the test render.
  - To change the place, edit the `location` constant. That is a deliberate edit to the source.

### Name Lower Third

- **Catalog id:** `community_name_lower_third`
- **File:** `NameLowerThird.tsx`, from Remotion Elements `overlays/name-lower-third`, saved verbatim
- **Packages:** `@remotion/google-fonts`, for Inter 500 and 700
- **Size:** a fixed 534×132 layout (two 66 px bars), `sizeMode: none`. The default box is at (96, 852).
- **Controls:** box size only. "Alex Morgan" and "Creative Developer" are hard-coded.
- **Preview:** `lowerthird` with style `name`. Bar widths are estimated from the character count.
- **Verified:** 2026-09-27, contact sheet rows 4 and 5: half-revealed at frame 10, fully in at frame 50
- **Notes:**
  - Timeline:
    - Frames 0 to 20: the blue name bar wipes in.
    - Frames 4 to 24: the dark title bar follows.
    - Frames 92 to 116: both wipe out.
  - `defaultDurationInFrames: 120`.
  - Each bar is as wide as its text, so longer names give wider bars.

### Social Safe Zones

- **Catalog id:** `community_social_safe_zones`
- **File:** `SocialSafeZones.tsx`, from Remotion Elements `overlays/social-safe-zones`, saved verbatim
- **Packages:** none. It uses `CanvasImage` from `remotion`, which needs HtmlInCanvas; see the pipeline notes.
- **Size:** a fixed 1080×1920, so **use it on a 9:16 scene**. It is `fullFrame` and `sizeMode: none`. On other aspect ratios it overflows or is cropped.
- **Controls:** `platform` (Instagram Reels or TikTok), whole clip. It is a real prop on the component.
- **Preview:** `safezones`, which draws the same two images
- **Verified:** 2026-09-27, contact sheet right: the Instagram and TikTok interfaces over the sample image, at 9:16
- **Notes:**
  - **It is a guide, not content.** Delete or hide the layer before the final render, or the fake app interface ends up in the video.
  - **Upstream also draws a sample "Background" image** (the blue building with "A") underneath the interface, so it covers everything below it in the scene tree. To check your own footage, put the guide at the top and edit out the first `<CanvasImage>`. That is a deliberate edit to the source. Without that edit it only shows the interface over the sample.
  - The interface images come from `remotion.media`, so renders need network access.
  - Upstream says the zones were measured from iOS captures. Treat them as a reference, not a guarantee.

### News Article Highlight

- **Catalog id:** `community_news_article_highlight`
- **File:** `NewsArticleHighlight.tsx`, from Remotion Elements `text/news-article-highlight`, saved verbatim
- **Packages:** `@remotion/rough-notation`, first installed 2026-09-27 and pinned to 4.0.526
- **Size:** full frame through `AbsoluteFill`, `fullFrame: true`. The 1420×458 article is centred in the box.
- **Controls:** box size only. The headline, the category "Politics", the summary and the highlighted words are all hard-coded.
- **Preview:** `article`, an HTML copy of the article with highlighter bars growing left to right
- **Verified:** 2026-09-27 on Paper Texture, [story-contact.png](renders/story-contact.png) top row:
  - Frame 20: no highlights yet.
  - Frame 50: "government shutdown" highlighted.
  - Frame 100: "funding lapses" highlighted as well.
- **Notes:**
  - Timeline:
    - Frames 31 to 55: the first two words are highlighted.
    - Frames 60 to 84: the next two.
    - Frames 125 to 149: everything fades out.
  - `defaultDurationInFrames: 150`.
  - **The text is dark (#181816) and the article has no background of its own,** so put a light background under it, such as Paper Texture or Notebook Paper, or light footage.
  - The rough-notation highlight is a hand-drawn, slightly uneven marker. The preview draws plain bars.

### On-Screen Messages

- **Catalog id:** `community_on_screen_messages`
- **File:** `OnScreenMessages.tsx`, from Remotion Elements `storytelling/on-screen-messages`, saved verbatim
- **Packages:** `@remotion/google-fonts`, for Inter 400
- **Size:** a fixed 1260×680 layout, `sizeMode: none`, centred on 16:9 at (330, 200)
- **Controls:** box size only. The three messages are hard-coded.
- **Preview:** `messages`, the same bubbles and tails in HTML
- **Verified:** 2026-09-27, contact sheet middle row: one bubble at frame 6, all three at frame 70
- **Notes:**
  - The bubbles fade and rise 32 px in at frames 2 to 10 (grey), 27 to 35 (blue, right) and 52 to 59 (grey).
  - They do not animate out; the last bubble has settled by frame 59. `defaultDurationInFrames: 90`.
  - The bubble tails come from a global `<style>` tag with the classes `.on-screen-message-from-them` and `-from-me`. Two copies in one scene share the same rules, which is harmless.

### Polaroid Pictures

- **Catalog id:** `community_polaroid_pictures`
- **File:** `PolaroidPictures.tsx`, from Remotion Elements `storytelling/polaroid-pictures`, saved verbatim
- **Packages:** `@remotion/google-fonts`, for Caveat 600 in the captions
- **Size:** a fixed 1480×640 layout, `sizeMode: none`, centred on 16:9 at (220, 220)
- **Controls:** box size only. The photos (the blue, pink and green-tinted scene images with A, B and C) and the captions are hard-coded.
- **Preview:** `polaroids`, three taped cards with the same in, hold and out motion, timed from `layerDuration`
- **Verified:** 2026-09-27, contact sheet bottom row. A 150-frame layer in a 180-frame composition:
  - Frame 40: the cards are landing.
  - Frame 100: they hold with a slow drift.
  - Frame 138: they fly out.
- **Notes:**
  - **The exit is timed from the layer's length,** meaning `useVideoConfig().durationInFrames`. The cards fly out over the layer's last 26 to 30 frames. Frame 138 of a 150-frame layer confirms this: timed from the 180-frame composition, they would still be holding.
  - So set `durationInFrames` on the layer to choose when they leave. `defaultDurationInFrames: 150`. Without a layer duration, they leave at the end of the composition.
  - The cards fly in over frames 8 to 34, 20 to 46 and 32 to 58, overshooting the box from off-screen. The layer must not be clipped.
  - The images come from `remotion.media`.

### Typewriter Text

- **Catalog id:** `community_typewriter`
- **File:** `TypewriterText.tsx`, a sample written for this project, not from Remotion Elements
- **Packages:** none
- **Size:** `sizeMode: style`, width and height passed as `style`
- **Notes:** the pattern to copy for hand-written components that take plain props.
