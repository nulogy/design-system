import React, { useRef } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import DateRange from "./DateRange";
import { Button, Box, Flex, PrimaryButton } from "../";

storiesOf("Components/DateRange", module)
  .add("default", () => (
    <DateRange
      onRangeChange={action("range changed")}
      onStartDateChange={action("start date changed")}
      onEndDateChange={action("end date changed")}
    />
  ))
  .add("default start and end date", () => (
    <DateRange
      defaultStartDate={new Date("2019-01-01T05:00:00.000Z")}
      defaultEndDate={new Date("2019-01-05T05:00:00.000Z")}
      onRangeChange={action("range changed")}
      onStartDateChange={action("start date changed")}
      onEndDateChange={action("end date changed")}
    />
  ))
  .add("disabled range validation", () => (
    <DateRange
      disableRangeValidation
      defaultEndDate={new Date("2019-07-05T05:00:00.000Z")}
      defaultStartDate={new Date("2019-09-10T05:00:00.000Z")}
      onRangeChange={action("range changed")}
      onStartDateChange={action("start date changed")}
      onEndDateChange={action("end date changed")}
    />
  ))
  .add("with custom error", () => (
    <DateRange
      errorMessage="This range conflicts with another range"
      defaultStartDate={new Date("2019-07-05T05:00:00.000Z")}
      defaultEndDate={new Date("2019-09-10T05:00:00.000Z")}
      onRangeChange={action("range changed")}
      onStartDateChange={action("start date changed")}
      onEndDateChange={action("end date changed")}
    />
  ))
  .add("customizing input props", () => (
    <DateRange
      startDateInputProps={{ placeholder: "From (Mon YYYY)" }}
      endDateInputProps={{ placeholder: "To (Mon YYYY)" }}
      onRangeChange={action("range changed")}
      onStartDateChange={action("start date changed")}
      onEndDateChange={action("end date changed")}
    />
  ))
  .add("individual input error", () => (
    <DateRange
      startDateErrorMessage="Start date is required"
      startDateInputProps={{ required: true }}
      defaultEndDate={new Date("2019-09-10T05:00:00.000Z")}
      onRangeChange={action("range changed")}
      onStartDateChange={action("start date changed")}
      onEndDateChange={action("end date changed")}
    />
  ))
  .add("with times", () => (
    <DateRange
      defaultStartDate={new Date("2019-01-01T05:00:00.000Z")}
      defaultEndDate={new Date("2019-01-05T05:00:00.000Z")}
      onRangeChange={action("range changed")}
      onStartDateChange={action("start date changed")}
      onEndDateChange={action("end date changed")}
      showTimes
    />
  ))
  .add("with default start and end times", () => (
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
  ))
  .add("with time error", () => (
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
  ))
  .add("using ref to control focus", () => {
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
  });
