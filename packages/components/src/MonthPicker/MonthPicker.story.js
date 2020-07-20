import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import { MonthPicker } from ".";

storiesOf("MonthPicker", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <MonthPicker
      selected={new Date("2019-01-01T05:00:00.000Z")}
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Month" }}
    />
  ))
  .add("with custom placeholder", () => (
    <MonthPicker
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Month and Year", placeholder: "Month, year" }}
    />
  ))
  .add("with error state", () => (
    <MonthPicker
      dateFormat="yyyy MMM"
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Month and Year" }}
      errorMessage="The date is invalid"
    />
  ))
  .add("with a min and max date", () => (
    <MonthPicker
      selected={new Date("2019-07-10T05:00:00.000Z")}
      minDate={new Date("2019-07-01T05:00:00.000Z")}
      maxDate={new Date("2019-12-01T05:00:00.000Z")}
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Month and Year" }}
    />
  ));
