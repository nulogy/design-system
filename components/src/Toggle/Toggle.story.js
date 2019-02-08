import React from "react";
import { storiesOf } from "@storybook/react";
import Toggle from "./Toggle";
import Field from "../Field/Field";

storiesOf("Toggle", module)
  .add("Toggle", () => (
    <Toggle />
  ))
  .add("Toggle set to defaultToggled", () => (
    <Toggle defaultToggled />
  ))
  .add("Toggle set to disabled", () => (
    <>
      <Toggle disabled onText="on" offText="off" />
      <Toggle
        disabled onText="on" offText="off"
        defaultToggled
      />
    </>
  ))
  .add("With text", () => (
    <Toggle onText="on" offText="off" />
  ))
  .add("Toggle Field", () => (
    <Field labelText="Setting" helpText="Turns setting on/off">
      <Toggle onText="on" offText="off" />
    </Field>
  ))
  .add("Controlled Toggle", () => (
    <>
      <Toggle toggled onText="on" offText="off" />
      <Toggle toggled={ false } onText="on" offText="off" />
    </>
  ));
