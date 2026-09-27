// Source: remocn — https://remocn.dev/r/shader-warp.json (registry/remocn/shader-warp/index.tsx), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; registry dependency imported as @/components/remocn/shader-warp by warp-dissolve; not a catalog entry.
// Path aliases @/lib/remocn and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import { Warp, type WarpProps } from "@paper-design/shaders-react";
import { useCallback, useState } from "react";
import {
  continueRender,
  delayRender,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const NEUTRAL_COLORS = ["#12121a", "#3a3a5c", "#12121a", "#52527a"];

export interface ShaderWarpProps extends Omit<WarpProps, "frame" | "ref"> {}

export function ShaderWarp({
  speed = 1,
  colors = NEUTRAL_COLORS,
  proportion = 0.5,
  softness = 1,
  distortion = 0.2,
  swirl = 0.4,
  className,
  ...rest
}: ShaderWarpProps) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const [handle] = useState(() => delayRender("shader-warp"));
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
      <Warp
        speed={0}
        frame={(frame / fps) * speed * 1000}
        colors={colors}
        proportion={proportion}
        softness={softness}
        distortion={distortion}
        swirl={swirl}
        fit="cover"
        width={width}
        height={height}
        {...rest}
      />
    </div>
  );
}
