// Source: remocn — https://remocn.dev/r/drift.json (registry/remocn/drift/index.tsx), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; registered as catalog id "remocn_drift".
// Path aliases @/lib/remocn and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import type React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface DriftProps {
  children: React.ReactNode;
  grow?: number;
}

export function Drift({ children, grow = 0.035 }: DriftProps) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const scale = interpolate(frame, [0, durationInFrames], [1, 1 + grow]);
  return <AbsoluteFill style={{ scale: `${scale}` }}>{children}</AbsoluteFill>;
}
