import React from "react";
import { storiesOf } from "@storybook/react";
import Field from "../Field/Field";
import Input from "../Input/Input";
import FormSection from "./FormSection";

storiesOf("Form Section", module)
  .add("Form section", () => (
    <FormSection
      title="dsfds"
    >
      <Field
        labelText="Name"
      >
        <Input />
      </Field>
      <Field
        labelText="Date of birth"
        requirementText="(Optional)"
        helpText="Enter a date below"
        formatText="(DD-MM-YYYY)"
      >
        <Input />
      </Field>
      <Field
        labelText="Place of birth"
        requirementText="(Optional)"
      >
        <Input />
      </Field>
    </FormSection>
  ))
  .add("Without title", () => (
    <FormSection>
      <Field
        labelText="Name"
      >
        <Input />
      </Field>
      <Field
        labelText="Date of birth"
        requirementText="(Optional)"
        helpText="Enter a date below"
        formatText="(DD-MM-YYYY)"
      >
        <Input />
      </Field>
      <Field
        labelText="Place of birth"
        requirementText="(Optional)"
      >
        <Input />
      </Field>
    </FormSection>
  ));
