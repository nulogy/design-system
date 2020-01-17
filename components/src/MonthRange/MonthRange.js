import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { isBefore } from "date-fns";
import { MonthPicker } from "../MonthPicker";
import { InputFieldPropTypes, InputFieldDefaultProps } from "../Input/InputField.type";
import { RangeContainer } from "../RangeContainer";
import { FieldLabelDefaultProps, FieldLabelProps } from "../FieldLabel/FieldLabel.type";

const MonthRange = ({
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
  disableAutofill
}) => {
  const [startMonth, setStartMonth] = useState(defaultStartDate);
  const [endMonth, setEndMonth] = useState(defaultEndDate);
  const [rangeError, setRangeError] = useState();

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
    let error;
    if (endMonth && startMonth && isBefore(endMonth, startMonth)) {
      error = "End date is before start Month";
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
      disableAutofill={disableAutofill}
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
      disableAutofill={disableAutofill}
    />
  );

  useEffect(() => {
    validateDateRange();
  }, [startMonth, endMonth]);

  return (
    <RangeContainer
      labelProps={labelProps}
      startComponent={startDateInput}
      endComponent={endDateInput}
      errorMessages={!disableRangeValidation ? [rangeError, errorMessage] : [errorMessage]}
    />
  );
};

MonthRange.propTypes = {
  dateFormat: PropTypes.string,
  onRangeChange: PropTypes.func,
  onStartDateChange: PropTypes.func,
  onEndDateChange: PropTypes.func,
  endDateErrorMessage: PropTypes.string,
  startDateErrorMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  defaultStartDate: PropTypes.instanceOf(Date),
  defaultEndDate: PropTypes.instanceOf(Date),
  endDateInputProps: PropTypes.shape(InputFieldPropTypes),
  startDateInputProps: PropTypes.shape(InputFieldPropTypes),
  disableRangeValidation: PropTypes.bool,
  labelProps: PropTypes.shape(FieldLabelProps),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  locale: PropTypes.string,
  disableAutofill: PropTypes.bool
};

MonthRange.defaultProps = {
  dateFormat: undefined,
  onRangeChange: null,
  onStartDateChange: null,
  onEndDateChange: null,
  endDateErrorMessage: null,
  startDateErrorMessage: null,
  errorMessage: null,
  defaultStartDate: null,
  defaultEndDate: null,
  endDateInputProps: InputFieldDefaultProps,
  startDateInputProps: InputFieldDefaultProps,
  disableRangeValidation: false,
  labelProps: {
    ...FieldLabelDefaultProps,
    labelText: "Month Range"
  },
  minDate: null,
  maxDate: null,
  locale: undefined,
  disableAutofill: false
};

export default MonthRange;
