import React from "react";
import { storiesOf } from "@storybook/react";
import { Input } from "ComponentsRoot";

storiesOf("Input", module)
  .add("Input", () => (
    <Input labelText="Input" />
  ))
  .add("Set to disabled", () => (
    <Input name="disabled" disabled />
  ))
  .add("Set to error", () => (
    <Input name="error" error />
  ))
  .add("Set to required", () => (
    <Input name="required" labelText="Set to required" requirementText="(Required)" required />
  ))
  .add("With help text", () => (
    <Input name="required" labelText="With help text" helpText="Additional help text"  />
  ));
