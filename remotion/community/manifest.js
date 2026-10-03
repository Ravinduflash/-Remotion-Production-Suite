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
  },
  {
    "id": "community_map_flyover",
    "componentName": "MapFlyover",
    "name": "A-to-B Map Flyover",
    "desc": "Remotion Elements • satellite-map flyover along a curved route, camera follows (≈245 frames) • MapLibre",
    "icon": "🛰️",
    "external": {
      "importPath": "./community/MapFlyover",
      "exportName": "MapFlyover",
      "packages": [
        "maplibre-gl",
        "@turf/turf"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "origin": [
          -0.1276,
          51.5072
        ],
        "destination": [
          139.6917,
          35.6895
        ],
        "originLabel": "London",
        "destinationLabel": "Tokyo",
        "routeColor": "#ff5c4d",
        "lineWidth": 24,
        "width": 1920,
        "height": 1080
      }
    },
    "controls": [
      {
        "group": "Route (whole clip)",
        "items": [
          {
            "key": "origin",
            "label": "ORIGIN [longitude, latitude]",
            "kind": "numlist",
            "keyframable": false
          },
          {
            "key": "destination",
            "label": "DESTINATION [longitude, latitude]",
            "kind": "numlist",
            "keyframable": false
          },
          {
            "key": "originLabel",
            "label": "ORIGIN LABEL",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "destinationLabel",
            "label": "DESTINATION LABEL",
            "kind": "text",
            "keyframable": false
          }
        ]
      },
      {
        "group": "Style",
        "items": [
          {
            "key": "routeColor",
            "label": "ROUTE COLOR",
            "kind": "color"
          },
          {
            "key": "lineWidth",
            "label": "ROUTE WIDTH",
            "kind": "range",
            "min": 2,
            "max": 24,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "map",
      "style": "flyover"
    },
    "fullFrame": true,
    "renderTimeoutMs": 180000
  },
  {
    "id": "community_watercolor_map",
    "componentName": "WatercolorMap",
    "name": "Watercolor Map",
    "desc": "Remotion Elements • watercolour-map journey with an arcing route and place labels (≈155 frames)",
    "icon": "🗺️",
    "external": {
      "importPath": "./community/WatercolorMap",
      "exportName": "WatercolorMap",
      "packages": [
        "@remotion/google-fonts"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "origin": [
          -118.2437,
          34.0522
        ],
        "destination": [
          8.5417,
          47.3769
        ],
        "originLabel": "Los Angeles",
        "destinationLabel": "Zurich",
        "routeColor": "#ff0041",
        "routeWidth": 18,
        "width": 1920,
        "height": 1080
      }
    },
    "controls": [
      {
        "group": "Route (whole clip)",
        "items": [
          {
            "key": "origin",
            "label": "ORIGIN [longitude, latitude]",
            "kind": "numlist",
            "keyframable": false
          },
          {
            "key": "destination",
            "label": "DESTINATION [longitude, latitude]",
            "kind": "numlist",
            "keyframable": false
          },
          {
            "key": "originLabel",
            "label": "ORIGIN LABEL",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "destinationLabel",
            "label": "DESTINATION LABEL",
            "kind": "text",
            "keyframable": false
          }
        ]
      },
      {
        "group": "Style",
        "items": [
          {
            "key": "routeColor",
            "label": "ROUTE COLOR",
            "kind": "color"
          },
          {
            "key": "routeWidth",
            "label": "ROUTE WIDTH",
            "kind": "range",
            "min": 4,
            "max": 30,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "map",
      "style": "watercolor"
    },
    "fullFrame": true,
    "renderTimeoutMs": 180000
  },
  {
    "id": "community_location_lower_third",
    "componentName": "LocationLowerThird",
    "name": "Location Lower Third",
    "desc": "Remotion Elements • map pin draws in, \"Berlin, Germany\" wipes in; out by frame 119",
    "icon": "📍",
    "external": {
      "importPath": "./community/LocationLowerThird",
      "exportName": "LocationLowerThird",
      "packages": [],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 96,
      "baseY": 846,
      "customProperties": {
        "width": 680,
        "height": 138
      }
    },
    "controls": [
      {
        "group": "Location Lower Third • fixed 680×138, text hard-coded",
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
      "kind": "lowerthird",
      "style": "location"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "community_name_lower_third",
    "componentName": "NameLowerThird",
    "name": "Name Lower Third",
    "desc": "Remotion Elements • blue name bar + dark title bar wipe in and out (≈116 frames)",
    "icon": "🪪",
    "external": {
      "importPath": "./community/NameLowerThird",
      "exportName": "NameLowerThird",
      "packages": [
        "@remotion/google-fonts"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 96,
      "baseY": 852,
      "customProperties": {
        "width": 534,
        "height": 132
      }
    },
    "controls": [
      {
        "group": "Name Lower Third • fixed 534×132, text hard-coded",
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
      "kind": "lowerthird",
      "style": "name"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "community_social_safe_zones",
    "componentName": "SocialSafeZones",
    "name": "Social Safe Zones",
    "desc": "Remotion Elements • TikTok / Instagram Reels UI guide for 9:16 (fixed 1080×1920) • HtmlInCanvas • hide before final render",
    "icon": "📱",
    "external": {
      "importPath": "./community/SocialSafeZones",
      "exportName": "SocialSafeZones",
      "packages": [],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1080,
        "height": 1920,
        "platform": "instagram"
      }
    },
    "controls": [
      {
        "group": "Guide (whole clip)",
        "items": [
          {
            "key": "platform",
            "label": "PLATFORM",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "instagram",
                "Instagram Reels"
              ],
              [
                "tiktok",
                "TikTok"
              ]
            ]
          }
        ]
      },
      {
        "group": "Social Safe Zones • fixed 1080×1920",
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
      "kind": "safezones"
    },
    "fullFrame": true
  },
  {
    "id": "community_news_article_highlight",
    "componentName": "NewsArticleHighlight",
    "name": "News Article Highlight",
    "desc": "Remotion Elements • headline with hand-drawn highlighter sweeps over key words; fades out 125–149 • dark text, needs a light background",
    "icon": "📰",
    "external": {
      "importPath": "./community/NewsArticleHighlight",
      "exportName": "NewsArticleHighlight",
      "packages": [
        "@remotion/rough-notation"
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
        "group": "News Article Highlight • full frame, 1420×458 article centred; text hard-coded",
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
      "kind": "article"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150
  },
  {
    "id": "community_on_screen_messages",
    "componentName": "OnScreenMessages",
    "name": "On-Screen Messages",
    "desc": "Remotion Elements • iMessage-style thread, 3 bubbles rise in at frames 2, 27, 52",
    "icon": "💬",
    "external": {
      "importPath": "./community/OnScreenMessages",
      "exportName": "OnScreenMessages",
      "packages": [
        "@remotion/google-fonts"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 330,
      "baseY": 200,
      "customProperties": {
        "width": 1260,
        "height": 680
      }
    },
    "controls": [
      {
        "group": "On-Screen Messages • fixed 1260×680; messages hard-coded",
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
      "kind": "messages"
    },
    "defaultDurationInFrames": 90
  },
  {
    "id": "community_polaroid_pictures",
    "componentName": "PolaroidPictures",
    "name": "Polaroid Pictures",
    "desc": "Remotion Elements • three taped instant photos fly in, drift, and fly out over the layer's last 30 frames",
    "icon": "📸",
    "external": {
      "importPath": "./community/PolaroidPictures",
      "exportName": "PolaroidPictures",
      "packages": [
        "@remotion/google-fonts"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 220,
      "baseY": 220,
      "customProperties": {
        "width": 1480,
        "height": 640
      }
    },
    "controls": [
      {
        "group": "Polaroid Pictures • fixed 1480×640; exit timed from layer duration",
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
      "kind": "polaroids"
    },
    "defaultDurationInFrames": 150
  },
  {
    "id": "community_circle_marker",
    "componentName": "CircleMarker",
    "name": "Circle Marker",
    "desc": "Remotion Elements • hand-drawn blue circle scribbles around \"circular\" (frames 0–43, jittering) • dark text",
    "icon": "⭕",
    "external": {
      "importPath": "./community/CircleMarker",
      "exportName": "CircleMarker",
      "packages": [
        "@remotion/rough-notation",
        "@remotion/google-fonts"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 560,
      "baseY": 390,
      "customProperties": {
        "width": 800,
        "height": 300
      }
    },
    "controls": [
      {
        "group": "Circle Marker • 800 px wide text block, text hard-coded",
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
      "kind": "annotate",
      "style": "circle"
    },
    "defaultDurationInFrames": 90
  },
  {
    "id": "community_crossed_off",
    "componentName": "CrossedOffText",
    "name": "Crossed Off",
    "desc": "Remotion Elements • red hand-drawn X over \"remove\" (frames 18–39) • dark text",
    "icon": "❌",
    "external": {
      "importPath": "./community/CrossedOffText",
      "exportName": "CrossedOffText",
      "packages": [
        "@remotion/rough-notation",
        "@remotion/google-fonts"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 560,
      "baseY": 440,
      "customProperties": {
        "width": 800,
        "height": 200
      }
    },
    "controls": [
      {
        "group": "Crossed Off • centred in its box, text hard-coded",
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
      "kind": "annotate",
      "style": "crossed"
    },
    "defaultDurationInFrames": 60
  },
  {
    "id": "community_spinning_text_wheel",
    "componentName": "SpinningTextWheel",
    "name": "Spinning Text Wheel",
    "desc": "Remotion Elements • 3D word drum spins one turn and lands on the first item (≈90 frames) • dark text",
    "icon": "🎡",
    "external": {
      "importPath": "./community/SpinningTextWheel",
      "exportName": "SpinningTextWheel",
      "packages": [
        "@remotion/google-fonts"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 760,
      "baseY": 440,
      "customProperties": {
        "width": 400,
        "height": 200,
        "items": "Friday\nSaturday\nSunday\nMonday\nTuesday\nWednesday\nThursday"
      }
    },
    "controls": [
      {
        "group": "Wheel (whole clip)",
        "items": [
          {
            "key": "items",
            "label": "ITEMS (one per line, FIRST = landing item)",
            "kind": "multiline",
            "keyframable": false
          }
        ]
      },
      {
        "group": "Spinning Text Wheel • fixed 400×200 drum",
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
      "kind": "wheel"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "community_strike_through",
    "componentName": "StrikeThroughText",
    "name": "Strike Through",
    "desc": "Remotion Elements • thick red hand-drawn line through \"forbidden\" (frames 10–25) • dark text",
    "icon": "➖",
    "external": {
      "importPath": "./community/StrikeThroughText",
      "exportName": "StrikeThroughText",
      "packages": [
        "@remotion/rough-notation",
        "@remotion/google-fonts"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 560,
      "baseY": 440,
      "customProperties": {
        "width": 800,
        "height": 200
      }
    },
    "controls": [
      {
        "group": "Strike Through • centred in its box, text hard-coded",
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
      "kind": "annotate",
      "style": "strike"
    },
    "defaultDurationInFrames": 60
  },
  {
    "id": "community_text_marker",
    "componentName": "TextMarker",
    "name": "Text Marker",
    "desc": "Remotion Elements • yellow highlighter sweeps over \"remarkable\" (frames 0–25) • dark text",
    "icon": "🖍️",
    "external": {
      "importPath": "./community/TextMarker",
      "exportName": "TextMarker",
      "packages": [
        "@remotion/rough-notation",
        "@remotion/google-fonts"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 560,
      "baseY": 390,
      "customProperties": {
        "width": 800,
        "height": 300
      }
    },
    "controls": [
      {
        "group": "Text Marker • 800 px wide text block, text hard-coded",
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
      "kind": "annotate",
      "style": "marker"
    },
    "defaultDurationInFrames": 60
  },
  {
    "id": "community_youtube_comment",
    "componentName": "YouTubeCommentHighlight",
    "name": "YouTube Comment Highlight",
    "desc": "Remotion Elements • dark YouTube comment card springs up (0–48), sways in 3D, drops away (131–179) • HtmlInCanvas avatar",
    "icon": "💭",
    "external": {
      "importPath": "./community/YouTubeCommentHighlight",
      "exportName": "YouTubeCommentHighlight",
      "packages": [
        "@remotion/google-fonts"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 400,
      "baseY": 360,
      "customProperties": {
        "width": 1120,
        "height": 360
      }
    },
    "controls": [
      {
        "group": "YouTube Comment Highlight • fixed 1120×360, comment + avatar hard-coded",
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
      "kind": "ytcomment"
    },
    "defaultDurationInFrames": 180
  },
  {
    "id": "community_youtube_end_card",
    "componentName": "YouTubeEndCard",
    "name": "YouTube End Card",
    "desc": "Remotion Elements • light full-frame end screen: subscribe CTA, social handles, two thumbnail slots for YouTube end-screen videos",
    "icon": "🔚",
    "external": {
      "importPath": "./community/YouTubeEndCard",
      "exportName": "YouTubeEndCard",
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
        "group": "YouTube End Card • full frame, built for 1920×1080; handles hard-coded",
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
      "kind": "endcard"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150
  },
  {
    "id": "community_youtube_subscribe_nudge",
    "componentName": "YouTubeSubscribeNudge",
    "name": "YouTube Subscribe Nudge",
    "desc": "Remotion Elements • channel card; cursor clicks Subscribe (61) → Subscribed, rings the bell (81); click + ding SFX • HtmlInCanvas avatar",
    "icon": "🔔",
    "external": {
      "importPath": "./community/YouTubeSubscribeNudge",
      "exportName": "YouTubeSubscribeNudge",
      "packages": [
        "@remotion/google-fonts",
        "@remotion/media",
        "@remotion/sfx"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 580,
      "baseY": 420,
      "customProperties": {
        "width": 760,
        "height": 240,
        "avatarSrc": "https://remotion.media/elements/social-endcard-remotion-logo.png"
      }
    },
    "controls": [
      {
        "group": "Channel (whole clip)",
        "items": [
          {
            "key": "avatarSrc",
            "label": "AVATAR SRC (URL / staticFile)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "clickSrc",
            "label": "CLICK SFX SRC (leave unset for the built-in mouseClick)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "dingSrc",
            "label": "BELL SFX SRC (leave unset for the built-in ding)",
            "kind": "text",
            "keyframable": false
          }
        ]
      },
      {
        "group": "YouTube Subscribe Nudge • fixed 760×240",
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
      "kind": "subnudge"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_backdrop",
    "componentName": "Backdrop",
    "name": "Backdrop (remocn)",
    "desc": "remocn • full-frame colour / gradient / image fill; WRAPPER: wrap layers to get a padded, rounded, shadowed frame (Screen Studio look)",
    "icon": "🖼️",
    "tab": "community",
    "external": {
      "importPath": "./community/backdrop",
      "exportName": "Backdrop",
      "sizeMode": "none",
      "children": {
        "fit": "backdrop"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "fill": {
          "type": "color",
          "value": "#141318"
        },
        "padding": 4,
        "radius": 1,
        "shadow": "0 20px 60px rgba(0,0,0,0.4)"
      }
    },
    "controls": [
      {
        "group": "Fill (whole clip)",
        "items": [
          {
            "key": "fill",
            "label": "FILL {type: color|gradient|image, value | src, fit}",
            "kind": "json",
            "keyframable": false
          }
        ]
      },
      {
        "group": "Frame (when wrapping layers)",
        "items": [
          {
            "key": "padding",
            "label": "PADDING (% of width)",
            "kind": "range",
            "min": 0,
            "max": 20,
            "step": 0.5
          },
          {
            "key": "radius",
            "label": "RADIUS (% of width)",
            "kind": "range",
            "min": 0,
            "max": 10,
            "step": 0.1
          },
          {
            "key": "shadow",
            "label": "SHADOW (CSS box-shadow, empty = none)",
            "kind": "text",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "backdrop"
    },
    "fullFrame": true
  },
  {
    "id": "remocn_drift",
    "componentName": "Drift",
    "name": "Drift (remocn)",
    "desc": "remocn • WRAPPER: slow linear camera push-in (1 → 1 + grow) over the layer duration so no frame is static",
    "icon": "🎥",
    "tab": "community",
    "external": {
      "importPath": "./community/drift",
      "exportName": "Drift",
      "sizeMode": "none",
      "children": {
        "fit": "full"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "grow": 0.035
      }
    },
    "controls": [
      {
        "group": "Drift (whole clip) • wrap layers with update_asset wraps",
        "items": [
          {
            "key": "grow",
            "label": "GROW (0.03–0.05; negative = pull back)",
            "kind": "range",
            "min": -0.1,
            "max": 0.1,
            "step": 0.005,
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "drift"
    },
    "fullFrame": true
  },
  {
    "id": "remocn_stage",
    "componentName": "Stage",
    "name": "Stage (remocn)",
    "desc": "remocn • WRAPPER: puts wrapped layers (screenshot, video, scene) on a lit perspective studio plane with camera moves and handheld shake",
    "icon": "🎬",
    "tab": "community",
    "external": {
      "importPath": "./community/stage",
      "exportName": "Stage",
      "sizeMode": "none",
      "children": {
        "fit": "stage"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "contentSize": {
          "width": 1920,
          "height": 1080
        },
        "moves": [],
        "shake": 0,
        "seed": "remocn-stage",
        "backdrop": "linear-gradient(145deg, #17181d 0%, #09090b 72%)",
        "rotateX": 14,
        "rotateY": -20,
        "perspective": 900,
        "scale": 0.86,
        "radius": 1.4,
        "reflection": 0.24,
        "shadow": 0.7,
        "light": 0.55
      }
    },
    "controls": [
      {
        "group": "Camera (whole clip)",
        "items": [
          {
            "key": "moves",
            "label": "MOVES [{at, x 0–1, y 0–1, zoom, rotate}] (layer-local frames)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "contentSize",
            "label": "CONTENT SIZE {width, height} (wrapped canvas aspect)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "shake",
            "label": "SHAKE (0.08–0.2 handheld)",
            "kind": "range",
            "min": 0,
            "max": 1,
            "step": 0.01,
            "keyframable": false
          },
          {
            "key": "seed",
            "label": "SHAKE SEED",
            "kind": "text",
            "keyframable": false
          }
        ]
      },
      {
        "group": "Studio (whole clip)",
        "items": [
          {
            "key": "backdrop",
            "label": "BACKDROP (CSS background)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "rotateX",
            "label": "ROTATE X°",
            "kind": "range",
            "min": -180,
            "max": 180,
            "step": 1,
            "keyframable": false
          },
          {
            "key": "rotateY",
            "label": "ROTATE Y°",
            "kind": "range",
            "min": -180,
            "max": 180,
            "step": 1,
            "keyframable": false
          },
          {
            "key": "perspective",
            "label": "PERSPECTIVE px",
            "kind": "range",
            "min": 50,
            "max": 3000,
            "step": 10,
            "keyframable": false
          },
          {
            "key": "scale",
            "label": "PLANE SCALE",
            "kind": "range",
            "min": 0.1,
            "max": 3,
            "step": 0.01,
            "keyframable": false
          },
          {
            "key": "radius",
            "label": "RADIUS (% of width)",
            "kind": "range",
            "min": 0,
            "max": 10,
            "step": 0.1,
            "keyframable": false
          },
          {
            "key": "reflection",
            "label": "REFLECTION",
            "kind": "range",
            "min": 0,
            "max": 1,
            "step": 0.01,
            "keyframable": false
          },
          {
            "key": "shadow",
            "label": "SHADOW",
            "kind": "range",
            "min": 0,
            "max": 1,
            "step": 0.01,
            "keyframable": false
          },
          {
            "key": "light",
            "label": "LIGHT",
            "kind": "range",
            "min": 0,
            "max": 1,
            "step": 0.01,
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "stage"
    },
    "fullFrame": true
  },
  {
    "id": "remocn_chat_to_preview",
    "componentName": "ChatToPreviewLayout",
    "name": "Chat to Preview (remocn)",
    "desc": "remocn • WRAPPER with slots chat + preview: the chat column shrinks (0.5 → 0.25) as the preview column grows; built-in placeholders when a slot is empty • 1280×720 layout, scale 1.5",
    "icon": "💬",
    "tab": "community",
    "external": {
      "importPath": "./community/chat-to-preview-layout",
      "exportName": "ChatToPreviewLayout",
      "sizeMode": "none",
      "children": {
        "fit": "slot",
        "slots": [
          "chat",
          "preview"
        ]
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "startChatRatio": 0.5,
        "endChatRatio": 0.25,
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Split (whole clip) • slots: chat, preview (update_asset wraps {chat:[…], preview:[…]})",
        "items": [
          {
            "key": "startChatRatio",
            "label": "START CHAT RATIO",
            "kind": "range",
            "min": 0.1,
            "max": 0.9,
            "step": 0.01,
            "keyframable": false
          },
          {
            "key": "endChatRatio",
            "label": "END CHAT RATIO (≥ 0.2)",
            "kind": "range",
            "min": 0.1,
            "max": 0.9,
            "step": 0.01,
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "min": 0.25,
            "max": 4,
            "step": 0.05,
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "chatpreview"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_inline_word_roll",
    "componentName": "InlineWordRoll",
    "name": "Inline Word Roll (remocn)",
    "desc": "remocn • fixed prefix, the changing word rolls up through a masked slot, switches accelerate, line recentres • transparent",
    "icon": "🎰",
    "tab": "community",
    "external": {
      "importPath": "./community/inline-word-roll",
      "exportName": "InlineWordRoll",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "prefix": "Looking for",
        "text": "leads | customers | subscribers | appointments | demos | quotes | registrants | trials | conversions",
        "suffix": "?",
        "fontSize": 90,
        "fontFamily": "Arial, Helvetica, sans-serif",
        "fontWeight": 400,
        "color": "#f5f5f5",
        "interval": 12,
        "acceleration": 0.9,
        "transitionFrames": 6
      }
    },
    "controls": [
      {
        "group": "Copy (whole clip)",
        "items": [
          {
            "key": "prefix",
            "label": "PREFIX (stays put)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "text",
            "label": "WORDS (separate with | or new lines)",
            "kind": "multiline",
            "keyframable": false
          },
          {
            "key": "suffix",
            "label": "SUFFIX (rolls with each word)",
            "kind": "text",
            "keyframable": false
          }
        ]
      },
      {
        "group": "Type & timing (whole clip)",
        "items": [
          {
            "key": "fontSize",
            "label": "FONT SIZE (auto-fits 84% width)",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontFamily",
            "label": "FONT FAMILY",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "interval",
            "label": "FIRST INTERVAL (frames)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 60,
            "step": 1
          },
          {
            "key": "acceleration",
            "label": "ACCELERATION (0.5–1, 1 = steady)",
            "kind": "range",
            "keyframable": false,
            "min": 0.5,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "transitionFrames",
            "label": "ROLL FRAMES",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 30,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "wordroll"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 105
  },
  {
    "id": "remocn_shader_text_reveal",
    "componentName": "ShaderTextReveal",
    "name": "Shader Text Reveal (remocn)",
    "desc": "remocn • WebGL2: each word fills with the OpenShaders magenta-violet halftone material, settles to white, then a dark wave removes it • transparent",
    "icon": "✨",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-text-reveal",
      "exportName": "ShaderTextReveal",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "text": "Your product",
        "fontSize": 400,
        "fontFamily": "Arial, sans-serif",
        "fontWeight": 500,
        "wordDuration": 30,
        "intensity": 1
      }
    },
    "controls": [
      {
        "group": "Copy (whole clip)",
        "items": [
          {
            "key": "text",
            "label": "TEXT (space = word by word; new lines keep phrases)",
            "kind": "multiline",
            "keyframable": false
          }
        ]
      },
      {
        "group": "Look & timing (whole clip)",
        "items": [
          {
            "key": "fontSize",
            "label": "MAX FONT SIZE (fits 72% width, 58% height)",
            "kind": "range",
            "keyframable": false,
            "min": 40,
            "max": 800,
            "step": 1
          },
          {
            "key": "fontFamily",
            "label": "FONT FAMILY",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "wordDuration",
            "label": "FRAMES PER WORD (≥ 12)",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 120,
            "step": 1
          },
          {
            "key": "intensity",
            "label": "MATERIAL INTENSITY (0 = white only)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "shadertext"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 75,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_type_fossil",
    "componentName": "TypeFossil",
    "name": "Type Fossil (remocn)",
    "desc": "remocn • word with layered offset contours revises through drafts, then compresses into a clean imprint • owns its background",
    "icon": "🪨",
    "tab": "community",
    "external": {
      "importPath": "./community/type-fossil",
      "exportName": "TypeFossil",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "text": "Form",
        "drafts": "Idea | Maybe | Try | Almost | Again | Closer",
        "layers": 16,
        "depth": 100,
        "fontSize": 220,
        "fontWeight": 600,
        "color": "#302b26",
        "accentColor": "#a800b7",
        "backgroundColor": "#eeeae2",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Copy (whole clip)",
        "items": [
          {
            "key": "text",
            "label": "FINAL TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "drafts",
            "label": "DRAFTS (| or new lines, up to 12; each adds 18 frames)",
            "kind": "multiline",
            "keyframable": false
          }
        ]
      },
      {
        "group": "Look (whole clip)",
        "items": [
          {
            "key": "layers",
            "label": "CONTOUR LAYERS",
            "kind": "range",
            "keyframable": false,
            "min": 4,
            "max": 24,
            "step": 1
          },
          {
            "key": "depth",
            "label": "DEPTH",
            "kind": "range",
            "keyframable": false,
            "min": 50,
            "max": 150,
            "step": 1
          },
          {
            "key": "fontSize",
            "label": "MAX FONT SIZE (1280×720 units)",
            "kind": "range",
            "keyframable": false,
            "min": 40,
            "max": 400,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "TEXT COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "accentColor",
            "label": "CONTOUR COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "backgroundColor",
            "label": "BACKGROUND",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "fossil"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 208
  },
  {
    "id": "remocn_soft_blur_in",
    "componentName": "SoftBlurIn",
    "name": "Soft Blur In (remocn)",
    "desc": "remocn • per-character fade-in with blur → sharp and a small rise (entrance only) • dark text, transparent; pair with Backdrop",
    "icon": "🌫️",
    "tab": "community",
    "external": {
      "importPath": "./community/soft-blur-in",
      "exportName": "SoftBlurIn",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "text": "Think different.",
        "blur": 12,
        "fontSize": 108,
        "fontWeight": 600,
        "color": "#171717",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Soft Blur In (whole clip)",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "blur",
            "label": "START BLUR px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 40,
            "step": 1
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "softblur"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 60
  },
  {
    "id": "remocn_per_character_rise",
    "componentName": "PerCharacterRise",
    "name": "Per Character Rise (remocn)",
    "desc": "remocn • letters slide up from below with no blur, even 1-frame stagger — crisp and kinetic",
    "icon": "⬆️",
    "tab": "community",
    "external": {
      "importPath": "./community/per-character-rise",
      "exportName": "PerCharacterRise",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "fontSize": 108,
        "fontWeight": 600,
        "color": "#171717",
        "speed": 1,
        "text": "One more thing.",
        "distance": 48
      }
    },
    "controls": [
      {
        "group": "Per Character Rise (remocn) (whole clip) • dark text, transparent — pair with Backdrop",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "distance",
            "label": "RISE DISTANCE px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 200,
            "step": 1
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "charanim",
      "style": "rise"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 60
  },
  {
    "id": "remocn_bottom_up_letters",
    "componentName": "BottomUpLetters",
    "name": "Bottom-Up Letters (remocn)",
    "desc": "remocn • letters rise from below in a pronounced staircase (short words, acronyms)",
    "icon": "🔼",
    "tab": "community",
    "external": {
      "importPath": "./community/bottom-up-letters",
      "exportName": "BottomUpLetters",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "fontSize": 108,
        "fontWeight": 600,
        "color": "#171717",
        "speed": 1,
        "text": "Shift",
        "staggerDelay": 3,
        "distance": 69
      }
    },
    "controls": [
      {
        "group": "Bottom-Up Letters (remocn) (whole clip) • dark text, transparent — pair with Backdrop",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "staggerDelay",
            "label": "STAGGER (frames per letter)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 12,
            "step": 1
          },
          {
            "key": "distance",
            "label": "RISE DISTANCE px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 200,
            "step": 1
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "charanim",
      "style": "bottomup"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 60
  },
  {
    "id": "remocn_top_down_letters",
    "componentName": "TopDownLetters",
    "name": "Top-Down Letters (remocn)",
    "desc": "remocn • letters drop from above in a pronounced staircase, landing like stamps (≤ ~8 letters)",
    "icon": "🔽",
    "tab": "community",
    "external": {
      "importPath": "./community/top-down-letters",
      "exportName": "TopDownLetters",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "fontSize": 108,
        "fontWeight": 600,
        "color": "#171717",
        "speed": 1,
        "text": "Signal",
        "staggerDelay": 3,
        "distance": 69
      }
    },
    "controls": [
      {
        "group": "Top-Down Letters (remocn) (whole clip) • dark text, transparent — pair with Backdrop",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "staggerDelay",
            "label": "STAGGER (frames per letter)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 12,
            "step": 1
          },
          {
            "key": "distance",
            "label": "DROP DISTANCE px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 200,
            "step": 1
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "charanim",
      "style": "topdown"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 60
  },
  {
    "id": "remocn_spring_scale_in",
    "componentName": "SpringScaleIn",
    "name": "Spring Scale In (remocn)",
    "desc": "remocn • words pop in with a soft overshoot scale, staggered per word — playful",
    "icon": "🫧",
    "tab": "community",
    "external": {
      "importPath": "./community/spring-scale-in",
      "exportName": "SpringScaleIn",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "fontSize": 108,
        "fontWeight": 600,
        "color": "#171717",
        "speed": 1,
        "text": "Fast. Crisp. Fluid.",
        "staggerDelay": 3,
        "scaleFrom": 0.7
      }
    },
    "controls": [
      {
        "group": "Spring Scale In (remocn) (whole clip) • dark text, transparent — pair with Backdrop",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "staggerDelay",
            "label": "STAGGER (frames per word)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 12,
            "step": 1
          },
          {
            "key": "scaleFrom",
            "label": "SCALE FROM",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "charanim",
      "style": "spring"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 60
  },
  {
    "id": "remocn_micro_scale_fade",
    "componentName": "MicroScaleFade",
    "name": "Micro Scale Fade (remocn)",
    "desc": "remocn • calm tiny scale pop (0.96 → 1) with a fade for labels and sub-headings • entrance only",
    "icon": "🔹",
    "tab": "community",
    "external": {
      "importPath": "./community/micro-scale-fade",
      "exportName": "MicroScaleFade",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "fontSize": 108,
        "fontWeight": 600,
        "color": "#171717",
        "speed": 1,
        "text": "Welcome to motion.",
        "scaleFrom": 0.96
      }
    },
    "controls": [
      {
        "group": "Micro Scale Fade (remocn) (whole clip) • entrance only, dark text, pair with Backdrop",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "scaleFrom",
            "label": "SCALE FROM",
            "kind": "range",
            "keyframable": false,
            "min": 0.5,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "textarc",
      "style": "micro"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 60
  },
  {
    "id": "remocn_scale_down_fade",
    "componentName": "ScaleDownFade",
    "name": "Scale Down Fade (remocn)",
    "desc": "remocn • settles in (1.04 → 1, rises 8px), holds, then scales down and fades out over the layer's last 11 frames",
    "icon": "🔻",
    "tab": "community",
    "external": {
      "importPath": "./community/scale-down-fade",
      "exportName": "ScaleDownFade",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "fontSize": 108,
        "fontWeight": 600,
        "color": "#171717",
        "speed": 1,
        "text": "Quietly refined."
      }
    },
    "controls": [
      {
        "group": "Scale Down Fade (remocn) (whole clip) • exit timed from the layer duration",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "textarc",
      "style": "scaledown"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 90
  },
  {
    "id": "remocn_blur_out_up",
    "componentName": "BlurOutUp",
    "name": "Blur Out Up (remocn)",
    "desc": "remocn • words arrive clean, hold, then drift up with increasing blur at the end of the layer",
    "icon": "💨",
    "tab": "community",
    "external": {
      "importPath": "./community/blur-out-up",
      "exportName": "BlurOutUp",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "fontSize": 108,
        "fontWeight": 600,
        "color": "#171717",
        "speed": 1,
        "text": "Clear in, airy out.",
        "staggerDelay": 1
      }
    },
    "controls": [
      {
        "group": "Blur Out Up (remocn) (whole clip) • exit timed from the layer duration",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "staggerDelay",
            "label": "STAGGER (frames per word)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 10,
            "step": 1
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "textarc",
      "style": "blurout"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 90
  },
  {
    "id": "remocn_focus_blur_resolve",
    "componentName": "FocusBlurResolve",
    "name": "Focus Blur Resolve (remocn)",
    "desc": "remocn • focus pull from heavy blur to crisp, hold, soft blur-out over the layer's last 16 frames",
    "icon": "🎯",
    "tab": "community",
    "external": {
      "importPath": "./community/focus-blur-resolve",
      "exportName": "FocusBlurResolve",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "fontSize": 108,
        "fontWeight": 600,
        "color": "#171717",
        "speed": 1,
        "text": "Focus resolves clearly.",
        "blur": 14
      }
    },
    "controls": [
      {
        "group": "Focus Blur Resolve (remocn) (whole clip) • exit timed from the layer duration",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "blur",
            "label": "START BLUR px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 40,
            "step": 1
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "textarc",
      "style": "focus"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 90
  },
  {
    "id": "remocn_line_by_line_slide",
    "componentName": "LineByLineSlide",
    "name": "Line-by-Line Slide (remocn)",
    "desc": "remocn • each line slides in from the left (4f stagger), holds, then exits to the right at the end of the layer",
    "icon": "📜",
    "tab": "community",
    "external": {
      "importPath": "./community/line-by-line-slide",
      "exportName": "LineByLineSlide",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "fontSize": 108,
        "fontWeight": 600,
        "color": "#171717",
        "speed": 1,
        "text": "Think different.\nDo more.",
        "distance": 72
      }
    },
    "controls": [
      {
        "group": "Line-by-Line Slide (remocn) (whole clip) • exit timed from the layer duration",
        "items": [
          {
            "key": "text",
            "label": "TEXT (one line per row)",
            "kind": "multiline",
            "keyframable": false
          },
          {
            "key": "distance",
            "label": "SLIDE DISTANCE px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "textarc",
      "style": "lines"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 90
  },
  {
    "id": "remocn_per_word_crossfade",
    "componentName": "PerWordCrossfade",
    "name": "Per-Word Crossfade (remocn)",
    "desc": "remocn • fromText words drift up and fade while toText words fade in from below; chain layers A→B, B→C with startFrame",
    "icon": "🔁",
    "tab": "community",
    "external": {
      "importPath": "./community/per-word-crossfade",
      "exportName": "PerWordCrossfade",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "fontSize": 108,
        "fontWeight": 600,
        "color": "#171717",
        "speed": 1,
        "fromText": "Beautifully simple.",
        "toText": "Designed for focus."
      }
    },
    "controls": [
      {
        "group": "Per-Word Crossfade (remocn) (whole clip) • chain with startFrame; set durationInFrames so the next link takes over",
        "items": [
          {
            "key": "fromText",
            "label": "FROM TEXT (outgoing)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "toText",
            "label": "TO TEXT (incoming)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "textarc",
      "style": "crossfade"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 50
  },
  {
    "id": "remocn_word_stream",
    "componentName": "WordStream",
    "name": "Word Stream (remocn)",
    "desc": "remocn • voiceover-paced phrases (| separated) build word by word while drifting left, run out left and hard-cut to the next; last phrase stays",
    "icon": "🌊",
    "tab": "community",
    "external": {
      "importPath": "./community/word-stream",
      "exportName": "WordStream",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "text": "introducing | one-tap checkout | for your store",
        "fontSize": 108,
        "fontWeight": 400,
        "color": "#171717",
        "wordGap": 6,
        "hold": 18,
        "drift": 2
      }
    },
    "controls": [
      {
        "group": "Word Stream (remocn) (whole clip) • transparent; sync wordGap to the voiceover",
        "items": [
          {
            "key": "text",
            "label": "PHRASES (separate with |)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "wordGap",
            "label": "FRAMES BETWEEN WORDS (6 = 5 words/s)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 30,
            "step": 1
          },
          {
            "key": "hold",
            "label": "HOLD (frames after a phrase)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 90,
            "step": 1
          },
          {
            "key": "drift",
            "label": "DRIFT px/frame",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 10,
            "step": 0.1
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic",
      "style": "stream"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 90
  },
  {
    "id": "remocn_word_push",
    "componentName": "WordPush",
    "name": "Word Push (remocn)",
    "desc": "remocn • words drive in from the right and push the line left so it always settles centred; gaps accelerate",
    "icon": "👉",
    "tab": "community",
    "external": {
      "importPath": "./community/word-push",
      "exportName": "WordPush",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "text": "move at your own pace",
        "fontSize": 108,
        "fontWeight": 400,
        "color": "#171717",
        "wordGap": 10,
        "accel": 0.8
      }
    },
    "controls": [
      {
        "group": "Word Push (remocn) (whole clip) • transparent",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "wordGap",
            "label": "FIRST GAP (frames)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 30,
            "step": 1
          },
          {
            "key": "accel",
            "label": "ACCEL (next gap ×, 1 = even)",
            "kind": "range",
            "keyframable": false,
            "min": 0.3,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic",
      "style": "push"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 60
  },
  {
    "id": "remocn_sheen_slide_in",
    "componentName": "SheenSlideIn",
    "name": "Sheen Slide In (remocn)",
    "desc": "remocn • title glides in from the right with a long exponential settle while a gradient sheen sweeps through; shrinks and hard-cuts at exitAt",
    "icon": "💫",
    "tab": "community",
    "external": {
      "importPath": "./community/sheen-slide-in",
      "exportName": "SheenSlideIn",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "text": "Introducing",
        "fontSize": 108,
        "fontWeight": 400,
        "baseColor": "#18181b",
        "sheenColor": "#4f8ef7",
        "exitAt": 60
      }
    },
    "controls": [
      {
        "group": "Sheen Slide In (remocn) (whole clip) • transparent; vanishes at exitAt + 4",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "baseColor",
            "label": "BASE COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "sheenColor",
            "label": "SHEEN COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "exitAt",
            "label": "EXIT AT (frame, hard cut +4)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 600,
            "step": 1
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic",
      "style": "sheen"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 70
  },
  {
    "id": "remocn_squeeze_in",
    "componentName": "SqueezeIn",
    "name": "Squeeze In (remocn)",
    "desc": "remocn • a wipe uncovers the word left to right, then every letter gap squeezes tighter as the last one lands",
    "icon": "🤏",
    "tab": "community",
    "external": {
      "importPath": "./community/squeeze-in",
      "exportName": "SqueezeIn",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "text": "Remocn",
        "fontSize": 108,
        "fontWeight": 400,
        "color": "#171717",
        "stagger": 3,
        "squeeze": 0.03
      }
    },
    "controls": [
      {
        "group": "Squeeze In (remocn) (whole clip) • transparent",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "stagger",
            "label": "WIPE FRAMES PER CHARACTER",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 12,
            "step": 1
          },
          {
            "key": "squeeze",
            "label": "EXTRA GAP (em) that collapses",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 0.2,
            "step": 0.005
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic",
      "style": "squeeze"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 50
  },
  {
    "id": "remocn_fog_rise",
    "componentName": "FogRise",
    "name": "Fog Rise (remocn)",
    "desc": "remocn • big display word stands up from face-down on a spring, resolving out of blur centre-out; drifts, then accelerates up at exitAt",
    "icon": "🌫️",
    "tab": "community",
    "external": {
      "importPath": "./community/fog-rise",
      "exportName": "FogRise",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "text": "Remocn",
        "fontSize": 456,
        "fontWeight": 400,
        "color": "#004CFF",
        "stagger": 5,
        "blur": 0.17,
        "tilt": 55,
        "depth": 5,
        "lift": 0.85,
        "drift": 0.005,
        "exitAt": 60,
        "exitAccel": 0.04,
        "mass": 1.3,
        "stiffness": 60,
        "damping": 13,
        "spreadGap": 0.07,
        "tracking": -0.07,
        "resolveFrames": 22,
        "fadeFrames": 18
      }
    },
    "controls": [
      {
        "group": "Fog Rise (remocn) (whole clip) • transparent; exits upward at exitAt",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "stagger",
            "label": "CENTRE-OUT STAGGER",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 15,
            "step": 1
          },
          {
            "key": "blur",
            "label": "START BLUR (em)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 0.5,
            "step": 0.01
          },
          {
            "key": "tilt",
            "label": "START TILT°",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 90,
            "step": 1
          },
          {
            "key": "depth",
            "label": "PERSPECTIVE (× font size)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 20,
            "step": 0.5
          },
          {
            "key": "lift",
            "label": "LIFT (em)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 2,
            "step": 0.05
          },
          {
            "key": "drift",
            "label": "DRIFT (em/frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 0.05,
            "step": 0.001
          },
          {
            "key": "exitAt",
            "label": "EXIT AT (frame, 0 = none)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "exitAccel",
            "label": "EXIT ACCEL",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 0.2,
            "step": 0.005
          },
          {
            "key": "mass",
            "label": "SPRING MASS",
            "kind": "range",
            "keyframable": false,
            "min": 0.2,
            "max": 5,
            "step": 0.1
          },
          {
            "key": "stiffness",
            "label": "SPRING STIFFNESS",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "damping",
            "label": "SPRING DAMPING",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 60,
            "step": 1
          },
          {
            "key": "spreadGap",
            "label": "START SPREAD (em)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 0.5,
            "step": 0.01
          },
          {
            "key": "tracking",
            "label": "TRACKING (em)",
            "kind": "range",
            "keyframable": false,
            "min": -0.2,
            "max": 0.2,
            "step": 0.01
          },
          {
            "key": "resolveFrames",
            "label": "BLUR RESOLVE FRAMES",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 60,
            "step": 1
          },
          {
            "key": "fadeFrames",
            "label": "FADE FRAMES",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 60,
            "step": 1
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 800,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic",
      "style": "fog"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 75
  },
  {
    "id": "remocn_caret_swap",
    "componentName": "CaretSwap",
    "name": "Caret Swap (remocn)",
    "desc": "remocn • a gradient caret swells into a block that eats the first phrase, then types the second and blinks",
    "icon": "⌨️",
    "tab": "community",
    "external": {
      "importPath": "./community/caret-swap",
      "exportName": "CaretSwap",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "fromText": "Executing it?",
        "toText": "That's where everyone quits",
        "fontSize": 108,
        "fontWeight": 400,
        "color": "#171717",
        "caretColor": "#FF4DAA",
        "caretColorEnd": "#8A5CF6",
        "swapAt": 20,
        "typeSpeed": 1
      }
    },
    "controls": [
      {
        "group": "Caret Swap (remocn) (whole clip) • transparent",
        "items": [
          {
            "key": "fromText",
            "label": "FROM TEXT (eaten by the caret)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "toText",
            "label": "TO TEXT (typed)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "caretColor",
            "label": "CARET TOP",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "caretColorEnd",
            "label": "CARET BOTTOM",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "swapAt",
            "label": "SWAP AT (frame)",
            "kind": "range",
            "keyframable": false,
            "min": 7,
            "max": 600,
            "step": 1
          },
          {
            "key": "typeSpeed",
            "label": "FIRST CHAR FRAMES (accelerates)",
            "kind": "range",
            "keyframable": false,
            "min": 0.2,
            "max": 10,
            "step": 0.1
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic",
      "style": "caret"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 80
  },
  {
    "id": "remocn_zoom_words",
    "componentName": "ZoomWords",
    "name": "Zoom Words (remocn)",
    "desc": "remocn • huge words fade into a long line while the camera rides the write head; starts defocused, meant to hard-cut out",
    "icon": "🔍",
    "tab": "community",
    "external": {
      "importPath": "./community/zoom-words",
      "exportName": "ZoomWords",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "text": "Still piecing together tools",
        "fontSize": 96,
        "fontWeight": 400,
        "color": "#cfc2ff",
        "wordGap": 12,
        "zoom": 2.2,
        "anchor": 0.5,
        "blur": 0.04,
        "blurFrames": 60
      }
    },
    "controls": [
      {
        "group": "Zoom Words (remocn) (whole clip) • transparent; hard-cut after the last word",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "wordGap",
            "label": "FRAMES PER WORD",
            "kind": "range",
            "keyframable": false,
            "min": 2,
            "max": 40,
            "step": 1
          },
          {
            "key": "zoom",
            "label": "CAMERA ZOOM",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "anchor",
            "label": "ANCHOR (0–1 of width)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "blur",
            "label": "START DEFOCUS (em)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 0.2,
            "step": 0.005
          },
          {
            "key": "blurFrames",
            "label": "FOCUS PULL FRAMES",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 120,
            "step": 1
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic",
      "style": "zoom"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 75
  },
  {
    "id": "remocn_centered_word_build",
    "componentName": "CenteredWordBuild",
    "name": "Centered Word Build (remocn)",
    "desc": "remocn • words cut in from below while the centred phrase pushes closer each beat; exits through a left-to-right opacity wipe",
    "icon": "🎯",
    "tab": "community",
    "external": {
      "importPath": "./community/centered-word-build",
      "exportName": "CenteredWordBuild",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "speed": 1,
        "text": "everything we learn from",
        "fontSize": 52,
        "fontWeight": 400,
        "color": "#fff3df",
        "wordGap": 11,
        "accel": 0.75,
        "rise": 0.18,
        "zoomStep": 0.035,
        "settleFrames": 9,
        "exitAt": 51,
        "exitFrames": 12
      }
    },
    "controls": [
      {
        "group": "Centered Word Build (remocn) (whole clip) • 1280×720 layout at scale 1.5, transparent",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE (720p px)",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 200,
            "step": 1
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "wordGap",
            "label": "FIRST GAPS (frames)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 40,
            "step": 1
          },
          {
            "key": "accel",
            "label": "ACCEL (later gaps ×)",
            "kind": "range",
            "keyframable": false,
            "min": 0.3,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "rise",
            "label": "RISE (em)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "zoomStep",
            "label": "ZOOM STEP per word",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 0.2,
            "step": 0.005
          },
          {
            "key": "settleFrames",
            "label": "SETTLE FRAMES",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 30,
            "step": 1
          },
          {
            "key": "exitAt",
            "label": "EXIT AT (frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "exitFrames",
            "label": "EXIT WIPE FRAMES",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 60,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic2",
      "style": "cwb"
    },
    "defaultDurationInFrames": 75
  },
  {
    "id": "remocn_inline_pill_takeover",
    "componentName": "InlinePillTakeover",
    "name": "Inline Pill Takeover (remocn)",
    "desc": "remocn • a pill opens inside a sentence, pushes the words apart and the camera punches into it (CTA takeover)",
    "icon": "💊",
    "tab": "community",
    "external": {
      "importPath": "./community/inline-pill-takeover",
      "exportName": "InlinePillTakeover",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "speed": 1,
        "before": "powering 20%",
        "insert": "Start building",
        "after": "of the Internet.",
        "fontSize": 52,
        "fontWeight": 400,
        "pillWidth": 260,
        "expandFrames": 12,
        "pillRevealHeightScale": 0.35,
        "pillGrowAt": 12,
        "pillGrowFrames": 24,
        "pillGrowWidthScale": 1.08,
        "pillGrowHeightScale": 1.16,
        "outerExitFrames": 18,
        "takeoverAt": 12,
        "takeoverScale": 2.15,
        "blur": 12,
        "color": "#fff3df",
        "pillColor": "#fffaf0",
        "pillTextColor": "#1c1210"
      }
    },
    "controls": [
      {
        "group": "Inline Pill Takeover (remocn) (whole clip) • 1280×720 layout at scale 1.5, transparent",
        "items": [
          {
            "key": "before",
            "label": "BEFORE",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "insert",
            "label": "PILL TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "after",
            "label": "AFTER",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE (720p px)",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 200,
            "step": 1
          },
          {
            "key": "pillWidth",
            "label": "PILL WIDTH (tune to the pill text)",
            "kind": "range",
            "keyframable": false,
            "min": 60,
            "max": 1000,
            "step": 1
          },
          {
            "key": "expandFrames",
            "label": "EXPAND FRAMES",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 60,
            "step": 1
          },
          {
            "key": "pillRevealHeightScale",
            "label": "START HEIGHT ×",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "pillGrowAt",
            "label": "GROW AT",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 120,
            "step": 1
          },
          {
            "key": "pillGrowFrames",
            "label": "GROW FRAMES",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 90,
            "step": 1
          },
          {
            "key": "pillGrowWidthScale",
            "label": "GROW WIDTH ×",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 2,
            "step": 0.01
          },
          {
            "key": "pillGrowHeightScale",
            "label": "GROW HEIGHT ×",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 2,
            "step": 0.01
          },
          {
            "key": "outerExitFrames",
            "label": "OUTER EXIT FRAMES",
            "kind": "range",
            "keyframable": false,
            "min": 2,
            "max": 60,
            "step": 1
          },
          {
            "key": "takeoverAt",
            "label": "TAKEOVER AT",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 120,
            "step": 1
          },
          {
            "key": "takeoverScale",
            "label": "TAKEOVER SCALE",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "blur",
            "label": "OUTER BLUR px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 40,
            "step": 1
          },
          {
            "key": "color",
            "label": "TEXT COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "pillColor",
            "label": "PILL COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "pillTextColor",
            "label": "PILL TEXT COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic2",
      "style": "pill"
    },
    "defaultDurationInFrames": 45
  },
  {
    "id": "remocn_typed_split_wipe",
    "componentName": "TypedSplitWipe",
    "name": "Typed Split Wipe (remocn)",
    "desc": "remocn • cursorless centred type-on, then prefix and suffix words wipe away in opposite directions; the anchor closes last",
    "icon": "✂️",
    "tab": "community",
    "external": {
      "importPath": "./community/typed-split-wipe",
      "exportName": "TypedSplitWipe",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "speed": 1,
        "prefix": "Introducing",
        "anchor": "X",
        "suffix": "Ads MCP",
        "typeFrames": 30,
        "exitAt": 50,
        "exitFrames": 20,
        "wordStagger": 4,
        "anchorShift": -72,
        "fontSize": 42,
        "fontWeight": 400,
        "color": "#e8e8e8"
      }
    },
    "controls": [
      {
        "group": "Typed Split Wipe (remocn) (whole clip) • 1280×720 layout at scale 1.5, transparent",
        "items": [
          {
            "key": "prefix",
            "label": "PREFIX",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "anchor",
            "label": "ANCHOR (stays longest)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "suffix",
            "label": "SUFFIX WORDS",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "typeFrames",
            "label": "TYPE FRAMES",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 120,
            "step": 1
          },
          {
            "key": "exitAt",
            "label": "EXIT AT (frame)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 600,
            "step": 1
          },
          {
            "key": "exitFrames",
            "label": "EXIT FRAMES",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 60,
            "step": 1
          },
          {
            "key": "wordStagger",
            "label": "SUFFIX STAGGER",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 20,
            "step": 1
          },
          {
            "key": "anchorShift",
            "label": "ANCHOR SHIFT px",
            "kind": "range",
            "keyframable": false,
            "min": -300,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE (720p px)",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 200,
            "step": 1
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic2",
      "style": "typed"
    },
    "defaultDurationInFrames": 75
  },
  {
    "id": "remocn_shadow_sweep_text",
    "componentName": "ShadowSweepText",
    "name": "Shadow Sweep Text (remocn)",
    "desc": "remocn • a rising line is uncovered and then covered by dense dark shadow sweeps (37-frame cycle) • paints its own dark field",
    "icon": "🌑",
    "tab": "community",
    "external": {
      "importPath": "./community/shadow-sweep-text",
      "exportName": "ShadowSweepText",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "speed": 1,
        "text": "are abandoned",
        "fontSize": 96,
        "fontWeight": 700,
        "color": "#aaa6b5",
        "backgroundColor": "#030012",
        "shadowColor": "#030012",
        "shadowSoftness": 130,
        "rise": 96,
        "driftLeft": 16
      }
    },
    "controls": [
      {
        "group": "Shadow Sweep Text (remocn) (whole clip) • 1280×720 layout at scale 1.5, owns its background",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE (720p px)",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 300,
            "step": 1
          },
          {
            "key": "color",
            "label": "TEXT COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "backgroundColor",
            "label": "BACKGROUND",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "shadowColor",
            "label": "SHADOW",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "shadowSoftness",
            "label": "SHADOW SOFTNESS px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 400,
            "step": 1
          },
          {
            "key": "rise",
            "label": "RISE px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 300,
            "step": 1
          },
          {
            "key": "driftLeft",
            "label": "DRIFT LEFT px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 200,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic2",
      "style": "shadow"
    },
    "defaultDurationInFrames": 37
  },
  {
    "id": "remocn_outline_fill_track_text",
    "componentName": "OutlineFillTrackText",
    "name": "Outline Fill Track Text (remocn)",
    "desc": "remocn • a lead word rises, then the track moves left to an outlined value that fills left to right • paints its own dark field",
    "icon": "💯",
    "tab": "community",
    "external": {
      "importPath": "./community/outline-fill-track-text",
      "exportName": "OutlineFillTrackText",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "leadText": "Keep",
        "valueText": "100%",
        "fontSize": 552,
        "fontWeight": 700,
        "color": "#f4f3f6",
        "outlineColor": "#e6e2ed",
        "outlineWidth": 4.5,
        "backgroundColor": "#030012",
        "glowColor": "#64109a",
        "enterOffset": 360,
        "trackDistance": 0,
        "anchorOffsetX": -126,
        "wordGap": 330,
        "endPadding": 144,
        "fillDuration": 38
      }
    },
    "controls": [
      {
        "group": "Outline Fill Track Text (remocn) (whole clip) • full frame (px props scaled 1.5× for 1080p), owns its background",
        "items": [
          {
            "key": "leadText",
            "label": "LEAD TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "valueText",
            "label": "VALUE TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 40,
            "max": 900,
            "step": 1
          },
          {
            "key": "color",
            "label": "FILL COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "outlineColor",
            "label": "OUTLINE COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "outlineWidth",
            "label": "OUTLINE WIDTH",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 12,
            "step": 0.5
          },
          {
            "key": "backgroundColor",
            "label": "BACKGROUND",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "glowColor",
            "label": "GLOW",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "enterOffset",
            "label": "ENTER OFFSET px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 800,
            "step": 1
          },
          {
            "key": "trackDistance",
            "label": "TRACK DISTANCE (0 = measured)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5000,
            "step": 1
          },
          {
            "key": "anchorOffsetX",
            "label": "ANCHOR OFFSET X",
            "kind": "range",
            "keyframable": false,
            "min": -600,
            "max": 600,
            "step": 1
          },
          {
            "key": "wordGap",
            "label": "WORD GAP px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 800,
            "step": 1
          },
          {
            "key": "endPadding",
            "label": "END PADDING px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "fillDuration",
            "label": "FILL FRAMES",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 80,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic2",
      "style": "outline"
    },
    "defaultDurationInFrames": 80,
    "fullFrame": true
  },
  {
    "id": "remocn_gradient_scale_cut_text",
    "componentName": "GradientScaleCutText",
    "name": "Gradient Scale Cut Text (remocn)",
    "desc": "remocn • an oversized gradient reveal hard-cuts to a compact blurred line that settles into focus • paints its own black field",
    "icon": "✂️",
    "tab": "community",
    "external": {
      "importPath": "./community/gradient-scale-cut-text",
      "exportName": "GradientScaleCutText",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "speed": 1,
        "text": "Introducing",
        "giantFontSize": 520,
        "compactFontSize": 132,
        "fontWeight": 700,
        "gradientStart": "#f04a14",
        "gradientEnd": "#f3f1f1",
        "ghostColor": "#170b0a",
        "backgroundColor": "#000000",
        "anchorOffsetX": -16,
        "giantTravel": 400,
        "settleTravel": 160,
        "cutFrame": 13,
        "revealSoftness": 14,
        "compactBlur": 12
      }
    },
    "controls": [
      {
        "group": "Gradient Scale Cut Text (remocn) (whole clip) • 1280×720 layout at scale 1.5, owns its background",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "giantFontSize",
            "label": "GIANT FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 60,
            "max": 1200,
            "step": 1
          },
          {
            "key": "compactFontSize",
            "label": "COMPACT FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 400,
            "step": 1
          },
          {
            "key": "gradientStart",
            "label": "GRADIENT START",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "gradientEnd",
            "label": "GRADIENT END",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "ghostColor",
            "label": "GHOST (unrevealed)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "backgroundColor",
            "label": "BACKGROUND",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "anchorOffsetX",
            "label": "ANCHOR OFFSET X",
            "kind": "range",
            "keyframable": false,
            "min": -400,
            "max": 400,
            "step": 1
          },
          {
            "key": "giantTravel",
            "label": "GIANT TRAVEL px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1200,
            "step": 1
          },
          {
            "key": "settleTravel",
            "label": "SETTLE TRAVEL px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "cutFrame",
            "label": "CUT FRAME",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 60,
            "step": 1
          },
          {
            "key": "revealSoftness",
            "label": "REVEAL SOFTNESS %",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 60,
            "step": 1
          },
          {
            "key": "compactBlur",
            "label": "COMPACT BLUR px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 40,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic2",
      "style": "gradcut"
    },
    "defaultDurationInFrames": 45
  },
  {
    "id": "remocn_rush_type",
    "componentName": "RushType",
    "name": "Rush Type (remocn)",
    "desc": "remocn • WebGL: one word at a time rests sharp, then blasts through a vertical orbit with RGB shutter trails • paints its own background",
    "icon": "⚡",
    "tab": "community",
    "external": {
      "importPath": "./community/rush-type",
      "exportName": "RushType",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "phrase": "gone before you look",
        "fontSize": 102,
        "fontFamily": "Arial, Helvetica, sans-serif",
        "fontWeight": 400,
        "color": "#ffffff",
        "backgroundColor": "#000000",
        "verticalStretch": 7,
        "chromaticSpread": 1,
        "restDuration": 12,
        "peakHoldDuration": 3
      }
    },
    "controls": [
      {
        "group": "Rush Type (remocn) (whole clip) • full frame, WebGL, 26 frames per word",
        "items": [
          {
            "key": "phrase",
            "label": "PHRASE (one word per cycle)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "CAP HEIGHT px",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 400,
            "step": 1
          },
          {
            "key": "fontFamily",
            "label": "FONT FAMILY",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "color",
            "label": "TEXT COLOR (hex)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "backgroundColor",
            "label": "BACKGROUND (hex)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "verticalStretch",
            "label": "VERTICAL STRETCH",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 20,
            "step": 0.5
          },
          {
            "key": "chromaticSpread",
            "label": "CHROMATIC SPREAD",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3,
            "step": 0.05
          },
          {
            "key": "restDuration",
            "label": "REST FRAMES",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 60,
            "step": 1
          },
          {
            "key": "peakHoldDuration",
            "label": "PEAK HOLD FRAMES",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 20,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic2",
      "style": "rush"
    },
    "defaultDurationInFrames": 104,
    "fullFrame": true,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_fade_through",
    "componentName": "FadeThrough",
    "name": "Fade Through (remocn)",
    "desc": "remocn • Material fade-through: old phrase fades and lifts away, new one fades up with a soft scale/blur settle (≈22 frames)",
    "icon": "🔄",
    "tab": "community",
    "external": {
      "importPath": "./community/fade-through",
      "exportName": "FadeThrough",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "fromText": "Calm transitions.",
        "toText": "Fade through content.",
        "fontSize": 108,
        "fontWeight": 600,
        "color": "#171717"
      }
    },
    "controls": [
      {
        "group": "Fade Through (remocn) (whole clip) • chain layers A→B, B→C with startFrame; dark text, transparent",
        "items": [
          {
            "key": "fromText",
            "label": "FROM TEXT (outgoing)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "toText",
            "label": "TO TEXT (incoming)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic3",
      "style": "fade"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 40
  },
  {
    "id": "remocn_shared_axis_y",
    "componentName": "SharedAxisY",
    "name": "Shared Axis Y (remocn)",
    "desc": "remocn • per-word hard-cut staircase swap — old words snap off, new words snap on, no fade",
    "icon": "📶",
    "tab": "community",
    "external": {
      "importPath": "./community/shared-axis-y",
      "exportName": "SharedAxisY",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "fromText": "Layered navigation.",
        "toText": "Hierarchy made clear.",
        "fontSize": 108,
        "fontWeight": 600,
        "color": "#171717"
      }
    },
    "controls": [
      {
        "group": "Shared Axis Y (remocn) (whole clip) • chain layers A→B, B→C with startFrame; dark text, transparent",
        "items": [
          {
            "key": "fromText",
            "label": "FROM TEXT (outgoing)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "toText",
            "label": "TO TEXT (incoming)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic3",
      "style": "axisy"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 40
  },
  {
    "id": "remocn_shared_axis_z",
    "componentName": "SharedAxisZ",
    "name": "Shared Axis Z (remocn)",
    "desc": "remocn • depth swap: old phrase scales up and blurs away, new one rises from a smaller scale into focus",
    "icon": "🔭",
    "tab": "community",
    "external": {
      "importPath": "./community/shared-axis-z",
      "exportName": "SharedAxisZ",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "fromText": "Zooming between states.",
        "toText": "Elevate and settle.",
        "fontSize": 108,
        "fontWeight": 600,
        "color": "#171717"
      }
    },
    "controls": [
      {
        "group": "Shared Axis Z (remocn) (whole clip) • chain layers A→B, B→C with startFrame; dark text, transparent",
        "items": [
          {
            "key": "fromText",
            "label": "FROM TEXT (outgoing)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "toText",
            "label": "TO TEXT (incoming)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic3",
      "style": "axisz"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 40
  },
  {
    "id": "remocn_strikethrough_replace",
    "componentName": "StrikethroughReplace",
    "name": "Strikethrough Replace (remocn)",
    "desc": "remocn • a line strikes through the old text (first 40% of the layer), then the new text fades in beneath it • paints a white background",
    "icon": "✏️",
    "tab": "community",
    "external": {
      "importPath": "./community/strikethrough-replace",
      "exportName": "StrikethroughReplace",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "from": "Manual video editing",
        "to": "One-click export",
        "lineColor": "#ff5e3a",
        "fontSize": 72,
        "fontWeight": 600,
        "color": "#171717"
      }
    },
    "controls": [
      {
        "group": "Strikethrough Replace (remocn) (whole clip) • phases timed from the layer duration; owns a white background",
        "items": [
          {
            "key": "from",
            "label": "OLD TEXT (struck)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "to",
            "label": "NEW TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "lineColor",
            "label": "STRIKE COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic3",
      "style": "strike"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_short_slide_right",
    "componentName": "ShortSlideRight",
    "name": "Short Slide Right (remocn)",
    "desc": "remocn • the phrase glides in from the left while words reveal in an opacity cascade",
    "icon": "➡️",
    "tab": "community",
    "external": {
      "importPath": "./community/short-slide-right",
      "exportName": "ShortSlideRight",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "text": "Move with intent.",
        "distance": 36,
        "staggerDelay": 3,
        "fontSize": 108,
        "fontWeight": 600,
        "color": "#171717"
      }
    },
    "controls": [
      {
        "group": "Short Slide Right (remocn) (whole clip) • entrance only; dark text, transparent",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "distance",
            "label": "SLIDE DISTANCE px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 300,
            "step": 1
          },
          {
            "key": "staggerDelay",
            "label": "STAGGER (frames per word)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 12,
            "step": 1
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic3",
      "style": "slide"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 60
  },
  {
    "id": "remocn_kinetic_center_build",
    "componentName": "KineticCenterBuild",
    "name": "Kinetic Center Build (remocn)",
    "desc": "remocn • words enter from the right and push the line so the growing phrase stays centred (3–6 words)",
    "icon": "🎯",
    "tab": "community",
    "external": {
      "importPath": "./community/kinetic-center-build",
      "exportName": "KineticCenterBuild",
      "sizeMode": "none",
      "cssVars": {
        "--font-geist-sans": "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "speed": 1,
        "text": "Words push left.",
        "entryOffset": 88,
        "fontSize": 72,
        "fontWeight": 600,
        "color": "#171717"
      }
    },
    "controls": [
      {
        "group": "Kinetic Center Build (remocn) (whole clip) • 1280×720 layout at scale 1.5 (fixed 10px word gap); entrance only, dark text",
        "items": [
          {
            "key": "text",
            "label": "TEXT (3–6 words)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "entryOffset",
            "label": "ENTRY OFFSET px (720p)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE (720p px)",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 200,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic3",
      "style": "center"
    },
    "defaultDurationInFrames": 60
  },
  {
    "id": "remocn_kinetic_morph_text",
    "componentName": "KineticMorphText",
    "name": "Kinetic Morph Text (remocn)",
    "desc": "remocn • letters lift, rotate and reshape into the next phrase with outline trails; phrases split on | • paints its own background",
    "icon": "🔀",
    "tab": "community",
    "external": {
      "importPath": "./community/kinetic-morph-text",
      "exportName": "KineticMorphText",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "text": "Hello | Make it move | Shape what's next",
        "fontSize": 150,
        "fontWeight": 600,
        "color": "#b4f4d9",
        "backgroundColor": "#a800b7",
        "spread": 270,
        "rotation": 110,
        "morph": 0.75,
        "trails": 0.45,
        "transitionFrames": 54,
        "holdFrames": 42,
        "loop": false
      }
    },
    "controls": [
      {
        "group": "Kinetic Morph Text (remocn) (whole clip) • 54f entrance + (42 hold + 54 transition) per phrase; owns its background",
        "items": [
          {
            "key": "text",
            "label": "PHRASES (separate with | or new lines)",
            "kind": "multiline",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "MAX FONT SIZE (fits 82% width)",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 400,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "backgroundColor",
            "label": "BACKGROUND",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "spread",
            "label": "FLIGHT SPREAD px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "rotation",
            "label": "MAX ROTATION°",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 360,
            "step": 1
          },
          {
            "key": "morph",
            "label": "MORPH (0 = crossfade)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "trails",
            "label": "TRAILS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (30 fps)",
            "kind": "range",
            "keyframable": false,
            "min": 6,
            "max": 200,
            "step": 1
          },
          {
            "key": "holdFrames",
            "label": "HOLD FRAMES (30 fps)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 200,
            "step": 1
          },
          {
            "key": "loop",
            "label": "LOOP back to phrase 1",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic3",
      "style": "morph"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 288
  },
  {
    "id": "remocn_kinetic_warp",
    "componentName": "KineticWarp",
    "name": "Kinetic Warp (remocn)",
    "desc": "remocn • canvas mesh warp bends a huge display word in staccato beats, one axis per keyframe (motion ends at 5 × keyframeStride) • transparent",
    "icon": "🌀",
    "tab": "community",
    "external": {
      "importPath": "./community/kinetic-warp",
      "exportName": "KineticWarp",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "text": "REM\nOCN",
        "textColor": "#FFFFFF",
        "fontFamily": "Passion One",
        "fontUrl": "https://fonts.googleapis.com/css2?family=Passion+One:wght@700&display=block",
        "fontWeight": 700,
        "fontSize": 107.1,
        "leading": 70,
        "tracking": -21,
        "layerScale": 480,
        "positionX": 960,
        "positionY": 540,
        "compWidth": 1920,
        "compHeight": 1080,
        "meshRows": 2,
        "meshColumns": 4,
        "colRestX": 960,
        "colRightX": 1255,
        "colLeftX": 678,
        "rowRestY": 540,
        "rowDownY": 850,
        "rowUpY": 387,
        "keyframeStride": 20,
        "easingBezier": [
          0.3,
          0.74,
          0.09,
          1
        ],
        "resampleStep": 4
      }
    },
    "controls": [
      {
        "group": "Kinetic Warp (remocn) (whole clip) • set compWidth/compHeight to the composition size (1920×1080 default)",
        "items": [
          {
            "key": "text",
            "label": "TEXT (new line = next row)",
            "kind": "multiline",
            "keyframable": false
          },
          {
            "key": "textColor",
            "label": "TEXT COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "fontFamily",
            "label": "FONT FAMILY (canvas)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontUrl",
            "label": "FONT CSS URL (blank = local font)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "fontSize",
            "label": "LAYER FONT SIZE (before layerScale)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 400,
            "step": 0.1
          },
          {
            "key": "leading",
            "label": "LEADING",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "tracking",
            "label": "TRACKING (1/1000 em)",
            "kind": "range",
            "keyframable": false,
            "min": -200,
            "max": 200,
            "step": 1
          },
          {
            "key": "layerScale",
            "label": "LAYER SCALE %",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 1200,
            "step": 1
          },
          {
            "key": "positionX",
            "label": "CENTRE X",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3840,
            "step": 1
          },
          {
            "key": "positionY",
            "label": "CENTRE Y",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3840,
            "step": 1
          },
          {
            "key": "compWidth",
            "label": "CANVAS WIDTH (= composition)",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 3840,
            "step": 1
          },
          {
            "key": "compHeight",
            "label": "CANVAS HEIGHT (= composition)",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 3840,
            "step": 1
          },
          {
            "key": "meshRows",
            "label": "MESH ROWS",
            "kind": "range",
            "keyframable": false,
            "min": 2,
            "max": 12,
            "step": 1
          },
          {
            "key": "meshColumns",
            "label": "MESH COLUMNS",
            "kind": "range",
            "keyframable": false,
            "min": 2,
            "max": 12,
            "step": 1
          },
          {
            "key": "colRestX",
            "label": "COLUMN REST X",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3840,
            "step": 1
          },
          {
            "key": "colRightX",
            "label": "COLUMN RIGHT X (kf 2–3)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3840,
            "step": 1
          },
          {
            "key": "colLeftX",
            "label": "COLUMN LEFT X (kf 4–5)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3840,
            "step": 1
          },
          {
            "key": "rowRestY",
            "label": "ROW REST Y",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3840,
            "step": 1
          },
          {
            "key": "rowDownY",
            "label": "ROW DOWN Y (kf 3–4)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3840,
            "step": 1
          },
          {
            "key": "rowUpY",
            "label": "ROW UP Y (kf 5)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3840,
            "step": 1
          },
          {
            "key": "keyframeStride",
            "label": "FRAMES BETWEEN KEYFRAMES",
            "kind": "range",
            "keyframable": false,
            "min": 2,
            "max": 120,
            "step": 1
          },
          {
            "key": "easingBezier",
            "label": "EASING BEZIER [x1,y1,x2,y2]",
            "kind": "numlist",
            "keyframable": false
          },
          {
            "key": "resampleStep",
            "label": "RESAMPLE STEP px (lower = smoother, slower)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 32,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic4",
      "style": "warp"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 120,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_staggered_fade_up",
    "componentName": "StaggeredFadeUp",
    "name": "Staggered Fade Up (remocn)",
    "desc": "remocn • words slide up and fade in sequentially (12 frames each, staggerDelay apart) • paints a white background",
    "icon": "🌊",
    "tab": "community",
    "external": {
      "importPath": "./community/staggered-fade-up",
      "exportName": "StaggeredFadeUp",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "text": "Ship videos faster",
        "staggerDelay": 4,
        "distance": 30,
        "fontSize": 108,
        "fontWeight": 600,
        "color": "#171717",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Staggered Fade Up (remocn) (whole clip) • entrance only; paints its own white background",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "staggerDelay",
            "label": "STAGGER (frames per word)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 20,
            "step": 1
          },
          {
            "key": "distance",
            "label": "RISE px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 200,
            "step": 1
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic4",
      "style": "sfu"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 60
  },
  {
    "id": "remocn_mask_reveal_up",
    "componentName": "MaskRevealUp",
    "name": "Mask Reveal Up (remocn)",
    "desc": "remocn • lines rise in with a soft blur (3f stagger), hold, then rise and blur out at the end of the layer • transparent",
    "icon": "🆙",
    "tab": "community",
    "external": {
      "importPath": "./community/mask-reveal-up",
      "exportName": "MaskRevealUp",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "text": "Designed to move.\nBuilt to focus.",
        "distance": 45,
        "fontSize": 108,
        "fontWeight": 600,
        "color": "#171717",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Mask Reveal Up (remocn) (whole clip) • exit timed from the layer duration; dark text, transparent",
        "items": [
          {
            "key": "text",
            "label": "TEXT (one line per row)",
            "kind": "multiline",
            "keyframable": false
          },
          {
            "key": "distance",
            "label": "RISE px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 200,
            "step": 1
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic4",
      "style": "mask"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 90
  },
  {
    "id": "remocn_tracking_in",
    "componentName": "TrackingIn",
    "name": "Tracking In (remocn)",
    "desc": "remocn • wide letter-spacing collapses and blur clears on a spring (single bold word) • paints a white background",
    "icon": "↔️",
    "tab": "community",
    "external": {
      "importPath": "./community/tracking-in",
      "exportName": "TrackingIn",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "text": "REMOCN",
        "startTracking": 0.5,
        "startBlur": 12,
        "fontSize": 144,
        "fontWeight": 700,
        "color": "#171717",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Tracking In (remocn) (whole clip) • entrance only; paints its own white background",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "startTracking",
            "label": "START TRACKING (em)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 2,
            "step": 0.01
          },
          {
            "key": "startBlur",
            "label": "START BLUR px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 40,
            "step": 1
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 400,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic4",
      "style": "track"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 60
  },
  {
    "id": "remocn_inline_highlight",
    "componentName": "InlineHighlight",
    "name": "Inline Highlight (remocn)",
    "desc": "remocn • one word inside a sentence shifts from the base colour to a brand colour (20–70% of the layer) • paints a white background",
    "icon": "🟠",
    "tab": "community",
    "external": {
      "importPath": "./community/inline-highlight",
      "exportName": "InlineHighlight",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "before": "Ship faster with ",
        "highlight": "remocn",
        "after": "",
        "baseColor": "#171717",
        "highlightColor": "#ff5e3a",
        "fontSize": 72,
        "fontWeight": 600,
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Inline Highlight (remocn) (whole clip) • colour shift timed from the layer duration; paints its own white background",
        "items": [
          {
            "key": "before",
            "label": "BEFORE",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "highlight",
            "label": "HIGHLIGHTED WORD",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "after",
            "label": "AFTER",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "baseColor",
            "label": "BASE COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "highlightColor",
            "label": "HIGHLIGHT COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic4",
      "style": "inline"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 90
  },
  {
    "id": "remocn_marker_highlight",
    "componentName": "MarkerHighlight",
    "name": "Marker Highlight (remocn)",
    "desc": "remocn • a marker block springs in behind a phrase from frame 15 while its text colour shifts • paints a white background",
    "icon": "🖍️",
    "tab": "community",
    "external": {
      "importPath": "./community/marker-highlight",
      "exportName": "MarkerHighlight",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "before": "Ship it ",
        "highlight": "fast",
        "after": ".",
        "markerColor": "#facc15",
        "baseColor": "#171717",
        "highlightedTextColor": "#171717",
        "fontSize": 108,
        "fontWeight": 600,
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Marker Highlight (remocn) (whole clip) • paints its own white background",
        "items": [
          {
            "key": "before",
            "label": "BEFORE",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "highlight",
            "label": "HIGHLIGHTED PHRASE",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "after",
            "label": "AFTER",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "markerColor",
            "label": "MARKER COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "baseColor",
            "label": "BASE COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "highlightedTextColor",
            "label": "HIGHLIGHTED TEXT COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic4",
      "style": "marker"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 60
  },
  {
    "id": "remocn_ink_underline",
    "componentName": "InkUnderline",
    "name": "Ink Underline (remocn)",
    "desc": "remocn • a hand-dragged ink brush stroke draws itself across in stop-motion poses (durationSteps × step frames) • transparent, sits under a title",
    "icon": "🖌️",
    "tab": "community",
    "external": {
      "importPath": "./community/ink-underline",
      "exportName": "InkUnderline",
      "sizeMode": "props"
    },
    "defaults": {
      "baseX": 645,
      "baseY": 620,
      "customProperties": {
        "width": 630,
        "height": 18,
        "color": "#6f7f35",
        "thickness": 14,
        "pressure": 1,
        "release": 0.15,
        "grain": 1,
        "delay": 0,
        "durationSteps": 5,
        "seed": "ink",
        "step": 3
      }
    },
    "controls": [
      {
        "group": "Ink Underline (whole clip) • box width = stroke length; place it under your text",
        "items": [
          {
            "key": "width",
            "label": "STROKE LENGTH px (box width)",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 3000,
            "step": 1
          },
          {
            "key": "thickness",
            "label": "THICKNESS px",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 60,
            "step": 0.5
          },
          {
            "key": "color",
            "label": "INK COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "pressure",
            "label": "LANDING PRESSURE",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 2,
            "step": 0.01
          },
          {
            "key": "release",
            "label": "LIFT-OFF PRESSURE (low = dry tail)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 2,
            "step": 0.01
          },
          {
            "key": "grain",
            "label": "GRAIN (0 = clean edges)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3,
            "step": 0.05
          },
          {
            "key": "delay",
            "label": "DELAY (frames)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "durationSteps",
            "label": "DRAG POSES",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 30,
            "step": 1
          },
          {
            "key": "step",
            "label": "FRAMES PER POSE",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 12,
            "step": 1
          },
          {
            "key": "seed",
            "label": "SEED (same seed = same stroke)",
            "kind": "text",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "inkunderline"
    },
    "defaultDurationInFrames": 60
  },
  {
    "id": "remocn_rolling_number",
    "componentName": "RollingNumber",
    "name": "Rolling Number (remocn)",
    "desc": "remocn • odometer: every digit place rolls at its own speed and lands exactly on the target over 80% of the layer • transparent",
    "icon": "🔢",
    "tab": "community",
    "external": {
      "importPath": "./community/rolling-number",
      "exportName": "RollingNumber",
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
        "height": 1080,
        "from": 0,
        "to": 24813,
        "fontSize": 180,
        "color": "#171717",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Rolling Number (remocn) (whole clip) • count timed from the layer duration",
        "items": [
          {
            "key": "from",
            "label": "FROM (integer ≥ 0)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1000000000,
            "step": 1
          },
          {
            "key": "to",
            "label": "TO (integer ≥ 0)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1000000000,
            "step": 1
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 400,
            "step": 1
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic5",
      "style": "rolling"
    },
    "defaultDurationInFrames": 150,
    "fullFrame": true
  },
  {
    "id": "remocn_rolodex_flip",
    "componentName": "RolodexFlip",
    "name": "Rolodex Flip (remocn)",
    "desc": "remocn • a word cycles through a list with a 3D rolodex card flip; the last value stays • transparent inline text",
    "icon": "📇",
    "tab": "community",
    "external": {
      "importPath": "./community/rolodex-flip",
      "exportName": "RolodexFlip",
      "sizeMode": "none",
      "omitProps": [
        "fontSize",
        "color",
        "fontWeight",
        "fontFamily"
      ],
      "styleMap": {
        "fontSize": "fontSize",
        "color": "color",
        "fontWeight": "fontWeight",
        "fontFamily": "fontFamily"
      },
      "layerStyle": {
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center",
        "fontFamily": "var(--font-geist-sans)"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "items": [
          "button",
          "dialog",
          "command",
          "tabs",
          "chart-area"
        ],
        "from": 0,
        "interval": 20,
        "flipDuration": 10,
        "fontSize": 96,
        "fontWeight": 600,
        "color": "#171717",
        "fontFamily": "var(--font-geist-sans)"
      }
    },
    "controls": [
      {
        "group": "Rolodex Flip (remocn) (whole clip) • centred in the box",
        "items": [
          {
            "key": "items",
            "label": "ITEMS (JSON array of strings)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "from",
            "label": "FIRST FLIP AT (frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "interval",
            "label": "INTERVAL (frames per value)",
            "kind": "range",
            "keyframable": false,
            "min": 2,
            "max": 120,
            "step": 1
          },
          {
            "key": "flipDuration",
            "label": "FLIP FRAMES",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 60,
            "step": 1
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "fontFamily",
            "label": "FONT FAMILY",
            "kind": "text",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic5",
      "style": "rolodex"
    },
    "defaultDurationInFrames": 110,
    "fullFrame": true
  },
  {
    "id": "remocn_value_swap",
    "componentName": "ValueSwap",
    "name": "Value Swap (remocn)",
    "desc": "remocn • swaps a value in place with a vertical slide at exact frames (before → after, status, price) • transparent inline text",
    "icon": "🔃",
    "tab": "community",
    "external": {
      "importPath": "./community/value-swap",
      "exportName": "ValueSwap",
      "sizeMode": "none",
      "omitProps": [
        "fontSize",
        "color",
        "fontWeight",
        "fontFamily"
      ],
      "styleMap": {
        "fontSize": "fontSize",
        "color": "color",
        "fontWeight": "fontWeight",
        "fontFamily": "fontFamily"
      },
      "layerStyle": {
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center",
        "fontFamily": "var(--font-geist-sans)"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "values": [
          "$99",
          "$199"
        ],
        "at": [
          45
        ],
        "duration": 10,
        "distance": 18,
        "direction": "up",
        "fontSize": 96,
        "fontWeight": 600,
        "color": "#171717",
        "fontFamily": "var(--font-geist-sans)"
      }
    },
    "controls": [
      {
        "group": "Value Swap (remocn) (whole clip) • centred in the box",
        "items": [
          {
            "key": "values",
            "label": "VALUES (JSON array, 2+)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "at",
            "label": "SWAP FRAMES (JSON array, one per swap)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "duration",
            "label": "SWAP FRAMES LONG",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 60,
            "step": 1
          },
          {
            "key": "distance",
            "label": "SLIDE px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 200,
            "step": 1
          },
          {
            "key": "direction",
            "label": "DIRECTION",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "up",
                "Up"
              ],
              [
                "down",
                "Down"
              ]
            ]
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 300,
            "step": 1
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "fontFamily",
            "label": "FONT FAMILY",
            "kind": "text",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic5",
      "style": "swap"
    },
    "defaultDurationInFrames": 100,
    "fullFrame": true
  },
  {
    "id": "remocn_infinite_marquee",
    "componentName": "InfiniteMarquee",
    "name": "Infinite Marquee (remocn)",
    "desc": "remocn • continuously scrolling horizontal text strip that loops seamlessly (filled or outlined) • transparent",
    "icon": "📜",
    "tab": "community",
    "external": {
      "importPath": "./community/infinite-marquee",
      "exportName": "InfiniteMarquee",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "text": "ship · build · animate · ",
        "fontSize": 180,
        "color": "#171717",
        "fontWeight": 900,
        "pixelsPerFrame": 6,
        "stroke": false,
        "strokeColor": "#171717",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Infinite Marquee (remocn) (whole clip) • loops for the whole layer",
        "items": [
          {
            "key": "text",
            "label": "TEXT (include trailing spacing)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 400,
            "step": 1
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "pixelsPerFrame",
            "label": "SPEED px/frame",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 40,
            "step": 0.5
          },
          {
            "key": "stroke",
            "label": "OUTLINED",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "strokeColor",
            "label": "STROKE COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic5",
      "style": "marquee"
    },
    "defaultDurationInFrames": 180,
    "fullFrame": true
  },
  {
    "id": "remocn_perspective_marquee",
    "componentName": "PerspectiveMarquee",
    "name": "Perspective Marquee (remocn)",
    "desc": "remocn • 3D-tilted infinite marquee with depth-of-field blur and edge fades in fadeColor • pair with a matching dark background",
    "icon": "🎞️",
    "tab": "community",
    "external": {
      "importPath": "./community/perspective-marquee",
      "exportName": "PerspectiveMarquee",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "items": [
          "Vercel",
          "Linear",
          "Stripe",
          "Figma",
          "Notion",
          "Raycast",
          "Arc",
          "Cursor"
        ],
        "fontSize": 84,
        "color": "#fafafa",
        "fontWeight": 700,
        "pixelsPerFrame": 2,
        "rotateY": -28,
        "rotateX": 8,
        "perspective": 1200,
        "fadeColor": "#050505",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Perspective Marquee (remocn) (whole clip) • 1280×720 layout at scale 1.5; edges fade into fadeColor",
        "items": [
          {
            "key": "items",
            "label": "ITEMS (JSON array)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE (720p px)",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 300,
            "step": 1
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "pixelsPerFrame",
            "label": "SPEED px/frame",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 20,
            "step": 0.5
          },
          {
            "key": "rotateY",
            "label": "ROTATE Y°",
            "kind": "range",
            "keyframable": false,
            "min": -80,
            "max": 80,
            "step": 1
          },
          {
            "key": "rotateX",
            "label": "ROTATE X°",
            "kind": "range",
            "keyframable": false,
            "min": -60,
            "max": 60,
            "step": 1
          },
          {
            "key": "perspective",
            "label": "PERSPECTIVE px",
            "kind": "range",
            "keyframable": false,
            "min": 200,
            "max": 4000,
            "step": 10
          },
          {
            "key": "fadeColor",
            "label": "EDGE FADE COLOR (= background)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic5",
      "style": "pmarquee"
    },
    "defaultDurationInFrames": 240
  },
  {
    "id": "remocn_matrix_decode",
    "componentName": "MatrixDecode",
    "name": "Matrix Decode (remocn)",
    "desc": "remocn • random glyph scramble resolves left-to-right into the target text over revealDuration • paints a white background",
    "icon": "🧬",
    "tab": "community",
    "external": {
      "importPath": "./community/matrix-decode",
      "exportName": "MatrixDecode",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "text": "ACCESS GRANTED",
        "charset": "!@#$%^&*()_+-=<>?/\\|",
        "fontSize": 108,
        "color": "#22c55e",
        "fontWeight": 600,
        "revealDuration": 60,
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Matrix Decode (remocn) (whole clip) • paints its own white background",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "charset",
            "label": "SCRAMBLE CHARSET",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 300,
            "step": 1
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "revealDuration",
            "label": "REVEAL FRAMES",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 300,
            "step": 1
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic5",
      "style": "matrix"
    },
    "defaultDurationInFrames": 90,
    "fullFrame": true
  },
  {
    "id": "remocn_rgb_glitch_text",
    "componentName": "RGBGlitchText",
    "name": "RGB Glitch Text (remocn)",
    "desc": "remocn • three RGB-offset copies jitter for a few frames (glitchAt, glitchDuration) — a deterministic chromatic glitch • paints a #fafafa background",
    "icon": "📺",
    "tab": "community",
    "external": {
      "importPath": "./community/rgb-glitch-text",
      "exportName": "RGBGlitchText",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "text": "SYSTEM",
        "fontSize": 144,
        "color": "#171717",
        "fontWeight": 700,
        "glitchAt": 20,
        "glitchDuration": 8,
        "intensity": 9,
        "seed": "glitch",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "RGB Glitch Text (remocn) (whole clip) • paints its own #fafafa background",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 400,
            "step": 1
          },
          {
            "key": "color",
            "label": "COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "glitchAt",
            "label": "GLITCH AT (frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "glitchDuration",
            "label": "GLITCH FRAMES",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 60,
            "step": 1
          },
          {
            "key": "intensity",
            "label": "INTENSITY px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 60,
            "step": 1
          },
          {
            "key": "seed",
            "label": "SEED",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic5",
      "style": "glitch"
    },
    "defaultDurationInFrames": 90,
    "fullFrame": true
  },
  {
    "id": "remocn_gooey_morph",
    "componentName": "GooeyMorph",
    "name": "Gooey Morph (remocn)",
    "desc": "remocn • four bars fly in Tetris-style, land in a row and melt into a word through a gooey blur-threshold morph (frames 50–76) • transparent",
    "icon": "🫠",
    "tab": "community",
    "external": {
      "importPath": "./community/gooey-morph",
      "exportName": "GooeyMorph",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "word": "HELLO",
        "fill": "#ffffff",
        "fontFamily": "sans-serif",
        "fontSize": 237,
        "tracking": 0,
        "wordCenterX": 961.4,
        "wordBaselineY": 601.3,
        "barWidth": 213,
        "barHeight": 181,
        "barEntryFrames": [
          8,
          0,
          4,
          13
        ],
        "barTravelFrames": 30,
        "morphStartFrame": 50,
        "morphPeakFrame": 63,
        "morphEndFrame": 76,
        "blurRadius": 6,
        "blurIterations": 6,
        "alphaInputBlack": 0.4588,
        "alphaInputWhite": 0.5098,
        "displaceAmount": 20,
        "displaceSize": 19,
        "displaceComplexity": 1,
        "displaceEvolutionPerSecond": 50
      }
    },
    "controls": [
      {
        "group": "Gooey Morph (remocn) (whole clip) • 1920×1080 design space, letterboxed on other aspects",
        "items": [
          {
            "key": "word",
            "label": "WORD",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fill",
            "label": "FILL",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "fontFamily",
            "label": "FONT FAMILY (heavy faces melt best)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 40,
            "max": 600,
            "step": 1
          },
          {
            "key": "tracking",
            "label": "TRACKING",
            "kind": "range",
            "keyframable": false,
            "min": -50,
            "max": 100,
            "step": 1
          },
          {
            "key": "wordCenterX",
            "label": "WORD CENTRE X",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1920,
            "step": 0.1
          },
          {
            "key": "wordBaselineY",
            "label": "WORD BASELINE Y",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1080,
            "step": 0.1
          },
          {
            "key": "barWidth",
            "label": "BAR WIDTH",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 600,
            "step": 1
          },
          {
            "key": "barHeight",
            "label": "BAR HEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 600,
            "step": 1
          },
          {
            "key": "barStartPositions",
            "label": "BAR START POSITIONS [[x,y]×4]",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "barRestPositions",
            "label": "BAR REST POSITIONS [[x,y]×4]",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "barEntryFrames",
            "label": "BAR ENTRY FRAMES [n×4]",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "barTravelFrames",
            "label": "BAR TRAVEL FRAMES",
            "kind": "range",
            "keyframable": false,
            "min": 2,
            "max": 120,
            "step": 1
          },
          {
            "key": "morphStartFrame",
            "label": "MORPH START",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "morphPeakFrame",
            "label": "MORPH PEAK",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "morphEndFrame",
            "label": "MORPH END",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "blurRadius",
            "label": "GOO BLUR RADIUS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 40,
            "step": 0.5
          },
          {
            "key": "blurIterations",
            "label": "BLUR ITERATIONS",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 12,
            "step": 1
          },
          {
            "key": "alphaInputBlack",
            "label": "ALPHA THRESHOLD LOW",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.0001
          },
          {
            "key": "alphaInputWhite",
            "label": "ALPHA THRESHOLD HIGH",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.0001
          },
          {
            "key": "displaceAmount",
            "label": "DISPLACE px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 100,
            "step": 1
          },
          {
            "key": "displaceSize",
            "label": "DISPLACE SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 200,
            "step": 1
          },
          {
            "key": "displaceComplexity",
            "label": "NOISE OCTAVES",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 6,
            "step": 1
          },
          {
            "key": "displaceEvolutionPerSecond",
            "label": "NOISE PAN / s",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 300,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic6",
      "style": "gooey"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 90
  },
  {
    "id": "remocn_perspective_squeeze",
    "componentName": "PerspectiveSqueeze",
    "name": "Perspective Squeeze (remocn)",
    "desc": "remocn • two lines of heavy type trade height endlessly while a corner-pin bends the stack into receding planes (225-frame loop) • transparent",
    "icon": "🗜️",
    "tab": "community",
    "external": {
      "importPath": "./community/perspective-squeeze",
      "exportName": "PerspectiveSqueeze",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "upperText": "REMOCN",
        "lowerText": "BEST",
        "upperFontFamily": "Impact, 'Arial Narrow', sans-serif",
        "lowerFontFamily": "Impact, 'Arial Narrow', sans-serif",
        "upperFontSize": 603,
        "lowerFontSize": 124,
        "fill": "#ffffff",
        "blockWidth": 990,
        "blockHeight": 546,
        "upperBlockPosition": [
          960,
          314
        ],
        "lowerBlockPosition": [
          960,
          860
        ],
        "cornerKeyframes": [
          0,
          45,
          70
        ],
        "scaleKeyframes": [
          0,
          60,
          118,
          161,
          196,
          225
        ],
        "upperScaleY": [
          100,
          35.8,
          64,
          45,
          110,
          100
        ],
        "lowerScaleY": [
          100,
          384.8,
          270,
          330,
          150,
          100
        ],
        "capRatio": 0.65,
        "lineGap": 50
      }
    },
    "controls": [
      {
        "group": "Perspective Squeeze (remocn) (whole clip) • stage scales to fit any composition",
        "items": [
          {
            "key": "upperText",
            "label": "UPPER TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "lowerText",
            "label": "LOWER TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "upperFontFamily",
            "label": "UPPER FONT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "lowerFontFamily",
            "label": "LOWER FONT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "upperFontSize",
            "label": "UPPER FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 1200,
            "step": 1
          },
          {
            "key": "lowerFontSize",
            "label": "LOWER FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 1200,
            "step": 1
          },
          {
            "key": "fill",
            "label": "FILL",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "blockWidth",
            "label": "BLOCK WIDTH",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 1920,
            "step": 1
          },
          {
            "key": "blockHeight",
            "label": "BLOCK HEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 1080,
            "step": 1
          },
          {
            "key": "upperBlockPosition",
            "label": "UPPER BLOCK CENTRE [x,y]",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "lowerBlockPosition",
            "label": "LOWER BLOCK CENTRE [x,y]",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "cornerKeyframes",
            "label": "CORNER KEYFRAMES [3]",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "upperCornersMid",
            "label": "UPPER CORNERS MID [[x,y]×4]",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "upperCornersEnd",
            "label": "UPPER CORNERS END",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "lowerCornersMid",
            "label": "LOWER CORNERS MID",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "lowerCornersEnd",
            "label": "LOWER CORNERS END",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "scaleKeyframes",
            "label": "SQUISH KEYFRAMES",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "upperScaleY",
            "label": "UPPER SCALE Y % per keyframe",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "lowerScaleY",
            "label": "LOWER SCALE Y % per keyframe",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "capRatio",
            "label": "CAP RATIO",
            "kind": "range",
            "keyframable": false,
            "min": 0.3,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "lineGap",
            "label": "LINE GAP",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 300,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic6",
      "style": "squeeze"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 225
  },
  {
    "id": "remocn_extrude_pop",
    "componentName": "ExtrudePop",
    "name": "Extrude Pop (remocn)",
    "desc": "remocn • a flat word pops up off the plane on a solid coloured extruded body (frames 0–48, eases out and holds) • transparent",
    "icon": "🧱",
    "tab": "community",
    "external": {
      "importPath": "./community/extrude-pop",
      "exportName": "ExtrudePop",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "letter": "WIN",
        "bodyColor": "#e8192b",
        "faceColor": "#ffffff",
        "fontFamily": "'Helvetica Neue', Helvetica, Arial, sans-serif",
        "fontWeight": 700,
        "fontSize": 603,
        "maxTextWidth": 1660,
        "basePosition": [
          959.2,
          752.5
        ],
        "minimaxRadius": 80,
        "extrudeAngleDeg": -58.6,
        "extrudeSteps": 200,
        "extrudeStartFrame": 0,
        "extrudeEndFrame": 48
      }
    },
    "controls": [
      {
        "group": "Extrude Pop (remocn) (whole clip) • 1920×1080 design space",
        "items": [
          {
            "key": "letter",
            "label": "TEXT (one short word)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "bodyColor",
            "label": "BODY COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "faceColor",
            "label": "FACE COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "fontFamily",
            "label": "FONT FAMILY",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontWeight",
            "label": "FONT WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 40,
            "max": 1200,
            "step": 1
          },
          {
            "key": "maxTextWidth",
            "label": "MAX TEXT WIDTH (auto-shrink)",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 1900,
            "step": 1
          },
          {
            "key": "basePosition",
            "label": "BASELINE ANCHOR [x,y]",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "minimaxRadius",
            "label": "DEPTH RADIUS (depth = 2×)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 300,
            "step": 1
          },
          {
            "key": "extrudeAngleDeg",
            "label": "EXTRUDE ANGLE°",
            "kind": "range",
            "keyframable": false,
            "min": -180,
            "max": 180,
            "step": 0.1
          },
          {
            "key": "extrudeSteps",
            "label": "BODY COPIES",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 400,
            "step": 1
          },
          {
            "key": "extrudeStartFrame",
            "label": "POP START",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "extrudeEndFrame",
            "label": "POP END",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 600,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic6",
      "style": "extrude"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 60
  },
  {
    "id": "remocn_chromatic_wave",
    "componentName": "ChromaticWave",
    "name": "Chromatic Wave (remocn)",
    "desc": "remocn • a soft wave travels down through the type, rippling it into RGB fringes that settle back to white • paints its own (dark) background",
    "icon": "🌈",
    "tab": "community",
    "external": {
      "importPath": "./community/chromatic-wave",
      "exportName": "ChromaticWave",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "headline": "MUSIC",
        "kicker": "APPLES",
        "headlineFontSize": 174,
        "kickerFontSize": 52,
        "kickerTracking": 32,
        "headlineBaselineY": 601,
        "kickerBaselines": [
          444,
          670
        ],
        "textCenterX": 960,
        "fill": "#ffffff",
        "background": "#000000",
        "bandHeight": 147.1,
        "bandCopies": 7,
        "bandPitch": 750,
        "mapStartY": 31,
        "mapEndY": 1560,
        "mapTravelFrames": 150,
        "waveHeight": 28,
        "waveWidth": 272,
        "waveSpeed": 1,
        "turbulentAmount": 130,
        "turbulentSize": 163,
        "evolutionPerSecond": 50,
        "mapBlurRadius": 13,
        "mapBlurIterations": 6,
        "glassDisplacement": 100,
        "maxDisplacementPx": 39,
        "glassPasses": 3,
        "channelOrder": [
          "blue",
          "green",
          "red"
        ]
      }
    },
    "controls": [
      {
        "group": "Chromatic Wave (remocn) (whole clip) • owns its background; keep it dark",
        "items": [
          {
            "key": "headline",
            "label": "HEADLINE",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "kicker",
            "label": "KICKER (above + below)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "headlineFontFamily",
            "label": "HEADLINE FONT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "kickerFontFamily",
            "label": "KICKER FONT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "headlineFontSize",
            "label": "HEADLINE SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 600,
            "step": 1
          },
          {
            "key": "kickerFontSize",
            "label": "KICKER SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "kickerTracking",
            "label": "KICKER TRACKING",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 120,
            "step": 1
          },
          {
            "key": "headlineBaselineY",
            "label": "HEADLINE BASELINE Y",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1080,
            "step": 1
          },
          {
            "key": "kickerBaselines",
            "label": "KICKER BASELINES [top, bottom]",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "textCenterX",
            "label": "TEXT CENTRE X",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1920,
            "step": 1
          },
          {
            "key": "fill",
            "label": "TEXT COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "background",
            "label": "BACKGROUND (keep dark)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "bandHeight",
            "label": "BAND HEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 600,
            "step": 0.1
          },
          {
            "key": "bandCopies",
            "label": "BAND COPIES",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 20,
            "step": 1
          },
          {
            "key": "bandPitch",
            "label": "BAND PITCH",
            "kind": "range",
            "keyframable": false,
            "min": 50,
            "max": 2000,
            "step": 1
          },
          {
            "key": "mapStartY",
            "label": "MAP START Y",
            "kind": "range",
            "keyframable": false,
            "min": -2000,
            "max": 2000,
            "step": 1
          },
          {
            "key": "mapEndY",
            "label": "MAP END Y",
            "kind": "range",
            "keyframable": false,
            "min": -2000,
            "max": 4000,
            "step": 1
          },
          {
            "key": "mapTravelFrames",
            "label": "MAP TRAVEL FRAMES",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 600,
            "step": 1
          },
          {
            "key": "waveHeight",
            "label": "WAVE HEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 200,
            "step": 1
          },
          {
            "key": "waveWidth",
            "label": "WAVE WIDTH",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 1000,
            "step": 1
          },
          {
            "key": "waveSpeed",
            "label": "WAVE SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "turbulentAmount",
            "label": "TURBULENCE",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 400,
            "step": 1
          },
          {
            "key": "turbulentSize",
            "label": "TURBULENCE SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 600,
            "step": 1
          },
          {
            "key": "evolutionPerSecond",
            "label": "NOISE PAN / s",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 300,
            "step": 1
          },
          {
            "key": "mapBlurRadius",
            "label": "MAP BLUR",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 40,
            "step": 1
          },
          {
            "key": "mapBlurIterations",
            "label": "MAP BLUR ITERATIONS",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 12,
            "step": 1
          },
          {
            "key": "glassDisplacement",
            "label": "GLASS DISPLACEMENT %",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 300,
            "step": 1
          },
          {
            "key": "maxDisplacementPx",
            "label": "MAX DISPLACEMENT px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 200,
            "step": 1
          },
          {
            "key": "glassPasses",
            "label": "PASSES / CHANNELS",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 3,
            "step": 1
          },
          {
            "key": "channelOrder",
            "label": "CHANNEL ORDER [\"blue\",\"green\",\"red\"]",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic6",
      "style": "chroma"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150
  },
  {
    "id": "remocn_stretch_in",
    "componentName": "StretchIn",
    "name": "Stretch In (remocn)",
    "desc": "remocn • letters fly in from off-canvas right and smear horizontally (vertex-lag deformation of real glyph outlines via opentype.js) • transparent",
    "icon": "↔️",
    "tab": "community",
    "external": {
      "importPath": "./community/stretch-in",
      "exportName": "StretchIn",
      "packages": [
        "opentype.js"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "text": "REMOCN",
        "fontUrl": "https://fonts.gstatic.com/s/anton/v27/1Ptgg87LROyAm0K0.ttf",
        "fontSize": 510,
        "letterSpacing": 0,
        "fill": "#ffffff",
        "strokeWidth": 0,
        "stroke": "#ffffff",
        "entryStart": 0,
        "entryStagger": 3,
        "travelFrames": 33,
        "travelDistance": 1500,
        "vertexLagFrames": 3.5,
        "curveSteps": 8
      }
    },
    "controls": [
      {
        "group": "Stretch In (remocn) (whole clip) • needs the font file at render time",
        "items": [
          {
            "key": "text",
            "label": "TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontUrl",
            "label": "FONT FILE URL (.ttf/.otf)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 40,
            "max": 1200,
            "step": 1
          },
          {
            "key": "letterSpacing",
            "label": "LETTER SPACING px",
            "kind": "range",
            "keyframable": false,
            "min": -100,
            "max": 300,
            "step": 1
          },
          {
            "key": "fill",
            "label": "FILL (or \"none\")",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "strokeWidth",
            "label": "STROKE WIDTH (wireframe)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 20,
            "step": 0.5
          },
          {
            "key": "stroke",
            "label": "STROKE",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "entryStart",
            "label": "ENTRY START",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "entryStagger",
            "label": "STAGGER (frames per letter)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 20,
            "step": 0.5
          },
          {
            "key": "travelFrames",
            "label": "TRAVEL FRAMES",
            "kind": "range",
            "keyframable": false,
            "min": 2,
            "max": 120,
            "step": 1
          },
          {
            "key": "travelDistance",
            "label": "TRAVEL DISTANCE px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 4000,
            "step": 1
          },
          {
            "key": "vertexLagFrames",
            "label": "SMEAR (trailing-edge lag frames)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 20,
            "step": 0.5
          },
          {
            "key": "curveSteps",
            "label": "CURVE STEPS",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 32,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "kinetic6",
      "style": "stretch"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 60,
    "renderTimeoutMs": 90000
  },
  {
    "id": "remocn_search_reveal",
    "componentName": "SearchReveal",
    "name": "Search Reveal (remocn)",
    "desc": "remocn • construction circles expand into a search field that types your product name, then reveals a purple graphic panel • paints its own background",
    "icon": "🔍",
    "tab": "community",
    "external": {
      "importPath": "./community/search-reveal",
      "exportName": "SearchReveal",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "text": "remocn",
        "fieldWidth": 464,
        "fontSize": 34,
        "framesPerCharacter": 4,
        "showPanel": true,
        "showGuides": true,
        "color": "#26232b",
        "fieldColor": "#ffffff",
        "ringColor": "#cbc5cf",
        "panelColor": "#a800b7",
        "accentColor": "#e8f99a",
        "backgroundColor": "#f5f1f5",
        "reducedMotion": false
      }
    },
    "controls": [
      {
        "group": "Search Reveal (remocn) (whole clip) • scales its own 1280×720 stage to the composition",
        "items": [
          {
            "key": "text",
            "label": "SEARCH TEXT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fieldWidth",
            "label": "FIELD WIDTH (720p, 320–640)",
            "kind": "range",
            "keyframable": false,
            "min": 320,
            "max": 640,
            "step": 1
          },
          {
            "key": "fontSize",
            "label": "MAX FONT SIZE (18–54)",
            "kind": "range",
            "keyframable": false,
            "min": 18,
            "max": 54,
            "step": 1
          },
          {
            "key": "framesPerCharacter",
            "label": "FRAMES PER CHARACTER",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 12,
            "step": 1
          },
          {
            "key": "showPanel",
            "label": "SHOW GRAPHIC PANEL",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "showGuides",
            "label": "SHOW GUIDES",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "color",
            "label": "TEXT / CARET",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "fieldColor",
            "label": "FIELD",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "ringColor",
            "label": "RINGS / GUIDES",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "panelColor",
            "label": "PANEL",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "accentColor",
            "label": "ACCENTS",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "backgroundColor",
            "label": "BACKGROUND",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "reducedMotion",
            "label": "REDUCED MOTION (static final pose)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiblock",
      "style": "search"
    },
    "defaultDurationInFrames": 108,
    "fullFrame": true
  },
  {
    "id": "remocn_glass_code_block",
    "componentName": "GlassCodeBlock",
    "name": "Glass Code Block (remocn)",
    "desc": "remocn • frosted-glass code editor window with a regex tokenizer and line-by-line stagger reveal • transparent (glass refracts what is behind it)",
    "icon": "🧊",
    "tab": "community",
    "external": {
      "importPath": "./community/glass-code-block",
      "exportName": "GlassCodeBlock",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "speed": 1,
        "code": "export function Hero() {\n  const frame = useCurrentFrame();\n  const opacity = frame / 30;\n  return <h1 style={{ opacity }}>Hello</h1>;\n}",
        "title": "hero.tsx",
        "fontSize": 16,
        "glassColor": "rgba(10, 10, 10, 0.6)",
        "staggerFrames": 4,
        "showTrafficLights": true,
        "aura": false
      }
    },
    "controls": [
      {
        "group": "Glass Code Block (remocn) (whole clip) • 1280×720 layout at scale 1.5; window 760×460",
        "items": [
          {
            "key": "code",
            "label": "CODE",
            "kind": "multiline",
            "keyframable": false
          },
          {
            "key": "title",
            "label": "FILE NAME",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE (720p px)",
            "kind": "range",
            "keyframable": false,
            "min": 8,
            "max": 40,
            "step": 1
          },
          {
            "key": "glassColor",
            "label": "GLASS COLOR (keep alpha < 1)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "staggerFrames",
            "label": "STAGGER (frames per line)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 30,
            "step": 1
          },
          {
            "key": "showTrafficLights",
            "label": "TRAFFIC LIGHTS",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "aura",
            "label": "GLOW AURA behind the glass",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiblock",
      "style": "code"
    },
    "defaultDurationInFrames": 180
  },
  {
    "id": "remocn_glass_code_walk",
    "componentName": "GlassCodeWalk",
    "name": "Glass Code Walk (remocn)",
    "desc": "remocn • camera scans a glass code block at 2.6× line by line as it reveals, then pulls back to a centred hold • transparent",
    "icon": "🎥",
    "tab": "community",
    "external": {
      "importPath": "./community/glass-code-walk",
      "exportName": "GlassCodeWalk",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "speed": 1,
        "code": "export function Intro() {\n  return (\n    <AbsoluteFill>\n      <Typewriter text=\"Ship it\" />\n    </AbsoluteFill>\n  );\n}",
        "title": "scene.tsx",
        "fontSize": 18,
        "staggerFrames": 10,
        "zoom": 2.6
      }
    },
    "controls": [
      {
        "group": "Glass Code Walk (remocn) (whole clip) • 1280×720 layout at scale 1.5; window 880×420",
        "items": [
          {
            "key": "code",
            "label": "CODE",
            "kind": "multiline",
            "keyframable": false
          },
          {
            "key": "title",
            "label": "FILE NAME",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE (720p px)",
            "kind": "range",
            "keyframable": false,
            "min": 8,
            "max": 40,
            "step": 1
          },
          {
            "key": "staggerFrames",
            "label": "STAGGER (frames per line)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 40,
            "step": 1
          },
          {
            "key": "zoom",
            "label": "CAMERA ZOOM while scanning",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 6,
            "step": 0.1
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiblock",
      "style": "walk"
    },
    "defaultDurationInFrames": 150
  },
  {
    "id": "remocn_terminal_simulator",
    "componentName": "TerminalSimulator",
    "name": "Terminal Simulator (remocn)",
    "desc": "remocn • console window that types commands and streams logs, rolling older lines off the top • paints its own window",
    "icon": "🖥️",
    "tab": "community",
    "external": {
      "importPath": "./community/terminal-simulator",
      "exportName": "TerminalSimulator",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "speed": 1,
        "lines": [
          {
            "text": "npm run build",
            "type": "command",
            "delay": 0
          },
          {
            "text": "Resolving dependencies...",
            "type": "log",
            "delay": 6
          },
          {
            "text": "> remocn@1.0.0 build",
            "type": "log",
            "delay": 4
          },
          {
            "text": "> next build",
            "type": "log",
            "delay": 4
          },
          {
            "text": "Compiling...",
            "type": "log",
            "delay": 12
          },
          {
            "text": "Compiled successfully in 4.2s",
            "type": "success",
            "delay": 14
          },
          {
            "text": "Generating static pages (24/24)",
            "type": "log",
            "delay": 10
          },
          {
            "text": "Build completed without errors",
            "type": "success",
            "delay": 12
          }
        ],
        "prompt": "$",
        "title": "~/projects/remocn",
        "background": "#0a0a0a",
        "chromeColor": "#1a1a1a",
        "fontSize": 18,
        "charsPerFrame": 1,
        "chunkSize": 1
      }
    },
    "controls": [
      {
        "group": "Terminal Simulator (remocn) (whole clip) • 1280×720 layout at scale 1.5; window 900×480",
        "items": [
          {
            "key": "lines",
            "label": "LINES [{text, type: command|log|success|error, delay?, pause?}]",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "prompt",
            "label": "PROMPT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "title",
            "label": "WINDOW TITLE",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "background",
            "label": "TERMINAL BACKGROUND",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "chromeColor",
            "label": "CHROME BAR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE (720p px)",
            "kind": "range",
            "keyframable": false,
            "min": 8,
            "max": 40,
            "step": 1
          },
          {
            "key": "charsPerFrame",
            "label": "TYPING SPEED (chars/frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0.1,
            "max": 10,
            "step": 0.1
          },
          {
            "key": "chunkSize",
            "label": "CHARS PER STEP",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 20,
            "step": 1
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiblock",
      "style": "term"
    },
    "defaultDurationInFrames": 240
  },
  {
    "id": "remocn_terminal_cursor_zoom",
    "componentName": "TerminalCursorZoom",
    "name": "Terminal Cursor Zoom (remocn)",
    "desc": "remocn • camera locked to the typing cursor at 2.8×, dollying across one command as it types",
    "icon": "🔎",
    "tab": "community",
    "external": {
      "importPath": "./community/terminal-cursor-zoom",
      "exportName": "TerminalCursorZoom",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "speed": 1,
        "command": "npx shadcn add @remocn/terminal-cursor-zoom",
        "zoom": 2.8,
        "fontSize": 20,
        "prompt": "$",
        "title": "~/code/remocn-demo",
        "charsPerFrame": 1,
        "chunkSize": 1
      }
    },
    "controls": [
      {
        "group": "Terminal Cursor Zoom (remocn) (whole clip) • 1280×720 layout at scale 1.5",
        "items": [
          {
            "key": "command",
            "label": "COMMAND",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "zoom",
            "label": "CAMERA ZOOM",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 6,
            "step": 0.1
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE (720p px)",
            "kind": "range",
            "keyframable": false,
            "min": 8,
            "max": 40,
            "step": 1
          },
          {
            "key": "prompt",
            "label": "PROMPT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "title",
            "label": "WINDOW TITLE",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "charsPerFrame",
            "label": "TYPING SPEED (chars/frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0.1,
            "max": 10,
            "step": 0.1
          },
          {
            "key": "chunkSize",
            "label": "CHARS PER STEP",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 20,
            "step": 1
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiblock",
      "style": "zoom"
    },
    "defaultDurationInFrames": 90
  },
  {
    "id": "remocn_animated_line_chart",
    "componentName": "AnimatedLineChart",
    "name": "Animated Line Chart (remocn)",
    "desc": "remocn • a line chart path draws on left to right with a leading dot (over 85% of the layer) • transparent",
    "icon": "📈",
    "tab": "community",
    "external": {
      "importPath": "./community/animated-line-chart",
      "exportName": "AnimatedLineChart",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "speed": 1,
        "data": [
          12,
          19,
          8,
          15,
          22,
          18,
          28,
          25,
          32
        ],
        "strokeColor": "#22c55e",
        "strokeWidth": 4,
        "gridColor": "#27272a",
        "showDot": true
      }
    },
    "controls": [
      {
        "group": "Animated Line Chart (remocn) (whole clip) • 1280×720 layout at scale 1.5; chart 1000×500, draw timed from the layer duration",
        "items": [
          {
            "key": "data",
            "label": "DATA (JSON array of numbers)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "strokeColor",
            "label": "LINE COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "strokeWidth",
            "label": "LINE WIDTH",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 20,
            "step": 0.5
          },
          {
            "key": "gridColor",
            "label": "GRID COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "showDot",
            "label": "LEADING DOT",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiblock",
      "style": "chart"
    },
    "defaultDurationInFrames": 90
  },
  {
    "id": "remocn_animated_bar_chart",
    "componentName": "AnimatedBarChart",
    "name": "Animated Bar Chart (remocn)",
    "desc": "remocn • bars spring up from the baseline in a staggered cascade (optional labels) • transparent",
    "icon": "📊",
    "tab": "community",
    "external": {
      "importPath": "./community/animated-bar-chart",
      "exportName": "AnimatedBarChart",
      "sizeMode": "none",
      "renameProps": {
        "chartWidth": "width",
        "chartHeight": "height"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "data": [
          35,
          60,
          45,
          80,
          55,
          70,
          90,
          65
        ],
        "labels": null,
        "chartWidth": 1000,
        "chartHeight": 500,
        "barColor": "#0ea5e9",
        "gap": 16,
        "staggerFrames": 6,
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Animated Bar Chart (remocn) (whole clip) • 1280×720 layout at scale 1.5; chart centred in the box",
        "items": [
          {
            "key": "data",
            "label": "DATA (JSON array of numbers)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "labels",
            "label": "LABELS (JSON array of strings, or null)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "chartWidth",
            "label": "CHART WIDTH (720p px)",
            "kind": "range",
            "keyframable": false,
            "min": 200,
            "max": 1280,
            "step": 1
          },
          {
            "key": "chartHeight",
            "label": "CHART HEIGHT (720p px)",
            "kind": "range",
            "keyframable": false,
            "min": 150,
            "max": 720,
            "step": 1
          },
          {
            "key": "barColor",
            "label": "BAR COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "gap",
            "label": "GAP px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 80,
            "step": 1
          },
          {
            "key": "staggerFrames",
            "label": "STAGGER (frames per bar)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 30,
            "step": 1
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "paperkit",
      "style": "bars"
    },
    "defaultDurationInFrames": 90
  },
  {
    "id": "remocn_paper_sticker",
    "componentName": "PaperSticker",
    "name": "Paper Sticker (remocn)",
    "desc": "remocn • a paper chip with your label slaps down over two stop-motion poses (oversized, then settled), hand-placed tilt per seed • transparent, centred in its box",
    "icon": "🏷️",
    "tab": "community",
    "external": {
      "importPath": "./community/paper-sticker",
      "exportName": "PaperSticker",
      "sizeMode": "none",
      "layerStyle": {
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center"
      },
      "textChildren": {
        "prop": "label",
        "styleMap": {
          "fontFamily": "fontFamily",
          "fontSize": "fontSize",
          "color": "color",
          "fontWeight": "fontWeight"
        }
      }
    },
    "defaults": {
      "baseX": 600,
      "baseY": 435,
      "scale": 1.5,
      "customProperties": {
        "width": 480,
        "height": 140,
        "label": "remotion",
        "fontFamily": "monospace",
        "fontSize": 28,
        "color": "#26242c",
        "fontWeight": 400,
        "at": 6,
        "seed": "sticker",
        "padding": "10px 16px",
        "background": "#fbfaf6",
        "borderColor": "rgba(38,36,44,0.55)",
        "maxTilt": 2.6,
        "step": 3
      }
    },
    "controls": [
      {
        "group": "Paper Sticker (remocn) (whole clip) • box at scale 1.5 centres the chip; appears one pose after AT, settles one pose later; stagger a group with AT + SEED",
        "items": [
          {
            "key": "label",
            "label": "LABEL",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontFamily",
            "label": "LABEL FONT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "LABEL SIZE (720p px)",
            "kind": "range",
            "keyframable": false,
            "min": 8,
            "max": 120,
            "step": 1
          },
          {
            "key": "color",
            "label": "LABEL COLOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "fontWeight",
            "label": "LABEL WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 900,
            "step": 100
          },
          {
            "key": "at",
            "label": "SLAP AT (frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "seed",
            "label": "SEED (tilt + wobble)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "padding",
            "label": "PADDING (CSS)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "background",
            "label": "PAPER",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "borderColor",
            "label": "PENCIL BORDER (CSS color)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "maxTilt",
            "label": "MAX TILT° (0 = tidy)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 15,
            "step": 0.1
          },
          {
            "key": "step",
            "label": "FRAMES PER POSE",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 12,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "paperkit",
      "style": "sticker"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_polaroid",
    "componentName": "Polaroid",
    "name": "Polaroid (remocn)",
    "desc": "remocn • instant-photo card with a handwritten caption; WRAPPER: wrap layers (image, video, a whole scene) to play inside the photo window • box width = card width",
    "icon": "📷",
    "tab": "community",
    "external": {
      "importPath": "./community/polaroid",
      "exportName": "Polaroid",
      "packages": [
        "@remotion/google-fonts"
      ],
      "sizeMode": "props",
      "children": {
        "fit": "window",
        "window": {
          "w": 0.950920245398773,
          "h": 0.5352760736196319
        }
      }
    },
    "defaults": {
      "baseX": 471,
      "baseY": 220,
      "customProperties": {
        "width": 978,
        "height": 641,
        "caption": "first light",
        "captionAt": 0,
        "frameColor": "#fdfcf8",
        "captionColor": "#26242c",
        "step": 3
      }
    },
    "controls": [
      {
        "group": "Polaroid (remocn) (whole clip) • box width = card width (height ≈ 0.655 × width); everything incl. caption size scales from it; wrapped layers keep composition time",
        "items": [
          {
            "key": "caption",
            "label": "CAPTION (empty = blank band)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "captionAt",
            "label": "CAPTION STARTS (frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "frameColor",
            "label": "CARD STOCK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "captionColor",
            "label": "CAPTION INK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "step",
            "label": "FRAMES PER POSE",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 12,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "paperkit",
      "style": "polaroid"
    },
    "defaultDurationInFrames": 150
  },
  {
    "id": "remocn_check_list",
    "componentName": "CheckList",
    "name": "Check List (remocn)",
    "desc": "remocn • handwritten checklist writes itself out, then ticks and strikes through each done item ({text, checked:false} stays open) • transparent",
    "icon": "✅",
    "tab": "community",
    "external": {
      "importPath": "./community/check-list",
      "exportName": "CheckList",
      "packages": [
        "@remotion/google-fonts"
      ],
      "sizeMode": "props",
      "layerStyle": {
        "display": "flex",
        "alignItems": "center"
      }
    },
    "defaults": {
      "baseX": 345,
      "baseY": 180,
      "scale": 1.5,
      "customProperties": {
        "width": 820,
        "height": 480,
        "items": [
          "Render on your own machine",
          "No watermark, ever",
          "Every component MIT",
          {
            "text": "Ships as source",
            "checked": false
          }
        ],
        "fontSize": 40,
        "color": "#26242c",
        "boxColor": "#26242c",
        "tickColor": "#6f7f35",
        "delay": 0,
        "itemGap": 18,
        "closeGap": 9,
        "rowGap": 22,
        "strokeWidth": 3,
        "perStep": 1.6,
        "weight": 600,
        "seed": "checklist",
        "step": 3
      }
    },
    "controls": [
      {
        "group": "Check List (remocn) (whole clip) • box width = list width, at scale 1.5, list centred vertically; default list takes 123 frames",
        "items": [
          {
            "key": "items",
            "label": "ITEMS (JSON: \"text\" or {text, checked:false})",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "fontSize",
            "label": "FONT SIZE (720p px)",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 120,
            "step": 1
          },
          {
            "key": "color",
            "label": "LABEL INK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "boxColor",
            "label": "BOX INK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "tickColor",
            "label": "TICK / STRIKE INK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "delay",
            "label": "DELAY (frames)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "itemGap",
            "label": "ITEM GAP (frames between rows writing)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 120,
            "step": 1
          },
          {
            "key": "closeGap",
            "label": "CLOSE GAP (frames between ticks)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 120,
            "step": 1
          },
          {
            "key": "rowGap",
            "label": "ROW GAP px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 120,
            "step": 1
          },
          {
            "key": "strokeWidth",
            "label": "PEN WIDTH",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 12,
            "step": 0.5
          },
          {
            "key": "perStep",
            "label": "LETTERS PER POSE",
            "kind": "range",
            "keyframable": false,
            "min": 0.2,
            "max": 8,
            "step": 0.1
          },
          {
            "key": "weight",
            "label": "WEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 400,
            "max": 700,
            "step": 100
          },
          {
            "key": "seed",
            "label": "SEED",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "step",
            "label": "FRAMES PER POSE",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 12,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "paperkit",
      "style": "checklist"
    },
    "defaultDurationInFrames": 150
  },
  {
    "id": "remocn_reel",
    "componentName": "Reel",
    "name": "Reel (remocn)",
    "desc": "remocn • fixed centred card; each image blooms open over the last with a centre-out mask • transparent around the card",
    "icon": "🎴",
    "tab": "community",
    "external": {
      "importPath": "./community/reel",
      "exportName": "Reel",
      "sizeMode": "none",
      "renameProps": {
        "cardWidth": "width",
        "cardHeight": "height"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "images": [
          "https://remotion.media/transition-bg-blue.jpg",
          "https://remotion.media/transition-bg-pink.jpg",
          "https://remotion.media/elements/commerce-tear-a-graphic.png"
        ],
        "cardWidth": 1770,
        "cardHeight": 1014,
        "radius": 24,
        "step": 20,
        "reveal": 13,
        "objectPosition": "top",
        "background": "#050506"
      }
    },
    "controls": [
      {
        "group": "Reel (remocn) (whole clip) • card centred on the composition; image i starts at i × STEP",
        "items": [
          {
            "key": "images",
            "label": "IMAGES (JSON array of URLs)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "cardWidth",
            "label": "CARD WIDTH",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 3840,
            "step": 1
          },
          {
            "key": "cardHeight",
            "label": "CARD HEIGHT",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 2160,
            "step": 1
          },
          {
            "key": "radius",
            "label": "RADIUS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 120,
            "step": 1
          },
          {
            "key": "step",
            "label": "STEP (frames between images)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 120,
            "step": 1
          },
          {
            "key": "reveal",
            "label": "REVEAL (frames to open)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 120,
            "step": 1
          },
          {
            "key": "objectPosition",
            "label": "OBJECT POSITION (CSS)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "background",
            "label": "CARD SURFACE",
            "kind": "color",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "paperkit",
      "style": "reel"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 160
  },
  {
    "id": "remocn_claude_chat",
    "componentName": "ClaudeChat",
    "name": "Claude Chat (remocn)",
    "desc": "remocn • claude.ai-style input card: placeholder + blinking caret, prompt types from frame 42, waveform button morphs into the terracotta send button • transparent (pair with #F5F4EF)",
    "icon": "💬",
    "tab": "community",
    "external": {
      "importPath": "./community/claude-chat",
      "exportName": "ClaudeChat",
      "packages": [
        "@remotion/google-fonts",
        "culori"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "placeholder": "Try: draft an email · summarize a doc · plan your week",
        "prompt": "Draft a launch tweet for our new release",
        "modelName": "Opus 4.8",
        "modelTier": "Max",
        "accentColor": "#D97757",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Claude Chat (remocn) (whole clip) • scales its own 1280×720 stage; transparent",
        "items": [
          {
            "key": "placeholder",
            "label": "PLACEHOLDER",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "prompt",
            "label": "PROMPT (types from frame 42, 22 chars/s)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "modelName",
            "label": "MODEL NAME",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "modelTier",
            "label": "MODEL TIER",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "accentColor",
            "label": "ACCENT",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED (≥ 1 so the prompt finishes)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "aichat",
      "style": "claude"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150
  },
  {
    "id": "remocn_chat_gpt",
    "componentName": "ChatGpt",
    "name": "ChatGPT (remocn)",
    "desc": "remocn • ChatGPT-style composer: heading, pill input and suggestion chips; prompt types from frame 42, voice button morphs to send, chips fade out • transparent (pair with white)",
    "icon": "🟢",
    "tab": "community",
    "external": {
      "importPath": "./community/chat-gpt",
      "exportName": "ChatGpt",
      "packages": [
        "@remotion/google-fonts",
        "culori"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "greeting": "What's on your mind today?",
        "placeholder": "Ask anything",
        "prompt": "Make a sunset over a calm ocean",
        "accentColor": "#2F6FED",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "ChatGPT (remocn) (whole clip) • scales its own 1280×720 stage; transparent",
        "items": [
          {
            "key": "greeting",
            "label": "HEADING",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "placeholder",
            "label": "PLACEHOLDER",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "prompt",
            "label": "PROMPT (types from frame 42, 22 chars/s)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "accentColor",
            "label": "ACCENT",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED (≥ 1 so the prompt finishes)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "aichat",
      "style": "gpt"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150
  },
  {
    "id": "remocn_v0",
    "componentName": "V0",
    "name": "v0 (remocn)",
    "desc": "remocn • dark v0-style composer: heading + textarea box, prompt types from frame 42, white mic button morphs to send • transparent (pair with black)",
    "icon": "▫️",
    "tab": "community",
    "external": {
      "importPath": "./community/v0",
      "exportName": "V0",
      "packages": [
        "@remotion/google-fonts",
        "culori"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "greeting": "What do you want to create?",
        "placeholder": "Ask v0 to build…",
        "prompt": "a landing page for my SaaS with pricing and testimonials",
        "modelName": "v0 Max",
        "projectName": "Project",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "v0 (remocn) (whole clip) • scales its own 1280×720 stage; transparent; no accent colour (button is white)",
        "items": [
          {
            "key": "greeting",
            "label": "HEADING",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "placeholder",
            "label": "PLACEHOLDER",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "prompt",
            "label": "PROMPT (types from frame 42, 22 chars/s)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "modelName",
            "label": "MODEL CHIP",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "projectName",
            "label": "PROJECT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "accentColor",
            "label": "ACCENT",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED (≥ 1 so the prompt finishes)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "aichat",
      "style": "v0"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150
  },
  {
    "id": "remocn_claude_code",
    "componentName": "ClaudeCode",
    "name": "Claude Code (remocn)",
    "desc": "remocn • Claude Code CLI welcome screen in a terminal window (dashed accent box, mascot, what's new); the command types into the prompt from frame 48 • transparent (pair with #2B2A28)",
    "icon": "🟧",
    "tab": "community",
    "external": {
      "importPath": "./community/claude-code",
      "exportName": "ClaudeCode",
      "packages": [
        "@remotion/google-fonts",
        "culori"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "title": "Claude Code v2.0.0",
        "userName": "Meaghan",
        "model": "Opus 4.8 • Max 20x",
        "cwd": "/users/meaghan/code/apps",
        "placeholder": "Try \"edit <filepath> to ...\"",
        "prompt": "edit src/theme.ts to add a dark mode toggle",
        "accentColor": "#D97757",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Claude Code (remocn) (whole clip) • scales its own 1280×720 stage; transparent",
        "items": [
          {
            "key": "title",
            "label": "BOX TITLE",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "userName",
            "label": "USER NAME",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "model",
            "label": "MODEL LINE",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "cwd",
            "label": "WORKING DIRECTORY",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "placeholder",
            "label": "PLACEHOLDER",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "prompt",
            "label": "COMMAND (types from frame 48, 18 chars/s)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "accentColor",
            "label": "ACCENT",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED (≥ 1 so the prompt finishes)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "aichat",
      "style": "code"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 160
  },
  {
    "id": "remocn_opencode",
    "componentName": "OpenCode",
    "name": "OpenCode (remocn)",
    "desc": "remocn • OpenCode TUI welcome screen: wordmark, input box with accent bar and status line, key hints; the query types from frame 48 • transparent (pair with black)",
    "icon": "⬛",
    "tab": "community",
    "external": {
      "importPath": "./community/opencode",
      "exportName": "OpenCode",
      "packages": [
        "@remotion/google-fonts",
        "culori"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "placeholder": "Ask anything... ",
        "query": "\"What is the tech stack of this project?\"",
        "agentName": "Build",
        "modelName": "Kimi K2.5",
        "provider": "Moonshot AI",
        "accentColor": "#2B7FFF",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "OpenCode (remocn) (whole clip) • scales its own 1280×720 stage; transparent",
        "items": [
          {
            "key": "placeholder",
            "label": "PROMPT PREFIX",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "query",
            "label": "QUERY (types from frame 48, 20 chars/s)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "agentName",
            "label": "AGENT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "modelName",
            "label": "MODEL",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "provider",
            "label": "PROVIDER",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "accentColor",
            "label": "ACCENT",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED (≥ 1 so the prompt finishes)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "aichat",
      "style": "opencode"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150
  },
  {
    "id": "remocn_grain_dissolve",
    "componentName": "grainDissolve",
    "name": "Grain Dissolve (remocn)",
    "desc": "remocn transition • the outgoing scene blurs away into soft grainy shapes; the next scene condenses out of the noise (WebGL grain gradient)",
    "icon": "🌫️",
    "tab": "community",
    "external": {
      "importPath": "./community/grain-dissolve",
      "exportName": "grainDissolve",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 76,
        "colors": [
          "#3a3a52",
          "#4a4a68",
          "#8f88ae"
        ],
        "colorBack": "#141318",
        "shape": "blob",
        "noise": 0.3,
        "zoom": 2,
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Grain Dissolve (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; needs ≥ ~50 frames",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 76)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "colors",
            "label": "COLORS (JSON array)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "colorBack",
            "label": "BACKDROP",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "shape",
            "label": "SHAPE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "wave",
                "wave"
              ],
              [
                "dots",
                "dots"
              ],
              [
                "truchet",
                "truchet"
              ],
              [
                "corners",
                "corners"
              ],
              [
                "ripple",
                "ripple"
              ],
              [
                "blob",
                "blob"
              ],
              [
                "sphere",
                "sphere"
              ]
            ]
          },
          {
            "key": "noise",
            "label": "GRAIN",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "zoom",
            "label": "ZOOM",
            "kind": "range",
            "keyframable": false,
            "min": 0.1,
            "max": 6,
            "step": 0.01
          },
          {
            "key": "speed",
            "label": "SHADER SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "grain"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 136
  },
  {
    "id": "remocn_wave_wipe",
    "componentName": "waveWipe",
    "name": "Wave Wipe (remocn)",
    "desc": "remocn transition • a grainy wave field washes up over the outgoing scene, then the next scene rides in from below",
    "icon": "🌊",
    "tab": "community",
    "external": {
      "importPath": "./community/wave-wipe",
      "exportName": "waveWipe",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 60,
        "colors": [
          "#3a3a52",
          "#4a4a68",
          "#8f88ae"
        ],
        "colorBack": "#141318",
        "intensity": 0.2,
        "softness": 0.7,
        "noise": 0.4,
        "zoom": 1.16,
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Wave Wipe (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; vertical sweep",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 60)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "colors",
            "label": "COLORS (JSON array)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "colorBack",
            "label": "BACKDROP (match the scenes)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "intensity",
            "label": "DISTORTION",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "softness",
            "label": "SOFTNESS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "noise",
            "label": "GRAIN",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "zoom",
            "label": "ZOOM",
            "kind": "range",
            "keyframable": false,
            "min": 0.1,
            "max": 6,
            "step": 0.01
          },
          {
            "key": "speed",
            "label": "SHADER SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "wave"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_shader_seam",
    "componentName": "shaderSeam",
    "name": "Shader Seam (remocn)",
    "desc": "remocn transition • an OpenShaders silk + halftone material covers the frame, the scenes swap underneath, then it dissolves in place along its brightness (WebGL2)",
    "icon": "🧵",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-seam",
      "exportName": "shaderSeam",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": true
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 60,
        "softness": 0.18,
        "detail": 0.65,
        "speed": 0,
        "timeOffset": 0
      }
    },
    "controls": [
      {
        "group": "Shader Seam (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; give each scene its own background",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 60)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "softness",
            "label": "DISSOLVE SOFTNESS (0.02–0.4)",
            "kind": "range",
            "keyframable": false,
            "min": 0.02,
            "max": 0.4,
            "step": 0.01
          },
          {
            "key": "detail",
            "label": "ORGANIC DETAIL",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "speed",
            "label": "MATERIAL SPEED (0 = still)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "timeOffset",
            "label": "SHADER TIME OFFSET (s)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 0.1
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "seam"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_shader_spiral_pass",
    "componentName": "shaderSpiralPass",
    "name": "Shader Spiral Pass (remocn)",
    "desc": "remocn transition • the hero light-tunnel spiral covers the outgoing scene, the camera dives to its centre and a feathered exit opens onto the next scene (WebGL2)",
    "icon": "🌀",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-spiral-pass",
      "exportName": "shaderSpiralPass",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": true
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 72,
        "speed": 1,
        "spirals": 3,
        "twist": 0.7,
        "zoom": 14,
        "softness": 0.12,
        "timeOffset": 0
      }
    },
    "controls": [
      {
        "group": "Shader Spiral Pass (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; give both scenes opaque backgrounds",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 72)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "speed",
            "label": "FLOW SPEED (0–5)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "spirals",
            "label": "SPIRALS (1–6)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 6,
            "step": 1
          },
          {
            "key": "twist",
            "label": "TWIST (0–2)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 2,
            "step": 0.01
          },
          {
            "key": "zoom",
            "label": "DIVE ZOOM (2–24)",
            "kind": "range",
            "keyframable": false,
            "min": 2,
            "max": 24,
            "step": 0.1
          },
          {
            "key": "softness",
            "label": "EXIT FEATHER (0.02–0.3)",
            "kind": "range",
            "keyframable": false,
            "min": 0.02,
            "max": 0.3,
            "step": 0.01
          },
          {
            "key": "timeOffset",
            "label": "SHADER TIME OFFSET (s)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 0.1
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "spiral"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 132
  },
  {
    "id": "remocn_ripple_zoom",
    "componentName": "rippleZoom",
    "name": "Ripple Zoom (remocn)",
    "desc": "remocn transition • the outgoing scene blows past the camera, which dives through grainy ripple rings while the next scene scales up from the depth",
    "icon": "🎯",
    "tab": "community",
    "external": {
      "importPath": "./community/ripple-zoom",
      "exportName": "rippleZoom",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 88,
        "colors": [
          "#3a3a52",
          "#4a4a68",
          "#8f88ae"
        ],
        "colorBack": "#141318",
        "intensity": 0.5,
        "softness": 0.5,
        "noise": 0.5,
        "zoom": 4,
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Ripple Zoom (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; keep the incoming scene transparent over a backdrop matching colorBack",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 88)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "colors",
            "label": "COLORS (JSON array)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "colorBack",
            "label": "BACKDROP (match the scenes)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "intensity",
            "label": "DISTORTION",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "softness",
            "label": "SOFTNESS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "noise",
            "label": "GRAIN",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "zoom",
            "label": "DIVE ZOOM",
            "kind": "range",
            "keyframable": false,
            "min": 0.5,
            "max": 12,
            "step": 0.1
          },
          {
            "key": "speed",
            "label": "SHADER SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "ripple"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 148
  },
  {
    "id": "remocn_warp_dissolve",
    "componentName": "warpDissolve",
    "name": "Warp Dissolve (remocn)",
    "desc": "remocn transition • the outgoing scene melts into a folding domain-warp colour field that straightens back into the next scene",
    "icon": "🫠",
    "tab": "community",
    "external": {
      "importPath": "./community/warp-dissolve",
      "exportName": "warpDissolve",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 76,
        "colors": [
          "#141318",
          "#3a3a5c",
          "#1f1d29",
          "#8f88ae"
        ],
        "distortion": 0.8,
        "swirl": 0.6,
        "softness": 1,
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Warp Dissolve (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; needs ≥ ~50 frames",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 76)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "colors",
            "label": "COLORS (JSON array)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "distortion",
            "label": "PEAK DISTORTION",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "swirl",
            "label": "SWIRL",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "softness",
            "label": "SOFTNESS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "speed",
            "label": "SHADER SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "warp"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 136
  },
  {
    "id": "remocn_swirl_dissolve",
    "componentName": "swirlDissolve",
    "name": "Swirl Dissolve (remocn)",
    "desc": "remocn transition • a banded swirl covers the frame, unwinds, holds and winds shut as the next scene resolves through it",
    "icon": "🍥",
    "tab": "community",
    "external": {
      "importPath": "./community/swirl-dissolve",
      "exportName": "swirlDissolve",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 104,
        "colors": [
          "#1f1d29",
          "#413d56",
          "#8f88ae"
        ],
        "colorBack": "#141318",
        "bandCount": 10,
        "softness": 0.35,
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Swirl Dissolve (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; statement move: needs ≥ ~80 frames",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 104)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "colors",
            "label": "COLORS (JSON array)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "colorBack",
            "label": "BACKDROP",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "bandCount",
            "label": "BANDS",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 30,
            "step": 1
          },
          {
            "key": "softness",
            "label": "BAND SOFTNESS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "speed",
            "label": "SHADER SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "swirl"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 164
  },
  {
    "id": "remocn_dither_dissolve",
    "componentName": "ditherDissolve",
    "name": "Dither Dissolve (remocn)",
    "desc": "remocn transition • a drifting two-colour dither-pixel field covers the cut: the outgoing scene fades under it, the next fades in beneath it (WebGL)",
    "icon": "👾",
    "tab": "community",
    "external": {
      "importPath": "./community/dither-dissolve",
      "exportName": "ditherDissolve",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 40,
        "colorBack": "#141318",
        "colorFront": "#8f88ae",
        "shape": "simplex",
        "speed": 1.5
      }
    },
    "controls": [
      {
        "group": "Dither Dissolve (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; quick textured cut",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 40)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "colorBack",
            "label": "FIELD BACK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "colorFront",
            "label": "DITHER INK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "shape",
            "label": "PATTERN",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "simplex",
                "simplex"
              ],
              [
                "warp",
                "warp"
              ],
              [
                "dots",
                "dots"
              ],
              [
                "wave",
                "wave"
              ],
              [
                "ripple",
                "ripple"
              ],
              [
                "swirl",
                "swirl"
              ],
              [
                "sphere",
                "sphere"
              ]
            ]
          },
          {
            "key": "speed",
            "label": "SHADER SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "dither"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 100
  },
  {
    "id": "remocn_perlin_dissolve",
    "componentName": "perlinDissolve",
    "name": "Perlin Dissolve (remocn)",
    "desc": "remocn transition • a perlin-noise threshold sweeps from back to front colour, then the next scene resolves through it (WebGL)",
    "icon": "☁️",
    "tab": "community",
    "external": {
      "importPath": "./community/perlin-dissolve",
      "exportName": "perlinDissolve",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 104,
        "colorBack": "#141318",
        "colorFront": "#8f88ae",
        "softness": 0.1,
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Perlin Dissolve (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; needs ~100 frames",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 104)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "colorBack",
            "label": "BACK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "colorFront",
            "label": "FRONT",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "softness",
            "label": "EDGE SOFTNESS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "speed",
            "label": "SHADER SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "perlin"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 164
  },
  {
    "id": "remocn_smoke_dissolve",
    "componentName": "smokeDissolve",
    "name": "Smoke Dissolve (remocn)",
    "desc": "remocn transition • a smoke ring expands out from the centre and the next scene is born in the middle of it (WebGL)",
    "icon": "💨",
    "tab": "community",
    "external": {
      "importPath": "./community/smoke-dissolve",
      "exportName": "smokeDissolve",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 104,
        "colorBack": "#141318",
        "colors": [
          "#8f88ae"
        ],
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Smoke Dissolve (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; needs ~100 frames; dark palettes",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 104)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "colorBack",
            "label": "BACK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "colors",
            "label": "SMOKE COLORS (JSON array)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SHADER SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "smoke"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 164
  },
  {
    "id": "remocn_whip_pan",
    "componentName": "whipPan",
    "name": "Whip Pan (remocn)",
    "desc": "remocn transition • one continuous camera whip: both scenes fly through the frame with motion blur and smear peaking mid-move (CSS)",
    "icon": "💫",
    "tab": "community",
    "external": {
      "importPath": "./community/whip-pan",
      "exportName": "whipPan",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": true
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 26,
        "direction": "left",
        "blur": 24
      }
    },
    "controls": [
      {
        "group": "Whip Pan (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; keep it ~26 frames",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 26)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "direction",
            "label": "DIRECTION",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "left",
                "Left"
              ],
              [
                "right",
                "Right"
              ],
              [
                "up",
                "Up"
              ],
              [
                "down",
                "Down"
              ]
            ]
          },
          {
            "key": "blur",
            "label": "PEAK BLUR px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 80,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "whip"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 86
  },
  {
    "id": "remocn_push_through",
    "componentName": "pushThrough",
    "name": "Push Through (remocn)",
    "desc": "remocn transition • the camera dollies through the outgoing scene (it grows past the lens and blurs) as the next scales up from the depth with an overshoot settle (CSS)",
    "icon": "🔭",
    "tab": "community",
    "external": {
      "importPath": "./community/push-through",
      "exportName": "pushThrough",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": true
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 40,
        "zoom": 2.4,
        "blur": 14
      }
    },
    "controls": [
      {
        "group": "Push Through (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; implies outer → inner",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 40)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "zoom",
            "label": "PUSH ZOOM",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 8,
            "step": 0.05
          },
          {
            "key": "blur",
            "label": "PEAK BLUR px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 60,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "push"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 100
  },
  {
    "id": "remocn_focus_pull",
    "componentName": "focusPull",
    "name": "Focus Pull (remocn)",
    "desc": "remocn transition • rack focus: the outgoing scene defocuses and brightens like bokeh, the next resolves from the same blur with a lens breath (CSS)",
    "icon": "🎞️",
    "tab": "community",
    "external": {
      "importPath": "./community/focus-pull",
      "exportName": "focusPull",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": true
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 46,
        "blur": 16
      }
    },
    "controls": [
      {
        "group": "Focus Pull (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; calm, editorial",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 46)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "blur",
            "label": "MAX DEFOCUS px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 60,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "focus"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 106
  },
  {
    "id": "remocn_zoom_blur",
    "componentName": "zoomBlur",
    "name": "Zoom Blur (remocn)",
    "desc": "remocn transition • depth punch-in: the outgoing scene scales past the viewer into blur while the next resolves out of blur on a crossfade (CSS; character comes from the timing)",
    "icon": "🎯",
    "tab": "community",
    "external": {
      "importPath": "./community/zoom-blur",
      "exportName": "zoomBlur",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": true
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 18,
        "blur": 16,
        "rise": 0
      }
    },
    "controls": [
      {
        "group": "Zoom Blur (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; the workhorse cut; linear timing",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 18)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "blur",
            "label": "PEAK BLUR px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 60,
            "step": 1
          },
          {
            "key": "rise",
            "label": "RISE px (vertical pickup)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 200,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "zoomblur"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 78
  },
  {
    "id": "remocn_lens_zoom",
    "componentName": "lensZoom",
    "name": "Lens Zoom (remocn)",
    "desc": "remocn transition • a hard cut disguised as a lens punch-in: barrel distortion, fading zoom blur, RGB split and camera shake around the splice at the midpoint (CSS copies; heavy)",
    "icon": "🔍",
    "tab": "community",
    "external": {
      "importPath": "./community/lens-zoom",
      "exportName": "lensZoom",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": true
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 28,
        "inScaleFrom": 100,
        "inScaleTo": 150,
        "inFovFrom": 0,
        "inFovTo": 160,
        "inBlurFrom": 0,
        "inBlurTo": 60,
        "inRotationFrom": 0,
        "inRotationTo": -15,
        "outScaleFrom": 135,
        "outScaleTo": 100,
        "outFovFrom": 135,
        "outFovTo": 0,
        "outBlurFrom": 45,
        "outBlurTo": 0,
        "outRotationFrom": 345,
        "outRotationTo": 360,
        "anticipateScale": 100,
        "anticipatePortion": 0.35,
        "lensSteps": 9,
        "blurSamples": 7,
        "blurScaleGain": 1,
        "blurFade": 1.5,
        "shakeAmount": 50,
        "shakeFrequency": 1.4,
        "shakeCyclesPerUnit": 8,
        "shakeTranslatePx": 73,
        "shakeRotateDeg": 1.1,
        "redScale": 1.01,
        "greenScale": 1,
        "blueScale": 0.99,
        "letterboxAspect": 0
      }
    },
    "controls": [
      {
        "group": "Lens Zoom (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; cut lands at 50%; each frame paints blurSamples × (lensSteps + 1) copies, ×3 with the RGB split",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 28)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "inScaleFrom",
            "label": "OUT-GOING SCALE FROM %",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 400,
            "step": 1
          },
          {
            "key": "inScaleTo",
            "label": "OUT-GOING SCALE TO %",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 400,
            "step": 1
          },
          {
            "key": "inFovFrom",
            "label": "OUT-GOING FOV FROM °",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 179,
            "step": 1
          },
          {
            "key": "inFovTo",
            "label": "OUT-GOING FOV TO °",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 179,
            "step": 1
          },
          {
            "key": "inBlurFrom",
            "label": "OUT-GOING BLUR FROM",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 200,
            "step": 1
          },
          {
            "key": "inBlurTo",
            "label": "OUT-GOING BLUR TO",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 200,
            "step": 1
          },
          {
            "key": "inRotationFrom",
            "label": "OUT-GOING ROT FROM °",
            "kind": "range",
            "keyframable": false,
            "min": -360,
            "max": 360,
            "step": 1
          },
          {
            "key": "inRotationTo",
            "label": "OUT-GOING ROT TO °",
            "kind": "range",
            "keyframable": false,
            "min": -360,
            "max": 360,
            "step": 1
          },
          {
            "key": "outScaleFrom",
            "label": "INCOMING SCALE FROM %",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 400,
            "step": 1
          },
          {
            "key": "outScaleTo",
            "label": "INCOMING SCALE TO %",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 400,
            "step": 1
          },
          {
            "key": "outFovFrom",
            "label": "INCOMING FOV FROM °",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 179,
            "step": 1
          },
          {
            "key": "outFovTo",
            "label": "INCOMING FOV TO °",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 179,
            "step": 1
          },
          {
            "key": "outBlurFrom",
            "label": "INCOMING BLUR FROM",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 200,
            "step": 1
          },
          {
            "key": "outBlurTo",
            "label": "INCOMING BLUR TO",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 200,
            "step": 1
          },
          {
            "key": "outRotationFrom",
            "label": "INCOMING ROT FROM °",
            "kind": "range",
            "keyframable": false,
            "min": -360,
            "max": 720,
            "step": 1
          },
          {
            "key": "outRotationTo",
            "label": "INCOMING ROT TO °",
            "kind": "range",
            "keyframable": false,
            "min": -360,
            "max": 720,
            "step": 1
          },
          {
            "key": "anticipateScale",
            "label": "ANTICIPATE SQUEEZE % (100 = off)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 100,
            "step": 1
          },
          {
            "key": "anticipatePortion",
            "label": "ANTICIPATE PORTION",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 0.9,
            "step": 0.01
          },
          {
            "key": "lensSteps",
            "label": "LENS RINGS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 24,
            "step": 1
          },
          {
            "key": "blurSamples",
            "label": "BLUR SAMPLES (the expensive knob)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 24,
            "step": 1
          },
          {
            "key": "blurScaleGain",
            "label": "BLUR SCALE GAIN",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "blurFade",
            "label": "BLUR FADE",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 6,
            "step": 0.05
          },
          {
            "key": "shakeAmount",
            "label": "SHAKE (0 = off)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 200,
            "step": 1
          },
          {
            "key": "shakeFrequency",
            "label": "SHAKE FREQUENCY",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 10,
            "step": 0.05
          },
          {
            "key": "shakeCyclesPerUnit",
            "label": "SHAKE CYCLES / UNIT",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 40,
            "step": 0.5
          },
          {
            "key": "shakeTranslatePx",
            "label": "SHAKE TRANSLATE px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 300,
            "step": 1
          },
          {
            "key": "shakeRotateDeg",
            "label": "SHAKE ROTATE °",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 10,
            "step": 0.05
          },
          {
            "key": "redScale",
            "label": "RED SCALE",
            "kind": "range",
            "keyframable": false,
            "min": 0.9,
            "max": 1.1,
            "step": 0.001
          },
          {
            "key": "greenScale",
            "label": "GREEN SCALE",
            "kind": "range",
            "keyframable": false,
            "min": 0.9,
            "max": 1.1,
            "step": 0.001
          },
          {
            "key": "blueScale",
            "label": "BLUE SCALE (all equal = no split)",
            "kind": "range",
            "keyframable": false,
            "min": 0.9,
            "max": 1.1,
            "step": 0.001
          },
          {
            "key": "letterboxAspect",
            "label": "LETTERBOX ASPECT (0 = off, e.g. 2.39)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 4,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "lens"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 88
  },
  {
    "id": "remocn_page_turn",
    "componentName": "pageTurn",
    "name": "Page Turn (remocn)",
    "desc": "remocn transition • the outgoing scene swings up and away like a notebook page in stop-motion poses, IN FRONT of the untouched incoming scene (CSS)",
    "icon": "📄",
    "tab": "community",
    "external": {
      "importPath": "./community/page-turn",
      "exportName": "pageTurn",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": true
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 24,
        "angle": -7,
        "origin": "18% 100%",
        "poses": 8
      }
    },
    "controls": [
      {
        "group": "Page Turn (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; the exiting page stays on top; 24f = 8 poses × 3",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 24)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "angle",
            "label": "ANGLE ° at full lift (negative = left)",
            "kind": "range",
            "keyframable": false,
            "min": -45,
            "max": 45,
            "step": 0.5
          },
          {
            "key": "origin",
            "label": "PIVOT (CSS transform-origin)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "poses",
            "label": "POSES (stop-motion steps)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 24,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "page"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 84
  },
  {
    "id": "remocn_ascii_dissolve",
    "componentName": "asciiDissolve",
    "name": "ASCII Dissolve (remocn)",
    "desc": "remocn transition • the outgoing scene blurs out under a rising grid of monospace glyphs, then the next resolves cell by cell as the field dissolves (canvas 2D text)",
    "icon": "🔣",
    "tab": "community",
    "external": {
      "importPath": "./community/ascii-dissolve",
      "exportName": "asciiDissolve",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": true
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 40,
        "colorBack": "#0d0d10",
        "colorFront": "rgba(242,242,242,0.6)",
        "cellSize": 22,
        "ramp": " .:-=+*#%@",
        "accentDensity": 0.05
      }
    },
    "controls": [
      {
        "group": "ASCII Dissolve (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; retro / terminal cut",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 40)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "colorBack",
            "label": "BACK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "colorFront",
            "label": "GLYPH COLOR (CSS)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "cellSize",
            "label": "CELL SIZE px",
            "kind": "range",
            "keyframable": false,
            "min": 6,
            "max": 80,
            "step": 1
          },
          {
            "key": "ramp",
            "label": "DENSITY RAMP (light → dense)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "accentColor",
            "label": "ACCENT COLOR (leave unset for none)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "accentDensity",
            "label": "ACCENT DENSITY",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "ascii"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 100
  },
  {
    "id": "remocn_caret_wipe",
    "componentName": "caretWipe",
    "name": "Caret Wipe (remocn)",
    "desc": "remocn transition • a typing caret sweeps across the frame: the outgoing scene is backspaced behind it and the next is typed in ahead (CSS clip)",
    "icon": "▏",
    "tab": "community",
    "external": {
      "importPath": "./community/caret-wipe",
      "exportName": "caretWipe",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": true
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 40,
        "direction": "right",
        "caretColor": "#C3E88D",
        "caretWidth": 3,
        "caretHeight": 0.5
      }
    },
    "controls": [
      {
        "group": "Caret Wipe (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; best between UI / text scenes",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 40)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "direction",
            "label": "DIRECTION",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "right",
                "Right (types left → right)"
              ],
              [
                "left",
                "Left"
              ]
            ]
          },
          {
            "key": "caretColor",
            "label": "CARET",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "caretWidth",
            "label": "CARET WIDTH px",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 30,
            "step": 1
          },
          {
            "key": "caretHeight",
            "label": "CARET HEIGHT (fraction of frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0.05,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "caret"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 100
  },
  {
    "id": "remocn_icon_scatter",
    "componentName": "iconScatter",
    "name": "Icon Scatter (remocn)",
    "desc": "remocn transition • a field of line icons flies in, a cover fill hides the swap at the peak, then the icons scatter away (SVG)",
    "icon": "✳️",
    "tab": "community",
    "external": {
      "importPath": "./community/icon-scatter",
      "exportName": "iconScatter",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": true
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 40,
        "count": 15,
        "color": "#fafafa",
        "coverColor": "#0a0a0a",
        "coverOpacity": 0.92,
        "strokeWidth": 2,
        "flyDistance": 260,
        "seed": "icon-scatter"
      }
    },
    "controls": [
      {
        "group": "Icon Scatter (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; playful; match the cover to scene A",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 40)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "count",
            "label": "ICONS",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 60,
            "step": 1
          },
          {
            "key": "color",
            "label": "ICON STROKE",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "coverColor",
            "label": "COVER",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "coverOpacity",
            "label": "COVER PEAK OPACITY",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "strokeWidth",
            "label": "STROKE (24px viewBox units)",
            "kind": "range",
            "keyframable": false,
            "min": 0.5,
            "max": 6,
            "step": 0.1
          },
          {
            "key": "flyDistance",
            "label": "SCATTER DISTANCE px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1200,
            "step": 5
          },
          {
            "key": "seed",
            "label": "SEED",
            "kind": "text",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "icons"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 100
  },
  {
    "id": "remocn_glitch_cut",
    "componentName": "glitchCut",
    "name": "Glitch Cut (remocn)",
    "desc": "remocn transition • a hard cut torn into displaced slices with RGB split and corrupted blocks, each slice handing over on its own beat (html-in-canvas WebGL2; CSS band fallback)",
    "icon": "📼",
    "tab": "community",
    "external": {
      "importPath": "./community/glitch-cut",
      "exportName": "glitchCut",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": true
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 12,
        "intensity": 1,
        "slices": 24,
        "rgbSplit": 1,
        "blockNoise": 0.6
      }
    },
    "controls": [
      {
        "group": "Glitch Cut (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; keep 8–14 frames",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 12)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "intensity",
            "label": "DISPLACEMENT",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3,
            "step": 0.05
          },
          {
            "key": "slices",
            "label": "SLICES",
            "kind": "range",
            "keyframable": false,
            "min": 2,
            "max": 120,
            "step": 1
          },
          {
            "key": "rgbSplit",
            "label": "RGB SPLIT",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3,
            "step": 0.05
          },
          {
            "key": "blockNoise",
            "label": "BLOCK NOISE (canvas only)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "glitch"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 72
  },
  {
    "id": "remocn_ember_burn",
    "componentName": "emberBurn",
    "name": "Ember Burn (remocn)",
    "desc": "remocn transition • the outgoing frame catches fire where it is brightest, boils, chars and blows away as sparks of its own colour while the next arrives incandescent (html-in-canvas WebGL2; warm-flash fallback)",
    "icon": "🔥",
    "tab": "community",
    "external": {
      "importPath": "./community/ember-burn",
      "exportName": "emberBurn",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": true
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 40,
        "patches": 5,
        "edgeSoftness": 0.07,
        "contentBias": 0.6,
        "heat": 0.5,
        "glowColor": "#ff7a2f",
        "emberAmount": 0.5
      }
    },
    "controls": [
      {
        "group": "Ember Burn (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; give it ≥ 24 frames, 40 recommended",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 40)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "patches",
            "label": "PATCHES (few big holes ↔ fine burn)",
            "kind": "range",
            "keyframable": false,
            "min": 0.5,
            "max": 30,
            "step": 0.5
          },
          {
            "key": "edgeSoftness",
            "label": "RIM WIDTH",
            "kind": "range",
            "keyframable": false,
            "min": 0.005,
            "max": 0.4,
            "step": 0.005
          },
          {
            "key": "contentBias",
            "label": "CONTENT BIAS (0 = abstract)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "heat",
            "label": "HEAT SHIMMER",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 2,
            "step": 0.01
          },
          {
            "key": "glowColor",
            "label": "GLOW",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "emberAmount",
            "label": "SPARKS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 2,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "ember"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 100
  },
  {
    "id": "remocn_particle_dissolve",
    "componentName": "particleDissolve",
    "name": "Particle Dissolve (remocn)",
    "desc": "remocn transition • the frame grinds into drifting grey dust (bright content throws furthest) and the next scene coalesces back out of it (html-in-canvas WebGL2; desaturating-blur fallback)",
    "icon": "🌪️",
    "tab": "community",
    "external": {
      "importPath": "./community/particle-dissolve",
      "exportName": "particleDissolve",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": true
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 36,
        "particleSize": 4,
        "scatter": 0.08,
        "shimmer": 0.6,
        "aberration": 0.5,
        "direction": "reveal",
        "stagger": 0.55
      }
    },
    "controls": [
      {
        "group": "Particle Dissolve (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; give it > 1 s",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 36)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "particleSize",
            "label": "GRAIN px",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 30,
            "step": 0.5
          },
          {
            "key": "scatter",
            "label": "SCATTER (fraction of frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 0.5,
            "step": 0.005
          },
          {
            "key": "shimmer",
            "label": "SHIMMER",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 2,
            "step": 0.01
          },
          {
            "key": "aberration",
            "label": "RGB FRINGE",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 2,
            "step": 0.01
          },
          {
            "key": "direction",
            "label": "SWEEP",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "reveal",
                "Reveal (centre out)"
              ],
              [
                "up",
                "Up"
              ],
              [
                "down",
                "Down"
              ],
              [
                "left",
                "Left"
              ],
              [
                "right",
                "Right"
              ]
            ]
          },
          {
            "key": "stagger",
            "label": "STAGGER",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "particle"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 96
  },
  {
    "id": "remocn_grid_wave",
    "componentName": "gridWave",
    "name": "Grid Wave (remocn)",
    "desc": "remocn transition • a wave raises the picture into lit, extruded blocks that set back down carrying the next scene (html-in-canvas WebGL2; scale-fade fallback)",
    "icon": "🧱",
    "tab": "community",
    "external": {
      "importPath": "./community/grid-wave",
      "exportName": "gridWave",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": true
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 36,
        "tileSize": 90,
        "waveWidth": 0.16,
        "lift": 2,
        "gap": 0.12,
        "tint": "#8fb4ff",
        "direction": "ripple"
      }
    },
    "controls": [
      {
        "group": "Grid Wave (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; structured, graphic scenes",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 36)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "tileSize",
            "label": "TILE px",
            "kind": "range",
            "keyframable": false,
            "min": 16,
            "max": 400,
            "step": 1
          },
          {
            "key": "waveWidth",
            "label": "WAVE WIDTH",
            "kind": "range",
            "keyframable": false,
            "min": 0.02,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "lift",
            "label": "LIFT (0 = flat grid wipe)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 6,
            "step": 0.05
          },
          {
            "key": "gap",
            "label": "GAP (fraction of a cell)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 0.5,
            "step": 0.01
          },
          {
            "key": "tint",
            "label": "CREST TINT",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "direction",
            "label": "WAVE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "ripple",
                "Ripple (centre out)"
              ],
              [
                "left",
                "Left"
              ],
              [
                "right",
                "Right"
              ],
              [
                "up",
                "Up"
              ],
              [
                "down",
                "Down"
              ]
            ]
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "gridwave"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 96
  },
  {
    "id": "remocn_displacement",
    "componentName": "displacement",
    "name": "Displacement (remocn)",
    "desc": "remocn transition • every cell of a grid shears out of register at once with colour fringing and grain, hands over at the peak and slides back on the next scene (html-in-canvas WebGL2; lateral-jolt fallback)",
    "icon": "🧩",
    "tab": "community",
    "external": {
      "importPath": "./community/displacement",
      "exportName": "displacement",
      "packages": [
        "@remotion/transitions",
        "@paper-design/shaders-react"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "from",
          "to"
        ]
      },
      "transition": true
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "transitionAt": 30,
        "transitionFrames": 18,
        "grid": 60,
        "cellAspect": 1,
        "shift": 1,
        "aberration": 1,
        "grain": 0.5,
        "stagger": 0.45
      }
    },
    "controls": [
      {
        "group": "Displacement (remocn) • TRANSITION: wrap the outgoing layers as \"from\" and the incoming as \"to\"; fast: well under a second",
        "items": [
          {
            "key": "transitionAt",
            "label": "TRANSITION STARTS (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "transitionFrames",
            "label": "TRANSITION FRAMES (natural 18)",
            "kind": "range",
            "keyframable": false,
            "min": 10,
            "max": 300,
            "step": 1
          },
          {
            "key": "grid",
            "label": "CELLS ACROSS",
            "kind": "range",
            "keyframable": false,
            "min": 4,
            "max": 200,
            "step": 1
          },
          {
            "key": "cellAspect",
            "label": "CELL ASPECT (w / h)",
            "kind": "range",
            "keyframable": false,
            "min": 0.1,
            "max": 10,
            "step": 0.05
          },
          {
            "key": "shift",
            "label": "SHIFT (cells)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "aberration",
            "label": "RGB FRINGE",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3,
            "step": 0.05
          },
          {
            "key": "grain",
            "label": "GRAIN",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "stagger",
            "label": "STAGGER",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "transition",
      "style": "displace"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 78
  },
  {
    "id": "remocn_slide_swap",
    "componentName": "SlideSwapScenes",
    "name": "Slide Swap (remocn)",
    "desc": "remocn sequencer • shoves each scene off the canvas on an accelerating curve, then springs the next in from the opposite edge — no overlap, one constant canvas",
    "icon": "➡️",
    "tab": "community",
    "external": {
      "importPath": "./community/slide-swap",
      "exportName": "SlideSwapScenes",
      "sizeMode": "none",
      "children": {
        "slots": [
          "scene1",
          "scene2",
          "scene3",
          "scene4",
          "scene5",
          "scene6"
        ]
      },
      "sceneList": {
        "prop": "scenes",
        "durationsProp": "sceneDurations"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "sceneDurations": [
          70,
          70,
          70
        ],
        "axis": "x",
        "bg": "",
        "loop": false,
        "config": {
          "slideFrames": 30,
          "inDistance": 0.28,
          "inDamping": 60,
          "inStiffness": 300,
          "inMass": 0.5,
          "inFadeFrames": 24,
          "outFrames": 22,
          "outDistance": 0.1,
          "outPower": 5
        }
      }
    },
    "controls": [
      {
        "group": "Slide Swap (remocn) • SEQUENCER: wrap each scene's layers into slots scene1…scene6 (in order); layer length = sum of scene lengths; pre-roll scene content so it is already moving when it slides in",
        "items": [
          {
            "key": "sceneDurations",
            "label": "SCENE LENGTHS (JSON array, frames; default 70)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "axis",
            "label": "AXIS",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "x",
                "Horizontal"
              ],
              [
                "y",
                "Vertical"
              ]
            ]
          },
          {
            "key": "bg",
            "label": "CANVAS COLOUR (empty = transparent)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "loop",
            "label": "LOOP",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "config",
            "label": "CONFIG (JSON: slideFrames, inDistance, inDamping, inStiffness, inMass, inFadeFrames, outFrames, outDistance, outPower)",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "sequencer",
      "style": "slide"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 210
  },
  {
    "id": "remocn_spring_settle",
    "componentName": "SpringSettleScenes",
    "name": "Spring Settle (remocn)",
    "desc": "remocn sequencer • shrinks each scene away as one group, holds an empty beat (the stage colour changes only there), then lands the next scene’s layers from above on a staggered spring",
    "icon": "🎈",
    "tab": "community",
    "external": {
      "importPath": "./community/spring-settle",
      "exportName": "SpringSettleScenes",
      "packages": [
        "remotion"
      ],
      "sizeMode": "none",
      "children": {
        "slots": [
          "scene1",
          "scene2",
          "scene3",
          "scene4",
          "scene5",
          "scene6"
        ]
      },
      "sceneList": {
        "prop": "scenes",
        "durationsProp": "sceneDurations",
        "fields": {
          "bg": "sceneBgs"
        },
        "itemExport": "SpringSettleItem"
      },
      "extraExports": [
        "SpringSettleItem"
      ]
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "sceneDurations": [
          70,
          70,
          70
        ],
        "sceneBgs": [
          "#fbfbfa",
          "#141318",
          "#6d28d9"
        ],
        "loop": false,
        "config": {
          "gapFrames": 1,
          "enterScale": 1.24,
          "enterFadeFrames": 5,
          "enterStagger": 3,
          "enterStaggerPower": 0.8,
          "enterStaggerJitter": 1,
          "springDamping": 30,
          "springStiffness": 320,
          "springMass": 1,
          "exitFrames": 6,
          "exitScale": 0.84,
          "exitPower": 5,
          "bgFadeFrames": 4
        }
      }
    },
    "controls": [
      {
        "group": "Spring Settle (remocn) • SEQUENCER: wrap each scene's layers into slots scene1…scene6 (in order); each wrapped layer lands as its own item (layer order = stagger order); layer length = sum of lengths + gapFrames per scene",
        "items": [
          {
            "key": "sceneDurations",
            "label": "SCENE LENGTHS (JSON array, frames; default 70)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "sceneBgs",
            "label": "SCENE COLOURS (JSON array; crossfade in the gap)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "loop",
            "label": "LOOP",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "config",
            "label": "CONFIG (JSON: gapFrames, enterScale, enterStagger…, springDamping…, exitFrames, exitScale, exitPower, bgFadeFrames)",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "sequencer",
      "style": "settle"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 213
  },
  {
    "id": "remocn_github_stars",
    "componentName": "GitHubStars",
    "name": "GitHub Stars (remocn)",
    "desc": "remocn • stargazer list fly-through with a synced odometer counting up to the star total (timed from the layer length) • paints its theme background",
    "icon": "⭐",
    "tab": "community",
    "external": {
      "importPath": "./community/github-stars",
      "exportName": "GitHubStars",
      "packages": [
        "@remotion/google-fonts",
        "date-fns"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "repo": "remotion-dev/remotion",
        "totalStars": 24813,
        "orientation": "horizontal",
        "accentColor": "#ffbb00",
        "speed": 1,
        "theme": "light"
      }
    },
    "controls": [
      {
        "group": "GitHub Stars (remocn) (whole clip) • scales its own stage; counter lands at 80% of the layer; avatars load from GitHub (initial fallback on error)",
        "items": [
          {
            "key": "repo",
            "label": "REPO (owner/name)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "totalStars",
            "label": "TOTAL STARS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 10000000,
            "step": 1
          },
          {
            "key": "stargazers",
            "label": "STARGAZERS (JSON [{login, avatarUrl, starredAt}]; unset = sample)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "repoAvatarUrl",
            "label": "REPO AVATAR URL (optional)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "orientation",
            "label": "ORIENTATION",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "horizontal",
                "Horizontal (16:9 stage)"
              ],
              [
                "vertical",
                "Vertical (9:16 stage, letterboxed)"
              ]
            ]
          },
          {
            "key": "accentColor",
            "label": "ACCENT",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "theme",
            "label": "THEME",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          }
        ]
      }
    ],
    "preview": {
      "kind": "socialfx",
      "style": "stars"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_github_sponsors",
    "componentName": "GitHubSponsors",
    "name": "GitHub Sponsors (remocn)",
    "desc": "remocn • a self-drawing heart docks to a header, sponsor avatars blur-stagger into a grid, then a thank-you headline and the Become a sponsor CTA • paints its theme background",
    "icon": "💗",
    "tab": "community",
    "external": {
      "importPath": "./community/github-sponsors",
      "exportName": "GitHubSponsors",
      "packages": [
        "@remotion/google-fonts",
        "date-fns"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "account": "remocn",
        "accentColor": "#db61a2",
        "speed": 1,
        "theme": "light"
      }
    },
    "controls": [
      {
        "group": "GitHub Sponsors (remocn) (whole clip) • scales its own stage; grid sizes to the sponsor count",
        "items": [
          {
            "key": "account",
            "label": "ACCOUNT (github.com/sponsors/…)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "sponsors",
            "label": "SPONSORS (JSON [{login, avatarUrl}]; unset = sample)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "accentColor",
            "label": "ACCENT",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED (≥ 1)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "theme",
            "label": "THEME",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          }
        ]
      }
    ],
    "preview": {
      "kind": "socialfx",
      "style": "sponsors"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 270
  },
  {
    "id": "remocn_x_follow_card",
    "componentName": "XFollowCard",
    "name": "X Follow Card (remocn)",
    "desc": "remocn • X profile card bounces in, layers blur in, a cursor clicks Follow → Following at frame 110 • transparent",
    "icon": "🐦",
    "tab": "community",
    "external": {
      "importPath": "./community/x-follow-card",
      "exportName": "XFollowCard",
      "packages": [
        "@remotion/google-fonts",
        "date-fns"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "name": "Dmitri K",
        "handle": "kapishdima",
        "bio": "Building video tools with Remotion",
        "location": "Earth",
        "website": "remocn.dev",
        "joined": "Joined January 2023",
        "avatarUrl": "",
        "coverUrl": "",
        "verified": true,
        "accentColor": "#1d9bf0",
        "orientation": "horizontal",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "X Follow Card (remocn) (whole clip) • scales its own stage; pair with #f5f7f9",
        "items": [
          {
            "key": "name",
            "label": "NAME",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "handle",
            "label": "HANDLE (no @)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "bio",
            "label": "BIO",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "location",
            "label": "LOCATION",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "website",
            "label": "WEBSITE",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "joined",
            "label": "JOINED LINE",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "avatarUrl",
            "label": "AVATAR URL (empty = gradient)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "coverUrl",
            "label": "COVER URL (empty = accent gradient)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "verified",
            "label": "VERIFIED BADGE",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "accentColor",
            "label": "ACCENT",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "orientation",
            "label": "ORIENTATION",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "horizontal",
                "Horizontal (16:9 stage)"
              ],
              [
                "vertical",
                "Vertical (9:16 stage, letterboxed)"
              ]
            ]
          },
          {
            "key": "speed",
            "label": "SPEED (≥ 1)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "socialfx",
      "style": "followcard"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 165
  },
  {
    "id": "remocn_x_followers_overview",
    "componentName": "XFollowersOverview",
    "name": "X Followers Overview (remocn)",
    "desc": "remocn • follow notifications flip through on a 3D carousel, then the total follower count pops in with avatar, handle and a confetti burst (timed from the layer length) • transparent",
    "icon": "📈",
    "tab": "community",
    "external": {
      "importPath": "./community/x-followers-overview",
      "exportName": "XFollowersOverview",
      "packages": [
        "@remotion/google-fonts",
        "date-fns"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "totalFollowers": 1709,
        "handle": "remocn",
        "avatarUrl": "",
        "accentColor": "#1d9bf0",
        "orientation": "horizontal",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "X Followers Overview (remocn) (whole clip) • scales its own stage; pair with white",
        "items": [
          {
            "key": "notifications",
            "label": "NOTIFICATIONS (JSON [{name, verified, time}]; unset = sample)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "totalFollowers",
            "label": "TOTAL FOLLOWERS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 100000000,
            "step": 1
          },
          {
            "key": "handle",
            "label": "HANDLE (no @)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "avatarUrl",
            "label": "AVATAR URL (empty = initial)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "accentColor",
            "label": "ACCENT (verified badge)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "orientation",
            "label": "ORIENTATION",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "horizontal",
                "Horizontal (16:9 stage)"
              ],
              [
                "vertical",
                "Vertical (9:16 stage, letterboxed)"
              ]
            ]
          },
          {
            "key": "speed",
            "label": "SPEED (≥ 1)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "socialfx",
      "style": "followers"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 360
  },
  {
    "id": "remocn_logo_enter",
    "componentName": "LogoEnter",
    "name": "Logo Enter (remocn)",
    "desc": "remocn • a stacked group of round ring-bordered brand chips springs in one by one, then holds (sample AI-tool marks; edit the file for your own) • transparent",
    "icon": "🔵",
    "tab": "community",
    "external": {
      "importPath": "./community/logo-enter",
      "exportName": "LogoEnter",
      "packages": [
        "@remotion/google-fonts",
        "date-fns"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "diameter": 177,
        "overlap": 57,
        "ringColor": "#ffffff",
        "orientation": "horizontal",
        "stagger": 7,
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Logo Enter (remocn) (whole clip) • px at composition scale (1.5 × the 720p defaults); logos are fixed in the file",
        "items": [
          {
            "key": "diameter",
            "label": "CHIP DIAMETER px",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 600,
            "step": 1
          },
          {
            "key": "overlap",
            "label": "OVERLAP px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 300,
            "step": 1
          },
          {
            "key": "ringColor",
            "label": "RING",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "orientation",
            "label": "STACK",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "horizontal",
                "Row"
              ],
              [
                "vertical",
                "Column"
              ]
            ]
          },
          {
            "key": "stagger",
            "label": "STAGGER (frames)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 30,
            "step": 1
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "socialfx",
      "style": "logos"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 90
  },
  {
    "id": "remocn_cursor_gravity",
    "componentName": "CursorGravity",
    "name": "Cursor Gravity (remocn)",
    "desc": "remocn • a rounded triangular cursor tugs a CTA button out of the right edge with pulsed elastic resistance, then it settles centre • paints its background",
    "icon": "🧲",
    "tab": "community",
    "external": {
      "importPath": "./community/cursor-gravity",
      "exportName": "CursorGravity",
      "packages": [
        "@remotion/google-fonts",
        "date-fns"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "label": "Create something",
        "tension": 1,
        "cursorColor": "#fffaf0",
        "color": "#fffaf0",
        "textColor": "#32153c",
        "backgroundColor": "#a800b7",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Cursor Gravity (remocn) (whole clip) • reveal done at 151, hold to 180",
        "items": [
          {
            "key": "label",
            "label": "BUTTON LABEL",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "tension",
            "label": "TENSION (0–1.5)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1.5,
            "step": 0.01
          },
          {
            "key": "cursorColor",
            "label": "CURSOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "color",
            "label": "BUTTON",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "textColor",
            "label": "LABEL",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "backgroundColor",
            "label": "BACKGROUND (CSS, or transparent)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "socialfx",
      "style": "gravity"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 180
  },
  {
    "id": "remocn_radial_burst",
    "componentName": "RadialBurst",
    "name": "Radial Burst (remocn)",
    "desc": "remocn • a circle bursts into twisting ribbons that close into a tilted ring, contract, then sweep out through contour echoes, leaving a clean field for the title • paints its background",
    "icon": "🌸",
    "tab": "community",
    "external": {
      "importPath": "./community/radial-burst",
      "exportName": "RadialBurst",
      "packages": [
        "@remotion/google-fonts",
        "date-fns"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "segments": 8,
        "radius": 210,
        "thickness": 30,
        "rotation": 135,
        "intensity": 1,
        "twist": 110,
        "echoes": 3,
        "accentColor": "#f4e4a7",
        "color": "#ffffff",
        "backgroundColor": "#a800b7",
        "speed": 1,
        "loop": false
      }
    },
    "controls": [
      {
        "group": "Radial Burst (remocn) (whole clip) • shapes gone at 114; drop the title in around 108",
        "items": [
          {
            "key": "segments",
            "label": "SEGMENTS (4–16)",
            "kind": "range",
            "keyframable": false,
            "min": 4,
            "max": 16,
            "step": 1
          },
          {
            "key": "radius",
            "label": "RADIUS (720p ref)",
            "kind": "range",
            "keyframable": false,
            "min": 100,
            "max": 280,
            "step": 1
          },
          {
            "key": "thickness",
            "label": "THICKNESS (720p ref)",
            "kind": "range",
            "keyframable": false,
            "min": 8,
            "max": 60,
            "step": 1
          },
          {
            "key": "rotation",
            "label": "ROTATION °",
            "kind": "range",
            "keyframable": false,
            "min": -720,
            "max": 720,
            "step": 1
          },
          {
            "key": "intensity",
            "label": "INTENSITY (0–1.5)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1.5,
            "step": 0.01
          },
          {
            "key": "twist",
            "label": "TWIST °",
            "kind": "range",
            "keyframable": false,
            "min": -180,
            "max": 180,
            "step": 1
          },
          {
            "key": "echoes",
            "label": "ECHOES (0–5)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 1
          },
          {
            "key": "accentColor",
            "label": "ACCENT",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "color",
            "label": "RIBBONS",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "backgroundColor",
            "label": "BACKGROUND (CSS, or transparent)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED (0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "loop",
            "label": "LOOP",
            "kind": "checkbox",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "socialfx",
      "style": "burst"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_tv_power_off",
    "componentName": "TvPowerOff",
    "name": "TV Power Off (remocn)",
    "desc": "remocn • WRAPPER: the wrapped scene collapses into a glowing line, pinches to a phosphor dot, and leaves dead black (html-in-canvas filter; CSS fallback)",
    "icon": "📺",
    "tab": "community",
    "external": {
      "importPath": "./community/tv-power-off",
      "exportName": "TvPowerOff",
      "packages": [
        "@remotion/google-fonts",
        "date-fns"
      ],
      "sizeMode": "none",
      "children": {
        "fit": "full"
      },
      "renameProps": {
        "collapseFrames": "durationInFrames"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "delay": 30,
        "collapseFrames": 18,
        "gain": 1,
        "afterglow": 1,
        "phosphor": "#d8ecff"
      }
    },
    "controls": [
      {
        "group": "TV Power Off (remocn) (whole clip) • wrap the scene with update_asset wraps; black after the dot",
        "items": [
          {
            "key": "delay",
            "label": "DELAY (frames of untouched scene)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "collapseFrames",
            "label": "COLLAPSE FRAMES (18 = hard cut, ~30 = dying tube)",
            "kind": "range",
            "keyframable": false,
            "min": 4,
            "max": 120,
            "step": 1
          },
          {
            "key": "gain",
            "label": "GAIN (line blow-out)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3,
            "step": 0.05
          },
          {
            "key": "afterglow",
            "label": "AFTERGLOW",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3,
            "step": 0.05
          },
          {
            "key": "phosphor",
            "label": "PHOSPHOR",
            "kind": "color",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "socialfx",
      "style": "tvoff"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 60
  },
  {
    "id": "remocn_confetti",
    "componentName": "Confetti",
    "name": "Confetti (remocn)",
    "desc": "remocn • deterministic seeded confetti burst with gravity, spin and flutter, fired at startFrame • transparent overlay",
    "icon": "🎉",
    "tab": "community",
    "external": {
      "importPath": "./community/confetti",
      "exportName": "Confetti",
      "packages": [
        "@remotion/google-fonts",
        "date-fns"
      ],
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "particleCount": 140,
        "originX": 0.5,
        "originY": 0.5,
        "startFrame": 0,
        "lifetime": 90,
        "power": 17,
        "gravity": 0.45,
        "size": 13,
        "seed": 1
      }
    },
    "controls": [
      {
        "group": "Confetti (remocn) (whole clip) • same seed = same burst",
        "items": [
          {
            "key": "particleCount",
            "label": "PIECES",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 1000,
            "step": 1
          },
          {
            "key": "colors",
            "label": "COLORS (JSON array; unset = 6 brand colours)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "originX",
            "label": "ORIGIN X (0–1)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "originY",
            "label": "ORIGIN Y (0–1)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "startFrame",
            "label": "FIRES AT (layer frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "lifetime",
            "label": "LIFETIME frames",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 600,
            "step": 1
          },
          {
            "key": "power",
            "label": "POWER (720p px/frame)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 60,
            "step": 0.5
          },
          {
            "key": "gravity",
            "label": "GRAVITY",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3,
            "step": 0.01
          },
          {
            "key": "size",
            "label": "SIZE (720p px)",
            "kind": "range",
            "keyframable": false,
            "min": 2,
            "max": 60,
            "step": 1
          },
          {
            "key": "seed",
            "label": "SEED",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 9999,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "socialfx",
      "style": "confetti"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 90
  },
  {
    "id": "remocn_paper_wobble",
    "componentName": "PaperWobble",
    "name": "Paper Wobble (remocn)",
    "desc": "remocn • WRAPPER: holds one small offset + tilt per stop-motion pose, then snaps to the next — wrapped layers feel hand-placed on a desk",
    "icon": "🫨",
    "tab": "community",
    "external": {
      "importPath": "./community/paper-wobble",
      "exportName": "PaperWobble",
      "sizeMode": "none",
      "children": {
        "fit": "full"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "seed": "wobble",
        "amp": 2.1,
        "rotAmp": 0.35,
        "step": 3,
        "style": {
          "position": "absolute",
          "inset": 0
        }
      }
    },
    "controls": [
      {
        "group": "Paper Wobble (remocn) (whole clip) • wrap layers with update_asset wraps; one layer per object, each with its own seed",
        "items": [
          {
            "key": "seed",
            "label": "SEED (same seed = lockstep)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "amp",
            "label": "MAX OFFSET px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 20,
            "step": 0.1
          },
          {
            "key": "rotAmp",
            "label": "MAX TILT °",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.01
          },
          {
            "key": "step",
            "label": "FRAMES PER POSE",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 12,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "paperfx",
      "style": "wobble"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 90
  },
  {
    "id": "remocn_ink_arrow",
    "componentName": "InkArrow",
    "name": "Ink Arrow (remocn)",
    "desc": "remocn • a hand-drawn brush arrow drags itself from one point to another in stop-motion poses, then draws its head one stroke at a time • transparent",
    "icon": "↘️",
    "tab": "community",
    "external": {
      "importPath": "./community/ink-arrow",
      "exportName": "InkArrow",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 700,
      "baseY": 350,
      "customProperties": {
        "width": 480,
        "height": 345,
        "from": {
          "x": 30,
          "y": 30
        },
        "to": {
          "x": 450,
          "y": 315
        },
        "curvature": 0.35,
        "color": "#26242c",
        "strokeWidth": 12,
        "pressure": 0.2,
        "release": 1,
        "grain": 1,
        "delay": 0,
        "drawDur": 36,
        "headSize": 36,
        "seed": "arrow",
        "step": 3
      }
    },
    "controls": [
      {
        "group": "Ink Arrow (remocn) (whole clip) • from/to are px in the layer box (the box only positions it; the arrow may overflow)",
        "items": [
          {
            "key": "from",
            "label": "FROM (JSON {x, y})",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "to",
            "label": "TO (JSON {x, y}) — head lands here",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "curvature",
            "label": "CURVATURE (± bow)",
            "kind": "range",
            "keyframable": false,
            "min": -1.5,
            "max": 1.5,
            "step": 0.01
          },
          {
            "key": "color",
            "label": "INK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "strokeWidth",
            "label": "BRUSH WIDTH px",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 60,
            "step": 0.5
          },
          {
            "key": "pressure",
            "label": "OPENING PRESSURE",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "release",
            "label": "RELEASE (weight at head)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 2,
            "step": 0.01
          },
          {
            "key": "grain",
            "label": "GRAIN (0 = clean)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3,
            "step": 0.05
          },
          {
            "key": "delay",
            "label": "DELAY frames",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "drawDur",
            "label": "DRAW frames",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 300,
            "step": 1
          },
          {
            "key": "headSize",
            "label": "HEAD STROKE px",
            "kind": "range",
            "keyframable": false,
            "min": 4,
            "max": 200,
            "step": 1
          },
          {
            "key": "headDur",
            "label": "HEAD frames (unset = 4 poses)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 120,
            "step": 1
          },
          {
            "key": "seed",
            "label": "SEED",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "step",
            "label": "FRAMES PER POSE",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 12,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "paperfx",
      "style": "arrow"
    },
    "defaultDurationInFrames": 150
  },
  {
    "id": "remocn_scribble_circle",
    "componentName": "ScribbleCircle",
    "name": "Scribble Circle (remocn)",
    "desc": "remocn • a brush loop sweeps once (and a bit) around a region, opening thin and closing thick with dry-brush grain • transparent; box = the loop",
    "icon": "⭕",
    "tab": "community",
    "external": {
      "importPath": "./community/scribble-circle",
      "exportName": "ScribbleCircle",
      "sizeMode": "props"
    },
    "defaults": {
      "baseX": 800,
      "baseY": 440,
      "customProperties": {
        "width": 320,
        "height": 190,
        "color": "#6f7f35",
        "strokeWidth": 21,
        "pressure": 0.2,
        "grain": 1,
        "delay": 0,
        "durationSteps": 10,
        "laps": 1.15,
        "seed": "scribble",
        "step": 3
      }
    },
    "controls": [
      {
        "group": "Scribble Circle (remocn) (whole clip) • box width/height = the loop; place it over what you are circling",
        "items": [
          {
            "key": "color",
            "label": "INK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "strokeWidth",
            "label": "BRUSH WIDTH px",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 80,
            "step": 0.5
          },
          {
            "key": "pressure",
            "label": "OPENING PRESSURE (1 = no taper)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "grain",
            "label": "GRAIN (0 = clean)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3,
            "step": 0.05
          },
          {
            "key": "delay",
            "label": "DELAY frames",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "durationSteps",
            "label": "POSES TO DRAW",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 60,
            "step": 1
          },
          {
            "key": "laps",
            "label": "LAPS (>1 overshoots)",
            "kind": "range",
            "keyframable": false,
            "min": 0.2,
            "max": 4,
            "step": 0.01
          },
          {
            "key": "seed",
            "label": "SEED",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "step",
            "label": "FRAMES PER POSE",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 12,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "paperfx",
      "style": "scribble"
    },
    "defaultDurationInFrames": 150
  },
  {
    "id": "remocn_crumple_toss",
    "componentName": "CrumpleToss",
    "name": "Crumple Toss (remocn)",
    "desc": "remocn • WRAPPER: crushes the wrapped element into a shaded paper ball (it folds, no swap) and throws it out of frame — put the replacement behind it",
    "icon": "🗑️",
    "tab": "community",
    "external": {
      "importPath": "./community/crumple-toss",
      "exportName": "CrumpleToss",
      "sizeMode": "props",
      "children": {
        "fit": "box"
      }
    },
    "defaults": {
      "baseX": 510,
      "baseY": 300,
      "customProperties": {
        "width": 900,
        "height": 480,
        "at": 6,
        "segments": 9,
        "layers": 2,
        "randomness": 0.6,
        "crumpleSteps": 4,
        "tossSteps": 5,
        "direction": -35,
        "distance": 1350,
        "spin": 220,
        "crushTo": 0.34,
        "seed": "toss",
        "step": 3
      }
    },
    "controls": [
      {
        "group": "Crumple Toss (remocn) (whole clip) • box = the element being thrown; wrap its layers (they keep their place); renders nothing after at + (crumple + toss) poses",
        "items": [
          {
            "key": "at",
            "label": "CRUMPLE AT (frame)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 600,
            "step": 1
          },
          {
            "key": "segments",
            "label": "WEDGES",
            "kind": "range",
            "keyframable": false,
            "min": 3,
            "max": 24,
            "step": 1
          },
          {
            "key": "layers",
            "label": "LAYERS per wedge",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 4,
            "step": 1
          },
          {
            "key": "randomness",
            "label": "RANDOMNESS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "crumpleSteps",
            "label": "CRUSH POSES",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 20,
            "step": 1
          },
          {
            "key": "tossSteps",
            "label": "FLIGHT POSES",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 20,
            "step": 1
          },
          {
            "key": "direction",
            "label": "THROW ANGLE ° (neg = up)",
            "kind": "range",
            "keyframable": false,
            "min": -180,
            "max": 180,
            "step": 1
          },
          {
            "key": "distance",
            "label": "ARC SCALE",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 4000,
            "step": 10
          },
          {
            "key": "spin",
            "label": "SPIN °",
            "kind": "range",
            "keyframable": false,
            "min": -1080,
            "max": 1080,
            "step": 5
          },
          {
            "key": "crushTo",
            "label": "WAD SIZE (of shorter side)",
            "kind": "range",
            "keyframable": false,
            "min": 0.05,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "seed",
            "label": "SEED",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "step",
            "label": "FRAMES PER POSE",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 12,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "paperfx",
      "style": "crumple"
    },
    "defaultDurationInFrames": 45
  },
  {
    "id": "remocn_simulated_cursor",
    "componentName": "SimulatedCursor",
    "name": "Simulated Cursor (remocn)",
    "desc": "remocn • a synthetic mouse cursor walks waypoints (24-frame legs + holds) and fires a click ripple, for narrating a UI • transparent overlay",
    "icon": "🖱️",
    "tab": "community",
    "external": {
      "importPath": "./community/simulated-cursor",
      "exportName": "SimulatedCursor",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "points": [
          {
            "x": 300,
            "y": 225,
            "hold": 20
          },
          {
            "x": 1200,
            "y": 540,
            "hold": 25,
            "click": true
          },
          {
            "x": 1575,
            "y": 840,
            "hold": 20
          }
        ],
        "color": "#ffffff",
        "size": 48,
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Simulated Cursor (remocn) (whole clip) • points are composition pixels",
        "items": [
          {
            "key": "points",
            "label": "POINTS (JSON [{x, y, hold?, click?}])",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "color",
            "label": "CURSOR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "size",
            "label": "SIZE px",
            "kind": "range",
            "keyframable": false,
            "min": 8,
            "max": 200,
            "step": 1
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "paperfx",
      "style": "cursor"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150
  },
  {
    "id": "remocn_ecosystem_constellation",
    "componentName": "EcosystemConstellation",
    "name": "Ecosystem Constellation (remocn)",
    "desc": "remocn • a central product hub orbited by integration satellites (GitHub, Vercel, Stripe, Slack, Linear, Figma, Notion, Discord) that spring in, then orbit and fire data lines one at a time • transparent",
    "icon": "🪐",
    "tab": "community",
    "external": {
      "importPath": "./community/ecosystem-constellation",
      "exportName": "EcosystemConstellation",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "satelliteCount": 6,
        "centerLabel": "V",
        "accentColor": "#a855f7",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Ecosystem Constellation (remocn) (whole clip) • 1280×720 layout at scale 1.5; logos are fixed in the file; pair with a dark radial backdrop",
        "items": [
          {
            "key": "satelliteCount",
            "label": "SATELLITES (3–8)",
            "kind": "range",
            "keyframable": false,
            "min": 3,
            "max": 8,
            "step": 1
          },
          {
            "key": "centerLabel",
            "label": "HUB LABEL",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "accentColor",
            "label": "ACCENT",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "comps",
      "style": "constellation"
    },
    "defaultDurationInFrames": 240
  },
  {
    "id": "remocn_infinite_bento_pan",
    "componentName": "InfiniteBentoPan",
    "name": "Infinite Bento Pan (remocn)",
    "desc": "remocn • one linear diagonal camera glide over an oversized grid of live-looking bento dashboard cards, with a vignette (filler data) • transparent",
    "icon": "🍱",
    "tab": "community",
    "external": {
      "importPath": "./community/infinite-bento-pan",
      "exportName": "InfiniteBentoPan",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "panSpeed": 1,
        "accentColor": "#7c3aed",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Infinite Bento Pan (remocn) (whole clip) • 1280×720 layout at scale 1.5; glide spans the layer length; pair with #050505",
        "items": [
          {
            "key": "panSpeed",
            "label": "PAN DISTANCE (≤ 1 = one traversal)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "accentColor",
            "label": "ACCENT",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "comps",
      "style": "bento"
    },
    "defaultDurationInFrames": 300
  },
  {
    "id": "remocn_live_code_compilation",
    "componentName": "LiveCodeCompilation",
    "name": "Live Code Compilation (remocn)",
    "desc": "remocn • split screen: a Button component is typed on the left and the preview button on the right snaps to each finished style prop (HMR moment) • paints its own background",
    "icon": "⚡",
    "tab": "community",
    "external": {
      "importPath": "./community/live-code-compilation",
      "exportName": "LiveCodeCompilation",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "accentColor": "#3b82f6",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Live Code Compilation (remocn) (whole clip) • 1280×720 layout at scale 1.5; code and button are fixed in the file",
        "items": [
          {
            "key": "accentColor",
            "label": "ACCENT",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED (leave at 1)",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "comps",
      "style": "livecode"
    },
    "defaultDurationInFrames": 260
  },
  {
    "id": "remocn_ui_accordion",
    "componentName": "AccordionTimeline",
    "name": "Accordion (remocn-ui)",
    "desc": "remocn-ui • a shadcn accordion item whose panel opens and closes on scripted timeline steps (chevron flips, item fills) • transparent",
    "icon": "🪗",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "AccordionTimeline",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "steps": [
          {
            "at": 18,
            "state": "opened",
            "duration": 16
          },
          {
            "at": 78,
            "state": "closed",
            "duration": 12
          }
        ],
        "smooth": true,
        "speed": 1,
        "mode": "light",
        "title": "Is it accessible?",
        "content": "Yes. It adheres to the WAI-ARIA design pattern.",
        "contentHeight": 64,
        "variant": "default"
      }
    },
    "controls": [
      {
        "group": "Accordion (remocn-ui) (whole clip) • 1280×720 layout at scale 1.5; card is 440 px wide, centred",
        "items": [
          {
            "key": "steps",
            "label": "STEPS (JSON [{at, state, duration?}] — layer frames; states: opened | closed)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH (transition hook; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "title",
            "label": "TITLE",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "content",
            "label": "CONTENT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "contentHeight",
            "label": "PANEL HEIGHT px (Remotion cannot measure auto height)",
            "kind": "range",
            "keyframable": false,
            "min": 20,
            "max": 300,
            "step": 1
          },
          {
            "key": "variant",
            "label": "VARIANT",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "default",
                "Default (bordered, fills)"
              ],
              [
                "ghost",
                "Ghost"
              ]
            ]
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "accordion"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_alert_dialog",
    "componentName": "AlertDialogTimeline",
    "name": "Alert Dialog (remocn-ui)",
    "desc": "remocn-ui • a destructive \"are you sure?\" modal: backdrop dims to 50% black, popup fades in and zooms 0.95 → 1 on scripted steps • transparent, compose over a scene",
    "icon": "⚠️",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "AlertDialogTimeline",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "steps": [
          {
            "at": 32,
            "state": "opened",
            "duration": 16
          },
          {
            "at": 92,
            "state": "closed",
            "duration": 12
          }
        ],
        "smooth": true,
        "speed": 1,
        "mode": "light",
        "title": "Delete account?",
        "description": "This action cannot be undone. This will permanently remove your data from our servers.",
        "actionLabel": "Delete",
        "cancelLabel": "Cancel"
      }
    },
    "controls": [
      {
        "group": "Alert Dialog (remocn-ui) (whole clip) • 1280×720 layout at scale 1.5; the backdrop dims this whole box — keep it full frame",
        "items": [
          {
            "key": "steps",
            "label": "STEPS (JSON [{at, state, duration?}] — layer frames; states: opened | closed)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH (transition hook; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "title",
            "label": "TITLE",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "description",
            "label": "DESCRIPTION",
            "kind": "multiline",
            "keyframable": false
          },
          {
            "key": "actionLabel",
            "label": "ACTION (destructive)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "cancelLabel",
            "label": "CANCEL",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "alertdialog"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_button",
    "componentName": "ButtonTimeline",
    "name": "Button (remocn-ui)",
    "desc": "remocn-ui • a shadcn button scripted through idle → hover → press → loading (spinner) → success (check) • transparent",
    "icon": "🔘",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "ButtonTimeline",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "steps": [
          {
            "at": 12,
            "state": "hover"
          },
          {
            "at": 30,
            "state": "press"
          },
          {
            "at": 48,
            "state": "loading",
            "duration": 6
          },
          {
            "at": 96,
            "state": "success",
            "duration": 16
          }
        ],
        "smooth": true,
        "speed": 1,
        "mode": "light",
        "label": "Continue",
        "variant": "default",
        "size": "default",
        "primary": "",
        "align": "center"
      }
    },
    "controls": [
      {
        "group": "Button (remocn-ui) (whole clip) • 1280×720 layout at scale 1.5; SPEED also spins the loading spinner",
        "items": [
          {
            "key": "steps",
            "label": "STEPS (JSON [{at, state, duration?}] — layer frames; states: idle | hover | press | loading | success)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH (transition hook; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "label",
            "label": "LABEL",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "variant",
            "label": "VARIANT",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "default",
                "Default"
              ],
              [
                "secondary",
                "Secondary"
              ],
              [
                "destructive",
                "Destructive"
              ],
              [
                "outline",
                "Outline"
              ],
              [
                "ghost",
                "Ghost"
              ]
            ]
          },
          {
            "key": "size",
            "label": "SIZE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "sm",
                "Small (32)"
              ],
              [
                "default",
                "Default (40)"
              ],
              [
                "lg",
                "Large (48)"
              ]
            ]
          },
          {
            "key": "align",
            "label": "ALIGN IN BOX",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "start",
                "Start"
              ],
              [
                "center",
                "Centre"
              ],
              [
                "end",
                "End"
              ]
            ]
          },
          {
            "key": "primary",
            "label": "PRIMARY (blank = theme)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "button"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_blur_in",
    "componentName": "BlurInTimeline",
    "name": "Blur In (remocn-ui)",
    "desc": "remocn-ui • WRAPPER: reveals the wrapped layers with blur + opacity + a directional offset on scripted steps (hidden → revealed) • theme-free",
    "icon": "🌫️",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "BlurInTimeline",
      "sizeMode": "none",
      "children": {
        "fit": "full"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "steps": [
          {
            "at": 0,
            "state": "hidden"
          },
          {
            "at": 8,
            "state": "revealed",
            "duration": 18
          }
        ],
        "smooth": true,
        "speed": 1,
        "blur": 12,
        "direction": "up",
        "distance": 18
      }
    },
    "controls": [
      {
        "group": "Blur In (remocn-ui) (whole clip) • wrap layers with update_asset wraps; one wrapper per element to stagger; blur/offset are 1.5× the 720p defaults",
        "items": [
          {
            "key": "steps",
            "label": "STEPS (JSON [{at, state, duration?}] — layer frames; states: hidden | revealed)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH (transition hook; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "blur",
            "label": "HIDDEN BLUR px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 60,
            "step": 0.5
          },
          {
            "key": "direction",
            "label": "TRAVELS INTO PLACE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "up",
                "Up (starts below)"
              ],
              [
                "down",
                "Down"
              ],
              [
                "left",
                "Left"
              ],
              [
                "right",
                "Right"
              ]
            ]
          },
          {
            "key": "distance",
            "label": "OFFSET px (0 = in place)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 200,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "blurin"
    },
    "defaultDurationInFrames": 120,
    "fullFrame": true
  },
  {
    "id": "remocn_ui_spinner",
    "componentName": "Spinner",
    "name": "Spinner (remocn-ui)",
    "desc": "remocn-ui • motion atom: a quarter-arc loading spinner turning 6° per frame (× speed) • the box width is its size",
    "icon": "🌀",
    "tab": "community",
    "external": {
      "importPath": "./community/spinner",
      "exportName": "Spinner",
      "sizeMode": "props",
      "omitProps": [
        "height"
      ],
      "renameProps": {
        "width": "size"
      }
    },
    "defaults": {
      "baseX": 936,
      "baseY": 516,
      "scale": 1,
      "customProperties": {
        "width": 48,
        "height": 48,
        "color": "#0a0a0a",
        "speed": 1,
        "strokeWidth": 2.5
      }
    },
    "controls": [
      {
        "group": "Spinner (remocn-ui) (whole clip) • box width = size",
        "items": [
          {
            "key": "color",
            "label": "COLOUR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.1,
            "max": 6,
            "step": 0.05
          },
          {
            "key": "strokeWidth",
            "label": "STROKE (24-unit viewBox)",
            "kind": "range",
            "keyframable": false,
            "min": 0.5,
            "max": 6,
            "step": 0.1
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "spinner"
    },
    "defaultDurationInFrames": 90
  },
  {
    "id": "remocn_ui_caret",
    "componentName": "Caret",
    "name": "Caret (remocn-ui)",
    "desc": "remocn-ui • a text insertion caret: blinks on the timeline, or holds a controlled opacity • the box is the bar",
    "icon": "▏",
    "tab": "community",
    "external": {
      "importPath": "./community/caret",
      "exportName": "Caret",
      "sizeMode": "props"
    },
    "defaults": {
      "baseX": 958,
      "baseY": 519,
      "scale": 1,
      "customProperties": {
        "width": 3,
        "height": 42,
        "radius": 1.5,
        "color": "#0a0a0a",
        "blink": true,
        "blinkPerSecond": 1,
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Caret (remocn-ui) (whole clip) • box = bar size; defaults are 1.5× the 720p bar",
        "items": [
          {
            "key": "color",
            "label": "COLOUR",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "blink",
            "label": "BLINK",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "blinkPerSecond",
            "label": "BLINKS / SECOND",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 6,
            "step": 0.05
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "radius",
            "label": "RADIUS px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 10,
            "step": 0.5
          },
          {
            "key": "opacity",
            "label": "CONTROLLED OPACITY (overrides blink)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "caret"
    },
    "defaultDurationInFrames": 90
  },
  {
    "id": "remocn_ui_checkbox",
    "componentName": "CheckboxTimeline",
    "name": "Checkbox (remocn-ui)",
    "desc": "remocn-ui • a shadcn checkbox that fills with primary and draws its check on scripted steps (checked ↔ unchecked), optional label • transparent",
    "icon": "☑️",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "CheckboxTimeline",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "steps": [
          {
            "at": 18,
            "state": "checked",
            "duration": 14
          },
          {
            "at": 78,
            "state": "unchecked",
            "duration": 12
          }
        ],
        "smooth": true,
        "speed": 1,
        "mode": "light",
        "label": "Accept terms",
        "size": "default",
        "align": "center",
        "primary": ""
      }
    },
    "controls": [
      {
        "group": "Checkbox (remocn-ui) (whole clip) • 1280×720 layout at scale 1.5; stack several checkbox layers for a to-do list",
        "items": [
          {
            "key": "steps",
            "label": "STEPS (JSON [{at, state, duration?}] — layer frames; states: unchecked | checked)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH (transition hook; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "label",
            "label": "LABEL (blank = bare box)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "size",
            "label": "SIZE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "sm",
                "Small (16)"
              ],
              [
                "default",
                "Default (20)"
              ],
              [
                "lg",
                "Large (24)"
              ]
            ]
          },
          {
            "key": "align",
            "label": "ALIGN IN BOX",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "start",
                "Start"
              ],
              [
                "center",
                "Centre"
              ],
              [
                "end",
                "End"
              ]
            ]
          },
          {
            "key": "primary",
            "label": "PRIMARY (blank = theme)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "checkbox"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_dialog",
    "componentName": "DialogTimeline",
    "name": "Dialog (remocn-ui)",
    "desc": "remocn-ui • a generic modal (edit profile): backdrop dims to 50%, popup with close ✕ fades and zooms in on scripted steps; primary action • transparent, compose over a scene",
    "icon": "🪟",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "DialogTimeline",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "steps": [
          {
            "at": 32,
            "state": "opened",
            "duration": 16
          },
          {
            "at": 92,
            "state": "closed",
            "duration": 12
          }
        ],
        "smooth": true,
        "speed": 1,
        "mode": "light",
        "title": "Edit profile",
        "description": "Make changes to your profile here. Click save when you're done.",
        "actionLabel": "Save changes",
        "cancelLabel": "Cancel"
      }
    },
    "controls": [
      {
        "group": "Dialog (remocn-ui) (whole clip) • 1280×720 layout at scale 1.5; the backdrop dims this whole box — keep it full frame",
        "items": [
          {
            "key": "steps",
            "label": "STEPS (JSON [{at, state, duration?}] — layer frames; states: opened | closed)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH (transition hook; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "title",
            "label": "TITLE",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "description",
            "label": "DESCRIPTION",
            "kind": "multiline",
            "keyframable": false
          },
          {
            "key": "actionLabel",
            "label": "ACTION (primary)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "cancelLabel",
            "label": "CANCEL",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "dialog"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_drawer",
    "componentName": "DrawerTimeline",
    "name": "Drawer (remocn-ui)",
    "desc": "remocn-ui • a bottom sheet with a drag handle that slides up from the bottom edge over a 50% backdrop on scripted steps • transparent, compose over a scene",
    "icon": "🗄️",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "DrawerTimeline",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "steps": [
          {
            "at": 32,
            "state": "opened",
            "duration": 16
          },
          {
            "at": 92,
            "state": "closed",
            "duration": 12
          }
        ],
        "smooth": true,
        "speed": 1,
        "mode": "light",
        "title": "Edit profile",
        "description": "Make changes to your profile here. Click save when you're done.",
        "actionLabel": "Save changes",
        "cancelLabel": "Cancel"
      }
    },
    "controls": [
      {
        "group": "Drawer (remocn-ui) (whole clip) • 1280×720 layout at scale 1.5; panel spans the box width and sits on its bottom edge — keep it full frame",
        "items": [
          {
            "key": "steps",
            "label": "STEPS (JSON [{at, state, duration?}] — layer frames; states: opened | closed)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH (transition hook; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "title",
            "label": "TITLE",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "description",
            "label": "DESCRIPTION",
            "kind": "multiline",
            "keyframable": false
          },
          {
            "key": "actionLabel",
            "label": "ACTION (primary)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "cancelLabel",
            "label": "CANCEL",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "drawer"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_combobox",
    "componentName": "ComboboxTimeline",
    "name": "Combobox (remocn-ui)",
    "desc": "remocn-ui • a searchable select: the query types into the trigger, the panel opens below and filters the options, rows hover / press / select on scripted steps • transparent",
    "icon": "🔽",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "ComboboxTimeline",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "steps": [
          {
            "at": 16,
            "state": "opened",
            "duration": 12
          },
          {
            "at": 96,
            "state": "closed",
            "duration": 12
          }
        ],
        "smooth": true,
        "speed": 1,
        "mode": "light",
        "query": "ba",
        "typeStart": 32,
        "cps": 4,
        "placeholder": "Select a fruit…",
        "items": [
          "Apple",
          "Banana",
          "Orange",
          "Grape"
        ],
        "rowSteps": [
          {
            "at": 60,
            "index": 0,
            "state": "hover",
            "duration": 8
          },
          {
            "at": 72,
            "index": 0,
            "state": "press",
            "duration": 6
          },
          {
            "at": 80,
            "index": 0,
            "state": "selected",
            "duration": 8
          }
        ],
        "selectedIndex": -1,
        "highlightedIndex": -1,
        "pressedIndex": -1
      }
    },
    "controls": [
      {
        "group": "Combobox (remocn-ui) (whole clip) • 1280×720 layout at scale 1.5; trigger 280 px wide, centred; the panel opens below it",
        "items": [
          {
            "key": "steps",
            "label": "STEPS (JSON [{at, state, duration?}] — layer frames; states: opened | closed)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH (transition hook; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "query",
            "label": "QUERY",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "typeStart",
            "label": "TYPING STARTS (layer frame; -1 = instant)",
            "kind": "range",
            "keyframable": false,
            "min": -1,
            "max": 600,
            "step": 1
          },
          {
            "key": "cps",
            "label": "TYPING chars / s",
            "kind": "range",
            "keyframable": false,
            "min": 0.5,
            "max": 40,
            "step": 0.5
          },
          {
            "key": "placeholder",
            "label": "PLACEHOLDER",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "items",
            "label": "ITEMS (JSON string array)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "rowSteps",
            "label": "ROW STEPS (JSON [{at, index, state, duration?}] — index into the FILTERED list; idle | hover | press | selected)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "selectedIndex",
            "label": "SELECTED ROW (-1 none; used when no row steps)",
            "kind": "range",
            "keyframable": false,
            "min": -1,
            "max": 20,
            "step": 1
          },
          {
            "key": "highlightedIndex",
            "label": "HOVERED ROW",
            "kind": "range",
            "keyframable": false,
            "min": -1,
            "max": 20,
            "step": 1
          },
          {
            "key": "pressedIndex",
            "label": "PRESSED ROW",
            "kind": "range",
            "keyframable": false,
            "min": -1,
            "max": 20,
            "step": 1
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "combobox"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_command_menu",
    "componentName": "CommandMenuTimeline",
    "name": "Command Menu (remocn-ui)",
    "desc": "remocn-ui • a ⌘K command palette: backdrop dims, panel zooms in, the query types and filters icon rows with shortcuts, rows hover / press / select on scripted steps • transparent",
    "icon": "⌘",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "CommandMenuTimeline",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "steps": [
          {
            "at": 16,
            "state": "opened",
            "duration": 16
          },
          {
            "at": 108,
            "state": "closed",
            "duration": 12
          }
        ],
        "smooth": true,
        "speed": 1,
        "mode": "light",
        "query": "settings",
        "typeStart": 20,
        "cps": 4,
        "items": [
          {
            "icon": "user",
            "label": "Profile",
            "shortcut": "⌘ P"
          },
          {
            "icon": "settings",
            "label": "Settings",
            "shortcut": "⌘ S"
          },
          {
            "icon": "file",
            "label": "New File",
            "shortcut": "⌘ N"
          },
          {
            "icon": "search",
            "label": "Search docs"
          }
        ],
        "rowSteps": [
          {
            "at": 84,
            "index": 0,
            "state": "hover",
            "duration": 8
          },
          {
            "at": 92,
            "index": 0,
            "state": "press",
            "duration": 6
          },
          {
            "at": 100,
            "index": 0,
            "state": "selected",
            "duration": 8
          }
        ],
        "selectedIndex": -1,
        "highlightedIndex": -1,
        "pressedIndex": -1
      }
    },
    "controls": [
      {
        "group": "Command Menu (remocn-ui) (whole clip) • 1280×720 layout at scale 1.5; panel 440 px wide at 18% from the top; the backdrop dims the whole box",
        "items": [
          {
            "key": "steps",
            "label": "STEPS (JSON [{at, state, duration?}] — layer frames; states: opened | closed)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH (transition hook; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "query",
            "label": "QUERY",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "typeStart",
            "label": "TYPING STARTS (layer frame; -1 = instant)",
            "kind": "range",
            "keyframable": false,
            "min": -1,
            "max": 600,
            "step": 1
          },
          {
            "key": "cps",
            "label": "TYPING chars / s",
            "kind": "range",
            "keyframable": false,
            "min": 0.5,
            "max": 40,
            "step": 0.5
          },
          {
            "key": "items",
            "label": "ITEMS (JSON [{label, icon?: search|settings|user|file, shortcut?}])",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "rowSteps",
            "label": "ROW STEPS (JSON [{at, index, state, duration?}] — index into the FILTERED list; idle | hover | press | selected)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "selectedIndex",
            "label": "SELECTED ROW (-1 none; used when no row steps)",
            "kind": "range",
            "keyframable": false,
            "min": -1,
            "max": 20,
            "step": 1
          },
          {
            "key": "highlightedIndex",
            "label": "HOVERED ROW",
            "kind": "range",
            "keyframable": false,
            "min": -1,
            "max": 20,
            "step": 1
          },
          {
            "key": "pressedIndex",
            "label": "PRESSED ROW",
            "kind": "range",
            "keyframable": false,
            "min": -1,
            "max": 20,
            "step": 1
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "commandmenu"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_context_menu",
    "componentName": "ContextMenuTimeline",
    "name": "Context Menu (remocn-ui)",
    "desc": "remocn-ui • a right-click menu that grows from its top-left corner (the click point) on scripted steps; rows hover / press • transparent",
    "icon": "📋",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "ContextMenuTimeline",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 700,
      "baseY": 380,
      "scale": 1.5,
      "customProperties": {
        "width": 200,
        "height": 160,
        "steps": [
          {
            "at": 44,
            "state": "opened",
            "duration": 10
          },
          {
            "at": 92,
            "state": "closed",
            "duration": 10
          }
        ],
        "smooth": true,
        "speed": 1,
        "mode": "light",
        "items": [
          "Back",
          "Reload",
          "Save As…",
          "Inspect"
        ],
        "rowSteps": [
          {
            "at": 60,
            "index": 1,
            "state": "hover"
          },
          {
            "at": 72,
            "index": 1,
            "state": "press"
          },
          {
            "at": 82,
            "index": 1,
            "state": "idle"
          }
        ],
        "highlightedIndex": -1,
        "pressedIndex": -1
      }
    },
    "controls": [
      {
        "group": "Context Menu (remocn-ui) (whole clip) • 200 px panel at scale 1.5; the box top-left IS the click point",
        "items": [
          {
            "key": "steps",
            "label": "STEPS (JSON [{at, state, duration?}] — layer frames; states: opened | closed)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH (transition hook; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "items",
            "label": "ITEMS (JSON string array)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "rowSteps",
            "label": "ROW STEPS (JSON [{at, index, state, duration?}] — index into the list; idle | hover | press)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "highlightedIndex",
            "label": "HOVERED ROW (used when no row steps)",
            "kind": "range",
            "keyframable": false,
            "min": -1,
            "max": 20,
            "step": 1
          },
          {
            "key": "pressedIndex",
            "label": "PRESSED ROW",
            "kind": "range",
            "keyframable": false,
            "min": -1,
            "max": 20,
            "step": 1
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "contextmenu"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_cursor",
    "componentName": "CursorTimeline",
    "name": "Cursor (remocn-ui)",
    "desc": "remocn-ui • a macOS arrow or hand pointer that eases along scripted waypoints; click fires a ripple + press dip, press holds for drags • full frame, transparent",
    "icon": "🖱️",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "CursorTimeline",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "path": [
          {
            "at": 0,
            "x": 480,
            "y": 300
          },
          {
            "at": 40,
            "x": 960,
            "y": 540,
            "duration": 28
          },
          {
            "at": 72,
            "x": 960,
            "y": 540,
            "click": true,
            "duration": 0
          }
        ],
        "variant": "arrow",
        "size": 42,
        "rippleColor": "",
        "speed": 1,
        "mode": "light"
      }
    },
    "controls": [
      {
        "group": "Cursor (remocn-ui) (whole clip) • waypoints in composition px; `at` = ARRIVAL frame, the move runs over [at − duration, at)",
        "items": [
          {
            "key": "path",
            "label": "PATH (JSON [{at, x, y, duration? (24), click?, press?, easing?: linear|in|out|inOut}])",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "variant",
            "label": "CURSOR",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "arrow",
                "Arrow"
              ],
              [
                "pointer",
                "Hand pointer"
              ]
            ]
          },
          {
            "key": "size",
            "label": "SIZE px (42 = 1.5× 720p)",
            "kind": "range",
            "keyframable": false,
            "min": 12,
            "max": 160,
            "step": 1
          },
          {
            "key": "rippleColor",
            "label": "RIPPLE (blank = theme primary)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "cursor"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_sheet",
    "componentName": "SheetTimeline",
    "name": "Sheet (remocn-ui)",
    "desc": "remocn-ui • a full-height right-edge side panel (close ✕, primary action) that slides in over a 50% backdrop on scripted steps • transparent, compose over a scene",
    "icon": "📑",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "SheetTimeline",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "steps": [
          {
            "at": 32,
            "state": "opened",
            "duration": 16
          },
          {
            "at": 92,
            "state": "closed",
            "duration": 12
          }
        ],
        "smooth": true,
        "speed": 1,
        "mode": "light",
        "title": "Edit profile",
        "description": "Make changes to your profile here. Click save when you're done.",
        "actionLabel": "Save changes",
        "cancelLabel": "Cancel"
      }
    },
    "controls": [
      {
        "group": "Sheet (remocn-ui) (whole clip) • 1280×720 layout at scale 1.5; 400 px panel flush to the box right edge; the backdrop dims the whole box — keep it full frame",
        "items": [
          {
            "key": "steps",
            "label": "STEPS (JSON [{at, state, duration?}] — layer frames; states: opened | closed)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH (transition hook; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "title",
            "label": "TITLE",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "description",
            "label": "DESCRIPTION",
            "kind": "multiline",
            "keyframable": false
          },
          {
            "key": "actionLabel",
            "label": "ACTION (primary)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "cancelLabel",
            "label": "CANCEL",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "sheet"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_dropdown_menu",
    "componentName": "DropdownMenuTimeline",
    "name": "Dropdown Menu (remocn-ui)",
    "desc": "remocn-ui • an outline trigger button whose action panel drops open below it (chevron flips); trigger and rows hover / press on scripted steps • transparent",
    "icon": "🔻",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "DropdownMenuTimeline",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "steps": [
          {
            "at": 32,
            "state": "opened",
            "duration": 16
          },
          {
            "at": 92,
            "state": "closed",
            "duration": 12
          }
        ],
        "smooth": true,
        "speed": 1,
        "mode": "light",
        "label": "Options",
        "items": [
          "Profile",
          "Billing",
          "Settings",
          "Log out"
        ],
        "triggerSteps": [
          {
            "at": 18,
            "state": "hover"
          },
          {
            "at": 26,
            "state": "press",
            "duration": 4
          },
          {
            "at": 32,
            "state": "idle"
          }
        ],
        "rowSteps": [
          {
            "at": 54,
            "index": 1,
            "state": "hover"
          },
          {
            "at": 66,
            "index": 1,
            "state": "press",
            "duration": 6
          },
          {
            "at": 74,
            "index": 1,
            "state": "idle"
          }
        ],
        "highlightedIndex": -1,
        "pressedIndex": -1
      }
    },
    "controls": [
      {
        "group": "Dropdown Menu (remocn-ui) (whole clip) • 1280×720 layout at scale 1.5; 240 px trigger, centred, 220 px from the box top; the panel opens below",
        "items": [
          {
            "key": "steps",
            "label": "STEPS (JSON [{at, state, duration?}] — layer frames; states: opened | closed)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH (transition hook; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "label",
            "label": "TRIGGER LABEL",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "items",
            "label": "ITEMS (JSON string array)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "triggerSteps",
            "label": "TRIGGER STEPS (JSON [{at, state: idle|hover|press, duration?}])",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "rowSteps",
            "label": "ROW STEPS (JSON [{at, index, state, duration?}] — index into the list; idle | hover | press)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "highlightedIndex",
            "label": "HOVERED ROW (used when no row steps)",
            "kind": "range",
            "keyframable": false,
            "min": -1,
            "max": 20,
            "step": 1
          },
          {
            "key": "pressedIndex",
            "label": "PRESSED ROW",
            "kind": "range",
            "keyframable": false,
            "min": -1,
            "max": 20,
            "step": 1
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "dropdown"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_input",
    "componentName": "InputTimeline",
    "name": "Input (remocn-ui)",
    "desc": "remocn-ui • a shadcn text field scripted through idle → hover → active (focus ring + caret) → typing (value types in) → blur / invalid • transparent",
    "icon": "⌨️",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "InputTimeline",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "steps": [
          {
            "at": 10,
            "state": "hover",
            "duration": 8
          },
          {
            "at": 24,
            "state": "active",
            "duration": 10
          },
          {
            "at": 40,
            "state": "typing",
            "duration": 22
          },
          {
            "at": 78,
            "state": "invalid",
            "duration": 12
          }
        ],
        "smooth": true,
        "speed": 1,
        "mode": "light",
        "placeholder": "you@example.com",
        "value": "remotion@remocn.dev",
        "size": "default",
        "primary": ""
      }
    },
    "controls": [
      {
        "group": "Input (remocn-ui) (whole clip) • 1280×720 layout at scale 1.5; 320 px field, centred",
        "items": [
          {
            "key": "steps",
            "label": "STEPS (JSON [{at, state, duration?}] — layer frames; states: idle | hover | active | typing | blur | invalid — a typing step's duration is the typing time)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH (transition hook; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "placeholder",
            "label": "PLACEHOLDER",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "value",
            "label": "VALUE (typed)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "size",
            "label": "SIZE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "sm",
                "Small (36)"
              ],
              [
                "default",
                "Default (40)"
              ],
              [
                "lg",
                "Large (48)"
              ]
            ]
          },
          {
            "key": "primary",
            "label": "PRIMARY (blank = theme)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "input"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_field",
    "componentName": "FieldTimeline",
    "name": "Form Fields (remocn-ui Field)",
    "desc": "remocn-ui • the Field layout family as a labelled form: each entry is label ▸ Input ▸ description, and each Input runs its own scripted steps (focus, type, blur, invalid) • transparent",
    "icon": "📝",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "FieldTimeline",
      "sizeMode": "props"
    },
    "defaults": {
      "baseX": 720,
      "baseY": 390,
      "scale": 1.5,
      "customProperties": {
        "width": 320,
        "height": 170,
        "fields": [
          {
            "label": "Name",
            "placeholder": "Jane Doe",
            "value": "Jane Cooper",
            "steps": [
              {
                "at": 10,
                "state": "active",
                "duration": 6
              },
              {
                "at": 14,
                "state": "typing",
                "duration": 20
              },
              {
                "at": 44,
                "state": "blur",
                "duration": 8
              }
            ]
          },
          {
            "label": "Email",
            "placeholder": "m@example.com",
            "value": "jane@acme.com",
            "description": "We'll never share your email.",
            "steps": [
              {
                "at": 48,
                "state": "active",
                "duration": 6
              },
              {
                "at": 52,
                "state": "typing",
                "duration": 24
              },
              {
                "at": 90,
                "state": "blur",
                "duration": 8
              }
            ]
          }
        ],
        "gap": 16,
        "fieldGap": 6,
        "size": "default",
        "smooth": true,
        "speed": 1,
        "mode": "light",
        "primary": ""
      }
    },
    "controls": [
      {
        "group": "Form Fields (remocn-ui Field) (whole clip) • box width = the form column (320 px layout at scale 1.5); fields stack from the box top",
        "items": [
          {
            "key": "fields",
            "label": "FIELDS (JSON [{label?, placeholder?, value?, description?, steps: [{at, state: idle|hover|active|typing|blur|invalid, duration?}]}])",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "gap",
            "label": "GAP BETWEEN FIELDS px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 80,
            "step": 1
          },
          {
            "key": "fieldGap",
            "label": "LABEL / CONTROL / HINT GAP px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 30,
            "step": 1
          },
          {
            "key": "size",
            "label": "INPUT SIZE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "sm",
                "Small (36)"
              ],
              [
                "default",
                "Default (40)"
              ],
              [
                "lg",
                "Large (48)"
              ]
            ]
          },
          {
            "key": "smooth",
            "label": "SMOOTH (transition hook; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "primary",
            "label": "PRIMARY (blank = theme)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "field"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_message_bubble",
    "componentName": "MessageBubbleTimeline",
    "name": "Message Bubble (remocn-ui)",
    "desc": "remocn-ui • a themed chat bubble (incoming left on muted, outgoing right on primary) that rises in on scripted steps, with an optional emoji reaction badge that pops separately • transparent",
    "icon": "💬",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "MessageBubbleTimeline",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 480,
      "baseY": 460,
      "scale": 1.5,
      "customProperties": {
        "width": 640,
        "height": 100,
        "text": "Hey — ready for the demo?",
        "variant": "incoming",
        "steps": [
          {
            "at": 20,
            "state": "visible",
            "duration": 14
          }
        ],
        "smooth": true,
        "speed": 1,
        "reaction": "",
        "reactionSteps": [
          {
            "at": 50,
            "state": "visible",
            "duration": 10
          }
        ],
        "maxWidth": 0,
        "mode": "light"
      }
    },
    "controls": [
      {
        "group": "Message Bubble (remocn-ui) (whole clip) • box width = the chat column (640 px layout at scale 1.5); stack one layer per message",
        "items": [
          {
            "key": "text",
            "label": "MESSAGE",
            "kind": "multiline",
            "keyframable": false
          },
          {
            "key": "variant",
            "label": "SIDE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "incoming",
                "Incoming (left, muted)"
              ],
              [
                "outgoing",
                "Outgoing (right, primary)"
              ]
            ]
          },
          {
            "key": "steps",
            "label": "STEPS (JSON [{at, state: hidden|visible, duration?}] — layer frames)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH (transition hook; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "reaction",
            "label": "REACTION EMOJI (blank = none)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "reactionSteps",
            "label": "REACTION STEPS (JSON [{at, state: hidden|visible}] — empty = follows the bubble)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "maxWidth",
            "label": "MAX WIDTH px (0 = 80% of the box)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1280,
            "step": 1
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "bubble"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_popover",
    "componentName": "PopoverTimeline",
    "name": "Popover (remocn-ui)",
    "desc": "remocn-ui • a floating hover card (title + description) that fades in at 0.97 scale sliding 6 px toward its anchor on scripted steps • transparent",
    "icon": "🗨️",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "PopoverTimeline",
      "sizeMode": "props",
      "omitProps": [
        "height"
      ]
    },
    "defaults": {
      "baseX": 744,
      "baseY": 400,
      "scale": 1.5,
      "customProperties": {
        "width": 288,
        "height": 96,
        "steps": [
          {
            "at": 36,
            "state": "opened",
            "duration": 10
          },
          {
            "at": 100,
            "state": "closed",
            "duration": 10
          }
        ],
        "smooth": true,
        "speed": 1,
        "title": "Alex Smith",
        "description": "Product designer. Building in public.",
        "side": "bottom",
        "mode": "light"
      }
    },
    "controls": [
      {
        "group": "Popover (remocn-ui) (whole clip) • the box is the card (width = card width, 288 px layout at scale 1.5); place it beside its anchor",
        "items": [
          {
            "key": "steps",
            "label": "STEPS (JSON [{at, state: opened|closed, duration?}] — layer frames)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH (transition hook; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "title",
            "label": "TITLE",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "description",
            "label": "DESCRIPTION",
            "kind": "multiline",
            "keyframable": false
          },
          {
            "key": "side",
            "label": "SIDE OF ANCHOR (slide direction)",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "bottom",
                "Bottom"
              ],
              [
                "top",
                "Top"
              ],
              [
                "left",
                "Left"
              ],
              [
                "right",
                "Right"
              ]
            ]
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "popover"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_progress",
    "componentName": "ProgressTimeline",
    "name": "Progress (remocn-ui)",
    "desc": "remocn-ui • a progress bar that fills along scripted value steps (arrival frames, ease-out; hold = two steps at one value) with a tabular % label • transparent",
    "icon": "📶",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "ProgressTimeline",
      "sizeMode": "props",
      "omitProps": [
        "height"
      ]
    },
    "defaults": {
      "baseX": 680,
      "baseY": 522,
      "scale": 1.5,
      "customProperties": {
        "width": 320,
        "height": 24,
        "valueSteps": [
          {
            "at": 0,
            "value": 0
          },
          {
            "at": 40,
            "value": 62,
            "duration": 36
          },
          {
            "at": 130,
            "value": 100,
            "duration": 30
          }
        ],
        "value": 0,
        "showLabel": true,
        "speed": 1,
        "primary": "",
        "mode": "light"
      }
    },
    "controls": [
      {
        "group": "Progress (remocn-ui) (whole clip) • box width = track width (320 px layout at scale 1.5); the % label sits right of the box",
        "items": [
          {
            "key": "valueSteps",
            "label": "VALUE STEPS (JSON [{at (arrival), value 0–100, duration? (24), easing?: linear|in|out|inOut}])",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "value",
            "label": "FIXED VALUE (used when no steps)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 100,
            "step": 1
          },
          {
            "key": "showLabel",
            "label": "SHOW % LABEL",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "primary",
            "label": "FILL (blank = theme primary)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "progress"
    },
    "defaultDurationInFrames": 150
  },
  {
    "id": "remocn_ui_radio",
    "componentName": "RadioTimeline",
    "name": "Radio (remocn-ui)",
    "desc": "remocn-ui • a shadcn radio whose ring turns primary and inner dot scales in on scripted steps (checked ↔ unchecked), optional label • transparent",
    "icon": "🔘",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "RadioTimeline",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "steps": [
          {
            "at": 18,
            "state": "checked",
            "duration": 14
          },
          {
            "at": 78,
            "state": "unchecked",
            "duration": 12
          }
        ],
        "smooth": true,
        "speed": 1,
        "mode": "light",
        "label": "Subscribe to updates",
        "size": "default",
        "primary": ""
      }
    },
    "controls": [
      {
        "group": "Radio (remocn-ui) (whole clip) • 1280×720 layout at scale 1.5; centred in the box; for a group, one layer per option (uncheck the old one on the frame the new one checks)",
        "items": [
          {
            "key": "steps",
            "label": "STEPS (JSON [{at, state, duration?}] — layer frames; states: unchecked | checked)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH (transition hook; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "label",
            "label": "LABEL (blank = bare ring)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "size",
            "label": "SIZE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "sm",
                "Small (16)"
              ],
              [
                "default",
                "Default (20)"
              ],
              [
                "lg",
                "Large (24)"
              ]
            ]
          },
          {
            "key": "primary",
            "label": "PRIMARY (blank = theme)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "radio"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_skeleton",
    "componentName": "SkeletonTimeline",
    "name": "Skeleton (remocn-ui)",
    "desc": "remocn-ui • WRAPPER: a shimmer placeholder (lines or avatar card) that crossfades to the wrapped layers — the real content — on scripted steps (loading → loaded) • transparent",
    "icon": "🦴",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "SkeletonTimeline",
      "sizeMode": "props",
      "children": {
        "fit": "box"
      }
    },
    "defaults": {
      "baseX": 720,
      "baseY": 460,
      "scale": 1.5,
      "customProperties": {
        "width": 288,
        "height": 96,
        "steps": [
          {
            "at": 45,
            "state": "loaded",
            "duration": 16
          }
        ],
        "smooth": true,
        "speed": 1,
        "layout": "lines",
        "shimmerSpeed": 1,
        "mode": "light"
      }
    },
    "controls": [
      {
        "group": "Skeleton (remocn-ui) (whole clip) • wrap the real content with update_asset wraps (it keeps its place); the placeholder draws at the box top-left at scale 1.5",
        "items": [
          {
            "key": "steps",
            "label": "STEPS (JSON [{at, state: loading|loaded, duration?}] — layer frames)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH (crossfade; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "layout",
            "label": "PLACEHOLDER",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "lines",
                "Three lines"
              ],
              [
                "card",
                "Avatar + two lines"
              ]
            ]
          },
          {
            "key": "shimmerSpeed",
            "label": "SHIMMER SPEED (sweep = 60 f / speed)",
            "kind": "range",
            "keyframable": false,
            "min": 0.1,
            "max": 6,
            "step": 0.05
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "skeleton"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_skeleton_block",
    "componentName": "SkeletonBlockTimeline",
    "name": "Skeleton Block (remocn-ui)",
    "desc": "remocn-ui • one always-shimmering placeholder rectangle (a highlight band sweeps every 60 frames, in phase with every other block) • the box is the block",
    "icon": "▭",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "SkeletonBlockTimeline",
      "sizeMode": "props"
    },
    "defaults": {
      "baseX": 780,
      "baseY": 528,
      "scale": 1,
      "customProperties": {
        "width": 360,
        "height": 24,
        "radius": 9,
        "speed": 1,
        "baseColor": "",
        "highlightColor": "",
        "mode": "light"
      }
    },
    "controls": [
      {
        "group": "Skeleton Block (remocn-ui) (whole clip) • box = the block; defaults are 1.5× the 720p 240×16 block",
        "items": [
          {
            "key": "radius",
            "label": "RADIUS px (half the height = pill)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 200,
            "step": 0.5
          },
          {
            "key": "speed",
            "label": "SWEEP SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.1,
            "max": 6,
            "step": 0.05
          },
          {
            "key": "baseColor",
            "label": "BASE (blank = theme muted)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "highlightColor",
            "label": "HIGHLIGHT (blank = theme)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "skeletonblock"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_slider",
    "componentName": "SliderTimeline",
    "name": "Slider (remocn-ui)",
    "desc": "remocn-ui • a range slider on two scripted channels: the fill value eases between arrival frames while the thumb hovers / presses on its own (grab ring) • transparent",
    "icon": "🎚️",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "SliderTimeline",
      "sizeMode": "props",
      "omitProps": [
        "height"
      ]
    },
    "defaults": {
      "baseX": 720,
      "baseY": 510,
      "scale": 1.5,
      "customProperties": {
        "width": 320,
        "height": 40,
        "sliderSteps": [
          {
            "at": 0,
            "value": 20,
            "thumbState": "idle"
          },
          {
            "at": 30,
            "thumbState": "hover",
            "duration": 8
          },
          {
            "at": 44,
            "thumbState": "press",
            "duration": 6
          },
          {
            "at": 44,
            "value": 20
          },
          {
            "at": 100,
            "value": 80,
            "duration": 56
          },
          {
            "at": 108,
            "thumbState": "idle",
            "duration": 8
          }
        ],
        "value": 0,
        "thumbState": "idle",
        "showValue": true,
        "speed": 1,
        "primary": "",
        "mode": "light"
      }
    },
    "controls": [
      {
        "group": "Slider (remocn-ui) (whole clip) • box width = track (320 px layout at scale 1.5); thumb x = baseX + 1.5 × width × value / 100",
        "items": [
          {
            "key": "sliderSteps",
            "label": "STEPS (JSON [{at (arrival), value? 0–100, thumbState?: idle|hover|press, duration? (18), easing?}])",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "value",
            "label": "FIXED VALUE (used when no steps)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 100,
            "step": 1
          },
          {
            "key": "thumbState",
            "label": "FIXED THUMB",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "idle",
                "Idle"
              ],
              [
                "hover",
                "Hover"
              ],
              [
                "press",
                "Press"
              ]
            ]
          },
          {
            "key": "showValue",
            "label": "SHOW VALUE ABOVE THUMB",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "primary",
            "label": "FILL (blank = theme primary)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "slider"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_stepper",
    "componentName": "StepperTimeline",
    "name": "Stepper (remocn-ui)",
    "desc": "remocn-ui • a numbered multi-step indicator: as the scripted position advances each circle fills primary, its check draws in and the connector fills • transparent",
    "icon": "🪜",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "StepperTimeline",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "labels": [
          "Account",
          "Plan",
          "Done"
        ],
        "stepperSteps": [
          {
            "at": 0,
            "index": 0
          },
          {
            "at": 50,
            "index": 1,
            "duration": 24
          },
          {
            "at": 110,
            "index": 2,
            "duration": 24
          }
        ],
        "activeIndex": 0,
        "speed": 1,
        "primary": "",
        "mode": "light"
      }
    },
    "controls": [
      {
        "group": "Stepper (remocn-ui) (whole clip) • 1280×720 layout at scale 1.5; horizontal only (the source falls back from vertical)",
        "items": [
          {
            "key": "labels",
            "label": "STEP LABELS (JSON string array — the count is the number of steps)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "stepperSteps",
            "label": "POSITION STEPS (JSON [{at (arrival), index, duration? (24), easing?}] — keep an {at:0,index:0} anchor)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "activeIndex",
            "label": "FIXED STEP (used when no steps)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 10,
            "step": 0.01
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "primary",
            "label": "PRIMARY (blank = theme)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "stepper"
    },
    "defaultDurationInFrames": 130
  },
  {
    "id": "remocn_ui_switch",
    "componentName": "SwitchTimeline",
    "name": "Switch (remocn-ui)",
    "desc": "remocn-ui • a shadcn switch whose track fills primary as the thumb slides across on scripted steps (checked ↔ unchecked), optional label • transparent",
    "icon": "🔛",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "SwitchTimeline",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "steps": [
          {
            "at": 18,
            "state": "checked",
            "duration": 14
          },
          {
            "at": 78,
            "state": "unchecked",
            "duration": 12
          }
        ],
        "smooth": true,
        "speed": 1,
        "mode": "light",
        "label": "Enable notifications",
        "size": "default",
        "primary": ""
      }
    },
    "controls": [
      {
        "group": "Switch (remocn-ui) (whole clip) • 1280×720 layout at scale 1.5; centred in the box; stack layers for a settings list",
        "items": [
          {
            "key": "steps",
            "label": "STEPS (JSON [{at, state, duration?}] — layer frames; states: unchecked | checked)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH (transition hook; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "label",
            "label": "LABEL (blank = bare switch)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "size",
            "label": "SIZE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "sm",
                "Small"
              ],
              [
                "default",
                "Default"
              ],
              [
                "lg",
                "Large"
              ]
            ]
          },
          {
            "key": "primary",
            "label": "PRIMARY (blank = theme)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "switch"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_tabs",
    "componentName": "TabsTimeline",
    "name": "Tabs (remocn-ui)",
    "desc": "remocn-ui • a 440 px tabs widget: the pill / underline indicator slides to the scripted tab and its panel crossfades in • transparent",
    "icon": "🗂️",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "TabsTimeline",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "steps": [
          {
            "at": 18,
            "state": "Account",
            "duration": 16
          },
          {
            "at": 58,
            "state": "Password",
            "duration": 18
          },
          {
            "at": 94,
            "state": "Settings",
            "duration": 12
          }
        ],
        "smooth": true,
        "speed": 1,
        "mode": "light",
        "items": [
          "Account",
          "Password",
          "Settings"
        ],
        "contents": [
          "Make changes to your account here.",
          "Change your password here.",
          "Manage your notification settings."
        ],
        "contentHeight": 72,
        "variant": "pill"
      }
    },
    "controls": [
      {
        "group": "Tabs (remocn-ui) (whole clip) • 1280×720 layout at scale 1.5; 440 px widget, centred",
        "items": [
          {
            "key": "steps",
            "label": "STEPS (JSON [{at, state, duration?}] — layer frames; states: tab labels from ITEMS)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH (transition hook; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "items",
            "label": "TABS (JSON string array — labels are the step states)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "contents",
            "label": "PANEL TEXT (JSON string array, parallel to TABS)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "contentHeight",
            "label": "PANEL HEIGHT px",
            "kind": "range",
            "keyframable": false,
            "min": 24,
            "max": 400,
            "step": 1
          },
          {
            "key": "variant",
            "label": "INDICATOR",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "pill",
                "Pill (muted track)"
              ],
              [
                "underline",
                "Underline"
              ]
            ]
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "tabs"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_toast",
    "componentName": "ToastTimeline",
    "name": "Toast (remocn-ui)",
    "desc": "remocn-ui • a notification card (default / success / error icon, title + optional description) that rises in from 16 px below, holds, then dismisses on scripted steps • transparent",
    "icon": "🍞",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "ToastTimeline",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 1350,
      "baseY": 933,
      "scale": 1.5,
      "customProperties": {
        "width": 356,
        "height": 74,
        "steps": [
          {
            "at": 30,
            "state": "visible",
            "duration": 12
          },
          {
            "at": 90,
            "state": "hidden",
            "duration": 12
          }
        ],
        "smooth": true,
        "speed": 1,
        "title": "Changes saved",
        "description": "Your profile has been updated.",
        "variant": "success",
        "mode": "light"
      }
    },
    "controls": [
      {
        "group": "Toast (remocn-ui) (whole clip) • the box is the 356 px toast at scale 1.5 (default: bottom-right, 24 px in)",
        "items": [
          {
            "key": "steps",
            "label": "STEPS (JSON [{at, state: hidden|visible, duration?}] — layer frames)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH (transition hook; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "title",
            "label": "TITLE",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "description",
            "label": "DESCRIPTION (blank = title only)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "variant",
            "label": "ICON",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "default",
                "Default (info dot)"
              ],
              [
                "success",
                "Success (check)"
              ],
              [
                "error",
                "Error (!)"
              ]
            ]
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "toast"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_toggle_group",
    "componentName": "ToggleGroupTimeline",
    "name": "Toggle Group (remocn-ui)",
    "desc": "remocn-ui • a segmented control whose thumb slides between segments (labels crossfade to active) on scripted steps — pricing toggles, view switches • transparent",
    "icon": "🎛️",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "ToggleGroupTimeline",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "steps": [
          {
            "at": 46,
            "state": "Yearly",
            "duration": 14
          },
          {
            "at": 92,
            "state": "Monthly",
            "duration": 14
          }
        ],
        "smooth": true,
        "speed": 1,
        "mode": "light",
        "items": [
          {
            "value": "Monthly",
            "label": "Monthly"
          },
          {
            "value": "Yearly",
            "label": "Yearly"
          }
        ],
        "size": "default",
        "align": "center"
      }
    },
    "controls": [
      {
        "group": "Toggle Group (remocn-ui) (whole clip) • 1280×720 layout at scale 1.5; centred in the box",
        "items": [
          {
            "key": "steps",
            "label": "STEPS (JSON [{at, state, duration?}] — layer frames; states: item values)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH (transition hook; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "items",
            "label": "SEGMENTS (JSON [{value, label}] or strings)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "size",
            "label": "SIZE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "default",
                "Default (36)"
              ],
              [
                "sm",
                "Small (32)"
              ]
            ]
          },
          {
            "key": "align",
            "label": "ALIGN IN BOX",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "start",
                "Start"
              ],
              [
                "center",
                "Centre"
              ],
              [
                "end",
                "End"
              ]
            ]
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "togglegroup"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_tooltip",
    "componentName": "TooltipTimeline",
    "name": "Tooltip (remocn-ui)",
    "desc": "remocn-ui • a one-line floating label with an arrow that fades in at 0.96 scale sliding 4 px toward its anchor on scripted steps • transparent",
    "icon": "💡",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "TooltipTimeline",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 847,
      "baseY": 429,
      "scale": 1.5,
      "customProperties": {
        "width": 150,
        "height": 40,
        "steps": [
          {
            "at": 30,
            "state": "visible",
            "duration": 8
          },
          {
            "at": 90,
            "state": "hidden",
            "duration": 8
          }
        ],
        "smooth": true,
        "speed": 1,
        "label": "Keyboard shortcut ⌘K",
        "side": "top",
        "mode": "light"
      }
    },
    "controls": [
      {
        "group": "Tooltip (remocn-ui) (whole clip) • the box top-left is the tooltip top-left (scale 1.5); place it beside its anchor",
        "items": [
          {
            "key": "steps",
            "label": "STEPS (JSON [{at, state: hidden|visible, duration?}] — layer frames)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH (transition hook; off = snap)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "label",
            "label": "LABEL (single line)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "side",
            "label": "SIDE OF ANCHOR (arrow + slide)",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "top",
                "Top"
              ],
              [
                "bottom",
                "Bottom"
              ],
              [
                "left",
                "Left"
              ],
              [
                "right",
                "Right"
              ]
            ]
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "tooltip"
    },
    "defaultDurationInFrames": 120
  },
  {
    "id": "remocn_ui_typing_indicator",
    "componentName": "TypingIndicatorTimeline",
    "name": "Typing Indicator (remocn-ui)",
    "desc": "remocn-ui • N dots bouncing on staggered sines; by default inside an incoming message bubble that enters and leaves on scripted steps, ready to hand over to the reply • transparent",
    "icon": "💭",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "TypingIndicatorTimeline",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 480,
      "baseY": 460,
      "scale": 1.5,
      "customProperties": {
        "width": 640,
        "height": 60,
        "inBubble": true,
        "variant": "incoming",
        "steps": [
          {
            "at": 0,
            "state": "visible",
            "duration": 14
          },
          {
            "at": 60,
            "state": "hidden",
            "duration": 10
          }
        ],
        "smooth": true,
        "speed": 1,
        "color": "",
        "dotCount": 3,
        "size": 8,
        "gap": 5,
        "amplitude": 5,
        "cyclesPerSecond": 1.1,
        "mode": "light"
      }
    },
    "controls": [
      {
        "group": "Typing Indicator (remocn-ui) (whole clip) • box width = chat column (640 px layout at scale 1.5), like Message Bubble",
        "items": [
          {
            "key": "inBubble",
            "label": "IN A MESSAGE BUBBLE",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "variant",
            "label": "BUBBLE SIDE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "incoming",
                "Incoming (left)"
              ],
              [
                "outgoing",
                "Outgoing (right)"
              ]
            ]
          },
          {
            "key": "steps",
            "label": "BUBBLE STEPS (JSON [{at, state: hidden|visible}] — empty = always visible)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "smooth",
            "label": "SMOOTH",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "color",
            "label": "DOTS (blank = muted foreground)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "dotCount",
            "label": "DOTS",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 8,
            "step": 1
          },
          {
            "key": "size",
            "label": "DOT SIZE px",
            "kind": "range",
            "keyframable": false,
            "min": 2,
            "max": 30,
            "step": 0.5
          },
          {
            "key": "gap",
            "label": "GAP px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 30,
            "step": 0.5
          },
          {
            "key": "amplitude",
            "label": "BOUNCE px",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 30,
            "step": 0.5
          },
          {
            "key": "cyclesPerSecond",
            "label": "BOUNCES / s",
            "kind": "range",
            "keyframable": false,
            "min": 0.2,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiatom",
      "style": "typing"
    },
    "defaultDurationInFrames": 90
  },
  {
    "id": "remocn_ui_chat_flow",
    "componentName": "ChatFlowScene",
    "name": "Chat Flow (remocn-ui)",
    "desc": "remocn-ui block • a themed messaging thread: outgoing text types into the composer and sends, a typing bubble precedes each reply, reactions pop in • transparent",
    "icon": "💬",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "ChatFlowScene",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "mode": "light",
        "contact": {
          "name": "Alex"
        },
        "accentColor": "",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Chat Flow (remocn-ui) (whole clip) • self-timed block on the 1280×720 stage at scale 1.5 — 460 px mobile column, full height; follows your theme tokens",
        "items": [
          {
            "key": "messages",
            "label": "MESSAGES (JSON [{from: me|them, text, reaction?}] — empty = demo script)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "contact",
            "label": "CONTACT (JSON {name, avatar?})",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "accentColor",
            "label": "OUTGOING / ACCENT (blank = default)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiflow",
      "style": "chat"
    },
    "defaultDurationInFrames": 360
  },
  {
    "id": "remocn_ui_telegram_chat_flow",
    "componentName": "TelegramChatFlowScene",
    "name": "Telegram Chat Flow (remocn-ui)",
    "desc": "remocn-ui block • a Telegram-skinned thread: blue tailed bubbles with in-bubble time and double checks, a \"typing…\" header status before replies, reaction chips • fixed light Telegram skin",
    "icon": "✈️",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "TelegramChatFlowScene",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "mode": "light",
        "contact": {
          "name": "Alex"
        },
        "accentColor": "",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "Telegram Chat Flow (remocn-ui) (whole clip) • self-timed block on the 1280×720 stage at scale 1.5 — fixed light Telegram skin; only the accent is overridable",
        "items": [
          {
            "key": "messages",
            "label": "MESSAGES (JSON [{from: me|them, text, reaction?, time?}] — empty = demo script)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "contact",
            "label": "CONTACT (JSON {name, avatar?})",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "accentColor",
            "label": "OUTGOING / ACCENT (blank = default)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiflow",
      "style": "telegram"
    },
    "defaultDurationInFrames": 360
  },
  {
    "id": "remocn_ui_imessage_chat_flow",
    "componentName": "ImessageChatFlowScene",
    "name": "iMessage Chat Flow (remocn-ui)",
    "desc": "remocn-ui block • an iMessage-skinned thread: gray / blue tailed bubbles, a dots typing bubble before replies, \"Delivered\", tapback badges, lucide chrome icons",
    "icon": "🍏",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "ImessageChatFlowScene",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "mode": "light",
        "contact": {
          "name": "Alex"
        },
        "accentColor": "",
        "speed": 1
      }
    },
    "controls": [
      {
        "group": "iMessage Chat Flow (remocn-ui) (whole clip) • self-timed block on the 1280×720 stage at scale 1.5 — fixed iMessage skin; only the accent is overridable",
        "items": [
          {
            "key": "messages",
            "label": "MESSAGES (JSON [{from: me|them, text, reaction?}] — empty = demo script)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "contact",
            "label": "CONTACT (JSON {name, avatar?})",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "accentColor",
            "label": "OUTGOING / ACCENT (blank = default)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "speed",
            "label": "SPEED",
            "kind": "range",
            "keyframable": false,
            "min": 0.25,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiflow",
      "style": "imessage"
    },
    "defaultDurationInFrames": 360
  },
  {
    "id": "remocn_ui_signup_flow",
    "componentName": "SignupFlowScene",
    "name": "Signup Flow (remocn-ui)",
    "desc": "remocn-ui block • a shadcn signup card: the cursor fills Full Name / Email / Password / Confirm, presses Create account through loading to success, and a toast confirms • transparent",
    "icon": "🪪",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "SignupFlowScene",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "mode": "light",
        "title": "Create an account",
        "description": "Enter your information below to create your account",
        "fullName": "John Doe",
        "email": "m@example.com",
        "password": "••••••••",
        "createLabel": "Create account",
        "googleLabel": "Sign up with Google",
        "signinText": "Already have an account?",
        "toastTitle": "Account created"
      }
    },
    "controls": [
      {
        "group": "Signup Flow (remocn-ui) (whole clip) • self-timed block on the 1280×720 stage at scale 1.5 — fields at 66 / 100 / 144 / 182 (the source adds a 48-frame intro the docs omit), submit 224 → success 282, toast 282–348; layer 370",
        "items": [
          {
            "key": "title",
            "label": "TITLE",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "description",
            "label": "DESCRIPTION",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "fullName",
            "label": "FULL NAME",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "email",
            "label": "EMAIL",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "password",
            "label": "PASSWORD (masked)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "createLabel",
            "label": "SUBMIT LABEL",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "googleLabel",
            "label": "SOCIAL BUTTON",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "signinText",
            "label": "FOOTER PROMPT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "toastTitle",
            "label": "TOAST",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiflow",
      "style": "signup"
    },
    "defaultDurationInFrames": 370
  },
  {
    "id": "remocn_ui_checkout_flow",
    "componentName": "CheckoutFlowScene",
    "name": "Checkout Flow (remocn-ui)",
    "desc": "remocn-ui block • a checkout card blurs in, then the cursor flips monthly → yearly, types the card number, ticks the terms and pays through loading to success; toast confirms • transparent",
    "icon": "💳",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "CheckoutFlowScene",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "mode": "light",
        "title": "Upgrade your plan",
        "description": "Complete your purchase to unlock every feature.",
        "cardLabel": "Card number",
        "cardPlaceholder": "4242 4242 4242 4242",
        "termsLabel": "I accept the terms and conditions",
        "payLabel": "Pay $49",
        "toastTitle": "Payment successful"
      }
    },
    "controls": [
      {
        "group": "Checkout Flow (remocn-ui) (whole clip) • self-timed block on the 1280×720 stage at scale 1.5 — blur-in 0–58, toggle 64, card 96–150, terms 150, pay 180–224, toast 224–286",
        "items": [
          {
            "key": "title",
            "label": "TITLE",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "description",
            "label": "DESCRIPTION",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "plans",
            "label": "PLANS (JSON [{value, label}] — first is the resting pick, the cursor clicks the second)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "cardLabel",
            "label": "CARD LABEL",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "cardPlaceholder",
            "label": "CARD NUMBER (typed)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "termsLabel",
            "label": "TERMS",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "payLabel",
            "label": "PAY LABEL",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "toastTitle",
            "label": "TOAST",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiflow",
      "style": "checkout"
    },
    "defaultDurationInFrames": 300
  },
  {
    "id": "remocn_ui_onboarding_stepper_flow",
    "componentName": "OnboardingStepperFlowScene",
    "name": "Onboarding Stepper Flow (remocn-ui)",
    "desc": "remocn-ui block • a three-step onboarding: the stepper advances account → plan → preferences (email types, a radio picks, switches flip) and Finish runs to success • transparent",
    "icon": "🧭",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "OnboardingStepperFlowScene",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "mode": "light",
        "name": "jane@acme.com",
        "nextLabel": "Next",
        "finishLabel": "Finish"
      }
    },
    "controls": [
      {
        "group": "Onboarding Stepper Flow (remocn-ui) (whole clip) • self-timed block on the 1280×720 stage at scale 1.5 — advances at 64 and 104, success at 156, ends 175",
        "items": [
          {
            "key": "steps",
            "label": "STEP LABELS (JSON, exactly three — the schedule is fixed)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "name",
            "label": "EMAIL (typed)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "plans",
            "label": "PLAN OPTIONS (JSON string array)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "nextLabel",
            "label": "NEXT LABEL",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "finishLabel",
            "label": "FINISH LABEL",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiflow",
      "style": "onboarding"
    },
    "defaultDurationInFrames": 175
  },
  {
    "id": "remocn_ui_ai_prompt_flow",
    "componentName": "AiPromptFlowScene",
    "name": "AI Prompt Flow (remocn-ui)",
    "desc": "remocn-ui block • prompt-to-answer: the prompt types, Generate runs hover → press → loading, a skeleton shimmers, the answer crossfades in and a ready toast slides in • transparent",
    "icon": "✨",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "AiPromptFlowScene",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "mode": "light",
        "prompt": "Summarize this thread",
        "buttonLabel": "Generate",
        "toastTitle": "Response ready"
      }
    },
    "controls": [
      {
        "group": "AI Prompt Flow (remocn-ui) (whole clip) • self-timed block on the 1280×720 stage at scale 1.5 — toast dismisses near 220, ends 230",
        "items": [
          {
            "key": "prompt",
            "label": "PROMPT",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "buttonLabel",
            "label": "BUTTON",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "answerLines",
            "label": "ANSWER LINES (JSON string array — empty = demo answer)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "toastTitle",
            "label": "TOAST",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiflow",
      "style": "ai"
    },
    "defaultDurationInFrames": 230
  },
  {
    "id": "remocn_ui_settings_toggle_flow",
    "componentName": "SettingsToggleFlowScene",
    "name": "Settings Toggle Flow (remocn-ui)",
    "desc": "remocn-ui block • a two-column settings card blurs in, then the cursor flips a switch, picks a theme from a select, drags the volume slider and saves; toast confirms • transparent",
    "icon": "⚙️",
    "tab": "community",
    "external": {
      "importPath": "./community/ui-timeline",
      "exportName": "SettingsToggleFlowScene",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "scale": 1.5,
      "customProperties": {
        "width": 1280,
        "height": 720,
        "mode": "light",
        "title": "Notification settings",
        "description": "Manage how you receive alerts, set your theme, and tune the volume.",
        "saveLabel": "Save settings",
        "toastTitle": "Settings saved"
      }
    },
    "controls": [
      {
        "group": "Settings Toggle Flow (remocn-ui) (whole clip) • self-timed block on the 1280×720 stage at scale 1.5 — switch 68, select 99–124, slider 149–194, save 224, toast 240–300",
        "items": [
          {
            "key": "title",
            "label": "TITLE",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "description",
            "label": "DESCRIPTION",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "rows",
            "label": "ROW LABELS (JSON [{label}] ×3 — switch, select, slider)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "selectItems",
            "label": "THEME OPTIONS (JSON string array — the cursor picks the last)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "saveLabel",
            "label": "SAVE LABEL",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "toastTitle",
            "label": "TOAST",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "mode",
            "label": "MODE",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "light",
                "Light"
              ],
              [
                "dark",
                "Dark"
              ]
            ]
          },
          {
            "key": "theme",
            "label": "THEME TOKENS (JSON, concrete oklch/hex/rgb — e.g. {\"primary\":\"#2563eb\",\"radius\":6})",
            "kind": "json",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "uiflow",
      "style": "settings"
    },
    "defaultDurationInFrames": 320
  },
  {
    "id": "remocn_shader_mesh_gradient",
    "componentName": "ShaderMeshGradient",
    "name": "Mesh Gradient (remocn shader)",
    "desc": "remocn shader • paper-design mesh gradient: slow, living colour blobs, frame-driven for deterministic renders • opaque backdrop",
    "icon": "🌈",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-mesh-gradient",
      "exportName": "ShaderMeshGradient",
      "sizeMode": "none",
      "paintGate": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "distortion": 0.6,
        "swirl": 0.1
      }
    },
    "controls": [
      {
        "group": "Mesh Gradient (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; set colors to make it lead",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "colors",
            "label": "COLORS (JSON array of hex — the default is a muted indigo set)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "distortion",
            "label": "DISTORTION",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "swirl",
            "label": "SWIRL",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "mesh"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_shader_grain_gradient",
    "componentName": "ShaderGrainGradient",
    "name": "Grain Gradient (remocn shader)",
    "desc": "remocn shader • paper-design grainy multi-stop gradient drifting under film grain • opaque backdrop",
    "icon": "🎞️",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-grain-gradient",
      "exportName": "ShaderGrainGradient",
      "sizeMode": "none",
      "paintGate": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "colorBack": "#12121a",
        "softness": 0.6,
        "intensity": 0.2,
        "noise": 0.15
      }
    },
    "controls": [
      {
        "group": "Grain Gradient (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; lower grain behind small text",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "colors",
            "label": "COLORS (JSON array of hex — the default is a muted indigo set)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "colorBack",
            "label": "BACK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "softness",
            "label": "SOFTNESS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "intensity",
            "label": "INTENSITY",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "noise",
            "label": "GRAIN",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "shape",
            "label": "SHAPE (unset = paper default; blob / dots / truchet render EMPTY on software WebGL here)",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "corners",
                "Corners"
              ],
              [
                "wave",
                "Wave"
              ],
              [
                "sphere",
                "Sphere"
              ],
              [
                "ripple",
                "Ripple"
              ],
              [
                "blob",
                "Blob"
              ],
              [
                "dots",
                "Dots"
              ],
              [
                "truchet",
                "Truchet"
              ]
            ]
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "grain"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_shader_warp",
    "componentName": "ShaderWarp",
    "name": "Warp (remocn shader)",
    "desc": "remocn shader • paper-design domain-warped colour field folding and stretching like liquid • opaque backdrop",
    "icon": "🌊",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-warp",
      "exportName": "ShaderWarp",
      "sizeMode": "none",
      "paintGate": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "proportion": 0.5,
        "softness": 1,
        "distortion": 0.2,
        "swirl": 0.4
      }
    },
    "controls": [
      {
        "group": "Warp (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; keep distortion low under text",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "colors",
            "label": "COLORS (JSON array of hex — the default is a muted indigo set)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "proportion",
            "label": "PROPORTION",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "softness",
            "label": "SOFTNESS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "distortion",
            "label": "DISTORTION",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "swirl",
            "label": "SWIRL",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "warp"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_shader_swirl",
    "componentName": "ShaderSwirl",
    "name": "Swirl (remocn shader)",
    "desc": "remocn shader • paper-design concentric bands swirling around the centre • opaque backdrop",
    "icon": "🌀",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-swirl",
      "exportName": "ShaderSwirl",
      "sizeMode": "none",
      "paintGate": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "colorBack": "#12121a",
        "bandCount": 4,
        "twist": 0.1,
        "softness": 0.2
      }
    },
    "controls": [
      {
        "group": "Swirl (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; the centre draws the eye",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "colors",
            "label": "COLORS (JSON array of hex — the default is a muted indigo set)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "colorBack",
            "label": "BACK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "bandCount",
            "label": "BANDS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 15,
            "step": 1
          },
          {
            "key": "twist",
            "label": "TWIST",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "softness",
            "label": "SOFTNESS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "swirl"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_shader_water",
    "componentName": "ShaderWater",
    "name": "Water (remocn shader)",
    "desc": "remocn shader • paper-design caustic water-surface ripples with subtle refraction, cool and dark by default • opaque backdrop",
    "icon": "💧",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-water",
      "exportName": "ShaderWater",
      "sizeMode": "none",
      "paintGate": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "colorBack": "#16202b",
        "colorHighlight": "#5a6a7a",
        "highlights": 0.06,
        "waves": 0.3,
        "caustic": 0.08
      }
    },
    "controls": [
      {
        "group": "Water (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; lower caustic under small text",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "colorBack",
            "label": "BACK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "colorHighlight",
            "label": "HIGHLIGHT",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "highlights",
            "label": "HIGHLIGHTS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "waves",
            "label": "WAVES",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "caustic",
            "label": "CAUSTIC",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "water"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_shader_spiral",
    "componentName": "ShaderSpiral",
    "name": "Spiral (remocn shader)",
    "desc": "remocn shader • paper-design duotone spiral arms rotating out of the centre • opaque backdrop",
    "icon": "🐚",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-spiral",
      "exportName": "ShaderSpiral",
      "sizeMode": "none",
      "paintGate": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "colorBack": "#12121a",
        "colorFront": "#52527a",
        "density": 1,
        "strokeWidth": 0.5,
        "softness": 0.2
      }
    },
    "controls": [
      {
        "group": "Spiral (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; the centre draws the eye",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "colorBack",
            "label": "BACK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "colorFront",
            "label": "ARMS",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "density",
            "label": "DENSITY",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "strokeWidth",
            "label": "ARM WIDTH",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "softness",
            "label": "SOFTNESS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "spiral"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_shader_liquid_metal",
    "componentName": "ShaderLiquidMetal",
    "name": "Liquid Metal (remocn shader)",
    "desc": "remocn shader • paper-design molten metal surface with flowing specular highlights, full-bleed (shape none) • opaque backdrop",
    "icon": "🪙",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-liquid-metal",
      "exportName": "ShaderLiquidMetal",
      "sizeMode": "none",
      "paintGate": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "colorBack": "#2a2a30",
        "colorTint": "#8a8a95",
        "distortion": 0.1,
        "repetition": 1.5,
        "contour": 0.4,
        "softness": 0.05,
        "shape": "none",
        "scale": 1
      }
    },
    "controls": [
      {
        "group": "Liquid Metal (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; tonal, not colourful; scale 1 fills the frame",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "colorBack",
            "label": "BACK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "colorTint",
            "label": "TINT",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "distortion",
            "label": "DISTORTION",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "repetition",
            "label": "REPETITION",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 10,
            "step": 0.1
          },
          {
            "key": "contour",
            "label": "CONTOUR",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "softness",
            "label": "SOFTNESS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "shape",
            "label": "SHAPE (none = full bleed; others are centred emblems)",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "none",
                "None (full bleed)"
              ],
              [
                "circle",
                "Circle"
              ],
              [
                "daisy",
                "Daisy"
              ],
              [
                "diamond",
                "Diamond"
              ],
              [
                "metaballs",
                "Metaballs"
              ]
            ]
          },
          {
            "key": "scale",
            "label": "SCALE (paper default 0.6 leaves a centred panel; 1 = full bleed)",
            "kind": "range",
            "keyframable": false,
            "min": 0.1,
            "max": 6,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "metal"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_shader_light_tunnel",
    "componentName": "ShaderLightTunnel",
    "name": "Light Tunnel (remocn shader)",
    "desc": "remocn shader • the OpenShaders hero field mapped into a cylindrical light tunnel: straight forward flight, ribbons twisting round a centred vanishing point (own WebGL2, no package) • opaque backdrop",
    "icon": "🚇",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-light-tunnel",
      "exportName": "ShaderLightTunnel",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "twist": 0.7,
        "spirals": 3,
        "glow": 1,
        "depth": 1,
        "timeOffset": 0
      }
    },
    "controls": [
      {
        "group": "Light Tunnel (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; not a seamless loop; no fades",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "twist",
            "label": "TWIST (0 = no rotation, travel continues)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 2,
            "step": 0.01
          },
          {
            "key": "spirals",
            "label": "RIBBON REPEATS",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 6,
            "step": 1
          },
          {
            "key": "glow",
            "label": "GLOW",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3,
            "step": 0.01
          },
          {
            "key": "depth",
            "label": "DEPTH",
            "kind": "range",
            "keyframable": false,
            "min": 0.5,
            "max": 2,
            "step": 0.01
          },
          {
            "key": "timeOffset",
            "label": "START TIME s (another part of the path)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 120,
            "step": 0.1
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "tunnel"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 90,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_shader_color_panels",
    "componentName": "ShaderColorPanels",
    "name": "Color Panels (remocn shader)",
    "desc": "remocn shader • paper-design translucent colour panes sliding past each other — glassy, architectural depth • opaque backdrop",
    "icon": "🪟",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-color-panels",
      "exportName": "ShaderColorPanels",
      "sizeMode": "none",
      "paintGate": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "colorBack": "#12121a",
        "density": 3,
        "length": 1.1
      }
    },
    "controls": [
      {
        "group": "Color Panels (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; lower density under dense content",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "colors",
            "label": "COLORS (JSON array of hex — the default is a muted indigo set)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "colorBack",
            "label": "BACK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "density",
            "label": "PANELS",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 10,
            "step": 0.1
          },
          {
            "key": "length",
            "label": "PANEL LENGTH",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "panels"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_shader_neuro_noise",
    "componentName": "ShaderNeuroNoise",
    "name": "Neuro Noise (remocn shader)",
    "desc": "remocn shader • paper-design neural-web noise: slowly morphing filaments that read as \"intelligence\" • opaque backdrop",
    "icon": "🧠",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-neuro-noise",
      "exportName": "ShaderNeuroNoise",
      "sizeMode": "none",
      "paintGate": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "colorFront": "#8a8a95",
        "colorMid": "#4a4a68",
        "colorBack": "#12121a",
        "brightness": 0.05,
        "contrast": 0.3
      }
    },
    "controls": [
      {
        "group": "Neuro Noise (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; keep brightness low under text",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "colorFront",
            "label": "FILAMENTS",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "colorMid",
            "label": "MID",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "colorBack",
            "label": "BACK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "brightness",
            "label": "BRIGHTNESS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "contrast",
            "label": "CONTRAST",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "neuro"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_shader_perlin_noise",
    "componentName": "ShaderPerlinNoise",
    "name": "Perlin Noise (remocn shader)",
    "desc": "remocn shader • paper-design duotone Perlin clouds drifting across the frame — calm, soft fog • opaque backdrop",
    "icon": "☁️",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-perlin-noise",
      "exportName": "ShaderPerlinNoise",
      "sizeMode": "none",
      "paintGate": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "colorBack": "#12121a",
        "colorFront": "#6a6a85",
        "proportion": 0.35,
        "softness": 0.1,
        "scale": 3
      }
    },
    "controls": [
      {
        "group": "Perlin Noise (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; duotone",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "colorFront",
            "label": "CLOUDS",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "colorBack",
            "label": "BACK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "proportion",
            "label": "PROPORTION",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "softness",
            "label": "SOFTNESS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "scale",
            "label": "PATTERN SCALE (bigger = larger clouds; 1 reads as fine speckle at 1080p)",
            "kind": "range",
            "keyframable": false,
            "min": 0.1,
            "max": 6,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "perlin"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_shader_simplex_noise",
    "componentName": "ShaderSimplexNoise",
    "name": "Simplex Noise (remocn shader)",
    "desc": "remocn shader • paper-design simplex flow field — the smoothest noise, gentle multi-stop drift with posterised banding control • opaque backdrop",
    "icon": "🌫️",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-simplex-noise",
      "exportName": "ShaderSimplexNoise",
      "sizeMode": "none",
      "paintGate": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "stepsPerColor": 2,
        "softness": 0.1
      }
    },
    "controls": [
      {
        "group": "Simplex Noise (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; multi-stop colours",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "colors",
            "label": "COLORS (JSON array of hex — the default is a muted indigo set)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "stepsPerColor",
            "label": "STEPS PER COLOUR (banding)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 10,
            "step": 1
          },
          {
            "key": "softness",
            "label": "SOFTNESS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "simplex"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_shader_voronoi",
    "componentName": "ShaderVoronoi",
    "name": "Voronoi (remocn shader)",
    "desc": "remocn shader • paper-design Voronoi cells shifting and re-tessellating with dark gaps — crystalline, technical • opaque backdrop",
    "icon": "🔷",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-voronoi",
      "exportName": "ShaderVoronoi",
      "sizeMode": "none",
      "paintGate": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "colorGap": "#12121a",
        "distortion": 0.4,
        "gap": 0.04,
        "glow": 0
      }
    },
    "controls": [
      {
        "group": "Voronoi (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; lower distortion under dense content",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "colors",
            "label": "COLORS (JSON array of hex — the default is a muted indigo set)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "colorGap",
            "label": "GAP",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "distortion",
            "label": "DISTORTION",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 0.5,
            "step": 0.01
          },
          {
            "key": "gap",
            "label": "GAP WIDTH",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 0.1,
            "step": 0.001
          },
          {
            "key": "glow",
            "label": "GLOW (keep low)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "voronoi"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_shader_dot_orbit",
    "componentName": "ShaderDotOrbit",
    "name": "Dot Orbit (remocn shader)",
    "desc": "remocn shader • paper-design dot grid whose dots orbit on small concentric paths — reads as network / system • opaque backdrop",
    "icon": "⚛️",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-dot-orbit",
      "exportName": "ShaderDotOrbit",
      "sizeMode": "none",
      "paintGate": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "colorBack": "#12121a",
        "size": 1,
        "spreading": 1
      }
    },
    "controls": [
      {
        "group": "Dot Orbit (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; regular pattern",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "colors",
            "label": "COLORS (JSON array of hex — the default is a muted indigo set)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "colorBack",
            "label": "BACK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "size",
            "label": "DOT SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "spreading",
            "label": "SPREADING",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "dots"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_shader_dithering",
    "componentName": "ShaderDithering",
    "name": "Dithering (remocn shader)",
    "desc": "remocn shader • paper-design ordered (bayer) dither over an animated gradient field — retro / print / lo-fi, full-bleed wave by default • opaque backdrop",
    "icon": "▦",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-dithering",
      "exportName": "ShaderDithering",
      "sizeMode": "none",
      "paintGate": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "colorBack": "#12121a",
        "colorFront": "#6a6a85",
        "shape": "wave",
        "type": "4x4",
        "size": 2
      }
    },
    "controls": [
      {
        "group": "Dithering (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; raise size behind small text",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "colorFront",
            "label": "INK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "colorBack",
            "label": "BACK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "type",
            "label": "MATRIX",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "random",
                "Random"
              ],
              [
                "2x2",
                "2×2"
              ],
              [
                "4x4",
                "4×4"
              ],
              [
                "8x8",
                "8×8"
              ]
            ]
          },
          {
            "key": "size",
            "label": "DOT SIZE px",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 20,
            "step": 0.5
          },
          {
            "key": "shape",
            "label": "FIELD SHAPE (wave = full bleed)",
            "kind": "select",
            "keyframable": false,
            "options": [
              [
                "wave",
                "Wave"
              ],
              [
                "simplex",
                "Simplex"
              ],
              [
                "warp",
                "Warp"
              ],
              [
                "dots",
                "Dots"
              ],
              [
                "ripple",
                "Ripple"
              ],
              [
                "swirl",
                "Swirl"
              ],
              [
                "sphere",
                "Sphere (centred)"
              ]
            ]
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "dither"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_shader_god_rays",
    "componentName": "ShaderGodRays",
    "name": "God Rays (remocn shader)",
    "desc": "remocn shader • paper-design volumetric light rays from an off-screen corner source with a soft bloom — cinematic reveal atmosphere • opaque backdrop",
    "icon": "🌅",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-god-rays",
      "exportName": "ShaderGodRays",
      "sizeMode": "none",
      "paintGate": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "colorBack": "#12121a",
        "colorBloom": "#3a3a5c",
        "intensity": 0.8,
        "density": 0.3,
        "bloom": 0.4
      }
    },
    "controls": [
      {
        "group": "God Rays (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; keep bloom restrained",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "colors",
            "label": "COLORS (JSON array of hex — the default is a muted indigo set)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "colorBack",
            "label": "BACK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "colorBloom",
            "label": "BLOOM",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "intensity",
            "label": "INTENSITY",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "density",
            "label": "DENSITY",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "bloom",
            "label": "BLOOM",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "rays"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_shader_smoke_ring",
    "componentName": "ShaderSmokeRing",
    "name": "Smoke Ring (remocn shader)",
    "desc": "remocn shader • paper-design single soft smoke ring curling and dissipating in the centre of a dark field • opaque backdrop (centred object)",
    "icon": "⭕",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-smoke-ring",
      "exportName": "ShaderSmokeRing",
      "sizeMode": "none",
      "paintGate": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "colorBack": "#12121a",
        "radius": 0.25,
        "thickness": 0.65,
        "scale": 0.8
      }
    },
    "controls": [
      {
        "group": "Smoke Ring (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; a centred ring — keep key text off the centre",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "colors",
            "label": "COLORS (JSON array of hex — the default is a muted indigo set)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "colorBack",
            "label": "BACK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "radius",
            "label": "RADIUS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "thickness",
            "label": "THICKNESS",
            "kind": "range",
            "keyframable": false,
            "min": 0.01,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "scale",
            "label": "SCALE",
            "kind": "range",
            "keyframable": false,
            "min": 0.1,
            "max": 4,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "smokering"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_shader_metaballs",
    "componentName": "ShaderMetaballs",
    "name": "Metaballs (remocn shader)",
    "desc": "remocn shader • paper-design organic blobs merging and splitting like a lava lamp — playful • opaque backdrop",
    "icon": "🫧",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-metaballs",
      "exportName": "ShaderMetaballs",
      "sizeMode": "none",
      "paintGate": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "colorBack": "#12121a",
        "count": 10,
        "size": 0.83
      }
    },
    "controls": [
      {
        "group": "Metaballs (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; lower count / size under dense content",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "colors",
            "label": "COLORS (JSON array of hex — the default is a muted indigo set)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "colorBack",
            "label": "BACK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "count",
            "label": "BLOBS",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 20,
            "step": 1
          },
          {
            "key": "size",
            "label": "SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "metaballs"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_shader_pulsing_border",
    "componentName": "ShaderPulsingBorder",
    "name": "Pulsing Border (remocn shader)",
    "desc": "remocn shader • paper-design glowing frame pulsing around the edges; the interior stays the back colour for text • opaque backdrop",
    "icon": "🔲",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-pulsing-border",
      "exportName": "ShaderPulsingBorder",
      "sizeMode": "none",
      "paintGate": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "colorBack": "#12121a",
        "roundness": 0.25,
        "thickness": 0.1,
        "intensity": 0.2,
        "bloom": 0.25
      }
    },
    "controls": [
      {
        "group": "Pulsing Border (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; the centre stays clear",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "colors",
            "label": "COLORS (JSON array of hex — the default is a muted indigo set)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "colorBack",
            "label": "BACK (interior)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "roundness",
            "label": "ROUNDNESS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "thickness",
            "label": "THICKNESS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "intensity",
            "label": "INTENSITY",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "bloom",
            "label": "BLOOM (keep restrained)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "border"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_shader_caustics",
    "componentName": "ShaderCaustics",
    "name": "Caustics (remocn shader)",
    "desc": "remocn shader • custom WebGL refracted-light filaments through a rippling surface, denser toward the bottom — calm, elegant • opaque backdrop",
    "icon": "🪼",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-caustics",
      "exportName": "ShaderCaustics",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "colors": [
          "#0a0a0a",
          "#2e2e33"
        ],
        "accent": "#7F57FF",
        "accentAmount": 0,
        "scale": 5.2,
        "intensity": 1
      }
    },
    "controls": [
      {
        "group": "Caustics (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; own WebGL, no package",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "colors",
            "label": "COLORS (JSON exactly 2: [floor, filament light])",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "accent",
            "label": "ACCENT",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "accentAmount",
            "label": "ACCENT AMOUNT (tints the brightest filaments)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "scale",
            "label": "WEB FREQUENCY",
            "kind": "range",
            "keyframable": false,
            "min": 0.5,
            "max": 20,
            "step": 0.1
          },
          {
            "key": "intensity",
            "label": "INTENSITY",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "caustics"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_shader_gem_smoke",
    "componentName": "ShaderGemSmoke",
    "name": "Gem Smoke (remocn shader)",
    "desc": "remocn shader • paper-design colour smoke flowing behind and inside a glassy silhouette of your logo (image) — brand reveals • opaque backdrop",
    "icon": "💎",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-gem-smoke",
      "exportName": "ShaderGemSmoke",
      "sizeMode": "none",
      "paintGate": {
        "waitFor": "[data-paper-shader] canvas"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "colorBack": "#0a0a10",
        "innerDistortion": 0.8,
        "outerDistortion": 0.6,
        "outerGlow": 0.55,
        "innerGlow": 1,
        "size": 0.8,
        "image": ""
      }
    },
    "controls": [
      {
        "group": "Gem Smoke (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; feed a logo as image",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "image",
            "label": "LOGO IMAGE (URL or data: URI of an SVG/PNG mark)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "colors",
            "label": "COLORS (JSON array of hex — the default is a muted indigo set)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "colorBack",
            "label": "BACK",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "size",
            "label": "MARK SIZE",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "innerDistortion",
            "label": "INNER DISTORTION",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "outerDistortion",
            "label": "OUTER DISTORTION",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "innerGlow",
            "label": "INNER GLOW",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "outerGlow",
            "label": "OUTER GLOW",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "gem"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_shader_strata",
    "componentName": "ShaderStrata",
    "name": "Strata (remocn shader)",
    "desc": "remocn shader • custom WebGL horizontal sediment layers displaced by fbm noise, each drifting at its own depth — grounded, geological • opaque backdrop",
    "icon": "🪨",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-strata",
      "exportName": "ShaderStrata",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "colors": [
          "#050507",
          "#0a0a0d",
          "#111014",
          "#17161b"
        ],
        "accent": "#6733FF",
        "accentAmount": 0,
        "layers": 14,
        "amplitude": 0.16
      }
    },
    "controls": [
      {
        "group": "Strata (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; own WebGL, no package; very dark by default",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "colors",
            "label": "COLORS (JSON exactly 4, deepest → surface)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "accent",
            "label": "ACCENT",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "accentAmount",
            "label": "ACCENT AMOUNT (tints the deep strata)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "layers",
            "label": "LAYERS",
            "kind": "range",
            "keyframable": false,
            "min": 2,
            "max": 40,
            "step": 1
          },
          {
            "key": "amplitude",
            "label": "EDGE WAVINESS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 0.5,
            "step": 0.005
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "strata"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_shader_weave",
    "componentName": "ShaderWeave",
    "name": "Weave (remocn shader)",
    "desc": "remocn shader • custom WebGL woven warp-and-weft threads on a domain-warped grid with a slow sheen of light across the cloth • opaque backdrop",
    "icon": "🧶",
    "tab": "community",
    "external": {
      "importPath": "./community/shader-weave",
      "exportName": "ShaderWeave",
      "sizeMode": "none"
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "speed": 1,
        "colors": [
          "#050506",
          "#0a0a0c",
          "#111015",
          "#1b1a22"
        ],
        "accent": "#6733FF",
        "accentAmount": 0,
        "scale": 22,
        "warp": 0.03
      }
    },
    "controls": [
      {
        "group": "Weave (remocn shader) (whole clip) • full-frame opaque backdrop — put it on the bottom layer; own WebGL; speed drives only the sheen",
        "items": [
          {
            "key": "speed",
            "label": "SPEED (frame-driven; 0 = frozen)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "colors",
            "label": "COLORS (JSON exactly 4: shadow, mid, warm, thread highlight)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "accent",
            "label": "ACCENT",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "accentAmount",
            "label": "ACCENT AMOUNT (tints the threads)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "scale",
            "label": "THREAD DENSITY",
            "kind": "range",
            "keyframable": false,
            "min": 4,
            "max": 80,
            "step": 0.5
          },
          {
            "key": "warp",
            "label": "HAND-WOVEN WARP",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 0.2,
            "step": 0.001
          }
        ]
      }
    ],
    "preview": {
      "kind": "shaderbg",
      "style": "weave"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_camera_lens",
    "componentName": "CameraLens",
    "name": "Camera Lens (remocn filter)",
    "desc": "remocn filter • WRAPPER: puts the scene behind real glass — corners soften, highlights bloom, edges fringe, light falls off; quiet enough to leave on a whole demo",
    "icon": "📷",
    "tab": "community",
    "external": {
      "importPath": "./community/camera-lens",
      "exportName": "CameraLens",
      "sizeMode": "none",
      "children": {
        "fit": "full"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "softness": 0.5,
        "bloom": 0.5,
        "aberration": 0.5,
        "vignette": 0.5,
        "distortion": 0.05
      }
    },
    "controls": [
      {
        "group": "Camera Lens (remocn filter) (whole clip) • WRAPPER (html-in-canvas): wrap the WHOLE scene, its backdrop included, with update_asset wraps; heaviest filter (multi-tap blur + bloom); put a camera move (drift) INSIDE it",
        "items": [
          {
            "key": "softness",
            "label": "CORNER SOFTNESS",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 2,
            "step": 0.01
          },
          {
            "key": "bloom",
            "label": "BLOOM",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 2,
            "step": 0.01
          },
          {
            "key": "aberration",
            "label": "EDGE FRINGING",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 2,
            "step": 0.01
          },
          {
            "key": "vignette",
            "label": "VIGNETTE (cos⁴)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 2,
            "step": 0.01
          },
          {
            "key": "distortion",
            "label": "BARREL (keep near 0)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.005
          }
        ]
      }
    ],
    "preview": {
      "kind": "canvasfilter",
      "style": "lens"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_security_cam",
    "componentName": "SecurityCam",
    "name": "Security Cam (remocn filter)",
    "desc": "remocn filter • WRAPPER: runs the scene through a cheap recorder — macroblocks, half-resolution colour, crushed blacks, hunting exposure, shadow noise",
    "icon": "📹",
    "tab": "community",
    "external": {
      "importPath": "./community/security-cam",
      "exportName": "SecurityCam",
      "sizeMode": "none",
      "children": {
        "fit": "full"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "compression": 0.7,
        "blockSize": 10,
        "noise": 0.6,
        "intensity": 1
      }
    },
    "controls": [
      {
        "group": "Security Cam (remocn filter) (whole clip) • WRAPPER (html-in-canvas): wrap the WHOLE scene, its backdrop included, with update_asset wraps; burned-in OSD (timestamp, REC) goes INSIDE the wrap",
        "items": [
          {
            "key": "compression",
            "label": "COMPRESSION",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          },
          {
            "key": "blockSize",
            "label": "MACROBLOCK px (colour blocks are 2×)",
            "kind": "range",
            "keyframable": false,
            "min": 2,
            "max": 40,
            "step": 1
          },
          {
            "key": "noise",
            "label": "SHADOW NOISE",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 2,
            "step": 0.01
          },
          {
            "key": "intensity",
            "label": "INTENSITY (keyframe to 0 on a hard cut = clean scene)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "canvasfilter",
      "style": "security"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_hologram",
    "componentName": "Hologram",
    "name": "Hologram (remocn filter)",
    "desc": "remocn filter • WRAPPER: plays the scene as projected light — ghost double, emission lines, a travelling crest; only the bright parts carry, the rest sinks into a dark tinted volume",
    "icon": "🛸",
    "tab": "community",
    "external": {
      "importPath": "./community/hologram",
      "exportName": "Hologram",
      "sizeMode": "none",
      "children": {
        "fit": "full"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "tint": "#63e8ff",
        "glow": 1,
        "ghost": 1,
        "flicker": 1,
        "intensity": 1
      }
    },
    "controls": [
      {
        "group": "Hologram (remocn filter) (whole clip) • WRAPPER (html-in-canvas): wrap the WHOLE scene, its backdrop included, with update_asset wraps; best on bright thin lines on black; the filter paints its own dark volume",
        "items": [
          {
            "key": "tint",
            "label": "TINT (the light)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "glow",
            "label": "GLOW (edge emission + halo)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3,
            "step": 0.01
          },
          {
            "key": "ghost",
            "label": "GHOST (instability; keyframe high → 1 to boot)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 6,
            "step": 0.05
          },
          {
            "key": "flicker",
            "label": "FLICKER (15-frame pulse)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 4,
            "step": 0.05
          },
          {
            "key": "intensity",
            "label": "INTENSITY",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "canvasfilter",
      "style": "hologram"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_vhs_filter",
    "componentName": "VhsFilter",
    "name": "VHS Filter (remocn filter)",
    "desc": "remocn filter • WRAPPER: holds the scene under analog tape — sideways chroma bleed (luma stays sharp), wandering rows, a head-switch tear at the bottom, luma noise",
    "icon": "📼",
    "tab": "community",
    "external": {
      "importPath": "./community/vhs-filter",
      "exportName": "VhsFilter",
      "sizeMode": "none",
      "children": {
        "fit": "full"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "bleed": 1,
        "wobble": 1,
        "noise": 1,
        "intensity": 1
      }
    },
    "controls": [
      {
        "group": "VHS Filter (remocn filter) (whole clip) • WRAPPER (html-in-canvas): wrap the WHOLE scene, its backdrop included, with update_asset wraps; expects a full-bleed opaque scene",
        "items": [
          {
            "key": "bleed",
            "label": "CHROMA BLEED",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3,
            "step": 0.01
          },
          {
            "key": "wobble",
            "label": "TAPE WOBBLE",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3,
            "step": 0.01
          },
          {
            "key": "noise",
            "label": "NOISE",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3,
            "step": 0.01
          },
          {
            "key": "intensity",
            "label": "INTENSITY (scales all; keyframe to surface the scene)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "canvasfilter",
      "style": "vhs"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_crt_screen",
    "componentName": "CrtScreen",
    "name": "CRT Screen (remocn filter)",
    "desc": "remocn filter • WRAPPER: puts the scene behind curved glass — barrel bulge, RGB phosphor mask, curved scanlines, blooming brights, corners running off into black",
    "icon": "🖥️",
    "tab": "community",
    "external": {
      "importPath": "./community/crt-screen",
      "exportName": "CrtScreen",
      "sizeMode": "none",
      "children": {
        "fit": "full"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "curvature": 1,
        "scanlines": 1,
        "maskScale": 2,
        "vignette": 1
      }
    },
    "controls": [
      {
        "group": "CRT Screen (remocn filter) (whole clip) • WRAPPER (html-in-canvas): wrap the WHOLE scene, its backdrop included, with update_asset wraps; keep content off the corners (they fall into the rim)",
        "items": [
          {
            "key": "curvature",
            "label": "CURVATURE (0 = flat panel)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 2,
            "step": 0.01
          },
          {
            "key": "scanlines",
            "label": "SCANLINES",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 2,
            "step": 0.01
          },
          {
            "key": "maskScale",
            "label": "PHOSPHOR STRIPE (device px)",
            "kind": "range",
            "keyframable": false,
            "min": 1,
            "max": 8,
            "step": 0.5
          },
          {
            "key": "vignette",
            "label": "RIM FALLOFF",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 2,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "canvasfilter",
      "style": "crt"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_sustained_glitch",
    "componentName": "SustainedGlitch",
    "name": "Sustained Glitch (remocn filter)",
    "desc": "remocn filter • WRAPPER: holds the scene clean between scheduled bursts of broadcast corruption — slices tear, channels split, blocks fill with picture from elsewhere — then it recovers",
    "icon": "📛",
    "tab": "community",
    "external": {
      "importPath": "./community/sustained-glitch",
      "exportName": "SustainedGlitch",
      "sizeMode": "none",
      "children": {
        "fit": "full"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "intensity": 1,
        "frequency": 1,
        "slices": 24,
        "seed": 1
      }
    },
    "controls": [
      {
        "group": "Sustained Glitch (remocn filter) (whole clip) • WRAPPER (html-in-canvas): wrap the WHOLE scene, its backdrop included, with update_asset wraps; intermittent, not a texture",
        "items": [
          {
            "key": "intensity",
            "label": "INTENSITY (keyframe it to land a hit; 0 = clean)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 3,
            "step": 0.01
          },
          {
            "key": "frequency",
            "label": "BURSTS / s (≈6 = continuous; let intensity time it)",
            "kind": "range",
            "keyframable": false,
            "min": 0.1,
            "max": 10,
            "step": 0.05
          },
          {
            "key": "slices",
            "label": "SLICES",
            "kind": "range",
            "keyframable": false,
            "min": 2,
            "max": 96,
            "step": 1
          },
          {
            "key": "seed",
            "label": "SEED (different rhythm per scene)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 100,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "canvasfilter",
      "style": "glitch"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_pixelate_region",
    "componentName": "PixelateRegion",
    "name": "Pixelate Region (remocn filter)",
    "desc": "remocn filter • WRAPPER (utility): covers rectangles of the scene with an opaque averaged mosaic — redact API keys, emails, tokens — and leaves everything else sharp; fails CLOSED (opaque block) everywhere",
    "icon": "🔲",
    "tab": "community",
    "external": {
      "importPath": "./community/pixelate-region",
      "exportName": "PixelateRegion",
      "sizeMode": "none",
      "children": {
        "fit": "full"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "regions": [
          {
            "x": 640,
            "y": 440,
            "width": 640,
            "height": 110
          }
        ],
        "cellSize": 24
      }
    },
    "controls": [
      {
        "group": "Pixelate Region (remocn filter) (whole clip) • WRAPPER (html-in-canvas): wrap the WHOLE scene, its backdrop included, with update_asset wraps; rectangles are fixed; nest a second one for > 8",
        "items": [
          {
            "key": "regions",
            "label": "REGIONS (JSON [{x, y, width, height}] in COMPOSITION px from top-left — max 8, more THROWS)",
            "kind": "json",
            "keyframable": false
          },
          {
            "key": "cellSize",
            "label": "CELL px (≈ ⅓ of the cap height or coarser)",
            "kind": "range",
            "keyframable": false,
            "min": 4,
            "max": 120,
            "step": 1
          }
        ]
      }
    ],
    "preview": {
      "kind": "canvasfilter",
      "style": "pixelate"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_ascii_render",
    "componentName": "AsciiRender",
    "name": "ASCII Render (remocn filter)",
    "desc": "remocn filter • WRAPPER: redraws the live scene as ASCII, one glyph per cell chosen by brightness, tracking the picture as it moves; intensity blends back to the clean scene",
    "icon": "🔣",
    "tab": "community",
    "external": {
      "importPath": "./community/ascii-render",
      "exportName": "AsciiRender",
      "sizeMode": "none",
      "children": {
        "fit": "full"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "glyphSize": 26,
        "charset": " .:-=+*#%@",
        "colored": false,
        "ink": "#9dff9d",
        "intensity": 1
      }
    },
    "controls": [
      {
        "group": "ASCII Render (remocn filter) (whole clip) • WRAPPER (html-in-canvas): wrap the WHOLE scene, its backdrop included, with update_asset wraps; no CSS fallback (renders untouched without html-in-canvas)",
        "items": [
          {
            "key": "glyphSize",
            "label": "GLYPH CELL HEIGHT px",
            "kind": "range",
            "keyframable": false,
            "min": 6,
            "max": 80,
            "step": 1
          },
          {
            "key": "charset",
            "label": "CHARSET (density ramp, darkest first)",
            "kind": "text",
            "keyframable": false
          },
          {
            "key": "colored",
            "label": "COLOURED GLYPHS (each takes its cell colour)",
            "kind": "checkbox",
            "keyframable": false
          },
          {
            "key": "ink",
            "label": "INK (mono mode)",
            "kind": "color",
            "keyframable": false
          },
          {
            "key": "intensity",
            "label": "INTENSITY (keyframe 1 → 0 to resolve out of text)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 1,
            "step": 0.01
          }
        ]
      }
    ],
    "preview": {
      "kind": "canvasfilter",
      "style": "ascii"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_halftone_print",
    "componentName": "HalftonePrint",
    "name": "Halftone Print (remocn filter)",
    "desc": "remocn filter • WRAPPER: prints the scene onto paper — CMY dot screens at 15/75/0°, each dot sized by its ink, slightly out of register; feed it a LIGHT scene",
    "icon": "🗞️",
    "tab": "community",
    "external": {
      "importPath": "./community/halftone-print",
      "exportName": "HalftonePrint",
      "sizeMode": "none",
      "children": {
        "fit": "full"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "dotSize": 10,
        "angle": 0,
        "misregistration": 1.2,
        "paperTint": "#f4efe4"
      }
    },
    "controls": [
      {
        "group": "Halftone Print (remocn filter) (whole clip) • WRAPPER (html-in-canvas): wrap the WHOLE scene, its backdrop included, with update_asset wraps; dark scenes saturate into a flat field — invert first",
        "items": [
          {
            "key": "dotSize",
            "label": "DOT PITCH px (fine offset ↔ coarse newsprint)",
            "kind": "range",
            "keyframable": false,
            "min": 3,
            "max": 60,
            "step": 0.5
          },
          {
            "key": "angle",
            "label": "SCREEN ANGLE °",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 90,
            "step": 0.5
          },
          {
            "key": "misregistration",
            "label": "MISREGISTRATION px (keyframe 9 → 1.2 to find register)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 20,
            "step": 0.1
          },
          {
            "key": "paperTint",
            "label": "PAPER",
            "kind": "color",
            "keyframable": false
          }
        ]
      }
    ],
    "preview": {
      "kind": "canvasfilter",
      "style": "halftone"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  },
  {
    "id": "remocn_underwater_ripple",
    "componentName": "UnderwaterRipple",
    "name": "Underwater Ripple (remocn filter)",
    "desc": "remocn filter • WRAPPER: holds the scene under moving water — layered refraction with slope-scaled colour dispersion, looping on whole cycles of the LAYER length",
    "icon": "🌊",
    "tab": "community",
    "external": {
      "importPath": "./community/underwater-ripple",
      "exportName": "UnderwaterRipple",
      "sizeMode": "none",
      "children": {
        "fit": "full"
      }
    },
    "defaults": {
      "baseX": 0,
      "baseY": 0,
      "customProperties": {
        "width": 1920,
        "height": 1080,
        "amplitude": 7,
        "scale": 1,
        "speed": 2,
        "dispersion": 1
      }
    },
    "controls": [
      {
        "group": "Underwater Ripple (remocn filter) (whole clip) • WRAPPER (html-in-canvas): wrap the WHOLE scene, its backdrop included, with update_asset wraps; wrap the backdrop, keep type OUTSIDE",
        "items": [
          {
            "key": "amplitude",
            "label": "AMPLITUDE px (keyframe → 0 to surface; 0 = untouched)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 60,
            "step": 0.5
          },
          {
            "key": "scale",
            "label": "WAVE SIZE (low = swells, high = chop)",
            "kind": "range",
            "keyframable": false,
            "min": 0.1,
            "max": 5,
            "step": 0.05
          },
          {
            "key": "speed",
            "label": "CYCLES PER LAYER (whole numbers loop seamlessly)",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 12,
            "step": 1
          },
          {
            "key": "dispersion",
            "label": "DISPERSION",
            "kind": "range",
            "keyframable": false,
            "min": 0,
            "max": 4,
            "step": 0.05
          }
        ]
      }
    ],
    "preview": {
      "kind": "canvasfilter",
      "style": "underwater"
    },
    "fullFrame": true,
    "defaultDurationInFrames": 150,
    "renderTimeoutMs": 120000
  }
];
