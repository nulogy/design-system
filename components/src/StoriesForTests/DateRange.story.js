import React from "react";
import { storiesOf } from "@storybook/react";
import { DateRange } from "../DateRange";

storiesOf("StoriesForTests/DateRange", module).add("default", () => (
  <DateRange
    defaultStartDate={new Date("2019-01-01T05:00:00.000Z")}
    defaultEndDate={new Date("2019-01-05T05:00:00.000Z")}
  />
));
