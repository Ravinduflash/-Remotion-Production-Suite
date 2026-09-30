// Source: remocn — https://remocn.dev/r/dropdown-menu-item.json (registry/remocn-ui/dropdown-menu-item/use-dropdown-menu-item-transition.ts), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; registry dependency of context-menu; not registered on its own yet.
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import {
  type DropdownMenuItemState,
  type DropdownMenuItemStyle,
  dropdownMenuItemStyle,
  dropdownMenuItemStyleContext,
} from "@/components/remocn/dropdown-menu-item";
import {
  easings,
  mixOklch,
  type RemocnTheme,
  type Step,
  useRemocnTheme,
  useStateTransition,
} from "@/lib/remocn-ui";

export const DEFAULT_DURATION = 8;

export function tweenDropdownMenuItemStyle(
  a: DropdownMenuItemStyle,
  b: DropdownMenuItemStyle,
  t: number,
): DropdownMenuItemStyle {
  return {
    scale: a.scale + (b.scale - a.scale) * t,
    background: mixOklch(a.background, b.background, t),
    labelColor: mixOklch(a.labelColor, b.labelColor, t),
  };
}

export interface DropdownMenuItemTransitionOptions {
  theme?: Partial<RemocnTheme>;
  mode?: "light" | "dark";
  primary?: string;
  speed?: number;
  defaultDuration?: number;
}

export function useDropdownMenuItemTransition(
  steps: Step<DropdownMenuItemState>[],
  opts: DropdownMenuItemTransitionOptions = {},
): DropdownMenuItemStyle {
  const {
    theme: themeOverride,
    mode,
    primary,
    speed = 1,
    defaultDuration = DEFAULT_DURATION,
  } = opts;
  const theme = useRemocnTheme(
    { ...themeOverride, ...(primary ? { primary } : {}) },
    mode,
  );
  const ctx = dropdownMenuItemStyleContext(theme);
  const { from, to, progress } = useStateTransition(
    steps,
    "idle",
    speed,
    defaultDuration,
  );
  const t = easings.out(progress);
  return tweenDropdownMenuItemStyle(
    dropdownMenuItemStyle(from, ctx),
    dropdownMenuItemStyle(to, ctx),
    t,
  );
}
