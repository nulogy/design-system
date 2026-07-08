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
