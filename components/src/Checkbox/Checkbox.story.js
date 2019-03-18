import React from "react";
import { storiesOf } from "@storybook/react";
import { Checkbox } from "ComponentsRoot";

storiesOf("Checkbox", module)
  .add("Checkbox", () => (
    <>
      <Checkbox labelText="I am a checkbox" />
    </>
  ))
  .add("Set to defaultChecked", () => (
    <>
      <Checkbox defaultChecked labelText="I am checked by default" />
    </>
  ))
  .add("Set to disabled", () => (
    <>
      <Checkbox disabled labelText="I am disabled" />
      <Checkbox checked disabled labelText="I am disabled" />
    </>
  ))
  .add("Set to error", () => (
    <>
      <Checkbox error labelText="I am error" />
      <Checkbox defaultChecked error labelText="I am error" />
    </>
  ))
  .add("Set to required", () => (
    <>
      <Checkbox labelText="I am a checkbox" required />
    </>
  ))
  .add("Controlled", () => (
    <>
      <Checkbox checked onChange={ () => {} } labelText="I am controlled and checked" />
      <Checkbox checked={ false } onChange={ () => {} } labelText="I am controlled and unchecked" />
    </>
  ));
