// Source: remocn — https://remocn.dev/r/shader-color-panels.json (registry/remocn/shader-color-panels/index.tsx), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; registered as catalog id "remocn_shader_color_panels" (full-frame backdrop).
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import {
  ColorPanels,
  type ColorPanelsProps,
} from "@paper-design/shaders-react";
import { useCallback, useState } from "react";
import {
  continueRender,
  delayRender,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const NEUTRAL_COLORS = ["#3a3a52", "#4a4a68", "#52527a", "#5a5a8a"];

export interface ShaderColorPanelsProps
  extends Omit<ColorPanelsProps, "frame" | "ref"> {}

export function ShaderColorPanels({
  speed = 1,
  colors = NEUTRAL_COLORS,
  colorBack = "#12121a",
  density = 3,
  length = 1.1,
  className,
  ...rest
}: ShaderColorPanelsProps) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const [handle] = useState(() => delayRender("shader-color-panels"));
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
      <ColorPanels
        speed={0}
        frame={(frame / fps) * speed * 1000}
        colors={colors}
        colorBack={colorBack}
        density={density}
        length={length}
        fit="cover"
        width={width}
        height={height}
        {...rest}
      />
    </div>
  );
}
