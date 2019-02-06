import React from "react";
import { storiesOf } from "@storybook/react";
import Radio from "./Radio";

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
  ))
  .add("In Radio Group (TEMP EXAMPLE)", () => (
    <div role="radiogroup">
      <Radio
        defaultChecked type="radio" id="Option 1"
        name="example" labelText="Option 1"
      />
      <Radio
        type="radio" id="Option 2" name="example"
        labelText="Option 2"
      />
      <Radio
        type="radio" id="Option 3" name="example"
        labelText="Option 3"
      />
    </div>
  ));
