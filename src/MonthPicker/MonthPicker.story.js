import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import { MonthPicker } from ".";

export default {
  title: "Components/MonthPicker",
};

export const Default = () => (
  <MonthPicker
    selected={new Date("2019-01-01T05:00:00.000Z")}
    onChange={action("date changed")}
    onInputChange={action("input changed")}
    inputProps={{ labelText: "Month" }}
  />
);

Default.story = {
  name: "default",
};

export const WithCustomPlaceholder = () => (
  <MonthPicker
    onChange={action("date changed")}
    onInputChange={action("input changed")}
    inputProps={{ labelText: "Month and Year", placeholder: "Month, year" }}
  />
);

WithCustomPlaceholder.story = {
  name: "with custom placeholder",
};

export const WithErrorState = () => (
  <MonthPicker
    dateFormat="yyyy MMM"
    onChange={action("date changed")}
    onInputChange={action("input changed")}
    inputProps={{ labelText: "Month and Year" }}
    errorMessage="The date is invalid"
  />
);

WithErrorState.story = {
  name: "with error state",
};

export const WithAMinAndMaxDate = () => (
  <MonthPicker
    selected={new Date("2019-07-10T05:00:00.000Z")}
    minDate={new Date("2019-07-01T05:00:00.000Z")}
    maxDate={new Date("2019-12-01T05:00:00.000Z")}
    onChange={action("date changed")}
    onInputChange={action("input changed")}
    inputProps={{ labelText: "Month and Year" }}
  />
);

WithAMinAndMaxDate.story = {
  name: "with a min and max date",
};
