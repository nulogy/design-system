import React from "react";
import { storiesOf } from "@storybook/react";
import MultilineInput from "./MultilineInput";

storiesOf("MultilineInput", module)
  .add("MultilineInput", () => (
    <MultilineInput />
  ))
  .add("With custom number of rows", () => (
    <MultilineInput rows="7" />
  ))
  .add("Set to disabled", () => (
    <MultilineInput disabled />
  ))
  .add("Set to error", () => (
    <MultilineInput error />
  ))
  .add("Set to required", () => (
    <MultilineInput required />
  ));
