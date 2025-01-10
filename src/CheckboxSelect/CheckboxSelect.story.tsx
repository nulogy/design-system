import React, { useState } from "react";
import CheckboxSelect, { type CheckboxSelectOption } from "./CheckboxSelect";

const options: CheckboxSelectOption[] = [
  { value: "accepted", label: "Accepted" },
  { value: "assigned", label: "Assigned to a line" },
  { value: "hold", label: "On hold" },
  { value: "rejected", label: "Rejected" },
  { value: "open", label: "Open" },
  { value: "progress", label: "In progress" },
  { value: "quarantine", label: "In quarantine" },
];

export default {
  title: "Components/CheckboxSelect",
  component: CheckboxSelect,
};

export const Default = () => {
  const [value, setValue] = useState([]);
  const handleChange = (value) => {
    setValue(value);
  };

  return <CheckboxSelect onChange={handleChange} options={options} value={value} />;
};
