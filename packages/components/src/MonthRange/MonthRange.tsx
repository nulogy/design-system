import React, { useState, useEffect } from "react";
import { isBefore } from "date-fns";
import { useTranslation } from "react-i18next";
import { MonthPicker } from "../MonthPicker";
import { InputFieldPropTypes, InputFieldDefaultProps } from "../Input/InputField.type";
import { RangeContainer } from "../RangeContainer";
import { FieldLabelDefaultProps, FieldLabelProps } from "../FieldLabel/FieldLabel.type";
const DEFAULT_LABEL = "Month Range";
type MonthRangeProps = {
  dateFormat?: string;
  onRangeChange?: (...args: any[]) => any;
  onStartDateChange?: (...args: any[]) => any;
  onEndDateChange?: (...args: any[]) => any;
  endDateErrorMessage?: string;
  startDateErrorMessage?: string;
  errorMessage?: string;
  defaultStartDate?: any;
  defaultEndDate?: any;
  endDateInputProps?: any;
  startDateInputProps?: any;
  disableRangeValidation?: boolean;
  labelProps?: any;
  minDate?: any;
  maxDate?: any;
  locale?: string;
  disableAutocomplete?: boolean;
};
const MonthRange: React.SFC<MonthRangeProps> = ({
  dateFormat,
  onRangeChange,
  onStartDateChange,
  onEndDateChange,
  errorMessage,
  startDateErrorMessage,
  endDateErrorMessage,
  defaultStartDate,
  defaultEndDate,
  endDateInputProps,
  startDateInputProps,
  disableRangeValidation,
  labelProps,
  minDate,
  maxDate,
  locale,
  disableAutocomplete
}) => {
  const [startMonth, setStartMonth] = useState(defaultStartDate);
  const [endMonth, setEndMonth] = useState(defaultEndDate);
  const [rangeError, setRangeError] = useState<string>("");
  const { t } = useTranslation();
  const changeStartDateHandler = date => {
    setStartMonth(date);
    if (onStartDateChange) {
      onStartDateChange(date);
    }
  };
  const changeEndDateHandler = date => {
    setEndMonth(date);
    if (onEndDateChange) {
      onEndDateChange(date);
    }
  };
  const validateDateRange = () => {
    let error: string = "";
    if (endMonth && startMonth && isBefore(endMonth, startMonth)) {
      error = "end month is before start month";
    }
    setRangeError(error);
    if (onRangeChange) {
      onRangeChange({
        startDate: startMonth,
        endDate: endMonth,
        error
      });
    }
  };
  const startDateInput = (
    <MonthPicker
      dateFormat={dateFormat}
      selected={startMonth}
      onChange={changeStartDateHandler}
      inputProps={startDateInputProps}
      errorMessage={startDateErrorMessage}
      minDate={minDate}
      maxDate={maxDate}
      locale={locale}
      disableAutocomplete={disableAutocomplete}
      aria-label={t("select a start date")}
    />
  );
  const endDateInput = (
    <MonthPicker
      dateFormat={dateFormat}
      selected={endMonth}
      onChange={changeEndDateHandler}
      inputProps={endDateInputProps}
      errorMessage={endDateErrorMessage}
      minDate={minDate}
      maxDate={maxDate}
      locale={locale}
      disableAutocomplete={disableAutocomplete}
      aria-label={t("select an end date")}
    />
  );
  useEffect(() => {
    validateDateRange();
  }, [startMonth, endMonth]);
  return (
    <RangeContainer
      labelProps={{
        ...labelProps,
        labelText: labelProps.labelText === DEFAULT_LABEL ? t("month range") : labelProps.labelText
      }}
      startComponent={startDateInput}
      endComponent={endDateInput}
      errorMessages={!disableRangeValidation ? [t(rangeError), errorMessage] : [errorMessage]}
    />
  );
};
MonthRange.defaultProps = {
  dateFormat: undefined,
  onRangeChange: undefined,
  onStartDateChange: undefined,
  onEndDateChange: undefined,
  endDateErrorMessage: undefined,
  startDateErrorMessage: undefined,
  errorMessage: undefined,
  defaultStartDate: null,
  defaultEndDate: null,
  endDateInputProps: InputFieldDefaultProps,
  startDateInputProps: InputFieldDefaultProps,
  disableRangeValidation: false,
  labelProps: {
    ...FieldLabelDefaultProps,
    labelText: DEFAULT_LABEL
  },
  minDate: undefined,
  maxDate: undefined,
  locale: undefined,
  disableAutocomplete: false
};
export default MonthRange;
