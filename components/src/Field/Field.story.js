import React from "react";
import { storiesOf } from "@storybook/react";
import Field from "./Field";
import Input from "../Input/Input";
import InlineValidation from "../Validation/InlineValidation"

storiesOf("Field", module)
  .add("Field", () => (
    <Field
      labelText="Default label"
    >
      <Input/>
      <InlineValidation message="There has been an error"/>
    </Field>
  ))
  .add("With requirement text", () => (
    <Field
      labelText="Default label"
      requirementText="(Optional)"
    />
  ))
  .add("With help text", () => (
    <Field
      labelText="Default label"
      helpText="Enter a date below"
    />
  ))
  .add("With format text", () => (
    <Field
      labelText="Default label"
      formatText="(DD-MM-YYYY)"
    />
  ))
  .add("With all additional text", () => (
    <Field
      labelText="Default label"
      requirementText="(Optional)"
      helpText="Enter a date below"
      formatText="(DD-MM-YYYY)"
    />
  ))
  .add("With a long text", () => (
    <Field
      labelText="Long long long long long long long long long long long long long long label"
      requirementText="(Optional)"
      helpText="Help text help text help text help text help text help text help text help text"
      formatText="(DD-MM-YYYY)"
    />
  ));
