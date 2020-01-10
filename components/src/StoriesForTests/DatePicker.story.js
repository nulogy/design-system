import React from "react";
import { storiesOf } from "@storybook/react";
import { DatePicker } from "../DatePicker";

storiesOf("StoriesForTests/Datepicker", module).add("default", () => (
  <DatePicker selected={new Date("2019-01-01T05:00:00.000Z")} />
));
