import React from "react";
import { storiesOf } from "@storybook/react";
import Radio from "./Radio";
import RadioGroup from "./RadioGroup";

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
  .add("Controlled", () => (
    <>
      <Radio checked onChange={ () => {} } labelText="I am controlled and checked" />
      <Radio checked={ false } onChange={ () => {} } labelText="I am controlled and unchecked" />
    </>
  ));
