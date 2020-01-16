import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, select } from "@storybook/addon-knobs";

import { DatePicker } from ".";
import { supportedDateLocales } from "../utils/datePickerLocales";

storiesOf("DatePicker", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <DatePicker
      selected={new Date("2019-01-01T05:00:00.000Z")}
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Expiry Date" }}
    />
  ))
  .add("with custom date format", () => (
    <DatePicker
      selected={new Date("2019-01-01T05:00:00.000Z")}
      dateFormat="MMMM d, yyyy"
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Expiry Date" }}
    />
  ))
  .add("with custom placeholder", () => (
    <DatePicker
      dateFormat="MMMM d, yyyy"
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Expiry Date", placeholder: "Month day, year" }}
    />
  ))
  .add("with error state", () => (
    <DatePicker
      dateFormat="MMMM d, yyyy"
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Expiry Date" }}
      errorMessage="The date is invalid"
    />
  ))
  .add("with a minDate", () => (
    <DatePicker
      dateFormat="MMMM d, yyyy"
      selected={new Date("2019-07-10T05:00:00.000Z")}
      minDate={new Date("2019-07-05T05:00:00.000Z")}
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Expiry Date" }}
    />
  ))
  .add("with a maxDate", () => (
    <DatePicker
      dateFormat="MMMM d, yyyy"
      selected={new Date("2019-07-10T05:00:00.000Z")}
      maxDate={new Date("2019-07-15T05:00:00.000Z")}
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Expiry Date" }}
    />
  ))
  .add("with custom locale", () => (
    <DatePicker
      selected={new Date("2019-07-10T05:00:00.000Z")}
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Expiry Date" }}
      locale={select("locale", Object.keys(supportedDateLocales), "pl", "locales")}
    />
  ));
