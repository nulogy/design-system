import React from "react";
import { storiesOf } from "@storybook/react";
import Field from "../Field/Field";
import Input from "../Input/Input";
import Form from "./Form";
import FormSection from "./FormSection";

storiesOf("Form", module)
  .add("Form", () => (
    <Form
      title="New Profile"
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
    </Form>
  ))
  .add("Without title", () => (
    <Form>
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
    </Form>
  ))
  .add("With form sections", () => (
    <Form
      title="New Profile"
    >
      <FormSection
        title="Personal Information"
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
      <FormSection
        title="General Information"
      >
        <Field
          labelText="Gender"
        >
          <Input />
        </Field>
        <Field
          labelText="Ocupation"
        >
          <Input />
        </Field>
      </FormSection>
    </Form>
  ))
  .add("With form sections without titles", () => (
    <Form
      title="New Profile"
    >
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
      <FormSection>
        <Field
          labelText="Gender"
        >
          <Input />
        </Field>
        <Field
          labelText="Ocupation"
        >
          <Input />
        </Field>
      </FormSection>
    </Form>
  ));
