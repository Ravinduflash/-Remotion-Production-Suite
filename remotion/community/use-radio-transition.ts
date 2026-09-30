// Source: remocn — https://remocn.dev/r/radio.json (registry/remocn-ui/radio/use-radio-transition.ts), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; transition hook for "remocn_ui_radio" (driven by ui-timeline.tsx).
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import {
  type RadioState,
  type RadioStyle,
  radioStyle,
  radioStyleContext,
} from "@/components/remocn/radio";
import {
  easings,
  mixOklch,
  type RemocnTheme,
  type Step,
  useRemocnTheme,
  useStateTransition,
} from "@/lib/remocn-ui";

export const DEFAULT_DURATION = 10;

export function tweenRadioStyle(
  a: RadioStyle,
  b: RadioStyle,
  t: number,
): RadioStyle {
  return {
    ringBorderColor: mixOklch(a.ringBorderColor, b.ringBorderColor, t),
    dotOpacity: a.dotOpacity + (b.dotOpacity - a.dotOpacity) * t,
    dotScale: a.dotScale + (b.dotScale - a.dotScale) * t,
  };
}

export interface RadioTransitionOptions {
  theme?: Partial<RemocnTheme>;
  mode?: "light" | "dark";
  primary?: string;
  speed?: number;
  defaultDuration?: number;
}

export function useRadioTransition(
  steps: Step<RadioState>[],
  opts: RadioTransitionOptions = {},
): RadioStyle {
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
  const ctx = radioStyleContext(theme);
  const { from, to, progress } = useStateTransition(
    steps,
    "unchecked",
    speed,
    defaultDuration,
  );
  const t = easings.out(progress);
  return tweenRadioStyle(radioStyle(from, ctx), radioStyle(to, ctx), t);
}
