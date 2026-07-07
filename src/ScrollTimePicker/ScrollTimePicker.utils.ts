// Pure, render-free helpers for ScrollTimePicker.
//
// Convention: boolean flags (`showSeconds`, `utc`) are never positional booleans —
// they are always passed via an options object so call sites read clearly, e.g.
// `formatTime(parts, { showSeconds: true })`.

export type TimeParts = { hour: number; minute: number; second: number };
export type TimeIndices = { hourIndex: number; minuteIndex: number; secondIndex: number };
export type TimeOptions = { utc?: boolean; showSeconds?: boolean };

const HOUR_MAX = 23;
const MINUTE_MAX = 59;
const SECOND_MAX = 59;

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function clampNumber(value: number, max: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(value, max));
}

// Strict parse — used for values that are meant to already be normalized ("HH:mm[:ss]").
// Rejects anything out of range or non-numeric.
export function parseTime(value: string | undefined | null): TimeParts | null {
  if (!value) return null;
  const match = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(value.trim());
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  const second = match[3] != null ? Number(match[3]) : 0;
  if (hour > HOUR_MAX || minute > MINUTE_MAX || second > SECOND_MAX) return null;
  return { hour, minute, second };
}

export function isValidTimeString(value: string | undefined | null): boolean {
  return parseTime(value) !== null;
}

// Forgiving parse — used for free-typed masked input on commit.
// Splits on ":" (or chunks a bare digit run into pairs), then reads each field positionally:
// a "-" placeholder is the empty digit in its own column, so "1-" is a filled tens column and
// reads as 10 (not 01). Clamps to range; returns null only when nothing at all has been typed.
export function parseInput(raw: string, { showSeconds }: TimeOptions = {}): TimeParts | null {
  const fieldCount = showSeconds ? 3 : 2;

  let rawFields: string[];
  if (raw.includes(":")) {
    rawFields = raw.split(":");
  } else {
    const digits = raw.replace(/\D/g, "");
    rawFields = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 6)];
  }

  const fields = rawFields.slice(0, fieldCount);
  if (fields.every((field) => field.replace(/\D/g, "") === "")) return null;

  // A dash holds a digit's place (an unfilled column), so read it as 0 in position rather than
  // dropping it — that keeps "1-" in the tens column (10) instead of collapsing it to 01.
  const positionalFields = fields.map((field) => field.replace(/-/g, "0").replace(/\D/g, ""));

  const maxima = [HOUR_MAX, MINUTE_MAX, SECOND_MAX];
  const [hour, minute, second] = [0, 1, 2].map((i) =>
    clampNumber(Number.parseInt(positionalFields[i] || "0", 10), maxima[i]),
  );
  return { hour, minute, second };
}

export function formatTime(parts: TimeParts, { showSeconds }: TimeOptions = {}): string {
  const base = `${pad2(parts.hour)}:${pad2(parts.minute)}`;
  return showSeconds ? `${base}:${pad2(parts.second)}` : base;
}

export function maskPlaceholder({ showSeconds }: TimeOptions = {}): string {
  return showSeconds ? "--:--:--" : "--:--";
}

// --- free-type masked-input display (per-keystroke micro-UX; tested contract is parse-on-commit) ---

// Largest allowed leading (tens) digit per field: hours 0-2, minutes/seconds 0-5.
const FIELD_FIRST_DIGIT_MAX = [2, 5, 5];

// Extract the digits from raw field text, capped at the count the format allows (4, or 6 with seconds).
export function digitsFromRaw(raw: string, { showSeconds }: TimeOptions = {}): string {
  const maxDigits = showSeconds ? 6 : 4;
  return raw.replace(/\D/g, "").slice(0, maxDigits);
}

// Greedily split a raw digit stream into up to `fieldCount` fields, taking two digits when the
// leading digit could be a tens digit (per FIELD_FIRST_DIGIT_MAX) and another digit is present.
export function fieldsFromDigitStream(digits: string, fieldCount: number): string[] {
  const fields: string[] = [];
  let i = 0;
  while (i < digits.length && fields.length < fieldCount) {
    const leftDigit = Number(digits[i]);
    const canHaveSecondDigit = leftDigit <= FIELD_FIRST_DIGIT_MAX[fields.length] && i + 1 < digits.length;
    if (canHaveSecondDigit) {
      fields.push(digits.slice(i, i + 2));
      i += 2;
    } else {
      fields.push(digits[i]);
      i += 1;
    }
  }
  return fields;
}

// Split raw field text into per-field digit strings for masking.
//
// When the raw text has no ":" yet (the first keystroke, or a pasted digit run) there are no
// field boundaries to honour, so we greedily flow the digit stream across fields — "930" → 09:30.
//
// Once a ":" is present it delimits the fields the user is editing, so we keep each field's
// digits in place instead of collapsing everything back into one stream and re-flowing it.
// That makes editing field-local: backspacing the "5" in "15:30" gives "1-:30", not "13:0-".
// A field can still overflow (e.g. inserting a digit into an already-full field), so any digits
// past the second cascade into the following field — inserting "9" into "12:34" gives "19:23".
export function fieldsFromRaw(raw: string, { showSeconds }: TimeOptions = {}): string[] {
  const fieldCount = showSeconds ? 3 : 2;
  if (!raw.includes(":")) {
    return fieldsFromDigitStream(digitsFromRaw(raw, { showSeconds }), fieldCount);
  }
  const segments = raw.split(":").map((segment) => segment.replace(/\D/g, ""));
  const fields: string[] = [];
  let carry = "";
  for (let f = 0; f < fieldCount; f += 1) {
    const combined = carry + (segments[f] ?? "");
    fields.push(combined.slice(0, 2));
    carry = combined.slice(2);
  }
  return fields;
}

