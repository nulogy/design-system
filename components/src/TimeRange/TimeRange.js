import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TimePicker } from "../TimePicker";
import { RangeContainer } from "../RangeContainer";
import { FieldLabelDefaultProps, FieldLabelProps } from "../FieldLabel/FieldLabel.type";

const TimeRange = ({
  timeFormat,
  onRangeChange,
  onStartTimeChange,
  onEndTimeChange,
  errorMessage,
  defaultStartTime,
  defaultEndTime,
  disableRangeValidation,
  labelProps,
  minTime,
  maxTime
}) => {
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [rangeError, setRangeError] = useState();

  const changeStartTimeHandler = date => {
    setStartTime(date);
    if (onStartTimeChange) {
      onStartTimeChange(date);
    }
  };
  const changeEndTimeHandler = date => {
    setEndTime(date);
    if (onEndTimeChange) {
      onEndTimeChange(date);
    }
  };

  const convertTimeToMinutes = time => {
    const timeArr = time.split(":").map(Number);
    const hours = timeArr[0];
    const minutes = timeArr[1];
    return hours * 60 + minutes;
  };

  const validateTimeRange = () => {
    let error;
    const end = endTime || defaultEndTime;
    const start = startTime || defaultStartTime;
    if (start && end) {
      const duration = convertTimeToMinutes(end) - convertTimeToMinutes(start);
      if (duration < 0) {
        error = "End time is before start time";
      }
    }
    setRangeError(error);
    if (onRangeChange) {
      onRangeChange({
        startTime,
        endTime,
        error
      });
    }
  };

  const startInput = (
    <TimePicker
      timeFormat={timeFormat}
      defaultValue={defaultStartTime}
      selected={startTime}
      onChange={changeStartTimeHandler}
      minTime={minTime}
      maxTime={endTime || maxTime}
    />
  );

  const endInput = (
    <TimePicker
      timeFormat={timeFormat}
      defaultValue={defaultEndTime}
      selected={endTime}
      onChange={changeEndTimeHandler}
      maxTime={maxTime}
      minTime={startTime || minTime}
    />
  );

  useEffect(() => {
    validateTimeRange();
  }, [startTime, endTime]);

  return (
    <RangeContainer
      labelProps={labelProps}
      startComponent={startInput}
      selected={endTime}
      endComponent={endInput}
      errorMessages={!disableRangeValidation ? [rangeError, errorMessage] : [errorMessage]}
    />
  );
};

TimeRange.propTypes = {
  timeFormat: PropTypes.string,
  onRangeChange: PropTypes.func,
  onStartTimeChange: PropTypes.func,
  onEndTimeChange: PropTypes.func,
  errorMessage: PropTypes.string,
  defaultStartTime: PropTypes.string,
  defaultEndTime: PropTypes.string,
  disableRangeValidation: PropTypes.bool,
  labelProps: PropTypes.shape(FieldLabelProps),
  minTime: PropTypes.string,
  maxTime: PropTypes.string
};

TimeRange.defaultProps = {
  timeFormat: undefined,
  onRangeChange: null,
  onStartTimeChange: null,
  onEndTimeChange: null,
  errorMessage: null,
  defaultStartTime: null,
  defaultEndTime: null,
  disableRangeValidation: false,
  labelProps: {
    ...FieldLabelDefaultProps,
    labelText: "Time Range"
  },
  minTime: null,
  maxTime: null
};

export default TimeRange;
