// Source: remocn — https://remocn.dev/r/switch.json (registry/remocn-ui/switch/use-switch-transition.ts), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; transition hook for "remocn_ui_switch" (driven by ui-timeline.tsx).
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import {
  type SwitchState,
  type SwitchStyle,
  switchStyle,
  switchStyleContext,
} from "@/components/remocn/switch";
import {
  easings,
  mixOklch,
  type RemocnTheme,
  type Step,
  useRemocnTheme,
  useStateTransition,
} from "@/lib/remocn-ui";

export const DEFAULT_DURATION = 10;

export function tweenSwitchStyle(
  a: SwitchStyle,
  b: SwitchStyle,
  t: number,
): SwitchStyle {
  return {
    trackBackground: mixOklch(a.trackBackground, b.trackBackground, t),
    thumbOffset: a.thumbOffset + (b.thumbOffset - a.thumbOffset) * t,
  };
}

export interface SwitchTransitionOptions {
  theme?: Partial<RemocnTheme>;
  mode?: "light" | "dark";
  primary?: string;
  speed?: number;
  defaultDuration?: number;
}

export function useSwitchTransition(
  steps: Step<SwitchState>[],
  opts: SwitchTransitionOptions = {},
): SwitchStyle {
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
  const ctx = switchStyleContext(theme);
  const { from, to, progress } = useStateTransition(
    steps,
    "unchecked",
    speed,
    defaultDuration,
  );
  const t = easings.out(progress);
  return tweenSwitchStyle(switchStyle(from, ctx), switchStyle(to, ctx), t);
}
