import React from "react";
import { storiesOf } from "@storybook/react";
import { Toggle } from ".";

storiesOf("Toggle", module)
  .add("Toggle", () => (
    <Toggle />
  ))
  .add("Toggle with all props", () => (
    <Toggle labelText="Toggle" helpText="Turns setting on/off" onText="on" offText="off" defaultToggled required requirementText="(Required)" />
  ))
  .add("Toggle set to defaultToggled", () => (
    <Toggle labelText="Toggle" defaultToggled />
  ))
  .add("Toggle set to disabled", () => (
    <>
      <Toggle labelText="Toggle" disabled onText="on" offText="off" />
      <Toggle
        id="toggle-2"
        disabled onText="on" offText="off"
        defaultToggled labelText="Toggle"
      />
    </>
  ))
  .add("With custom id", () => (
    <Toggle id="my-custom-id" labelText="Toggle" onText="on" offText="off" />
  ))
  .add("With text", () => (
    <Toggle labelText="Toggle" onText="on" offText="off" />
  ))
  .add("With long text", () => (
    <Toggle labelText="Toggle" defaultToggled onText="this state has a very long text label to explain it's state" offText="not this one" />
  ))
  .add("Controlled Toggle", () => (
    <>
      <Toggle labelText="Toggle" toggled onText="on" offText="off" />
      <Toggle labelText="Toggle" toggled={ false } onText="on" offText="off" />
    </>
  ));
