import React from "react";
import { storiesOf } from "@storybook/react";
import { TimePicker } from "../TimePicker";

storiesOf("StoriesForTests/TimePicker", module).add("default (SkipStoryshots)", () => (
  <TimePicker labelText="Start Time" />
));
