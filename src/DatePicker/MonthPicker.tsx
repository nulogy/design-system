import React, { useEffect, useState, forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import propTypes from "@styled-system/prop-types";
import { useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { InlineValidation } from "../Validation";
import { Field } from "../Form";
import { registerDatePickerLocales } from "../utils/datePickerLocales";
import { LocaleContext } from "../NDSProvider/LocaleContext";
import { NDS_TO_DATE_FN_LOCALES_MAP } from "../locales.const";
import { InputFieldDefaultProps, InputFieldProps } from "../Input/InputField";
import { getSubset } from "../utils/subset";
import { FieldProps } from "../Form/Field";
import { MonthDatePickerHeader } from "./DatePickerHeader";
import DatePickerInput from "./DatePickerInput";
import { DatePickerStyles } from "./DatePickerStyles";

type OmittedFieldProps = "onChange" | "onBlur" | "onFocus";

interface MonthPickerProps extends Omit<FieldProps, OmittedFieldProps> {
  /** Callback when a month is selected. Returns the first day of the selected month */
  onChange?: (date: Date) => void;
  /** Callback when the input loses focus */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Callback when the input gains focus */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Format for displaying the selected month. Defaults to "yyyy-MMM" */
  dateFormat?: string;
  /** Callback when the input value changes */
  onInputChange?: (value: string) => void;
  /** Props to pass to the input field */
  inputProps?: InputFieldProps;
  /** Error message to display */
  errorMessage?: string;
  /** List of error messages to display */
  errorList?: string[];
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Whether to disable flipping the calendar when it hits the viewport edges */
  disableFlipping?: boolean;
  /** Currently selected month */
  selected?: Date | null;
}

const DEFAULT_MONTH_FORMAT = "yyyy-MMM";
const DEFAULT_PLACEHOLDER = "YYYY-Mon";

const MonthPicker = forwardRef<unknown, MonthPickerProps>(
  (
    {
      dateFormat = DEFAULT_MONTH_FORMAT,
      errorMessage,
      errorList,
      inputProps,
      minDate,
      maxDate,
      disableFlipping,
      className,
      onInputChange,
      onChange,
      onBlur,
      onFocus,
      selected,
      ...props
    },
    monthPickerRef
  ) => {
    const [selectedMonth, setSelectedMonth] = useState(selected);
    const { locale } = React.useContext(LocaleContext);
    const [ref, setRef] = useState(null);
    const componentVariant = useComponentVariant();

    useEffect(() => {
      registerDatePickerLocales();
    }, []);

    useEffect(() => {
      setSelectedMonth(selected);
    }, [selected]);

    const onRefChange = React.useCallback((node) => {
      if (node) {
        setRef(node);
      }
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onInputChange) {
        onInputChange(event.target.value);
      }
    };

    const handleSelectedMonthChange = (date: Date) => {
      if (onChange) {
        onChange(date);
      }
      setSelectedMonth(date);
    };

    const handleEnterKey = () => {
      if (ref) {
        const isOpen = ref.isCalendarOpen();
        ref.setOpen(!isOpen);
      }
    };

    const customInputProps = {
      ...InputFieldDefaultProps,
      inputWidth: componentVariant === "touch" ? "280px" : "184px",
      error: !!(errorMessage || errorList),
      ...inputProps,
      placeholder: (inputProps && inputProps.placeholder) || DEFAULT_PLACEHOLDER,
    };

    const customInput = (
      <DatePickerInput
        variant={componentVariant}
        inputProps={customInputProps}
        dateFormat={dateFormat}
        onInputChange={handleInputChange}
        onEnterKeyPress={handleEnterKey}
      />
    );

    const spaceProps = getSubset(props, propTypes.space);

    return (
      <Field className={`${className} nds-date-picker`} {...spaceProps}>
        <DatePickerStyles />
        <ReactDatePicker
          selected={selectedMonth}
          openToDate={selectedMonth}
          dateFormat={dateFormat}
          onChange={handleSelectedMonthChange}
          customInput={customInput}
          renderCustomHeader={(props: ReactDatePickerCustomHeaderProps) => (
            <MonthDatePickerHeader locale={locale} {...props} />
          )}
          strictParsing
          minDate={minDate}
          maxDate={maxDate}
          locale={NDS_TO_DATE_FN_LOCALES_MAP[locale]}
          ref={(r) => {
            if (monthPickerRef) {
              monthPickerRef["current"] = r;
            }
            onRefChange(r);
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          showMonthYearPicker
          popperModifiers={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            flip: { enabled: !disableFlipping },
          }}
        />
        <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
      </Field>
    );
  }
);

export default MonthPicker;
