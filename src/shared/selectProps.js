import inputProps from "./inputProps";

const selectProps = [
  {
    name: "autocomplete",
    type: "Boolean",
    defaultValue: "true",
    description: "Whether or not typing will filter the options list"
  },
  {
    name: "options",
    type: "Array",
    defaultValue: "Required",
    description:
      "The options available to be selected, containing a value and a label"
  },
  {
    name: "maxHeight",
    type: "String",
    defaultValue: "256px",
    description: "Max height of the select dropdown menu, content is scrollable"
  },
  {
    name: "multiselect",
    type: "Boolean",
    defaultValue: "false",
    description: "Whether or not multiple selections can be made"
  },
  {
    name: "value",
    type: "String | Array",
    defaultValue: "undefined",
    description: "Value of input, used when controlling the component"
  },
  {
    name: "defaultValue",
    type: "String | Array",
    defaultValue: "",
    description: "Default value of input"
  },
  {
    name: "menuIsOpen",
    type: "Boolean",
    defaultValue: "undefined",
    description:
      "Controls whether the menu is open; If unset, then NDS controls this implicitly instead"
  },
  {
    name: "onMenuOpen",
    type: "Function",
    defaultValue: "undefined",
    description: "Event handler for when the menu is opened"
  },
  {
    name: "onMenuClose",
    type: "Function",
    defaultValue: "undefined",
    description: "Event handler for when the menu is closed"
  },
  {
    name: "onInputChange",
    type: "Function",
    defaultValue: "undefined",
    description: "Event handler for when the value typed into the input changes"
  },
  {
    name: "menuPosition",
    type: "string",
    defaultValue: "absolute",
    description: "The CSS position value of the menu. ex: 'fixed'"
  },
  {
    name: "components",
    type: "Object<ComponentName: ReactNode>",
    defaultValue: "undefined",
    description:
      "Pass in an object with the keys of the component you would like to replace"
  },
  ...inputProps.map(prop => {
    if (prop.name === "required") {
      return {
        name: "required",
        type: "boolean",
        defaultValue: "false",
        description:
          "adds requirement text and asterisk to the label, NOTE: this does not behave like a required html input that blocks form submission when no value is entered, you must check the value of the select manually when submitting"
      };
    }
    return prop;
  })
];

export default selectProps;
