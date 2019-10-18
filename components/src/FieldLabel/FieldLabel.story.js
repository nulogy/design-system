import React from "react";
import { storiesOf } from "@storybook/react";
import { FieldLabel, Input } from "../index";
import { Link } from "../Link";

const CustomInput = props => <Input {...props} />;

const helpTextWithLink = (
  <>
    I am help text. I can be a string or a node that includes a <Link href="http://nulogy.design">link</Link>.
  </>
);

storiesOf("FieldLabel", module)
  .add("FieldLabel", () => <FieldLabel labelText="Default label" />)
  .add("with HelpText", () => <FieldLabel labelText="Default label" helpText={helpTextWithLink} />)
  .add("with RequirementText", () => <FieldLabel labelText="Default label" requirementText="(Required)" />)
  .add("with all additional text", () => (
    <FieldLabel
      labelText="Default label"
      helpText="I am help text. I can give more details on the input below!"
      requirementText="(Required)"
    />
  ))
  .add("with associated custom input component", () => (
    <FieldLabel
      labelText="Default label"
      helpText="I am help text. I can give more details on the input below!"
      requirementText="(Required)"
    >
      <CustomInput id="input1" />
    </FieldLabel>
  ));
