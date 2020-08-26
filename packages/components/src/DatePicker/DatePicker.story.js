import React, { useRef } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";

import { DatePicker, Button } from "../index";

const selectedDateExamples = [
  new Date("2019-01-01T05:00:00.000Z"),
  new Date("2019-02-05T05:00:00.000Z"),
  new Date("2019-03-07T05:00:00.000Z")
];

storiesOf("Components/DatePicker", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <DatePicker
      selected={select("selected", selectedDateExamples, selectedDateExamples[0], "selected")}
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Expiry Date" }}
    />
  ))
  .add("with custom date format", () => (
    <DatePicker
      selected={select("selected", selectedDateExamples, selectedDateExamples[0], "selected")}
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
  .add("with min and max date", () => (
    <DatePicker
      selected={new Date("2019-01-05T05:00:00.000Z")}
      minDate={new Date("2019-01-03T05:00:00.000Z")}
      maxDate={new Date("2019-01-10T05:00:00.000Z")}
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Expiry Date" }}
    />
  ))
  .add("disable flipping", () => (
    <DatePicker
      selected={select("selected", selectedDateExamples, selectedDateExamples[0], "selected")}
      onChange={action("date changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Expiry Date" }}
      disableFlipping={boolean("disableFlipping", true)}
    />
  ))
  .add("using ref to control focus", () => {
    const ref = useRef(null);
    const handleClick = () => {
      ref.current.setFocus();
    };

    return (
      <>
        <DatePicker
          dateFormat="MMMM d, yyyy"
          onChange={action("date changed")}
          onInputChange={action("input changed")}
          inputProps={{ labelText: "Expiry Date" }}
          ref={ref}
        />
        <Button onClick={handleClick}>Focus the Toggle</Button>
      </>
    );
  });
