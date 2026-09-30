// Source: remocn — https://remocn.dev/r/skeleton.json (registry/remocn-ui/skeleton/use-skeleton-transition.ts), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; transition hook for "remocn_ui_skeleton" (driven by ui-timeline.tsx).
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import {
  type SkeletonState,
  type SkeletonStyle,
  skeletonStyle,
} from "@/components/remocn/skeleton";
import { easings, type Step, useStateTransition } from "@/lib/remocn-ui";

export const DEFAULT_DURATION = 12;

export function tweenSkeletonStyle(
  a: SkeletonStyle,
  b: SkeletonStyle,
  t: number,
): SkeletonStyle {
  return {
    skeletonOpacity:
      a.skeletonOpacity + (b.skeletonOpacity - a.skeletonOpacity) * t,
    contentOpacity:
      a.contentOpacity + (b.contentOpacity - a.contentOpacity) * t,
  };
}

export interface SkeletonTransitionOptions {
  mode?: "light" | "dark";
  speed?: number;
  defaultDuration?: number;
}

export function useSkeletonTransition(
  steps: Step<SkeletonState>[],
  opts: SkeletonTransitionOptions = {},
): SkeletonStyle {
  const { speed = 1, defaultDuration = DEFAULT_DURATION } = opts;
  const { from, to, progress } = useStateTransition(
    steps,
    "loading",
    speed,
    defaultDuration,
  );
  const t = easings.out(progress);
  return tweenSkeletonStyle(skeletonStyle(from), skeletonStyle(to), t);
}
