import React from "react";
import { Radio, RadioGroup, Icon, Tooltip } from "../index";

const errorList = ["Error message 1", "Error message 2"];

export default {
  title: "Components/RadioGroup",
  parameters: {
    chromatic: { diffThreshold: 0.3 },
  },
};

export const _RadioGroup = () => (
  <RadioGroup labelText="Setting Selection" name="settingSelection">
    <Radio value="a" labelText="Option A" />
    <Radio value="b" labelText="Option B" />
    <Radio value="c" labelText="Option C" />
  </RadioGroup>
);

_RadioGroup.story = {
  name: "RadioGroup",
};

export const RadioGroupWithAllProps = () => (
  <RadioGroup
    labelText="Setting Selection"
    name="settingSelection"
    helpText="Select a setting from the menu below:"
    required
    requirementText="(Required)"
    defaultValue="a"
  >
    <Radio
      value="a"
      labelText={
        <>
          Option A
          <Tooltip placement="bottom" tooltip="Option A is a special option with extra information" defaultOpen>
            <Icon icon="help" color="darkBlue" size="16px" ml="x1" />
          </Tooltip>
        </>
      }
    />
    <Radio value="b" labelText="Option B" />
    <Radio value="c" labelText="Option C" />
  </RadioGroup>
);

RadioGroupWithAllProps.story = {
  name: "RadioGroup with all props",
};

RadioGroupWithAllProps.parameters = {
  chromatic: { diffThreshold: 0.3 },
};

export const WithErrorMessage = () => (
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
);

WithErrorMessage.story = {
  name: "with error message",
};

export const WithErrorList = () => (
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
);

WithErrorList.story = {
  name: "with error list",
};

export const SetToDisabled = () => (
  <RadioGroup disabled labelText="Setting Selection" name="settingSelection" defaultValue="a">
    <Radio value="a" labelText="Option A" />
    <Radio value="b" labelText="Option B" />
    <Radio value="c" labelText="Option C" />
  </RadioGroup>
);

SetToDisabled.story = {
  name: "Set to disabled",
};

export const Controlled = () => (
  <RadioGroup labelText="Setting Selection" name="settingSelection" checkedValue="a" onChange={() => {}}>
    <Radio value="a" labelText="Option A" />
    <Radio value="b" labelText="Option B" />
    <Radio value="c" labelText="Option C" />
  </RadioGroup>
);
