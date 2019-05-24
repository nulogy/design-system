const radioProps = [
  {
    name: "id",
    type: "String",
    defaultValue: "Required",
    description: "A unique ID for this input"
  },
  {
    name: "name",
    type: "undefined",
    defaultValue: "Required",
    description: "Identified that groups inputs together"
  },
  {
    name: "value",
    type: "undefined",
    defaultValue: "Required",
    description: "Value of selection for submission"
  },
  {
    name: "defaultChecked",
    type: "Boolean",
    defaultValue: "false",
    description: "Makes the field checked by default"
  },
  {
    name: "disabled",
    type: "Boolean",
    defaultValue: "false",
    description: "Marks the field as disabled and disallows user input"
  },
  {
    name: "error",
    type: "Boolean",
    defaultValue: "false",
    description: "Marks the field as invalid and turns red"
  },
  {
    name: "labelText",
    type: "String",
    defaultValue: "Required",
    description: "Label for the input"
  },
  {
    name: "onChange",
    type: "Function",
    defaultValue: "null",
    description: ""
  },
  {
    name: "required",
    type: "Boolean",
    defaultValue: "false",
    description: "Makes the field require input before the form will submit"
  }
];

export default radioProps;
