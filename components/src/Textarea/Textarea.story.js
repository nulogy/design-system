import React from "react";
import { storiesOf } from "@storybook/react";
import { Textarea } from ".";

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
  .add("Set to error", () => <Textarea labelText="Label" error="Please fill this out" />)
  .add("With custom number of rows", () => <Textarea labelText="Label" rows={7} />)
  .add("With custom id", () => <Textarea id="my-custom-id" labelText="Label" />);
