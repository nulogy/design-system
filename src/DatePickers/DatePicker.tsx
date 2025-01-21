import React, { forwardRef } from "react";
import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { subDays, addDays, isValid, isAfter, isBefore, isSameDay } from "date-fns";
import type { ReactDatePickerProps } from "react-datepicker";
import { BaseDatePickerProps } from "./shared/types";
import { BasePicker } from "./shared/BasePicker";
import { DatePickerHeader } from "./components/DatePickerHeader";

interface DatePickerProps extends BaseDatePickerProps {
  highlightDates?: ReactDatePickerProps["highlightDates"];
}

const DEFAULT_DATE_FORMAT = "yyyy-MMM-dd";
const DEFAULT_PLACEHOLDER = "YYYY-Mon-DD";

const DatePicker = forwardRef<unknown, DatePickerProps>(({ highlightDates, ...props }, datePickerRef) => {
  const handleDownKey = () => {
    console.log("inside the date picker");
    const newSelectedDate = isValid(props.selected) ? subDays(props.selected, 1) : new Date();
    if (!props.minDate || isAfter(newSelectedDate, props.minDate) || isSameDay(newSelectedDate, props.minDate)) {
      props.onChange?.(newSelectedDate);
    }
  };

  const handleUpKey = () => {
    console.log("inside the date picker");
    const newSelectedDate = isValid(props.selected) ? addDays(props.selected, 1) : new Date();
    if (!props.maxDate || isBefore(newSelectedDate, props.maxDate) || isSameDay(newSelectedDate, props.maxDate)) {
      props.onChange?.(newSelectedDate);
    }
  };

  return (
    <BasePicker
      {...props}
      ref={datePickerRef}
      defaultFormat={DEFAULT_DATE_FORMAT}
      defaultPlaceholder={DEFAULT_PLACEHOLDER}
      showMonthYearPicker={false}
      renderHeader={(headerProps: ReactDatePickerCustomHeaderProps) => (
        <DatePickerHeader locale={props.locale} {...headerProps} />
      )}
      disabledKeyboardNavigation
      onUpKeyPress={handleUpKey}
      onDownKeyPress={handleDownKey}
    />
  );
});

export default DatePicker;
