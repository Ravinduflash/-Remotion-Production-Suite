// Source: remocn — https://remocn.dev/r/focus-pull.json (registry/remocn/focus-pull/index.tsx), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; registered as catalog id "remocn_focus_pull" (a transition layer: the export is a presentation factory).
// Path aliases @/lib/remocn and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";
import type React from "react";
import { AbsoluteFill, Easing, interpolate } from "remotion";

const clampOpts = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export type FocusPullProps = {
  blur?: number;
};

const FocusPullPresentation: React.FC<
  TransitionPresentationComponentProps<FocusPullProps>
> = ({
  children,
  presentationProgress,
  presentationDirection,
  passedProps,
}) => {
  const { blur = 16 } = passedProps;
  const entering = presentationDirection === "entering";
  const p = presentationProgress;

  if (!entering) {
    const exitStyle: React.CSSProperties = {
      opacity: interpolate(p, [0.42, 0.68], [1, 0], {
        ...clampOpts,
        easing: Easing.bezier(0.42, 0, 0.58, 1),
      }),
      scale: `${interpolate(p, [0, 0.6], [1, 1.05], {
        ...clampOpts,
        easing: Easing.bezier(0.42, 0, 0.58, 1),
      })}`,
      filter: `blur(${interpolate(p, [0.05, 0.55], [0, blur], {
        ...clampOpts,
        easing: Easing.in(Easing.quad),
      })}px) brightness(${interpolate(p, [0.1, 0.55], [1, 1.3], clampOpts)})`,
    };
    return <AbsoluteFill style={exitStyle}>{children}</AbsoluteFill>;
  }

  const childStyle: React.CSSProperties = {
    opacity: interpolate(p, [0.32, 0.52], [0, 1], clampOpts),
    scale: `${interpolate(p, [0.35, 1], [0.97, 1], {
      ...clampOpts,
      easing: Easing.out(Easing.cubic),
    })}`,
    filter: `blur(${interpolate(p, [0.35, 0.9], [blur, 0], {
      ...clampOpts,
      easing: Easing.out(Easing.quad),
    })}px) brightness(${interpolate(p, [0.4, 0.85], [1.25, 1], clampOpts)})`,
  };

  return <AbsoluteFill style={childStyle}>{children}</AbsoluteFill>;
};

export function focusPull(
  props: FocusPullProps = {},
): TransitionPresentation<FocusPullProps> {
  return {
    component: FocusPullPresentation,
    props,
  };
}
