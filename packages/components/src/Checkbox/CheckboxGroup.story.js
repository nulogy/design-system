import React from "react";
import { storiesOf } from "@storybook/react";
import { Checkbox, CheckboxGroup } from "../index";

const errorList = ["Error message 1", "Error message 2"];

storiesOf("Components/CheckboxGroup", module)
  .add("CheckboxGroup", () => (
    <CheckboxGroup labelText="Setting Selection" name="settingSelection">
      <Checkbox value="a" labelText="Option A" />
      <Checkbox value="b" labelText="Option B" />
      <Checkbox value="c" labelText="Option C" />
    </CheckboxGroup>
  ))
  .add("CheckboxGroup with all props", () => (
    <CheckboxGroup
      labelText="Setting Selection"
      name="settingSelection"
      helpText="Select a setting from the menu below:"
      required
      requirementText="(Required)"
      defaultValue={["a"]}
    >
      <Checkbox value="a" labelText="Option A" />
      <Checkbox value="b" labelText="Option B" />
      <Checkbox value="c" labelText="Option C" />
    </CheckboxGroup>
  ))
  .add("with error message", () => (
    <CheckboxGroup
      errorMessage="Please select an option"
      labelText="Setting Selection"
      name="settingSelection"
      defaultValue={["a"]}
    >
      <Checkbox value="a" labelText="Option A" />
      <Checkbox value="b" labelText="Option B" />
      <Checkbox value="c" labelText="Option C" />
    </CheckboxGroup>
  ))
  .add("with error list", () => (
    <CheckboxGroup
      errorMessage="Please select an option"
      errorList={errorList}
      labelText="Setting Selection"
      name="settingSelection"
      defaultValue={["a"]}
    >
      <Checkbox value="a" labelText="Option A" />
      <Checkbox value="b" labelText="Option B" />
      <Checkbox value="c" labelText="Option C" />
    </CheckboxGroup>
  ))
  .add("Set to disabled", () => (
    <CheckboxGroup disabled labelText="Setting Selection" name="settingSelection" defaultValue={["a"]}>
      <Checkbox value="a" labelText="Option A" />
      <Checkbox value="b" labelText="Option B" />
      <Checkbox value="c" labelText="Option C" />
    </CheckboxGroup>
  ))
  .add("Controlled", () => (
    <CheckboxGroup labelText="Setting Selection" name="settingSelection" checkedValue={["a"]} onChange={() => {}}>
      <Checkbox value="a" labelText="Option A" />
      <Checkbox value="b" labelText="Option B" />
      <Checkbox value="c" labelText="Option C" />
    </CheckboxGroup>
  ));
