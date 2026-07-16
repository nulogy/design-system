import { forwardRef, useEffect, useState } from "react";
import type ReactDatePicker from "react-datepicker";
import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { noop } from "../utils/noop";
import { MonthDatePickerHeader } from "./custom/MonthPickerHeader";
import { BasePicker } from "./shared/components/BasePicker";
import type { DatePickerProps } from "./shared/types";

type MonthPickerProps = DatePickerProps;

export const DEFAULT_MONTH_FORMAT = "yyyy-MMM";
export const DEFAULT_PLACEHOLDER = "YYYY-Mon";

const MonthPicker = forwardRef<ReactDatePicker, MonthPickerProps>(
  ({ selected, dateFormat = DEFAULT_MONTH_FORMAT, onChange, ...props }, monthPickerRef) => {
    const [selectedDate, setSelectedDate] = useState(selected);

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
      />
    );
  },
);

export default MonthPicker;
