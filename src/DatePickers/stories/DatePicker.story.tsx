import React, { useRef } from "react";
import { action } from "@storybook/addon-actions";
import { select, boolean } from "@storybook/addon-knobs";

import { DatePicker } from "../index";
import { Button } from "../..";

const selectedDateExamples = [
  new Date("2019-01-01T05:00:00.000Z"),
  new Date("2019-02-05T05:00:00.000Z"),
  new Date("2019-03-07T05:00:00.000Z"),
];

export default {
  title: "Components/DatePickers/DatePicker",
};

export const Default = () => (
  <DatePicker
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    selected={select("selected", selectedDateExamples, selectedDateExamples[0], "selected")}
    onChange={action("date changed")}
    onFocus={action("date selector focused")}
    onBlur={action("date selector blurred")}
    onInputChange={action("input changed")}
    inputProps={{ labelText: "Expiry Date" }}
  />
);

export const WithCustomDateFormat = () => (
  <DatePicker
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    selected={select("selected", selectedDateExamples, selectedDateExamples[0], "selected")}
    dateFormat="MMMM d, yyyy"
    onChange={action("date changed")}
    onFocus={action("date selector focused")}
    onBlur={action("date selector blurred")}
    onInputChange={action("input changed")}
    inputProps={{ labelText: "Expiry Date" }}
  />
);

export const WithCustomPlaceholder = () => (
  <DatePicker
    dateFormat="MMMM d, yyyy"
    onFocus={action("date selector focused")}
    onBlur={action("date selector blurred")}
    onChange={action("date changed")}
    onInputChange={action("input changed")}
    inputProps={{ labelText: "Expiry Date", placeholder: "Month day, year" }}
  />
);

export const WithErrorState = () => (
  <DatePicker
    dateFormat="MMMM d, yyyy"
    onFocus={action("date selector focused")}
    onBlur={action("date selector blurred")}
    onChange={action("date changed")}
    onInputChange={action("input changed")}
    inputProps={{ labelText: "Expiry Date" }}
    errorMessage="The date is invalid"
  />
);

export const WithMinAndMaxDate = () => (
  <DatePicker
    selected={new Date("2019-01-05T05:00:00.000Z")}
    minDate={new Date("2019-01-03T05:00:00.000Z")}
    maxDate={new Date("2019-01-10T05:00:00.000Z")}
    onFocus={action("date selector focused")}
    onBlur={action("date selector blurred")}
    onChange={action("date changed")}
    onInputChange={action("input changed")}
    inputProps={{ labelText: "Expiry Date" }}
  />
);

export const DisableFlipping = () => (
  <DatePicker
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    selected={select("selected", selectedDateExamples, selectedDateExamples[0], "selected")}
    onBlur={action("date selector blurred")}
    onFocus={action("date selector focused")}
    onChange={action("date changed")}
    onInputChange={action("input changed")}
    inputProps={{ labelText: "Expiry Date" }}
    disableFlipping={boolean("disableFlipping", true)}
  />
);

export const UsingRefToControlFocus = () => {
  const ref = useRef(null);
  const handleClick = () => {
    ref.current.setFocus();
  };

  return (
    <>
      <DatePicker
        dateFormat="MMMM d, yyyy"
        onChange={action("date changed")}
        onFocus={action("date selector focused")}
        onBlur={action("date selector blurred")}
        onInputChange={action("input changed")}
        inputProps={{ labelText: "Expiry Date" }}
        ref={ref}
      />
      <Button onClick={handleClick}>Focus the Toggle</Button>
    </>
  );
};
