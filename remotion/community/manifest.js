/* =====================================================================
   COMMUNITY COMPONENT MANIFEST
   Registers third-party / hand-pasted Remotion components as catalog assets.
   The studio loads this file at start-up; the MCP tool `register_component {persist:true}`
   appends to it. Entries are pure JSON (the array below is parsed by the MCP server).

   Workflow for a component you found online:
     1. Save its code as remotion/community/<Name>.tsx  (or MCP: write_component_file)
     2. Add an entry here (or MCP: register_component) describing its props
     3. It appears under Catalog → Community, and exports import it from './remotion/community/<Name>'

   Entry fields:
     id            unique catalog id
     componentName React export name (also the file name by default)
     name, desc, icon
     external      { importPath: './community/<Name>' | 'npm-package', exportName: '<Name>' | 'default',
                     package?: 'npm-package', sizeMode: 'style' | 'props' | 'none', omitProps?: [...] }
     defaults      { baseX, baseY, scale, rotation, opacity, customProperties: {...props} }
     controls      inspector schema [{ group, items:[{ key, label, kind: range|number|text|color|select|checkbox|numlist, min, max, step, options }] }]
     preview       { kind: 'card' | 'text' | 'image' | 'video' | 'audio' | 'shape', shape? }
   ===================================================================== */
