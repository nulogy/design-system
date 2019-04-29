import React from "react";
import { storiesOf } from "@storybook/react";
import Radio from "./Radio";

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
      <Radio id="radio-1" checked onChange={ () => {} } labelText="I am controlled and checked" />
      <Radio id="radio-2" checked={ false } onChange={ () => {} } labelText="I am controlled and unchecked" />
    </>
  ));
