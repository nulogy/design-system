import React, { useRef } from "react";
import { action } from "@storybook/addon-actions";
import { Radio, Button } from "../index";

export default {
  title: "Components/Radio",
};

export const _Radio = () => (
  <Radio p="x3" id="radio" labelText="I am a radio button" data-testid="radio"/>
);

export const SetToDefaultChecked = () => (
  <>
    <Radio id="radio" defaultChecked labelText="I am checked by default" />
  </>
);

SetToDefaultChecked.story = {
  name: "Set to defaultChecked",
};

export const SetToDisabled = () => (
  <>
    <Radio id="radio-1" disabled labelText="I am disabled" />
    <Radio id="radio-2" checked disabled labelText="I am disabled" />
  </>
);

SetToDisabled.story = {
  name: "Set to disabled",
};

export const SetToError = () => (
  <>
    <Radio id="radio" error labelText="I am error" />
    <Radio id="radio" defaultChecked error labelText="I am error" />
  </>
);

SetToError.story = {
  name: "Set to error",
};

export const SetToRequired = () => (
  <>
    <Radio id="radio" labelText="I am a radio button" required />
  </>
);

SetToRequired.story = {
  name: "Set to required",
};

export const Controlled = () => (
  <>
    <Radio
      id="radio-1"
      checked
      onChange={action("onChange")}
      labelText="I am controlled and checked"
    />
    <Radio
      id="radio-2"
      checked={false}
      onChange={action("onChange")}
      labelText="I am controlled and unchecked"
    />
  </>
);

export const UsingRefToControlFocus = () => {
  const ref = useRef(null);
  const handleClick = () => {
    ref.current.focus();
  };

  return (
    <>
      <Radio
        ref={ref}
        checked
        onChange={action("onChange")}
        labelText="I am controlled and checked"
      />
      <Button onClick={handleClick}>Focus the Input</Button>
    </>
  );
};

UsingRefToControlFocus.story = {
  name: "using ref to control focus",
};
