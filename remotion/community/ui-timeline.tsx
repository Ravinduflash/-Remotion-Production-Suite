// Authored for this project (not a remocn file): timeline wrappers around the verbatim remocn-ui state atoms
// (accordion, alert-dialog, blur-in, button, checkbox, dialog, drawer, context-menu, combobox, command-menu) and the cursor. State atoms never read the frame, so each wrapper takes a JSON `steps`
// array and resolves it with useCurrentState (smooth=false, snap) or the atom's own use<Name>Transition hook (smooth).
// `mode: "dark"` passes the full dark palette as the theme override: the atoms call useRemocnTheme(override, "light"),
// so a plain mode would only reach the hook's colours and leave the atom's borders and text light.
import type { ReactNode } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { type RemocnTheme, type Step, clamp01, defaultDarkTheme, easings, revealCount, useCurrentState, useRemocnTheme } from "./remocn-ui";
import { Accordion, type AccordionState } from "./accordion";
import { useAccordionTransition } from "./use-accordion-transition";
import { AlertDialog, type AlertDialogState } from "./alert-dialog";
import { useAlertDialogTransition } from "./use-alert-dialog-transition";
import { BlurIn, type BlurInDirection, type BlurInState } from "./blur-in";
import { useBlurInTransition } from "./use-blur-in-transition";
import { Button, type ButtonState } from "./button";
import { useButtonTransition } from "./use-button-transition";
import { Checkbox, type CheckboxState } from "./checkbox";
import { useCheckboxTransition } from "./use-checkbox-transition";
import { Dialog, type DialogState } from "./dialog";
import { useDialogTransition } from "./use-dialog-transition";
import { Drawer, type DrawerState } from "./drawer";
import { useDrawerTransition } from "./use-drawer-transition";
import { ContextMenu, type ContextMenuState } from "./context-menu";
import { useContextMenuTransition } from "./use-context-menu-transition";
import { Combobox, type ComboboxState, filterComboboxItems } from "./combobox";
import { useComboboxTransition } from "./use-combobox-transition";
import { CommandMenu, type CommandMenuEntry, type CommandMenuState, filterCommandItems } from "./command-menu";
import { useCommandMenuTransition } from "./use-command-menu-transition";
import { type DropdownMenuItemState, dropdownMenuItemStyle, dropdownMenuItemStyleContext } from "./dropdown-menu-item";
import { tweenDropdownMenuItemStyle } from "./use-dropdown-menu-item-transition";
import { type SelectItemState, selectItemStyle, selectItemStyleContext } from "./select-item";
import { tweenSelectItemStyle } from "./use-select-item-transition";
import { type CommandMenuItemState, commandMenuItemStyle, commandMenuItemStyleContext } from "./command-menu-item";
import { tweenCommandMenuItemStyle } from "./use-command-menu-item-transition";
import { Cursor, type CursorVariant } from "./cursor";
import { type CursorWaypoint, useCursorPath } from "./use-cursor-path";

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

export function CheckboxTimeline({ steps, smooth = true, speed = 1, mode, theme, primary, label, ...rest }: Timed<CheckboxState> & Themed & {
  label?: string; size?: "sm" | "default" | "lg"; primary?: string; align?: "start" | "center" | "end"; className?: string;
}) {
  const s = stepsOf<CheckboxState>(steps), th = themeFor(mode, theme), p = primary || undefined;
  const snap = useCurrentState(s, "unchecked", speed);
  const style = useCheckboxTransition(s, { theme: th, mode, primary: p, speed });
  return <Checkbox {...rest} label={label || undefined} theme={th} primary={p} state={snap} style={smooth ? style : undefined} />;
}

