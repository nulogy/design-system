import React from "react";
import { storiesOf } from "@storybook/react";
import { Input } from ".";

storiesOf("Input", module)
  .add("Input", () => <Input labelText="Input" />)
  .add("Input with all props", () => (
    <Input placeholder="Placeholder" labelText="Input" helpText="Additional help text" required />
  ))
  .add("Set to disabled", () => <Input labelText="Set to disabled" disabled />)
  .add("Set to error", () => <Input labelText="Label" error="Error message" />)
  .add("with custom ID", () => <Input id="my-own-id" labelText="Label" error="Error message" />);
