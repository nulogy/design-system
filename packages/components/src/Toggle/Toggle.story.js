import React, { useRef } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { Toggle, Button } from "../index";

storiesOf("Toggle", module)
  .add("Toggle", () => <Toggle />)
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
    <Toggle
      labelText="Controlled Toggle"
      toggled={boolean("Toggled", false)}
      onText="on"
      offText="off"
      onChange={action("on change")}
    />
  ))
  .add("using ref to control focus", () => {
    const ref = useRef(null);
    const handleClick = () => {
      ref.current.focus();
    };

    return (
      <>
        <Toggle
          id="my-custom-id"
          labelText="Toggle"
          onText="on"
          offText="off"
          onChange={action("on change")}
          ref={ref}
        />
        <Button onClick={handleClick}>Focus the Toggle</Button>
      </>
    );
  });
