import { InputFieldDefaultProps, InputFieldProps } from "../Input/InputField";
import propTypes from "@styled-system/prop-types";
import { getSubset } from "../utils/subset";
import Field, { FieldProps } from "../Form/Field";
import {
  isValid,
  subDays,
  isAfter,
  isSameDay,
  addDays,
  isBefore,
  startOfWeek,
  endOfWeek,
  getWeek,
  getYear,
} from "date-fns";
import React, { forwardRef, useState, useEffect } from "react";
import ReactDatePicker, { ReactDatePickerProps, ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { LocaleContext, useLocale } from "../NDSProvider/LocaleContext";
import { registerDatePickerLocales } from "../utils/datePickerLocales";
import { InlineValidation } from "../Validation";
import DatePickerInput from "./shared/components/DatePickerInput";
import { DatePickerHeader } from "./shared/components/DatePickerHeader";
import { NDS_TO_DATE_FN_LOCALES_MAP } from "../locales.const";
import { WeekPickerStyles } from "./custom/weekPickerStyles";
import { DatePickerStyles } from "./shared/styles";
import { getPopperModifiers } from "./shared/helpers";

type OmittedFieldProps = "onChange" | "onBlur" | "onFocus";

interface WeekRange {
  startDate: Date;
  endDate: Date;
  weekNumber: number;
  year: number;
}

interface WeekPickerProps extends Omit<FieldProps, OmittedFieldProps> {
  selected?: Date | null;
  onChange?: (weekRange: WeekRange) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onInputChange?: (value: string) => void;
  dateFormat?: string;
  inputProps?: InputFieldProps;
  errorMessage?: string;
  errorList?: string[];
  minDate?: Date;
  maxDate?: Date;
  locale?: string;
  disableFlipping?: boolean;
}

const WEEK_START_DAY = 1; // Monday
const DEFAULT_DATE_PICKER_FORMAT = "'Week of' MMM d, yyyy";
const DEFAULT_PLACEHOLDER = "Week of Mon DD, YYYY";

const WeekPicker = forwardRef<unknown, WeekPickerProps>(
  (
    {
      dateFormat = DEFAULT_DATE_PICKER_FORMAT,
      errorMessage,
      errorList,
      inputProps,
      minDate,
      maxDate,
      locale,
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
    const { locale: contextLocale } = useLocale();
    const [ref, setRef] = useState(null);
    const spaceProps = getSubset(props, propTypes.space);

    const componentVariant = useComponentVariant();

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
        onChange({
          startDate: startOfWeek(date, { weekStartsOn: WEEK_START_DAY }),
          endDate: endOfWeek(date, { weekStartsOn: WEEK_START_DAY }),
          weekNumber: getWeek(date, { weekStartsOn: WEEK_START_DAY }),
          year: getYear(date),
        });
      }
      setSelectedDate(date);
    };

    const handleUpKey = () => {
      const newSelectedDate = isValid(selectedDate)
        ? subDays(selectedDate, 7)
        : startOfWeek(new Date(), { weekStartsOn: 1 });
      if (!minDate || isAfter(newSelectedDate, minDate) || isSameDay(newSelectedDate, minDate)) {
        handleSelectedDateChange(newSelectedDate);
      }
    };

    const handleDownKey = () => {
      const newSelectedDate = isValid(selectedDate)
        ? addDays(selectedDate, 7)
        : startOfWeek(new Date(), { weekStartsOn: 1 });
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

    const renderCustomHeader = (props: ReactDatePickerCustomHeaderProps) => {
      return <DatePickerHeader locale={locale} {...props} />;
    };

    const weekPickerRefHandler = (r: ReactDatePicker<string>) => {
      if (datePickerRef) {
        datePickerRef["current"] = r;
      }
      onRefChange(r);
    };

    const customInputProps = {
      ...InputFieldDefaultProps,
      error: !!(errorMessage || errorList),
      ...inputProps,
      placeholder:
        (inputProps && inputProps.placeholder) ||
        (dateFormat === DEFAULT_DATE_PICKER_FORMAT ? DEFAULT_PLACEHOLDER : dateFormat),
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

    return (
      <Field className={`${className} nds-date-picker`} {...spaceProps}>
        <DatePickerStyles />
        <WeekPickerStyles />
        <ReactDatePicker
          showWeekNumbers
          showWeekPicker
          calendarStartDay={WEEK_START_DAY}
          selected={selectedDate}
          openToDate={selectedDate}
          dateFormat={dateFormat}
          onChange={handleSelectedDateChange}
          customInput={customInput}
          renderCustomHeader={renderCustomHeader}
          strictParsing
          minDate={minDate}
          maxDate={maxDate}
          locale={NDS_TO_DATE_FN_LOCALES_MAP[locale || contextLocale]}
          ref={weekPickerRefHandler}
          onFocus={onFocus}
          onBlur={onBlur}
          popperModifiers={getPopperModifiers(disableFlipping)}
          disabledKeyboardNavigation
        />
        <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
      </Field>
    );
  }
);

export default WeekPicker;
