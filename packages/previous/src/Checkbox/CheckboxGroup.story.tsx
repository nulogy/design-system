import React from "react";
import { Checkbox, CheckboxGroup } from "../index";

const errorList = ["Error message 1", "Error message 2"];

export default {
  title: "Components/CheckboxGroup",
};

export const _CheckboxGroup = () => (
  <CheckboxGroup labelText="Setting Selection" name="settingSelection">
    <Checkbox value="a" labelText="Option A" />
    <Checkbox value="b" labelText="Option B" />
    <Checkbox value="c" labelText="Option C" />
  </CheckboxGroup>
);

_CheckboxGroup.story = {
  name: "CheckboxGroup",
};

export const CheckboxGroupWithAllProps = () => (
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
);

CheckboxGroupWithAllProps.story = {
  name: "CheckboxGroup with all props",
};

export const WithErrorMessage = () => (
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
);

WithErrorMessage.story = {
  name: "with error message",
};

export const WithErrorList = () => (
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
);

WithErrorList.story = {
  name: "with error list",
};

export const SetToDisabled = () => (
  <CheckboxGroup disabled labelText="Setting Selection" name="settingSelection" defaultValue={["a"]}>
    <Checkbox value="a" labelText="Option A" />
    <Checkbox value="b" labelText="Option B" />
    <Checkbox value="c" labelText="Option C" />
  </CheckboxGroup>
);

SetToDisabled.story = {
  name: "Set to disabled",
};

export const Controlled = () => (
  <CheckboxGroup labelText="Setting Selection" name="settingSelection" checkedValue={["a"]} onChange={() => {}}>
    <Checkbox value="a" labelText="Option A" />
    <Checkbox value="b" labelText="Option B" />
    <Checkbox value="c" labelText="Option C" />
  </CheckboxGroup>
);
