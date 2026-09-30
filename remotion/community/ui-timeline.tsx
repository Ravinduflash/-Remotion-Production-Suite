// Authored for this project (not a remocn file): timeline wrappers around the verbatim remocn-ui state atoms
// (accordion, alert-dialog, blur-in, button, checkbox, dialog, drawer, sheet, context-menu, dropdown-menu, combobox, command-menu,
// input, message-bubble, popover, radio, skeleton), the field layout family, the skeleton-block shimmer, and the value-channel
// cursor, progress bar and slider. State atoms never read the frame, so each wrapper takes a JSON `steps`
// array and resolves it with useCurrentState (smooth=false, snap) or the atom's own use<Name>Transition hook (smooth).
// `mode: "dark"` passes the full dark palette as the theme override: the atoms call useRemocnTheme(override, "light"),
// so a plain mode would only reach the hook's colours and leave the atom's borders and text light.
import type { ReactNode } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { type RemocnTheme, RemocnUIProvider, type Step, clamp01, defaultDarkTheme, easings, revealCount, useCurrentState, useRemocnTheme } from "./remocn-ui";
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
import { Sheet, type SheetState } from "./sheet";
import { useSheetTransition } from "./use-sheet-transition";
import { DropdownMenu, type DropdownMenuState } from "./dropdown-menu";
import { useDropdownMenuTransition } from "./use-dropdown-menu-transition";
import { Field, FieldControl, FieldDescription, FieldGroup, FieldLabel } from "./field";
import { Input, type InputState, inputStyle, inputStyleContext } from "./input";
import { tweenInputStyle, useInputTransition } from "./use-input-transition";
import { MessageBubble, type MessageBubbleState, messageBubbleReactionStyle } from "./message-bubble";
import { useMessageBubbleTransition } from "./use-message-bubble-transition";
import { Popover, type PopoverSide, type PopoverState } from "./popover";
import { usePopoverTransition } from "./use-popover-transition";
import { Progress } from "./progress";
import { type ProgressStep, useProgressTransition } from "./use-progress-transition";
import { Radio, type RadioState } from "./radio";
import { useRadioTransition } from "./use-radio-transition";
import { Skeleton, type SkeletonLayout, type SkeletonState } from "./skeleton";
import { useSkeletonTransition } from "./use-skeleton-transition";
import { SkeletonBlock } from "./skeleton-block";
import { Slider, type SliderThumbState } from "./slider";
import { type SliderStep, useSliderTransition } from "./use-slider-transition";

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

export function SheetTimeline({ steps, smooth = true, speed = 1, mode, theme, ...rest }: Timed<SheetState> & Themed & ModalText) {
  const s = stepsOf<SheetState>(steps), th = themeFor(mode, theme);
  const snap = useCurrentState(s, "closed", speed);
  const style = useSheetTransition(s, { theme: th, mode, speed });
  return <Sheet {...rest} theme={th} state={snap} style={smooth ? style : undefined} />;
}

/** `triggerSteps` script the outline trigger (a Button timeline: idle | hover | press); rows take `rowSteps` like ContextMenu. */
export function DropdownMenuTimeline({ steps, smooth = true, speed = 1, mode, theme, rowSteps, triggerSteps, items, ...rest }: Timed<DropdownMenuState> & Themed & {
  label?: string; items?: string[]; highlightedIndex?: number; pressedIndex?: number; rowSteps?: RowStep[]; triggerSteps?: Step<ButtonState>[]; className?: string;
}) {
  const s = stepsOf<DropdownMenuState>(steps), th = themeFor(mode, theme), rt = useRemocnTheme(th, mode);
  const list = Array.isArray(items) && items.length ? items : undefined, ctx = dropdownMenuItemStyleContext(rt), ts = stepsOf<ButtonState>(triggerSteps);
  const snap = useCurrentState(s, "closed", speed);
  const style = useDropdownMenuTransition(s, { theme: th, mode, speed });
  const trigger = useButtonTransition(ts, { variant: "outline", theme: th, mode, speed, defaultDuration: smooth ? undefined : 0 });
  const itemStyles = useRowStyles<DropdownMenuItemState, ReturnType<typeof dropdownMenuItemStyle>>(rowSteps, (list || ["", "", "", ""]).length, "idle", speed, smooth,
    (st) => dropdownMenuItemStyle(st, ctx), tweenDropdownMenuItemStyle);
  return <DropdownMenu {...rest} items={list} itemStyles={itemStyles} triggerStyle={ts.length ? trigger : undefined} theme={th} state={snap} style={smooth ? style : undefined} />;
}

