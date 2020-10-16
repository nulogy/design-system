import React from "react";
import { FieldLabel, Input } from "../index";
import { Link } from "../Link";

const CustomInput = props => <Input {...props} />;

const helpTextWithLink = (
  <>
    I am help text. I can be a string or a node that includes a <Link href="http://nulogy.design">link</Link>.
  </>
);

export default {
  title: "Components/FieldLabel"
};

export const _FieldLabel = () => <FieldLabel labelText="Default label" />;

_FieldLabel.story = {
  name: "FieldLabel"
};

export const WithHelpText = () => <FieldLabel labelText="Default label" helpText={helpTextWithLink} />;

WithHelpText.story = {
  name: "with HelpText"
};

export const WithRequirementText = () => <FieldLabel labelText="Default label" requirementText="(Required)" />;

WithRequirementText.story = {
  name: "with RequirementText"
};

export const WithAllAdditionalText = () => (
  <FieldLabel
    labelText="Default label"
    helpText="I am help text. I can give more details on the input below!"
    requirementText="(Required)"
  />
);

WithAllAdditionalText.story = {
  name: "with all additional text"
};

export const WithAssociatedCustomInputComponent = () => (
  <FieldLabel
    labelText="Default label"
    helpText="I am help text. I can give more details on the input below!"
    requirementText="(Required)"
  >
    <CustomInput id="input1" />
  </FieldLabel>
);

WithAssociatedCustomInputComponent.story = {
  name: "with associated custom input component"
};

export const WithSpace = () => (
  <FieldLabel
    labelText="Default label"
    helpText="I am help text. I can give more details on the input below!"
    requirementText="(Required)"
    mt="x2"
    p="x1"
  >
    <CustomInput id="input1" />
  </FieldLabel>
);
