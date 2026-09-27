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
  }
];
