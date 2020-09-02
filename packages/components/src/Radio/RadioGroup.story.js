import React from "react";
import { storiesOf } from "@storybook/react";
import { Radio, RadioGroup } from "../index";

const errorList = ["Error message 1", "Error message 2"];

storiesOf("Components/RadioGroup", module)
  .add("RadioGroup", () => (
    <RadioGroup labelText="Setting Selection" name="settingSelection">
      <Radio value="a" labelText="Option A" />
      <Radio value="b" labelText="Option B" />
      <Radio value="c" labelText="Option C" />
    </RadioGroup>
  ))
  .add("RadioGroup with all props", () => (
    <RadioGroup
      labelText="Setting Selection"
      name="settingSelection"
      helpText="Select a setting from the menu below:"
      required
      requirementText="(Required)"
      defaultValue="a"
    >
      <Radio value="a" labelText="Option A" />
      <Radio value="b" labelText="Option B" />
      <Radio value="c" labelText="Option C" />
    </RadioGroup>
  ))
  .add("with error message", () => (
    <RadioGroup
      errorMessage="Please select an option"
      labelText="Setting Selection"
      name="settingSelection"
      defaultValue="a"
    >
      <Radio value="a" labelText="Option A" />
      <Radio value="b" labelText="Option B" />
      <Radio value="c" labelText="Option C" />
    </RadioGroup>
  ))
  .add("with error list", () => (
    <RadioGroup
      errorMessage="Please select an option"
      errorList={errorList}
      labelText="Setting Selection"
      name="settingSelection"
      defaultValue="a"
    >
      <Radio value="a" labelText="Option A" />
      <Radio value="b" labelText="Option B" />
      <Radio value="c" labelText="Option C" />
    </RadioGroup>
  ))
  .add("Set to disabled", () => (
    <RadioGroup disabled labelText="Setting Selection" name="settingSelection" defaultValue="a">
      <Radio value="a" labelText="Option A" />
      <Radio value="b" labelText="Option B" />
      <Radio value="c" labelText="Option C" />
    </RadioGroup>
  ))
  .add("Controlled", () => (
    <RadioGroup labelText="Setting Selection" name="settingSelection" checkedValue="a" onChange={() => {}}>
      <Radio value="a" labelText="Option A" />
      <Radio value="b" labelText="Option B" />
      <Radio value="c" labelText="Option C" />
    </RadioGroup>
  ));
