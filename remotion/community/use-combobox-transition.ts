// Source: remocn — https://remocn.dev/r/combobox.json (registry/remocn-ui/combobox/use-combobox-transition.ts), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; transition hook for "remocn_ui_combobox" (driven by ui-timeline.tsx).
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import {
  type ComboboxState,
  type ComboboxStyle,
  comboboxStyle,
  comboboxStyleContext,
} from "@/components/remocn/combobox";
import {
  easings,
  type RemocnTheme,
  type Step,
  useRemocnTheme,
  useStateTransition,
} from "@/lib/remocn-ui";

export const DEFAULT_DURATION = 12;

export function tweenComboboxStyle(
  a: ComboboxStyle,
  b: ComboboxStyle,
  t: number,
): ComboboxStyle {
  return {
    panelOpacity: a.panelOpacity + (b.panelOpacity - a.panelOpacity) * t,
    panelScale: a.panelScale + (b.panelScale - a.panelScale) * t,
    panelTranslateY:
      a.panelTranslateY + (b.panelTranslateY - a.panelTranslateY) * t,
  };
}

export interface ComboboxTransitionOptions {
  theme?: Partial<RemocnTheme>;
  mode?: "light" | "dark";
  speed?: number;
  defaultDuration?: number;
}

export function useComboboxTransition(
  steps: Step<ComboboxState>[],
  opts: ComboboxTransitionOptions = {},
): ComboboxStyle {
  const {
    theme: themeOverride,
    mode,
    speed = 1,
    defaultDuration = DEFAULT_DURATION,
  } = opts;
  const theme = useRemocnTheme(themeOverride, mode);
  const ctx = comboboxStyleContext(theme);
  const { from, to, progress } = useStateTransition(
    steps,
    "closed",
    speed,
    defaultDuration,
  );
  const t = easings.out(progress);
  return tweenComboboxStyle(
    comboboxStyle(from, ctx),
    comboboxStyle(to, ctx),
    t,
  );
}
