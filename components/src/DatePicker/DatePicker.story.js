import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { DatePicker } from ".";

storiesOf("DatePicker", module)
  .add("default (SkipStoryshot)", () => (
    <DatePicker
      selected={new Date("2019-01-01T05:00:00.000Z")}
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Expiry Date" }}
    />
  ))
  .add("with custom date format (SkipStoryshot)", () => (
    <DatePicker
      selected={new Date("2019-01-01T05:00:00.000Z")}
      dateFormat="MMMM d, yyyy"
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Expiry Date" }}
    />
  ))
  .add("with custom placeholder (SkipStoryshot)", () => (
    <DatePicker
      dateFormat="MMMM d, yyyy"
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Expiry Date", placeholder: "Month day, year" }}
    />
  ))
  .add("with error state (SkipStoryshot)", () => (
    <DatePicker
      dateFormat="MMMM d, yyyy"
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Expiry Date" }}
      errorMessage="The date is invalid"
    />
  ))
  .add("with a minDate (SkipStoryshot)", () => (
    <DatePicker
      dateFormat="MMMM d, yyyy"
      selected={new Date("2019-07-10T05:00:00.000Z")}
      minDate={new Date("2019-07-05T05:00:00.000Z")}
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Expiry Date" }}
    />
  ))
  .add("with a maxDate (SkipStoryshot)", () => (
    <DatePicker
      dateFormat="MMMM d, yyyy"
      selected={new Date("2019-07-10T05:00:00.000Z")}
      maxDate={new Date("2019-07-15T05:00:00.000Z")}
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Expiry Date" }}
    />
  ));
