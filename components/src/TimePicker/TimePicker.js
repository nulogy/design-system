import React, { useState, useContext } from "react";
import { setMinutes } from "date-fns";
import styled from "styled-components";
import PropTypes from "prop-types";
import { components } from "react-windowed-select";
import { useTranslation } from "react-i18next";

import { Select } from "../Select";
import { TimePickerStyles } from "./TimePickerStyles";
import { Icon } from "../Icon";
import SelectOption from "../Select/SelectOption";
import { LocaleContext } from "../NDSProvider/LocaleContext";
import { localizedFormat } from "../utils/localized-date-fns";

const DEFAULT_TIME_FORMAT = "hh:mm aa";

const DEFAULT_PLACEHOLDER = "HH:MM";

const MILITARY_TIME_FORMAT = "HH:mm";

const ZERO_DATE = new Date(Date.UTC(0));

const StyledTimeIcon = styled(Icon)(({ theme }) => ({
  color: theme.colors.darkGrey,
  "&:hover": {
    color: theme.colors.darkGrey
  }
}));

const StyledSelectOption = styled(SelectOption)(({ isSelected, theme }) => {
  return {
    background: isSelected ? theme.colors.darkBlue : null,
    color: isSelected ? theme.colors.white : null,
    fontWeight: theme.fontWeights.normal,
    "&:hover": {
      background: isSelected ? theme.colors.darkBlue : null
    }
  };
});

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
      value: localizedFormat(date, MILITARY_TIME_FORMAT, locale),
      label: localizedFormat(date, timeFormat, locale)
    }))
    .sort((a, b) => getIntervalFromTime(a.value, interval) - getIntervalFromTime(b.value, interval))
    .slice(startingInterval, finalInterval);
};

const standardizeTime = input => {
  const standardizedInput = input.toUpperCase().replace(/ /g, "");
  const oneDigitHourRe = /^[0-9][:]/;
  const fourDigitTime = oneDigitHourRe.test(standardizedInput) ? `0${standardizedInput}` : standardizedInput;
  return fourDigitTime;
};

const TimePicker = ({
  timeFormat,
  interval,
  className,
  minTime,
  maxTime,
  defaultValue,
  onInputChange,
  "aria-label": ariaLabel,
  ...props
}) => {
  const [input, setInput] = useState("");
  const { locale } = useContext(LocaleContext);
  const { t } = useTranslation();

  const filteredOptions = () => {
    const inputHasMinutes = /[:][0-9]/.test(standardizeTime(input));
    const optionsAtInterval = getTimeOptions(interval, timeFormat, minTime, maxTime, locale) || [];
    const optionsByMinute = getTimeOptions(1, timeFormat, minTime, maxTime, locale) || [];
    const optionsList = inputHasMinutes ? optionsByMinute : optionsAtInterval;
    return optionsList.filter(({ label }) => standardizeTime(label).includes(standardizeTime(input)));
  };

  const overrideInternalFiltering = () => true;
  const visibleOptions = filteredOptions() || [];

  return (
    <>
      <TimePickerStyles />
      <Select
        options={visibleOptions}
        filterOption={overrideInternalFiltering}
        defaultValue={defaultValue}
        components={{ DropdownIndicator, Option: StyledSelectOption }}
        aria-label={ariaLabel || t("select a time")}
        onInputChange={(value, ...args) => {
          setInput(value);
          if (onInputChange) {
            onInputChange(value, ...args);
          }
        }}
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
