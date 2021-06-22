// @ts-nocheck
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import propTypes from "@styled-system/prop-types";
import { TimePicker } from "../TimePicker";
import { RangeContainer } from "../RangeContainer";
import {
  FieldLabelDefaultProps,
} from "../FieldLabel/FieldLabel.type";
import { getDuration } from "./TimeRange.utils";

const DEFAULT_LABEL = "Time Range";

type TimeRangeProps = {
  timeFormat?: string;
  onRangeChange?: (...args: any[]) => any;
  onStartTimeChange?: (...args: any[]) => any;
  onEndTimeChange?: (...args: any[]) => any;
  errorMessage?: string;
  defaultStartTime?: string;
  defaultEndTime?: string;
  disableRangeValidation?: boolean;
  labelProps?: any;
  minTime?: string;
  maxTime?: string;
  interval?: number;
  startAriaLabel?: string;
  endAriaLabel?: string;
  endTimeProps?: any;
  startTimeProps?: any;
};

const TimeRange: React.SFC<TimeRangeProps> = forwardRef(
  (
    {
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
      startAriaLabel,
      endAriaLabel,
      endTimeProps,
      startTimeProps,
      ...props
    },
    ref
  ) => {
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [rangeError, setRangeError] = useState();
    const inputRef1 = useRef();
    const inputRef2 = useRef();
    useImperativeHandle(ref, () => ({
      inputRef1: {
        ...inputRef1,
        focus: () => inputRef1.current.focus(),
      },
      inputRef2: {
        ...inputRef2,
        focus: () => inputRef2.current.focus(),
      },
    }));
    const { t } = useTranslation();
    const changeStartTimeHandler = (label, value) => {
      setStartTime(value);
      if (onStartTimeChange) {
        onStartTimeChange(label);
      }
    };
    const changeEndTimeHandler = (label, value) => {
      setEndTime(value);
      if (onEndTimeChange) {
        onEndTimeChange(label);
      }
    };
    const validateTimeRange = () => {
      let error;
      const end = endTime || defaultEndTime;
      const start = startTime || defaultStartTime;
      if (start && end) {
        const duration = getDuration(start, end);
        if (duration < 0) {
          error = "end time is before start time";
        }
      }
      setRangeError(error);
      if (onRangeChange) {
        onRangeChange({
          startTime,
          endTime,
          error,
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
        aria-label={startAriaLabel || t("select a start time")}
        data-testid="timerange-start-time"
        ref={inputRef1}
        error={rangeError}
        {...startTimeProps}
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
        aria-label={endAriaLabel || t("select an end time")}
        data-testid="timerange-end-time"
        ref={inputRef2}
        error={rangeError}
        {...endTimeProps}
      />
    );
    useEffect(() => {
      validateTimeRange();
    }, [startTime, endTime]);
    return (
      <RangeContainer
        labelProps={{
          ...labelProps,
          labelText:
            labelProps.labelText === DEFAULT_LABEL
              ? t("time range")
              : labelProps.labelText,
        }}
        startComponent={startInput}
        selected={endTime}
        endComponent={endInput}
        errorMessages={
          !disableRangeValidation ? [rangeError, errorMessage] : [errorMessage]
        }
        {...props}
      />
    );
  }
);
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
    labelText: DEFAULT_LABEL,
  },
  minTime: null,
  maxTime: null,
  interval: undefined,
  startAriaLabel: undefined,
  endAriaLabel: undefined,
};
export default TimeRange;
