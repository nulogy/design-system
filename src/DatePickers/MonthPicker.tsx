import React, { forwardRef, useState, useEffect } from "react";
import type { ReactDatePicker, ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { noop } from "../utils/noop";
import { DatePickerProps } from "./shared/types";
import { BasePicker } from "./shared/components/BasePicker";
import { MonthDatePickerHeader } from "./custom/MonthPickerHeader";

type MonthPickerProps = DatePickerProps;

export const DEFAULT_MONTH_FORMAT = "yyyy-MMM";
export const DEFAULT_PLACEHOLDER = "YYYY-Mon";

const MonthPicker = forwardRef<ReactDatePicker, MonthPickerProps>(
  ({ selected, dateFormat = DEFAULT_MONTH_FORMAT, onChange, ...props }, monthPickerRef) => {
    const [selectedDate, setSelectedDate] = useState(selected);
    const [ref] = useState(null);

    useEffect(() => {
      setSelectedDate(selected);
    }, [selected]);

    const handleSelectedDateChange = (date: Date) => {
      if (onChange) {
        onChange(date);
      }
      setSelectedDate(date);
    };

    const handleUpKey = noop;
    const handleDownKey = noop;

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
        ref={monthPickerRef}
        dateFormat={dateFormat}
        defaultFormat={DEFAULT_MONTH_FORMAT}
        defaultPlaceholder={DEFAULT_PLACEHOLDER}
        showMonthYearPicker={true}
        renderHeader={(headerProps: ReactDatePickerCustomHeaderProps) => (
          <MonthDatePickerHeader locale={props.locale} {...headerProps} />
        )}
        onUpKeyPress={handleUpKey}
        onDownKeyPress={handleDownKey}
        onEnterKeyPress={handleEnterKey}
      />
    );
  }
);

export default MonthPicker;
