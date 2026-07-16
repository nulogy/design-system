import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef } from "react";
import { action } from "storybook/actions";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Button } from "../..";
import { DatePicker } from "../index";

const selectedDateExamples = [
  new Date("2019-01-01T05:00:00.000Z"),
  new Date("2019-02-05T05:00:00.000Z"),
  new Date("2019-03-07T05:00:00.000Z"),
];

export default {
  title: "Components/DatePickers/DatePicker",
  component: DatePicker,
} satisfies Meta<typeof DatePicker>;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    selected: selectedDateExamples[0],
    onChange: action("date changed"),
    onFocus: action("date selector focused"),
    onBlur: action("date selector blurred"),
    onInputChange: action("input changed"),
    inputProps: { labelText: "Expiry Date" },
  },
  argTypes: {
    selected: {
      control: { type: "select" },
      options: selectedDateExamples,
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("has the correct date selected by default", async () => {
      await expect(canvas.getByLabelText("select a date")).toHaveValue("2019-Jan-01");
    });
    await step("can open a calendar on click", async () => {
      expect(document.querySelector(".react-datepicker-popper")).toBeNull();
      await userEvent.click(canvas.getByLabelText("select a date"));
      await waitFor(() => expect(document.querySelector(".react-datepicker-popper")).toBeInTheDocument());
    });
    await step("closes the calendar after selecting a date", async () => {
      const day2 = document.querySelector(".react-datepicker__day--002") as HTMLElement;
      await userEvent.click(day2);
      await waitFor(() => expect(document.querySelector(".react-datepicker-popper")).not.toBeInTheDocument());
    });
  },
};

// Opens the calendar and leaves it open so Chromatic captures the open popper.
// The `Default` story closes the calendar (it selects a date), so no snapshot
// ever covered the open calendar — which is how a font regression in the
// portaled calendar (see DatePickers/shared/styles.ts) slipped through.
export const OpenCalendar: Story = {
  args: {
    selected: selectedDateExamples[0],
    inputProps: { labelText: "Expiry Date" },
  },
  parameters: {
    // Give the portaled popper a beat to position before Chromatic snapshots.
    chromatic: { delay: 300 },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText("select a date"));
    const calendar = await waitFor(() => {
      const el = document.querySelector(".react-datepicker");
      expect(el).toBeInTheDocument();
      return el as HTMLElement;
    });
    // Regression guard: the calendar renders in a portal on document.body, outside
    // NDSProvider's font wrapper, so it must declare the NDS font itself. Without it
    // the calendar falls back to the browser default (serif).
    await expect(getComputedStyle(calendar).fontFamily).toContain("IBM Plex Sans");
  },
};

export const WithCustomDateFormat: Story = {
  args: {
    selected: selectedDateExamples[0],
    dateFormat: "MMMM d, yyyy",
    onChange: action("date changed"),
    onFocus: action("date selector focused"),
    onBlur: action("date selector blurred"),
    onInputChange: action("input changed"),
    inputProps: { labelText: "Expiry Date" },
  },
  argTypes: {
    selected: {
      control: { type: "select" },
      options: selectedDateExamples,
    },
  },
};

export const WithCustomPlaceholder = () => (
  <DatePicker
    dateFormat="MMMM d, yyyy"
    onFocus={action("date selector focused")}
    onBlur={action("date selector blurred")}
    onChange={action("date changed")}
    onInputChange={action("input changed")}
    inputProps={{ labelText: "Expiry Date", placeholder: "Month day, year" }}
  />
);

export const WithErrorState = () => (
  <DatePicker
    dateFormat="MMMM d, yyyy"
    onFocus={action("date selector focused")}
    onBlur={action("date selector blurred")}
    onChange={action("date changed")}
    onInputChange={action("input changed")}
    inputProps={{ labelText: "Expiry Date" }}
    errorMessage="The date is invalid"
  />
);

export const WithMinAndMaxDate = {
  render: () => (
    <DatePicker
      selected={new Date("2019-01-05T05:00:00.000Z")}
      minDate={new Date("2019-01-03T05:00:00.000Z")}
      maxDate={new Date("2019-01-10T05:00:00.000Z")}
      onFocus={action("date selector focused")}
      onBlur={action("date selector blurred")}
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Expiry Date" }}
    />
  ),
  name: "with min and max date",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("has the correct date selected", async () => {
      await expect(canvas.getByLabelText("select a date")).toHaveValue("2019-Jan-05");
    });
    await step("cannot navigate past the max date with arrow keys", async () => {
      const input = canvas.getByLabelText("select a date");
      await userEvent.click(input);
      for (let i = 0; i < 6; i++) {
        await userEvent.keyboard("{ArrowUp}");
      }
      await expect(input).toHaveValue("2019-Jan-10");
    });
    await step("cannot navigate past the min date with arrow keys", async () => {
      const input = canvas.getByLabelText("select a date");
      for (let i = 0; i < 10; i++) {
        await userEvent.keyboard("{ArrowDown}");
      }
      await expect(input).toHaveValue("2019-Jan-03");
    });
  },
};

export const DisableFlipping: Story = {
  args: {
    selected: selectedDateExamples[0],
    onBlur: action("date selector blurred"),
    onFocus: action("date selector focused"),
    onChange: action("date changed"),
    onInputChange: action("input changed"),
    inputProps: { labelText: "Expiry Date" },
    disableFlipping: true,
  },
  argTypes: {
    selected: {
      control: { type: "select" },
      options: selectedDateExamples,
    },
    disableFlipping: {
      control: { type: "boolean" },
    },
  },
};

export const UsingRefToControlFocus = () => {
  const ref = useRef(null);
  const handleClick = () => {
    ref.current.setFocus();
  };

  return (
    <>
      <DatePicker
        dateFormat="MMMM d, yyyy"
        onChange={action("date changed")}
        onFocus={action("date selector focused")}
        onBlur={action("date selector blurred")}
        onInputChange={action("input changed")}
        inputProps={{ labelText: "Expiry Date" }}
        ref={ref}
      />
      <Button onClick={handleClick}>Focus the Toggle</Button>
    </>
  );
};
