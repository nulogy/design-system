import React, { Component } from "react";
import PropTypes from "prop-types";
import { format, setMinutes } from "date-fns";
import styled from "styled-components";

import { components } from "react-select";
import theme from "../theme";
import { Select } from "../Select";
import { SelectDefaultProps, SelectPropTypes } from "../Select/Select.type";
import { TimePickerStyles } from "./TimePickerStyles";
import { Icon } from "../Icon";
import SelectOption from "../Select/SelectOption";

const DEFAULT_TIME_FORMAT = "hh:mm aa";
const DEFAULT_PLACEHOLDER = "HH:MM";

const ZERO_DATE = new Date(0);

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
      <StyledTimeIcon icon="queryBuilder" {...props} />
    </components.DropdownIndicator>
  );
};

const getTimeIntervals = interval => {
  const times = [];
  const date = ZERO_DATE;
  const numberOfOptions = 24 * 4;
  for (let i = 0; i < numberOfOptions; i += 1) {
    times.push(setMinutes(date, interval * i));
  }
  return times.sort();
};

const getTimeOptions = (interval, timeFormat) => {
  return getTimeIntervals(interval).map(date => ({
    value: format(date, timeFormat),
    label: format(date, timeFormat)
  }));
};

class TimePicker extends Component {
  handleInputChange = event => {
    const { value } = event.target;
    const { onInputChange } = this.props;

    if (onInputChange) {
      onInputChange(value);
    }
  };

  handleSelectedTimeChange = date => {
    const { onChange, timeFormat } = this.props;
    const time = format(date, timeFormat);
    if (onChange) {
      onChange(time);
    }
  };

  render() {
    const { timeFormat, interval, className } = this.props;
    const options = getTimeOptions(interval, timeFormat) || [];

    return (
      <>
        <TimePickerStyles />
        <Select
          className={`nds-time-picker ${className}`}
          onChange={this.handleSelectedDateChange}
          options={options}
          components={{ DropdownIndicator, Option: StyledSelectOption }}
          onInputChange={this.handleOnInputChange}
          {...this.props}
        />
      </>
    );
  }
}

TimePicker.propTypes = {
  timeFormat: PropTypes.string,
  interval: PropTypes.number,
  placeholder: PropTypes.string
};

TimePicker.defaultProps = {
  timeFormat: DEFAULT_TIME_FORMAT,
  interval: 15,
  placeholder: DEFAULT_PLACEHOLDER
};

export default TimePicker;
