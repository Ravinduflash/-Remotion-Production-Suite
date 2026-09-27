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
            "step": 1
          },
          {
            "key": "barGap",
            "label": "BAR GAP",
            "kind": "range",
            "min": 0,
            "max": 8,
            "step": 1
          },
          {
            "key": "durationInFrames",
            "label": "CLIP LENGTH (frames) • progress 0→100%",
            "kind": "number"
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
            "step": 2
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
  }
];
