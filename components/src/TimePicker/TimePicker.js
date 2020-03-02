import React from "react";
import { format, setMinutes } from "date-fns";
import styled from "styled-components";
import PropTypes from "prop-types";
import { components } from "react-select";
import { useTranslation } from "react-i18next";

import theme from "../theme";
import { Select } from "../Select";
import { TimePickerStyles } from "./TimePickerStyles";
import { Icon } from "../Icon";
import SelectOption from "../Select/SelectOption";
import { supportedDateLocales } from "../utils/datePickerLocales";

const DEFAULT_TIME_FORMAT = "hh:mm aa";

const DEFAULT_PLACEHOLDER = "HH:MM";

const MILITARY_TIME_FORMAT = "HH:mm";

const ZERO_DATE = new Date(Date.UTC(0));

const StyledTimeIcon = styled(Icon)({
  color: theme.colors.darkGrey,
  "&:hover": {
    color: theme.colors.darkGrey
  }
});

const StyledSelectOption = styled(SelectOption)(({ isSelected }) => ({
  background: isSelected ? theme.colors.darkBlue : null,
  color: isSelected ? theme.colors.white : null,
  fontWeight: theme.fontWeights.normal,
  "&:hover": {
    background: isSelected ? theme.colors.darkBlue : null
  }
}));

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <StyledTimeIcon icon="queryBuilder" size="22px" />
    </components.DropdownIndicator>
  );
};

const getIntervalFromTime = (time, interval) => {
  const timeArray = time.split(":").map(i => Number(i));
  const hours = timeArray[0];
  const minutes = timeArray[1];
  return (hours * 60) / interval + minutes / interval;
};

const getTimeIntervals = interval => {
  const numberOfOptions = (24 * 60) / interval;
  const times = [];
  for (let i = 0; i < numberOfOptions; i += 1) {
    times.push(setMinutes(ZERO_DATE, interval * i));
  }
  return times;
};

const getTimeOptions = (interval, timeFormat, minTime, maxTime, locale) => {
  const allTimes = getTimeIntervals(interval);
  let startingInterval = 0;
  let finalInterval = allTimes.length;
  if (minTime) {
    startingInterval = getIntervalFromTime(minTime, interval);
  }
  if (maxTime) {
    finalInterval = getIntervalFromTime(maxTime, interval) + 1;
  }
  return allTimes
    .map(date => ({
      value: format(date, MILITARY_TIME_FORMAT, { locale: supportedDateLocales.enUS }),
      label: format(date, timeFormat, { locale: supportedDateLocales[locale] })
    }))
    .sort((a, b) => getIntervalFromTime(a.value, interval) - getIntervalFromTime(b.value, interval))
    .slice(startingInterval, finalInterval);
};

const TimePicker = ({
  timeFormat,
  interval,
  className,
  minTime,
  maxTime,
  defaultValue,
  locale,
  onInputChange,
  "aria-label": ariaLabel,
  ...props
}) => {
  const options = getTimeOptions(interval, timeFormat, minTime, maxTime, locale) || [];
  const { t } = useTranslation();
  return (
    <>
      <TimePickerStyles />
      <Select
        options={options}
        defaultValue={defaultValue}
        components={{ DropdownIndicator, Option: StyledSelectOption }}
        aria-label={ariaLabel || t("select a time")}
        onInputChange={onInputChange}
        {...props}
        className={`nds-time-picker ${className || ""}`}
      />
    </>
  );
};

TimePicker.propTypes = {
  timeFormat: PropTypes.string,
  interval: PropTypes.number,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
  minTime: PropTypes.string,
  maxTime: PropTypes.string,
  defaultValue: PropTypes.string,
  locale: PropTypes.string,
  "aria-label": PropTypes.string
};

TimePicker.defaultProps = {
  timeFormat: DEFAULT_TIME_FORMAT,
  interval: 15,
  placeholder: DEFAULT_PLACEHOLDER,
  className: undefined,
  onChange: undefined,
  onInputChange: undefined,
  minTime: undefined,
  maxTime: undefined,
  defaultValue: undefined,
  locale: undefined,
  "aria-label": undefined
};

export default TimePicker;
