import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { MonthPicker } from ".";

storiesOf("MonthPicker", module)
  .add("default (SkipStoryshot)", () => (
    <MonthPicker
      selected={new Date("2019-01-01T05:00:00.000Z")}
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Month" }}
    />
  ))
  .add("with custom placeholder (SkipStoryshot)", () => (
    <MonthPicker
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Month and Year", placeholder: "Month, year" }}
    />
  ))
  .add("with error state (SkipStoryshot)", () => (
    <MonthPicker
      dateFormat="yyyy MMM"
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Month and Year" }}
      errorMessage="The date is invalid"
    />
  ))
  .add("with a min and max date(SkipStoryshot)", () => (
    <MonthPicker
      selected={new Date("2019-07-10T05:00:00.000Z")}
      minDate={new Date("2019-07-05T05:00:00.000Z")}
      maxDate={new Date("2019-12-05T05:00:00.000Z")}
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Month and Year" }}
    />
  ));
