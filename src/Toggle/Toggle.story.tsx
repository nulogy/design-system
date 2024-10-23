import React, { useRef } from "react";
import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { Toggle, Button, Box } from "../index";
import { Flex } from "../Flex";
import dashed from "../utils/dashed";

const DashedToggle = dashed(Toggle);
const DashedBox = dashed(Box);

export const WithDifferentVariants = () => (
  <Flex gap="x2" alignItems="flex-start">
    <DashedToggle onText="Default" offText="Default" data-testid="toggle-example" onChange={action("on change")} />
    <DashedToggle
      onText="Medium"
      offText="Medium"
      size="medium"
      data-testid="toggle-example"
      onChange={action("on change")}
    />
    <DashedToggle
      onText="Large"
      size="large"
      offText="Large"
      data-testid="toggle-example"
      onChange={action("on change")}
    />
  </Flex>
);

export default {
  title: "Components/Toggle",
};

export const _Toggle = () => <Toggle data-testid="toggle-example" onChange={action("on change")} />;

export const ToggleWithAllProps = () => (
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
);

ToggleWithAllProps.story = {
  name: "Toggle with all props",
};

export const ToggleSetToDefaultToggled = () => (
  <Toggle labelText="Toggle" defaultToggled onChange={action("on change")} />
);

ToggleSetToDefaultToggled.story = {
  name: "Toggle set to defaultToggled",
};

export const ToggleSetToDisabled = () => (
  <>
    <Toggle
      labelText="Toggle"
      disabled
      onText="on"
      offText="off"
      onChange={action("on change")}
      data-testid="toggle-example"
    />
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
);

ToggleSetToDisabled.story = {
  name: "Toggle set to disabled",
};

export const WithCustomId = () => (
  <Toggle id="my-custom-id" labelText="Toggle" onText="on" offText="off" onChange={action("on change")} />
);

WithCustomId.story = {
  name: "With custom id",
};

export const WithText = () => <Toggle labelText="Toggle" onText="on" offText="off" onChange={action("on change")} />;

WithText.story = {
  name: "With text",
};

export const WithLongText = () => (
  <Toggle
    labelText="Toggle"
    defaultToggled
    onText="this state has a very long text label to explain it's state"
    offText="not this one"
    onChange={action("on change")}
  />
);

WithLongText.story = {
  name: "With long text",
};

export const WithContraintWidth = () => (
  <DashedBox width="200px" padding="x2">
    <Toggle
      labelText="Toggle"
      onText="This is a long On label for the toggle component."
      offText="This is a long Off label for the toggle component."
      defaultToggled
      onChange={action("on change")}
    />
  </DashedBox>
);

export const ControlledToggle = () => (
  <Toggle
    labelText="Controlled Toggle"
    toggled={boolean("Toggled", false)}
    onText="on"
    offText="off"
    onChange={action("on change")}
    data-testid="toggle-example"
  />
);

export const UsingRefToControlFocus = () => {
  const ref = useRef(null);
  const handleClick = () => {
    ref.current.focus();
  };

  return (
    <>
      <Toggle id="my-custom-id" labelText="Toggle" onText="on" offText="off" onChange={action("on change")} ref={ref} />
      <Button onClick={handleClick}>Focus the Toggle</Button>
    </>
  );
};

UsingRefToControlFocus.story = {
  name: "using ref to control focus",
};
