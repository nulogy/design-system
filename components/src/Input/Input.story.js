import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Input, Form, PrimaryButton } from "../index";

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
  .add("set to required", () => (
    <>
      <Form title="Required field example">
        <Input required labelText="Label" onChange={action("value changed")} />
        <PrimaryButton>Send</PrimaryButton>
      </Form>
    </>
  ))
  .add("with a sufix", () => (
    <>
      <Input labelText="Label" sufix="eaches" />
      <Input sufix="pallets and boxes" />
      <Input labelText="Label" sufix="eaches" sufixWidth="180px" />
      <Input sufix="pallets and boxes" sufixWidth="180px" />
      <Input prefix="pallets and boxes" prefixWidth="180px" />
      <Input sufix="pallets and boxes" prefix="pallets and boxes" />
    </>
  ));
