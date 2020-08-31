import React, { useRef } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import TimeRange from "./TimeRange";
import { Button, PrimaryButton } from "../";

storiesOf("Components/TimeRange", module)
  .add("default", () => (
    <TimeRange
      onRangeChange={action("range changed")}
      onStartTimeChange={action("start date changed")}
      onEndTimeChange={action("end date changed")}
    />
  ))
  .add("default selections", () => (
    <TimeRange
      onRangeChange={action("range changed")}
      defaultStartTime="12:00 AM"
      defaultEndTime="01:30 PM"
      onStartTimeChange={action("start date changed")}
      onEndTimeChange={action("end date changed")}
    />
  ))
  .add("with range validation", () => (
    <TimeRange
      onRangeChange={action("range changed")}
      defaultStartTime="12:00 AM"
      defaultEndTime="03:30 AM"
      onStartTimeChange={action("start date changed")}
      onEndTimeChange={action("end date changed")}
    />
  ))
  .add("with min and max time range", () => (
    <TimeRange
      onRangeChange={action("range changed")}
      minTime="09:00"
      maxTime="18:30"
      onStartTimeChange={action("start date changed")}
      onEndTimeChange={action("end date changed")}
    />
  ))
  .add("using ref to control focus", () => {
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
  });
