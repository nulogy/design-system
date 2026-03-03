import React, { useState, useRef } from "react";
import { action } from "storybook/actions";
import { TimePicker, Button } from "../index";

export default {
  title: "Components/TimePicker",
};

export const Default = {
  render: () => (
    <TimePicker
      p="x3"
      onChange={action("time changed")}
      onInputChange={action("input changed")}
      labelText="Start Time"
    />
  ),

  name: "default",
};

export const WithCustomTimeFormat = {
  render: () => (
    <TimePicker
      defaultValue="03:30"
      timeFormat="HH:mm"
      onChange={action("time changed")}
      onInputChange={action("input changed")}
      labelText="Duration"
    />
  ),

  name: "with custom time format",
};

export const WithCustomTimeInterval = {
  render: () => (
    <TimePicker
      defaultValue="03:30"
      timeFormat="HH:mm"
      interval={30}
      onChange={action("time changed")}
      onInputChange={action("input changed")}
      labelText="Duration"
    />
  ),

  name: "with custom time interval",
};

export const WithCustomPlaceholder = {
  render: () => (
    <TimePicker
      onChange={action("time changed")}
      onInputChange={action("input changed")}
      labelText="Duration"
      placeholder="--:--"
    />
  ),

  name: "with custom placeholder",
};

export const disabled = {
  render: () => (
    <TimePicker
      onChange={action("time changed")}
      onInputChange={action("input changed")}
      labelText="Duration"
      placeholder="--:--"
      disabled
    />
  ),

  name: "disabled",
};

export const WithErrorState = {
  render: () => (
    <TimePicker
      onChange={action("time changed")}
      onInputChange={action("input changed")}
      labelText="End Time"
      errorMessage="This time is invalid"
    />
  ),

  name: "with error state",
};

export const WithMinAndMaxTime = {
  render: () => (
    <TimePicker
      onChange={action("time changed")}
      onInputChange={action("input changed")}
      labelText="End Time"
      minTime="09:00"
      maxTime="21:00"
    />
  ),

  name: "with min and max time",
};

export const WithCustomDefault = {
  render: () => (
    <TimePicker
      onChange={action("time changed")}
      onInputChange={action("input changed")}
      labelText="End Time"
      defaultValue="12:38 PM"
    />
  ),

  name: "with custom default",
};

const ControlledTimePicker = () => {
  const [value, setValue] = useState("13:43");
  return <TimePicker onChange={setValue} onInputChange={setValue} labelText="End Time" value={value} />;
};

export const WithValue = {
  render: () => <ControlledTimePicker />,
  name: "with value",
};

export const UsingRefToControlFocus = {
  render: () => {
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
  },

  name: "using ref to control focus",
};
