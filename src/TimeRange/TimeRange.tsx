import type React from "react";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { SpaceProps } from "styled-system";
import { FieldLabelDefaultProps } from "../FieldLabel/FieldLabel.type";
import { type ComponentVariant, useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { RangeContainer } from "../RangeContainer";
import { TimePicker } from "../TimePicker";
import { getDuration } from "./TimeRange.utils";

const DEFAULT_LABEL = "Time Range";

type TimeRangeErrorInput = {
  startTime?: string;
  endTime?: string;
  defaultStartTime?: string;
  defaultEndTime?: string;
};

function computeTimeRangeError({ startTime, endTime, defaultStartTime, defaultEndTime }: TimeRangeErrorInput) {
  const start = startTime || defaultStartTime;
  const end = endTime || defaultEndTime;
  if (start && end && getDuration(start, end) < 0) {
    return "end time is before start time";
  }
  return undefined;
}

type TimeRangeProps = SpaceProps & {
  variant?: ComponentVariant;
  timeFormat?: string;
  onRangeChange?: (range: { startTime?: string; endTime?: string; error?: string }) => void;
  onStartTimeChange?: (label: string) => void;
  onEndTimeChange?: (label: string) => void;
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
      variant,
      disableRangeValidation = false,
      labelProps = {
        ...FieldLabelDefaultProps,
        labelText: DEFAULT_LABEL,
      },
      ...props
    }: TimeRangeProps,
    ref,
  ) => {
    const [startTime, setStartTime] = useState<string | undefined>();
    const [endTime, setEndTime] = useState<string | undefined>();

    // Derived during render — pure function of the times (with the default* fallbacks).
    const rangeError = computeTimeRangeError({ startTime, endTime, defaultStartTime, defaultEndTime });

    // Notify the parent of the new range + its validation error. Called from the change handlers
    // (carrying the new value as `overrides`, since the state setter hasn't updated the closure
    // yet this render) and once on mount. No effect depends on changing data, so an inline
    // `onRangeChange` can never re-trigger a loop.
    const emitRange = (overrides: Partial<TimeRangeErrorInput>) => {
      const next = { startTime, endTime, ...overrides };
      onRangeChange?.({ ...next, error: computeTimeRangeError({ ...next, defaultStartTime, defaultEndTime }) });
    };

    const inputRef1 = useRef<HTMLInputElement>(null);
    const inputRef2 = useRef<HTMLInputElement>(null);

    const { t } = useTranslation();

    const componentVariant = useComponentVariant(variant);

    useImperativeHandle(ref, () => ({
      inputRef1: {
        ...inputRef1,
        focus: () => {
          if (inputRef1.current) {
            inputRef1.current.focus();
          }
        },
      },
      inputRef2: {
        ...inputRef2,
        focus: () => {
          if (inputRef2.current) {
            inputRef2.current.focus();
          }
        },
      },
    }));

    // Mount-only by design — reports the initial/default range + error to the parent once.
    // Empty deps cannot re-run, so no loop is possible even with an inline onRangeChange.
    // biome-ignore lint/correctness/useExhaustiveDependencies: emitRange is intentionally excluded so this fires exactly once on mount.
    useEffect(() => {
      emitRange({});
    }, []);

    const changeStartTimeHandler = (label, value) => {
      setStartTime(value);
      if (onStartTimeChange) {
        onStartTimeChange(label);
      }
      emitRange({ startTime: value });
    };

    const changeEndTimeHandler = (label, value) => {
      setEndTime(value);
      if (onEndTimeChange) {
        onEndTimeChange(label);
      }
      emitRange({ endTime: value });
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
        variant={componentVariant}
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
        variant={componentVariant}
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
        variant={componentVariant}
        {...props}
      />
    );
  },
);

export default TimeRange;
