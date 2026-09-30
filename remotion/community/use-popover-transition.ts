// Source: remocn — https://remocn.dev/r/popover.json (registry/remocn-ui/popover/use-popover-transition.ts), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; transition hook for "remocn_ui_popover" (driven by ui-timeline.tsx).
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import {
  type PopoverState,
  type PopoverStyle,
  popoverStyle,
} from "@/components/remocn/popover";
import { easings, type Step, useStateTransition } from "@/lib/remocn-ui";

export const DEFAULT_DURATION = 10;

export function tweenPopoverStyle(
  a: PopoverStyle,
  b: PopoverStyle,
  t: number,
): PopoverStyle {
  return {
    opacity: a.opacity + (b.opacity - a.opacity) * t,
    scale: a.scale + (b.scale - a.scale) * t,
    translate: a.translate + (b.translate - a.translate) * t,
  };
}

export interface PopoverTransitionOptions {
  mode?: "light" | "dark";
  speed?: number;
  defaultDuration?: number;
}

export function usePopoverTransition(
  steps: Step<PopoverState>[],
  opts: PopoverTransitionOptions = {},
): PopoverStyle {
  const { speed = 1, defaultDuration = DEFAULT_DURATION } = opts;
  const { from, to, progress } = useStateTransition(
    steps,
    "closed",
    speed,
    defaultDuration,
  );
  const t = easings.out(progress);
  return tweenPopoverStyle(popoverStyle(from), popoverStyle(to), t);
}