type ModalText = { title?: string; description?: string; actionLabel?: string; cancelLabel?: string; className?: string };
export function DialogTimeline({ steps, smooth = true, speed = 1, mode, theme, ...rest }: Timed<DialogState> & Themed & ModalText) {
  const s = stepsOf<DialogState>(steps), th = themeFor(mode, theme);
  const snap = useCurrentState(s, "closed", speed);
  const style = useDialogTransition(s, { theme: th, mode, speed });
  return <Dialog {...rest} theme={th} state={snap} style={smooth ? style : undefined} />;
}

export function DrawerTimeline({ steps, smooth = true, speed = 1, mode, theme, ...rest }: Timed<DrawerState> & Themed & ModalText) {
  const s = stepsOf<DrawerState>(steps), th = themeFor(mode, theme);
  const snap = useCurrentState(s, "closed", speed);
  const style = useDrawerTransition(s, { theme: th, mode, speed });
  return <Drawer {...rest} theme={th} state={snap} style={smooth ? style : undefined} />;
}

/** One scripted row step: `index` counts rows of the (filtered) list. */
export interface RowStep { at: number; index: number; state: string; duration?: number }
/** Pure twin of useStateTransition (same ordering and ties), so any number of rows resolve without hooks in a loop. */
function transitionAt<S extends string>(steps: Step<S>[], def: S, frame: number, dur: number) {
  const started = steps.map((step, i) => ({ step, i })).sort((a, b) => a.step.at - b.step.at || a.i - b.i).filter((e) => e.step.at <= frame);
  if (!started.length) return { from: def, to: def, progress: 1 };
  const to = started[started.length - 1].step, from = started.length > 1 ? started[started.length - 2].step.state : def, d = to.duration ?? dur;
  return { from, to: to.state, progress: d > 0 ? clamp01((frame - to.at) / d) : 1 };
}
function useRowStyles<S extends string, V>(rowSteps: unknown, rows: number, def: S, speed: number, smooth: boolean,
  style: (s: S) => V, tween: (a: V, b: V, t: number) => V, dur = 8): (V | undefined)[] | undefined {
  const frame = useCurrentFrame() * speed;
  const all = Array.isArray(rowSteps) ? (rowSteps as RowStep[]).filter((r) => r && typeof r.at === "number" && typeof r.index === "number" && typeof r.state === "string") : [];
  if (!all.length) return undefined;
  const out: (V | undefined)[] = [];
  for (let i = 0; i < rows; i++) {
    const mine = all.filter((r) => r.index === i).map((r) => ({ at: r.at, state: r.state as S, duration: r.duration }));
    if (!mine.length) { out.push(undefined); continue; }
    const { from, to, progress } = transitionAt(mine, def, frame, dur);
    out.push(tween(style(from), style(to), smooth ? easings.out(progress) : 1));
  }
  return out;
}
/** Characters of `query` shown at this frame: typed at `cps` from layer frame `typeStart`; a negative typeStart shows it all at once. */
function useTyped(query: string, typeStart: number, cps: number, speed: number): number | undefined {
  const frame = useCurrentFrame() * speed, { fps } = useVideoConfig();
  if (typeStart < 0) return undefined;
  return revealCount(Math.max(0, frame - typeStart), fps, query.length, cps);
}

export function ContextMenuTimeline({ steps, smooth = true, speed = 1, mode, theme, rowSteps, items, ...rest }: Timed<ContextMenuState> & Themed & {
  items?: string[]; highlightedIndex?: number; pressedIndex?: number; rowSteps?: RowStep[]; className?: string;
}) {
  const s = stepsOf<ContextMenuState>(steps), th = themeFor(mode, theme), rt = useRemocnTheme(th, mode);
  const list = Array.isArray(items) && items.length ? items : undefined, ctx = dropdownMenuItemStyleContext(rt);
  const snap = useCurrentState(s, "closed", speed);
  const style = useContextMenuTransition(s, { theme: th, mode, speed });
  const itemStyles = useRowStyles<DropdownMenuItemState, ReturnType<typeof dropdownMenuItemStyle>>(rowSteps, (list || ["", "", "", ""]).length, "idle", speed, smooth,
    (st) => dropdownMenuItemStyle(st, ctx), tweenDropdownMenuItemStyle);
  return <ContextMenu {...rest} items={list} itemStyles={itemStyles} theme={th} state={snap} style={smooth ? style : undefined} />;
}

