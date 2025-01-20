import React, { useEffect, useState, forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { subDays, addDays, isValid, isAfter, isBefore, isSameDay } from "date-fns";
import type { ReactDatePickerProps } from "react-datepicker";
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
import { DatePickerHeader } from "./DatePickerHeader";
import DatePickerInput from "./DatePickerInput";
import { DatePickerStyles } from "./DatePickerStyles";

type OmittedFieldProps = "onChange" | "onBlur" | "onFocus";

interface DatePickerProps extends Omit<FieldProps, OmittedFieldProps> {
  /** Callback when a date is selected */
  onChange?: (date: Date) => void;
  /** Callback when the input loses focus */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Callback when the input gains focus */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Format for displaying the selected date. Defaults to "yyyy-MMM-dd" */
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
  /** Array of dates to highlight */
  highlightDates?: ReactDatePickerProps["highlightDates"];
  /** Whether to disable flipping the calendar when it hits the viewport edges */
  disableFlipping?: boolean;
  /** Currently selected date */
  selected?: Date | null;
}

const DEFAULT_DATE_FORMAT = "yyyy-MMM-dd";
const DEFAULT_PLACEHOLDER = "YYYY-Mon-DD";

const DatePicker = forwardRef<unknown, DatePickerProps>(
  (
    {
      dateFormat = DEFAULT_DATE_FORMAT,
      errorMessage,
      errorList,
      inputProps,
      minDate,
      maxDate,
      highlightDates,
      disableFlipping,
      className,
      onInputChange,
      onChange,
      onBlur,
      onFocus,
      selected,
      ...props
    },
    datePickerRef
  ) => {
    const [selectedDate, setSelectedDate] = useState(selected);
    const { locale } = React.useContext(LocaleContext);
    const [ref, setRef] = useState(null);

    const componentVariant = useComponentVariant();

    useEffect(() => {
      registerDatePickerLocales();
    }, []);

    useEffect(() => {
      setSelectedDate(selected);
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

    const handleSelectedDateChange = (date: Date) => {
      if (onChange) {
        onChange(date);
      }
      setSelectedDate(date);
    };

    const handleDownKey = () => {
      const newSelectedDate = isValid(selectedDate) ? subDays(selectedDate, 1) : new Date();
      if (!minDate || isAfter(newSelectedDate, minDate) || isSameDay(newSelectedDate, minDate)) {
        handleSelectedDateChange(newSelectedDate);
      }
    };

    const handleUpKey = () => {
      const newSelectedDate = isValid(selectedDate) ? addDays(selectedDate, 1) : new Date();
      if (!maxDate || isBefore(newSelectedDate, maxDate) || isSameDay(newSelectedDate, maxDate)) {
        handleSelectedDateChange(newSelectedDate);
      }
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
        onUpKeyPress={handleUpKey}
        onDownKeyPress={handleDownKey}
        onEnterKeyPress={handleEnterKey}
      />
    );

    const spaceProps = getSubset(props, propTypes.space);

    return (
      <Field className={`${className} nds-date-picker`} {...spaceProps}>
        <DatePickerStyles />
        <ReactDatePicker
          selected={selectedDate}
          openToDate={selectedDate}
          dateFormat={dateFormat}
          onChange={handleSelectedDateChange}
          customInput={customInput}
          renderCustomHeader={(props: ReactDatePickerCustomHeaderProps) => (
            <DatePickerHeader locale={locale} {...props} />
          )}
          disabledKeyboardNavigation
          strictParsing
          minDate={minDate}
          maxDate={maxDate}
          highlightDates={highlightDates}
          locale={NDS_TO_DATE_FN_LOCALES_MAP[locale]}
          ref={(r) => {
            if (datePickerRef) {
              datePickerRef["current"] = r;
            }
            onRefChange(r);
          }}
          onFocus={onFocus}
          onBlur={onBlur}
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

export default DatePicker;
