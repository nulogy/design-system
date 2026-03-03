import React, { useRef } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { action } from "storybook/actions";

import { Button, Box, Flex, PrimaryButton } from "..";
import DateRange from "./DateRange";

export default {
  title: "Components/DateRange",
};

export const Default = () => (
  <DateRange
    p="x3"
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
  />
);

export const DefaultStartAndEndDate = {
  render: () => (
    <DateRange
      defaultStartDate={new Date("2019-01-01T05:00:00.000Z")}
      defaultEndDate={new Date("2019-01-05T05:00:00.000Z")}
      onRangeChange={action("range changed")}
      onStartDateChange={action("start date changed")}
      onEndDateChange={action("end date changed")}
    />
  ),
  name: "default start and end date",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("shows start date marker in calendar when end date input is clicked", async () => {
      await userEvent.click(canvas.getByLabelText("Select an end date"));
      await waitFor(() => expect(document.querySelector(".nds-datepicker-day--start-date")).toBeInTheDocument());
    });
    await step("shows an error when start date is set after end date", async () => {
      await userEvent.click(canvas.getByLabelText("Select a start date"));
      const day8 = document.querySelector(".react-datepicker__day--008") as HTMLElement;
      await userEvent.click(day8);
      await waitFor(() => expect(canvas.getByText("End date is before start date")).toBeVisible());
    });
  },
};

export const DisabledRangeValidation = () => (
  <DateRange
    disableRangeValidation
    defaultEndDate={new Date("2019-07-05T05:00:00.000Z")}
    defaultStartDate={new Date("2019-09-10T05:00:00.000Z")}
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
  />
);

export const WithCustomError = () => (
  <DateRange
    errorMessage="This range conflicts with another range"
    defaultStartDate={new Date("2019-07-05T05:00:00.000Z")}
    defaultEndDate={new Date("2019-09-10T05:00:00.000Z")}
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
  />
);

export const CustomizingInputProps = () => (
  <DateRange
    startDateInputProps={{
      placeholder: "From (Mon YYYY)",
      inputWidth: "280px",
      labelText: "From",
      error: true,
    }}
    endDateInputProps={{
      placeholder: "To (Mon YYYY)",
      inputWidth: "260px",
      labelText: "To",
    }}
    labelProps={{ labelText: "" }}
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
    errorMessage="Start date is required."
  />
);

export const Disabled = () => {
  const NON_BREAKING_SPACE = "\u00A0";

  return (
    <DateRange
      startDateInputProps={{
        placeholder: "From (Mon YYYY)",
        labelText: "From",
        disabled: true,
      }}
      endDateInputProps={{
        placeholder: "To (Mon YYYY)",
        labelText: "To",
        disabled: true,
      }}
      onRangeChange={action("range changed")}
      onStartDateChange={action("start date changed")}
      onEndDateChange={action("end date changed")}
      labelProps={{ labelText: "" }}
      showTimes
      endTimeProps={{
        labelText: NON_BREAKING_SPACE,
        disabled: true,
      }}
      startTimeProps={{
        labelText: NON_BREAKING_SPACE,
        disabled: true,
      }}
    />
  );
};

export const IndividualInputError = () => (
  <DateRange
    errorMessage="Start date is required"
    startDateInputProps={{ required: true }}
    defaultEndDate={new Date("2019-09-10T05:00:00.000Z")}
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
  />
);

export const WithTimes = {
  render: () => (
    <DateRange
      defaultStartDate={new Date("2019-01-01T05:00:00.000Z")}
      defaultEndDate={new Date("2019-01-05T05:00:00.000Z")}
      onRangeChange={action("range changed")}
      onStartDateChange={action("start date changed")}
      onEndDateChange={action("end date changed")}
      showTimes
    />
  ),
  name: "with times",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("shows an error when start time is after end time on the same day", async () => {
      await userEvent.click(canvas.getByLabelText("Select a start date"));
      const day8Start = document.querySelector(".react-datepicker__day--008") as HTMLElement;
      await userEvent.click(day8Start);
      await userEvent.click(canvas.getByLabelText("Select a start time"));
      const startOptions = within(canvas.getByTestId("daterange-start-time")).getAllByTestId(/select-option/);
      await userEvent.click(startOptions[4]);
      await userEvent.click(canvas.getByLabelText("Select an end time"));
      const endOptions = within(canvas.getByTestId("daterange-end-time")).getAllByTestId(/select-option/);
      await userEvent.click(endOptions[3]);
      await userEvent.click(canvas.getByLabelText("Select an end date"));
      const day8End = document.querySelector(".react-datepicker__day--008") as HTMLElement;
      await userEvent.click(day8End);
      await waitFor(() => expect(canvas.getByText("End time is before start time")).toBeVisible());
    });
  },
};

export const CustomizingInputPropsWithTimes = () => (
  <DateRange
    startDateInputProps={{ placeholder: "From", inputWidth: "280px" }}
    endDateInputProps={{ placeholder: "To", inputWidth: "280px" }}
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
    showTimes
  />
);

export const WithDefaultStartAndEndTimes = () => (
  <DateRange
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
    defaultStartDate={new Date("2019-07-05T05:00:00.000Z")}
    defaultEndDate={new Date("2019-09-10T05:00:00.000Z")}
    showTimes
    defaultStartTime="03:30"
    defaultEndTime="13:30"
  />
);

export const WithTimeError = () => (
  <DateRange
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
    defaultStartDate={new Date("2019-07-05T05:00:00.000Z")}
    defaultEndDate={new Date("2019-07-05T05:00:00.000Z")}
    showTimes
    defaultStartTime="13:30"
    defaultEndTime="10:30"
  />
);

export const UsingRefToControlFocus = () => {
  const ref = useRef(null);
  const focusStartDate = () => {
    ref.current.dateRef1.focus();
  };
  const focusEndDate = () => {
    ref.current.dateRef2.focus();
  };
  const focusStartTime = () => {
    ref.current.timeRef1.focus();
  };
  const focusEndTime = () => {
    ref.current.timeRef2.focus();
  };

  return (
    <Flex flexDirection="column">
      <Box>
        <DateRange
          onRangeChange={action("range changed")}
          onStartDateChange={action("start date changed")}
          onEndDateChange={action("end date changed")}
          defaultStartDate={new Date("2019-07-05T05:00:00.000Z")}
          defaultEndDate={new Date("2019-09-10T05:00:00.000Z")}
          showTimes
          defaultStartTime="03:30"
          defaultEndTime="13:30"
          ref={ref}
        />
      </Box>
      <Flex>
        <Button onClick={focusStartDate}>Focus Start Date</Button>
        <PrimaryButton onClick={focusStartTime} ml="x2">
          Focus Start Time
        </PrimaryButton>
        <Button onClick={focusEndTime} ml="x2">
          Focus End Time
        </Button>
        <PrimaryButton onClick={focusEndDate} ml="x2">
          Focus End Date
        </PrimaryButton>
      </Flex>
    </Flex>
  );
};
