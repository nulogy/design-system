import React from "react";
import { storiesOf } from "@storybook/react";
import { TimeRange } from "../TimeRange";

storiesOf("StoriesForTests/TimeRange", module).add("default (SkipStoryshot)", () => (
  <TimeRange minTime="09:00" maxTime="18:00" />
));
