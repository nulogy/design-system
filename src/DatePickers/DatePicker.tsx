import React, { forwardRef, useState, useCallback, useEffect } from "react";
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

const DatePicker = forwardRef<unknown, DatePickerProps>(
  ({ highlightDates, selected, onChange, ...props }, datePickerRef) => {
    const [selectedDate, setSelectedDate] = useState(selected);
    const [ref, setRef] = useState(null);

    useEffect(() => {
      setSelectedDate(selected);
    }, [selected]);

    const onRefChange = useCallback((node) => {
      if (node) {
        setRef(node);
      }
    }, []);

    const handleSelectedDateChange = (date: Date) => {
      if (onChange) {
        onChange(date);
      }
      setSelectedDate(date);
    };

    const handleDownKey = () => {
      const newSelectedDate = isValid(selectedDate) ? subDays(selectedDate, 1) : new Date();
      if (!props.minDate || isAfter(newSelectedDate, props.minDate) || isSameDay(newSelectedDate, props.minDate)) {
        handleSelectedDateChange(newSelectedDate);
      }
    };

    const handleUpKey = () => {
      const newSelectedDate = isValid(selectedDate) ? addDays(selectedDate, 1) : new Date();
      if (!props.maxDate || isBefore(newSelectedDate, props.maxDate) || isSameDay(newSelectedDate, props.maxDate)) {
        handleSelectedDateChange(newSelectedDate);
      }
    };

    const handleEnterKey = () => {
      if (ref) {
        const isOpen = ref.isCalendarOpen();
        ref.setOpen(!isOpen);
      }
    };

    return (
      <BasePicker
        {...props}
        selected={selectedDate}
        onChange={handleSelectedDateChange}
        ref={datePickerRef}
        onRefChange={onRefChange}
        defaultFormat={DEFAULT_DATE_FORMAT}
        defaultPlaceholder={DEFAULT_PLACEHOLDER}
        showMonthYearPicker={false}
        renderHeader={(headerProps: ReactDatePickerCustomHeaderProps) => (
          <DatePickerHeader locale={props.locale} {...headerProps} />
        )}
        disabledKeyboardNavigation
        onUpKeyPress={handleUpKey}
        onDownKeyPress={handleDownKey}
        onEnterKeyPress={handleEnterKey}
      />
    );
  }
);

export default DatePicker;
