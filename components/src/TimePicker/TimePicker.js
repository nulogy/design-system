import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDatePicker from "react-datepicker";
import { format, isValid } from "date-fns";
import { debounce } from "throttle-debounce";

import TimePickerInput from "./TimePickerInput";
import { TimePickerStyles } from "./TimePickerStyles";
import { Field } from "../Form";
import { InlineValidation } from "../Validation";
import { InputFieldPropTypes, InputFieldDefaultProps } from "../Input/InputField.type";

const DEFAULT_TIME_FORMAT = "hh:mm aa";
const DEFAULT_PLACEHOLDER = "HH:MM";

const getHours = value => {
  const hours = Number(value.split(":")[0].replace(/\D/g, ""));
  if (value.includes("PM") && hours < 12) {
    return hours + 12;
  }
  return hours;
};

const getMinutes = value => {
  const minutes = value.split(":")[1].replace(/\D/g, "");
  if (minutes < 60 && minutes.length === 2) {
    return minutes;
  }
  return null;
};

export const getNewDateWithTime = value => {
  if (value && value.length >= 4) {
    const hours = getHours(value);
    const minutes = getMinutes(value);
    let date;
    if (hours < 24 && hours > 0) {
      date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      return date;
    }
  }
  return null;
};

class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTime: typeof props.selected === "string" ? getNewDateWithTime(props.selected) : props.selected
    };
  }

  setSelectedTime = date => {
    if (isValid(date)) {
      this.setState(
        {
          selectedTime: date
        },
        () => this.handleSelectedDateChange(date)
      );
    }
  };

  setSelectedTimeOnInputChange = debounce(1000, value => this.setSelectedTime(getNewDateWithTime(value)));

  handleInputChange = event => {
    const { value } = event.target;
    const { onInputChange } = this.props;
    this.setSelectedTimeOnInputChange(value);
    if (onInputChange) {
      onInputChange(value);
    }
  };

  handleSelectedDateChange = date => {
    const { onChange, timeFormat } = this.props;
    const time = format(date, timeFormat);
    if (onChange) {
      onChange(time);
    }
    this.setState({
      selectedTime: date
    });
  };

  render() {
    const { timeFormat, inputProps, interval, errorMessage, errorList } = this.props;
    const { selectedTime } = this.state;
    const customInputProps = {
      ...inputProps,
      debounceTime: 1000,
      error: !!(errorMessage || errorList),
      placeholder: inputProps.placeholder || (timeFormat === DEFAULT_TIME_FORMAT ? DEFAULT_PLACEHOLDER : timeFormat)
    };

    return (
      <Field className="nds-time-picker">
        <TimePickerStyles />
        <ReactDatePicker
          selected={selectedTime}
          dateFormat={timeFormat}
          onChange={this.handleSelectedDateChange}
          customInput={<TimePickerInput inputProps={customInputProps} onInputChange={this.handleInputChange} />}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={interval}
          excludeDates={[selectedTime]}
          disabledKeyboardNavigation
          strictParsing
        />
        <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
      </Field>
    );
  }
}

TimePicker.propTypes = {
  selected: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  timeFormat: PropTypes.string,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
  inputProps: PropTypes.shape(InputFieldPropTypes),
  interval: PropTypes.number,
  errorMessage: PropTypes.string,
  errorList: PropTypes.string
};

TimePicker.defaultProps = {
  selected: undefined,
  timeFormat: DEFAULT_TIME_FORMAT,
  onChange: undefined,
  onInputChange: undefined,
  inputProps: InputFieldDefaultProps,
  interval: 15,
  errorMessage: undefined,
  errorList: undefined
};

export default TimePicker;
