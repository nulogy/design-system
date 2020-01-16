import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDatePicker from "react-datepicker";

import { MonthPickerStyles } from "./MonthPickerStyles";
import DatePickerInput from "../DatePicker/DatePickerInput";
import { InlineValidation } from "../Validation";

import { Field } from "../Form";
import { InputFieldPropTypes, InputFieldDefaultProps } from "../Input/InputField.type";
import { ControlIcon } from "../Button";
import { registerDatePickerLocales } from "../utils/datePickerLocales";

const DEFAULT_DATE_FORMAT = "MMM yyyy";
const DEFAULT_PLACEHOLDER = "Mon YYYY";

class MonthPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedDate: props.selected };
    registerDatePickerLocales();
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
    const { dateFormat, errorMessage, errorList, inputProps, minDate, maxDate, locale } = this.props;
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
      <Field className="nds-month-picker">
        <MonthPickerStyles />
        <ReactDatePicker
          selected={selectedDate}
          dateFormat={dateFormat}
          onChange={this.handleSelectedDateChange}
          customInput={customInput}
          previousYearButtonLabel={<ControlIcon icon="leftArrow" label="go to previous year" />}
          nextYearButtonLabel={<ControlIcon icon="rightArrow" label="go to next year" />}
          excludeDates={[selectedDate]}
          disabledKeyboardNavigation
          minDate={minDate}
          maxDate={maxDate}
          strictParsing
          showMonthYearPicker
          locale={locale}
        />
        <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
      </Field>
    );
  }
}

MonthPicker.propTypes = {
  selected: PropTypes.instanceOf(Date),
  dateFormat: PropTypes.string,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
  inputProps: PropTypes.shape(InputFieldPropTypes),
  errorMessage: PropTypes.string,
  errorList: PropTypes.arrayOf(PropTypes.string),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  locale: PropTypes.string
};

MonthPicker.defaultProps = {
  selected: undefined,
  dateFormat: DEFAULT_DATE_FORMAT,
  onChange: undefined,
  onInputChange: undefined,
  inputProps: InputFieldDefaultProps,
  errorMessage: undefined,
  errorList: undefined,
  minDate: undefined,
  maxDate: undefined,
  locale: undefined
};

export default MonthPicker;
