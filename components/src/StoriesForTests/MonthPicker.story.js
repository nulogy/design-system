import React from "react";
import { storiesOf } from "@storybook/react";
import { MonthPicker } from "../MonthPicker";

storiesOf("StoriesForTests/Monthpicker", module).add("default (SkipStoryshots)", () => (
  <MonthPicker selected={new Date("Fri, 01 Jan 2019")} />
));
