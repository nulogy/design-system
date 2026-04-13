import { Checkbox, CheckboxGroup } from "../index";

const errorList = ["Error message 1", "Error message 2"];

export default {
  title: "Components/CheckboxGroup",
};

export const _CheckboxGroup = {
  render: () => (
    <CheckboxGroup labelText="Setting Selection" name="settingSelection">
      <Checkbox value="a" labelText="Option A" />
      <Checkbox value="b" labelText="Option B" />
      <Checkbox value="c" labelText="Option C" />
    </CheckboxGroup>
  ),

  name: "CheckboxGroup",
};

export const CheckboxGroupWithAllProps = {
  render: () => (
    <CheckboxGroup
      labelText="Setting Selection"
      name="settingSelection"
      helpText="Select a setting from the menu below:"
      required
      requirementText="(Required)"
      hint="This is a hint"
      defaultValue={["a"]}
    >
      <Checkbox value="a" labelText="Option A" />
      <Checkbox value="b" labelText="Option B" />
      <Checkbox value="c" labelText="Option C" />
    </CheckboxGroup>
  ),

  name: "CheckboxGroup with all props",
};

export const WithErrorMessage = {
  render: () => (
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
  ),

  name: "with error message",
};

export const WithErrorList = {
  render: () => (
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
  ),

  name: "with error list",
};

export const SetToDisabled = {
  render: () => (
    <CheckboxGroup disabled labelText="Setting Selection" name="settingSelection" defaultValue={["a"]}>
      <Checkbox value="a" labelText="Option A" />
      <Checkbox value="b" labelText="Option B" />
      <Checkbox value="c" labelText="Option C" />
    </CheckboxGroup>
  ),

  name: "Set to disabled",
};

export const Controlled = () => (
  <CheckboxGroup labelText="Setting Selection" name="settingSelection" checkedValue={["a"]} onChange={() => {}}>
    <Checkbox value="a" labelText="Option A" />
    <Checkbox value="b" labelText="Option B" />
    <Checkbox value="c" labelText="Option C" />
  </CheckboxGroup>
);
