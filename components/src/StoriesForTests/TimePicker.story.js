import React from "react";
import { storiesOf } from "@storybook/react";
import { TimePicker } from "../TimePicker";

storiesOf("StoriesForTests/TimePicker", module).add("default", () => <TimePicker labelText="Start Time" />);