export function InputTimeline({ steps, smooth = true, speed = 1, mode, theme, primary, ...rest }: Timed<InputState> & Themed & {
  placeholder?: string; value?: string; size?: "sm" | "default" | "lg"; primary?: string; className?: string;
}) {
  const s = stepsOf<InputState>(steps), th = themeFor(mode, theme), p = primary || undefined;
  const snap = useCurrentState(s, "idle", speed);
  const style = useInputTransition(s, { theme: th, mode, primary: p, speed });
  return <Input {...rest} theme={th} primary={p} state={snap} style={smooth ? style : undefined} />;
}

/** One labelled form row: its Input runs its own `steps` (idle | hover | active | typing | blur | invalid). */
export interface FieldSpec { label?: string; placeholder?: string; value?: string; description?: string; steps?: Step<InputState>[] }
const FIELD_HEIGHT = { sm: 36, default: 40, lg: 48 } as const;
/** A FieldGroup column filling the layer box: label ▸ Input (in a FieldControl slot) ▸ description, per entry of `fields`. */
export function FieldTimeline({ fields, gap = 16, fieldGap = 6, size = "default", smooth = true, speed = 1, mode, theme, primary }: Themed & {
  fields?: FieldSpec[]; gap?: number; fieldGap?: number; size?: "sm" | "default" | "lg"; smooth?: boolean; speed?: number; primary?: string;
}) {
  const th = themeFor(mode, theme), rt = useRemocnTheme({ ...th, ...(primary ? { primary } : {}) }, mode), ctx = inputStyleContext(rt);
  const frame = useCurrentFrame() * speed;
  const list = Array.isArray(fields) ? fields.filter((f) => f && typeof f === "object") : [];
  return (
    <div style={{ position: "absolute", inset: 0, fontFamily: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <FieldGroup gap={gap}>
        {list.map((f, i) => {
          const { from, to, progress } = transitionAt(stepsOf<InputState>(f.steps), "idle", frame, 8);
          const style = tweenInputStyle(inputStyle(from, ctx), inputStyle(to, ctx), smooth ? easings.out(progress) : 1);
          return (
            <Field key={i} gap={fieldGap}>
              {f.label ? <FieldLabel theme={th}>{f.label}</FieldLabel> : null}
              <FieldControl height={FIELD_HEIGHT[size] ?? 40}>
                <Input fullWidth size={size} theme={th} primary={primary || undefined} placeholder={f.placeholder} value={f.value} style={style} />
              </FieldControl>
              {f.description ? <FieldDescription theme={th}>{f.description}</FieldDescription> : null}
            </Field>
          );
        })}
      </FieldGroup>
    </div>
  );
}

/** The bubble fills the layer box width (incoming aligns left, outgoing right); `reactionSteps` pop the emoji badge separately. */
export function MessageBubbleTimeline({ steps, smooth = true, speed = 1, mode, theme, text, variant = "incoming", reaction, reactionSteps, maxWidth }: Timed<MessageBubbleState> & Themed & {
  text?: string; variant?: "incoming" | "outgoing"; reaction?: string; reactionSteps?: Step<MessageBubbleState>[]; maxWidth?: number;
}) {
  const s = stepsOf<MessageBubbleState>(steps), rs = stepsOf<MessageBubbleState>(reactionSteps), th = themeFor(mode, theme);
  const frame = useCurrentFrame() * speed;
  const snap = useCurrentState(s, "hidden", speed);
  const style = useMessageBubbleTransition(s, { speed });
  const r = transitionAt(rs, "hidden", frame, 10), a = messageBubbleReactionStyle(r.from), b = messageBubbleReactionStyle(r.to), k = smooth ? easings.out(r.progress) : 1;
  const reactionStyle = rs.length ? { opacity: a.opacity + (b.opacity - a.opacity) * k, scale: a.scale + (b.scale - a.scale) * k } : undefined;
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <MessageBubble variant={variant} reaction={reaction || undefined} reactionStyle={reactionStyle} maxWidth={maxWidth && maxWidth > 0 ? maxWidth : undefined}
        theme={th} state={snap} style={smooth ? style : undefined}>{text}</MessageBubble>
    </div>
  );
}

/** The card's top-left sits at the layer box top-left; `width` is the card width (sizeMode props). */
export function PopoverTimeline({ steps, smooth = true, speed = 1, mode, theme, title, description, side = "bottom", width = 288 }: Timed<PopoverState> & Themed & {
  title?: string; description?: string; side?: PopoverSide; width?: number; height?: number;
}) {
  const s = stepsOf<PopoverState>(steps), th = themeFor(mode, theme);
  const snap = useCurrentState(s, "closed", speed);
  const style = usePopoverTransition(s, { speed });
  return <Popover title={title || undefined} description={description || undefined} side={side} width={width} theme={th} state={snap} style={smooth ? style : undefined} />;
}

/** Value channel: `valueSteps` [{at (arrival frame), value 0–100, duration?, easing?}]; the track is `width` wide (sizeMode props). */
export function ProgressTimeline({ valueSteps, value = 0, speed = 1, mode, theme, primary, width = 320, showLabel = true }: Themed & {
  valueSteps?: ProgressStep[]; value?: number; speed?: number; primary?: string; width?: number; height?: number; showLabel?: boolean;
}) {
  const vs = Array.isArray(valueSteps) ? valueSteps.filter((v) => v && typeof v.at === "number" && typeof v.value === "number") : [];
  const style = useProgressTransition(vs, { speed });
  const th = { ...themeFor(mode, theme), ...(primary ? { primary } : {}) };
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
      <Progress value={value} style={vs.length ? style : undefined} width={width} showLabel={showLabel} theme={th} />
    </div>
  );
}

