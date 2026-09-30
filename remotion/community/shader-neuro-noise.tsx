// Source: remocn — https://remocn.dev/r/shader-neuro-noise.json (registry/remocn/shader-neuro-noise/index.tsx), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; registered as catalog id "remocn_shader_neuro_noise" (full-frame backdrop).
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import { NeuroNoise, type NeuroNoiseProps } from "@paper-design/shaders-react";
import { useCallback, useState } from "react";
import {
  continueRender,
  delayRender,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface ShaderNeuroNoiseProps
  extends Omit<NeuroNoiseProps, "frame" | "ref"> {}

export function ShaderNeuroNoise({
  speed = 1,
  colorFront = "#8a8a95",
  colorMid = "#4a4a68",
  colorBack = "#12121a",
  brightness = 0.05,
  contrast = 0.3,
  className,
  ...rest
}: ShaderNeuroNoiseProps) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const [handle] = useState(() => delayRender("shader-neuro-noise"));
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
      <NeuroNoise
        speed={0}
        frame={(frame / fps) * speed * 1000}
        colorFront={colorFront}
        colorMid={colorMid}
        colorBack={colorBack}
        brightness={brightness}
        contrast={contrast}
        fit="cover"
        width={width}
        height={height}
        {...rest}
      />
    </div>
  );
}
