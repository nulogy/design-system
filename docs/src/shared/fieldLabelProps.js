const fieldLabelProps = [
  {
    name: "labelText",
    type: "String",
    defaultValue: "Required",
    description: "Informs users what the corresponding input field is for."
  },
  {
    name: "helpText",
    type: "String",
    defaultValue: "null",
    description:
      "Placed below the label to provide assistance on how to fill out a field or the expected format. It can also provide an explanation of why the information is needed and how it will be used."
  },
  {
    name: "requirementText",
    type: "String",
    defaultValue: "null",
    description: "Text to add to the the label: (Optional) or (Required)."
  },
  {
    name: "className",
    type: "String",
    defaultValue: "undefined",
    description: "className passed to the group wrapper."
  }
];

export default fieldLabelProps;
