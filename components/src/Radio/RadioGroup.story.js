import React from "react";
import { storiesOf } from "@storybook/react";
import {
  Radio,
  RadioGroup,
} from "ComponentsRoot";

storiesOf("RadioGroup", module)
  .add("Radio Group", () => (
    <RadioGroup labelText="Setting Selection" name="settingSelection" defaultValue="a">
      <Radio value="a" labelText="Option A" />
      <Radio value="b" labelText="Option B" />
      <Radio value="c" labelText="Option C" />
    </RadioGroup>
  ))
  .add("With error", () => (
    <RadioGroup error="Please select an option" labelText="Setting Selection" name="settingSelection" defaultValue="a">
      <Radio value="a" labelText="Option A" />
      <Radio value="b" labelText="Option B" />
      <Radio value="c" labelText="Option C" />
    </RadioGroup>
  ))
  .add("with helpText", () => (
    <RadioGroup labelText="Setting Selection" helpText="Select a setting from the menu below:" name="settingSelection" defaultValue="a">
      <Radio value="a" labelText="Option A" />
      <Radio value="b" labelText="Option B" />
      <Radio value="c" labelText="Option C" />
    </RadioGroup>
  ))
  .add("with requirementText", () => (
    <RadioGroup labelText="Setting Selection" required requirementText="(Required)" name="settingSelection" defaultValue="a">
      <Radio value="a" labelText="Option A" />
      <Radio value="b" labelText="Option B" />
      <Radio value="c" labelText="Option C" />
    </RadioGroup>
  ))
  .add("with additional text", () => (
    <RadioGroup labelText="Setting Selection" helpText="Select a setting from the menu below:" required requirementText="(Required)" name="settingSelection" defaultValue="a">
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
    <RadioGroup labelText="Setting Selection" name="settingSelection" checkedValue="a" onChange={ () => {} }>
      <Radio value="a" labelText="Option A" />
      <Radio value="b" labelText="Option B" />
      <Radio value="c" labelText="Option C" />
    </RadioGroup>
  ));
