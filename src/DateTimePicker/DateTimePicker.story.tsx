import { type ReactElement, useState } from "react";
import { action } from "storybook/actions";
import { expect, fn, screen, userEvent, waitFor, within } from "storybook/test";

import DateTimePicker from "./DateTimePicker";

export default {
  title: "Components/DateTimePicker",
};

// react-datepicker renders its calendar into a body-level portal, so the popper and day cells are
// reached via document queries (mirrors DatePicker/DateRange stories). Day cells are classed
// `react-datepicker__day--0DD` (zero-padded day-of-month).
const popper = () => document.querySelector(".react-datepicker-popper");
const dayCell = (day: number) =>
  document.querySelector(`.react-datepicker__day--0${String(day).padStart(2, "0")}`) as HTMLElement;

export const Default = {
  render: () => (
    <>
      <DateTimePicker labelText="Local date + time" onChange={action("changed")} />
      <DateTimePicker labelText="UTC date + time" utc onChange={action("changed")} mt="x3" />
    </>
  ),
  name: "default",
};

// A UTC instant near the top of the day shows the UTC calendar day and UTC wall-clock time — not
// the local day/time it would fall on in a behind-UTC timezone.
export const WithValue = {
  render: () => (
    <DateTimePicker labelText="Appointment (UTC)" value={new Date(Date.UTC(2026, 6, 8, 14, 30))} utc onChange={fn()} />
  ),
  name: "with value",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("the date field shows the UTC calendar day", async () => {
      await expect(canvas.getByLabelText("select a date")).toHaveValue("2026-Jul-08");
    });
    await step("the time field shows the UTC wall-clock time", async () => {
      await expect(canvas.getByTestId("scroll-time-picker-input")).toHaveValue("14:30");
    });
  },
};

// Picking a day and then a time emits a single merged instant, correct in UTC.
export const EmitsMergedDate = {
  render: () => (
    <DateTimePicker
      labelText="Pick date + time (UTC)"
      defaultValue={new Date(Date.UTC(2026, 6, 1, 0, 0))}
      utc
      onChange={emitsMergedSpy}
    />
  ),
  name: "emits a single merged UTC date",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("select day 8 from the calendar", async () => {
      await userEvent.click(canvas.getByLabelText("select a date"));
      await waitFor(() => expect(popper()).toBeInTheDocument());
      await userEvent.click(dayCell(8));
      await waitFor(() => expect(popper()).not.toBeInTheDocument());
    });
    await step("select 14:30 from the time dials", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      await userEvent.click(screen.getByTestId("scroll-time-cell-hour-14"));
      await userEvent.click(screen.getByTestId("scroll-time-cell-minute-30"));
    });
    await step("onChange last fired with the merged UTC instant", async () => {
      await waitFor(() => {
        const lastCall = emitsMergedSpy.mock.calls.at(-1);
        expect(lastCall?.[0]?.getTime()).toBe(Date.UTC(2026, 6, 8, 14, 30, 0));
      });
    });
  },
};
const emitsMergedSpy = fn();

// Controlled: a change flows up to the parent, and an external value change re-syncs both fields.
export const Controlled = {
  render: () => {
    const [value, setValue] = useState<Date | undefined>(new Date(Date.UTC(2026, 6, 8, 9, 0)));
    return (
      <>
        <DateTimePicker labelText="Controlled (UTC)" value={value} utc onChange={setValue} />
        <div data-testid="parent-value">{value ? value.toISOString() : "none"}</div>
        <button
          type="button"
          data-testid="set-external"
          onClick={() => setValue(new Date(Date.UTC(2026, 11, 25, 18, 45)))}
        >
          set 2026-12-25 18:45 UTC
        </button>
      </>
    );
  },
  name: "controlled",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("starts from the controlled value", async () => {
      await expect(canvas.getByLabelText("select a date")).toHaveValue("2026-Jul-08");
      await expect(canvas.getByTestId("scroll-time-picker-input")).toHaveValue("09:00");
    });
    await step("an external value change re-syncs both fields", async () => {
      await userEvent.click(canvas.getByTestId("set-external"));
      await waitFor(() => expect(canvas.getByLabelText("select a date")).toHaveValue("2026-Dec-25"));
      await expect(canvas.getByTestId("scroll-time-picker-input")).toHaveValue("18:45");
      await expect(canvas.getByTestId("parent-value")).toHaveTextContent("2026-12-25T18:45:00.000Z");
    });
  },
};

