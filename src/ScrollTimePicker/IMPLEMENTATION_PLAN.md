# ScrollTimePicker — Implementation Plan & TDD Guide

> **This document is the single source of truth for building `ScrollTimePicker`.** It is written to survive frequent context clears: it embeds the repo conventions, exact file paths, theme tokens, and test setup needed to execute without re-exploring. Work top-to-bottom; keep the **Checklist** at the bottom updated as you go.

---

## 1. Context / why

`tmp/__bad__/time_picker.js` is the *popup* half of Chrome's native `<input type="time">`: an iOS-style **scroll-wheel / spinner** picker (custom elements, infinitely-looping hour/minute/…columns). The editable `HH:MM` field beside it is the browser's native segmented control, not in that file. We are bringing **both halves** into `@nulogy/components` as one React + styled-components component: a **free-type masked input** plus a **scroll-wheel panel**.

It is **purposely different** from the two existing time components:
- `src/TimePicker/` — a text input + dropdown **list** of discrete interval options.
- `src/TimeRange/` — composes two `TimePicker`s.

The distinguishing trait here is **spinnable columns** (not an option list) driven by, and kept in sync with, a typed masked input. Outcome: a new `ScrollTimePicker` that matches NDS theme/conventions, is keyboard/ARIA accessible, supports UTC, and is built test-first.

### Locked-in decisions (from clarifying Q&A with the user)
- **Name:** `ScrollTimePicker`. **Value out** (`onChange`) is always a 24-hour string (`"HH:mm"`, or `"HH:mm:ss"` with seconds).
- **Value in** (`value`/`defaultValue`) accepts a **string OR a `Date`** (string primary; `Date`/ISO converted via the timezone setting).
- **UTC:** a **`utc` boolean** prop. When `true`, the "current time" default and any `Date`↔time conversions use **UTC**; otherwise **local**.
- **Format:** **24-hour only** — hour (00–23) + minute (00–59) columns. No AM/PM, no 12-hour mode.
- **Two mutually-exclusive modes:**
  - **Type mode** — the input is an **editable masked field** (colon always shown), panel **closed**. User types a time.
  - **Panel mode** — the wheel panel is **open**, the input is **read-only**, dials are interactive.
- **Opener:** the **trailing clock icon** (`queryBuilder`) opens the panel (also `ArrowDown` while the field is focused). Clicking *into the field* = type mode. Selecting / Enter / Escape / outside-click closes the panel back to type mode. Mirrors native Chrome.
- **Masked input:** the `:` separator(s) are **always present** — `--:--` (and `--:--:--` when `showSeconds`); empty slots show `-`.
- **Open = parse + normalize:** opening the panel parses the current (possibly partial) input to the **nearest acceptable value** (e.g. `-9:--` → `09:00`), writes it back into the field, and seeds the dials. Empty input → dials seed to the **current time** (UTC-aware); field stays empty until the user commits.
- **Commit on blur/Enter:** typed text is free-form while typing; parsed/committed on **blur or Enter** (opening the panel blurs the field, so it commits+parses there too). `onInputChange` fires per keystroke; `onChange` fires the normalized value on commit and on dial interactions.
- **Scroll:** **bounded** columns with CSS scroll-snap; **arrow keys wrap** (23→00, 59→00). No infinite DOM-cell rotation.

### Scope assumptions (flag if wrong)
- `showSeconds` (default **false**) adds an optional seconds column + `:ss`.
- **Minutes are always 00–59, step 1** (faithful to the Chrome reference). **No `interval` prop** — that concept came from the other NDS `TimePicker` and was explicitly dropped.
- **No `minTime`/`maxTime`** in v1 (cross-column clamping deferred).
- `onChange` **emits a string only** (never a `Date`).
- Per-keystroke masking micro-UX (tens-vs-ones auto-advance) is an implementation detail; the **tested contract** is the parse-on-commit result.

---

## 2. Embedded repo conventions (so no re-exploration is needed)

### 2.1 Commands
```bash
pnpm start                 # Storybook @ localhost:9999
pnpm test                  # test:components && test:storybook (pre-push hook runs `pnpm check && pnpm test`)
pnpm test:components        # Vitest unit specs (jsdom).  Single file: pnpm test:components -- src/ScrollTimePicker/ScrollTimePicker.utils.spec.ts
pnpm test:storybook         # play() functions in real Chromium (Vitest browser + Playwright)
pnpm check                 # types + lint + format validation
pnpm fix                   # auto-fix lint/format
```
- Vitest unit config: `vite.config.ts` (`environment: jsdom`, `globals: false` → **must import `describe/it/expect` from `"vitest"`**, `include: **/*.spec.ts(x)`).
- Storybook browser config: `vitest.storybook.config.ts` (Playwright Chromium, headless). Setup `.storybook/vitest.setup.ts` applies `setProjectAnnotations([preview])` **and** `MotionGlobalConfig.skipAnimations = true` (framer-motion animations off in tests).
- Storybook glob: `../src/**/*.story.@(jsx|tsx)` (`.storybook/main.ts`). Chromatic via `.github/workflows/chromatic.yml` (`chromaui/action`), `chromatic: { disableSnapshot: true }` globally in `preview.tsx` (snapshots managed).

