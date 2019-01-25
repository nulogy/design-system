import React from "react";
import { storiesOf } from "@storybook/react";
import Label from "./Label";

storiesOf("Label", module)
  .add("Label", () => (
    <Label 
      labelText =  {{ children: "Default label" }}
    />
  ))
  .add("With requirement text", () => (
    <Label 
      labelText =  {{ children: "Default label" }}
      requirementText= {{ children: "(Optional)" }}
    />
  ))
  .add("With help text", () => (
    <Label 
      labelText =  {{ children: "Default label" }}
      helpText= {{ children: "Enter a date below" }}
    />
  ))
  .add("With format text", () => (
    <Label 
      labelText =  {{ children: "Default label" }}
      formatText= {{ children: "(DD-MM-YYYY)" }}
    />
  ))
  .add("With all additional text", () => (
    <Label 
      labelText =  {{ children: "Default label" }}
      requirementText= {{ children: "(Optional)" }}
      helpText= {{ children: "Enter a date below" }}
      formatText= {{ children: "(DD-MM-YYYY)" }}
    />
  ))
  .add("With a long text", () => (
    <Label 
      labelText =  {{ children: "Long long long long long long long long long long long long long long label" }}
      requirementText= {{ children: "(Optional)" }}
      helpText= {{ children: "Help text help text help text help text help text help text help text help text" }}
      formatText= {{ children: "(DD-MM-YYYY)" }}
    />
  ));
