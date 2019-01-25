import React from "react";
import { storiesOf } from "@storybook/react";
import Label from "./Label";

storiesOf("Label", module)
  .add("Label", () => (
    <Label 
      labelText = "Default label"
    />
  ))
  .add("With requirement text", () => (
    <Label 
      labelText = "Default label"
      requirementText = "(Optional)"
    />
  ))
  .add("With help text", () => (
    <Label 
      labelText = "Default label"
      helpText = "Enter a date below"
    />
  ))
  .add("With format text", () => (
    <Label 
      labelText = "Default label"
      formatText = "(DD-MM-YYYY)"
    />
  ))
  .add("With all additional text", () => (
    <Label 
      labelText = "Default label"
      requirementText = "(Optional)"
      helpText = "Enter a date below"
      formatText = "(DD-MM-YYYY)"
    />
  ))
  .add("With a long text", () => (
    <Label 
      labelText = "Long long long long long long long long long long long long long long label"
      requirementText = "(Optional)"
      helpText = "Help text help text help text help text help text help text help text help text"
      formatText = "(DD-MM-YYYY)"
    />
  ));
