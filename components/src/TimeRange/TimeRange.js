import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { TimePicker } from "../TimePicker";
import { RangeContainer } from "../RangeContainer";
import { FieldLabelDefaultProps, FieldLabelProps } from "../FieldLabel/FieldLabel.type";
import { getDuration } from "./TimeRange.utils";

const DEFAULT_LABEL = "Time Range";

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
  maxTime,
  interval,
  locale
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
  const validateTimeRange = () => {
    let error;
    const end = endTime || defaultEndTime;
    const start = startTime || defaultStartTime;
    if (start && end) {
      const duration = getDuration(start, end);
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
      interval={interval}
      locale={locale}
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
      interval={interval}
      locale={locale}
    />
  );

  useEffect(() => {
    validateTimeRange();
  }, [startTime, endTime]);

  const { t } = useTranslation();

  return (
    <RangeContainer
      labelProps={{
        ...labelProps,
        labelText: labelProps.labelText === DEFAULT_LABEL ? t("time range") : labelProps.labelText
      }}
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
  maxTime: PropTypes.string,
  interval: PropTypes.number,
  locale: PropTypes.string
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
    labelText: DEFAULT_LABEL
  },
  minTime: null,
  maxTime: null,
  interval: undefined,
  locale: undefined
};

export default TimeRange;
