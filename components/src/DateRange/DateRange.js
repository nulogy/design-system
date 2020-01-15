import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { isBefore, isSameDay } from "date-fns";
import styled from "styled-components";

import { DatePicker } from "../DatePicker";
import { RangeContainer } from "../RangeContainer";
import { InputFieldPropTypes, InputFieldDefaultProps } from "../Input/InputField.type";
import { FieldLabelDefaultProps, FieldLabelProps } from "../FieldLabel/FieldLabel.type";
import { DateRangeStyles, highlightDates } from "./DateRangeStyles";
import { TimePicker } from "../TimePicker";
import theme from "../theme";
import { getDuration } from "../TimeRange/TimeRange.utils";

const StyledStartTime = styled(TimePicker)({
  marginLeft: theme.space.x1
});

const StyledEndTime = styled(TimePicker)({
  marginRight: theme.space.x1
});

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
  maxDate,
  showTimes,
  minTime,
  maxTime,
  defaultStartTime,
  defaultEndTime,
  onStartTimeChange,
  onEndTimeChange,
  timeFormat,
  interval
}) => {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [startTime, setStartTime] = useState(defaultStartTime);
  const [endTime, setEndTime] = useState(defaultEndTime);
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

  const changeStartTimeHandler = time => {
    setStartTime(time);
    if (onStartTimeChange) {
      onEndDateChange(time);
    }
  };
  const changeEndTimeHandler = time => {
    setEndTime(time);
    if (onEndTimeChange) {
      onEndDateChange(time);
    }
  };

  const validateDateRange = () => {
    let error;
    if (endDate && startDate) {
      if (isBefore(endDate, startDate)) {
        error = "End date is before start date";
      }
      if (isSameDay(endDate, startDate) && showTimes) {
        const duration = getDuration(startTime, endTime);
        if (duration < 0) {
          error = "End time is before start time";
        }
      }
    }
    setRangeError(error);
    if (onRangeChange) {
      onRangeChange({
        startDate,
        endDate,
        startTime,
        endTime,
        error
      });
    }
  };

  const startDateInput = (
    <>
      <DatePicker
        dateFormat={dateFormat}
        selected={startDate}
        onChange={changeStartDateHandler}
        inputProps={{ error: rangeError, ...startDateInputProps }}
        errorMessage={startDateErrorMessage}
        minDate={minDate}
        maxDate={maxDate}
        highlightDates={highlightDates(startDate, endDate)}
      />
      {showTimes && (
        <StyledStartTime
          selected={startTime}
          defaultValue={defaultStartTime}
          minTime={minTime}
          maxTime={maxTime}
          timeFormat={timeFormat}
          interval={interval}
          onChange={changeStartTimeHandler}
        />
      )}
    </>
  );

  const endDateInput = (
    <>
      {showTimes && (
        <StyledEndTime
          selected={endTime}
          defaultValue={defaultEndTime}
          minTime={minTime}
          maxTime={maxTime}
          timeFormat={timeFormat}
          interval={interval}
          onChange={changeEndTimeHandler}
        />
      )}
      <DatePicker
        dateFormat={dateFormat}
        selected={endDate}
        onChange={changeEndDateHandler}
        inputProps={endDateInputProps}
        errorMessage={endDateErrorMessage}
        minDate={minDate}
        maxDate={maxDate}
        highlightDates={highlightDates(startDate, endDate)}
      />
    </>
  );

  useEffect(() => {
    validateDateRange();
  }, [startDate, endDate, startTime, endTime]);

  return (
    <>
      <DateRangeStyles />
      <RangeContainer
        labelProps={labelProps}
        startComponent={startDateInput}
        endComponent={endDateInput}
        errorMessages={!disableRangeValidation ? [rangeError, errorMessage] : [errorMessage]}
      />
    </>
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
  maxDate: PropTypes.instanceOf(Date),
  showTimes: PropTypes.bool,
  minTime: PropTypes.string,
  maxTime: PropTypes.string,
  defaultStartTime: PropTypes.string,
  defaultEndTime: PropTypes.string,
  onStartTimeChange: PropTypes.func,
  onEndTimeChange: PropTypes.func,
  timeFormat: PropTypes.string,
  interval: PropTypes.number
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
  maxDate: null,
  showTimes: false,
  minTime: null,
  maxTime: null,
  defaultStartTime: null,
  defaultEndTime: null,
  onStartTimeChange: null,
  onEndTimeChange: null,
  timeFormat: undefined,
  interval: undefined
};

export default DateRange;
