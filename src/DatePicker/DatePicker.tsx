import {
  subDays,
  addDays,
  isValid,
  isAfter,
  isBefore,
  isSameDay,
} from "date-fns";
import React, { useEffect, useState, forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import propTypes from "@styled-system/prop-types";
import { InlineValidation } from "../Validation";
import { Field } from "../Form";
import { InputFieldDefaultProps } from "../Input/InputField.type";
import { registerDatePickerLocales } from "../utils/datePickerLocales";
import { LocaleContext } from "../NDSProvider/LocaleContext";
import { NDS_TO_DATE_FN_LOCALES_MAP } from "../locales.const";
import { getSubset } from "../utils/subset";
import { FieldProps } from "../Form/Field";
import DatePickerHeader from "./DatePickerHeader";
import DatePickerInput from "./DatePickerInput";
import { DatePickerStyles } from "./DatePickerStyles";

type DatePickerProps = FieldProps & {
  selected?: any;
  dateFormat?: string;
  onChange?: (...args: any[]) => any;
  onInputChange?: (...args: any[]) => any;
  inputProps?: any;
  errorMessage?: string;
  errorList?: string[];
  minDate?: any;
  maxDate?: any;
  highlightDates?: {}[];
  disableFlipping?: boolean;
  className?: string;
};

const DEFAULT_DATE_FORMAT = "dd MMM yyyy";
const DEFAULT_PLACEHOLDER = "DD Mon YYYY";

const DatePicker: React.SFC<DatePickerProps> = forwardRef(
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
      selected,
      ...props
    },
    datePickerRef
  ) => {
    const [selectedDate, setSelectedDate] = useState(selected);
    const [ref, setRef] = useState(null);
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
    const handleInputChange = (event) => {
      const { value } = event.target;
      if (onInputChange) {
        onInputChange(value);
      }
    };
    const handleSelectedDateChange = (date) => {
      if (onChange) {
        onChange(date);
      }
      setSelectedDate(date);
    };
    const handleDownKey = () => {
      const newSelectedDate = isValid(selectedDate)
        ? subDays(selectedDate, 1)
        : new Date();
      if (
        !minDate ||
        isAfter(newSelectedDate, minDate) ||
        isSameDay(newSelectedDate, minDate)
      ) {
        handleSelectedDateChange(newSelectedDate);
      }
    };
    const handleUpKey = () => {
      const newSelectedDate = isValid(selectedDate)
        ? addDays(selectedDate, 1)
        : new Date();
      if (
        !maxDate ||
        isBefore(newSelectedDate, maxDate) ||
        isSameDay(newSelectedDate, maxDate)
      ) {
        handleSelectedDateChange(newSelectedDate);
      }
    };
    const handleEnterKey = () => {
      if (ref) {
        // @ts-ignore
        const isOpen = ref.isCalendarOpen();
        // @ts-ignore
        ref.setOpen(!isOpen);
      }
    };
    const renderHeader = ({ locale }) => {
      return (props) => <DatePickerHeader locale={locale} {...props} />;
    };
    const customInputProps = {
      ...InputFieldDefaultProps,
      inputWidth: "184px",
      error: !!(errorMessage || errorList),
      ...inputProps,
      placeholder:
        (inputProps && inputProps.placeholder) ||
        (dateFormat === DEFAULT_DATE_FORMAT ? DEFAULT_PLACEHOLDER : dateFormat),
    };

    const customInput = (
      <DatePickerInput
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
      <Field
        className={`${className} nds-date-picker`}
        {...spaceProps}
      >
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
              popperModifiers={{
                flip: { enabled: !disableFlipping },
              }}
            />
          )}
        </LocaleContext.Consumer>
        <InlineValidation
          mt="x1"
          errorMessage={errorMessage}
          errorList={errorList}
        />
      </Field>
    );
  }
);
export default DatePicker;
