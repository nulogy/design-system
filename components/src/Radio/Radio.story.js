import React from "react";
import { storiesOf } from "@storybook/react";
import { Radio } from "ComponentsRoot";

storiesOf("Radio", module)
  .add("Radio", () => (
    <>
      <Radio labelText="I am a radio button" />
    </>
  ))
  .add("Set to defaultChecked", () => (
    <>
      <Radio defaultChecked labelText="I am checked by default" />
    </>
  ))
  .add("Set to disabled", () => (
    <>
      <Radio disabled labelText="I am disabled" />
      <Radio checked disabled labelText="I am disabled" />
    </>
  ))
  .add("Set to error", () => (
    <>
      <Radio error labelText="I am error" />
      <Radio defaultChecked error labelText="I am error" />
    </>
  ))
  .add("Set to required", () => (
    <>
      <Radio labelText="I am a radio button" required />
    </>
  ))
  .add("Controlled", () => (
    <>
      <Radio checked onChange={ () => {} } labelText="I am controlled and checked" />
      <Radio checked={ false } onChange={ () => {} } labelText="I am controlled and unchecked" />
    </>
  ));
