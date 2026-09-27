// Source: remocn — https://remocn.dev/r/shared-axis-y.json (registry/remocn/shared-axis-y/index.tsx), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; registered as catalog id "remocn_shared_axis_y".
// Path aliases @/lib/remocn and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import { Easing, interpolate, useCurrentFrame } from "remotion";

export interface SharedAxisYProps {
  fromText: string;
  toText: string;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  speed?: number;
  className?: string;
}

export function SharedAxisY({
  fromText,
  toText,
  fontSize = 72,
  color = "#171717",
  fontWeight = 600,
  speed = 1,
  className,
}: SharedAxisYProps) {
  const frame = useCurrentFrame() * speed;

  const fromWords = fromText.split(" ");
  const toWords = toText.split(" ");

  const enterDur = 5;
  const exitDur = 4;
  const enterStagger = 2;
  const exitStagger = 2;
  const overlapF = 0;
  const microDelayF = 1;

  const exitTotal = exitDur + (fromWords.length - 1) * exitStagger;
  const newStart = Math.max(0, exitTotal - overlapF + microDelayF);

  const fontStack =
    "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background: "transparent",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize,
            fontWeight,
            color,
            letterSpacing: "-0.03em",
            fontFamily: fontStack,
          }}
        >
          {fromWords.map((word, i) => {
            const local = frame - i * exitStagger;
            const opacity = interpolate(local, [0, exitDur], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.step1,
            });
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  marginRight: "0.25em",
                  opacity,
                }}
              >
                {word}
              </span>
            );
          })}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize,
            fontWeight,
            color,
            letterSpacing: "-0.03em",
            fontFamily: fontStack,
          }}
        >
          {toWords.map((word, j) => {
            const local = frame - newStart - j * enterStagger;
            const opacity = interpolate(local, [0, enterDur], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.step1,
            });
            return (
              <span
                key={j}
                style={{
                  display: "inline-block",
                  marginRight: "0.25em",
                  opacity,
                }}
              >
                {word}
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
}