### 2.2 Theme tokens (available in `styled(...)` via `({ theme }) => ...`; typed by `src/styled.d.ts`)
Source: `src/theme/theme.ts` (maps `@nulogy/tokens`). Default desktop theme = `legacy`. Concrete `legacy` values:
- **colors:** `black #011E38`, `blackBlue #122B47`, `darkBlue #00438F`, `blue #216BEB`, `lightBlue #E1EBFA`, `darkGrey #434D59`, `midGrey #6C7784`, `grey #C0C8D1`, `lightGrey #E4E7EB`, `whiteGrey #F0F2F5`, `white #FFFFFF`, `red #CC1439`, `lightRed #FAE6EA`, `green #008059`, `yellow #FFBB00`.
- **space / sizes** (`x1 = 8px`): `x0_25 2`, `half/x0_5 4`, `x0_75 6`, `x1 8`, `x1_25 10`, `x1_5 12`, `x1_75 14`, `x2 16`, `x2_5 20`, `x3 24`, `x4 32`, `x5 40`, `x6 48`, `x7 56`, `x8 64` (px).
- **fontSizes** (legacy px): `smaller/xxs/xs 12`, `small/sm 14`, `medium/md/base 16`, `heading4 18`, `large/lg 24`, `larger/xl 30`, `largest/xxl 32`.
- **lineHeights:** `base 1.5`, `baseRelaxed 1.75`, `smallTextBase 1.714`, `smallTextCompressed 1.143`, `heading1 1.25`.
- **fontWeights:** `light 300`, `normal 400`, `medium 500`, `bold 600`.
- **radii:** `small 2px`, `medium 4px`, `large 8px`, `circle 50%`, `rounded 9999px`.
- **shadows:** `small`, `medium`, `large`, `focus "0px 0px 5px 0px rgba(33,107,235,.9)"` (blue glow), `error "0px 0px 5px 0px rgba(204,20,57,.9)"`.
- **zIndices:** `content 100`, `overlay 1000` (panel should sit above content; `FloatingPortal` + a high zIndex).

### 2.3 Styling conventions
- Primitive `Box = styled.div(addStyledProps)` (`src/Box/Box.tsx`); `Flex` adds `display:flex` + `gap` (`src/Flex/Flex.tsx`). `addStyledProps`/`StyledProps` in `src/StyledProps/index.ts`.
- Composition order inside `styled(...)`: base `({theme}) => ({...})` object **first**, then `variant(...)`, then state fns, then the styled-system utility (`space`/`addStyledProps`) **last** so instance props win.
- **Focus ring:** `outline: "none"` + `boxShadow: theme.shadows.focus`; focused input border → `theme.colors.blue`. Error border → `theme.colors.red`.
- **Hover/selected:** hover bg `lightBlue`, selected text/bg `darkBlue` (or `fontWeights.medium`). Disabled: `midGrey` text, `lightGrey` border, `whiteGrey` bg. Placeholder/secondary text `midGrey`.
- **Context-aware `variant`** (auto-injects the current component variant) is exported from `src/StyledProps` — use it for a `touch` variant (larger cell height/font). `subPx(base)` (`src/utils/subPx.ts`) = `calc(base - 1px)` for 1px-border compensation.

### 2.4 Building-block components (import from these paths; re-exported by `src/index.ts`)
- `Box`, `Flex` — layout primitives.
- `Icon` / `InputIcon` (`src/Icon`) — icons from `@nulogy/icons`; clock icon name is `"queryBuilder"`.
- `IconicButton` (`src/Button`) — **use for the clickable trailing clock button** (real `<button>` + focus ring + `aria-label`). Confirm exact export/props at impl time.
- `InputField` (`src/Input/InputField.tsx`) — supports `labelText`, `placeholder`, `iconRight`, `iconRightSize`, `error`, `variant`, `inputWidth`, `disabled`, `aria-label`, `data-testid`, `ref`. Note: `iconRight` is **decorative** — for a *clickable* opener render our own trailing `IconicButton` positioned over the field's right edge.
- `Input` (`src/Input/Input.tsx`) — bundles `Field` + `InputField` + `InlineValidation`, forwards `ref` to `<input>`.
- `Field`/`FieldLabel` (`src/Form`, `src/FieldLabel`), `InlineValidation` (`src/Validation`, props `errorMessage`/`errorList`, renders red `Flex` w/ error icon, `null` when no errors), `Text` (`src/Type`).

### 2.5 Floating panel — `@floating-ui/react` (^0.27), mirror `src/Popper/Popper.tsx`
```ts
const { refs, floatingStyles, context, isPositioned } = useFloating({
  open, onOpenChange: setOpen, placement: "bottom-start",
  middleware: [offset(4), flip(), shift({ padding: 8 })],
  whileElementsMounted: autoUpdate,
});
const dismiss = useDismiss(context, { escapeKey: true, outsidePress: true });
const { getReferenceProps, getFloatingProps } = useInteractions([dismiss /*, useClick if desired*/]);
// reference = the input+icon group (refs.setReference); floating = panel in <FloatingPortal> (refs.setFloating, floatingStyles), visibility gated on isPositioned.
```
- `useDismiss` handles Escape + outside-press. The reference (input + icon) is excluded from outside-press, so wire the **clock icon click as an explicit toggle** and (optionally) clicking the read-only field to close.
- Do **NOT** use the deprecated `DetectOutsideClick` or the hand-rolled absolute `TimePickerDropdown`.

