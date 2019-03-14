import React from "react";
import { storiesOf } from "@storybook/react";
import { Textarea } from "ComponentsRoot";

storiesOf("Textarea", module)
  .add("Textarea", () => (
    <Textarea id="textarea" labelText="Label" helpText="here's some help..." />
  ))
  .add("Set to disabled", () => (
    <Textarea id="textarea" labelText="Label" disabled />
  ))
  .add("Set to error", () => (
    <Textarea id="textarea" labelText="Label" error />
  ))
  .add("Set to required", () => (
    <Textarea id="textarea" labelText="Label" requirementText="(required)" required />
  ))
  .add("With custom number of rows", () => (
    <Textarea id="textarea" labelText="Label" rows={ 7 } />
  ))
  .add("With placeholder text", () => (
    <Textarea id="textarea" labelText="Label" placeholder="Month/Day/Year" />
  ));
