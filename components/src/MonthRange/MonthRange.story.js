import React from "react";
import { storiesOf } from "@storybook/react";
import MonthRange from "./MonthRange";

storiesOf("MonthRange", module)
  .add("default (SkipStoryshot)", () => <MonthRange />)
  .add("default start and end date (SkipStoryshot)", () => (
    <MonthRange
      defaultStartDate={new Date("2019-07-05T05:00:00.000Z")}
      defaultEndDate={new Date("2019-09-10T05:00:00.000Z")}
    />
  ))
  .add("disabled range validation (SkipStoryshot)", () => (
    <MonthRange
      disableRangeValidation
      defaultEndDate={new Date("2019-07-05T05:00:00.000Z")}
      defaultStartDate={new Date("2019-09-10T05:00:00.000Z")}
    />
  ))
  .add("with custom error (SkipStoryshot)", () => (
    <MonthRange
      errorMessage="This range conflicts with another range"
      defaultStartDate={new Date("2019-07-05T05:00:00.000Z")}
      defaultEndDate={new Date("2019-09-10T05:00:00.000Z")}
    />
  ))
  .add("customizing input props (SkipStoryshot)", () => (
    <MonthRange
      startDateInputProps={{ placeholder: "From (Mon YYYY)" }}
      endDateInputProps={{ placeholder: "To (Mon YYYY)" }}
    />
  ))
  .add("individual input error (SkipStoryshot)", () => (
    <MonthRange
      startDateErrorMessage="Start date is required"
      startDateInputProps={{ required: true }}
      defaultEndDate={new Date("2019-09-10T05:00:00.000Z")}
    />
  ));