### 2.6 Value / ref / keys / i18n / variant
- `forwardRef` + **destructured default params** (NOT `Component.defaultProps`). Controlled/uncontrolled: `displayValue = normalizedValue ?? internalValue`.
- `keyCodes` (`src/constants`): `TAB 9, RETURN 13, ESC 27, SPACE 32, END 35, HOME 36, LEFT 37, UP 38, RIGHT 39, DOWN 40`. In `play()` tests use `userEvent.keyboard("{ArrowUp}"|"{Enter}"|"{Escape}"|"{Home}"|"{End}")`.
- **i18n:** `useTranslation()` + `t("...")`; `keySeparator:false`, namespace `"nds"` (`src/i18n.ts`). Keys are the literal English phrase, stored **lowercased** in the **17** `locales/*.json` files (`en_US.json`, `de_DE.json`, `fr_FR.json`, `ja_JP.json`, `zh_CN.json`, …). Existing reusable key: `"select a time"`. **New keys to add to all 17:** `"Hours"`, `"Minutes"`, `"Seconds"`, `"Open time picker"`.
- **ComponentVariant** (`src/NDSProvider/ComponentVariantContext.tsx`): `"touch" | "desktop"`. `useComponentVariant(variant)` returns the instance override or context value; **throws outside `NDSProvider`**. Size cells/columns larger for `"touch"`.

### 2.7 Registration (two-level barrel)
- `src/ScrollTimePicker/index.ts`: `export { default as ScrollTimePicker } from "./ScrollTimePicker"; export type { ScrollTimePickerProps } from "./ScrollTimePicker";`
- Add one line to `src/index.ts`: `export { ScrollTimePicker, type ScrollTimePickerProps } from "./ScrollTimePicker";`
- `src/index.ts` is the only registry; no separate manifest.

### 2.8 Testing conventions
- **play():** `import { expect, userEvent, within, waitFor, screen, fn } from "storybook/test";` (`action` comes from `"storybook/actions"`). `within(canvasElement)` for in-canvas els; `screen` (or `within(document.body)`) for the **portalled** panel. Wrap sub-assertions in `step("...", async () => {...})`. NDSProvider is **auto-applied** — do NOT wrap. Assert callbacks with a module-scoped `fn()` spy.
- **Vitest spec:** pure utilities only, `import { describe, it, expect } from "vitest";`, colocated `*.spec.ts`. Never render a component here. jsdom cannot lay out → **no scroll/geometry assertions in specs**.
- **Selector priority:** Label → Placeholder → Text → Alt → Title → Role → TestID. Preserve test IDs.
- Reference for `fn()` spies + loop-regression pattern: `src/TimeRange/TimeRange.story.tsx` (`DoesNotLoopWithInlineCallback`).

### 2.9 The reference (`tmp/__bad__/time_picker.js`) — what to keep / drop
- **Keep (reimplement in React):** hour+minute columns, selected-cell centering, keyboard (Up/Down wrap within a column, Left/Right between columns, Home/End → min/max, Enter commit+close, Escape reset/close), click-to-select, live value push on change, seed from current value else current time.
- **Drop:** infinite DOM-cell rotation (`rotateCells_`, `SCROLL_OFFSET`) → replace with bounded scroll-snap + rounding; custom-element registration → use ARIA roles on `Box`/`Flex`; window-popup resizing; milliseconds & AM/PM columns.

---

## 3. File structure — `src/ScrollTimePicker/`

| File | Responsibility |
|---|---|
| `ScrollTimePicker.utils.ts` | Pure, render-free helpers (parse/format/mask/Date-convert/build-options/index math). The Vitest unit surface. |
| `ScrollTimePicker.utils.spec.ts` | Vitest unit tests for every util. Colocated. |
| `ScrollTimePicker.tsx` | Main `forwardRef` component. Owns: `open` mode state, controlled/uncontrolled value + `rawInput` + `draft` index state, masked typing + parse/commit, `useFloating` panel, trigger (`InputField` + trailing clock `IconicButton`) + `InlineValidation`, value composition, `onChange`/`onInputChange`, focus mgmt, i18n, `useComponentVariant`, `utc`/`Date` handling. Exports `ScrollTimePickerProps`. |
| `ScrollColumn.tsx` | Internal one-column subcomponent: `role="listbox"` scroll container w/ top/bottom spacers, cell mapping, scroll-snap CSS, debounced scroll→index detection (+ programmatic-scroll suppression), within-column keyboard (Up/Down wrap, Home/End), `aria-activedescendant`, `scrollTo` on selection/open. Colocates presentational `ScrollCell`. |
| `ScrollTimePicker.story.tsx` | Stories + `play()` interaction tests + visual-only stories for Chromatic. |
| `index.ts` | Barrel re-export (see §2.7). |
| `IMPLEMENTATION_PLAN.md` | This document. |

