import React, { Component } from "react";
import PropTypes from "prop-types";

import ReactDatePicker from "react-datepicker";
import { format } from "date-fns";
import TimePickerInput from "./TimePickerInput";
import { TimePickerStyles } from "./TimePickerStyles";
import "react-datepicker/dist/react-datepicker.css";

const DEFAULT_TIME_FORMAT = "hh:mm aa";
const DEFAULT_PLACEHOLDER = "HH:MM";

class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedTime: props.selected };
  }

  handleInputChange = event => {
    const { value } = event.target;
    const { onInputChange } = this.props;
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
    const { timeFormat, inputProps, interval } = this.props;
    const { selectedTime } = this.state;
    const customInputProps = {
      ...inputProps,
      placeholder: inputProps.placeholder || (timeFormat === DEFAULT_TIME_FORMAT ? DEFAULT_PLACEHOLDER : timeFormat)
    };

    return (
      <div className="nds-time-picker">
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
      </div>
    );
  }
}

TimePicker.propTypes = {
  selected: PropTypes.instanceOf(Date),
  timeFormat: PropTypes.string,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
  inputProps: PropTypes.shape({}),
  interval: PropTypes.number
};

TimePicker.defaultProps = {
  selected: undefined,
  timeFormat: DEFAULT_TIME_FORMAT,
  onChange: undefined,
  onInputChange: undefined,
  inputProps: {},
  interval: 15
};

export default TimePicker;
