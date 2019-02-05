import React from "react";
import { storiesOf } from "@storybook/react";
import Radio from "./Radio";

storiesOf("Radio", module)
  .add("Radio", () => (
    <>
      <Radio labelText="I am a radio button" />
      <input type="radio"/>
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
      <br />
      <Radio checked disabled labelText="I am disabled" />
      <input checked disabled type="radio"/>
    </>
  ))
  .add("Controlled", () => (
    <>
      <Radio checked labelText="I am controlled and checked" />
      <input checked type="radio"/>
      <br />
      <Radio checked={ false } labelText="I am controlled and unchecked" />
      <input checked={ false } type="radio"/>
    </>
  ));