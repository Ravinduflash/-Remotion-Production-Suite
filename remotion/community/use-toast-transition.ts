// Source: remocn — https://remocn.dev/r/toast.json (registry/remocn-ui/toast/use-toast-transition.ts), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; transition hook for "remocn_ui_toast" (driven by ui-timeline.tsx).
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import {
  type ToastState,
  type ToastStyle,
  toastStyle,
} from "@/components/remocn/toast";
import { easings, type Step, useStateTransition } from "@/lib/remocn-ui";

export const DEFAULT_DURATION = 12;

export function tweenToastStyle(
  a: ToastStyle,
  b: ToastStyle,
  t: number,
): ToastStyle {
  return {
    opacity: a.opacity + (b.opacity - a.opacity) * t,
    translateY: a.translateY + (b.translateY - a.translateY) * t,
    scale: a.scale + (b.scale - a.scale) * t,
  };
}

export interface ToastTransitionOptions {
  mode?: "light" | "dark";
  speed?: number;
  defaultDuration?: number;
}

export function useToastTransition(
  steps: Step<ToastState>[],
  opts: ToastTransitionOptions = {},
): ToastStyle {
  const { speed = 1, defaultDuration = DEFAULT_DURATION } = opts;
  const { from, to, progress } = useStateTransition(
    steps,
    "hidden",
    speed,
    defaultDuration,
  );
  const t = easings.out(progress);
  return tweenToastStyle(toastStyle(from), toastStyle(to), t);
}
