import React from "react";
import { FieldLabel, Input } from "../index";
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
