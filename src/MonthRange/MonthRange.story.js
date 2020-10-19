import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import MonthRange from "./MonthRange";

export default {
  title: "Components/MonthRange"
};

export const Default = () => (
  <MonthRange
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
  />
);

Default.story = {
  name: "default"
};

export const DefaultStartAndEndDate = () => (
  <MonthRange
    defaultStartDate={new Date("2019-07-05T05:00:00.000Z")}
    defaultEndDate={new Date("2019-09-10T05:00:00.000Z")}
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
  />
);

DefaultStartAndEndDate.story = {
  name: "default start and end date"
};

export const DisabledRangeValidation = () => (
  <MonthRange
    disableRangeValidation
    defaultEndDate={new Date("2019-07-05T05:00:00.000Z")}
    defaultStartDate={new Date("2019-09-10T05:00:00.000Z")}
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
  />
);

DisabledRangeValidation.story = {
  name: "disabled range validation"
};

export const WithCustomError = () => (
  <MonthRange
    errorMessage="This range conflicts with another range"
    defaultStartDate={new Date("2019-07-05T05:00:00.000Z")}
    defaultEndDate={new Date("2019-09-10T05:00:00.000Z")}
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
  />
);

WithCustomError.story = {
  name: "with custom error"
};

export const CustomizingInputProps = () => (
  <MonthRange
    startDateInputProps={{ placeholder: "From (Mon YYYY)" }}
    endDateInputProps={{ placeholder: "To (Mon YYYY)" }}
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
  />
);

CustomizingInputProps.story = {
  name: "customizing input props"
};

export const IndividualInputError = () => (
  <MonthRange
    startDateErrorMessage="Start date is required"
    startDateInputProps={{ required: true }}
    defaultEndDate={new Date("2019-09-10T05:00:00.000Z")}
    onRangeChange={action("range changed")}
    onStartDateChange={action("start date changed")}
    onEndDateChange={action("end date changed")}
  />
);

IndividualInputError.story = {
  name: "individual input error"
};
