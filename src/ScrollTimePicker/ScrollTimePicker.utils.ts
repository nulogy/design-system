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
// Splits on ":" (or chunks a bare digit run into pairs), strips non-digits from each
// field, clamps to range. Returns null only when nothing at all has been typed.
export function parseInput(raw: string, { showSeconds }: TimeOptions = {}): TimeParts | null {
  const fieldCount = showSeconds ? 3 : 2;

  let rawFields: string[];
  if (raw.includes(":")) {
    rawFields = raw.split(":");
  } else {
    const digits = raw.replace(/\D/g, "");
    rawFields = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 6)];
  }

  const digitFields = rawFields.slice(0, fieldCount).map((field) => field.replace(/\D/g, ""));
  if (digitFields.every((field) => field === "")) return null;

  const maxima = [HOUR_MAX, MINUTE_MAX, SECOND_MAX];
  const [hour, minute, second] = [0, 1, 2].map((i) =>
    clampNumber(Number.parseInt(digitFields[i] || "0", 10), maxima[i]),
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

// Render the visible masked string from a raw digit stream. Completed fields are zero-padded;
// the in-progress trailing field shows its digit followed by "-"; untyped slots show "--".
export function timeWithSeparator(digits: string, { showSeconds }: TimeOptions = {}): string {
  const fieldCount = showSeconds ? 3 : 2;
  const fields = fieldsFromDigitStream(digits, fieldCount);
  const slots: string[] = [];
  for (let f = 0; f < fieldCount; f += 1) {
    const value = fields[f];
    if (value === undefined) {
      slots.push("--");
      continue;
    }
    const isLastField = f === fields.length - 1;
    const canHaveSecondDigit = value.length === 1 && Number(value) <= FIELD_FIRST_DIGIT_MAX[f];
    if (isLastField && canHaveSecondDigit) {
      slots.push(`${value}-`);
    } else {
      slots.push(value.padStart(2, "0"));
    }
  }
  return slots.join(":");
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
