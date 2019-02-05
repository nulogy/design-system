import React from "react";
import { storiesOf } from "@storybook/react";
import Radio from "./Radio";

storiesOf("Radio", module)
.add("Radio", () => (
  <Radio label="Boo" />
))
.add("Radio checked", () => (
    <Radio checked label="Boo" />
  ))
  .add("Set to disabled", () => (
    <Radio label="Hoo" disabled />
  ));
