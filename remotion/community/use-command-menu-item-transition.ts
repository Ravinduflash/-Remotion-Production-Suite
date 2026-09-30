// Source: remocn — https://remocn.dev/r/command-menu-item.json (registry/remocn-ui/command-menu-item/use-command-menu-item-transition.ts), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; registry dependency of command-menu; not registered on its own yet.
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import {
  type CommandMenuItemState,
  type CommandMenuItemStyle,
  commandMenuItemStyle,
  commandMenuItemStyleContext,
} from "@/components/remocn/command-menu-item";
import {
  easings,
  mixOklch,
  type RemocnTheme,
  type Step,
  useRemocnTheme,
  useStateTransition,
} from "@/lib/remocn-ui";

export const DEFAULT_DURATION = 8;

export function tweenCommandMenuItemStyle(
  a: CommandMenuItemStyle,
  b: CommandMenuItemStyle,
  t: number,
): CommandMenuItemStyle {
  return {
    background: mixOklch(a.background, b.background, t),
    labelColor: mixOklch(a.labelColor, b.labelColor, t),
    iconColor: mixOklch(a.iconColor, b.iconColor, t),
    scale: a.scale + (b.scale - a.scale) * t,
  };
}

export interface CommandMenuItemTransitionOptions {
  theme?: Partial<RemocnTheme>;
  mode?: "light" | "dark";
  speed?: number;
  defaultDuration?: number;
}

export function useCommandMenuItemTransition(
  steps: Step<CommandMenuItemState>[],
  opts: CommandMenuItemTransitionOptions = {},
): CommandMenuItemStyle {
  const {
    theme: themeOverride,
    mode,
    speed = 1,
    defaultDuration = DEFAULT_DURATION,
  } = opts;
  const theme = useRemocnTheme(themeOverride, mode);
  const ctx = commandMenuItemStyleContext(theme);
  const { from, to, progress } = useStateTransition(
    steps,
    "idle",
    speed,
    defaultDuration,
  );
  const t = easings.out(progress);
  return tweenCommandMenuItemStyle(
    commandMenuItemStyle(from, ctx),
    commandMenuItemStyle(to, ctx),
    t,
  );
}
