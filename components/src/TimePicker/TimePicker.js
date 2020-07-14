import React, { useState, useContext, useEffect } from "react";
import { setMinutes } from "date-fns";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { Field } from "../Form";
import { InputField } from "../Input/InputField";
import { InlineValidation } from "../Validation";
import { LocaleContext } from "../NDSProvider/LocaleContext";
import { localizedFormat } from "../utils/localized-date-fns";

const DEFAULT_TIME_FORMAT = "hh:mm aa";

const DEFAULT_PLACEHOLDER = "HH:MM";

const MILITARY_TIME_FORMAT = "HH:mm";

const ZERO_DATE = new Date(Date.UTC(0));

const getIntervalFromTime = (time, interval) => {
  if (time && interval) {
    const timeArray = time.split(":").map(i => Number(i));
    const hours = timeArray[0];
    const minutes = timeArray[1];
    return (hours * 60) / interval + minutes / interval;
  }
  return null;
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

const TimePickerInput = styled(InputField)(({ theme }) => {
  return {
    "input:focus": {
      borderBottomLeftRadius: "0px",
      borderBottomRightRadius: "0px"
    }
  };
});

const TimePickerDropdown = styled.ul(({ theme, isOpen }) => {
  return {
    position: "absolute",
    top: "70px",
    width: "100%",
    background: theme.colors.white,
    listStyle: "none",
    margin: "0px",
    padding: "0px",
    maxHeight: "200px",
    overflow: "auto",
    boxShadow: theme.shadows.focus,
    border: "1px solid",
    borderColor: theme.colors.blue,
    borderBottomLeftRadius: theme.radii.medium,
    borderBottomRightRadius: theme.radii.medium,
    display: isOpen ? "block" : "none"
  };
});

const TimePickerOption = styled.li(({ theme, isSelected }) => {
  return {
    padding: theme.space.x1,
    marginBottom: "0px",
    background: isSelected ? theme.colors.darkBlue : theme.colors.white,
    color: isSelected ? theme.colors.white : theme.colors.black,
    "&:hover": {
      background: !isSelected && theme.colors.lightBlue
    }
  };
});

const TimePicker = ({
  timeFormat,
  interval,
  className,
  minTime,
  maxTime,
  defaultValue,
  onInputChange,
  onBlur,
  onFocus,
  errorMessage,
  errorList,
  labelText,
  placeholder,
  onClick,
  onSelect,
  ...props
}) => {
  const [input, setInput] = useState(defaultValue);
  const [scrollRef, setScrollRef] = useState(null);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const { locale } = useContext(LocaleContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (scrollRef && dropdownIsOpen) {
      scrollRef.scrollIntoView({
        behaviour: "smooth",
        block: "center"
      });
    }
  }, [scrollRef, dropdownIsOpen]);

  const filteredOptions = () => {
    const optionsAtInterval = getTimeOptions(interval, timeFormat, minTime, maxTime, locale) || [];
    return optionsAtInterval;
  };

  const visibleOptions = filteredOptions() || [];

  const hasError = !!(errorMessage || errorList);

  const handleBlur = e => {
    setDropdownIsOpen(false);
    onBlur(e);
  };

  const handleFocus = e => {
    setDropdownIsOpen(true);
    onFocus(e);
  };

  const handleOptionSelection = option => {
    setInput(option.label);
    setDropdownIsOpen(false);
    onSelect(option);
  };

  const isClosestTime = ({ index }) => {
    return getIntervalFromTime(input, interval) === index;
  };

  const onRefChange = React.useCallback(node => {
    if (node) {
      setScrollRef(node);
    }
  }, []);

  return (
    <Field className={`nds-time-picker ${className || ""}`} position="relative">
      <TimePickerInput
        labelText={labelText}
        error={hasError}
        onChange={e => {
          const inputValue = e.currentTarget.value;
          setInput(inputValue);
          if (onInputChange) {
            onInputChange(e);
          }
        }}
        onBlur={handleBlur}
        onFocus={handleFocus}
        defaultValue={defaultValue}
        value={input}
        placeholder={placeholder}
        icon="queryBuilder"
        onClick={onClick}
      />
      <TimePickerDropdown isOpen={dropdownIsOpen}>
        {visibleOptions.map((option, i) => (
          <TimePickerOption
            ref={isClosestTime({ index: i }) ? onRefChange : undefined}
            isSelected={option.label === input}
            onClick={() => handleOptionSelection(option)}
          >
            {option.label}
          </TimePickerOption>
        ))}
      </TimePickerDropdown>
      <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
    </Field>
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
  "aria-label": PropTypes.string,
  errorMessage: PropTypes.string,
  errorList: PropTypes.node,
  labelText: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  onSelect: PropTypes.func
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
  "aria-label": undefined,
  errorMessage: undefined,
  errorList: undefined,
  labelText: undefined,
  onClick: () => {},
  onSelect: () => {},
  onBlur: () => {},
  onFocus: () => {}
};

export default TimePicker;
