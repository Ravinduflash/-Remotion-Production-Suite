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
  }
];
