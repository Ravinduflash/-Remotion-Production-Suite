// Source: remocn — https://remocn.dev/r/zoom-blur.json (registry/remocn/zoom-blur/index.tsx), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; registered as catalog id "remocn_zoom_blur" (a transition layer: the export is a presentation factory).
// Path aliases @/lib/remocn and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";
import type React from "react";
import { AbsoluteFill } from "remotion";

export type ZoomBlurProps = {
  blur?: number;
  rise?: number;
};

const ZoomBlurPresentation: React.FC<
  TransitionPresentationComponentProps<ZoomBlurProps>
> = ({
  children,
  presentationProgress,
  presentationDirection,
  passedProps,
}) => {
  const { blur = 16, rise = 0 } = passedProps;
  const entering = presentationDirection === "entering";
  const p = presentationProgress;

  const style: React.CSSProperties = entering
    ? {
        opacity: p,
        transform: `scale(${0.9 + p * 0.1})${
          rise > 0 ? ` translateY(${(1 - p) * rise}px)` : ""
        }`,
        filter: p < 1 ? `blur(${(1 - p) * blur}px)` : undefined,
      }
    : {
        opacity: 1 - p,
        transform: `scale(${1 + p * 0.12})${
          rise > 0 ? ` translateY(${-p * rise}px)` : ""
        }`,
        filter: p > 0 ? `blur(${p * blur}px)` : undefined,
      };

  return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
};

export function zoomBlur(
  props: ZoomBlurProps = {},
): TransitionPresentation<ZoomBlurProps> {
  return {
    component: ZoomBlurPresentation,
    props,
  };
}
