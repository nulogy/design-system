import React from "react";
import { storiesOf } from "@storybook/react";
import { DateRange } from "../DateRange";

storiesOf("StoriesForTests/DateRange", module).add("default (SkipStoryshot)", () => (
  <DateRange defaultStartDate={new Date("Fri, 01 Jan 2019")} defaultEndDate={new Date("Fri, 05 Jan 2019")} />
));
