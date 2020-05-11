import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import { TimePicker } from ".";

storiesOf("TimePicker", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <TimePicker onChange={action("time changed")} onInputChange={action("input changed")} labelText="Start Time" />
  ))
  .add("with custom time format", () => (
    <TimePicker
      defaultValue="03:30"
      timeFormat="HH:mm"
      onChange={action("time changed")}
      onInputChange={action("input changed")}
      labelText="Duration"
    />
  ))
  .add("with custom time interval", () => (
    <TimePicker
      defaultValue="03:30"
      timeFormat="HH:mm"
      interval={30}
      onChange={action("time changed")}
      onInputChange={action("input changed")}
      labelText="Duration"
    />
  ))
  .add("with custom placeholder", () => (
    <TimePicker
      onChange={action("time changed")}
      onInputChange={action("input changed")}
      labelText="Duration"
      placeholder="--:--"
    />
  ))
  .add("with error state", () => (
    <TimePicker
      onChange={action("time changed")}
      onInputChange={action("input changed")}
      labelText="End Time"
      errorMessage="This time is invalid"
    />
  ))
  .add("with min and max time", () => (
    <TimePicker
      onChange={action("time changed")}
      onInputChange={action("input changed")}
      labelText="End Time"
      minTime="09:00"
      maxTime="21:00"
    />
  ));
