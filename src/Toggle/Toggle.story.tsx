import React, { useRef, useState } from "react";
import { action } from "@storybook/addon-actions";
import { Toggle, Button, Box } from "../index";
import { dashed } from "../utils/story/dashed";

const DashedBox = dashed(Box);

export default {
  title: "Components/Toggle",
};

export const _Toggle = () => {
  const [toggled, setToggled] = useState(false);

  return <Toggle data-testid="toggle-example" toggled={toggled} onChange={(e) => setToggled(e.target.checked)} />;
};

export const ToggleWithAllProps = () => {
  const [toggled, setToggled] = useState(true);

  return (
    <Toggle
      labelText="Toggle"
      helpText="Turns setting on/off"
      onText="on"
      offText="off"
      toggled={toggled}
      required
      requirementText="(Required)"
      onChange={(e) => setToggled(e.target.checked)}
    />
  );
};
ToggleWithAllProps.storyName = "Toggle with all props";

export const ToggleSetToDisabled = () => {
  return (
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
        toggled={true}
        labelText="Toggle"
        onChange={action("on change")}
      />
    </>
  );
};
ToggleSetToDisabled.storyName = "Toggle set to disabled";

export const WithCustomId = () => {
  const [toggled, setToggled] = useState(true);

  return (
    <Toggle
      id="my-custom-id"
      labelText="Toggle"
      onText="on"
      offText="off"
      toggled={toggled}
      onChange={(e) => setToggled(e.target.checked)}
    />
  );
};
WithCustomId.storyName = "With custom id";

export const WithText = () => {
  const [toggled, setToggled] = useState(true);

  return (
    <Toggle
      labelText="Toggle"
      onText="on"
      offText="off"
      toggled={toggled}
      onChange={(e) => setToggled(e.target.checked)}
    />
  );
};
WithText.storyName = "With text";

export const WithLongText = () => {
  const [toggled, setToggled] = useState(true);

  return (
    <Toggle
      labelText="Toggle"
      toggled={toggled}
      onText="this state has a very long text label to explain it's state"
      offText="not this one"
      onChange={(e) => setToggled(e.target.checked)}
    />
  );
};
WithLongText.storyName = "With long text";

export const WithContraintWidth = () => {
  const [toggled, setToggled] = useState(true);

  return (
    <DashedBox width="200px" padding="x2">
      <Toggle
        labelText="Toggle"
        onText="This is a long On label for the toggle component."
        offText="This is a long Off label for the toggle component."
        toggled={toggled}
        onChange={(e) => setToggled(e.target.checked)}
      />
    </DashedBox>
  );
};
WithContraintWidth.storyName = "With constraint width";

export const UsingRefToControlFocus = () => {
  const [toggled, setToggled] = useState(true);
  const ref = useRef<HTMLInputElement>(null);
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
        toggled={toggled}
        onChange={(e) => setToggled(e.target.checked)}
        ref={ref}
      />
      <Button onClick={handleClick}>Focus the Toggle</Button>
    </>
  );
};
UsingRefToControlFocus.storyName = "Using ref to control focus";
