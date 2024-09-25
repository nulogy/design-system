import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { SpaceProps } from "styled-system";
import { TimePicker } from "../TimePicker";
import { RangeContainer } from "../RangeContainer";
import { FieldLabelDefaultProps } from "../FieldLabel/FieldLabel.type";
import { ComponentSize, useComponentSize } from "../NDSProvider/ComponentSizeContext";
import { getDuration } from "./TimeRange.utils";

const DEFAULT_LABEL = "Time Range";

type TimeRangeProps = SpaceProps & {
  size?: ComponentSize;
  timeFormat?: string;
  onRangeChange?: Function;
  onStartTimeChange?: Function;
  onEndTimeChange?: Function;
  ref?: React.MutableRefObject<unknown>;
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

const TimeRange = forwardRef(
  (
    {
      timeFormat,
      onRangeChange,
      onStartTimeChange,
      onEndTimeChange,
      errorMessage,
      defaultStartTime,
      defaultEndTime,
      minTime,
      maxTime,
      interval,
      startAriaLabel,
      endAriaLabel,
      endTimeProps,
      startTimeProps,
      size,
      disableRangeValidation = false,
      labelProps = {
        ...FieldLabelDefaultProps,
        labelText: DEFAULT_LABEL,
      },
      ...props
    }: TimeRangeProps,
    ref
  ) => {
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [rangeError, setRangeError] = useState();

    const inputRef1 = useRef();
    const inputRef2 = useRef();

    const { t } = useTranslation();

    const componentSize = useComponentSize(size);

    useImperativeHandle(ref, () => ({
      inputRef1: {
        ...inputRef1,
        focus: () => {
          if (inputRef1.current) {
            // @ts-ignore
            inputRef1.current.focus();
          }
        },
      },
      inputRef2: {
        ...inputRef2,
        focus: () => {
          if (inputRef2.current) {
            // @ts-ignore
            inputRef2.current.focus();
          }
        },
      },
    }));

    useEffect(() => {
      validateTimeRange();
    }, [startTime, endTime]);

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
        size={componentSize}
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
        size={componentSize}
        {...endTimeProps}
      />
    );

    return (
      <RangeContainer
        labelProps={{
          ...labelProps,
          labelText: labelProps.labelText === DEFAULT_LABEL ? t("time range") : labelProps.labelText,
        }}
        startComponent={startInput}
        endComponent={endInput}
        errorMessages={!disableRangeValidation ? [rangeError, errorMessage] : [errorMessage]}
        size={componentSize}
        {...props}
      />
    );
  }
);

export default TimeRange;
