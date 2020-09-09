import React, { useRef } from "react";
import { action } from "@storybook/addon-actions";

import TimeRange from "./TimeRange";
import { Button, PrimaryButton } from "../";

export default {
  title: "Components/TimeRange"
};

export const Default = () => (
  <TimeRange
    onRangeChange={action("range changed")}
    onStartTimeChange={action("start date changed")}
    onEndTimeChange={action("end date changed")}
  />
);

Default.story = {
  name: "default"
};

export const DefaultSelections = () => (
  <TimeRange
    onRangeChange={action("range changed")}
    defaultStartTime="12:00 AM"
    defaultEndTime="01:30 PM"
    onStartTimeChange={action("start date changed")}
    onEndTimeChange={action("end date changed")}
  />
);

DefaultSelections.story = {
  name: "default selections"
};

export const WithRangeValidation = () => (
  <TimeRange
    onRangeChange={action("range changed")}
    defaultStartTime="12:00 AM"
    defaultEndTime="03:30 AM"
    onStartTimeChange={action("start date changed")}
    onEndTimeChange={action("end date changed")}
  />
);

WithRangeValidation.story = {
  name: "with range validation"
};

export const WithMinAndMaxTimeRange = () => (
  <TimeRange
    onRangeChange={action("range changed")}
    minTime="09:00"
    maxTime="18:30"
    onStartTimeChange={action("start date changed")}
    onEndTimeChange={action("end date changed")}
  />
);

WithMinAndMaxTimeRange.story = {
  name: "with min and max time range"
};

export const UsingRefToControlFocus = () => {
  const ref = useRef(null);
  const handleClick = () => {
    ref.current.inputRef1.focus();
  };
  const handleClick2 = () => {
    ref.current.inputRef2.focus();
  };

  return (
    <>
      <TimeRange
        onRangeChange={action("range changed")}
        onStartTimeChange={action("start date changed")}
        onEndTimeChange={action("end date changed")}
        ref={ref}
      />
      <Button onClick={handleClick} ml="x2">
        Focus the First Input
      </Button>
      <PrimaryButton onClick={handleClick2} ml="x2">
        Focus the Second Input
      </PrimaryButton>
    </>
  );
};

UsingRefToControlFocus.story = {
  name: "using ref to control focus"
};
