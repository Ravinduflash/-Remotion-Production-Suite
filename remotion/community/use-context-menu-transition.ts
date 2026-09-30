// Source: remocn — https://remocn.dev/r/context-menu.json (registry/remocn-ui/context-menu/use-context-menu-transition.ts), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; transition hook for "remocn_ui_context_menu" (driven by ui-timeline.tsx).
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import {
  type ContextMenuState,
  type ContextMenuStyle,
  contextMenuStyle,
  contextMenuStyleContext,
} from "@/components/remocn/context-menu";
import {
  easings,
  type RemocnTheme,
  type Step,
  useRemocnTheme,
  useStateTransition,
} from "@/lib/remocn-ui";

export const DEFAULT_DURATION = 10;

export function tweenContextMenuStyle(
  a: ContextMenuStyle,
  b: ContextMenuStyle,
  t: number,
): ContextMenuStyle {
  return {
    opacity: a.opacity + (b.opacity - a.opacity) * t,
    scale: a.scale + (b.scale - a.scale) * t,
    translateY: a.translateY + (b.translateY - a.translateY) * t,
  };
}

export interface ContextMenuTransitionOptions {
  theme?: Partial<RemocnTheme>;
  mode?: "light" | "dark";
  speed?: number;
  defaultDuration?: number;
}

export function useContextMenuTransition(
  steps: Step<ContextMenuState>[],
  opts: ContextMenuTransitionOptions = {},
): ContextMenuStyle {
  const {
    theme: themeOverride,
    mode,
    speed = 1,
    defaultDuration = DEFAULT_DURATION,
  } = opts;
  const theme = useRemocnTheme(themeOverride, mode);
  const ctx = contextMenuStyleContext(theme);
  const { from, to, progress } = useStateTransition(
    steps,
    "closed",
    speed,
    defaultDuration,
  );
  const t = easings.out(progress);
  return tweenContextMenuStyle(
    contextMenuStyle(from, ctx),
    contextMenuStyle(to, ctx),
    t,
  );
}
