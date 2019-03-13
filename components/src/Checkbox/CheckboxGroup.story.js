import React from "react";
import { storiesOf } from "@storybook/react";
import {
  Checkbox,
  CheckboxGroup,
} from "ComponentsRoot";

storiesOf("CheckboxGroup", module)
  .add("Checkbox Group", () => (
    <CheckboxGroup labelText="Setting Selection" name="settingSelection" defaultValue={ ["a"] }>
      <Checkbox value="a" labelText="Option A" />
      <Checkbox value="b" labelText="Option B" />
      <Checkbox value="c" labelText="Option C" />
    </CheckboxGroup>
  ))
  .add("with defaultValue", () => (
    <CheckboxGroup labelText="Setting Selection" name="settingSelection" defaultValue={ ["a"] }>
      <Checkbox value="a" labelText="Option A" />
      <Checkbox value="b" labelText="Option B" />
      <Checkbox value="c" labelText="Option C" />
    </CheckboxGroup>
  ))
  .add("with helpText", () => (
    <CheckboxGroup labelText="Setting Selection" helpText="Select a setting from the menu below:" name="settingSelection" defaultValue={ ["a"] }>
      <Checkbox value="a" labelText="Option A" />
      <Checkbox value="b" labelText="Option B" />
      <Checkbox value="c" labelText="Option C" />
    </CheckboxGroup>
  ))
  .add("with requirementText", () => (
    <CheckboxGroup labelText="Setting Selection" required requirementText="(Required)" name="settingSelection" defaultValue={ ["a"] }>
      <Checkbox value="a" labelText="Option A" />
      <Checkbox value="b" labelText="Option B" />
      <Checkbox value="c" labelText="Option C" />
    </CheckboxGroup>
  ))
  .add("with additional text", () => (
    <CheckboxGroup labelText="Setting Selection" helpText="Select a setting from the menu below:" required requirementText="(Required)" name="settingSelection" defaultValue={ ["a"] }>
      <Checkbox value="a" labelText="Option A" />
      <Checkbox value="b" labelText="Option B" />
      <Checkbox value="c" labelText="Option C" />
    </CheckboxGroup>
  ))
  .add("Set to disabled", () => (
    <CheckboxGroup disabled labelText="Setting Selection" name="settingSelection" defaultValue={ ["a"] }>
      <Checkbox value="a" labelText="Option A" />
      <Checkbox value="b" labelText="Option B" />
      <Checkbox value="c" labelText="Option C" />
    </CheckboxGroup>
  ))
  .add("Controlled", () => (
    <CheckboxGroup labelText="Setting Selection" name="settingSelection" checkedValue={ ["a"] } onChange={ () => {} }>
      <Checkbox value="a" labelText="Option A" />
      <Checkbox value="b" labelText="Option B" />
      <Checkbox value="c" labelText="Option C" />
    </CheckboxGroup>
  ));
