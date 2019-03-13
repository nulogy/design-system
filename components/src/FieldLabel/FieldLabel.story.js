import React from "react";
import { storiesOf } from "@storybook/react";
import {
  FieldLabel,
  Input,
} from "ComponentsRoot";

const CustomInput = props => (<Input { ...props } />);

storiesOf("FieldLabel", module)
  .add("FieldLabel", () => (
    <FieldLabel labelText="Default label" />
  ))
  .add("with HelpText", () => (
    <FieldLabel labelText="Default label" helpText="I am help text. I can give more details on the input below!" />
  ))
  .add("with RequirementText", () => (
    <FieldLabel labelText="Default label" requirementText="(Required)" />
  ))
  .add("with all additional text", () => (
    <FieldLabel labelText="Default label" helpText="I am help text. I can give more details on the input below!" requirementText="(Required)" />
  ))
  .add("with associated custom input component", () => (
    <>
      <FieldLabel mb="x1" htmlFor="input1" labelText="Default label" helpText="I am help text. I can give more details on the input below!" requirementText="(Required)" />
      <CustomInput id="input1" />
    </>
  ));
