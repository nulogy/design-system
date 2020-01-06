import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { isBefore } from "date-fns";
import { DatePicker } from "../DatePicker";
import { RangeContainer } from "../RangeContainer";
import { InputFieldPropTypes, InputFieldDefaultProps } from "../Input/InputField.type";
import { FieldLabelDefaultProps, FieldLabelProps } from "../FieldLabel/FieldLabel.type";

const DateRange = ({
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
  maxDate
}) => {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [rangeError, setRangeError] = useState();

  const changeStartDateHandler = date => {
    setStartDate(date);
    if (onStartDateChange) {
      onStartDateChange(date);
    }
  };
  const changeEndDateHandler = date => {
    setEndDate(date);
    if (onEndDateChange) {
      onEndDateChange(date);
    }
  };

  const validateDateRange = () => {
    let error;
    if (endDate && startDate && isBefore(endDate, startDate)) {
      error = "End date is before start date";
    }
    setRangeError(error);
    if (onRangeChange) {
      onRangeChange({
        startDate,
        endDate,
        error
      });
    }
  };

  const startDateInput = (
    <DatePicker
      dateFormat={dateFormat}
      selected={startDate}
      onChange={changeStartDateHandler}
      inputProps={{ error: rangeError, ...startDateInputProps }}
      errorMessage={startDateErrorMessage}
      minDate={minDate}
      maxDate={maxDate}
    />
  );

  const endDateInput = (
    <DatePicker
      dateFormat={dateFormat}
      selected={endDate}
      onChange={changeEndDateHandler}
      inputProps={endDateInputProps}
      errorMessage={endDateErrorMessage}
      minDate={minDate}
      maxDate={maxDate}
    />
  );

  useEffect(() => {
    validateDateRange();
  }, [startDate, endDate]);

  return (
    <RangeContainer
      labelProps={labelProps}
      startComponent={startDateInput}
      endComponent={endDateInput}
      errorMessages={!disableRangeValidation ? [rangeError, errorMessage] : [errorMessage]}
    />
  );
};

DateRange.propTypes = {
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
  maxDate: PropTypes.instanceOf(Date)
};

DateRange.defaultProps = {
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
    labelText: "Date Range"
  },
  minDate: null,
  maxDate: null
};

export default DateRange;
