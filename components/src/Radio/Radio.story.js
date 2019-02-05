import React from "react";
import { storiesOf } from "@storybook/react";
import Radio from "./Radio";

storiesOf("Radio", module)
  .add("Radio", () => (
    <>
      <Radio labelText="I am a radio button" />
      <input type="radio" value="abc" name="abc" id="abc"/>  
    </>
  ))
  .add("Set to defaultChecked", () => (
    <>
      <Radio defaultChecked labelText="I am checked by default" />
      <input defaultChecked type="radio"/>
    </>
  ))
  .add("Set to disabled", () => (
    <>
      <Radio disabled labelText="I am disabled" />
      <input disabled type="radio"/>
      <Radio checked disabled labelText="I am disabled" />
      <input checked disabled type="radio"/>
    </>
  ))
  .add("Controlled", () => (
    <>
      <Radio checked labelText="I am controlled and checked" />
      <input checked type="radio"/>
      <Radio checked={ false } labelText="I am controlled and unchecked" />
      <input checked={ false } type="radio"/>
    </>
  ))
  .add("In Radio Group (TEMP EXAMPLE)", () => (
    <div role ="radiogroup">
      <Radio defaultChecked type="radio" id="Option 1" name="example" labelText="Option 1"/>
      <Radio type="radio" id="Option 2" name="example" labelText="Option 2" />
      <Radio type="radio" id="Option 3" name="example" labelText="Option 3" />
    </div>
  ));