**Split rationale:** `ScrollColumn` is instantiated 2–3× and carries the stateful wheel behavior; isolating it keeps the parent focused on input↔dials↔value orchestration. The cell stays a colocated styled component; the panel container + center highlight band live in `ScrollTimePicker.tsx`.

---

## 4. Component API

```ts
export interface ScrollTimePickerProps extends SpaceProps {
  value?: string | Date;                 // controlled; "HH:mm[:ss]" (24h) or Date/ISO
  defaultValue?: string | Date;          // uncontrolled seed
  onChange?: (value: string) => void;    // normalized "HH:mm[:ss]" on commit / dial change
  onInputChange?: (raw: string) => void; // raw masked text, per keystroke (type mode)
  utc?: boolean;                         // default false; Date/"now" read in UTC vs local
  showSeconds?: boolean;                 // default false
  disabled?: boolean;                    // default false
  labelText?: string;
  placeholder?: string;                  // default mask "--:--" ("--:--:--" when showSeconds)
  errorMessage?: string;
  errorList?: React.ReactNode;
  "aria-label"?: string;                 // default t("Select a time")
  className?: string;
  variant?: ComponentVariant;            // "touch" | "desktop"
  id?: string;                           // panel id / aria-controls base
  ref?: React.Ref<HTMLInputElement>;     // forwarded to the trigger <input>
}
```

- **Defaults via destructured params.** Extends `SpaceProps` only (spread onto the outer `Box` **last**).
- **Value normalization:** internally everything is a string. `normalizeValueProp(value, { utc, showSeconds })` converts a `Date`/ISO → `"HH:mm[:ss]"` (via `dateToTimeParts` with UTC or local getters); a string is validated/passed through. `displayValue = normalizeValueProp(value, { utc, showSeconds }) ?? internalValue`.
- **State:** `open`, `internalValue` (seeded from `defaultValue`), `rawInput` (masked text), `draft` `{hourIndex, minuteIndex, secondIndex}`. A `useEffect` on `displayValue` re-derives `rawInput`/draft **only when the parsed value changed** (loop guard, per `TimeRange` GO-11207) and **never** calls `onChange`.
- **`onChange` fires:** (a) on **commit** of the typed field — blur / Enter / opening the panel — with the normalized value, only if changed; (b) on **dial interaction** while open — cell click, Up/Down/Home/End, scroll-snap settle. **Not** on empty-open, on close, or when unchanged. `onInputChange(raw)` fires each keystroke in type mode.
- **Mode transitions:** clock `IconicButton` (or `ArrowDown` on focused field) → parse+commit field, then open (focus first column, `readOnly=true`). Enter/Escape/outside/click-field → close, return focus to field, `readOnly=false`.
- **`suppressNextScroll` ref** set before any component-initiated `scrollTo` (open/keyboard/click-center) so the scroll event doesn't re-commit / fire a spurious `onChange`.
- **ARIA:** field `role="combobox"`, `aria-haspopup="dialog"`, `aria-expanded={open}`, `aria-controls={panelId}`, `aria-label`, `aria-invalid`, `readOnly={open||disabled}`. Clock button `IconicButton icon="queryBuilder"`, `aria-label={t("Open time picker")}`. Panel `role="dialog"`, `aria-label`, `id={panelId}`. Column `role="listbox"`, `aria-orientation="vertical"`, `aria-label`, `tabIndex=0`, `aria-activedescendant`. Cell `role="option"`, unique `id`, `aria-selected` on the snapped cell, `data-value`.

---

## 5. Pure utilities — `ScrollTimePicker.utils.ts`

**Convention:** the boolean flags (`showSeconds`, `utc`) are **never** passed as positional booleans — always via an **options object** (avoids the boolean-trap: `formatTime(parts, { showSeconds: true })` reads clearly). Single-flag helpers take `{ showSeconds }` or `{ utc }`; a helper needing both takes one combined `{ utc, showSeconds }`. Use a shared `type TimeOptions = { utc?: boolean; showSeconds?: boolean }` (helpers destructure the subset they use).

```ts
pad2(n): string                                    // 5 -> "05"
parseTime(value): {hour,minute,second} | null      // strict; "24:00"/"aa:bb"->null
formatTime(parts, { showSeconds }): string         // {9,30,0},{showSeconds:false} -> "09:30"
isValidTimeString(value): boolean

// free-type masked input
parseInput(raw, { showSeconds }): {hour,minute,second} | null
// split on ":"; each field = clamp(parseInt(digits||"0"), max), pad; whole-empty -> null.
// "-9:--"->{9,0,0}; "1430"/"14:30"->{14,30,0}; "14:5"->{14,5,0}; "99:99"->{23,59,0}
maskPlaceholder({ showSeconds }): string           // "--:--" | "--:--:--"

// Date / timezone (pure given a Date)
dateToTimeParts(date, { utc }): {hour,minute,second}   // getUTC*/get* by flag
normalizeValueProp(value, { utc, showSeconds }): string | undefined

// options + index math
buildHourOptions(): number[]                       // [0..23]
buildMinuteOptions(): number[]                     // [0..59] (step 1, faithful to Chrome)
buildSecondOptions(): number[]                     // [0..59]
wrapIndex(i,len) / clampIndex(i,len)
nextIndex(i,len) / prevIndex(i,len)                // wrap at ends
valueToIndex(v,opts) / indexToValue(i,opts)        // options are 0..N-1, so value==index (clamped)
indexToScrollTop(i,cellHeight) / scrollTopToIndex(scrollTop,cellHeight,len)  // Math.round(scrollTop/cellHeight)
resolveInitialIndices(value, { showSeconds }): {hourIndex,minuteIndex,secondIndex}
composeValueFromIndices(indices, { showSeconds }): string
```
- **"Now" seed** = `dateToTimeParts(new Date(), { utc })` — called by the component; the util stays pure (unit-tested with fixed Dates).
- **Testability key:** with a top/bottom spacer of `(containerHeight − cellHeight)/2`, the scrollTop centering cell *i* is exactly `i * cellHeight`; selection = `Math.round(scrollTop/cellHeight)` (survives pixel-off snaps).

