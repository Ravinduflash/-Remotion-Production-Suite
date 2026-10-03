// Source: remocn — https://remocn.dev/r/workflow-console.json (components/remocn/templates/workflow-console/scenes/titles.tsx), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; part of template catalog id "remocn_tpl_workflow_console".
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to remotion/community (render-project/remotion.config.ts + tsconfig paths).
import { Interactive } from "remotion";
import type { SceneProps } from "../content";
import { move, typed } from "../motion";
import { Center } from "../ui";

export function GrowthTitle({ scene, t }: SceneProps) {
  const text = scene.content.growth;
  const parts = text.split(" ");
  const last = parts.pop() ?? text;
  const prefix = parts.join(" ");
  const exit = move(t, 25.1, 25.6);
  return (
    <Center>
      <Interactive.Div
        name="Grow your performance"
        style={{
          fontSize: Math.min(26, 700 / Math.max(1, text.length)),
          letterSpacing: "-0.04em",
          color: "#eeeeee",
          whiteSpace: "pre",
        }}
      >
        {t < 25.1 ? (
          typed(text, t, 24, 24.48)
        ) : (
          <>
            <span
              style={{
                display: "inline-block",
                clipPath: `inset(0 ${exit * 100}% 0 0)`,
              }}
            >
              {prefix}{" "}
            </span>
            <span
              style={{
                display: "inline-block",
                clipPath: `inset(0 0 0 ${move(t, 25.56, 25.6) * 100}%)`,
                translate: `${exit * -60}px 0px`,
              }}
            >
              {last}
            </span>
          </>
        )}
      </Interactive.Div>
    </Center>
  );
}

export function ClosingTitle({ scene, t }: SceneProps) {
  return (
    <Center>
      <Interactive.Div
        name="Stay in the loop"
        style={{
          color: "#eeeeee",
          fontSize: Math.min(
            31,
            710 / Math.max(1, scene.content.closing.length),
          ),
          letterSpacing: "-0.04em",
          whiteSpace: "pre",
        }}
      >
        {typed(scene.content.closing, t, 40.8, 41.5)}
      </Interactive.Div>
    </Center>
  );
}
