import React from "react";
import { storiesOf } from "@storybook/react";
import Toggle from "./Toggle";
import Field from "../Field/Field";

const onToggleDemo = (toggled, id) => {
  const message = "Toggle id: (" + id + ") has been turned " + (toggled ? "on!" : "off!");
  console.log(message);
};

storiesOf("Toggle", module)
  .add("Toggle", () => (
    <Toggle/>
  ))
  .add("Toggle set to disabled", () => (
    <Toggle disabled/>
  ))
  .add("With text", () => (
    <Toggle 
      onText = "on"
      offText = "off"
    />
  ))
  .add("Toggle Field", () => (
    <Field
      labelText = "Setting"
      helpText = "Turns setting on/off"
    >
      <Toggle
        onText = "on"
        offText = "off"
      />
    </Field>
  ))
  .add("<TEMP> Toggle demo", () => (
    <React.Fragment> 
      <Toggle 
        id = "toggle1" 
        onToggle = {onToggleDemo}
        onText = "on"
        offText = "off"
      />
      <Toggle 
        id = "toggle2" 
        onToggle = {onToggleDemo}
        onText = "on"
        offText = "off"
        toggled = {true}
      />      
      <Toggle 
        id = "toggle3" 
        onToggle = {onToggleDemo}
        onText = "on"
        offText = "off"
      />
      <Toggle 
        disabled
        id = "toggle3" 
        onToggle = {onToggleDemo}
        onText = "on"
        offText = "off"
      />
    </React.Fragment>
  ));
