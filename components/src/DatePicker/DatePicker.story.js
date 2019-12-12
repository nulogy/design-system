import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { DatePicker } from ".";

storiesOf("DatePicker", module)
  .add("default", () => (
    <DatePicker
      onChange={action("date changed")}
      onChangeInput={action("input changed")}
      inputProps={{ labelText: "Expiry Date" }}
    />
  ))
  .add("with custom date format", () => (
    <DatePicker
      selected={new Date("Fri, 01 Jan 2019")}
      dateFormat="MMMM d, yyyy"
      onChange={action("date changed")}
      onChangeInput={action("input changed")}
      inputProps={{ labelText: "Expiry Date" }}
    />
  ))
  .add("with custom placeholder", () => (
    <DatePicker
      dateFormat="MMMM d, yyyy"
      onChange={action("date changed")}
      onChangeInput={action("input changed")}
      inputProps={{ labelText: "Expiry Date", placeholder: "Month day, year" }}
    />
  ))
  .add("with error state", () => (
    <DatePicker
      dateFormat="MMMM d, yyyy"
      onChange={action("date changed")}
      onChangeInput={action("input changed")}
      inputProps={{ labelText: "Expiry Date", errorMessage: "The date is invalid" }}
    />
  ))
  .add("with error list", () => (
    <DatePicker
      dateFormat="MMMM d, yyyy"
      onChange={action("date changed")}
      onChangeInput={action("input changed")}
      inputProps={{
        labelText: "Expiry Date",
        errorList: ["The date is in the past", "The date must be after the starting date"]
      }}
    />
  ));
