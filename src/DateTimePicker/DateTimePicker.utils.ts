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
