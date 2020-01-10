import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import TimeRange from "./TimeRange";

storiesOf("TimeRange", module)
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
      defaultStartTime="12:00"
      defaultEndTime="13:30"
      onStartTimeChange={action("start date changed")}
      onEndTimeChange={action("end date changed")}
    />
  ))
  .add("with range validation", () => (
    <TimeRange
      onRangeChange={action("range changed")}
      defaultStartTime="12:00"
      defaultEndTime="03:30"
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
  ));
