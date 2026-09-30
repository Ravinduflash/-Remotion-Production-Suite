// Source: remocn — https://remocn.dev/r/spinner.json (registry/remocn-ui/spinner/index.tsx), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; registered as catalog id "remocn_ui_spinner".
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import { useCurrentFrame } from "remotion";

export interface SpinnerProps {
  size?: number;
  color?: string;
  speed?: number;
  strokeWidth?: number;
  className?: string;
}

export function Spinner({
  size = 20,
  color = "currentColor",
  speed = 1,
  strokeWidth = 2.5,
  className,
}: SpinnerProps) {
  const rotation = useCurrentFrame() * speed * 6;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray="44"
        strokeDashoffset="33"
      />
    </svg>
  );
}