---

## 6. Behavior specification

### A. Type mode (panel closed)
1. Trigger is an **editable masked `InputField`** with `labelText`, mask placeholder, trailing clock `IconicButton`, `aria-label`, error border on error.
2. Typing fills the mask; `:` always present; empty slots `-`. `onInputChange(raw)` per keystroke; dials do **not** move mid-typing.
3. **Blur/Enter commits:** `parseInput(raw)` → normalize → write back (`-9:--`→`09:00`) → `onChange` if changed. Empty/unparseable → placeholder, no `onChange`.
4. Clock icon (or `ArrowDown` on focused field) commits then **opens** the panel.
5. `disabled` → field non-editable, icon cannot open.

### B. Panel mode (open)
6. Panel `placement="bottom-start"`, portalled, `middleware:[offset(4),flip(),shift({padding:8})]`, `autoUpdate`, visibility gated on `isPositioned`. Field becomes **read-only**; focus → first column.
7. Dials seed from parsed field value; **empty → seed to current time** (`dateToTimeParts(new Date(), { utc })`), field stays empty, no `onChange`.
8. N columns (hour, minute, second iff `showSeconds`), each a vertical listbox, plus a static **center highlight band**.
9. Cells zero-padded: hour 00–23, minute 00–59, second 00–59.
10. Each column programmatically centers its selected cell on open (suppressing the resulting commit).
11. Selection = cell snapped to the center band (`scrollTopToIndex`).
12. Click a cell → select + center + commit (updates field + `onChange`); panel stays open.
13. Scroll + release → snap centers nearest cell; after debounce the resolved index commits.
14. Focused column: ArrowUp = prev **wrap**, ArrowDown = next **wrap**; updates `aria-activedescendant`, centers, commits.
15. ArrowLeft/Right move focus prev/next column (no wrap across columns).
16. Home = first option, End = last option; centers + commits.
17. Enter commits + closes; focus → field (editable).
18. Escape closes + reverts draft to value-at-open (fires `onChange` only if revert changed value); focus → field.
19. Outside-click closes keeping last value; clicking the read-only field closes into type mode.
20. Tab moves through columns in DOM order then out (no focus trap v1).
21. `onChange` fires with `"HH:mm[:ss]"` on any dial commit; never on empty-open/close alone or when unchanged.

### C. Value / timezone / shared
22. Value in accepts string or `Date`; `Date`/ISO converted via `dateToTimeParts(date, { utc })`. `onChange` emits a normalized **string**.
23. `utc` true → "now" seed (7) and Date conversion (22) use UTC getters; else local.
24. Controlled: `value` change re-derives field + dials + re-scrolls; sync never calls `onChange`. Uncontrolled: internal string, seeded from `defaultValue`.
25. `showSeconds` adds third column + `:ss` + second colon in mask.
26. Minutes (and seconds) are always the full 00–59 at step 1, matching Chrome — no `interval`/granularity option. Any in-range value maps to its cell directly.
27. Touch variant enlarges cell height / column width / font.
28. RTL: field LTR; column order hour→minute→second; floating-ui anchors; ArrowLeft = prev column in v1 (documented).
29. Error: `errorMessage`/`errorList` render via `InlineValidation`; field error border.
30. Reduced motion: scroll-centering `behavior:"auto"` under `prefers-reduced-motion` else `"smooth"`.
31. Cleanup: scroll listeners, debounce timeouts, `autoUpdate` torn down on close/unmount; `mounted` ref guards post-unmount callbacks.

---

## 7. Test matrix

**Repo mapping:** *unit* → Vitest `*.spec.ts` (pure utils, no render) · *interaction/"e2e"* → `play()` run in Chromium (`pnpm test:storybook`) · *visual* → Chromatic. **All scroll/geometry lives in `play()`, never specs.**

**Test-ids:** field `scroll-time-picker-input`; clock button `scroll-time-picker-open`; panel `scroll-time-picker-panel`; columns `scroll-time-column-{hour|minute|second}`; cells `scroll-time-cell-{col}-{padded}`; band `scroll-time-highlight`.

