import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Input, Form, PrimaryButton } from "../index";

const errorList = ["Error message 1", "Error message 2"];

storiesOf("Input", module)
  .add("Input", () => <Input labelText="Input" onChange={action("value changed")} onBlur={action("blurred")} />)
  .add("with all props", () => (
    <Input
      placeholder="Placeholder"
      labelText="Input"
      helpText="Additional help text"
      requirementText="Required"
      onChange={action("value changed")}
      onBlur={action("blurred")}
      required
    />
  ))
  .add("set to disabled", () => <Input labelText="Set to disabled" disabled onBlur={action("blurred")} />)
  .add("with error message", () => (
    <Input
      labelText="Label"
      errorMessage="Error message"
      onChange={action("value changed")}
      onBlur={action("blurred")}
    />
  ))
  .add("with error list ", () => (
    <Input
      labelText="Label"
      errorMessage="Error message"
      errorList={errorList}
      onChange={action("value changed")}
      onBlur={action("blurred")}
    />
  ))
  .add("with custom ID", () => (
    <Input id="my-own-id" labelText="Label" onChange={action("value changed")} onBlur={action("blurred")} />
  ))
  .add("set to required", () => (
    <>
      <Form title="Required field example">
        <Input required labelText="Label" onChange={action("value changed")} onBlur={action("blurred")} />
        <PrimaryButton>Send</PrimaryButton>
      </Form>
    </>
  ))
  .add("with a sufix", () => (
    <>
      <Input labelText="Label" sufix="eaches" />
      <Input sufix="pallets and bo jkdshf khsbfsd fsdgshkgf ksdjf kjdsgf xes" />
    </>
  ));
