import React from "react";
import { storiesOf } from "@storybook/react";
import Field from "./Field";
import Input from "../Input/Input";
import InlineValidation from "../Validation/InlineValidation";
import List from "../List/List";
import ListItem from "../List/ListItem";

storiesOf("Field", module)
  .add("Field", () => (
    <Field labelText="Default label" />
  ))
  .add("With Input and InlineValidation", () => (
    <Field labelText="Default label">
      <Input />
      <InlineValidation message="There has been an error" />
    </Field>
  ))
  .add("With Label for Input", () => (
    <Field labelText="Default label" for="thisInput">
      <Input id="thisInput" />
      <InlineValidation message="There has been an error" />
    </Field>
  ))
  .add("With requirement text", () => (
    <Field labelText="Default label" requirementText="(Optional)" />
  ))
  .add("With help text", () => (
    <Field labelText="Default label" helpText="Enter a date below" />
  ))
  .add("With format text", () => (
    <Field labelText="Default label" formatText="(DD-MM-YYYY)" />
  ))
  .add("With all additional components", () => (
    <Field
      labelText="Default label" requirementText="(Optional)" helpText="Enter a date below"
      formatText="(DD-MM-YYYY)" for="thisInput1"
    >
      <Input id="thisInput1" />
      <InlineValidation message="There has been an error">
        <List compact>
          <ListItem>Something has gone wrong.</ListItem>
          <ListItem>Entry must be atleast 3 characters long</ListItem>
          <ListItem><a href="https://nulogy.design/">See here</a></ListItem>
        </List>
      </InlineValidation>
    </Field>
  ))
  .add("With a long text", () => (
    <Field
      labelText="Long long long long long long long long long long long long long long label"
      requirementText="(Optional)"
      helpText="Help text help text help text help text help text help text help text help text"
      formatText="(DD-MM-YYYY)"
    />
  ));
