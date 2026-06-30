import { isBefore, isSameDay } from "date-fns";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { ReactDatePicker } from "react-datepicker";
import { useTranslation } from "react-i18next";
import { DatePicker } from "../DatePickers";
import { FieldLabelDefaultProps } from "../FieldLabel/FieldLabel.type";
import type { FieldProps } from "../Form/Field";
import { type ComponentVariant, useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { RangeContainer } from "../RangeContainer";
import { getDuration } from "../TimeRange/TimeRange.utils";
import { DateRangeStyles, highlightDates } from "./DateRangeStyles";
import EndTime from "./EndTime";
import StartTime from "./StartTime";

type DateRangeProps = FieldProps & {
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
  showTimes?: boolean;
  minTime?: string;
  maxTime?: string;
  defaultStartTime?: string;
  defaultEndTime?: string;
  onStartTimeChange?: (...args: any[]) => any;
  onEndTimeChange?: (...args: any[]) => any;
  timeFormat?: string;
  interval?: number;
  locale?: string;
  disableFlipping?: boolean;
  endTimeProps?: any;
  startTimeProps?: any;
  variant?: ComponentVariant;
};

const DEFAULT_LABEL = "Date Range";

type RangeErrorInput = {
  startDate?: Date | null;
  endDate?: Date | null;
  startTime?: string;
  endTime?: string;
  showTimes?: boolean;
};

function computeRangeError({ startDate, endDate, startTime, endTime, showTimes }: RangeErrorInput) {
  let error: string | undefined;
  if (endDate && startDate) {
    if (isBefore(endDate, startDate) && (showTimes || !isSameDay(endDate, startDate))) {
      error = "end date is before start date";
    }
    if (isSameDay(endDate, startDate) && showTimes) {
      if (getDuration(startTime, endTime) < 0) {
        error = "end time is before start time";
      }
    }
  }
  return error;
}

const DateRange = forwardRef<unknown, DateRangeProps>(
  (
    {
      dateFormat,
      onRangeChange,
      onStartDateChange,
      onEndDateChange,
      errorMessage,
      startDateErrorMessage,
      endDateErrorMessage,
      defaultStartDate = null,
      defaultEndDate = null,
      endDateInputProps,
      startDateInputProps,
      disableRangeValidation,
      labelProps = {
        ...FieldLabelDefaultProps,
        labelText: DEFAULT_LABEL,
      },
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
      interval,
      disableFlipping = false,
      locale,
      endTimeProps,
      startTimeProps,
      variant,
      ...props
    },
    ref,
  ) => {
    const dateRef1 = useRef<ReactDatePicker>(null);
    const dateRef2 = useRef<ReactDatePicker>(null);
    const timeRef1 = useRef<HTMLInputElement>(null);
    const timeRef2 = useRef<HTMLInputElement>(null);
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);
    const [startTime, setStartTime] = useState(defaultStartTime);
    const [endTime, setEndTime] = useState(defaultEndTime);
    const { t } = useTranslation();

    // Derived during render — a pure function of the dates/times/showTimes. No state, no effect.
    const rangeError = computeRangeError({ startDate, endDate, startTime, endTime, showTimes });

    // Notify the parent of the new range + its validation error. Called from the change handlers
    // (which carry the new value as `overrides`, since the corresponding state setter hasn't
    // updated the closure yet this render) and once on mount. No effect depends on changing data,
    // so an inline `onRangeChange` can never re-trigger a loop.
    const emitRange = (overrides: Partial<RangeErrorInput>) => {
      const next = { startDate, endDate, startTime, endTime, ...overrides };
      onRangeChange?.({ ...next, error: computeRangeError({ ...next, showTimes }) });
    };

    const componentVariant = useComponentVariant(variant);

    useImperativeHandle(ref, () => ({
      dateRef1: {
        ...dateRef1,
        focus: () => dateRef1.current?.setFocus(),
      },
      dateRef2: {
        ...dateRef2,
        focus: () => dateRef2.current?.setFocus(),
      },
      timeRef1: {
        ...timeRef1,
        focus: () => timeRef1.current?.focus(),
      },
      timeRef2: {
        ...timeRef2,
        focus: () => timeRef2.current?.focus(),
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
        onStartTimeChange(label, value);
      }
      emitRange({ startTime: value });
    };

    const changeEndTimeHandler = (label, value) => {
      setEndTime(value);
      if (onEndTimeChange) {
        onEndTimeChange(label, value);
      }
      emitRange({ endTime: value });
    };

    const changeStartDateHandler = (date) => {
      setStartDate(date);
      if (onStartDateChange) {
        onStartDateChange(date);
      }
      emitRange({ startDate: date });
    };

    const changeEndDateHandler = (date) => {
      setEndDate(date);
      if (onEndDateChange) {
        onEndDateChange(date);
      }
      emitRange({ endDate: date });
    };

    const startInputProps = {
      "aria-label": t("select a start date"),
      error: rangeError,
      ...startDateInputProps,
    };

    const startDateInput = (
      <>
        <DatePicker
          dateFormat={dateFormat}
          selected={startDate}
          onChange={changeStartDateHandler}
          inputProps={startInputProps}
          errorMessage={startDateErrorMessage}
          minDate={minDate}
          maxDate={maxDate}
          highlightDates={highlightDates(startDate, endDate)}
          locale={locale}
          disableFlipping={disableFlipping}
          ref={dateRef1}
        />
        {showTimes && (
          <StartTime
            variant={componentVariant}
            selected={startTime}
            defaultValue={defaultStartTime}
            aria-label={t("select a start time")}
            minTime={minTime}
            maxTime={maxTime}
            timeFormat={timeFormat}
            interval={interval}
            onChange={changeStartTimeHandler}
            locale={locale}
            data-testid="daterange-start-time"
            ref={timeRef1}
            error={!!rangeError}
            {...startTimeProps}
          />
        )}
      </>
    );

    const endDateInput = (
      <>
        {showTimes && (
          <EndTime
            variant={componentVariant}
            selected={endTime}
            defaultValue={defaultEndTime}
            minTime={minTime}
            maxTime={maxTime}
            timeFormat={timeFormat}
            interval={interval}
            onChange={changeEndTimeHandler}
            locale={locale}
            aria-label={t("select an end time")}
            data-testid="daterange-end-time"
            ref={timeRef2}
            error={!!rangeError}
            {...endTimeProps}
          />
        )}
        <DatePicker
          dateFormat={dateFormat}
          selected={endDate}
          onChange={changeEndDateHandler}
          inputProps={{
            "aria-label": t("select an end date"),
            error: rangeError,
            ...endDateInputProps,
          }}
          errorMessage={endDateErrorMessage}
          minDate={minDate}
          maxDate={maxDate}
          highlightDates={highlightDates(startDate, endDate)}
          locale={locale}
          disableFlipping={disableFlipping}
          ref={dateRef2}
        />
      </>
    );

    return (
      <>
        <DateRangeStyles />
        <RangeContainer
          variant={componentVariant}
          labelProps={{
            ...labelProps,
            labelText: labelProps.labelText === DEFAULT_LABEL ? t("date range") : labelProps.labelText,
          }}
          startComponent={startDateInput}
          endComponent={endDateInput}
          errorMessages={!disableRangeValidation ? [t(rangeError), errorMessage] : [errorMessage]}
          {...props}
        />
      </>
    );
  },
);
export default DateRange;
