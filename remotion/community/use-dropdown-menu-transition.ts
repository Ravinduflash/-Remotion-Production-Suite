// Source: remocn — https://remocn.dev/r/dropdown-menu.json (registry/remocn-ui/dropdown-menu/use-dropdown-menu-transition.ts), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; transition hook for "remocn_ui_dropdown_menu" (driven by ui-timeline.tsx).
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import {
  type DropdownMenuState,
  type DropdownMenuStyle,
  dropdownMenuStyle,
  dropdownMenuStyleContext,
} from "@/components/remocn/dropdown-menu";
import {
  easings,
  type RemocnTheme,
  type Step,
  useRemocnTheme,
  useStateTransition,
} from "@/lib/remocn-ui";

export const DEFAULT_DURATION = 12;

export function tweenDropdownMenuStyle(
  a: DropdownMenuStyle,
  b: DropdownMenuStyle,
  t: number,
): DropdownMenuStyle {
  return {
    panelOpacity: a.panelOpacity + (b.panelOpacity - a.panelOpacity) * t,
    panelScale: a.panelScale + (b.panelScale - a.panelScale) * t,
    panelTranslateY:
      a.panelTranslateY + (b.panelTranslateY - a.panelTranslateY) * t,
    chevronRotation:
      a.chevronRotation + (b.chevronRotation - a.chevronRotation) * t,
  };
}

export interface DropdownMenuTransitionOptions {
  theme?: Partial<RemocnTheme>;
  mode?: "light" | "dark";
  primary?: string;
  speed?: number;
  defaultDuration?: number;
}

export function useDropdownMenuTransition(
  steps: Step<DropdownMenuState>[],
  opts: DropdownMenuTransitionOptions = {},
): DropdownMenuStyle {
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
  const ctx = dropdownMenuStyleContext(theme);
  const { from, to, progress } = useStateTransition(
    steps,
    "closed",
    speed,
    defaultDuration,
  );
  const t = easings.out(progress);
  return tweenDropdownMenuStyle(
    dropdownMenuStyle(from, ctx),
    dropdownMenuStyle(to, ctx),
    t,
  );
}
