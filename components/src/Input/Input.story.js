import React from "react";
import { storiesOf } from "@storybook/react";
import { Input } from ".";

const errorList = ["Error message 1", "Error message 2"];

storiesOf("Input", module)
  .add("Input", () => <Input labelText="Input" />)
  .add("with all props", () => (
    <Input placeholder="Placeholder" labelText="Input" helpText="Additional help text" required />
  ))
  .add("set to disabled", () => <Input labelText="Set to disabled" disabled />)
  .add("with error message", () => <Input labelText="Label" errorMessage="Error message" />)
  .add("with error list ", () => <Input labelText="Label" errorMessage="Error message" errorList={errorList} />)
  .add("with custom ID", () => <Input id="my-own-id" labelText="Label" />);
