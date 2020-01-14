import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import DateRange from "./DateRange";

storiesOf("DateRange", module)
  .add("default", () => (
    <DateRange
      onRangeChange={action("range changed")}
      onStartDateChange={action("start date changed")}
      onEndDateChange={action("end date changed")}
    />
  ))
  .add("default start and end date", () => (
    <DateRange
      defaultStartDate={new Date("2019-07-05T05:00:00.000Z")}
      defaultEndDate={new Date("2019-09-10T05:00:00.000Z")}
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
  ));
