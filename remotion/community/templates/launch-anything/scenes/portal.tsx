// Source: remocn — https://remocn.dev/r/launch-anything.json (components/remocn/templates/launch-anything/scenes/portal.tsx), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; part of template catalog id "remocn_tpl_product_showcase".
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to remotion/community (render-project/remotion.config.ts + tsconfig paths).
import type { SceneProps } from "../content";
import { ActionFrame, actionBackground } from "./action-frame";
export function Portal(props: SceneProps) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: actionBackground,
        overflow: "hidden",
      }}
    >
      <ActionFrame {...props} />
    </div>
  );
}
