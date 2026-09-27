// Source: remocn — https://remocn.dev/r/remocn-ui.json (registry/remocn-ui/core/types.ts), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; remocn-ui core lib, imported as @/lib/remocn-ui (useTypewriter); not a catalog entry.
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
export interface Step<S extends string = string> {
  at: number;
  state: S;
  duration?: number;
}
