import React from "react";
import { storiesOf } from "@storybook/react";
import { Toggle } from "ComponentsRoot";

storiesOf("Toggle", module)
  .add("Toggle", () => (
    <Toggle id="toggle" labelText="Toggle" />
  ))
  .add("Toggle with all props", () => (
    <Toggle id="toggle" labelText="Toggle" helpText="Turns setting on/off" onText="on" offText="off" defaultToggled required requirementText="(Required)" />
  ))
  .add("Toggle set to defaultToggled", () => (
    <Toggle id="toggle" labelText="Toggle" defaultToggled />
  ))
  .add("Toggle set to disabled", () => (
    <>
      <Toggle id="toggle=1" labelText="Toggle" disabled onText="on" offText="off" />
      <Toggle
        id="toggle-2"
        disabled onText="on" offText="off"
        defaultToggled labelText="Toggle"
      />
    </>
  ))
  .add("With text", () => (
    <Toggle id="toggle" labelText="Toggle" onText="on" offText="off" />
  ))
  .add("With long text", () => (
    <Toggle id="toggle" labelText="Toggle" defaultToggled onText="this state has a very long text label to explain it's state" offText="not this one" />
  ))
  .add("Controlled Toggle", () => (
    <>
      <Toggle id="toggle-1" labelText="Toggle" toggled onText="on" offText="off" />
      <Toggle id="toggle-2" labelText="Toggle" toggled={ false } onText="on" offText="off" />
    </>
  ));
