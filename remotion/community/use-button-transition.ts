// Source: remocn — https://remocn.dev/r/button.json (registry/remocn-ui/button/use-button-transition.ts), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; transition hook for "remocn_ui_button" (driven by ui-timeline.tsx).
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import {
  type ButtonState,
  type ButtonStyle,
  buttonStyle,
  buttonStyleContext,
} from "@/components/remocn/button";
import {
  easings,
  mixOklch,
  type RemocnTheme,
  type Step,
  useRemocnTheme,
  useStateTransition,
} from "@/lib/remocn-ui";

export const DEFAULT_DURATION = 8;

export function tweenButtonStyle(
  a: ButtonStyle,
  b: ButtonStyle,
  t: number,
): ButtonStyle {
  return {
    translateY: a.translateY + (b.translateY - a.translateY) * t,
    scale: a.scale + (b.scale - a.scale) * t,
    labelOpacity: a.labelOpacity + (b.labelOpacity - a.labelOpacity) * t,
    spinnerOpacity:
      a.spinnerOpacity + (b.spinnerOpacity - a.spinnerOpacity) * t,
    checkOpacity: a.checkOpacity + (b.checkOpacity - a.checkOpacity) * t,
    background: mixOklch(a.background, b.background, t),
  };
}

export interface ButtonTransitionOptions {
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost";
  theme?: Partial<RemocnTheme>;
  mode?: "light" | "dark";
  primary?: string;
  speed?: number;
  defaultDuration?: number;
}

export function useButtonTransition(
  steps: Step<ButtonState>[],
  opts: ButtonTransitionOptions = {},
): ButtonStyle {
  const {
    variant = "default",
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
  const ctx = buttonStyleContext(variant, theme);
  const { from, to, progress } = useStateTransition(
    steps,
    "idle",
    speed,
    defaultDuration,
  );
  const t = easings.out(progress);
  return tweenButtonStyle(buttonStyle(from, ctx), buttonStyle(to, ctx), t);
}
