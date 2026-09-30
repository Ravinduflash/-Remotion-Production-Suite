// Source: remocn — https://remocn.dev/r/shader-smoke-ring.json (registry/remocn/shader-smoke-ring/index.tsx), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; registry dependency imported as @/components/remocn/shader-smoke-ring by smoke-dissolve; also registered as catalog id "remocn_shader_smoke_ring" (full-frame backdrop).
// Path aliases @/lib/remocn and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import { SmokeRing, type SmokeRingProps } from "@paper-design/shaders-react";
import { useCallback, useState } from "react";
import {
  continueRender,
  delayRender,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const NEUTRAL_COLORS = ["#c8c8d0"];

export interface ShaderSmokeRingProps
  extends Omit<SmokeRingProps, "frame" | "ref"> {}

export function ShaderSmokeRing({
  speed = 1,
  colorBack = "#12121a",
  colors = NEUTRAL_COLORS,
  radius = 0.25,
  thickness = 0.65,
  scale = 0.8,
  className,
  ...rest
}: ShaderSmokeRingProps) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const [handle] = useState(() => delayRender("shader-smoke-ring"));
  const gate = useCallback(
    (element: HTMLDivElement | null) => {
      if (!element) return;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => continueRender(handle)),
      );
    },
    [handle],
  );

  return (
    <div
      ref={gate}
      className={className}
      style={{ position: "absolute", inset: 0 }}
    >
      <SmokeRing
        speed={0}
        frame={(frame / fps) * speed * 1000}
        colorBack={colorBack}
        colors={colors}
        radius={radius}
        thickness={thickness}
        scale={scale}
        fit="cover"
        width={width}
        height={height}
        {...rest}
      />
    </div>
  );
}
