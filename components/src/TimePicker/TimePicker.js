import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDatePicker from "react-datepicker";
import { format } from "date-fns";

import TimePickerInput from "./TimePickerInput";
import { TimePickerStyles } from "./TimePickerStyles";
import { Field } from "../Form";
import { InlineValidation } from "../Validation";
import { InputFieldPropTypes, InputFieldDefaultProps } from "../Input/InputField.type";

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
    const { timeFormat, inputProps, interval, errorMessage, errorList } = this.props;
    const { selectedTime } = this.state;
    const customInputProps = {
      ...inputProps,
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
  selected: PropTypes.instanceOf(Date),
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