### 7.1 Layer 1 — Vitest unit (`ScrollTimePicker.utils.spec.ts`)
- `pad2`: `5→"05"`, `23→"23"`.
- `parseTime` (strict): `"09:30"→{9,30,0}`; `"23:05:07"→{23,5,7}`; `""/undefined→null`; `"24:00"/"12:60"/"aa:bb"→null`.
- `parseInput` (forgiving): `("-9:--",{showSeconds:false})→{9,0,0}`; `("1430",{showSeconds:false})→{14,30,0}`; `("14:5",{showSeconds:false})→{14,5,0}`; `("99:99",{showSeconds:false})→{23,59,0}`; `("--:--",{showSeconds:false})→null`; `("9:5:7",{showSeconds:true})→{9,5,7}`.
- `formatTime`: `({9,30,0},{showSeconds:false})→"09:30"`; `({9,30,5},{showSeconds:true})→"09:30:05"`.
- `maskPlaceholder`: `{showSeconds:false}→"--:--"`, `{showSeconds:true}→"--:--:--"`.
- `dateToTimeParts`: `Date.UTC(2020,0,1,23,30,15)` → `{utc:true}→{23,30,15}`; `{utc:false}` asserted against the same Date's `getHours()` (tz-independent).
- `normalizeValueProp`: `("09:30",{showSeconds:false})→"09:30"`; `(Date UTC 23:30, {utc:true,showSeconds:false})→"23:30"`; `("bad",{})→undefined`; `(undefined,{})→undefined`.
- `buildHourOptions`: len 24, `[0]===0`, `[23]===23`. `buildMinuteOptions`: len 60, `[0]===0`, `[59]===59`. `buildSecondOptions`: len 60.
- `wrapIndex(24,24)→0`,`(-1,24)→23`; `nextIndex(23,24)→0`; `prevIndex(0,24)→23`.
- `valueToIndex(32,minuteOptions)→32`; `indexToValue(32,minuteOptions)→32`; clamp out-of-range.
- `scrollTopToIndex(180,36,60)→5`;`(182,36,60)→5`;`(-10,..)→0`;`(999999,36,24)→23`.
- `resolveInitialIndices("09:32",{showSeconds:false})→{9,32,0}`; `("23:59:59",{showSeconds:true})→{23,59,59}`; `(""/"bad",{showSeconds:false})→{0,0,0}`.
- `composeValueFromIndices({9,32,0},{showSeconds:false})→"09:32"`; `({23,59,59},{showSeconds:true})→"23:59:59"`.

### 7.2 Layer 2/3 — `play()` (Chromium)
| #   | Behavior(s)                              | Interaction → Assertion                                                                                                |
|-----|------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| B1  | type + colon persists (2)                | focus field, type `930` → masked text w/ `:` present; `onInputChange` per keystroke; no dials                          |
| B2  | blur commits + normalizes (3)            | type `9`, blur → field `09:00`; `onChange` last `"09:00"`                                                              |
| B3  | Enter commits (3)                        | type `1430`, `{Enter}` → `14:30`; `onChange "14:30"`                                                                   |
| B4  | clock opens + parse-on-open (4,6,7)      | type `-9` → click open button → dialog visible; field read-only shows `09:00`; hour `09`/min `00` selected             |
| B5  | ArrowDown opens (4)                      | field focus + `{ArrowDown}` → panel; active el is a listbox                                                            |
| B6  | read-only while open (6)                 | open, type `5` in field → value unchanged                                                                              |
| B7  | empty open seeds now, no onChange (7,21) | empty field open → some hour/min selected; `onChange` NOT called                                                       |
| B8  | outside-close (19)                       | click `document.body` → dialog gone                                                                                    |
| B9  | click field closes to type mode (19)     | open → click field → dialog gone; field editable                                                                       |
| B10 | Escape revert + refocus (18)             | open, `{ArrowDown}` hour, `{Escape}` → dialog gone; field focused; value === value-at-open                             |
| B11 | click cell commits, stays open (12,21)   | open, click hour `09` → selected; dialog visible; `onChange "09:00"`; field `09:00`                                    |
| B12 | Up/Down wrap (14)                        | Home then `{ArrowUp}` → `23` selected; `aria-activedescendant`=`…-hour-23`; `onChange "23:00"`                         |
| B13 | Left/Right move (15)                     | hour focus + `{ArrowRight}` → activeElement=minute listbox; at last col no-op                                          |
| B14 | Home/End (16)                            | `{End}`→`23`+`onChange "23:00"`; `{Home}`→`00`                                                                         |
| B15 | Enter commit+close+refocus (17)          | change minute → `{Enter}` → dialog gone; field focused + value; `onChange`                                             |
| B16 | controlled updates (24)                  | click cell → parent setState reflects; external `value` change re-selects                                              |
| B17 | Date + utc value (22,23)                 | `value={new Date(Date.UTC(…,23,30))} utc` → field `23:30`; open → `23`/`30` selected                                   |
| B18 | disabled can't open/type (5)             | disabled → click open btn: no dialog; field not editable                                                               |
| B19 | showSeconds (25)                         | open → 3 listboxes; commit → `"HH:mm:ss"`; mask `--:--:--`                                                             |
| B20 | full minute range (26)                   | open with `value="09:32"` → minute listbox has options `00`…`59` (60 cells); `32` `aria-selected`                      |
| B21 | scroll-snap settle (13)                  | set minute `scrollTop=indexToScrollTop(i)`, `fireEvent.scroll`, `waitFor` → target selected; `onChange` (browser-only) |
| B22 | no loop / spurious onChange (31)         | inline-callback + setState wrapper → spy growth `<3` in 200ms quiet window                                             |
| B23 | single selection/column (8)              | select via keys → exactly one `option[aria-selected="true"]` per listbox                                               |

