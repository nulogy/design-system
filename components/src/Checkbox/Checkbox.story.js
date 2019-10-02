import React from "react";
import { storiesOf } from "@storybook/react";
import { Checkbox } from "../index";

storiesOf("Checkbox", module)
  .add("Checkbox", () => <Checkbox id="checkbox" labelText="I am a checkbox" />)
  .add("Set to defaultChecked", () => <Checkbox id="checkbox" defaultChecked labelText="I am checked by default" />)
  .add("Set to disabled", () => (
    <>
      <Checkbox id="checkbox-1" disabled labelText="I am disabled" />
      <Checkbox id="checkbox-2" checked disabled labelText="I am disabled" />
    </>
  ))
  .add("Checkbox with no label", () => (
    <>
      <Checkbox />
    </>
  ))
  .add("Set to error", () => (
    <>
      <Checkbox id="checkbox" error labelText="I am error" />
      <Checkbox id="checkbox" defaultChecked error labelText="I am error" />
    </>
  ))
  .add("Set to required", () => (
    <>
      <Checkbox id="checkbox" labelText="I am a checkbox" required />
    </>
  ))
  .add("Controlled", () => (
    <>
      <Checkbox id="checkbox-1" checked onChange={() => {}} labelText="I am controlled and checked" />
      <Checkbox id="checkbox-2" checked={false} onChange={() => {}} labelText="I am controlled and unchecked" />
    </>
  ));
