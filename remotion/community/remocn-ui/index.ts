// Source: remocn — https://remocn.dev/r/remocn-ui.json (registry/remocn-ui/core/index.ts), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; remocn-ui core lib, imported as @/lib/remocn-ui (useTypewriter); not a catalog entry.
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
export {
  mixOklch,
  oklchToRgb,
  parseColor,
  rgbToOklch,
  toCss,
} from "./color";
export type { EasingName, SpringName } from "./motion";
export { easings, springs } from "./motion";
export type { RemocnTheme, RemocnUIProviderProps } from "./theme";
export {
  defaultDarkTheme,
  defaultLightTheme,
  RemocnUIProvider,
  useRemocnTheme,
} from "./theme";
export type { TypewriterOptions, TypewriterState } from "./timeline";
export {
  clamp01,
  framesFor,
  revealCount,
  revealedText,
  useCurrentState,
  useStateTransition,
  useTypewriter,
} from "./timeline";
export type { Step } from "./types";
