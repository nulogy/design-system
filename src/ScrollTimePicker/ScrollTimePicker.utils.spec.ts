import { describe, expect, it } from "vitest";

import {
  buildHourOptions,
  buildMinuteOptions,
  buildSecondOptions,
  clampIndex,
  composeValueFromIndices,
  dateToTimeParts,
  digitsFromRaw,
  fieldsFromDigitStream,
  formatTime,
  indexToScrollTop,
  indexToValue,
  isValidTimeString,
  maskPlaceholder,
  nextIndex,
  normalizeValueProp,
  pad2,
  parseInput,
  parseTime,
  prevIndex,
  resolveInitialIndices,
  scrollTopToIndex,
  timeWithSeparator,
  valueToIndex,
  wrapIndex,
} from "./ScrollTimePicker.utils";

describe("pad2", () => {
  it("zero-pads single digits", () => {
    expect(pad2(5)).toBe("05");
  });
  it("leaves two digits untouched", () => {
    expect(pad2(23)).toBe("23");
  });
});

describe("parseTime (strict)", () => {
  it("parses HH:mm", () => {
    expect(parseTime("09:30")).toEqual({ hour: 9, minute: 30, second: 0 });
  });
  it("parses HH:mm:ss", () => {
    expect(parseTime("23:05:07")).toEqual({ hour: 23, minute: 5, second: 7 });
  });
  it("rejects empty / undefined", () => {
    expect(parseTime("")).toBeNull();
    expect(parseTime(undefined)).toBeNull();
  });
  it("rejects out-of-range and non-numeric", () => {
    expect(parseTime("24:00")).toBeNull();
    expect(parseTime("12:60")).toBeNull();
    expect(parseTime("aa:bb")).toBeNull();
  });
});

describe("isValidTimeString", () => {
  it("is true for valid strings and false otherwise", () => {
    expect(isValidTimeString("09:30")).toBe(true);
    expect(isValidTimeString("24:00")).toBe(false);
    expect(isValidTimeString("")).toBe(false);
  });
});

describe("parseInput (forgiving)", () => {
  it("fills missing fields from partial masked text", () => {
    expect(parseInput("-9:--", { showSeconds: false })).toEqual({ hour: 9, minute: 0, second: 0 });
  });
  it("parses digit runs with no separator", () => {
    expect(parseInput("1430", { showSeconds: false })).toEqual({ hour: 14, minute: 30, second: 0 });
  });
  it("accepts single-digit fields", () => {
    expect(parseInput("14:5", { showSeconds: false })).toEqual({ hour: 14, minute: 5, second: 0 });
  });
  it("clamps out-of-range fields", () => {
    expect(parseInput("99:99", { showSeconds: false })).toEqual({ hour: 23, minute: 59, second: 0 });
  });
  it("returns null when nothing has been typed", () => {
    expect(parseInput("--:--", { showSeconds: false })).toBeNull();
  });
  it("parses seconds when enabled", () => {
    expect(parseInput("9:5:7", { showSeconds: true })).toEqual({ hour: 9, minute: 5, second: 7 });
  });
});

describe("formatTime", () => {
  it("formats HH:mm without seconds", () => {
    expect(formatTime({ hour: 9, minute: 30, second: 0 }, { showSeconds: false })).toBe("09:30");
  });
  it("formats HH:mm:ss with seconds", () => {
    expect(formatTime({ hour: 9, minute: 30, second: 5 }, { showSeconds: true })).toBe("09:30:05");
  });
});

describe("maskPlaceholder", () => {
  it("returns the two-field mask", () => {
    expect(maskPlaceholder({ showSeconds: false })).toBe("--:--");
  });
  it("returns the three-field mask", () => {
    expect(maskPlaceholder({ showSeconds: true })).toBe("--:--:--");
  });
});

describe("digitsFromRaw", () => {
  it("strips every non-digit character", () => {
    expect(digitsFromRaw("14:30", {})).toBe("1430");
    expect(digitsFromRaw("--:--", {})).toBe("");
    expect(digitsFromRaw("-9", {})).toBe("9");
    expect(digitsFromRaw("1a2b3c", {})).toBe("123");
  });
  it("returns an empty string for empty input", () => {
    expect(digitsFromRaw("", {})).toBe("");
  });
  it("caps at four digits without seconds", () => {
    expect(digitsFromRaw("123456", { showSeconds: false })).toBe("1234");
    expect(digitsFromRaw("99999", { showSeconds: false })).toBe("9999");
  });
  it("caps at six digits with seconds", () => {
    expect(digitsFromRaw("12345678", { showSeconds: true })).toBe("123456");
    expect(digitsFromRaw("12:34:56", { showSeconds: true })).toBe("123456");
    expect(digitsFromRaw("9:5:7", { showSeconds: true })).toBe("957");
  });
  it("defaults to the no-seconds cap when options are omitted", () => {
    expect(digitsFromRaw("123456")).toBe("1234");
  });
});

