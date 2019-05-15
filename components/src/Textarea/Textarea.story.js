import React from "react";
import { storiesOf } from "@storybook/react";
import { Textarea } from ".";

const errorList = [
  "Error message 1",
  "Error message 2",
  <>
    Error with a <a href="/">link</a>
  </>
];

storiesOf("Textarea", module)
  .add("Textarea", () => <Textarea labelText="Label" />)
  .add("Textarea with all props", () => (
    <Textarea
      labelText="Label"
      placeholder="Placeholder"
      helpText="here's some help..."
      requirementText="(Required)"
      required
    />
  ))
  .add("Set to disabled", () => <Textarea labelText="Label" disabled />)
  .add("with error", () => <Textarea labelText="Label" error="Please fill this out" />)
  .add("with list of errors", () => <Textarea labelText="Label" error="Please fill this out" errorList={errorList} />)
  .add("With custom number of rows", () => <Textarea labelText="Label" rows={7} />)
  .add("With custom id", () => <Textarea id="my-custom-id" labelText="Label" />);