### 7.3 Visual-only stories (Chromatic)
Verifies layout/color: highlight band (8), touch sizing (27), focus ring (field+column), masked-empty vs filled, open-panel look, RTL (28), error (29), disabled. Stories: `Default`, `WithValue`, `WithDateValueUTC`, `Open`, `WithSeconds`, `Touch` (touch-variant decorator), `Disabled`, `WithError`, `Controlled`, `RTL` (`dir="rtl"` decorator), `UsingRefToControlFocus`, `DoesNotLoopWithInlineCallback`.

---

## 8. Edge cases & risks
- **Scroll-snap flakiness (headless):** selection = `Math.round(scrollTop/cellHeight)`. Type/click/keyboard are the primary tested commit paths; scroll path tested only via explicit `scrollTop=indexToScrollTop(i)` + `fireEvent.scroll` + `waitFor`. Never assert scroll in specs.
- **Detection:** scroll listener + ~100ms debounce + rounding (chosen over IntersectionObserver).
- **Masking micro-UX:** tens/ones auto-advance is UI-only; tested contract is `parseInput` on commit; never delete the `:`.
- **Spurious `onChange`:** empty-open seeds dials but must not `onChange`; `suppressNextScroll` guards programmatic scroll (B7/B22).
- **Controlled loop:** value→(field+indices) effect only `setState`s on parsed-value change, never `onChange` (B22; mirrors `TimeRange`).
- **`Date`/`utc`:** conversion pure + unit-tested with fixed `Date.UTC(...)`, asserted tz-independently; DST irrelevant. `new Date()` only in the component (empty-open seed).
- **In-range only:** minute/second are the full 00–59, so any parsed value maps to its cell directly (no snapping); typed input is clamped to range by `parseInput`.
- **RTL:** column order fixed; ArrowLeft = prev column v1. **Unmount:** `ScrollColumn` cleanup removes listener + `clearTimeout`; `mounted` ref guards.

---

## 9. Task breakdown

Each task: **do → files → done-when**. Follow TDD (write the failing test first). Run `pnpm check` after each code task.

- **T0 — Scaffold.** Create `src/ScrollTimePicker/` with this doc + empty `index.ts`. *Done-when:* folder exists, `pnpm check` clean.
- **T1 — Utils spec (RED).** Write `ScrollTimePicker.utils.spec.ts` covering every case in §7.1. *Done-when:* `pnpm test:components -- src/ScrollTimePicker/ScrollTimePicker.utils.spec.ts` fails (module missing).
- **T2 — Utils impl (GREEN).** Implement `ScrollTimePicker.utils.ts` (§5). *Done-when:* the spec passes.
- **T3 — Skeleton + registration.** `index.ts` barrel; minimal `ScrollTimePicker.tsx` = editable masked `InputField` + trailing clock `IconicButton` + `InlineValidation` (no panel yet); `ScrollTimePickerProps` exported; add line to `src/index.ts`. *Done-when:* `pnpm check` clean; component renders in a Storybook `Default` story.
- **T4 — Type mode (RED→GREEN).** Stories + `play()` B1/B2/B3/B18. Implement masked typing, `:` persistence, `onInputChange`, `parseInput` commit on blur/Enter, `disabled`. *Done-when:* B1/B2/B3/B18 green.
- **T5 — Open/close plumbing (RED→GREEN).** `play()` B4/B5/B7/B8/B9. Implement `useFloating` panel (mirror `Popper.tsx`), clock-icon + ArrowDown open, parse-on-open + now-seed, `readOnly`-while-open, close paths (Escape/outside/click-field), focus mgmt. Empty panel container OK. *Done-when:* B4/B5/B7/B8/B9 green.
- **T6 — Columns + dial interaction (RED→GREEN).** `play()` B6/B10/B11/B12/B13/B14/B15/B23. Build `ScrollColumn` (cells, ARIA, click-commit), column keyboard (wrap, Left/Right, Home/End, Enter/Escape), value composition, dial `onChange`, center highlight band. *Done-when:* those green; exactly one selected cell/column.
- **T7 — Value / UTC / controlled (RED→GREEN).** `play()` B16/B17/B20/B22 + controlled/Date wrapper stories. Wire `normalizeValueProp`/`Date`/`utc`, value-sync effect + loop guard, `showSeconds`, `fn()` spies. *Done-when:* those green; no loop.
- **T8 — Scroll-snap (RED→GREEN).** `play()` B21. Scroll listener + ~100ms debounce + `scrollTopToIndex` + `suppressNextScroll` + on-open centering + reduced-motion. *Done-when:* B21 green.
- **T9 — Feature + visual stories.** `WithSeconds`(B19), `Disabled`, `WithError`, `Open`, `Touch`, `RTL`, `WithDateValueUTC`, highlight-band, focus-ring. *Done-when:* all stories render; Chromatic-ready.
- **T10 — i18n.** Add `"Hours"`, `"Minutes"`, `"Seconds"`, `"Open time picker"` to all 17 `locales/*.json` (lowercased-key convention; reuse `"select a time"`). *Done-when:* keys present in every locale; no hardcoded UI strings.
- **T11 — Finalize.** `pnpm fix`, then `pnpm test` + `pnpm check` all green. Manual `pnpm start` smoke per §10. *Done-when:* everything green + smoke passes.

