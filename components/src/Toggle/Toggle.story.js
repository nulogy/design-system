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
  .add("Toggle set to required", () => (
    <Toggle defaultToggled required />
  ))
  .add("With text", () => (
    <Toggle onText="on" offText="off" />
  ))
  .add("With long text", () => (
    <Toggle defaultToggled onText="this state has a very long text label to explain it's state" offText="not this one" />
  ))
  .add("Toggle Field", () => (
    <Field labelText="Setting" helpText="Turns setting on/off" htmlFor="toggle-field">
      <Toggle onText="on" offText="off" id="toggle-field" />
    </Field>
  ))
  .add("Controlled Toggle", () => (
    <>
      <Toggle toggled onText="on" offText="off" />
      <Toggle toggled={ false } onText="on" offText="off" />
    </>
  ));
