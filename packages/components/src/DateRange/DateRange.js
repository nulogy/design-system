import React, { useState, useEffect, useRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { isBefore, isSameDay } from "date-fns";
import styled from "styled-components";

import { useTranslation } from "react-i18next";
import { DatePicker } from "../DatePicker";
import { RangeContainer } from "../RangeContainer";
import { InputFieldPropTypes, InputFieldDefaultProps } from "../Input/InputField.type";
import { FieldLabelDefaultProps, FieldLabelProps } from "../FieldLabel/FieldLabel.type";
import { DateRangeStyles, highlightDates } from "./DateRangeStyles";
import { TimePicker } from "../TimePicker";
import { getDuration } from "../TimeRange/TimeRange.utils";
import { forwardRef } from "react";

const DEFAULT_LABEL = "Date Range";

const StyledStartTime = styled(TimePicker)(({ theme }) => ({
  marginLeft: theme.space.x1
}));

const StyledEndTime = styled(TimePicker)(({ theme }) => ({
  marginRight: theme.space.x1
}));

const DateRange = forwardRef(
  (
    {
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
      interval,
      disableFlipping,
      locale
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
        focus: () => dateRef1.current.setFocus()
      },
      dateRef2: {
        ...dateRef2,
        focus: () => dateRef2.current.setFocus()
      },
      timeRef1: {
        ...timeRef1,
        focus: () => timeRef1.current.focus()
      },
      timeRef2: {
        ...timeRef2,
        focus: () => timeRef2.current.focus()
      }
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
      if (endDate && startDate) {
        if (isBefore(endDate, startDate)) {
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
          inputProps={{ "aria-label": t("select a start date"), error: rangeError, ...startDateInputProps }}
          errorMessage={startDateErrorMessage}
          minDate={minDate}
          maxDate={maxDate}
          highlightDates={highlightDates(startDate, endDate)}
          locale={locale}
          disableFlipping={disableFlipping}
          ref={dateRef1}
        />
        {showTimes && (
          <StyledStartTime
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
            locale={locale}
            aria-label={t("select an end time")}
            data-testid="daterange-end-time"
            ref={timeRef2}
          />
        )}
        <DatePicker
          dateFormat={dateFormat}
          selected={endDate}
          onChange={changeEndDateHandler}
          inputProps={{
            "aria-label": t("select an end date"),
            ...endDateInputProps
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
            labelText: labelProps.labelText === DEFAULT_LABEL ? t("date range") : labelProps.labelText
          }}
          startComponent={startDateInput}
          endComponent={endDateInput}
          errorMessages={!disableRangeValidation ? [t(rangeError), errorMessage] : [errorMessage]}
        />
      </>
    );
  }
);

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
  interval: PropTypes.number,
  locale: PropTypes.string,
  disableFlipping: PropTypes.bool
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
    labelText: DEFAULT_LABEL
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
  interval: undefined,
  locale: undefined,
  disableFlipping: false
};

export default DateRange;
