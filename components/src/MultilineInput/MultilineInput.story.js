import React from "react";
import { storiesOf } from "@storybook/react";
import MultilineInput from "./MultilineInput";

storiesOf("MultilineInput", module)
  .add("MultilineInput", () => (
    <MultilineInput />
  ))
  .add("Set to disabled", () => (
    <MultilineInput disabled />
  ))
  .add("Set to error", () => (
    <MultilineInput error />
  ))
  .add("Set to required", () => (
    <MultilineInput required />
  ))
  .add("With custom number of rows", () => (
    <MultilineInput rows="7" />
  ))
  .add("With placeholder text", () => (
    <MultilineInput placeholder="Month/Day/Year" />
  ));
