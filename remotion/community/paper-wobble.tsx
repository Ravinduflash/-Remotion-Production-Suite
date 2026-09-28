// Source: remocn — https://remocn.dev/r/paper-wobble.json (registry/remocn/paper-wobble/index.tsx), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; registered as catalog id "remocn_paper_wobble".
// Path aliases @/lib/remocn and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import type React from "react";
import { useCurrentFrame } from "remotion";
import { DEFAULT_STEP, paperJitter } from "@/lib/remocn/stop-motion";

export interface PaperWobbleProps {
  children: React.ReactNode;
  seed?: string;
  amp?: number;
  rotAmp?: number;
  step?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function PaperWobble({
  children,
  seed = "wobble",
  amp = 1.4,
  rotAmp = 0.35,
  step = DEFAULT_STEP,
  className,
  style,
}: PaperWobbleProps) {
  const frame = useCurrentFrame();
  const jitter = paperJitter(frame, seed, { amp, rotAmp, step });
  const wobble = `translate(${jitter.x}px, ${jitter.y}px) rotate(${jitter.rot}deg)`;

  return (
    <div
      className={className}
      style={{
        display: "inline-block",
        ...style,
        transform: style?.transform ? `${style.transform} ${wobble}` : wobble,
      }}
    >
      {children}
    </div>
  );
}
