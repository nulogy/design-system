import React, { useEffect, useState, forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import { subDays, addDays, isValid, isAfter, isBefore, isSameDay } from "date-fns";
import type { ReactDatePickerProps } from "react-datepicker";
import propTypes from "@styled-system/prop-types";
import { ComponentSize, useComponentSize } from "../NDSProvider/ComponentSizeContext";
import { InlineValidation } from "../Validation";
import { Field } from "../Form";
import { registerDatePickerLocales } from "../utils/datePickerLocales";
import { LocaleContext } from "../NDSProvider/LocaleContext";
import { NDS_TO_DATE_FN_LOCALES_MAP } from "../locales.const";
import { InputFieldDefaultProps, InputFieldProps } from "../Input/InputField";
import { getSubset } from "../utils/subset";
import { FieldProps } from "../Form/Field";
import DatePickerHeader from "./DatePickerHeader";
import DatePickerInput from "./DatePickerInput";
import { DatePickerStyles } from "./DatePickerStyles";

type OmittedFieldProps = "size" | "onChange" | "onBlur" | "onFocus";

interface DatePickerProps extends Omit<FieldProps, OmittedFieldProps> {
  size?: ComponentSize;
  onChange?: (date: Date) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  dateFormat?: string;
  onInputChange?: (value: string) => void;
  inputProps?: InputFieldProps;
  errorMessage?: string;
  errorList?: string[];
  minDate?: Date;
  maxDate?: Date;
  highlightDates?: ReactDatePickerProps["highlightDates"];
  disableFlipping?: boolean;
  selected?: Date;
}

const DEFAULT_DATE_FORMAT = "yyyy-MMM-dd";
const DEFAULT_PLACEHOLDER = "YYYY-Mon-DD";

const DatePicker = forwardRef<unknown, DatePickerProps>(
  (
    {
      dateFormat = DEFAULT_DATE_FORMAT,
      size,
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
    const [ref, setRef] = useState(null);

    const componentSize = useComponentSize(size);

    useEffect(() => {
      registerDatePickerLocales();
    });
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

    const renderHeader = ({ locale }) => {
      return (props) => <DatePickerHeader locale={locale} {...props} />;
    };

    const customInputProps = {
      ...InputFieldDefaultProps,
      inputWidth: componentSize === "large" ? "240px" : "184px",
      error: !!(errorMessage || errorList),
      ...inputProps,
      placeholder:
        (inputProps && inputProps.placeholder) ||
        (dateFormat === DEFAULT_DATE_FORMAT ? DEFAULT_PLACEHOLDER : dateFormat),
    };

    const customInput = (
      <DatePickerInput
        size={componentSize}
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
        <LocaleContext.Consumer>
          {({ locale }) => (
            <ReactDatePicker
              selected={selectedDate}
              openToDate={selectedDate}
              dateFormat={dateFormat}
              onChange={handleSelectedDateChange}
              customInput={customInput}
              renderCustomHeader={renderHeader({ locale })}
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
                // @ts-ignore
                flip: { enabled: !disableFlipping },
              }}
            />
          )}
        </LocaleContext.Consumer>
        <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
      </Field>
    );
  }
);

export default DatePicker;
