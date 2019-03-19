import React from "react";
import { storiesOf } from "@storybook/react";
import { Textarea } from "ComponentsRoot";

storiesOf("Textarea", module)
  .add("Textarea", () => (
    <Textarea id="textarea" labelText="Label" />
  ))
  .add("Textarea with all props", () => (
    <Textarea id="textarea" labelText="Label" placeholder="Placeholder" helpText="here's some help..." requirementText="(Required)" required />
  ))
  .add("Set to disabled", () => (
    <Textarea id="textarea" labelText="Label" disabled />
  ))
  .add("Set to error", () => (
    <Textarea id="textarea" labelText="Label" error="Please fill this out" />
  ))
  .add("With custom number of rows", () => (
    <Textarea id="textarea" labelText="Label" rows={ 7 } />
  ));
