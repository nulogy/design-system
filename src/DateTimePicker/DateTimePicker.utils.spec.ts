import { describe, expect, it } from "vitest";

import { combineDateAndTime, splitDateTime } from "./DateTimePicker.utils";

describe("splitDateTime", () => {
  it("returns empty parts for undefined, null, or an invalid Date", () => {
    expect(splitDateTime(undefined)).toEqual({ dateForPicker: undefined, time: "" });
    expect(splitDateTime(null)).toEqual({ dateForPicker: undefined, time: "" });
    expect(splitDateTime(new Date("nonsense"))).toEqual({ dateForPicker: undefined, time: "" });
  });

  it("reads the UTC wall-clock day and time near midnight (does not roll into an adjacent day)", () => {
    // 23:30 UTC on 2020-01-01 — in most western timezones this is still the previous local day,
    // so the proxy day must be built from the UTC fields, not the local ones.
    const { dateForPicker, time } = splitDateTime(new Date(Date.UTC(2020, 0, 1, 23, 30)), { utc: true });
    expect(dateForPicker?.getFullYear()).toBe(2020);
    expect(dateForPicker?.getMonth()).toBe(0);
    expect(dateForPicker?.getDate()).toBe(1);
    expect(time).toBe("23:30");
  });

  it("reads the local wall-clock time in local mode", () => {
    const local = new Date(2020, 0, 1, 9, 5);
    const { dateForPicker, time } = splitDateTime(local, { utc: false });
    expect(dateForPicker).toBe(local); // local mode hands the instant straight through
    expect(time).toBe("09:05");
  });

  it("includes seconds only when showSeconds is set", () => {
    const value = new Date(Date.UTC(2020, 0, 1, 8, 7, 6));
    expect(splitDateTime(value, { utc: true }).time).toBe("08:07");
    expect(splitDateTime(value, { utc: true, showSeconds: true }).time).toBe("08:07:06");
  });
});

describe("combineDateAndTime", () => {
  it("returns undefined when there is no day", () => {
    expect(combineDateAndTime(undefined, "09:30")).toBeUndefined();
    expect(combineDateAndTime(null, "09:30")).toBeUndefined();
    expect(combineDateAndTime(new Date("nonsense"), "09:30")).toBeUndefined();
  });

  it("treats a missing or unparseable time as 00:00", () => {
    // The day comes from react-datepicker, whose `selected` Date carries the calendar day in its
    // LOCAL fields — so construct it locally here, not via Date.UTC.
    const day = new Date(2020, 0, 1);
    expect(combineDateAndTime(day, "", { utc: true }).getTime()).toBe(Date.UTC(2020, 0, 1, 0, 0, 0));
    expect(combineDateAndTime(day, "garbage", { utc: true }).getTime()).toBe(Date.UTC(2020, 0, 1, 0, 0, 0));
  });

  it("ignores seconds unless showSeconds is set", () => {
    const day = new Date(2020, 0, 1);
    expect(combineDateAndTime(day, "08:07:06", { showSeconds: false }).getSeconds()).toBe(0);
    expect(combineDateAndTime(day, "08:07:06", { showSeconds: true }).getSeconds()).toBe(6);
  });
});

describe("split/combine round-trips", () => {
  it("round-trips a UTC instant back to the identical instant", () => {
    const original = new Date(Date.UTC(2026, 6, 8, 14, 30));
    const { dateForPicker, time } = splitDateTime(original, { utc: true });
    const combined = combineDateAndTime(dateForPicker, time, { utc: true });
    expect(combined.getTime()).toBe(original.getTime());
  });

  it("round-trips a UTC instant near midnight (the day-boundary case)", () => {
    const original = new Date(Date.UTC(2020, 0, 1, 23, 30));
    const { dateForPicker, time } = splitDateTime(original, { utc: true });
    const combined = combineDateAndTime(dateForPicker, time, { utc: true });
    expect(combined.getTime()).toBe(original.getTime());
  });

  it("round-trips a local instant back to the identical instant", () => {
    const original = new Date(2026, 6, 8, 14, 30);
    const { dateForPicker, time } = splitDateTime(original, { utc: false });
    const combined = combineDateAndTime(dateForPicker, time, { utc: false });
    expect(combined.getTime()).toBe(original.getTime());
  });

  it("round-trips with seconds preserved when showSeconds is set", () => {
    const original = new Date(Date.UTC(2026, 6, 8, 14, 30, 45));
    const opts = { utc: true, showSeconds: true };
    const { dateForPicker, time } = splitDateTime(original, opts);
    const combined = combineDateAndTime(dateForPicker, time, opts);
    expect(combined.getTime()).toBe(original.getTime());
  });
});
