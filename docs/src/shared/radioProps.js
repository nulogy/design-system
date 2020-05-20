const radioProps = [
  {
    name: "id",
    type: "String",
    defaultValue: "null",
    description: "A unique ID for this input"
  },
  {
    name: "name",
    type: "String",
    defaultValue: "undefined",
    description: "Identified that groups inputs together"
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
  },
  {
    name: "className",
    type: "String",
    defaultValue: "undefined",
    description: "className passed to the wrapper"
  }
];

export default radioProps;
