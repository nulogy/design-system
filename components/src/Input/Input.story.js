import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Input } from "../index";

const errorList = ["Error message 1", "Error message 2"];

storiesOf("Input", module)
  .add("Input", () => <Input labelText="Input" />)
  .add("with all props", () => (
    <Input
      placeholder="Placeholder"
      labelText="Input"
      helpText="Additional help text"
      requirementText="Required"
      onChange={action("value changed")}
      required
    />
  ))
  .add("set to disabled", () => <Input labelText="Set to disabled" disabled />)
  .add("with error message", () => (
    <Input labelText="Label" errorMessage="Error message" onChange={action("value changed")} />
  ))
  .add("with error list ", () => (
    <Input labelText="Label" errorMessage="Error message" errorList={errorList} onChange={action("value changed")} />
  ))
  .add("with custom ID", () => <Input id="my-own-id" labelText="Label" onChange={action("value changed")} />)
  .add("set to required", () => <Input required labelText="Label" onChange={action("value changed")} />);
