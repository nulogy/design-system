import React, { useState } from "react";
import { format } from "date-fns";
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
      <Text mb="x2">If a min or a max day falls in the middle of the week, no day in the week will be selectable.</Text>
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
  <WeekPicker inputProps={{ labelText: "Selected Week" }} selected={new Date("01/21/2025")} />
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

export const AdvancedUsage = () => {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleWeekChange = (weekRange) => {
    setSelectedWeek(weekRange);
    setHasError(false);

    // Format for display: "Week 12, 2023 (Mar 20 - Mar 26)"
    setInputValue(
      `Week ${weekRange.weekNumber}, ${weekRange.year} (${format(weekRange.startDate, "MM/dd/yyyy")} - ${format(
        weekRange.endDate,
        "MM/dd/yyyy"
      )})`
    );
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    // Custom validation could be implemented here
  };

  return (
    <WeekPicker
      selected={selectedWeek?.startDate}
      onChange={handleWeekChange}
      onInputChange={handleInputChange}
      minDate={new Date(2023, 0, 1)}
      maxDate={new Date()}
      errorMessage={hasError ? "Please select a valid week" : undefined}
      inputProps={{
        value: inputValue,
        inputWidth: "560px",
        placeholder: "Select a week",
        labelText: "Reporting Week",
        requirementText: "(Required)",
        helpText: "Select the week for your weekly report submission",
      }}
    />
  );
};
