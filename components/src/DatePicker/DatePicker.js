import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDatePicker from "react-datepicker";

import { DatePickerStyles } from "./DatePickerStyles";
import DatePickerInput from "./DatePickerInput";
import DatePickerHeader from "./DatePickerHeader";
import { InlineValidation } from "../Validation";
import { Field } from "../Form";
import { InputFieldPropTypes, InputFieldDefaultProps } from "../Input/InputField.type";

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
    const { dateFormat, inputProps, errorMessage, errorList, minDate, maxDate } = this.props;
    const { selectedDate } = this.state;
    const customInputProps = {
      ...inputProps,
      error: !!(errorMessage || errorList),
      placeholder: inputProps.placeholder || (dateFormat === DEFAULT_DATE_FORMAT ? DEFAULT_PLACEHOLDER : dateFormat)
    };

    const customInput = (
      <DatePickerInput inputProps={customInputProps} dateFormat={dateFormat} onInputChange={this.handleInputChange} />
    );

    return (
      <Field className="nds-date-picker">
        <DatePickerStyles />
        <ReactDatePicker
          selected={selectedDate}
          dateFormat={dateFormat}
          onChange={this.handleSelectedDateChange}
          customInput={customInput}
          renderCustomHeader={DatePickerHeader}
          excludeDates={[selectedDate]}
          disabledKeyboardNavigation
          strictParsing
          minDate={minDate}
          maxDate={maxDate}
        />
        <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
      </Field>
    );
  }
}

DatePicker.propTypes = {
  selected: PropTypes.instanceOf(Date),
  dateFormat: PropTypes.string,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date)
  inputProps: PropTypes.shape(InputFieldPropTypes),
  errorMessage: PropTypes.string,
  errorList: PropTypes.arrayOf(PropTypes.string)
};

DatePicker.defaultProps = {
  selected: undefined,
  dateFormat: DEFAULT_DATE_FORMAT,
  onChange: undefined,
  onInputChange: undefined,
  minDate: undefined,
  maxDate: undefined
  inputProps: InputFieldDefaultProps,
  errorMessage: undefined,
  errorList: undefined
};

export default DatePicker;
