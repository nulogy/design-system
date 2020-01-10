import React from "react";
import { storiesOf } from "@storybook/react";
import { MonthPicker } from "../MonthPicker";

storiesOf("StoriesForTests/Monthpicker", module)
  .add("default", () => <MonthPicker selected={new Date("2019-01-01T05:00:00.000Z")} />)
  .add("with a min and max date", () => (
    <MonthPicker
      selected={new Date("2019-07-10T05:00:00.000Z")}
      minDate={new Date("2019-07-05T05:00:00.000Z")}
      maxDate={new Date("2019-12-05T05:00:00.000Z")}
      inputProps={{ labelText: "Month and Year" }}
    />
  ));
