# DateTimePicker — Implementation Plan

Self-contained TDD checklist for building `DateTimePicker`. Composes the NDS `DatePicker` +
`ScrollTimePicker` **side by side** (two independent fields, each with its own popover) and exposes
them as a **single merged `Date`**, correct in **UTC** when asked. Mirrors the `DateRange`
composition pattern (`src/DateRange/DateRange.tsx`).

## Context / why

`DatePicker` works in `Date` objects (react-datepicker, **local**-time rendering). `ScrollTimePicker`
(new, this branch) is a Chrome-style scroll-wheel time picker that emits `"HH:mm[:ss]"` strings and
has a `utc` flag. Nothing today captures a **date + time-of-day as one instant**. `DateRange`
composes date + time but keeps them separate and has no UTC. This component fills that gap.

**Confirmed decisions:** (1) single merged `Date` value/onChange; (2) `utc` prop → UTC-correct
instant; (3) side-by-side layout (NOT time-inside-calendar).

## Core problem: merge Date + time under UTC

react-datepicker renders `selected` with **local** `getFullYear/getMonth/getDate`. To display the
**UTC** calendar day, feed it a proxy `Date` whose *local* y/m/d equal the instant's *UTC* y/m/d;
reverse it on the way back with `Date.UTC(...)`. This split/combine is the only net-new logic —
`ScrollTimePicker.utils.ts` already handles time extraction (`dateToTimeParts` uses `getUTCHours`
when `utc`).

## Prop contract

```ts
interface DateTimePickerProps extends SpaceProps {
  value?: Date;                 // controlled instant
  defaultValue?: Date;          // uncontrolled initial
  onChange?: (value: Date | undefined) => void;
  utc?: boolean;                // default false
  showSeconds?: boolean;        // -> ScrollTimePicker; default false
  disabled?: boolean;
  labelText?: string;           // optional group label
  errorMessage?: string;
  errorList?: string[];
  minDate?: Date; maxDate?: Date;   // day-level bounds -> DatePicker
  dateFormat?: string; locale?: string;
  variant?: ComponentVariant;
  dateInputProps?: InputFieldProps;             // customize date field
  timeProps?: Partial<ScrollTimePickerProps>;   // customize time field
  className?: string; id?: string;
}
```

## Data flow (copy DateRange's `emitRange` pattern — avoids inline-callback loops)

- Internal state holds two sub-values: `dateForPicker: Date | undefined`, `time: string`,
  initialized from `defaultValue`/`value` via `splitDateTime`.
