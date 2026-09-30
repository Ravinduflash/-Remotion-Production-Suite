// Source: remocn — https://remocn.dev/r/select-item.json (registry/remocn-ui/select-item/use-select-item-transition.ts), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; registry dependency of combobox; not registered on its own yet.
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import {
  type SelectItemState,
  type SelectItemStyle,
  selectItemStyle,
  selectItemStyleContext,
} from "@/components/remocn/select-item";
import {
  easings,
  mixOklch,
  type RemocnTheme,
  type Step,
  useRemocnTheme,
  useStateTransition,
} from "@/lib/remocn-ui";

export const DEFAULT_DURATION = 8;

export function tweenSelectItemStyle(
  a: SelectItemStyle,
  b: SelectItemStyle,
  t: number,
): SelectItemStyle {
  return {
    background: mixOklch(a.background, b.background, t),
    labelColor: mixOklch(a.labelColor, b.labelColor, t),
    checkOpacity: a.checkOpacity + (b.checkOpacity - a.checkOpacity) * t,
    scale: a.scale + (b.scale - a.scale) * t,
  };
}

export interface SelectItemTransitionOptions {
  theme?: Partial<RemocnTheme>;
  mode?: "light" | "dark";
  speed?: number;
  defaultDuration?: number;
}

export function useSelectItemTransition(
  steps: Step<SelectItemState>[],
  opts: SelectItemTransitionOptions = {},
): SelectItemStyle {
  const {
    theme: themeOverride,
    mode,
    speed = 1,
    defaultDuration = DEFAULT_DURATION,
  } = opts;
  const theme = useRemocnTheme(themeOverride, mode);
  const ctx = selectItemStyleContext(theme);
  const { from, to, progress } = useStateTransition(
    steps,
    "idle",
    speed,
    defaultDuration,
  );
  const t = easings.out(progress);
  return tweenSelectItemStyle(
    selectItemStyle(from, ctx),
    selectItemStyle(to, ctx),
    t,
  );
}
