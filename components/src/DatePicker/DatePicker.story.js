import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { DatePicker } from ".";

storiesOf("DatePicker", module)
  .add("DatePicker", () => <DatePicker selected={new Date("Fri, 01 Jan 2019")} onChange={action("date changed")} />)
  .add("with custom date format", () => (
    <DatePicker selected={new Date("Fri, 01 Jan 2019")} dateFormat="MMMM d, yyyy" onChange={action("date changed")} />
  ));
