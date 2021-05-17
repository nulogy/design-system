import React, { useState, useRef } from "react";
import { action } from "@storybook/addon-actions";

import { TimePicker, Button } from "../index";

export default {
  title: "Components/TimePicker",
};

export const Default = () => (
  <TimePicker
    p="x3"
    onChange={action("time changed")}
    onInputChange={action("input changed")}
    labelText="Start Time"
  />
);

Default.story = {
  name: "default",
};

export const WithCustomTimeFormat = () => (
  <TimePicker
    defaultValue="03:30"
    timeFormat="HH:mm"
    onChange={action("time changed")}
    onInputChange={action("input changed")}
    labelText="Duration"
  />
);

WithCustomTimeFormat.story = {
  name: "with custom time format",
};

export const WithCustomTimeInterval = () => (
  <TimePicker
    defaultValue="03:30"
    timeFormat="HH:mm"
    interval={30}
    onChange={action("time changed")}
    onInputChange={action("input changed")}
    labelText="Duration"
  />
);

WithCustomTimeInterval.story = {
  name: "with custom time interval",
};

export const WithCustomPlaceholder = () => (
  <TimePicker
    onChange={action("time changed")}
    onInputChange={action("input changed")}
    labelText="Duration"
    placeholder="--:--"
  />
);

WithCustomPlaceholder.story = {
  name: "with custom placeholder",
};

export const disabled = () => (
  <TimePicker
    onChange={action("time changed")}
    onInputChange={action("input changed")}
    labelText="Duration"
    placeholder="--:--"
    disabled
  />
);

disabled.story = {
  name: "disabled",
};

export const WithErrorState = () => (
  <TimePicker
    onChange={action("time changed")}
    onInputChange={action("input changed")}
    labelText="End Time"
    errorMessage="This time is invalid"
  />
);

WithErrorState.story = {
  name: "with error state",
};

export const WithMinAndMaxTime = () => (
  <TimePicker
    onChange={action("time changed")}
    onInputChange={action("input changed")}
    labelText="End Time"
    minTime="09:00"
    maxTime="21:00"
  />
);

WithMinAndMaxTime.story = {
  name: "with min and max time",
};

export const WithCustomDefault = () => (
  <TimePicker
    onChange={action("time changed")}
    onInputChange={action("input changed")}
    labelText="End Time"
    defaultValue="12:38 PM"
  />
);

WithCustomDefault.story = {
  name: "with custom default",
};

const ControlledTimePicker = () => {
  const [value, setValue] = useState("13:43");
  return (
    <TimePicker
      onChange={setValue}
      onInputChange={setValue}
      labelText="End Time"
      value={value}
    />
  );
};

export const WithValue = () => <ControlledTimePicker />;

WithValue.story = {
  name: "with value",
};

export const UsingRefToControlFocus = () => {
  const ref = useRef(null);
  const handleClick = () => {
    ref.current.focus();
  };

  return (
    <>
      <TimePicker
        onChange={action("time changed")}
        onInputChange={action("input changed")}
        labelText="Duration"
        ref={ref}
      />
      <Button onClick={handleClick}>Focus the Toggle</Button>
    </>
  );
};

UsingRefToControlFocus.story = {
  name: "using ref to control focus",
};
