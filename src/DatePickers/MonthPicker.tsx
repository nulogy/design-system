import React, { forwardRef, useState, useCallback, useEffect } from "react";
import type { ReactDatePicker, ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { BaseDatePickerProps } from "./shared/types";
import { noop } from "../utils/noop";
import { BasePicker } from "./shared/BasePicker";
import { MonthDatePickerHeader } from "./components/MonthPickerHeader";

type MonthPickerProps = BaseDatePickerProps;

const DEFAULT_MONTH_FORMAT = "yyyy-MMM";
const DEFAULT_PLACEHOLDER = "YYYY-Mon";

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
