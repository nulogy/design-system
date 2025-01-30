import propTypes from "@styled-system/prop-types";
import {
  addDays,
  endOfWeek,
  getWeek,
  getYear,
  isAfter,
  isBefore,
  isSameDay,
  isValid,
  startOfWeek,
  subDays,
} from "date-fns";
import React, { forwardRef, useEffect, useState } from "react";
import ReactDatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { useTranslation } from "react-i18next";
import Field, { FieldProps } from "../Form/Field";
import { InputFieldDefaultProps, InputFieldProps } from "../Input/InputField";
import { NDS_TO_DATE_FN_LOCALES_MAP } from "../locales.const";
import { useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { useLocale } from "../NDSProvider/LocaleContext";
import { registerDatePickerLocales } from "../utils/datePickerLocales";
import { getSubset } from "../utils/subset";
import { InlineValidation } from "../Validation";
import { WeekPickerStyles } from "./custom/weekPickerStyles";
import { DatePickerHeader } from "./shared/components/DatePickerHeader";
import DatePickerInput from "./shared/components/DatePickerInput";
import { getPopperModifiers } from "./shared/helpers";
import { DatePickerStyles } from "./shared/styles";

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

const roundMinDateToWeekStart = (date: Date | undefined): Date | undefined => {
  if (!date) return undefined;
  const weekStart = startOfWeek(date, { weekStartsOn: WEEK_START_DAY });
  return isBefore(date, weekStart) ? weekStart : addDays(weekStart, 7);
};

const roundMaxDateToWeekEnd = (date: Date | undefined): Date | undefined => {
  if (!date) return undefined;
  const weekEnd = endOfWeek(date, { weekStartsOn: WEEK_START_DAY });
  return isBefore(date, weekEnd) ? addDays(startOfWeek(date, { weekStartsOn: WEEK_START_DAY }), -1) : weekEnd;
};

const WeekPicker = forwardRef<unknown, WeekPickerProps>(
  (
    {
      dateFormat,
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
    const { t } = useTranslation();
    const [ref, setRef] = useState(null);
    const spaceProps = getSubset(props, propTypes.space);
    const currentLocale = locale || contextLocale;

    const componentVariant = useComponentVariant();
    const defaultDateFormat = t("weekPicker date format");
    const defaultPlaceholder = t("weekPicker placeholder");
    const weekShorthand = t("week shorthand");

    const finalDateFormat = dateFormat || defaultDateFormat;

    useEffect(() => {
      registerDatePickerLocales();
    });

    useEffect(() => {
      setSelectedDate(selected);
    }, [selected]);

    const roundedMinDate = roundMinDateToWeekStart(minDate);
    const roundedMaxDate = roundMaxDateToWeekEnd(maxDate);

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
      if (!isValid(date)) {
        return;
      }

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
      if (!roundedMinDate || isAfter(newSelectedDate, roundedMinDate) || isSameDay(newSelectedDate, roundedMinDate)) {
        handleSelectedDateChange(newSelectedDate);
      }
    };

    const handleDownKey = () => {
      const newSelectedDate = isValid(selectedDate)
        ? addDays(selectedDate, 7)
        : startOfWeek(new Date(), { weekStartsOn: 1 });
      if (!roundedMaxDate || isBefore(newSelectedDate, roundedMaxDate) || isSameDay(newSelectedDate, roundedMaxDate)) {
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
      return <DatePickerHeader locale={locale || currentLocale} {...props} />;
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
        (finalDateFormat === defaultDateFormat ? defaultPlaceholder : finalDateFormat),
    };

    const customInput = (
      <DatePickerInput
        variant={componentVariant}
        inputProps={customInputProps}
        dateFormat={finalDateFormat}
        onInputChange={handleInputChange}
        onUpKeyPress={handleUpKey}
        onDownKeyPress={handleDownKey}
        onEnterKeyPress={handleEnterKey}
      />
    );

    return (
      <Field className={`${className} nds-date-picker`} {...spaceProps}>
        <DatePickerStyles />
        <WeekPickerStyles variant={componentVariant} />
        <ReactDatePicker
          showWeekNumbers
          showWeekPicker
          weekLabel={weekShorthand}
          calendarStartDay={WEEK_START_DAY}
          selected={selectedDate}
          openToDate={selectedDate}
          dateFormat={finalDateFormat}
          onChange={handleSelectedDateChange}
          customInput={customInput}
          renderCustomHeader={renderCustomHeader}
          strictParsing
          minDate={roundedMinDate}
          maxDate={roundedMaxDate}
          locale={NDS_TO_DATE_FN_LOCALES_MAP[currentLocale]}
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
