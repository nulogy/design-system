import React from "react";
import WeekPicker from "../WeekPicker";
import { addDays, subDays } from "date-fns";

export default {
  title: "Components/DatePickers/WeekPicker",
};

export const Default = () => <WeekPicker inputProps={{ labelText: "Expiry Date" }} />;

export const WithError = () => (
  <WeekPicker inputProps={{ labelText: "Week Selection" }} errorMessage="Please select a valid week" />
);

export const WithMinMaxDates = () => {
  const today = new Date();
  return (
    <WeekPicker inputProps={{ labelText: "Select Week" }} minDate={subDays(today, 14)} maxDate={addDays(today, 30)} />
  );
};

export const WithCustomDateFormat = () => (
  <WeekPicker inputProps={{ labelText: "Week" }} dateFormat="'Week starting' dd/MM/yyyy" />
);

export const WithPreselectedDate = () => (
  <WeekPicker inputProps={{ labelText: "Selected Week" }} selected={new Date()} />
);

export const WithCustomLocale = () => <WeekPicker inputProps={{ labelText: "Semaine" }} locale="fr_FR" />;

export const Disabled = () => (
  <WeekPicker
    inputProps={{
      labelText: "Week Selection",
      disabled: true,
    }}
  />
);
