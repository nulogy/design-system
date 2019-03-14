import React from "react";
import { storiesOf } from "@storybook/react";
import { Textarea } from "ComponentsRoot";

storiesOf("Textarea", module)
  .add("Textarea", () => (
    <Textarea labelText="Label" helpText="here's some help..." />
  ))
  .add("Set to disabled", () => (
    <Textarea labelText="Label" disabled />
  ))
  .add("Set to error", () => (
    <Textarea labelText="Label" error />
  ))
  .add("Set to required", () => (
    <Textarea labelText="Label" requirementText="(required)" required />
  ))
  .add("With custom number of rows", () => (
    <Textarea labelText="Label" rows={ 7 } />
  ))
  .add("With placeholder text", () => (
    <Textarea labelText="Label" placeholder="Month/Day/Year" />
  ));