describe("fieldsFromDigitStream", () => {
  it("returns no fields for an empty stream", () => {
    expect(fieldsFromDigitStream("", 2)).toEqual([]);
  });
  it("keeps a lone leading tens-eligible digit as an in-progress single field", () => {
    expect(fieldsFromDigitStream("1", 2)).toEqual(["1"]);
    expect(fieldsFromDigitStream("2", 2)).toEqual(["2"]);
  });
  it("treats a leading digit above the tens max as a complete single field", () => {
    expect(fieldsFromDigitStream("3", 2)).toEqual(["3"]);
    expect(fieldsFromDigitStream("9", 2)).toEqual(["9"]);
  });
  it("takes two digits when the leading digit can be a tens digit", () => {
    expect(fieldsFromDigitStream("12", 2)).toEqual(["12"]);
    expect(fieldsFromDigitStream("14", 2)).toEqual(["14"]);
  });
  it("advances to the next field after a high leading hour digit", () => {
    expect(fieldsFromDigitStream("93", 2)).toEqual(["9", "3"]);
    expect(fieldsFromDigitStream("930", 2)).toEqual(["9", "30"]);
  });
  it("splits a full HHMM stream", () => {
    expect(fieldsFromDigitStream("1430", 2)).toEqual(["14", "30"]);
  });
  it("uses the minute tens max (5) for the second field", () => {
    expect(fieldsFromDigitStream("176", 2)).toEqual(["17", "6"]); // 6 > 5 => ones digit only
    expect(fieldsFromDigitStream("1759", 2)).toEqual(["17", "59"]);
  });
  it("stops once fieldCount fields are filled, ignoring extra digits", () => {
    expect(fieldsFromDigitStream("12345", 2)).toEqual(["12", "34"]);
  });
  it("splits three fields when asked", () => {
    expect(fieldsFromDigitStream("010203", 3)).toEqual(["01", "02", "03"]);
    expect(fieldsFromDigitStream("120000", 3)).toEqual(["12", "00", "00"]);
  });
});

describe("timeWithSeparator", () => {
  it("renders the empty mask", () => {
    expect(timeWithSeparator("", { showSeconds: false })).toBe("--:--");
    expect(timeWithSeparator("", { showSeconds: true })).toBe("--:--:--");
  });
  it("zero-pads a complete single-digit hour", () => {
    expect(timeWithSeparator("9", { showSeconds: false })).toBe("09:--");
    expect(timeWithSeparator("3", { showSeconds: false })).toBe("03:--");
  });
  it("shows an in-progress single tens digit with a trailing dash", () => {
    expect(timeWithSeparator("1", { showSeconds: false })).toBe("1-:--");
    expect(timeWithSeparator("2", { showSeconds: false })).toBe("2-:--");
  });
  it("renders a completed two-digit hour", () => {
    expect(timeWithSeparator("12", { showSeconds: false })).toBe("12:--");
    expect(timeWithSeparator("14", { showSeconds: false })).toBe("14:--");
  });
  it("fills minutes after a high leading hour digit", () => {
    expect(timeWithSeparator("93", { showSeconds: false })).toBe("09:3-");
    expect(timeWithSeparator("930", { showSeconds: false })).toBe("09:30");
  });
  it("renders a full HH:mm", () => {
    expect(timeWithSeparator("1430", { showSeconds: false })).toBe("14:30");
  });
  it("truncates digits beyond the field count", () => {
    expect(timeWithSeparator("123456", { showSeconds: false })).toBe("12:34");
  });
  it("renders with seconds", () => {
    expect(timeWithSeparator("1", { showSeconds: true })).toBe("1-:--:--");
    expect(timeWithSeparator("9", { showSeconds: true })).toBe("09:--:--");
    expect(timeWithSeparator("010203", { showSeconds: true })).toBe("01:02:03");
    expect(timeWithSeparator("120305", { showSeconds: true })).toBe("12:03:05");
  });
  it("defaults to no seconds when options are omitted", () => {
    expect(timeWithSeparator("1430")).toBe("14:30");
  });
});

