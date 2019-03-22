const groupProps = [
  {
    name: "defaultValue", type: "String", defaultValue: "null", description: "A value to autoselect on pageload",
  },
  {
    name: "error", type: "String", defaultValue: "null", description: "Sets the error state and displays message",
  },
  {
    name: "helpText", type: "String", defaultValue: "null", description: "Additional instruction to show up below label",
  },
  {
    name: "labelText", type: "String", defaultValue: "Required", description: "Label for the input",
  },
  {
    name: "name", type: "String", defaultValue: "Required", description: "A unique name for this input",
  },
  {
    name: "required", type: "Boolean", defaultValue: "false", description: "Makes the field require selection before the form will submit",
  },
  {
    name: "requirementText", type: "String", defaultValue: "null", description: "(Optional) or (Required)",
  },
];

export default groupProps;
