import selectProps from "./selectProps";

export const timePickerProps = [
  {
    name: "timeFormat",
    type: "String",
    defaultValue: "hh:mm aa",
    description:
      "The default time format (see date-fns for available time formats)"
  },
  {
    name: "interval",
    type: "Number",
    defaultValue: "15",
    description: "The time difference in minutes between the time options"
  },
  {
    name: "minTime",
    type: "24 hour time string e.g: 02:30",
    defaultValue: "undefined",
    description: "The latest time that can be selected."
  },
  {
    name: "maxTime",
    type: "24 hour time string e.g: 02:30",
    defaultValue: "undefined",
    description: "The latest time that can be selected."
  },
  ...selectProps.filter(prop => prop.name !== "options")
];