---

## 10. Verification
- `pnpm test:components -- src/ScrollTimePicker/ScrollTimePicker.utils.spec.ts` — unit layer green.
- `pnpm test:storybook` — all `play()` green in Chromium.
- `pnpm test` — both suites (pre-push hook enforces `pnpm check && pnpm test`).
- `pnpm check` — types + lint + format.
- `pnpm start` (localhost:9999) manual smoke: type a time (colon persists; blur normalizes `-9:--`→`09:00`); clock icon opens panel; field read-only while open; scroll / arrow-wrap / Home / End / Enter / Escape / click-cell; `Date`+`utc` value shows correct time; seconds + touch + disabled + error + RTL.
- Chromatic (CI) — visual diff review.

---

## 11. Checklist

**Scaffold & utils**
- [x] T0 `src/ScrollTimePicker/` created; `index.ts` stub; `pnpm check` clean
- [x] T1 `ScrollTimePicker.utils.spec.ts` written (all §7.1 cases) — RED
- [x] T2 `ScrollTimePicker.utils.ts` implemented — spec GREEN (37 tests)
- [x] T3 skeleton `ScrollTimePicker.tsx` (masked input + clock `IconicButton` + `InlineValidation`); `ScrollTimePickerProps` exported; `src/index.ts` line added; `Default` story renders

**Type mode**
- [x] T4 masked typing + `:` always present; `onInputChange` per keystroke; `parseInput` commit on blur/Enter (`-9:--`→`09:00`); `disabled` — B1/B2/B3/B18 green

**Panel open/close**
- [x] T5 `useFloating` panel (mirror `Popper.tsx`); clock-icon + ArrowDown open; parse-on-open + now-seed; read-only-while-open; Escape/outside/click-field close; focus mgmt — B4/B5/B7/B8/B9 green

**Columns & dials**
- [x] T6 `ScrollColumn` (cells/ARIA/click-commit); keyboard wrap/Left-Right/Home-End/Enter/Escape; value composition; highlight band — B6/B10/B11/B12/B13/B14/B15/B23 green

**Value / UTC / controlled**
- [x] T7 `normalizeValueProp`/`Date`/`utc`; value-sync effect + loop guard; `showSeconds`; `fn()` spies — B16/B17/B20/B22 green

**Scroll-snap**
- [x] T8 scroll listener + debounce + `scrollTopToIndex` + on-open centering + reduced-motion — B21 green (index-comparison guard supersedes `suppressNextScroll`)

**Stories & i18n**
- [x] T9 feature + visual stories authored (Default, WithValue, WithDateValueUTC, Open, WithSeconds, Touch, Disabled, WithError, Controlled, RTL, UsingRefToControlFocus, DoesNotLoopWithInlineCallback)
- [x] T10 i18n keys added to all 17 `locales/*.json` — lowercased-key convention (`"hours"`/`"minutes"`/`"seconds"`/`"open time picker"`, reusing `"select a time"`), with real translations per locale

**Finalize**
- [x] T11 `pnpm fix` → `pnpm check` + `pnpm test` green (75 unit + 586 story tests, 30 for ScrollTimePicker). Runtime behaviour verified via play() in real Chromium (the §10 smoke matrix). Chromatic runs on CI.

---

## 12. Critical files to reference (reuse, don't reinvent)
- `src/Popper/Popper.tsx` — `@floating-ui/react` wiring to mirror.
- `src/Input/InputField.tsx` — field; variant/error/icon/focus-ring conventions.
- `src/Button` (`IconicButton`) — clickable trailing clock button (confirm import at impl).
- `src/TimePicker/TimePicker.tsx` — time semantics, forgiving parsing inspiration (`convertTo24HourTimeArray`/`standardizeTime` — but 24h + numeric-per-field, NOT the 12h append-0 hack), `onInputChange`, i18n, `useComponentVariant`, `InlineValidation`. Anti-patterns to avoid: `defaultProps`, `@ts-nocheck`, `DetectOutsideClick`, absolute dropdown.
- `src/TimeRange/TimeRange.story.tsx` — `fn()` spy + loop-regression `play()` pattern.
- `src/StyledProps/index.ts` — context-aware `variant`, `addStyledProps`; `src/constants/keyCodes.ts`; `src/utils/subPx.ts`.
- `src/index.ts` — registration (one export line). 
- `tmp/__bad__/time_picker.js` — the reference interaction model (§2.9).
