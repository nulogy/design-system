import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDatePicker from "react-datepicker";

import { subDays, addDays, isValid, isAfter, isBefore, isSameDay } from "date-fns";
import { DatePickerStyles } from "./DatePickerStyles";
import DatePickerInput from "./DatePickerInput";
import DatePickerHeader from "./DatePickerHeader";
import { InlineValidation } from "../Validation";
import { Field } from "../Form";
import { InputFieldPropTypes, InputFieldDefaultProps } from "../Input/InputField.type";
import { registerDatePickerLocales } from "../utils/datePickerLocales";

const DEFAULT_DATE_FORMAT = "dd MMM yyyy";
const DEFAULT_PLACEHOLDER = "DD Mon YYYY";

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedDate: props.selected };
    this.datepickerRef = React.createRef();
    registerDatePickerLocales();
  }

  setSelectedDate = date => {
    this.setState({
      selectedDate: date
    });
  };

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
    this.setSelectedDate(date);
  };

  handleDownKey = () => {
    const { selectedDate } = this.state;
    const { minDate } = this.props;
    const newSelectedDate = isValid(selectedDate) ? subDays(selectedDate, 1) : new Date();
    if (!minDate || isAfter(newSelectedDate, minDate) || isSameDay(newSelectedDate, minDate)) {
      this.handleSelectedDateChange(newSelectedDate);
    }
  };

  handleUpKey = () => {
    const { selectedDate } = this.state;
    const { maxDate } = this.props;
    const newSelectedDate = isValid(selectedDate) ? addDays(selectedDate, 1) : new Date();
    if (!maxDate || isBefore(newSelectedDate, maxDate) || isSameDay(newSelectedDate, maxDate)) {
      this.handleSelectedDateChange(newSelectedDate);
    }
  };

  handleEnterKey = () => {
    const isOpen = this.datepickerRef.isCalendarOpen();
    this.datepickerRef.setOpen(!isOpen);
  };

  handleSpaceKey = () => {
    this.datepickerRef.setOpen(false);
  };

  renderHeader = props => {
    const { locale } = this.props;
    return <DatePickerHeader locale={locale} {...props} />;
  };

  render() {
    const { dateFormat, errorMessage, errorList, inputProps, minDate, maxDate, highlightDates, locale } = this.props;
    const { selectedDate } = this.state;
    const customInputProps = {
      ...inputProps,
      error: !!(errorMessage || errorList),
      placeholder: inputProps.placeholder || (dateFormat === DEFAULT_DATE_FORMAT ? DEFAULT_PLACEHOLDER : dateFormat)
    };

    const customInput = (
      <DatePickerInput
        inputProps={customInputProps}
        dateFormat={dateFormat}
        onInputChange={this.handleInputChange}
        onUpKeyPress={this.handleUpKey}
        onDownKeyPress={this.handleDownKey}
        onEnterKeyPress={this.handleEnterKey}
        onSpaceKeyPress={this.handleSpaceKey}
      />
    );

    return (
      <Field className="nds-date-picker">
        <DatePickerStyles />
        <ReactDatePicker
          selected={selectedDate}
          openToDate={selectedDate}
          dateFormat={dateFormat}
          onChange={this.handleSelectedDateChange}
          customInput={customInput}
          renderCustomHeader={this.renderHeader}
          disabledKeyboardNavigation
          strictParsing
          minDate={minDate}
          maxDate={maxDate}
          highlightDates={highlightDates}
          locale={locale}
          ref={r => {
            this.datepickerRef = r;
          }}
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
  inputProps: PropTypes.shape(InputFieldPropTypes),
  errorMessage: PropTypes.string,
  errorList: PropTypes.arrayOf(PropTypes.string),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  highlightDates: PropTypes.arrayOf(PropTypes.shape({})),
  locale: PropTypes.string
};

DatePicker.defaultProps = {
  selected: undefined,
  dateFormat: DEFAULT_DATE_FORMAT,
  onChange: undefined,
  onInputChange: undefined,
  inputProps: InputFieldDefaultProps,
  errorMessage: undefined,
  errorList: undefined,
  minDate: undefined,
  maxDate: undefined,
  highlightDates: undefined,
  locale: undefined
};

export default DatePicker;