// Regression: locally clearing the time field must not permanently desync it from a controlled
// value. After a clear, re-applying the parent value — even the SAME value — must still show it.
export const ReSyncsTimeAfterLocalClear = {
  render: () => {
    const [value, setValue] = useState<Date | undefined>(new Date(Date.UTC(2026, 6, 8, 9, 0)));
    return (
      <>
        <DateTimePicker labelText="Controlled (UTC)" value={value} utc onChange={setValue} />
        <button
          type="button"
          data-testid="set-external"
          onClick={() => setValue(new Date(Date.UTC(2026, 11, 25, 18, 45)))}
        >
          set 2026-12-25 18:45 UTC
        </button>
      </>
    );
  },
  name: "re-syncs the time field after a local clear",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const timeInput = canvas.getByTestId("scroll-time-picker-input");
    await step("set the parent to 18:45", async () => {
      await userEvent.click(canvas.getByTestId("set-external"));
      await waitFor(() => expect(timeInput).toHaveValue("18:45"));
    });
    await step("clearing the time field snaps back to the controlled value on blur", async () => {
      await userEvent.clear(timeInput);
      await userEvent.tab();
      await expect(timeInput).toHaveValue("18:45");
    });
    await step("re-applying the same parent value keeps both fields in sync", async () => {
      await userEvent.click(canvas.getByTestId("set-external"));
      await expect(canvas.getByLabelText("select a date")).toHaveValue("2026-Dec-25");
      await expect(timeInput).toHaveValue("18:45");
    });
  },
};

// An inline onChange that also setStates must not loop (mirrors ScrollTimePicker's guard).
const inlineCallbackSpy = fn();
export const DoesNotLoopWithInlineCallback = {
  render: () => {
    const [value, setValue] = useState<Date | undefined>(new Date(Date.UTC(2026, 6, 8, 0, 0)));
    return (
      <DateTimePicker
        labelText="Inline onChange (UTC)"
        value={value}
        utc
        onChange={(next) => {
          inlineCallbackSpy(next);
          setValue(next);
        }}
      />
    );
  },
  name: "does not loop with an inline onChange",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("committing a time fires onChange once, then stays quiescent", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      await userEvent.click(screen.getByTestId("scroll-time-cell-hour-09"));
      const before = inlineCallbackSpy.mock.calls.length;
      await new Promise((resolve) => setTimeout(resolve, 200));
      const after = inlineCallbackSpy.mock.calls.length;
      expect(after - before).toBeLessThan(3);
    });
  },
};

export const WithSeconds = {
  render: () => (
    <DateTimePicker
      labelText="With seconds (UTC)"
      value={new Date(Date.UTC(2026, 6, 8, 14, 30, 45))}
      utc
      showSeconds
      onChange={fn()}
    />
  ),
  name: "with seconds",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("scroll-time-picker-input")).toHaveValue("14:30:45");
  },
};

// With a `name`, the emitted instant is mirrored into a hidden input so a native <form> submits it
// as a single ISO-8601 field — no separate date/time keys.
export const NativeFormSubmission = {
  render: () => {
    const [submitted, setSubmitted] = useState<string>("");
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          setSubmitted(String(data.get("startsAt")));
        }}
      >
        <DateTimePicker
          labelText="Starts at (UTC)"
          name="startsAt"
          defaultValue={new Date(Date.UTC(2026, 6, 8, 14, 30))}
          utc
          onChange={action("changed")}
        />
        <button type="submit" data-testid="submit">
          Submit
        </button>
        <div data-testid="submitted-value">{submitted || "none"}</div>
      </form>
    );
  },
  name: "submits a single field in a native form",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("the hidden input carries the emitted instant as an ISO string", async () => {
      await expect(canvas.getByTestId("date-time-picker-hidden-input")).toHaveValue("2026-07-08T14:30:00.000Z");
    });
    await step("FormData exposes it under a single `name` key", async () => {
      await userEvent.click(canvas.getByTestId("submit"));
      await expect(canvas.getByTestId("submitted-value")).toHaveTextContent("2026-07-08T14:30:00.000Z");
    });
  },
};

