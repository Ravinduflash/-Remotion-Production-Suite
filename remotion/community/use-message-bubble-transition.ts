// Source: remocn — https://remocn.dev/r/message-bubble.json (registry/remocn-ui/message-bubble/use-message-bubble-transition.ts), MIT License, Copyright (c) 2026 Remocn.
// Full license: docs/licenses/remocn-LICENSE.txt. Saved verbatim via MCP write_component_file; transition hook for "remocn_ui_message_bubble" (driven by ui-timeline.tsx).
// Path aliases @/lib/remocn, @/lib/remocn-ui and @/components/remocn resolve to this folder (render-project/remotion.config.ts + tsconfig paths).
"use client";

import {
  type MessageBubbleState,
  type MessageBubbleStyle,
  messageBubbleStyle,
} from "@/components/remocn/message-bubble";
import { easings, type Step, useStateTransition } from "@/lib/remocn-ui";

export const DEFAULT_DURATION = 14;

export function tweenMessageBubbleStyle(
  a: MessageBubbleStyle,
  b: MessageBubbleStyle,
  t: number,
): MessageBubbleStyle {
  return {
    opacity: a.opacity + (b.opacity - a.opacity) * t,
    translateY: a.translateY + (b.translateY - a.translateY) * t,
    scale: a.scale + (b.scale - a.scale) * t,
  };
}

export interface MessageBubbleTransitionOptions {
  speed?: number;
  defaultDuration?: number;
}

export function useMessageBubbleTransition(
  steps: Step<MessageBubbleState>[],
  opts: MessageBubbleTransitionOptions = {},
): MessageBubbleStyle {
  const { speed = 1, defaultDuration = DEFAULT_DURATION } = opts;
  const { from, to, progress } = useStateTransition(
    steps,
    "hidden",
    speed,
    defaultDuration,
  );
  const t = easings.out(progress);
  return tweenMessageBubbleStyle(
    messageBubbleStyle(from),
    messageBubbleStyle(to),
    t,
  );
}
