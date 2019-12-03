import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Toggle } from "../index";

storiesOf("Toggle", module)
  .add("Toggle", () => <Toggle onChange={action("on change")} />)
  .add("Toggle with all props", () => (
    <Toggle
      labelText="Toggle"
      helpText="Turns setting on/off"
      onText="on"
      offText="off"
      defaultToggled
      required
      requirementText="(Required)"
      onChange={action("on change")}
    />
  ))
  .add("Toggle set to defaultToggled", () => (
    <Toggle labelText="Toggle" defaultToggled onChange={action("on change")} />
  ))
  .add("Toggle set to disabled", () => (
    <>
      <Toggle labelText="Toggle" disabled onText="on" offText="off" onChange={action("on change")} />
      <Toggle
        id="toggle-2"
        disabled
        onText="on"
        offText="off"
        defaultToggled
        labelText="Toggle"
        onChange={action("on change")}
      />
    </>
  ))
  .add("With custom id", () => (
    <Toggle id="my-custom-id" labelText="Toggle" onText="on" offText="off" onChange={action("on change")} />
  ))
  .add("With text", () => <Toggle labelText="Toggle" onText="on" offText="off" onChange={action("on change")} />)
  .add("With long text", () => (
    <Toggle
      labelText="Toggle"
      defaultToggled
      onText="this state has a very long text label to explain it's state"
      offText="not this one"
      onChange={action("on change")}
    />
  ))
  .add("Controlled Toggle", () => (
    <>
      <Toggle labelText="Toggle" toggled onText="on" offText="off" onChange={action("on change")} />
      <Toggle labelText="Toggle" toggled={false} onText="on" offText="off" onChange={action("on change")} />
    </>
  ));
