// @ts-nocheck
import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { isBefore, isSameDay } from "date-fns";
import { useTranslation } from "react-i18next";
import { DatePicker } from "../DatePicker";
import { RangeContainer } from "../RangeContainer";
import { FieldLabelDefaultProps } from "../FieldLabel/FieldLabel.type";
import { FieldProps } from "../Form/Field";
import { DateRangeStyles, highlightDates } from "./DateRangeStyles";
import { getDuration } from "../TimeRange/TimeRange.utils";
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
};

const DEFAULT_LABEL = "Date Range";

const DateRange: React.FC<DateRangeProps> = forwardRef(
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
      ...props
    },
    ref
  ) => {
    const dateRef1 = useRef();
    const dateRef2 = useRef();
    const timeRef1 = useRef();
    const timeRef2 = useRef();
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);
    const [startTime, setStartTime] = useState(defaultStartTime);
    const [endTime, setEndTime] = useState(defaultEndTime);
    const [rangeError, setRangeError] = useState();
    useImperativeHandle(ref, () => ({
      dateRef1: {
        ...dateRef1,
        focus: () => dateRef1.current.setFocus(),
      },
      dateRef2: {
        ...dateRef2,
        focus: () => dateRef2.current.setFocus(),
      },
      timeRef1: {
        ...timeRef1,
        focus: () => timeRef1.current.focus(),
      },
      timeRef2: {
        ...timeRef2,
        focus: () => timeRef2.current.focus(),
      },
    }));
    const { t } = useTranslation();
    const changeStartTimeHandler = (label, value) => {
      setStartTime(value);
      if (onStartTimeChange) {
        onStartTimeChange(label, value);
      }
    };
    const changeEndTimeHandler = (label, value) => {
      setEndTime(value);
      if (onEndTimeChange) {
        onEndTimeChange(label, value);
      }
    };
    const changeStartDateHandler = (date) => {
      setStartDate(date);
      if (onStartDateChange) {
        onStartDateChange(date);
      }
    };
    const changeEndDateHandler = (date) => {
      setEndDate(date);
      if (onEndDateChange) {
        onEndDateChange(date);
      }
    };
    const validateDateRange = () => {
      let error;
      if (endDate && startDate) {
        if (
          isBefore(endDate, startDate) &&
          (showTimes || !isSameDay(endDate, startDate))
        ) {
          error = "end date is before start date";
        }
        if (isSameDay(endDate, startDate) && showTimes) {
          const duration = getDuration(startTime, endTime);
          if (duration < 0) {
            error = "end time is before start time";
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
          error,
        });
      }
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
    useEffect(() => {
      validateDateRange();
    }, [startDate, endDate, startTime, endTime]);
    return (
      <>
        <DateRangeStyles />
        <RangeContainer
          labelProps={{
            ...labelProps,
            labelText:
              labelProps.labelText === DEFAULT_LABEL
                ? t("date range")
                : labelProps.labelText,
          }}
          startComponent={startDateInput}
          endComponent={endDateInput}
          errorMessages={
            !disableRangeValidation
              ? [t(rangeError), errorMessage]
              : [errorMessage]
          }
          {...props}
        />
      </>
    );
  }
);
export default DateRange;