// Contrast with NativeFormSubmission (utc): the hidden input mirrors whichever wall-clock the fields
// show. With `utc` off the emitted instant is serialized from its LOCAL components with no zone
// suffix, so the field carries the literal local wall-clock (2026-07-08T14:30:00.000) — NOT that
// instant shifted to UTC (which would read 18:30Z in a UTC-4 zone). The value is timezone-independent.
export const NativeFormSubmissionLocal = {
  render: () => {
    const [submitted, setSubmitted] = useState<string>("");
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          setSubmitted(String(data.get("startsAt")));
        }}
      >
        <DateTimePicker
          labelText="Starts at (local)"
          name="startsAt"
          defaultValue={new Date(2026, 6, 8, 14, 30)}
          onChange={action("changed")}
        />
        <button type="submit" data-testid="submit-local">
          Submit
        </button>
        <div data-testid="submitted-value-local">{submitted || "none"}</div>
      </form>
    );
  },
  name: "submits the local wall-clock as an ISO string with no zone",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    // The local wall-clock digits are fixed regardless of the runner's zone, so this is not TZ-guarded.
    const localWallClock = "2026-07-08T14:30:00.000";
    await step("the fields show the picked wall-clock (14:30 on Jul 8, local)", async () => {
      await expect(canvas.getByLabelText("select a date")).toHaveValue("2026-Jul-08");
      await expect(canvas.getByTestId("scroll-time-picker-input")).toHaveValue("14:30");
    });
    await step("the hidden input carries that LOCAL wall-clock, with no zone suffix", async () => {
      const hidden = canvas.getByTestId("date-time-picker-hidden-input");
      await expect(hidden).toHaveValue(localWallClock);
      // Not the UTC form: no trailing Z, and not shifted by the browser offset.
      await expect(hidden).not.toHaveValue("2026-07-08T14:30:00.000Z");
    });
    await step("FormData exposes the same single field", async () => {
      await userEvent.click(canvas.getByTestId("submit-local"));
      await expect(canvas.getByTestId("submitted-value-local")).toHaveTextContent(localWallClock);
    });
  },
};

// A partial selection still submits a whole instant: a time with no date borrows today's calendar
// day (and, symmetrically, a date with no time would submit 00:00 — see the utils specs).
export const FillsInTodayWhenOnlyTimePicked = {
  render: () => {
    const [submitted, setSubmitted] = useState<string>("");
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          setSubmitted(String(data.get("startsAt")));
        }}
      >
        <DateTimePicker labelText="Starts at (UTC)" name="startsAt" utc onChange={action("changed")} />
        <button type="submit" data-testid="submit-partial">
          Submit
        </button>
        <div data-testid="submitted-value-partial">{submitted || "none"}</div>
      </form>
    );
  },
  name: "fills in today's date when only a time is picked",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const hidden = canvas.getByTestId("date-time-picker-hidden-input");
    // Today's UTC calendar day, computed from behavior (not by re-calling the helper).
    const pad = (n: number) => String(n).padStart(2, "0");
    const now = new Date();
    const todayUtc = `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(now.getUTCDate())}`;

    await step("with nothing selected, the field is empty", async () => {
      await expect(hidden).toHaveValue("");
    });
    await step("pick 09:30 without touching the date", async () => {
      await userEvent.click(canvas.getByTestId("scroll-time-picker-open"));
      await screen.findByTestId("scroll-time-picker-panel");
      await userEvent.click(screen.getByTestId("scroll-time-cell-hour-09"));
      await userEvent.click(screen.getByTestId("scroll-time-cell-minute-30"));
    });
    await step("the field submits today's date at the picked time", async () => {
      await waitFor(() => expect(hidden).toHaveValue(`${todayUtc}T09:30:00.000Z`));
      await expect(canvas.getByLabelText("select a date")).toHaveValue(""); // date field itself stays empty
      await userEvent.click(canvas.getByTestId("submit-partial"));
      await expect(canvas.getByTestId("submitted-value-partial")).toHaveTextContent(`${todayUtc}T09:30:00.000Z`);
    });
  },
};

export const Disabled = {
  render: () => (
    <DateTimePicker labelText="Disabled" value={new Date(Date.UTC(2026, 6, 8, 14, 30))} utc disabled onChange={fn()} />
  ),
  name: "disabled",
};

export const WithError = {
  render: () => (
    <DateTimePicker
      labelText="With error"
      value={new Date(Date.UTC(2026, 6, 8, 14, 30))}
      utc
      errorMessage="Select a valid date and time"
      onChange={fn()}
    />
  ),
  name: "with error",
};

export const Touch = {
  render: () => (
    <DateTimePicker
      labelText="Touch"
      variant="touch"
      value={new Date(Date.UTC(2026, 6, 8, 14, 30))}
      utc
      onChange={fn()}
    />
  ),
  name: "touch",
};

export const RTL = {
  render: () => (
    <DateTimePicker labelText="التاريخ والوقت" value={new Date(Date.UTC(2026, 6, 8, 14, 30))} utc onChange={fn()} />
  ),
  name: "rtl",
  decorators: [
    (Story: () => ReactElement) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
};
