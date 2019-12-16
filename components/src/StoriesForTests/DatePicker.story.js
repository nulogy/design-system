import React from "react";
import { storiesOf } from "@storybook/react";
import { DatePicker } from "../DatePicker";

storiesOf("StoriesForTests/Datepicker", module).add("default (SkipStoryshots)", () => (
  <DatePicker selected={new Date("Fri, 01 Jan 2019")} />
));
