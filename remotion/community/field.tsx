// Source: remocn — https://remocn.dev/r/field.json (registry/remocn-ui/field/index.tsx), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; layout family for catalog id "remocn_ui_field" (driven by ui-timeline.tsx FieldTimeline).
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import type { CSSProperties, ReactNode } from "react";
import { type RemocnTheme, useRemocnTheme } from "@/lib/remocn-ui";

export interface FieldGroupProps {
  children: ReactNode;
  gap?: number;
  style?: CSSProperties;
}

export function FieldGroup({ children, gap = 16, style }: FieldGroupProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap, ...style }}>
      {children}
    </div>
  );
}

export interface FieldProps {
  children: ReactNode;
  gap?: number;
  style?: CSSProperties;
}

export function Field({ children, gap = 6, style }: FieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap, ...style }}>
      {children}
    </div>
  );
}

export interface FieldLabelProps {
  children: ReactNode;
  theme?: Partial<RemocnTheme>;
  style?: CSSProperties;
}

export function FieldLabel({ children, theme, style }: FieldLabelProps) {
  const t = useRemocnTheme(theme, "light");
  return (
    <div
      style={{
        fontSize: 13,
        lineHeight: "18px",
        fontWeight: 500,
        letterSpacing: "-0.01em",
        color: t.foreground,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export interface FieldDescriptionProps {
  children: ReactNode;
  align?: "start" | "center";
  theme?: Partial<RemocnTheme>;
  style?: CSSProperties;
}

export function FieldDescription({
  children,
  align = "start",
  theme,
  style,
}: FieldDescriptionProps) {
  const t = useRemocnTheme(theme, "light");
  return (
    <div
      style={{
        fontSize: 12,
        lineHeight: "16px",
        color: t.mutedForeground,
        textAlign: align === "center" ? "center" : "left",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export interface FieldControlProps {
  children: ReactNode;
  height?: number;
  style?: CSSProperties;
}

export function FieldControl({
  children,
  height = 40,
  style,
}: FieldControlProps) {
  return (
    <div style={{ position: "relative", height, ...style }}>{children}</div>
  );
}
