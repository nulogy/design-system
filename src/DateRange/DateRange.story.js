import React, { useRef } from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import DateRange from "./DateRange";
import { Button, Box, Flex, PrimaryButton } from "../";

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

Default.story = {
  name: "default",
};

export const DefaultStartAndEndDate = () => (
  <DateRange
    defaultStartDate={new Date("2019-01-01T05:00:00.000Z")}
    defaultEndDate={new Date("2019-01-05T05:00:00.000Z")}
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
  />
);

DefaultStartAndEndDate.story = {
  name: "default start and end date",
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

DisabledRangeValidation.story = {
  name: "disabled range validation",
};

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

WithCustomError.story = {
  name: "with custom error",
};

export const CustomizingInputProps = () => (
  <DateRange
    startDateInputProps={{ placeholder: "From (Mon YYYY)" }}
    endDateInputProps={{ placeholder: "To (Mon YYYY)" }}
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
  />
);

CustomizingInputProps.story = {
  name: "customizing input props",
};

export const IndividualInputError = () => (
  <DateRange
    startDateErrorMessage="Start date is required"
    startDateInputProps={{ required: true }}
    defaultEndDate={new Date("2019-09-10T05:00:00.000Z")}
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
  />
);

IndividualInputError.story = {
  name: "individual input error",
};

export const WithTimes = () => (
  <DateRange
    defaultStartDate={new Date("2019-01-01T05:00:00.000Z")}
    defaultEndDate={new Date("2019-01-05T05:00:00.000Z")}
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
    showTimes
  />
);

WithTimes.story = {
  name: "with times",
};

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

WithDefaultStartAndEndTimes.story = {
  name: "with default start and end times",
};

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

WithTimeError.story = {
  name: "with time error",
};

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

UsingRefToControlFocus.story = {
  name: "using ref to control focus",
};
