import React from "react";
import MonthPicker from "../MonthPicker";

export default {
  title: "Components/DatePickers/MonthPicker",
};

export const Default = () => {
  return <MonthPicker inputProps={{ labelText: "Expiry Date" }} />;
};

export const WithPlaceholder = () => {
  return <MonthPicker inputProps={{ labelText: "Expiry Date", placeholder: "Select month" }} />;
};

export const Disabled = () => {
  return <MonthPicker inputProps={{ labelText: "Expiry Date", disabled: true }} />;
};

export const WithDefaultValue = () => {
  const defaultDate = new Date();
  defaultDate.setMonth(defaultDate.getMonth() - 1);
  return <MonthPicker inputProps={{ labelText: "Expiry Date" }} selected={defaultDate} />;
};

export const WithMinMaxDate = () => {
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 1);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return <MonthPicker inputProps={{ labelText: "Expiry Date" }} minDate={minDate} maxDate={new Date()} />;
};
