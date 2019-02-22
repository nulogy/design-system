import React from "react";
import { storiesOf } from "@storybook/react";
import { Textarea } from "ComponentsRoot";

storiesOf("Textarea", module)
  .add("Textarea", () => (
    <Textarea />
  ))
  .add("Set to disabled", () => (
    <Textarea disabled />
  ))
  .add("Set to error", () => (
    <Textarea error />
  ))
  .add("Set to required", () => (
    <Textarea required />
  ))
  .add("With custom number of rows", () => (
    <Textarea rows={ 7 } />
  ))
  .add("With placeholder text", () => (
    <Textarea placeholder="Month/Day/Year" />
  ));
