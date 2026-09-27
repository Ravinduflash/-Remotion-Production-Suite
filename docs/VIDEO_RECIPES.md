# Video recipes

These are storyboards for six common product videos. Each beat is mapped to components already in this studio's catalog, so an agent can build the timeline through MCP.

The structure comes from the remocn.dev guides, linked in each section. Those guides assume remocn's own components, which this project does not have yet; see [Gaps](#gaps-remocn-components-not-in-the-catalog). The summaries here are my own. Read the originals for their full prompts and directing tips.

All timings are at 30 fps and 1920×1080 (`set_aspect 16:9`). Put a background layer at the bottom of every recipe.

## Shared building blocks

| Need | Catalog id | Notes |
|---|---|---|
| Scene frame / background | `remocn_backdrop` (wrap a beat's layers for the padded, rounded frame), `remocn_drift` (wrap any static beat for a slow push-in) | Real remocn components; see the wrapper notes in COMPONENT_NOTES.md |
| Screenshot or page on a 3D set | `remocn_stage` wrapping a `remotion_img` | Camera `moves`, shake, lighting |
| Agent chat to result | `remocn_chat_to_preview` (slots `chat`, `preview`) | Placeholders when a slot is empty |
| Quiet moving background | `community_liquid_contours`, `community_moving_waves`, `community_paper_texture` | These stand in for remocn's `shader-simplex-noise`. Paper Texture suits dark text. |
| Lines that stack up / value claims | `remocn_line_by_line_slide` (one line per row, exits right at the layer end) | The real `line-by-line-slide` the guides ask for |
| Text with a matching exit | `remocn_scale_down_fade`, `remocn_focus_blur_resolve`, `remocn_blur_out_up` | Exit timed from the layer duration |
| Phrase A → B → C swaps | `remocn_per_word_crossfade`, chained with startFrame | Keynote-style swaps |
| Quiet label entrance | `remocn_micro_scale_fade` | |
| Voiceover-paced phrases | `remocn_word_stream` (phrases with `|`, `wordGap` = pace), `remocn_word_push` | |
| Replace one phrase with another | `remocn_caret_swap` (caret eats and types), `remocn_per_word_crossfade` | |
| Cold open or big display word | `remocn_zoom_words`, `remocn_fog_rise`, `remocn_sheen_slide_in` | These exit or hard-cut on their own; cut to the next beat |
| Wordmark reveal | `remocn_squeeze_in` | |
| The number beat / a big metric | `remocn_outline_fill_track_text` ("Keep" → outlined value fills) | Owns a dark field |
| CTA inside a sentence | `remocn_inline_pill_takeover` | Camera punches into the pill |
| Product intro title | `remocn_typed_split_wipe`, `remocn_gradient_scale_cut_text` | |
| Beat-synced statement | `remocn_centered_word_build` | |
| Positioning "Like X, for Y" | `remocn_kinetic_center_build` | The real `kinetic-center-build` the launch guide asks for |
| Tagline slide-in | `remocn_short_slide_right` | The real `short-slide-right` |
| Problem → solution / price drop | `remocn_strikethrough_replace` | White background |
| Calm A→B→C swaps | `remocn_fade_through`, `remocn_shared_axis_z` (depth), `remocn_shared_axis_y` (hard cut) | Chain with startFrame |
| Playful phrase morphs | `remocn_kinetic_morph_text` | Own background |
| Beat-synced display word | `remocn_kinetic_warp` | Tune `keyframeStride` to the tempo |
| Hand-drawn underline under a URL / stat | `remocn_ink_underline` | Set `delay` to when the text lands; box width = stroke length |
| The number beat, counting | `remocn_rolling_number` (odometer, lands exactly) | Counts over 80% of the layer |
| "Any component, same command" cycling | `remocn_rolodex_flip` | Inline, JSON items |
| Before → after value / price | `remocn_value_swap` | Swap frames in `at` |
| Ambient ticker band | `remocn_infinite_marquee`, `remocn_perspective_marquee` (3D, dark) | Loops |
| Hacker / terminal reveal | `remocn_matrix_decode` | White background |
| Glitch accent on a title | `remocn_rgb_glitch_text` | #fafafa background |
| Liquid title reveal | `remocn_gooey_morph` | Bars → word melt |
| Looping poster hold / outro | `remocn_perspective_squeeze` | 225-frame loop |
| Punchy one-word stamp | `remocn_extrude_pop` | Solid 3D body |
| Music-video ambient title | `remocn_chromatic_wave` | Dark background only |
| Elastic display entrance | `remocn_stretch_in` | Needs a font file URL |
| Product intro via search | `remocn_search_reveal` | Types the product name |
| Code on screen | `remocn_glass_code_block` (static), `remocn_glass_code_walk` (camera scan) | Put a gradient/image under the glass |
| Install / CLI beat | `remocn_terminal_simulator` (multi-line), `remocn_terminal_cursor_zoom` (one command, zoomed) | The real terminal the recipes ask for |
| Growth chart | `remocn_animated_line_chart` | Draw timed from the layer |
| Category comparison | `remocn_animated_bar_chart` | Staggered spring bars; put the winner last |
| Tags / chips landing | `remocn_paper_sticker` (one layer per tag, stagger `at`, own `seed`) | Stop-motion paper look |
| Framed clip or living screenshot | `remocn_polaroid` wrapping an image / video / layers | Handwritten caption |
| Feature list being ticked off | `remocn_check_list` | Written in full first, then crossed off |
| Screenshot sequence | `remocn_reel` | Centre-out bloom, no camera move |
| Prompt typed into an AI product | `remocn_claude_chat`, `remocn_chat_gpt`, `remocn_v0` | Branded composer; button morphs to send |
| Coding-agent CLI beat | `remocn_claude_code`, `remocn_opencode` | Welcome screen + typed command; generic shell = `remocn_terminal_simulator` |
| Textured scene change (grain) | `remocn_grain_dissolve`, `remocn_wave_wipe`, `remocn_ripple_zoom` | Transition layers: wrap scene A as `from`, B as `to` |
| Melt / vortex chapter break | `remocn_warp_dissolve`, `remocn_swirl_dissolve` | ≥ 76 / 104 frames; one statement vortex per video |
| Shader material reveal / fly-through | `remocn_shader_seam`, `remocn_shader_spiral_pass` | WebGL2; opaque scenes |
| Everyday cut | `remocn_zoom_blur` (18f), `remocn_whip_pan` (26f, directional), `remocn_push_through` (40f, outer → inner), `remocn_focus_pull` (46f, calm) | CSS only, fast to render |
| Textured quick cut / film dissolve | `remocn_dither_dissolve` (40f, retro/terminal), `remocn_perlin_dissolve`, `remocn_smoke_dissolve` (104f) | WebGL fields |
| Keyword emphasis in a sentence | `remocn_marker_highlight` (painted block), `remocn_inline_highlight` (colour only) | White background |
| Word-by-word body line | `remocn_staggered_fade_up` | White background |
| Stacked lines with a matching exit | `remocn_mask_reveal_up` | Transparent |
| Brand name focusing in | `remocn_tracking_in` | White background |
| Dark dramatic line | `remocn_shadow_sweep_text` | Fixed 37-frame cycle |
| High-energy one-word blasts | `remocn_rush_type` | WebGL, 26 frames per word |
| Premium headline entrances | `remocn_soft_blur_in` (per-character blur-in), `remocn_shader_text_reveal` (shader-filled words), `remocn_type_fossil` (drafts → final word), `remocn_per_character_rise` (crisp), `remocn_bottom_up_letters` / `remocn_top_down_letters` (staircase, short words), `remocn_spring_scale_in` (playful word pop) | remocn; see the notes for backgrounds and durations |
| Prefix + rotating word ("Looking for leads / customers / …") | `remocn_inline_word_roll` | A good fit for the hook's "three moments" or the breadth beat |
| Headline or single line | `text_card` | `text` + `subtitle`, font size, colour and alignment. Keyframe opacity and scale for the entrance. |
| Line that types itself (terminal, URL, CTA) | `community_typewriter` | `text`, `charsPerFrame`, `color`, `cursorColor` |
| Words swapping in one slot | `community_spinning_text_wheel` | `items`, one per line. **The first item is where it lands.** It uses dark text, so give it a light background. |
| Timed lines or subtitles | `community_basic_captions` or the pill, popping and word-highlight variants | Use `build_captions` to turn script text into `Caption[]`. |
| Emphasise a word | `community_text_marker`, `community_circle_marker`, `community_strike_through`, `community_crossed_off` | The text is hard-coded; see [COMPONENT_NOTES.md](COMPONENT_NOTES.md). |
| A number that counts | `counter` | `value`, `prefix`, `suffix`, `label`. Keyframe `value` to count between two numbers. |
| Screenshot or screen recording | `remotion_img`, `remotion_video` | Use a real app screenshot or recording for the demo beats. |
| Transition or reveal | `community_picture_in_picture`, `community_split_screen`, `community_shine`, `community_tear` | Their scene images are hard-coded. |
| Logo | `remotion_img` | Use `staticFile()` or a URL, with the Name Lower Third for a title if needed. |
| YouTube close | `community_youtube_subscribe_nudge` (avatar prop), `community_youtube_end_card` | |

Keep external layers from spilling into the next beat: set `startFrame` and `durationInFrames` on each one with `add_asset` or `update_asset`. Then run `check_scene` and `render_still` on one frame per beat before the full `render_scene`.

## Teaser, about 15 s (450 frames)

Source: <https://remocn.dev/docs/guides/teaser>. A pre-launch video with no demo: name the itch, tease, reveal the name, give the date, finish on the lockup. Five beats at most.

| Beat | Frames | Build |
|---|---|---|
| Itch line | 0–75 | `text_card`, fading in and out |
| Tease line | 75–150 | `text_card` in the same position |
| Name reveal + what-it-is | 150–270 | A big `text_card`, with `community_shine` or `community_tear` as the cover. remocn uses `shader-swirl` here. |
| Date or waitlist | 270–360 | `text_card`, big and alone, in the accent colour |
| Logo + URL | 360–450 | `remotion_img` and `community_typewriter` |

## Changelog video, about 25 s (750 frames)

Source: <https://remocn.dev/docs/guides/changelog-video>. A recurring release update with three or four small changes. Keep the frame identical every edition and change only the items: save the scene JSON with `get_scene`, then load it with `set_scene` for the next edition and change only the item text.

| Beat | Frames | Build |
|---|---|---|
| Stamp (name + version) | 0–90 | `text_card`, with `text` as the name and `subtitle` as the version |
| Change 1, 2 and 3 | 90–240, 240–390, 390–540 | The same `text_card` treatment each time: the name lands, then the payoff line. For a visual change, use a `remotion_img` screenshot instead. |
| Nudge | 540–650 | `community_typewriter`: "Full changelog at …" |
| Lockup | 650–750 | `remotion_img` for the logo, plus a closing `text_card` |

## Feature announcement, about 40 s (1200 frames)

Source: <https://remocn.dev/docs/guides/feature-announcement>. Eight beats selling one release. The demo gets the most screen time.

| Beat | Frames | Build |
|---|---|---|
| Moments + problem | 0–150 | `community_spinning_text_wheel` with the three moments, then a `text_card` for the problem line |
| Reveal | 150–240 | "Meet …" `text_card`, with one signature transition (`community_picture_in_picture` or `community_shine`) |
| Mechanism | 240–330 | `text_card`, one calm beat |
| Demo, the longest beat | 330–720 | `remotion_video` of the real feature or `remotion_img` screenshots. Add a `community_text_marker` or `community_circle_marker` to point at things. |
| Breadth | 720–840 | A fast `community_spinning_text_wheel` or quick `text_card` cuts. Skip this beat if the release is one thing. |
| Value, three claims | 840–990 | Three `text_card`s staggered 20 frames apart. This replaces remocn's `line-by-line-slide`. |
| Install | 990–1110 | `community_typewriter` with the command |
| Outro | 1110–1200 | Logo plus a closing line |

## Showcase reel, about 30 s (900 frames)

Source: <https://remocn.dev/docs/guides/showcase-reel>. Each item in a collection (6 to 18 items) gets about 2 seconds and demonstrates itself.

| Beat | Frames | Build |
|---|---|---|
| Hook | 0–75 | `text_card` |
| The number | 75–150 | `counter`, keyframing `value` from 0 to N, with `label` as the collection name |
| The reel | 150–690 | One layer per item, each about 60 frames with `startFrame` and `durationInFrames`, plus an "NN / N" `text_card` in a corner. **This studio's own catalog makes a good reel:** each community component demonstrates itself. |
| Mechanism | 690–760 | `text_card` |
| Value | 760–830 | Staggered `text_card`s |
| Close + lockup | 830–900 | `community_typewriter`, then the logo |

## Product demo, about 50 s (1500 frames)

Source: <https://remocn.dev/docs/guides/product-demo>. One flow, start to finish, on a recreated app screen. The three flow steps take most of the runtime.

| Beat | Frames | Build |
|---|---|---|
| Setup line | 0–90 | `text_card` |
| Screen appears | 90–210 | `remotion_img` of the app screen, keyframing opacity and scale |
| Step 1, 2 and 3 | 210–540, 540–870, 870–1200 | Screenshots of each state as `remotion_img` layers, or one `remotion_video` clip. Use `community_circle_marker` or `community_text_marker` for emphasis, and `community_typewriter` for typing. |
| Payoff | 1200–1350 | Keep the final screen, and add the payoff `text_card` |
| Close | 1350–1500 | `community_typewriter` with the install command or URL, then the logo |

## Launch video, about 35 s (1050 frames)

Source: <https://remocn.dev/docs/guides/launch-video>. The full launch video: pain, reveal, tagline, positioning, a six-cut feature montage, value, install and outro. It is the Feature announcement's bigger sibling, selling the whole product rather than one release.

| Beat | Frames | Build |
|---|---|---|
| Two pain lines | 0–120 | Two `text_card`s, 60 frames each. Keyframe scale from 1.08 to 1 and fade in; this replaces remocn's `scale-down-fade`. |
| Reveal "Meet …" | 120–210 | `text_card`, uncovered by `community_shine` or `community_tear`. remocn uses `shader-swirl`. |
| Tagline | 210–300 | `text_card`, keyframing `baseX` from -80 to 0 with opacity. This replaces `short-slide-right`. |
| Positioning "Like X, for Y" | 300–390 | `community_basic_captions` or `community_popping_word_captions`, with `build_captions` to show one word at a time. This replaces `kinetic-center-build`. |
| Six-cut montage | 390–690 | Six 50-frame cuts, each a different full-frame background plus a label `text_card`. Backgrounds: `community_liquid_contours`, `community_moving_waves`, `community_moving_zigzags`, `community_rotating_starburst`, `community_paper_texture`, `community_notebook_paper`. Give each background `startFrame` and `durationInFrames` so the cuts are hard. |
| Three value claims | 690–840 | Staggered `text_card`s |
| Install | 840–960 | A short title `text_card`, then `community_typewriter` with the command |
| Outro | 960–1050 | `remotion_img` logo with a closing `text_card`. remocn draws the logo on over `shader-smoke-ring`, and there's no stand-in for that here. |

## Workflow: from beats to a finished file

These notes condense the remocn.dev craft guides and translate each one into this studio's tools. Sources: [How a video is built](https://remocn.dev/docs/guides/how-a-video-is-built), [Directing your agent](https://remocn.dev/docs/guides/directing-your-agent), [Words on screen](https://remocn.dev/docs/guides/words-on-screen), [Your brand](https://remocn.dev/docs/guides/your-brand), [Music and sound](https://remocn.dev/docs/guides/music-and-sound), [One video, three formats](https://remocn.dev/docs/guides/one-video-three-formats) and [Exporting your video](https://remocn.dev/docs/guides/exporting-your-video).

### Beats

A **beat** is one idea on screen. If it needs "and" to describe it, it's two beats.
- **Length:** a text beat lasts about 2 seconds, 60 frames.
- **Count:** a video is 5 to 10 beats, in three acts. **Hook** is one or two beats (pain, claim or question). **Body** is three to five (what it is, value, proof). **Close** is one: the single next action.
- **In the studio:** each beat is one or a few layers with `startFrame` and `durationInFrames` on the external components, or keyframed opacity on built-in layers. Write the beat list first, then place the layers from it. The recipe tables above are beat lists with frame ranges.

### Words on screen

A line is gone in two seconds, so:
- **Six words or fewer, one idea per line.** Split a long sentence into two beats rather than shrinking it.
- **Verbs over adjectives, concrete over grand.** Numbers, commands and names, never unprovable adjectives.
- **The two-second test:** say the line aloud at speaking pace. If it takes longer than two seconds, tighten it.
- **Formulas:**
  - Pain line: the problem in the viewer's words, then a twist.
  - Tagline: what it is, plus who it's for.
  - Positioning: "Like X, for Y".
  - Value: three concrete, provable claims.
  - Close: one command **or** one URL, not both.

### Directing: plain notes mapped to studio operations

Watch the whole cut once, then give notes by beat number, one sentence per note. **If the structure is wrong** (the story, the order, the number of beats), rewrite the beat list and rebuild. Patching structure through notes is slower.

| Note | What to change |
|---|---|
| "Hold it longer" / "too fast" | Lengthen that beat: raise `durationInFrames`, or `move_keyframe` the exit later, then shift the later beats' `startFrame`. |
| "Tighter" / "cut the dead air" | Shrink the gaps between beats. `set_timeline totalFrames` to the new end. |
| "Let it breathe" | Add 15 to 30 frames of hold after the big moment. |
| "Snappier" / "softer" | Change the layer's default easing with `update_asset`, or shorten or lengthen the keyframe span. Softer also means less travel in `baseX`/`baseY`. |
| "Come in from the left" | Set the entry keyframe's `baseX` off to the left, then ease to the resting position. |
| "Less bouncy" | Use a non-overshooting easing. External components have their own motion baked in, so swap the component instead. |
| "The background is too loud" | Lower the background layer's `opacity`, or use a calmer background such as Paper Texture instead of the starburst. |
| "Show me two options" | `duplicate_asset` or copy the scene with `get_scene`, change one version, and `render_still` both at the same frame. |

### Brand

To keep every video on-brand, save a `BRAND.md` brief in the project (don't commit it until it's filled in) and read it before building any video. The brief lists:
- The product and a one-line description.
- Background, text and accent hex values.
- The font mood and the logo file.
- The copy tone.

Use one accent, at most one accented element per beat. Use off-white text on dark and near-black on light, not pure white on black. An SVG logo scales cleanly in `remotion_img`.

### Music and sound

Build the silent cut first: most feeds autoplay muted, so every beat must work without sound. Then add the music:
- **Track:** add a `remotion_audio` layer with `src` as the track (`staticFile()` or a URL) and `volume` around 0.2 to 0.35, so it never competes with the screen.
- **Fade out over the outro:** `volume` is a keyframable number. Set keyframes of about 0.3 at the outro start and 0 at the last frame.
- **Start on beat 2:** set a later `startFrame`. **Duck under the demo:** add volume keyframes that dip and come back.
- **Choosing a track:** instrumental with steady energy, and **licensed for commercial use.** A product video counts as commercial use even when the product is free. Free libraries include Pixabay Music, Uppbeat and the YouTube Audio Library.
- **Sound effects:** components like Subscribe Nudge carry their own; see its notes.

### One video, three formats

Finish the 16:9 cut completely first, then re-cut it.
- **The re-cut:** `set_aspect` with `preset: "9:16"` (or `"1:1"`, `"4:5"`) and `refit: true` remaps positions and full-frame backgrounds to the new frame. Keep the same beats, words and timing.
- **What breaks in vertical:**
  - **Long lines wrap.** Shorten the line; don't shrink the font.
  - **Side-by-side layouts** should stack top and bottom.
  - **Fixed 1920×1080 Elements** (Picture in Picture, YouTube End Card) keep their layout; use a 1920×1080 box and scale the layer.
- **Keep text and logos in the middle band.** Platform UI covers the top and bottom. Add `community_social_safe_zones` (9:16) at the top of the scene tree to check, then **delete it before rendering**.
- `check_scene` flags `outside_safe_area` and `offscreen` layers after the re-cut. Watch every format all the way through before publishing.

### Export

`render_scene` writes an MP4, h264 by default, to `render-project/out/` and returns the full path. It waits up to 40 s, then gives a `jobId` for `render_status`.
- **Proof first:** `render_still` one frame per beat, or `render_scene` with `scale: 0.5` and a `frames` range.
- **Render time on this machine:** real renders are slow. A 120-frame clip at 0.25 scale took 73 s, and heavy WebGL components like the map flyover take much longer per frame. Expect a 30-second video to take many minutes.
- **After changes:** render again. Renders are cheap to repeat.

## Craft rules

These are remocn's house rules, adapted to this project. Sources: [Craft](https://remocn.dev/docs/craft), [Design defaults](https://remocn.dev/docs/craft/design-defaults), [Motion principles](https://remocn.dev/docs/craft/motion-principles) and [Anti-patterns](https://remocn.dev/docs/craft/anti-patterns).

**Scope:** the rules govern what **you add**: `text_card` lines, your own cards, colours and keyframed motion. They don't govern a registered component whose effect *is* the point. Letter-spacing inside Location Lower Third, the watercolour map or the shine sweep stays as designed.

### Design defaults for your own layers

- **Sentence case and default tracking.** No reflex ALL-CAPS and no wide `letterSpacing`. `check_scene` adds a `craft_text_style` note when a text layer does either.
- **Solid text.** No gradient-filled text, and no decorative gradient washes on cards. Gradients belong on backgrounds.
- **No glow.** If you need separation, use a 1 px border or a small neutral shadow. Avoid blur above about 24 px, spread, coloured glows and stacked shadows.
- **Stay in one palette:**
  - Text: near-black #171717 on light, off-white #fafafa on dark.
  - Backgrounds: #0a0a0a, or the recipes' warm #141318.
  - Surface: #27272a.
  - One accent, such as green #22c55e, sky #0ea5e9 or violet #a855f7.
  - Brand components (YouTube, social cards) keep their own colours.
- **Fonts:** Inter for UI and body text, Manrope for display, Fraunces for serif, JetBrains Mono for code. The studio preview loads Inter, Cormorant Garamond, Caveat, Mona Sans, Space Grotesk and JetBrains Mono. Components load their fonts through `@remotion/google-fonts` at module level, never per frame.

### Motion principles as studio operations

| Principle | In this studio |
|---|---|
| **Staging:** one focal action per beat | Give each beat its own layers with `startFrame`/`durationInFrames`. Fade out or scale down whatever is leaving. |
| **Overlap:** stagger siblings 3 to 6 frames | Offset each sibling's `startFrame` or first visible keyframe. `check_scene` warns `simultaneous_entrances` when 3 or more layers enter on the same frame. |
| **Slow in, slow out** | Use an ease-out default easing for entrances (`update_asset`). Keep linear only for constant drifts. |
| **Anticipation, exaggeration (capped)** | At most a 1 to 3 frame wind-up and a 110 % scale peak. No cartoon recoil. |
| **Timing:** duration sets weight | Vary beat lengths: a hero reveal runs slower than a toast. Don't reuse one duration for everything. |
| **Arc** | Keyframe `baseX` and `baseY` with different easings, or add a midpoint keyframe off the straight line. |
| **Secondary action** | Keep it small and on theme, like the typewriter caret or the nudge's bell. It must not compete with the main action. |

### Anti-patterns and how this project handles them

| Anti-pattern | Here |
|---|---|
| Clipping a component by under-budgeting its Sequence | Each registered component has a `defaultDurationInFrames` for its natural length, and `add_asset` applies it. `check_scene` warns `layer_cut_off` when a layer runs past the composition. Don't shorten `durationInFrames` below the component's natural length. |
| Wrong canvas size | **remocn components are laid out for 1280×720.** This project defaults to 1920×1080, which is what most Remotion Elements here are built for. When remocn components arrive, give them a 1280×720 box and scale the layer by 1.5, like the fixed 1920×1080 Elements. |
| Animating layout properties | The scene layer positions each component with `transform` (rotate, scale) on an absolutely placed box. Keyframe `baseX`/`baseY`/`scale`, not a component's `width`/`height`. Changing the box size every frame reflows fixed-layout Elements. |
| Non-deterministic code | Never use `Math.random()`, timers or `Date.now()` in a component; use `random(seed)` from `remotion` or `@remotion/random`. Check pasted source for these before registering it. |
| Loading fonts mid-render | Components call `loadFont()` at module level. The Elements registered so far all do. |
| Hardcoding a background on a component | remocn components are transparent. Some Remotion Elements here **do** own a background (YouTube End Card, Social Safe Zones, Picture in Picture), and their notes say so. Put those at the bottom of a beat, or accept that they cover what's below. |
| Transitions mounted as components | remocn transitions are `@remotion/transitions` presentations, not layers. The scene tree has no `TransitionSeries` yet, so once they're pasted in they need a transition slot between beats. Until then, use cuts, fades and the reveal Elements (Shine, Tear, Picture in Picture). |
| `willChange` on the wrong layer under a slow zoom | One `willChange: transform` per text container, never per word or character. It matters for slow `scale` keyframes on text layers. |

## Gaps: remocn components not in the catalog

**Now registered:** `backdrop`, `drift`, `stage` (with `scene-motion`), `chat-to-preview-layout`, `inline-word-roll`, `soft-blur-in`, `type-fossil`, `shader-text-reveal`, `per-character-rise`, `bottom-up-letters`, `top-down-letters`, `spring-scale-in`, `micro-scale-fade`, `scale-down-fade`, `blur-out-up`, `focus-blur-resolve`, `line-by-line-slide`, `per-word-crossfade`, `word-stream`, `word-push`, `sheen-slide-in`, `squeeze-in`, `fog-rise`, `caret-swap`, `zoom-words`, `centered-word-build`, `inline-pill-takeover`, `typed-split-wipe`, `shadow-sweep-text`, `outline-fill-track-text`, `gradient-scale-cut-text`, `rush-type`, `fade-through`, `shared-axis-y`, `shared-axis-z`, `strikethrough-replace`, `short-slide-right`, `kinetic-center-build`, `kinetic-morph-text`, `kinetic-warp`, `staggered-fade-up`, `mask-reveal-up`, `tracking-in`, `inline-highlight`, `marker-highlight`, `ink-underline` (with `brush` + `stop-motion`), `rolling-number`, `rolodex-flip`, `value-swap`, `infinite-marquee`, `perspective-marquee`, `matrix-decode`, `rgb-glitch-text`, `gooey-morph`, `perspective-squeeze`, `extrude-pop`, `chromatic-wave`, `stretch-in`, `search-reveal`, `glass-code-block`, `glass-code-walk`, `terminal-simulator`, `terminal-cursor-zoom`, `animated-line-chart`, `animated-bar-chart`, `paper-sticker`, `polaroid`, `check-list` (both with `handwrite`), `reel`, `claude-chat`, `chat-gpt`, `v0`, `claude-code` and `opencode` (with `caret` + the `remocn-ui` core lib), and the transitions `grain-dissolve`, `wave-wipe`, `shader-seam`, `shader-spiral-pass`, `ripple-zoom`, `warp-dissolve`, `swirl-dissolve`, `dither-dissolve`, `perlin-dissolve`, `smoke-dissolve`, `whip-pan`, `push-through`, `focus-pull` and `zoom-blur` (as transition layers wrapping `from`/`to`), as `remocn_*` catalog ids. To add more, paste a remocn page and its source is fetched from `https://remocn.dev/r/<name>.json`.

These guides name remocn components that aren't registered here. They install with `npx shadcn add @remocn/<name>`, which copies their source into a project. Once you have the source, paste it in like the Remotion Elements, and it goes through `write_component_file` and `register_component`.

| remocn component | What it does in the guides | Stand-in here |
|---|---|---|
| `shader-simplex-noise` | A quiet noise field behind the whole video | Liquid Contours or Moving Waves |
| `shader-swirl` | The swirl cover at the teaser's name reveal | Shine or Tear |
| ~~`line-by-line-slide`~~ | Value claims stacking line by line | **Now registered** as `remocn_line_by_line_slide` |
| ~~Terminal~~ **now registered** (`remocn_terminal_simulator`, `remocn_terminal_cursor_zoom`); remocn text animations mostly registered too | Self-typing command line, varied reel motion | See the rows above |
| ~~`short-slide-right`, `kinetic-center-build`, `scale-down-fade`~~ **all now registered** | Launch-video text entrances | Keyframed `text_card` scale, position and opacity; word-by-word captions |
| `color-panels`, `warp`, `mesh-gradient`, `voronoi`, `metaballs`, `god-rays` | The six montage backgrounds | The six background Elements listed in the Launch video recipe |
| `shader-smoke-ring`, dithering cover | The outro bloom, and the transitions between beats | None yet; the plan uses plain cuts and fades |

**Style from the guides:** a warm dark background (#141318), off-white text, one accent colour and the Manrope font. Manrope isn't loaded in the catalog yet, so `text_card` falls back to its sans font.
