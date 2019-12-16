import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDatePicker from "react-datepicker";

import { DatePickerStyles } from "./DatePickerStyles";
import DatePickerInput from "./DatePickerInput";
import DatePickerHeader from "./DatePickerHeader";

const DEFAULT_DATE_FORMAT = "dd MMM yyyy";
const DEFAULT_PLACEHOLDER = "DD Mon YYYY";

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedDate: props.selected };
  }

  handleInputChange = event => {
    const { value } = event.target;
    const { onInputChange } = this.props;
    if (onInputChange) {
      onInputChange(value);
    }
  };

  handleSelectedDateChange = date => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(date);
    }
    this.setState({
      selectedDate: date
    });
  };

  render() {
    const { dateFormat, inputProps } = this.props;
    const { selectedDate } = this.state;
    const customInputProps = {
      ...inputProps,
      placeholder: inputProps.placeholder || (dateFormat === DEFAULT_DATE_FORMAT ? DEFAULT_PLACEHOLDER : dateFormat)
    };

    const customInput = (
      <DatePickerInput inputProps={customInputProps} dateFormat={dateFormat} onInputChange={this.handleInputChange} />
    );

    return (
      <div className="nds-date-picker">
        <DatePickerStyles />
        <ReactDatePicker
          selected={selectedDate}
          dateFormat={dateFormat}
          onChange={this.handleSelectedDateChange}
          customInput={customInput}
          renderCustomHeader={DatePickerHeader}
          disabledKeyboardNavigation
          strictParsing
        />
      </div>
    );
  }
}

DatePicker.propTypes = {
  selected: PropTypes.instanceOf(Date),
  dateFormat: PropTypes.string,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
  inputProps: PropTypes.shape({})
};

DatePicker.defaultProps = {
  selected: undefined,
  dateFormat: DEFAULT_DATE_FORMAT,
  onChange: undefined,
  onInputChange: undefined,
  inputProps: {}
};

export default DatePicker;
