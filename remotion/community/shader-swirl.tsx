// Source: remocn — https://remocn.dev/r/shader-swirl.json (registry/remocn/shader-swirl/index.tsx), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; registry dependency imported as @/components/remocn/shader-swirl by swirl-dissolve; also registered as catalog id "remocn_shader_swirl" (full-frame backdrop).
// Path aliases @/lib/remocn and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import { Swirl, type SwirlProps } from "@paper-design/shaders-react";
import { useCallback, useState } from "react";
import {
  continueRender,
  delayRender,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const NEUTRAL_COLORS = ["#52527a", "#3a3a5c", "#232338"];

export interface ShaderSwirlProps extends Omit<SwirlProps, "frame" | "ref"> {}

export function ShaderSwirl({
  speed = 1,
  colors = NEUTRAL_COLORS,
  colorBack = "#12121a",
  bandCount = 4,
  twist = 0.1,
  softness = 0.2,
  className,
  ...rest
}: ShaderSwirlProps) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const [handle] = useState(() => delayRender("shader-swirl"));
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
      <Swirl
        speed={0}
        frame={(frame / fps) * speed * 1000}
        colors={colors}
        colorBack={colorBack}
        bandCount={bandCount}
        twist={twist}
        softness={softness}
        fit="cover"
        width={width}
        height={height}
        {...rest}
      />
    </div>
  );
}