describe("dateToTimeParts", () => {
  const date = new Date(Date.UTC(2020, 0, 1, 23, 30, 15));
  it("reads UTC getters when utc is true", () => {
    expect(dateToTimeParts(date, { utc: true })).toEqual({ hour: 23, minute: 30, second: 15 });
  });
  it("reads local getters when utc is false", () => {
    // Asserted against the same Date's local getters so it is timezone-independent.
    expect(dateToTimeParts(date, { utc: false })).toEqual({
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    });
  });
});

describe("normalizeValueProp", () => {
  it("passes through and normalizes a valid string", () => {
    expect(normalizeValueProp("09:30", { showSeconds: false })).toBe("09:30");
  });
  it("converts a Date using the utc flag", () => {
    const date = new Date(Date.UTC(2020, 0, 1, 23, 30, 0));
    expect(normalizeValueProp(date, { utc: true, showSeconds: false })).toBe("23:30");
  });
  it("returns undefined for invalid strings", () => {
    expect(normalizeValueProp("bad", {})).toBeUndefined();
  });
  it("returns undefined for undefined", () => {
    expect(normalizeValueProp(undefined, {})).toBeUndefined();
  });
});

describe("option builders", () => {
  it("builds 24 hours", () => {
    const hours = buildHourOptions();
    expect(hours).toHaveLength(24);
    expect(hours[0]).toBe(0);
    expect(hours[23]).toBe(23);
  });
  it("builds 60 minutes", () => {
    const minutes = buildMinuteOptions();
    expect(minutes).toHaveLength(60);
    expect(minutes[0]).toBe(0);
    expect(minutes[59]).toBe(59);
  });
  it("builds 60 seconds", () => {
    expect(buildSecondOptions()).toHaveLength(60);
  });
});

describe("index math", () => {
  it("wraps", () => {
    expect(wrapIndex(24, 24)).toBe(0);
    expect(wrapIndex(-1, 24)).toBe(23);
  });
  it("clamps", () => {
    expect(clampIndex(-5, 24)).toBe(0);
    expect(clampIndex(99, 24)).toBe(23);
    expect(clampIndex(5, 24)).toBe(5);
  });
  it("next/prev wrap at the ends", () => {
    expect(nextIndex(23, 24)).toBe(0);
    expect(prevIndex(0, 24)).toBe(23);
  });
  it("maps value <-> index and clamps out of range", () => {
    const minutes = buildMinuteOptions();
    expect(valueToIndex(32, minutes)).toBe(32);
    expect(indexToValue(32, minutes)).toBe(32);
    expect(valueToIndex(99, minutes)).toBe(59);
  });
});

describe("scroll math", () => {
  it("maps index -> scrollTop", () => {
    expect(indexToScrollTop(5, 36)).toBe(180);
  });
  it("maps scrollTop -> index by rounding and clamping", () => {
    expect(scrollTopToIndex(180, 36, 60)).toBe(5);
    expect(scrollTopToIndex(182, 36, 60)).toBe(5);
    expect(scrollTopToIndex(-10, 36, 60)).toBe(0);
    expect(scrollTopToIndex(999999, 36, 24)).toBe(23);
  });
});

describe("resolveInitialIndices", () => {
  it("resolves a HH:mm value", () => {
    expect(resolveInitialIndices("09:32", { showSeconds: false })).toEqual({
      hourIndex: 9,
      minuteIndex: 32,
      secondIndex: 0,
    });
  });
  it("resolves a HH:mm:ss value", () => {
    expect(resolveInitialIndices("23:59:59", { showSeconds: true })).toEqual({
      hourIndex: 23,
      minuteIndex: 59,
      secondIndex: 59,
    });
  });
  it("falls back to zeros for empty / invalid", () => {
    expect(resolveInitialIndices("", { showSeconds: false })).toEqual({
      hourIndex: 0,
      minuteIndex: 0,
      secondIndex: 0,
    });
    expect(resolveInitialIndices("bad", { showSeconds: false })).toEqual({
      hourIndex: 0,
      minuteIndex: 0,
      secondIndex: 0,
    });
  });
});

describe("composeValueFromIndices", () => {
  it("composes HH:mm", () => {
    expect(composeValueFromIndices({ hourIndex: 9, minuteIndex: 32, secondIndex: 0 }, { showSeconds: false })).toBe(
      "09:32",
    );
  });
  it("composes HH:mm:ss", () => {
    expect(composeValueFromIndices({ hourIndex: 23, minuteIndex: 59, secondIndex: 59 }, { showSeconds: true })).toBe(
      "23:59:59",
    );
  });
});
