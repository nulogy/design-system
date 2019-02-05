import React from "react";
import { storiesOf } from "@storybook/react";
import ToggleWithText, { Toggle } from "./Toggle";
import Field from "../Field/Field";

storiesOf("Toggle", module)
  .add("Toggle", () => (
    <Toggle />
  ))
  .add("Toggle set to defaultToggled", () => (
    <Toggle defaultToggled />
  ))
  .add("Toggle set to disabled", () => (
    <React.Fragment>
      <Toggle disabled />
      <Toggle defaultToggled disabled />
    </React.Fragment>
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
