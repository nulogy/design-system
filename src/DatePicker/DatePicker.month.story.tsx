import React from "react";
import MonthPicker from "./MonthPicker";

export default {
  title: "Components/DatePicker/MonthPicker",
};

export const Default = () => {
  return <MonthPicker inputProps={{ labelText: "Expiry Date" }} />;
};

Default.story = {
  name: "month picker",
};

export const WithPlaceholder = () => {
  return <MonthPicker inputProps={{ labelText: "Expiry Date", placeholder: "Select month" }} />;
};

WithPlaceholder.story = {
  name: "month picker with placeholder",
};

export const Disabled = () => {
  return <MonthPicker inputProps={{ labelText: "Expiry Date", disabled: true }} />;
};

Disabled.story = {
  name: "disabled month picker",
};

export const WithDefaultValue = () => {
  const defaultDate = new Date();
  defaultDate.setMonth(defaultDate.getMonth() - 1);
  return <MonthPicker inputProps={{ labelText: "Expiry Date" }} selected={defaultDate} />;
};

WithDefaultValue.story = {
  name: "month picker with default value",
};

export const WithMinMaxDate = () => {
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 1);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return <MonthPicker inputProps={{ labelText: "Expiry Date" }} minDate={minDate} maxDate={maxDate} />;
};

WithMinMaxDate.story = {
  name: "month picker with min and max date",
};
