import React from "react";
import { storiesOf } from "@storybook/react";
import { Input } from "ComponentsRoot";

storiesOf("Input", module)
  .add("Input", () => (
    <Input id="input" labelText="Input" />
  ))
  .add("Input with all props", () => (
    <Input id="input-with-all-props" placeholder="Placeholder" labelText="Input" helpText="Additional help text" required />
  ))
  .add("Set to disabled", () => (
    <Input id="disabled" labelText="Set to disabled" disabled />
  ))
  .add("Set to error", () => (
    <Input id="error" labelText="Label" error="Error message" />
  ));
