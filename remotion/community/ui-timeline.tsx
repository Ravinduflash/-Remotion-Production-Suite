// Authored for this project (not a remocn file): timeline wrappers around the verbatim remocn-ui state atoms
// (accordion, alert-dialog, blur-in, button). State atoms never read the frame, so each wrapper takes a JSON `steps`
// array and resolves it with useCurrentState (smooth=false, snap) or the atom's own use<Name>Transition hook (smooth).
// `mode: "dark"` passes the full dark palette as the theme override: the atoms call useRemocnTheme(override, "light"),
// so a plain mode would only reach the hook's colours and leave the atom's borders and text light.
import type { ReactNode } from "react";
import { type RemocnTheme, type Step, defaultDarkTheme, useCurrentState } from "./remocn-ui";
import { Accordion, type AccordionState } from "./accordion";
import { useAccordionTransition } from "./use-accordion-transition";
import { AlertDialog, type AlertDialogState } from "./alert-dialog";
import { useAlertDialogTransition } from "./use-alert-dialog-transition";
import { BlurIn, type BlurInDirection, type BlurInState } from "./blur-in";
import { useBlurInTransition } from "./use-blur-in-transition";
import { Button, type ButtonState } from "./button";
import { useButtonTransition } from "./use-button-transition";

type Mode = "light" | "dark";
interface Timed<S extends string> { steps?: Step<S>[]; smooth?: boolean; speed?: number }
interface Themed { mode?: Mode; theme?: Partial<RemocnTheme> }

const stepsOf = <S extends string>(s: unknown): Step<S>[] =>
  Array.isArray(s) ? (s.filter((x) => x && typeof x.at === "number" && typeof x.state === "string") as Step<S>[]) : [];
const themeFor = (mode: Mode | undefined, theme: Partial<RemocnTheme> | undefined): Partial<RemocnTheme> =>
  mode === "dark" ? { ...defaultDarkTheme, ...theme } : { ...theme };

export function AccordionTimeline({ steps, smooth = true, speed = 1, mode, theme, variant = "default", ...rest }: Timed<AccordionState> & Themed & {
  title?: string; content?: string; contentHeight?: number; variant?: "default" | "ghost"; className?: string;
}) {
  const s = stepsOf<AccordionState>(steps), th = themeFor(mode, theme);
  const snap = useCurrentState(s, "closed", speed);
  const style = useAccordionTransition(s, { variant, theme: th, mode, speed });
  return <Accordion {...rest} variant={variant} theme={th} state={snap} style={smooth ? style : undefined} />;
}

export function AlertDialogTimeline({ steps, smooth = true, speed = 1, mode, theme, ...rest }: Timed<AlertDialogState> & Themed & {
  title?: string; description?: string; actionLabel?: string; cancelLabel?: string; className?: string;
}) {
  const s = stepsOf<AlertDialogState>(steps), th = themeFor(mode, theme);
  const snap = useCurrentState(s, "closed", speed);
  const style = useAlertDialogTransition(s, { theme: th, mode, speed });
  return <AlertDialog {...rest} theme={th} state={snap} style={smooth ? style : undefined} />;
}

export function ButtonTimeline({ steps, smooth = true, speed = 1, mode, theme, primary, variant = "default", ...rest }: Timed<ButtonState> & Themed & {
  label?: string; variant?: "default" | "secondary" | "destructive" | "outline" | "ghost"; size?: "sm" | "default" | "lg";
  primary?: string; align?: "start" | "center" | "end"; className?: string;
}) {
  const s = stepsOf<ButtonState>(steps), th = themeFor(mode, theme), p = primary || undefined;
  const snap = useCurrentState(s, "idle", speed);
  const style = useButtonTransition(s, { variant, theme: th, mode, primary: p, speed });
  return <Button {...rest} variant={variant} theme={th} primary={p} speed={speed} state={snap} style={smooth ? style : undefined} />;
}

/** Wraps studio layers (children arrive as one full-frame canvas); the block wrapper keeps them at the frame origin. */
export function BlurInTimeline({ steps, smooth = true, speed = 1, blur = 8, direction = "up", distance = 12, children }: Timed<BlurInState> & {
  blur?: number; direction?: BlurInDirection; distance?: number; children?: ReactNode;
}) {
  const s = stepsOf<BlurInState>(steps);
  const snap = useCurrentState(s, "hidden", speed);
  const style = useBlurInTransition(s, { blur, direction, distance, speed });
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <BlurIn state={snap} style={smooth ? style : undefined} blur={blur} direction={direction} distance={distance} display="block">
        {children}
      </BlurIn>
    </div>
  );
}
