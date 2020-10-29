// @ts-nocheck
import React, { useState, useContext, useEffect, forwardRef } from "react";
import { setMinutes } from "date-fns";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { InputField } from "../Input/InputField";
import { InlineValidation } from "../Validation";
import { LocaleContext } from "../NDSProvider/LocaleContext";
import { localizedFormat } from "../utils/localized-date-fns";
import { DetectOutsideClick } from "../utils";
import { Box } from "../Box";
import { keyCodes } from "../constants";
const DEFAULT_TIME_FORMAT = "h:mm aa";
const DEFAULT_PLACEHOLDER = "HH:MM";
const MILITARY_TIME_FORMAT = "HH:mm";
const ZERO_DATE = new Date(Date.UTC(0));

const stripLetters = (x) => Number(x.replace(/\D/g, ''));

const stripLettersFromMinutes = (x) => {
  let minNoLetters = String(x).replace(/\D/g, '');
  if (minNoLetters.length < 2) {
    minNoLetters = `${minNoLetters}0`;
  }
  return Number(minNoLetters);
}

export const convertTo24HourTimeArray = (time) => {
  const timeArray = time.includes(":") ? time.split(":") : [time, 0];
  timeArray[0] = stripLetters(timeArray[0]);
  timeArray[1] = stripLettersFromMinutes(timeArray[1]);

  if (time.includes("p") || time.includes("P")) {
    timeArray[0] += 12;
  }
  return timeArray;
}