- Controlled: re-derive both from `value` in `useEffect([value, utc, showSeconds])`
  (like `DatePicker.tsx`'s `selected` sync). **Never** call `onChange` from that effect.
- `emit(overrides)` → `onChange(combineDateAndTime({ dateForPicker, time, ...overrides }, { utc, showSeconds }))`.
  Call it from handlers passing the fresh value as `overrides` (setState hasn't landed in closure yet).
- Date handler: `setDateForPicker(d); emit({ dateForPicker: d })`.
- Time handler (`ScrollTimePicker.onChange` gives `"HH:mm[:ss]"`): `setTime(v); emit({ time: v })`.
- Policy: emit `undefined` until a date exists; date-only selection emits the instant at `00:00`.

## Layout

Lightweight `Flex` (NOT `RangeContainer` — its centered `-` is range-specific). One group label via
`MaybeFieldLabel`, one shared `InlineValidation` below (mirror `src/Input/Input.tsx`). Child fields
use `aria-label` (reuse existing i18n keys `"select a date"`, `"select a time"` — already in all
`locales/*.json`), **not** `labelText`, to avoid double-labeling. Split space props with
`getSubset`/`omitSubset` (`src/utils/subset`). Forward `useComponentVariant(variant)` to both.

```tsx
<Field className={className} {...spaceProps}>
  <MaybeFieldLabel labelText={labelText}>
    <Flex>
      <DatePicker selected={dateForPicker} onChange={handleDateChange}
        minDate={minDate} maxDate={maxDate} dateFormat={dateFormat} locale={locale}
        inputProps={{ "aria-label": t("select a date"), error: hasError, disabled, ...dateInputProps }} />
      <ScrollTimePicker ml="x1" value={time} utc={utc} showSeconds={showSeconds}
        variant={componentVariant} disabled={disabled} aria-label={t("select a time")}
        onChange={handleTimeChange} {...timeProps} />
    </Flex>
  </MaybeFieldLabel>
  <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
</Field>
```

`hasError = !!(errorMessage || errorList)`. For matching red styling on the time field, add an
optional `error?: boolean` passthrough to `ScrollTimePicker` (one line, backward compatible), or ship
date-field-only error styling for the spike and note the follow-up.

## Util: `DateTimePicker.utils.ts`

Reuse `parseTime`, `formatTime`, `dateToTimeParts`, `TimeOptions` from
`../ScrollTimePicker/ScrollTimePicker.utils` — do not duplicate. Options-object convention (no
positional booleans).

```ts
export function splitDateTime(value, { utc, showSeconds } = {}) {
  if (!value || Number.isNaN(value.getTime())) return { dateForPicker: undefined, time: "" };
  const dateForPicker = utc
    ? new Date(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate())
    : value;
  return { dateForPicker, time: formatTime(dateToTimeParts(value, { utc }), { showSeconds }) };
}

export function combineDateAndTime(dateForPicker, time, { utc, showSeconds } = {}) {
  if (!dateForPicker || Number.isNaN(dateForPicker.getTime())) return undefined;
  const { hour, minute, second } = parseTime(time) ?? { hour: 0, minute: 0, second: 0 };
  const [y, m, d] = [dateForPicker.getFullYear(), dateForPicker.getMonth(), dateForPicker.getDate()];
  const s = showSeconds ? second : 0;
  return utc ? new Date(Date.UTC(y, m, d, hour, minute, s)) : new Date(y, m, d, hour, minute, s);
}
```

## Execution checklist

- [ ] `src/DateTimePicker/DateTimePicker.utils.ts` — `splitDateTime`, `combineDateAndTime`.
- [ ] `src/DateTimePicker/DateTimePicker.utils.spec.ts` — Vitest (`import from "vitest"`):
  - [ ] UTC near-midnight: `splitDateTime(new Date(Date.UTC(2020,0,1,23,30)), {utc:true})` → day `2020-01-01`, `time === "23:30"`.
  - [ ] UTC round-trip: `combineDateAndTime(split.dateForPicker, split.time, {utc:true})` === original instant.
  - [ ] Local round-trip (`utc:false`).
  - [ ] `showSeconds` on/off; missing time → `00:00`; `undefined`/invalid `Date` inputs.
- [ ] `src/DateTimePicker/DateTimePicker.tsx` — component per above.
- [ ] `src/DateTimePicker/DateTimePicker.story.tsx` — `title: "Components/DateTimePicker"`; import from
      `storybook/test`; `action`/`fn` for callbacks. Portal selectors: calendar via
      `document.querySelector(".react-datepicker-popper")`/`.react-datepicker__day--0NN`; time via
      `screen` + testids `scroll-time-picker-*`. Stories:
  - [ ] `Default` (local) + `UTC`.
  - [ ] `WithValue` — `value={new Date(Date.UTC(2026,6,8,14,30))} utc` → date shows `2026-Jul-08`, time `14:30`.
  - [ ] `EmitsMergedDate` — pick day + time; `onChange` spy last called with correct single UTC `Date`.
  - [ ] `Controlled` — parent `useState` + external "set" button re-syncs both fields.
  - [ ] `DoesNotLoopWithInlineCallback` — inline `onChange={setValue}` doesn't loop (mirror ScrollTimePicker B22).
  - [ ] `Disabled`, `WithError`, `WithSeconds`, `Touch` (`variant="touch"`), `RTL`.
- [ ] `src/DateTimePicker/index.ts` — barrel: `export { default as DateTimePicker } ...` + `export type { DateTimePickerProps } ...`.
- [ ] `src/index.ts` — add after `DateRange` line (~26): `export { DateTimePicker, type DateTimePickerProps } from "./DateTimePicker";`
- [ ] (Optional) `src/ScrollTimePicker/ScrollTimePicker.tsx` — optional `error?: boolean` passthrough.

## Verify

1. `pnpm start` → Storybook `:9999` → **Components/DateTimePicker**. In `UTC` story, pick date + time,
   confirm emitted `Date` (Actions panel) is the correct UTC instant; confirm a `23:30Z` value shows
   the UTC day, not local.
2. `pnpm test:components -- src/DateTimePicker/DateTimePicker.utils.spec.ts`.
3. `pnpm test:storybook`.
4. `pnpm fix && pnpm check`.

## Out of scope (v1)

- Combined min/max *instant* bounds and cross-field time clamping (only day-level `minDate`/`maxDate`).
- Time-inside-calendar-popover layout (deferred — side-by-side chosen).
- Named IANA timezones (only browser-local vs UTC).

## Key references

- Composition precedent: `src/DateRange/DateRange.tsx` (`emitRange` loop-safe pattern).
- Time utils to reuse: `src/ScrollTimePicker/ScrollTimePicker.utils.ts`.
- Layout/label/validation: `src/Input/Input.tsx`, `src/RangeContainer/RangeContainer.tsx`, `src/FieldLabel`.
- DatePicker props: `src/DatePickers/shared/types.ts`; engine: `src/DatePickers/shared/components/BasePicker.tsx`.