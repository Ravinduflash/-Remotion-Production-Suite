// Source: remocn — https://remocn.dev/r/page-turn.json (registry/remocn/page-turn/index.tsx), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; registered as catalog id "remocn_page_turn" (a transition layer: the export is a presentation factory).
// Path aliases @/lib/remocn and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";
import type React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";

const LIFT_RATIO = 1.28;

export function pageTurnPose(progress: number, poses: number): number {
  const clamped = Math.min(1, Math.max(0, progress));
  const eased = clamped ** 3;
  if (poses <= 1) return eased >= 1 ? 1 : 0;
  const bucket = Math.min(poses - 1, Math.floor(eased * poses));
  return bucket / (poses - 1);
}

export type PageTurnProps = {
  angle?: number;
  origin?: string;
  poses?: number;
};

const PageTurnPresentation: React.FC<
  TransitionPresentationComponentProps<PageTurnProps>
> = ({
  children,
  presentationProgress,
  presentationDirection,
  passedProps,
}) => {
  const { height } = useVideoConfig();
  const { angle = -7, origin = "18% 100%", poses = 8 } = passedProps;

  if (presentationDirection === "entering") {
    return <AbsoluteFill>{children}</AbsoluteFill>;
  }

  const pose = pageTurnPose(presentationProgress, poses);

  return (
    <AbsoluteFill
      style={{
        zIndex: 2,
        transformOrigin: origin,
        translate: `0 ${-pose * height * LIFT_RATIO}px`,
        rotate: `${angle * pose}deg`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export function pageTurn(
  props: PageTurnProps = {},
): TransitionPresentation<PageTurnProps> {
  return {
    component: PageTurnPresentation,
    props,
  };
}
