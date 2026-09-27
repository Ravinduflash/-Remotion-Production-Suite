# Video recipes

These are storyboards for six common product videos. Each beat is mapped to components already in this studio's catalog, so an agent can build the timeline through MCP.

The structure comes from the remocn.dev guides, linked in each section. Those guides assume remocn's own components, which this project does not have yet; see [Gaps](#gaps-remocn-components-not-in-the-catalog). The summaries here are my own. Read the originals for their full prompts and directing tips.

All timings are at 30 fps and 1920×1080 (`set_aspect 16:9`). Put a background layer at the bottom of every recipe.

## Shared building blocks

| Need | Catalog id | Notes |
|---|---|---|
| Quiet moving background | `community_liquid_contours`, `community_moving_waves`, `community_paper_texture` | These stand in for remocn's `shader-simplex-noise`. Paper Texture suits dark text. |
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

## Gaps: remocn components not in the catalog

These guides name remocn components that aren't registered here. They install with `npx shadcn add @remocn/<name>`, which copies their source into a project. Once you have the source, paste it in like the Remotion Elements, and it goes through `write_component_file` and `register_component`.

| remocn component | What it does in the guides | Stand-in here |
|---|---|---|
| `shader-simplex-noise` | A quiet noise field behind the whole video | Liquid Contours or Moving Waves |
| `shader-swirl` | The swirl cover at the teaser's name reveal | Shine or Tear |
| `line-by-line-slide` | Value claims stacking line by line | Staggered `text_card`s |
| Terminal, and remocn's text animations | Self-typing command line, varied reel motion | `community_typewriter`, keyframed `text_card`s |
| `scale-down-fade`, `short-slide-right`, `kinetic-center-build` | Launch-video text entrances | Keyframed `text_card` scale, position and opacity; word-by-word captions |
| `color-panels`, `warp`, `mesh-gradient`, `voronoi`, `metaballs`, `god-rays` | The six montage backgrounds | The six background Elements listed in the Launch video recipe |
| `shader-smoke-ring`, dithering cover | The outro bloom, and the transitions between beats | None yet; the plan uses plain cuts and fades |

**Style from the guides:** a warm dark background (#141318), off-white text, one accent colour and the Manrope font. Manrope isn't loaded in the catalog yet, so `text_card` falls back to its sans font.
