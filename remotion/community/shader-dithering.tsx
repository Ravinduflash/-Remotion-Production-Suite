// Source: remocn — https://remocn.dev/r/shader-dithering.json (registry/remocn/shader-dithering/index.tsx), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; registry dependency imported as @/components/remocn/shader-dithering by dither-dissolve; also registered as catalog id "remocn_shader_dithering" (full-frame backdrop).
// Path aliases @/lib/remocn and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import { Dithering, type DitheringProps } from "@paper-design/shaders-react";
import { useCallback, useState } from "react";
import {
  continueRender,
  delayRender,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface ShaderDitheringProps
  extends Omit<DitheringProps, "frame" | "ref"> {}

export function ShaderDithering({
  speed = 1,
  colorBack = "#12121a",
  colorFront = "#6a6a85",
  shape = "wave",
  type = "4x4",
  size = 2,
  className,
  ...rest
}: ShaderDitheringProps) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const [handle] = useState(() => delayRender("shader-dithering"));
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
      <Dithering
        speed={0}
        frame={(frame / fps) * speed * 1000}
        colorBack={colorBack}
        colorFront={colorFront}
        shape={shape}
        type={type}
        size={size}
        fit="cover"
        width={width}
        height={height}
        {...rest}
      />
    </div>
  );
}
