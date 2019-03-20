const inputProps = [
  {
    name: "disabled", type: "Boolean", defaultValue: "false", description: "Marks the field as disabled and disallows user input",
  },
  {
    name: "error", type: "String", defaultValue: "null", description: "Sets the error state and displays message",
  },
  {
    name: "helpText", type: "String", defaultValue: "null", description: "Additional instruction to show up below label",
  },
  {
    name: "id", type: "String", defaultValue: "Required", description: "A unique ID for this input",
  },
  {
    name: "labelText", type: "String", defaultValue: "null", description: "Label for the input",
  },
  {
    name: "placeholder", type: "String", defaultValue: "null", description: "A hint to the expected format for the field. Not a replacement for a label.",
  },
  {
    name: "required", type: "Boolean", defaultValue: "false", description: "Makes the field require selection before the form will submit",
  },
  {
    name: "requirementText", type: "String", defaultValue: "null", description: "(Optional) or (Required)",
  }
];

export default inputProps;
