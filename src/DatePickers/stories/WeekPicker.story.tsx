import React from "react";
import { Text } from "../../Type";
import WeekPicker from "../WeekPicker";

export default {
  title: "Components/DatePickers/WeekPicker",
};

export const Default = () => <WeekPicker inputProps={{ labelText: "Expiry Date" }} />;

export const WithError = () => (
  <WeekPicker inputProps={{ labelText: "Week Selection" }} errorMessage="Please select a valid week" />
);

export const WithMinMaxDates = () => {
  return (
    <>
      <Text mb="x2">
        The min and max dates to the end and start of the week. If a min or a max day falls in the middle of the week,
        no day in the week will be selectable.
      </Text>
      <WeekPicker
        inputProps={{ labelText: "Select Week" }}
        minDate={new Date("01/15/2025")}
        maxDate={new Date("01/29/2025")}
      />
    </>
  );
};

export const WithCustomDateFormat = () => (
  <WeekPicker inputProps={{ labelText: "Week", inputWidth: "320px" }} dateFormat="'Week starting' dd/MM/yyyy" />
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
