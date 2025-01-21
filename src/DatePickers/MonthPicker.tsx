import React, { forwardRef } from "react";
import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { BaseDatePickerProps } from "./shared/types";
import { noop } from "../utils/noop";
import { BasePicker } from "./shared/BasePicker";
import { MonthDatePickerHeader } from "./components/MonthPickerHeader";

type MonthPickerProps = BaseDatePickerProps;

const DEFAULT_MONTH_FORMAT = "yyyy-MMM";
const DEFAULT_PLACEHOLDER = "YYYY-Mon";

const MonthPicker = forwardRef<unknown, MonthPickerProps>((props, monthPickerRef) => {
  const handleUpKey = noop;
  const handleDownKey = noop;

  return (
    <BasePicker
      {...props}
      ref={monthPickerRef}
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
});

export default MonthPicker;
