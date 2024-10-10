// @ts-nocheck
import React, { useRef } from "react";
import { action } from "@storybook/addon-actions";
import { select, boolean } from "@storybook/addon-knobs";

import { DatePicker, Button } from "../index";
import { Flex } from "../Flex";

const selectedDateExamples = [
  new Date("2019-01-01T05:00:00.000Z"),
  new Date("2019-02-05T05:00:00.000Z"),
  new Date("2019-03-07T05:00:00.000Z"),
];

export default {
  title: "Components/DatePicker",
};

export const Default = () => (
  <DatePicker
    selected={select("selected", selectedDateExamples, selectedDateExamples[0], "selected")}
    onChange={action("date changed")}
    onFocus={action("date selector focused")}
    onBlur={action("date selector blurred")}
    onInputChange={action("input changed")}
    inputProps={{ labelText: "Expiry Date" }}
  />
);

Default.story = {
  name: "default",
};

export const WithCustomDateFormat = () => (
  <DatePicker
    selected={select("selected", selectedDateExamples, selectedDateExamples[0], "selected")}
    dateFormat="MMMM d, yyyy"
    onChange={action("date changed")}
    onFocus={action("date selector focused")}
    onBlur={action("date selector blurred")}
    onInputChange={action("input changed")}
    inputProps={{ labelText: "Expiry Date" }}
  />
);

WithCustomDateFormat.story = {
  name: "with custom date format",
};

export const WithDifferentSizes = () => (
  <Flex gap="x2" alignItems="flex-start">
    <DatePicker
      selected={select("selected", selectedDateExamples, selectedDateExamples[0], "selected")}
      dateFormat="MMMM d, yyyy"
      onChange={action("date changed")}
      onFocus={action("date selector focused")}
      onBlur={action("date selector blurred")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Default size" }}
    />
    <DatePicker
      size="medium"
      selected={select("selected", selectedDateExamples, selectedDateExamples[0], "selected")}
      dateFormat="MMMM d, yyyy"
      onChange={action("date changed")}
      onFocus={action("date selector focused")}
      onBlur={action("date selector blurred")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Medium size" }}
    />
    <DatePicker
      size="large"
      selected={select("selected", selectedDateExamples, selectedDateExamples[0], "selected")}
      dateFormat="MMMM d, yyyy"
      onChange={action("date changed")}
      onFocus={action("date selector focused")}
      onBlur={action("date selector blurred")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Large size" }}
    />
  </Flex>
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

WithCustomPlaceholder.story = {
  name: "with custom placeholder",
};

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

WithErrorState.story = {
  name: "with error state",
};

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

WithMinAndMaxDate.story = {
  name: "with min and max date",
};

export const DisableFlipping = () => (
  <DatePicker
    selected={select("selected", selectedDateExamples, selectedDateExamples[0], "selected")}
    onBlur={action("date selector blurred")}
    onFocus={action("date selector focused")}
    onChange={action("date changed")}
    onInputChange={action("input changed")}
    inputProps={{ labelText: "Expiry Date" }}
    disableFlipping={boolean("disableFlipping", true)}
  />
);

DisableFlipping.story = {
  name: "disable flipping",
};

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

UsingRefToControlFocus.story = {
  name: "using ref to control focus",
};