export function RadioTimeline({ steps, smooth = true, speed = 1, mode, theme, primary, label, ...rest }: Timed<RadioState> & Themed & {
  label?: string; size?: "sm" | "default" | "lg"; primary?: string; className?: string;
}) {
  const s = stepsOf<RadioState>(steps), th = themeFor(mode, theme), p = primary || undefined;
  const snap = useCurrentState(s, "unchecked", speed);
  const style = useRadioTransition(s, { theme: th, mode, primary: p, speed });
  return <Radio {...rest} label={label || undefined} theme={th} primary={p} state={snap} style={smooth ? style : undefined} />;
}

/** WRAPPER: the wrapped layers are the real content (children fit "box", so they keep their place and size) and fade in over
 *  the shimmer placeholder drawn at the box top-left. The provider hands the mode to SkeletonBlock, which reads only context. */
export function SkeletonTimeline({ steps, smooth = true, speed = 1, mode, theme, layout = "lines", shimmerSpeed = 1, width = 320, height = 80, children }: Timed<SkeletonState> & Themed & {
  layout?: SkeletonLayout; shimmerSpeed?: number; width?: number; height?: number; children?: ReactNode;
}) {
  const s = stepsOf<SkeletonState>(steps), th = themeFor(mode, theme);
  const snap = useCurrentState(s, "loading", speed);
  const style = useSkeletonTransition(s, { speed });
  return (
    <RemocnUIProvider mode={mode} theme={th}>
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        <Skeleton layout={layout} speed={shimmerSpeed} theme={th} state={snap} style={smooth ? style : undefined}>
          <div style={{ position: "relative", width, height }}>{children}</div>
        </Skeleton>
      </div>
    </RemocnUIProvider>
  );
}

/** One always-shimmering block; the layer box is the block (sizeMode props). */
export function SkeletonBlockTimeline({ mode, theme, width = 120, height = 16, radius = 6, speed = 1, baseColor, highlightColor }: Themed & {
  width?: number; height?: number; radius?: number; speed?: number; baseColor?: string; highlightColor?: string;
}) {
  return (
    <RemocnUIProvider mode={mode} theme={themeFor(mode, theme)}>
      <SkeletonBlock width={width} height={height} radius={radius} speed={speed} baseColor={baseColor || undefined} highlightColor={highlightColor || undefined} />
    </RemocnUIProvider>
  );
}

/** Dual value channel: `sliderSteps` [{at (arrival), value?, thumbState?: idle|hover|press, duration?, easing?}]; box width = track (sizeMode props). */
export function SliderTimeline({ sliderSteps, value = 0, thumbState = "idle", speed = 1, mode, theme, primary, width = 320, showValue = true }: Themed & {
  sliderSteps?: SliderStep[]; value?: number; thumbState?: SliderThumbState; speed?: number; primary?: string; width?: number; height?: number; showValue?: boolean;
}) {
  const ss = Array.isArray(sliderSteps) ? sliderSteps.filter((v) => v && typeof v.at === "number") : [];
  const style = useSliderTransition(ss, { speed });
  const th = { ...themeFor(mode, theme), ...(primary ? { primary } : {}) };
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
      <Slider value={value} thumbState={thumbState} style={ss.length ? style : undefined} width={width} showValue={showValue} theme={th} />
    </div>
  );
}