const getIntervalFromTime = (time, interval, minTime) => {
  const minInterval = minTime ? getIntervalFromTime(minTime, interval) : 0;
  if (time && interval) {
    const timeArray = convertTo24HourTimeArray(time);
    const hours = timeArray[0];
    const minutes = timeArray[1];
    const nearestInterval = Math.round((hours * 60) / interval + minutes / interval) - minInterval;
    return nearestInterval;
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
  if (input) {
    const standardizedInput = input.toUpperCase().replace(/ /g, ""); // strip spaces
    return standardizedInput;
  }
  return input;
};
const TimePickerInput = styled(InputField)(({ dropdownIsOpen }) => ({
  ...(dropdownIsOpen && {
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px"
  })
}));
const TimePickerDropdown = styled.ul(({ theme, isOpen }) => {
  return {
    position: "absolute",
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
    display: isOpen ? "block" : "none",
    zIndex: theme.zIndex.content
  };
});
const TimePickerOption = styled.li(({ theme, isSelected, isFocused, isClosest}) => {
  return {
    padding: theme.space.x1,
    marginBottom: "0px",
    backgroundColor: isSelected ? theme.colors.darkBlue : theme.colors.white,
    color: isSelected ? theme.colors.white : theme.colors.black,
    "&:hover": {
      background: !isSelected && theme.colors.lightBlue
    },
    ...(isFocused || isClosest && {
      background: !isSelected && theme.colors.lightBlue,
      outline: "none"
    })
  };
});
type TimePickerProps = {
  timeFormat?: string;
  interval?: number;
  placeholder?: string;
  className?: string;
  onChange?: (...args: any[]) => any;
  onInputChange?: (...args: any[]) => any;
  minTime?: string;
  maxTime?: string;
  defaultValue?: string;
  "aria-label"?: string;
  errorMessage?: string;
  errorList?: React.ReactNode;
  labelText?: string;
  onBlur?: (...args: any[]) => any;
  onFocus?: (...args: any[]) => any;
  onClick?: (...args: any[]) => any;
};
const TimePicker: React.SFC<TimePickerProps> = forwardRef(
  (
    {
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
      onChange,
      "aria-label": ariaLabel,
      value,
      ...props
    },
    inputRef
  ) => {
    const [input, setInput] = useState(defaultValue);
    const [currentOptionRef, setCurrentOptionRef] = useState(null);
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
    const { locale } = useContext(LocaleContext);
    const [ref, setRef] = useState(null);
    const { t } = useTranslation();
    useEffect(() => {
      if (currentOptionRef && dropdownIsOpen) {
        currentOptionRef.scrollIntoView({
          behaviour: "smooth",
          block: "center"
        });
      }
    }, [currentOptionRef, dropdownIsOpen, input]);
    const matchingIndex = getIntervalFromTime(input, interval, minTime);
    const getDropdownOptions = () => {
      const optionsAtInterval = getTimeOptions(interval, timeFormat, minTime, maxTime, locale) || [];
      return optionsAtInterval;
    };
    const dropdownOptions = getDropdownOptions() || [];
    const hasError = !!(errorMessage || errorList);
    const handleBlur = e => {
      onBlur(e);
      setDropdownIsOpen(false);
      if (input) {
        setInput(dropdownOptions[matchingIndex].label);
      }
    };
    const handleFocus = e => {
      onFocus(e);
    };
    const handleClickInput = e => {
      onClick(e);
      setDropdownIsOpen(true);
    };
    const handleOptionSelection = option => {
      setInput(option.label);
      setDropdownIsOpen(false);
      onChange(option.label, option.value);
    };
    const onCurrentOptionRefChange = React.useCallback(node => {
      if (node) {
        setCurrentOptionRef(node);
      }
    }, []);
    const onRefChange = React.useCallback(node => {
      if (node) {
        setRef(node);
      }
    }, []);
    const handleKeyDown = event => {
      if (event.keyCode === keyCodes.DOWN) {
        // key down
        setDropdownIsOpen(true);
      } else if (event.keyCode === keyCodes.TAB) {
        // tab
        handleBlur(event);
      }
    };
    const handleInputChange = e => {
      const inputValue = e.currentTarget.value;
      setInput(inputValue);
      if (onInputChange) {
        onInputChange(inputValue);
      }
    };
    const displayValue = value ? value : input || "";
    return (
      <>
        <Box
          className={`nds-time-picker ${className || ""}`}
          position="relative"
          ref={onRefChange}
          width="130px"
          data-testid="select-container"
          {...props}
        >
          <TimePickerInput
            labelText={labelText}
            error={hasError}
            dropdownIsOpen={dropdownIsOpen}
            onChange={handleInputChange}
            onFocus={handleFocus}
            value={displayValue}
            placeholder={placeholder}
            icon="queryBuilder"
            onClick={handleClickInput}
            onKeyDown={e => handleKeyDown(e)}
            aria-label={ariaLabel || t("Select a time")}
            inputWidth="130px"
            iconSize="20px"
            data-testid="select-input"
            type="text"
            ref={inputRef}
          />
          <TimePickerDropdown
            isOpen={dropdownIsOpen}
            aria-expanded={dropdownIsOpen}
            role="listbox"
            data-testid="select-dropdown"
          >
            {dropdownOptions.map((option, i) => (
              <TimePickerOption
                ref={matchingIndex === i ? onCurrentOptionRefChange : undefined}
                isSelected={standardizeTime(option.label) === standardizeTime(input)}
                isClosest={matchingIndex === i}
                key={option.label}
                data-name={option.label}
                data-value={option.value}
                onClick={() => {
                  handleOptionSelection(option);
                }}
                role="option"
                data-testid="select-option"
              >
                {option.label}
              </TimePickerOption>
            ))}
          </TimePickerDropdown>
          <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
        </Box>
        <DetectOutsideClick onClick={handleBlur} clickRef={[ref]} />
      </>
    );
  }
);
TimePicker.defaultProps = {
  timeFormat: DEFAULT_TIME_FORMAT,
  interval: 15,
  placeholder: DEFAULT_PLACEHOLDER,
  className: undefined,
  onChange: undefined,
  onInputChange: undefined,
  minTime: undefined,
  maxTime: undefined,
  defaultValue: "",
  "aria-label": undefined,
  errorMessage: undefined,
  errorList: undefined,
  labelText: undefined,
  onClick: () => {},
  onBlur: () => {},
  onFocus: () => {}
};
export default TimePicker;