export function ComboboxTimeline({ steps, smooth = true, speed = 1, mode, theme, rowSteps, items, query = "", typeStart = 32, cps = 4, ...rest }: Timed<ComboboxState> & Themed & {
  query?: string; typeStart?: number; cps?: number; placeholder?: string; items?: string[];
  selectedIndex?: number; highlightedIndex?: number; pressedIndex?: number; rowSteps?: RowStep[]; className?: string;
}) {
  const s = stepsOf<ComboboxState>(steps), th = themeFor(mode, theme), rt = useRemocnTheme(th, mode);
  const list = Array.isArray(items) && items.length ? items : undefined, ctx = selectItemStyleContext(rt);
  const count = useTyped(query, typeStart, cps, speed);
  const snap = useCurrentState(s, "closed", speed);
  const style = useComboboxTransition(s, { theme: th, mode, speed });
  const rows = filterComboboxItems(list || ["Apple", "Banana", "Orange", "Grape"], query, count).length;
  const itemStyles = useRowStyles<SelectItemState, ReturnType<typeof selectItemStyle>>(rowSteps, rows, "idle", speed, smooth,
    (st) => selectItemStyle(st, ctx), tweenSelectItemStyle);
  return <Combobox {...rest} items={list} query={query} revealCount={count} itemStyles={itemStyles} theme={th} state={snap} style={smooth ? style : undefined} />;
}

export function CommandMenuTimeline({ steps, smooth = true, speed = 1, mode, theme, rowSteps, items, query = "", typeStart = 20, cps = 4, ...rest }: Timed<CommandMenuState> & Themed & {
  query?: string; typeStart?: number; cps?: number; items?: CommandMenuEntry[];
  selectedIndex?: number; highlightedIndex?: number; pressedIndex?: number; rowSteps?: RowStep[]; className?: string;
}) {
  const s = stepsOf<CommandMenuState>(steps), th = themeFor(mode, theme), rt = useRemocnTheme(th, mode);
  const list = Array.isArray(items) && items.length ? items.filter((e) => e && typeof e.label === "string") : undefined, ctx = commandMenuItemStyleContext(rt);
  const count = useTyped(query, typeStart, cps, speed);
  const snap = useCurrentState(s, "closed", speed);
  const style = useCommandMenuTransition(s, { theme: th, mode, speed });
  const rows = list ? filterCommandItems(list, query, count).length : 4;
  const itemStyles = useRowStyles<CommandMenuItemState, ReturnType<typeof commandMenuItemStyle>>(rowSteps, rows, "idle", speed, smooth,
    (st) => commandMenuItemStyle(st, ctx), tweenCommandMenuItemStyle);
  return <CommandMenu {...rest} items={list} query={query} revealCount={count} itemStyles={itemStyles} theme={th} state={snap} style={smooth ? style : undefined} />;
}

/** The cursor tip follows `path` waypoints (layer pixels, arrival frames); `click` fires the ripple and press dip. */
export function CursorTimeline({ path, speed = 1, mode, theme, variant = "arrow", size = 28, rippleColor, className }: Themed & {
  path?: CursorWaypoint[]; speed?: number; variant?: CursorVariant; size?: number; rippleColor?: string; className?: string;
}) {
  const wp = Array.isArray(path) ? path.filter((w) => w && typeof w.at === "number" && typeof w.x === "number" && typeof w.y === "number") : [];
  const style = useCursorPath(wp, { speed });
  return <Cursor style={style} variant={variant} size={size} rippleColor={rippleColor || undefined} theme={themeFor(mode, theme)} className={className} />;
}
