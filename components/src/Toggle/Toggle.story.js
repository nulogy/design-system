import React from "react";
import { storiesOf } from "@storybook/react";
import ToggleWithText, { Toggle } from "./Toggle";
import Field from "../Field/Field";

storiesOf("Toggle", module)
  .add("Toggle", () => (
    <Toggle />
  ))
  .add("Toggle set to disabled", () => (
    <Toggle disabled />
  ))
  .add("With text", () => (
    <ToggleWithText
      onText="on"
      offText="off"
    />
  ))
  .add("Toggle Field", () => (
    <Field
      labelText="Setting"
      helpText="Turns setting on/off"
    >
      <ToggleWithText
        onText="on"
        offText="off"
      />
    </Field>
  ))
  .add("Controlled Toggle", () => (
    <React.Fragment>
      <ToggleWithText
        toggled
        onText="on"
        offText="off"
      />
      <ToggleWithText
        toggled={ false }
        onText="on"
        offText="off"
      />
    </React.Fragment>
  ));
