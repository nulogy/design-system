import React from "react";
import { Field, FieldLabel, Input, Select, Toggle, RadioGroup, Radio, Flex } from "../index";
import { Link } from "../Link";

const helpTextWithLink = (
  <>
    I am help text. I can be a string or a node that includes a <Link href="http://nulogy.design">link</Link>.
  </>
);

export default {
  title: "Components/FieldLabel",
};

export const _FieldLabel = () => <FieldLabel labelText="Default label" />;

_FieldLabel.story = {
  name: "FieldLabel",
};

export const WithHelpText = () => <FieldLabel labelText="Default label" helpText={helpTextWithLink} />;

export const WithRequirementText = () => <FieldLabel labelText="Default label" requirementText="(Required)" />;

export const WithAllAdditionalText = () => (
  <FieldLabel
    labelText="Default label"
    helpText="I am help text. I can give more details on the input below!"
    requirementText="(Required)"
  />
);

export const WithAssociatedCustomInputComponent = () => (
  <FieldLabel
    labelText="Default label"
    helpText="I am help text. I can give more details on the input below!"
    requirementText="(Required)"
    htmlFor="input-1"
  >
    <Input id="input-1" />
  </FieldLabel>
);

export const WithHint = () => (
  <FieldLabel
    labelText="Default label"
    helpText="I am help text. I can give more details on the input below!"
    requirementText="(Required)"
    hint="This is a hint for the input field"
  >
    <Input />
  </FieldLabel>
);

export const WithRangeOfInputComponents = () => (
  <Flex gap="x3" p="x3" borderStyle="dotted" borderWidth="1px" borderColor="lime">
    <FieldLabel
      labelText="Label with HelpText that is required"
      helpText="I am help text. I can give more details on the input below!"
      requirementText="(Required)"
    >
      <Input />
    </FieldLabel>
    <FieldLabel
      labelText="Label with HelpText that is required"
      helpText="I am help text. I can give more details on the input below!"
      hint="This is a hint for the input field"
    >
      <Input />
    </FieldLabel>
    <FieldLabel labelText="Label with hint" hint="This is a hint for the input field">
      <Input />
    </FieldLabel>

    <FieldLabel labelText="Label with hint" requirementText="(Required)">
      <Select
        options={[
          { value: 1, label: "This is the first option" },
          { value: 2, label: "This is 2nd option" },
        ]}
      />
    </FieldLabel>

    <FieldLabel labelText="Label with hint" hint="This is a hint for the input field" requirementText="(Required)">
      <Toggle onText="on" offText="off" defaultToggled />
    </FieldLabel>
    <FieldLabel labelText="Label with hint" hint="This is a hint for the input field" requirementText="(Required)">
      <RadioGroup name="settingSelection">
        <Radio value="a" labelText="Option A" />
        <Radio value="b" labelText="Option B" />
        <Radio value="c" labelText="Option C" />
      </RadioGroup>
    </FieldLabel>
  </Flex>
);
