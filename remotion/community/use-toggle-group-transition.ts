// Source: remocn — https://remocn.dev/r/toggle-group.json (registry/remocn-ui/toggle-group/use-toggle-group-transition.ts), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; transition hook for "remocn_ui_toggle_group" (driven by ui-timeline.tsx).
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import {
  type ToggleGroupItem,
  type ToggleGroupState,
  type ToggleGroupStyle,
  toggleGroupStyle,
  toggleGroupStyleContext,
} from "@/components/remocn/toggle-group";
import {
  easings,
  type RemocnTheme,
  type Step,
  useRemocnTheme,
  useStateTransition,
} from "@/lib/remocn-ui";

const DEFAULT_ITEMS: ToggleGroupItem[] = [
  { value: "Monthly", label: "Monthly" },
  { value: "Yearly", label: "Yearly" },
];

export const DEFAULT_DURATION = 14;

export function tweenToggleGroupStyle(
  a: ToggleGroupStyle,
  b: ToggleGroupStyle,
  t: number,
): ToggleGroupStyle {
  return {
    indicatorOffset:
      a.indicatorOffset + (b.indicatorOffset - a.indicatorOffset) * t,
  };
}

export interface ToggleGroupTransitionOptions {
  items?: ToggleGroupItem[];
  theme?: Partial<RemocnTheme>;
  mode?: "light" | "dark";
  speed?: number;
  defaultDuration?: number;
}

export function useToggleGroupTransition(
  steps: Step<ToggleGroupState>[],
  opts: ToggleGroupTransitionOptions = {},
): ToggleGroupStyle {
  const {
    items = DEFAULT_ITEMS,
    theme: themeOverride,
    mode,
    speed = 1,
    defaultDuration = DEFAULT_DURATION,
  } = opts;
  const theme = useRemocnTheme(themeOverride, mode);
  const ctx = toggleGroupStyleContext(items, theme);
  const { from, to, progress } = useStateTransition(
    steps,
    items[0].value,
    speed,
    defaultDuration,
  );
  const t = easings.out(progress);
  return tweenToggleGroupStyle(
    toggleGroupStyle(from, ctx),
    toggleGroupStyle(to, ctx),
    t,
  );
}
