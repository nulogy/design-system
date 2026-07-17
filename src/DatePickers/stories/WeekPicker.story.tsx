import { format } from "date-fns";
import { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Text } from "../../Type";
import WeekPicker from "../WeekPicker";
export default {
  title: "Components/DatePickers/WeekPicker",
};

export const Default = {
  // Fixed `selected` date so the play opens the calendar to a deterministic month.
  // Without it `openToDate` is undefined and the calendar defaults to `new Date()`,
  // so the open-calendar snapshot would drift every month.
  render: () => <WeekPicker inputProps={{ labelText: "Expiry Date" }} selected={new Date(2025, 0, 15)} />,
  name: "Default",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("can open a calendar on click", async () => {
      expect(document.querySelector(".react-datepicker-popper")).toBeNull();
      await userEvent.click(canvas.getByLabelText("select a date"));
      await waitFor(() => expect(document.querySelector(".react-datepicker-popper")).toBeInTheDocument());
    });
    await step("shows week numbers in the calendar", async () => {
      expect(document.querySelector(".react-datepicker__week-number")).toBeTruthy();
    });
    await step("renders the calendar with NDS styles applied", async () => {
      // Regression guard: WeekPicker renders both DatePickerStyles' base layout and
      // its week overrides via a single global style. If the two ever split back into
      // colliding `createGlobalStyle`s (or the calendar stops portaling), the base
      // rules drop and the calendar falls back to the browser default serif font.
      const calendar = document.querySelector(".react-datepicker");
      expect(getComputedStyle(calendar).fontFamily).toContain("IBM Plex Sans");
    });
  },
};

export const WithError = () => (
  <WeekPicker inputProps={{ labelText: "Week Selection" }} errorMessage="Please select a valid week" />
);

export const WithMinMaxDates = {
  render: () => (
    <>
      <Text mb="x2">If a min or a max day falls in the middle of the week, no day in the week will be selectable.</Text>
      <WeekPicker
        inputProps={{ labelText: "Select Week" }}
        minDate={new Date("01/15/2025")}
        maxDate={new Date("01/29/2025")}
      />
    </>
  ),
  name: "with min max dates",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("disables dates outside min/max range", async () => {
      await userEvent.click(canvas.getByLabelText("select a date"));
      await waitFor(() => expect(document.querySelector(".react-datepicker-popper")).toBeInTheDocument());
      expect(document.querySelector(".react-datepicker__day--disabled")).toBeTruthy();
    });
  },
};

export const WithCustomDateFormat = () => (
  <WeekPicker inputProps={{ labelText: "Week", inputWidth: "320px" }} dateFormat="'Week starting' dd/MM/yyyy" />
);

export const WithPreselectedDate = () => (
  <WeekPicker inputProps={{ labelText: "Selected Week" }} selected={new Date("01/21/2025")} />
);

export const WithCustomLocale = {
  // Fixed `selected` date so the opened calendar shows a deterministic month
  // rather than drifting with `new Date()` (the play leaves the calendar open).
  render: () => <WeekPicker inputProps={{ labelText: "Semaine" }} locale="fr_FR" selected={new Date(2025, 0, 15)} />,
  name: "with custom locale",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("displays weekdays in French", async () => {
      await userEvent.click(canvas.getByLabelText("select a date"));
      await waitFor(() => expect(document.querySelector(".react-datepicker-popper")).toBeInTheDocument());
      const dayNames = document.querySelectorAll(".react-datepicker__day-name");
      expect(dayNames[1].textContent).toContain("lu");
    });
  },
};

export const Disabled = {
  render: () => (
    <WeekPicker
      inputProps={{
        labelText: "Week Selection",
        disabled: true,
      }}
    />
  ),
  name: "disabled",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("has a disabled input", async () => {
      await expect(canvas.getByLabelText("select a date")).toBeDisabled();
    });
    await step("cannot open the calendar when disabled", async () => {
      await userEvent.click(canvas.getByLabelText("select a date"), {
        pointerEventsCheck: 0,
      });
      expect(document.querySelector(".react-datepicker-popper")).toBeNull();
    });
  },
};

export const AdvancedUsage = () => {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleWeekChange = (weekRange) => {
    setSelectedWeek(weekRange);
    setHasError(false);

    // Format for display: "Week 12, 2023 (Mar 20 - Mar 26)"
    setInputValue(
      `Week ${weekRange.weekNumber}, ${weekRange.year} (${format(weekRange.startDate, "MM/dd/yyyy")} - ${format(
        weekRange.endDate,
        "MM/dd/yyyy",
      )})`,
    );
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    // Custom validation could be implemented here
  };

  return (
    <WeekPicker
      selected={selectedWeek?.startDate}
      onChange={handleWeekChange}
      onInputChange={handleInputChange}
      minDate={new Date(2023, 0, 1)}
      maxDate={new Date()}
      errorMessage={hasError ? "Please select a valid week" : undefined}
      inputProps={{
        value: inputValue,
        inputWidth: "560px",
        placeholder: "Select a week",
        labelText: "Reporting Week",
        requirementText: "(Required)",
        helpText: "Select the week for your weekly report submission",
      }}
    />
  );
};
