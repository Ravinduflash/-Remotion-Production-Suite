// Source: remocn — https://remocn.dev/r/fomo-limit-orders.json (components/remocn/templates/fomo-limit-orders/scenes/closing.tsx), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; part of template catalog id "remocn_tpl_order_flow".
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to remotion/community (render-project/remotion.config.ts + tsconfig paths).
import type { SceneProps } from "../content";
import { ramp, tween } from "../motion";
import { AssetIcon, Layer } from "../ui";

export function Closing({ t, content, brandName, theme }: SceneProps) {
  const brand = tween(t, 18.15, 18.38);
  return (
    <>
      {t < 18.3 && (
        <Layer
          x={15}
          y={111}
          w={450}
          h={42}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            fontSize: 22.5,
            letterSpacing: -1,
            whiteSpace: "nowrap",
            opacity: 1 - ramp(t, 18.13, 18.24),
          }}
        >
          {content.closing.split(" ").map((word, i) => {
            const p = tween(t, 16 + i * 0.3, 16.18 + i * 0.3);
            return (
              <span
                key={i}
                style={{
                  opacity: p,
                  filter: `blur(${(1 - p) * 4}px)`,
                  transform: `translateY(${(1 - p) * 7}px)`,
                }}
              >
                {word}
              </span>
            );
          })}
        </Layer>
      )}
      {t >= 18.15 && (
        <Layer
          x={15}
          y={98}
          w={450}
          h={64}
          style={{
            display: "grid",
            placeItems: "center",
            fontSize: brandName.length > 9 ? 31 : 42,
            fontWeight: 600,
            letterSpacing: -1.2,
            opacity: brand,
            transform: `scale(${0.95 + 0.05 * brand})`,
            filter: `blur(${(1 - brand) * 5}px)`,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <AssetIcon size={42} color={theme.accent} />
            {brandName}
          </span>
        </Layer>
      )}
    </>
  );
}
