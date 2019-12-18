import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TimePicker } from ".";

storiesOf("TimePicker", module)
  .add("default", () => (
    <TimePicker
      onChange={action("time changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Start Time" }}
    />
  ))
  .add("with custom time format (SkipStoryshots)", () => (
    <TimePicker
      selected={new Date("2019-01-01T05:00:00.000Z")}
      timeFormat="hh:mm:ss"
      onChange={action("time changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Duration" }}
    />
  ))
  .add("with custom placeholder", () => (
    <TimePicker
      onChange={action("time changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "Duration", placeholder: "--:--" }}
    />
  ))
  .add("with error state", () => (
    <TimePicker
      onChange={action("time changed")}
      onInputChange={action("input changed")}
      inputProps={{ labelText: "End Time" }}
      errorMessage="This time is invalid"
    />
  ));