window.CommunityManifest = [
  {
    "id": "community_typewriter",
    "componentName": "TypewriterText",
    "name": "Typewriter Text",
    "desc": "community-style text reveal • useCurrentFrame()",
    "icon": "⌨️",
    "external": {
      "importPath": "./community/TypewriterText",
      "exportName": "TypewriterText",
      "sizeMode": "style"
    },
    "defaults": {
      "baseX": 200,
      "baseY": 400,
      "customProperties": {
        "text": "Hello from a community component",
        "charsPerFrame": 0.6,
        "fontSize": 56,
        "color": "#e8e8ef",
        "cursorColor": "#30d158",
        "width": 1400,
        "height": 140
      }
    },
    "controls": [
      {
        "group": "Typewriter",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text"
          },
          {
            "key": "charsPerFrame",
            "label": "CHARS / FRAME",
            "kind": "range",
            "min": 0.1,
            "max": 3,
            "step": 0.1
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "min": 12,
            "max": 200,
            "step": 1
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color"
          },
          {
            "key": "cursorColor",
            "label": "CURSOR",
            "kind": "color"
          },
          {
            "key": "width",
            "label": "WIDTH",
            "kind": "range",
            "min": 100,
            "max": 3840,
            "step": 1
          },
          {
            "key": "height",
            "label": "HEIGHT",
            "kind": "range",
            "min": 40,
            "max": 1080,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "text"
    }
  },
  {
    "id": "community_audio_oscilloscope",
    "componentName": "AudioOscilloscope",
    "name": "Audio Oscilloscope",
    "desc": "Remotion Elements • live waveform of an audio track, suits speech",
    "icon": "〰️",
    "external": {
      "importPath": "./community/AudioOscilloscope",
      "exportName": "AudioOscilloscope",
      "packages": [
        "@remotion/media",
        "@remotion/media-utils"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 90,
      "baseY": 390,
      "customProperties": {
        "audioSrc": "https://remotion.media/elements/remotion-made-this-picture-move.mp3",
        "lineColor": "#2563eb",
        "lineWidth": 6,
        "amplitude": 2,
        "windowInSeconds": 0.35,
        "width": 900,
        "height": 300
      }
    },
    "controls": [
      {
        "group": "Oscilloscope",
        "items": [
          {
            "key": "audioSrc",
            "label": "AUDIO SRC (URL / staticFile)",
            "kind": "text"
          },
          {
            "key": "lineColor",
            "label": "WAVEFORM COLOR",
            "kind": "color"
          },
          {
            "key": "lineWidth",
            "label": "LINE WIDTH",
            "kind": "range",
            "min": 1,
            "max": 16,
            "step": 1
          },
          {
            "key": "amplitude",
            "label": "AMPLITUDE",
            "kind": "range",
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "windowInSeconds",
            "label": "TIME WINDOW (s)",
            "kind": "range",
            "min": 0.05,
            "max": 1,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "waveform"
    }
  },
  {
    "id": "community_voice_note",
    "componentName": "AudioWaveformProgress",
    "name": "Voice Note",
    "desc": "Remotion Elements • static waveform bars with playback progress",
    "icon": "🎙️",
    "external": {
      "importPath": "./community/AudioWaveformProgress",
      "exportName": "AudioWaveformProgress",
      "packages": [
        "@remotion/media",
        "@remotion/media-utils"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 510,
      "baseY": 390,
      "customProperties": {
        "audioSrc": "https://remotion.media/elements/remotion-made-this-picture-move.mp3",
        "playedColor": "#2563eb",
        "unplayedColor": "#cbd5e1",
        "numberOfBars": 64,
        "barGap": 5,
        "amplitude": 1,
        "durationInFrames": 271,
        "width": 900,
        "height": 300
      }
    },
    "controls": [
      {
        "group": "Voice Note",
        "items": [
          {
            "key": "audioSrc",
            "label": "AUDIO SRC (URL / staticFile)",
            "kind": "text"
          },
          {
            "key": "playedColor",
            "label": "PLAYED COLOR",
            "kind": "color"
          },
          {
            "key": "unplayedColor",
            "label": "UNPLAYED COLOR",
            "kind": "color"
          },
          {
            "key": "amplitude",
            "label": "AMPLITUDE",
            "kind": "range",
            "min": 0.25,
            "max": 2,
            "step": 0.05
          }
        ]
      },
      {
        "group": "Layout (not keyframable)",
        "items": [
          {
            "key": "numberOfBars",
            "label": "NUMBER OF BARS",
            "kind": "range",
            "min": 12,
            "max": 96,
            "step": 1,
            "keyframable": false
          },
          {
            "key": "barGap",
            "label": "BAR GAP",
            "kind": "range",
            "min": 0,
            "max": 8,
            "step": 1,
            "keyframable": false
          },
          {
            "key": "durationInFrames",
            "label": "CLIP LENGTH (frames) • progress 0→100%",
            "kind": "number",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "bars"
    }
  },
  {
    "id": "community_mirrored_spectrum",
    "componentName": "MirroredAudioSpectrum",
    "name": "Mirrored Spectrum",
    "desc": "Remotion Elements • live frequency bars mirrored from the centre, music or speech",
    "icon": "📶",
    "external": {
      "importPath": "./community/MirroredAudioSpectrum",
      "exportName": "MirroredAudioSpectrum",
      "packages": [
        "@remotion/media",
        "@remotion/media-utils"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 510,
      "baseY": 390,
      "customProperties": {
        "audioSrc": "https://remotion.media/elements/remotion-made-this-picture-move.mp3",
        "barColor": "#2563eb",
        "sensitivity": 1.5,
        "numberOfBars": 65,
        "width": 900,
        "height": 300
      }
    },
    "controls": [
      {
        "group": "Mirrored Spectrum",
        "items": [
          {
            "key": "audioSrc",
            "label": "AUDIO SRC (URL / staticFile)",
            "kind": "text"
          },
          {
            "key": "barColor",
            "label": "BAR COLOR",
            "kind": "color"
          },
          {
            "key": "sensitivity",
            "label": "SENSITIVITY",
            "kind": "range",
            "min": 0.25,
            "max": 3,
            "step": 0.05
          }
        ]
      },
      {
        "group": "Layout (not keyframable)",
        "items": [
          {
            "key": "numberOfBars",
            "label": "NUMBER OF BARS (odd = centre bar)",
            "kind": "range",
            "min": 3,
            "max": 127,
            "step": 2,
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "spectrum"
    }
  },
  {
    "id": "community_notebook_paper",
    "componentName": "NotebookPaper",
    "name": "Notebook Paper",
    "desc": "Remotion Elements • white paper texture with blue gridlines, full frame",
    "icon": "📓",
    "external": {
      "importPath": "./community/NotebookPaper",
      "exportName": "NotebookPaper",
      "packages": [
        "@remotion/effects"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "gridSize": 54,
        "lineWidth": 3.4,
        "lineColor": "rgba(76, 101, 128, 0.16)"
      }
    },
    "controls": [
      {
        "group": "Notebook Paper • fixed look, no props (sizes itself to the composition)",
        "items": []
      }
    ],
    "preview": {
      "kind": "paper"
    },
    "fullFrame": true
  },
  {
    "id": "community_paper_texture",
    "componentName": "PaperTexture",
    "name": "Paper Texture",
    "desc": "Remotion Elements • animated white paper grain, full frame, re-seeds 30× over 120 frames",
    "icon": "📄",
    "external": {
      "importPath": "./community/PaperTexture",
      "exportName": "PaperTexture",
      "packages": [
        "@remotion/effects"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "gridSize": 0
      }
    },
    "controls": [
      {
        "group": "Paper Texture • fixed look, no props (sizes itself to the composition)",
        "items": []
      }
    ],
    "preview": {
      "kind": "paper"
    },
    "fullFrame": true
  },
  {
    "id": "community_rotating_starburst",
    "componentName": "RotatingStarburst",
    "name": "Rotating Starburst",
    "desc": "Remotion Elements • light-blue 28-ray starburst, 360° per 2000 frames, full frame",
    "icon": "✴️",
    "external": {
      "importPath": "./community/RotatingStarburst",
      "exportName": "RotatingStarburst",
      "packages": [
        "@remotion/effects"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "rays": 28,
        "colors": [
          "#dff4ff",
          "#7cc6ff"
        ],
        "color": "#dff4ff",
        "originX": 0.5,
        "originY": 0.5,
        "rotationPerFrame": 0.18
      }
    },
    "controls": [
      {
        "group": "Rotating Starburst • fixed look, no props (sizes itself to the composition)",
        "items": []
      }
    ],
    "preview": {
      "kind": "starburst"
    },
    "fullFrame": true
  },
  {
    "id": "community_moving_waves",
    "componentName": "MovingWaves",
    "name": "Moving Waves",
    "desc": "Remotion Elements • light-blue wave bands flowing upward, loops once per composition",
    "icon": "🌊",
    "external": {
      "importPath": "./community/MovingWaves",
      "exportName": "MovingWaves",
      "packages": [
        "@remotion/effects"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "colors": [
          "#dff4ff",
          "#7cc6ff"
        ],
        "thickness": 56,
        "amplitude": 24,
        "wavelength": 160,
        "loopDistance": 448
      }
    },
    "controls": [
      {
        "group": "Moving Waves • fixed look, no props (sizes itself to the composition)",
        "items": []
      }
    ],
    "preview": {
      "kind": "bands",
      "style": "waves"
    },
    "fullFrame": true
  },
  {
    "id": "community_moving_zigzags",
    "componentName": "MovingZigzags",
    "name": "Moving Zigzags",
    "desc": "Remotion Elements • light-blue zigzag bands flowing upward, loops once per composition",
    "icon": "〽️",
    "external": {
      "importPath": "./community/MovingZigzags",
      "exportName": "MovingZigzags",
      "packages": [
        "@remotion/effects"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "colors": [
          "#dff4ff",
          "#7cc6ff"
        ],
        "thickness": 40,
        "amplitude": 40,
        "wavelength": 160,
        "loopDistance": 480
      }
    },
    "controls": [
      {
        "group": "Moving Zigzags • fixed look, no props (sizes itself to the composition)",
        "items": []
      }
    ],
    "preview": {
      "kind": "bands",
      "style": "zigzag"
    },
    "fullFrame": true
  },
  {
    "id": "community_liquid_contours",
    "componentName": "LiquidContours",
    "name": "Liquid Contours",
    "desc": "Remotion Elements • two-colour liquid contour bands, slow phase drift",
    "icon": "💧",
    "external": {
      "importPath": "./community/LiquidContours",
      "exportName": "LiquidContours",
      "packages": [
        "@remotion/effects"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "colors": [
          "#dff4ff",
          "#7cc6ff"
        ],
        "phaseStart": 3.23,
        "phaseEnd": 4.23,
        "phaseFrames": 240
      }
    },
    "controls": [
      {
        "group": "Liquid Contours • fixed look, no props (sizes itself to the composition)",
        "items": []
      }
    ],
    "preview": {
      "kind": "bands",
      "style": "contours"
    },
    "fullFrame": true
  },
  {
    "id": "community_basic_captions",
    "componentName": "BasicCaptions",
    "name": "Basic Captions",
    "desc": "Remotion Elements • white text on translucent grey, synced to Caption[]",
    "icon": "💬",
    "external": {
      "importPath": "./community/BasicCaptions",
      "exportName": "BasicCaptions",
      "packages": [
        "@remotion/captions"
      ],
      "sizeMode": "props"
    },
    "defaults": {
      "baseX": 510,
      "baseY": 780,
      "customProperties": {
        "captions": [
          {
            "text": "Every",
            "startMs": 0,
            "endMs": 400,
            "timestampMs": 200,
            "confidence": 1
          },
          {
            "text": " story",
            "startMs": 400,
            "endMs": 800,
            "timestampMs": 600,
            "confidence": 1
          },
          {
            "text": " starts",
            "startMs": 800,
            "endMs": 1200,
            "timestampMs": 1000,
            "confidence": 1
          },
          {
            "text": " with",
            "startMs": 1200,
            "endMs": 1600,
            "timestampMs": 1400,
            "confidence": 1
          },
          {
            "text": " a",
            "startMs": 1600,
            "endMs": 2000,
            "timestampMs": 1800,
            "confidence": 1
          },
          {
            "text": " single",
            "startMs": 2000,
            "endMs": 2400,
            "timestampMs": 2200,
            "confidence": 1
          },
          {
            "text": " frame.",
            "startMs": 2400,
            "endMs": 2800,
            "timestampMs": 2600,
            "confidence": 1
          },
          {
            "text": " Build",
            "startMs": 3050,
            "endMs": 3450,
            "timestampMs": 3250,
            "confidence": 1
          },
          {
            "text": " it",
            "startMs": 3450,
            "endMs": 3850,
            "timestampMs": 3650,
            "confidence": 1
          },
          {
            "text": " with",
            "startMs": 3850,
            "endMs": 4250,
            "timestampMs": 4050,
            "confidence": 1
          },
          {
            "text": " the",
            "startMs": 4250,
            "endMs": 4650,
            "timestampMs": 4450,
            "confidence": 1
          },
          {
            "text": " Remotion",
            "startMs": 4650,
            "endMs": 5050,
            "timestampMs": 4850,
            "confidence": 1
          },
          {
            "text": " Production",
            "startMs": 5050,
            "endMs": 5450,
            "timestampMs": 5250,
            "confidence": 1
          },
          {
            "text": " Suite.",
            "startMs": 5450,
            "endMs": 5850,
            "timestampMs": 5650,
            "confidence": 1
          }
        ],
        "combineTokensWithinMilliseconds": 2000,
        "width": 900,
        "height": 220
      }
    },
    "controls": [
      {
        "group": "Captions",
        "items": [
          {
            "key": "captions",
            "label": "CAPTIONS (Caption[] JSON — use build_captions)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "combineTokensWithinMilliseconds",
            "label": "TIME BETWEEN PAGES (ms)",
            "kind": "range",
            "min": 0,
            "max": 5000,
            "step": 50
          }
        ]
      },
      {
        "group": "Caption area",
        "items": [
          {
            "key": "width",
            "label": "WIDTH",
            "kind": "range",
            "min": 100,
            "max": 1920,
            "step": 1
          },
          {
            "key": "height",
            "label": "HEIGHT",
            "kind": "range",
            "min": 40,
            "max": 1080,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "captions",
      "style": "basic"
    }
  },
  {
    "id": "community_rounded_captions",
    "componentName": "RoundedCaptions",
    "name": "Rounded Captions",
    "desc": "Remotion Elements • multi-line text in a rounded SVG box, Figtree font",
    "icon": "🗨️",
    "external": {
      "importPath": "./community/RoundedCaptions",
      "exportName": "RoundedCaptions",
      "packages": [
        "@remotion/captions",
        "@remotion/google-fonts",
        "@remotion/layout-utils",
        "@remotion/rounded-text-box"
      ],
      "sizeMode": "props"
    },
    "defaults": {
      "baseX": 510,
      "baseY": 780,
      "customProperties": {
        "captions": [
          {
            "text": "Every",
            "startMs": 0,
            "endMs": 400,
            "timestampMs": 200,
            "confidence": 1
          },
          {
            "text": " story",
            "startMs": 400,
            "endMs": 800,
            "timestampMs": 600,
            "confidence": 1
          },
          {
            "text": " starts",
            "startMs": 800,
            "endMs": 1200,
            "timestampMs": 1000,
            "confidence": 1
          },
          {
            "text": " with",
            "startMs": 1200,
            "endMs": 1600,
            "timestampMs": 1400,
            "confidence": 1
          },
          {
            "text": " a",
            "startMs": 1600,
            "endMs": 2000,
            "timestampMs": 1800,
            "confidence": 1
          },
          {
            "text": " single",
            "startMs": 2000,
            "endMs": 2400,
            "timestampMs": 2200,
            "confidence": 1
          },
          {
            "text": " frame.",
            "startMs": 2400,
            "endMs": 2800,
            "timestampMs": 2600,
            "confidence": 1
          },
          {
            "text": " Build",
            "startMs": 3050,
            "endMs": 3450,
            "timestampMs": 3250,
            "confidence": 1
          },
          {
            "text": " it",
            "startMs": 3450,
            "endMs": 3850,
            "timestampMs": 3650,
            "confidence": 1
          },
          {
            "text": " with",
            "startMs": 3850,
            "endMs": 4250,
            "timestampMs": 4050,
            "confidence": 1
          },
          {
            "text": " the",
            "startMs": 4250,
            "endMs": 4650,
            "timestampMs": 4450,
            "confidence": 1
          },
          {
            "text": " Remotion",
            "startMs": 4650,
            "endMs": 5050,
            "timestampMs": 4850,
            "confidence": 1
          },
          {
            "text": " Production",
            "startMs": 5050,
            "endMs": 5450,
            "timestampMs": 5250,
            "confidence": 1
          },
          {
            "text": " Suite.",
            "startMs": 5450,
            "endMs": 5850,
            "timestampMs": 5650,
            "confidence": 1
          }
        ],
        "combineTokensWithinMilliseconds": 2000,
        "width": 900,
        "height": 220
      }
    },
    "controls": [
      {
        "group": "Captions",
        "items": [
          {
            "key": "captions",
            "label": "CAPTIONS (Caption[] JSON — use build_captions)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "combineTokensWithinMilliseconds",
            "label": "TIME BETWEEN PAGES (ms)",
            "kind": "range",
            "min": 0,
            "max": 5000,
            "step": 50
          }
        ]
      },
      {
        "group": "Caption area",
        "items": [
          {
            "key": "width",
            "label": "WIDTH",
            "kind": "range",
            "min": 100,
            "max": 1920,
            "step": 1
          },
          {
            "key": "height",
            "label": "HEIGHT",
            "kind": "range",
            "min": 40,
            "max": 1080,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "captions",
      "style": "rounded"
    }
  },
  {
    "id": "community_moving_pill_captions",
    "componentName": "MovingPillCaptions",
    "name": "Moving Pill Captions",
    "desc": "Remotion Elements • word-by-word pill that glides to the spoken word",
    "icon": "💊",
    "external": {
      "importPath": "./community/MovingPillCaptions",
      "exportName": "MovingPillCaptions",
      "packages": [
        "@remotion/captions",
        "@remotion/google-fonts",
        "@remotion/layout-utils"
      ],
      "sizeMode": "props"
    },
    "defaults": {
      "baseX": 619,
      "baseY": 780,
      "customProperties": {
        "captions": [
          {
            "text": "Every",
            "startMs": 0,
            "endMs": 400,
            "timestampMs": 200,
            "confidence": 1
          },
          {
            "text": " story",
            "startMs": 400,
            "endMs": 800,
            "timestampMs": 600,
            "confidence": 1
          },
          {
            "text": " starts",
            "startMs": 800,
            "endMs": 1200,
            "timestampMs": 1000,
            "confidence": 1
          },
          {
            "text": " with",
            "startMs": 1200,
            "endMs": 1600,
            "timestampMs": 1400,
            "confidence": 1
          },
          {
            "text": " a",
            "startMs": 1600,
            "endMs": 2000,
            "timestampMs": 1800,
            "confidence": 1
          },
          {
            "text": " single",
            "startMs": 2000,
            "endMs": 2400,
            "timestampMs": 2200,
            "confidence": 1
          },
          {
            "text": " frame.",
            "startMs": 2400,
            "endMs": 2800,
            "timestampMs": 2600,
            "confidence": 1
          },
          {
            "text": " Build",
            "startMs": 3050,
            "endMs": 3450,
            "timestampMs": 3250,
            "confidence": 1
          },
          {
            "text": " it",
            "startMs": 3450,
            "endMs": 3850,
            "timestampMs": 3650,
            "confidence": 1
          },
          {
            "text": " with",
            "startMs": 3850,
            "endMs": 4250,
            "timestampMs": 4050,
            "confidence": 1
          },
          {
            "text": " the",
            "startMs": 4250,
            "endMs": 4650,
            "timestampMs": 4450,
            "confidence": 1
          },
          {
            "text": " Remotion",
            "startMs": 4650,
            "endMs": 5050,
            "timestampMs": 4850,
            "confidence": 1
          },
          {
            "text": " Production",
            "startMs": 5050,
            "endMs": 5450,
            "timestampMs": 5250,
            "confidence": 1
          },
          {
            "text": " Suite.",
            "startMs": 5450,
            "endMs": 5850,
            "timestampMs": 5650,
            "confidence": 1
          }
        ],
        "combineTokensWithinMilliseconds": 800,
        "width": 682,
        "height": 252
      }
    },
    "controls": [
      {
        "group": "Captions",
        "items": [
          {
            "key": "captions",
            "label": "CAPTIONS (Caption[] JSON — use build_captions)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "combineTokensWithinMilliseconds",
            "label": "TIME BETWEEN PAGES (ms)",
            "kind": "range",
            "min": 0,
            "max": 5000,
            "step": 50
          }
        ]
      },
      {
        "group": "Caption area",
        "items": [
          {
            "key": "width",
            "label": "WIDTH",
            "kind": "range",
            "min": 100,
            "max": 1920,
            "step": 1
          },
          {
            "key": "height",
            "label": "HEIGHT",
            "kind": "range",
            "min": 40,
            "max": 1080,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "captions",
      "style": "pill"
    }
  },
  {
    "id": "community_popping_word_captions",
    "componentName": "PoppingWordCaptions",
    "name": "Popping Word Captions",
    "desc": "Remotion Elements • spoken word turns blue and pops 3% larger",
    "icon": "🫧",
    "external": {
      "importPath": "./community/PoppingWordCaptions",
      "exportName": "PoppingWordCaptions",
      "packages": [
        "@remotion/captions",
        "@remotion/google-fonts",
        "@remotion/layout-utils"
      ],
      "sizeMode": "props"
    },
    "defaults": {
      "baseX": 619,
      "baseY": 780,
      "customProperties": {
        "captions": [
          {
            "text": "Every",
            "startMs": 0,
            "endMs": 400,
            "timestampMs": 200,
            "confidence": 1
          },
          {
            "text": " story",
            "startMs": 400,
            "endMs": 800,
            "timestampMs": 600,
            "confidence": 1
          },
          {
            "text": " starts",
            "startMs": 800,
            "endMs": 1200,
            "timestampMs": 1000,
            "confidence": 1
          },
          {
            "text": " with",
            "startMs": 1200,
            "endMs": 1600,
            "timestampMs": 1400,
            "confidence": 1
          },
          {
            "text": " a",
            "startMs": 1600,
            "endMs": 2000,
            "timestampMs": 1800,
            "confidence": 1
          },
          {
            "text": " single",
            "startMs": 2000,
            "endMs": 2400,
            "timestampMs": 2200,
            "confidence": 1
          },
          {
            "text": " frame.",
            "startMs": 2400,
            "endMs": 2800,
            "timestampMs": 2600,
            "confidence": 1
          },
          {
            "text": " Build",
            "startMs": 3050,
            "endMs": 3450,
            "timestampMs": 3250,
            "confidence": 1
          },
          {
            "text": " it",
            "startMs": 3450,
            "endMs": 3850,
            "timestampMs": 3650,
            "confidence": 1
          },
          {
            "text": " with",
            "startMs": 3850,
            "endMs": 4250,
            "timestampMs": 4050,
            "confidence": 1
          },
          {
            "text": " the",
            "startMs": 4250,
            "endMs": 4650,
            "timestampMs": 4450,
            "confidence": 1
          },
          {
            "text": " Remotion",
            "startMs": 4650,
            "endMs": 5050,
            "timestampMs": 4850,
            "confidence": 1
          },
          {
            "text": " Production",
            "startMs": 5050,
            "endMs": 5450,
            "timestampMs": 5250,
            "confidence": 1
          },
          {
            "text": " Suite.",
            "startMs": 5450,
            "endMs": 5850,
            "timestampMs": 5650,
            "confidence": 1
          }
        ],
        "combineTokensWithinMilliseconds": 800,
        "width": 682,
        "height": 252
      }
    },
    "controls": [
      {
        "group": "Captions",
        "items": [
          {
            "key": "captions",
            "label": "CAPTIONS (Caption[] JSON — use build_captions)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "combineTokensWithinMilliseconds",
            "label": "TIME BETWEEN PAGES (ms)",
            "kind": "range",
            "min": 0,
            "max": 5000,
            "step": 50
          }
        ]
      },
      {
        "group": "Caption area",
        "items": [
          {
            "key": "width",
            "label": "WIDTH",
            "kind": "range",
            "min": 100,
            "max": 1920,
            "step": 1
          },
          {
            "key": "height",
            "label": "HEIGHT",
            "kind": "range",
            "min": 40,
            "max": 1080,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "captions",
      "style": "pop"
    }
  },
  {
    "id": "community_word_highlight_captions",
    "componentName": "WordHighlightCaptions",
    "name": "Word Highlight Captions",
    "desc": "Remotion Elements • spoken word turns blue, no motion",
    "icon": "🖍️",
    "external": {
      "importPath": "./community/WordHighlightCaptions",
      "exportName": "WordHighlightCaptions",
      "packages": [
        "@remotion/captions",
        "@remotion/google-fonts",
        "@remotion/layout-utils"
      ],
      "sizeMode": "props"
    },
    "defaults": {
      "baseX": 619,
      "baseY": 780,
      "customProperties": {
        "captions": [
          {
            "text": "Every",
            "startMs": 0,
            "endMs": 400,
            "timestampMs": 200,
            "confidence": 1
          },
          {
            "text": " story",
            "startMs": 400,
            "endMs": 800,
            "timestampMs": 600,
            "confidence": 1
          },
          {
            "text": " starts",
            "startMs": 800,
            "endMs": 1200,
            "timestampMs": 1000,
            "confidence": 1
          },
          {
            "text": " with",
            "startMs": 1200,
            "endMs": 1600,
            "timestampMs": 1400,
            "confidence": 1
          },
          {
            "text": " a",
            "startMs": 1600,
            "endMs": 2000,
            "timestampMs": 1800,
            "confidence": 1
          },
          {
            "text": " single",
            "startMs": 2000,
            "endMs": 2400,
            "timestampMs": 2200,
            "confidence": 1
          },
          {
            "text": " frame.",
            "startMs": 2400,
            "endMs": 2800,
            "timestampMs": 2600,
            "confidence": 1
          },
          {
            "text": " Build",
            "startMs": 3050,
            "endMs": 3450,
            "timestampMs": 3250,
            "confidence": 1
          },
          {
            "text": " it",
            "startMs": 3450,
            "endMs": 3850,
            "timestampMs": 3650,
            "confidence": 1
          },
          {
            "text": " with",
            "startMs": 3850,
            "endMs": 4250,
            "timestampMs": 4050,
            "confidence": 1
          },
          {
            "text": " the",
            "startMs": 4250,
            "endMs": 4650,
            "timestampMs": 4450,
            "confidence": 1
          },
          {
            "text": " Remotion",
            "startMs": 4650,
            "endMs": 5050,
            "timestampMs": 4850,
            "confidence": 1
          },
          {
            "text": " Production",
            "startMs": 5050,
            "endMs": 5450,
            "timestampMs": 5250,
            "confidence": 1
          },
          {
            "text": " Suite.",
            "startMs": 5450,
            "endMs": 5850,
            "timestampMs": 5650,
            "confidence": 1
          }
        ],
        "combineTokensWithinMilliseconds": 800,
        "width": 682,
        "height": 252
      }
    },
    "controls": [
      {
        "group": "Captions",
        "items": [
          {
            "key": "captions",
            "label": "CAPTIONS (Caption[] JSON — use build_captions)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "combineTokensWithinMilliseconds",
            "label": "TIME BETWEEN PAGES (ms)",
            "kind": "range",
            "min": 0,
            "max": 5000,
            "step": 50
          }
        ]
      },
      {
        "group": "Caption area",
        "items": [
          {
            "key": "width",
            "label": "WIDTH",
            "kind": "range",
            "min": 100,
            "max": 1920,
            "step": 1
          },
          {
            "key": "height",
            "label": "HEIGHT",
            "kind": "range",
            "min": 40,
            "max": 1080,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "captions",
      "style": "highlight"
    }
  },
  {
    "id": "community_horizontal_bar_chart",
    "componentName": "HorizontalBarChart",
    "name": "Horizontal Bar Chart",
    "desc": "Remotion Elements • 3 labelled bars wipe in (~65 frames), light card",
    "icon": "📊",
    "external": {
      "importPath": "./community/HorizontalBarChart",
      "exportName": "HorizontalBarChart",
      "packages": [
        "@remotion/google-fonts"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080
      }
    },
    "controls": [
      {
        "group": "Horizontal Bar Chart • data is hard-coded in the source; animation starts at the layer's start frame",
        "items": [
          {
            "key": "width",
            "label": "BOX WIDTH",
            "kind": "range",
            "min": 100,
            "max": 3840,
            "step": 1
          },
          {
            "key": "height",
            "label": "BOX HEIGHT",
            "kind": "range",
            "min": 60,
            "max": 2160,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "hbars"
    },
    "fullFrame": true
  },
  {
    "id": "community_line_chart",
    "componentName": "LineChart",
    "name": "Line Chart",
    "desc": "Remotion Elements • trend line draws in, dots pop, 74K badge (~70 frames)",
    "icon": "📈",
    "external": {
      "importPath": "./community/LineChart",
      "exportName": "LineChart",
      "packages": [
        "@remotion/google-fonts"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080
      }
    },
    "controls": [
      {
        "group": "Line Chart • data is hard-coded in the source; animation starts at the layer's start frame",
        "items": [
          {
            "key": "width",
            "label": "BOX WIDTH",
            "kind": "range",
            "min": 100,
            "max": 3840,
            "step": 1
          },
          {
            "key": "height",
            "label": "BOX HEIGHT",
            "kind": "range",
            "min": 60,
            "max": 2160,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "linechart"
    },
    "fullFrame": true
  },
  {
    "id": "community_number_counter",
    "componentName": "NumberCounter",
    "name": "Number Counter",
    "desc": "Remotion Elements • counts 0 → 24,813 over 90 frames, dark text",
    "icon": "🔢",
    "external": {
      "importPath": "./community/NumberCounter",
      "exportName": "NumberCounter",
      "packages": [
        "@remotion/google-fonts"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 460,
      "baseY": 410,
      "customProperties": {
        "width": 1000,
        "height": 260
      }
    },
    "controls": [
      {
        "group": "Number Counter • data is hard-coded in the source; animation starts at the layer's start frame",
        "items": [
          {
            "key": "width",
            "label": "BOX WIDTH",
            "kind": "range",
            "min": 100,
            "max": 3840,
            "step": 1
          },
          {
            "key": "height",
            "label": "BOX HEIGHT",
            "kind": "range",
            "min": 60,
            "max": 2160,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "numcounter"
    },
    "fullFrame": false
  },
  {
    "id": "community_pie_chart",
    "componentName": "PieChart",
    "name": "Pie Chart",
    "desc": "Remotion Elements • 4-slice pie sweeps in with a labelled legend (~60 frames)",
    "icon": "🥧",
    "external": {
      "importPath": "./community/PieChart",
      "exportName": "PieChart",
      "packages": [
        "@remotion/google-fonts"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080
      }
    },
    "controls": [
      {
        "group": "Pie Chart • data is hard-coded in the source; animation starts at the layer's start frame",
        "items": [
          {
            "key": "width",
            "label": "BOX WIDTH",
            "kind": "range",
            "min": 100,
            "max": 3840,
            "step": 1
          },
          {
            "key": "height",
            "label": "BOX HEIGHT",
            "kind": "range",
            "min": 60,
            "max": 2160,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "pie"
    },
    "fullFrame": true
  },
  {
    "id": "community_vertical_bar_chart",
    "componentName": "VerticalBarChart",
    "name": "Vertical Bar Chart",
    "desc": "Remotion Elements • 3 bars spring up one after another (~95 frames)",
    "icon": "📶",
    "external": {
      "importPath": "./community/VerticalBarChart",
      "exportName": "VerticalBarChart",
      "packages": [
        "@remotion/google-fonts"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080
      }
    },
    "controls": [
      {
        "group": "Vertical Bar Chart • data is hard-coded in the source; animation starts at the layer's start frame",
        "items": [
          {
            "key": "width",
            "label": "BOX WIDTH",
            "kind": "range",
            "min": 100,
            "max": 3840,
            "step": 1
          },
          {
            "key": "height",
            "label": "BOX HEIGHT",
            "kind": "range",
            "min": 60,
            "max": 2160,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "vbars"
    },
    "fullFrame": true
  },
  {
    "id": "community_wiggling_callout",
    "componentName": "ProductDiscountCallout",
    "name": "Wiggling Callout",
    "desc": "Remotion Elements • blue \"-20%\" speech bubble that wiggles in (26 frames)",
    "icon": "🗯️",
    "external": {
      "importPath": "./community/ProductDiscountCallout",
      "exportName": "ProductDiscountCallout",
      "packages": [
        "@remotion/shapes",
        "@remotion/google-fonts"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 580,
      "baseY": 220,
      "customProperties": {
        "width": 760,
        "height": 640
      }
    },
    "controls": [
      {
        "group": "Wiggling Callout • fixed 760×640 layout; scale the layer to resize",
        "items": [
          {
            "key": "width",
            "label": "BOX WIDTH",
            "kind": "range",
            "min": 100,
            "max": 3840,
            "step": 1
          },
          {
            "key": "height",
            "label": "BOX HEIGHT",
            "kind": "range",
            "min": 60,
            "max": 2160,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "callout"
    }
  },
  {
    "id": "community_shine",
    "componentName": "Shine",
    "name": "Shine",
    "desc": "Remotion Elements • diagonal shine sweeps across an image (44 frames) • HtmlInCanvas",
    "icon": "✨",
    "external": {
      "importPath": "./community/Shine",
      "exportName": "Shine",
      "packages": [
        "@remotion/effects"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 320,
      "baseY": 180,
      "customProperties": {
        "width": 1280,
        "height": 720
      }
    },
    "controls": [
      {
        "group": "Shine • fixed 1280×720 canvas, image URL hard-coded",
        "items": [
          {
            "key": "width",
            "label": "BOX WIDTH",
            "kind": "range",
            "min": 100,
            "max": 3840,
            "step": 1
          },
          {
            "key": "height",
            "label": "BOX HEIGHT",
            "kind": "range",
            "min": 60,
            "max": 2160,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "canvasfx",
      "style": "shine"
    }
  },
  {
    "id": "community_tear",
    "componentName": "Tear",
    "name": "Tear Apart",
    "desc": "Remotion Elements • image tears in two with a jagged edge (frames 15–25) • HtmlInCanvas",
    "icon": "💥",
    "external": {
      "importPath": "./community/Tear",
      "exportName": "Tear",
      "packages": [
        "@remotion/effects"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 320,
      "baseY": 180,
      "customProperties": {
        "width": 1280,
        "height": 720
      }
    },
    "controls": [
      {
        "group": "Tear Apart • fixed 1280×720 canvas, image URL hard-coded",
        "items": [
          {
            "key": "width",
            "label": "BOX WIDTH",
            "kind": "range",
            "min": 100,
            "max": 3840,
            "step": 1
          },
          {
            "key": "height",
            "label": "BOX HEIGHT",
            "kind": "range",
            "min": 60,
            "max": 2160,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "canvasfx",
      "style": "tear"
    }
  },
  {
    "id": "community_rotating_cards",
    "componentName": "ProductCollection",
    "name": "Rotating Cards",
    "desc": "Remotion Elements • 3 image cards (A/B/C) each take centre once, 150-frame clip",
    "icon": "🃏",
    "external": {
      "importPath": "./community/ProductCollection",
      "exportName": "ProductCollection",
      "packages": [
        "@remotion/google-fonts"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 420,
      "baseY": 0,
      "customProperties": {
        "width": 1080,
        "height": 1080
      }
    },
    "controls": [
      {
        "group": "Rotating Cards • fixed 900×660 stage at (60,180); self-contained 150-frame clip",
        "items": [
          {
            "key": "width",
            "label": "BOX WIDTH",
            "kind": "range",
            "min": 100,
            "max": 3840,
            "step": 1
          },
          {
            "key": "height",
            "label": "BOX HEIGHT",
            "kind": "range",
            "min": 60,
            "max": 2160,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "cards"
    },
    "defaultDurationInFrames": 150
  },
  {
    "id": "community_picture_in_picture",
    "componentName": "PictureInPictureTransition",
    "name": "Picture in Picture",
    "desc": "Remotion Elements • scene A shrinks from full frame into a top-right box over scene B",
    "icon": "🖼️",
    "external": {
      "importPath": "./community/PictureInPictureTransition",
      "exportName": "PictureInPictureTransition",
      "packages": [],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080
      }
    },
    "controls": [
      {
        "group": "Picture in Picture • built for 1920×1080 (hard-coded 1363px move); images hard-coded",
        "items": [
          {
            "key": "width",
            "label": "BOX WIDTH",
            "kind": "range",
            "min": 100,
            "max": 3840,
            "step": 1
          },
          {
            "key": "height",
            "label": "BOX HEIGHT",
            "kind": "range",
            "min": 60,
            "max": 2160,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "pip"
    },
    "fullFrame": true
  },
  {
    "id": "community_split_screen",
    "componentName": "SlideToSplitScreen",
    "name": "Slide to Split Screen",
    "desc": "Remotion Elements • full-frame scene opens to a 60/40 split and closes again",
    "icon": "🪟",
    "external": {
      "importPath": "./community/SlideToSplitScreen",
      "exportName": "SlideToSplitScreen",
      "packages": [],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080
      }
    },
    "controls": [
      {
        "group": "Slide to Split Screen • sizes itself to the composition; images hard-coded",
        "items": [
          {
            "key": "width",
            "label": "BOX WIDTH",
            "kind": "range",
            "min": 100,
            "max": 3840,
            "step": 1
          },
          {
            "key": "height",
            "label": "BOX HEIGHT",
            "kind": "range",
            "min": 60,
            "max": 2160,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "split"
    },
    "fullFrame": true
  }
];