// Render the visible masked string from per-field digit strings. A completed (two-digit) field
// is shown as-is; a field holding a single digit that could still take a tens/ones partner shows
// that digit followed by "-"; an empty/untyped field shows "--".
export function renderFields(fields: string[], { showSeconds }: TimeOptions = {}): string {
  const fieldCount = showSeconds ? 3 : 2;
  const slots: string[] = [];
  for (let f = 0; f < fieldCount; f += 1) {
    const value = fields[f] ?? "";
    if (value === "") {
      slots.push("--");
    } else if (value.length === 1 && Number(value) <= FIELD_FIRST_DIGIT_MAX[f]) {
      slots.push(`${value}-`);
    } else {
      slots.push(value.padStart(2, "0"));
    }
  }
  return slots.join(":");
}

// --- caret preservation for the masked field ---
//
// The masked value re-renders on every keystroke, which resets the caret to the end. To keep
// the caret where the user was typing, we anchor it to the number of digits it followed and
// re-derive the string index from the freshly parsed fields (separators and placeholders shift
// raw indices around as the mask fills).

// Count the digit characters in a string (i.e. the digits typed so far up to some point).
export function countDigits(text: string): number {
  return (text.match(/\d/g) ?? []).length;
}

// Where to place the caret after re-masking: walk the parsed fields counting only the digits the
// user actually typed — render padding (e.g. "9" shown as "09") is NOT a typed digit — and return
// the string index just after the `digitCount`-th typed digit. Because we count typed digits (not
// the digits in the masked string) the caret no longer drifts when a field auto-zero-pads.
export function caretIndexForTypedDigits(
  fields: string[],
  digitCount: number,
  { showSeconds }: TimeOptions = {},
): number {
  if (digitCount <= 0) return 0;
  const fieldCount = showSeconds ? 3 : 2;
  let pos = 0;
  let remaining = digitCount;
  for (let f = 0; f < fieldCount; f += 1) {
    if (f > 0) pos += 1; // ":" separator
    const value = fields[f] ?? "";
    const typed = value.length;
    if (remaining > typed) {
      pos += 2; // caret is past this whole 2-char slot
      remaining -= typed;
      continue;
    }
    // In-progress fields render left-aligned ("d-"); completed/zero-padded fields right-aligned
    // ("09"), so a padded field's typed digits sit in its rightmost columns.
    const isInProgress = typed === 1 && Number(value) <= FIELD_FIRST_DIGIT_MAX[f];
    pos += isInProgress ? remaining : 2 - typed + remaining;
    return pos;
  }
  return pos;
}

export function dateToTimeParts(date: Date, { utc }: TimeOptions = {}): TimeParts {
  return utc
    ? { hour: date.getUTCHours(), minute: date.getUTCMinutes(), second: date.getUTCSeconds() }
    : { hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds() };
}

// Converts a value prop (string "HH:mm[:ss]", an ISO string, or a Date) to a normalized
// "HH:mm[:ss]" string, or undefined when there is no usable value.
export function normalizeValueProp(
  value: string | Date | undefined | null,
  { utc, showSeconds }: TimeOptions = {},
): string | undefined {
  if (value == null) return undefined;

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return undefined;
    return formatTime(dateToTimeParts(value, { utc }), { showSeconds });
  }

  const strict = parseTime(value);
  if (strict) return formatTime(strict, { showSeconds });

  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) return formatTime(dateToTimeParts(date, { utc }), { showSeconds });

  return undefined;
}

function range(length: number): number[] {
  return Array.from({ length }, (_, i) => i);
}

export function buildHourOptions(): number[] {
  return range(24);
}

export function buildMinuteOptions(): number[] {
  return range(60);
}

export function buildSecondOptions(): number[] {
  return range(60);
}

export function wrapIndex(i: number, len: number): number {
  return ((i % len) + len) % len;
}

export function clampIndex(i: number, len: number): number {
  return Math.max(0, Math.min(i, len - 1));
}

export function nextIndex(i: number, len: number): number {
  return wrapIndex(i + 1, len);
}

export function prevIndex(i: number, len: number): number {
  return wrapIndex(i - 1, len);
}

export function valueToIndex(value: number, options: number[]): number {
  const idx = options.indexOf(value);
  return idx >= 0 ? idx : clampIndex(value, options.length);
}

export function indexToValue(index: number, options: number[]): number {
  return options[clampIndex(index, options.length)];
}

export function indexToScrollTop(index: number, cellHeight: number): number {
  return index * cellHeight;
}

export function scrollTopToIndex(scrollTop: number, cellHeight: number, len: number): number {
  return clampIndex(Math.round(scrollTop / cellHeight), len);
}

export function resolveInitialIndices(value: string | undefined | null, _options: TimeOptions = {}): TimeIndices {
  const parts = parseTime(value);
  if (!parts) return { hourIndex: 0, minuteIndex: 0, secondIndex: 0 };
  return {
    hourIndex: clampIndex(parts.hour, 24),
    minuteIndex: clampIndex(parts.minute, 60),
    secondIndex: clampIndex(parts.second, 60),
  };
}

export function composeValueFromIndices(
  { hourIndex, minuteIndex, secondIndex }: TimeIndices,
  options: TimeOptions = {},
): string {
  return formatTime(
    {
      hour: indexToValue(hourIndex, buildHourOptions()),
      minute: indexToValue(minuteIndex, buildMinuteOptions()),
      second: indexToValue(secondIndex, buildSecondOptions()),
    },
    options,
  );
}
