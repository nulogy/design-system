import React from "react";
import { storiesOf } from "@storybook/react";
import Field from "../Field/Field";
import Input from "../Input/Input";
import Form from "./Form";
import FormSection from "./FormSection";
import Checkbox from "../Checkbox/Checkbox";
import Radio from "../Radio/Radio";
import RadioGroup from "../Radio/RadioGroup";
import ToggleWithText from "../Toggle/Toggle";
import InlineValidation from "../Validation/InlineValidation";
import HeaderValidation from "../Validation/HeaderValidation";
import List from "../List/List";
import ListItem from "../List/ListItem";
import Select from "../Select/Select";


const options = [
  { value: "planned", label: "Planned" },
  { value: "booked", label: "Booked" },
];

storiesOf("Form", module)
  .add("Form", () => (
    <Form title="New Profile">
      <Field labelText="Name">
        <Input />
      </Field>
      <Field
        labelText="Date of birth" requirementText="(Optional)" helpText="Enter a date below"
        formatText="(DD-MM-YYYY)"
      >
        <Input />
      </Field>
      <Field
        labelText="Place of birth" requirementText="(Optional)"
      >
        <Input />
      </Field>
    </Form>
  ))
  .add("Without title", () => (
    <Form>
      <Field labelText="Name">
        <Input />
      </Field>
      <Field
        labelText="Date of birth" requirementText="(Optional)" helpText="Enter a date below"
        formatText="(DD-MM-YYYY)"
      >
        <Input />
      </Field>
      <Field labelText="Place of birth" requirementText="(Optional)">
        <Input />
      </Field>
    </Form>
  ))
  .add("With form sections", () => (
    <Form title="New Profile">
      <FormSection title="Personal Information">
        <Field
          labelText="Name"
        >
          <Input />
        </Field>
        <Field
          labelText="Date of birth" requirementText="(Optional)" helpText="Enter a date below"
          formatText="(DD-MM-YYYY)"
        >
          <Input />
        </Field>
        <Field labelText="Place of birth" requirementText="(Optional)">
          <Input />
        </Field>
      </FormSection>
      <FormSection title="General Information">
        <Field labelText="Gender">
          <Input />
        </Field>
        <Field labelText="Ocupation">
          <Input />
        </Field>
      </FormSection>
    </Form>
  ))
  .add("With form sections without titles", () => (
    <Form title="New Profile">
      <FormSection>
        <Field labelText="Name">
          <Input />
        </Field>
        <Field
          labelText="Date of birth" requirementText="(Optional)" helpText="Enter a date below"
          formatText="(DD-MM-YYYY)"
        >
          <Input />
        </Field>
        <Field labelText="Place of birth" requirementText="(Optional)">
          <Input />
        </Field>
      </FormSection>
      <FormSection>
        <Field labelText="Gender">
          <Input />
        </Field>
        <Field labelText="Ocupation">
          <Input />
        </Field>
      </FormSection>
    </Form>
  ))
  .add("Demo form", () => (
    <>
      <Form title="Job 324400">
        <HeaderValidation message="Instructions and description of an error" title="Error has occured ...">
          <List compact>
            <ListItem>Affected field</ListItem>
            <ListItem>Unmet criteria</ListItem>
            <ListItem><a href="https://nulogy.design/">Affected field</a></ListItem>
          </List>
        </HeaderValidation>
        <FormSection title="Job Information">
          <Field labelText="Project">
            <Input placeholder="Project 128703" />
          </Field>
          <Field
            labelText="Project description" requirementText="(Optional)"
            helpText="Project description helps identify the project."
          >
            <Input />
          </Field>
          <Field
            labelText="Project status"
          >
            <Select options={ options } />
          </Field>
          <Field labelText="Item code">
            <Input error value="WS2SB6" />
            <InlineValidation message="Item WS2SB6 does not exist." />
          </Field>
          <Field labelText="Eaches expected on Job">
            <Input placeholder="2 000" />
          </Field>
          <Field labelText="Eaches remaining on Project">
            <Input value="18 000" disabled />
          </Field>
          <Field labelText="Scheduled start" formatText="(Expected format: MMM DD, YYYY)">
            <Input placeholder="May 26, 2019" />
          </Field>
          <Field labelText="Scheduled end" formatText="(Expected format: MMM DD, YYYY)">
            <Input disabled value="June 29, 2019" />
          </Field>

          <Field labelText="Line Lead" requirementText="(Optional)">
            <Checkbox labelText="Christiaan Oostenbrug" />
            <Checkbox labelText="Matt Dunn" />
            <Checkbox disabled checked labelText="Clemens Park" />
            <Checkbox disabled labelText="Nikola Pejcic" />
          </Field>
          <Field labelText="Reconcile">
            <RadioGroup name="settingSelection" defaultValue="yes">
              <Radio value="yes" labelText="Yes" />
              <Radio value="no" labelText="No" />
              <Radio value="maybe" labelText="Maybe" disabled />
            </RadioGroup>
            <InlineValidation message="Yes can be only selected ..." />
          </Field>
          <Field labelText="Job visibility">
            <ToggleWithText
              onText="Visible" offText="Hidden"
            />
          </Field>
        </FormSection>
        <FormSection title="Rejects">
          <Field labelText="Item">
            <Input error value="235432" />
            <InlineValidation message="Item 235432 is not a valid entry.">
              <List compact>
                <ListItem>Item is at least 8 characters long.</ListItem>
                <ListItem>Item contains at least 1 letter.</ListItem>
              </List>
            </InlineValidation>
          </Field>
          <Field labelText="Quantity">
            <Input />
          </Field>

          <Field labelText="Reject visibility">
            <ToggleWithText
              onText="Visible" offText="Hidden" disabled
            />
          </Field>
        </FormSection>
      </Form>
    </>
  ));
