import React, { useRef } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Radio, Button } from "../index";

storiesOf("Radio", module)
  .add("Radio", () => (
    <>
      <Radio id="radio" labelText="I am a radio button" />
    </>
  ))
  .add("Set to defaultChecked", () => (
    <>
      <Radio id="radio" defaultChecked labelText="I am checked by default" />
    </>
  ))
  .add("Set to disabled", () => (
    <>
      <Radio id="radio-1" disabled labelText="I am disabled" />
      <Radio id="radio-2" checked disabled labelText="I am disabled" />
    </>
  ))
  .add("Set to error", () => (
    <>
      <Radio id="radio" error labelText="I am error" />
      <Radio id="radio" defaultChecked error labelText="I am error" />
    </>
  ))
  .add("Set to required", () => (
    <>
      <Radio id="radio" labelText="I am a radio button" required />
    </>
  ))
  .add("Controlled", () => (
    <>
      <Radio id="radio-1" checked onChange={action("onChange")} labelText="I am controlled and checked" />
      <Radio id="radio-2" checked={false} onChange={action("onChange")} labelText="I am controlled and unchecked" />
    </>
  ))
  .add("using ref to control focus", () => {
    const ref = useRef(null);
    const handleClick = () => {
      ref.current.focus();
    };

    return (
      <>
        <Radio ref={ref} checked onChange={action("onChange")} labelText="I am controlled and checked" />
        <Button onClick={handleClick}>Focus the Input</Button>
      </>
    );
  });
