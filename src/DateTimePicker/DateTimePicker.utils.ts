// Pure, render-free helpers for DateTimePicker.
//
// The one net-new problem this component has is merging a calendar day (from DatePicker) with a
// time-of-day (from ScrollTimePicker) into a single instant, correctly under either local time or
// UTC. Time extraction/formatting is delegated to the ScrollTimePicker utils — we do not duplicate
// it here.
//
// Convention (shared with ScrollTimePicker): the `utc`/`showSeconds` boolean flags are never
// positional — they are always passed via an options object so call sites read clearly.

import { dateToTimeParts, formatTime, parseTime, type TimeOptions } from "../ScrollTimePicker/ScrollTimePicker.utils";

export type SplitDateTime = {
  // The day to feed react-datepicker as `selected`. In UTC mode this is a *proxy* Date whose
  // LOCAL y/m/d equal the instant's UTC y/m/d, so react-datepicker (which reads local getFullYear/
  // getMonth/getDate) renders the UTC calendar day. In local mode it is the instant itself.
  dateForPicker: Date | undefined;
  // The time-of-day as an "HH:mm[:ss]" string for ScrollTimePicker.
  time: string;
};

function isValidDate(value: Date | undefined | null): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

// Split an instant into the two sub-values the composed fields consume. The inverse of
// `combineDateAndTime` — `combine(split(value)) === value` for any valid instant (see spec).
export function splitDateTime(value: Date | undefined | null, { utc, showSeconds }: TimeOptions = {}): SplitDateTime {
  if (!isValidDate(value)) return { dateForPicker: undefined, time: "" };

  const dateForPicker = utc ? new Date(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()) : value;

  return { dateForPicker, time: formatTime(dateToTimeParts(value, { utc }), { showSeconds }) };
}

// Combine a picker day with a time-of-day string into a single instant, or `undefined` when there
// is no day yet (a time with no date is not an instant). A missing/unparseable time reads as 00:00.
export function combineDateAndTime(
  dateForPicker: Date | undefined | null,
  time: string,
  { utc, showSeconds }: TimeOptions = {},
): Date | undefined {
  if (!isValidDate(dateForPicker)) return undefined;

  const { hour, minute, second } = parseTime(time) ?? { hour: 0, minute: 0, second: 0 };
  const y = dateForPicker.getFullYear();
  const m = dateForPicker.getMonth();
  const d = dateForPicker.getDate();
  const s = showSeconds ? second : 0;

  return utc ? new Date(Date.UTC(y, m, d, hour, minute, s)) : new Date(y, m, d, hour, minute, s);
}

// Serialize the emitted instant for the hidden form input, matching whichever wall-clock the fields
// show. In UTC mode this is the canonical `toISOString()` (a `…Z` string). In local mode we emit the
// SAME ISO shape but from the instant's LOCAL components with no zone suffix — i.e. the local
// wall-clock the user actually sees, NOT that instant shifted to UTC.
export function formatInstantForField(date: Date, { utc }: TimeOptions = {}): string {
  if (utc) return date.toISOString();

  const pad = (value: number, length = 2) => String(value).padStart(length, "0");
  const datePart = `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const timePart = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}`;
  return `${datePart}T${timePart}`;
}

// Build the value for the hidden form field, completing a partial selection so it still submits a
// whole instant:
//   • a valid time with no date borrows today's calendar day (in the active zone);
//   • a date with no (or an unparseable) time reads as 00:00 — combineDateAndTime's existing rule.
// Returns "" only when neither half is populated. `now` is injected so the function stays pure.
export function formatFieldValue(
  dateForPicker: Date | undefined,
  time: string,
  now: Date,
  { utc, showSeconds }: TimeOptions = {},
): string {
  const hasDate = isValidDate(dateForPicker);
  const hasTime = parseTime(time) != null;
  if (!hasDate && !hasTime) return "";

  // Today as a picker day: mirrors splitDateTime's proxy so UTC mode uses today's UTC calendar day.
  const today = utc ? new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) : now;
  const instant = combineDateAndTime(hasDate ? dateForPicker : today, time, { utc, showSeconds });
  return instant ? formatInstantForField(instant, { utc }) : "";
}
