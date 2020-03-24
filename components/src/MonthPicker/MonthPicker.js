import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDatePicker from "react-datepicker";
import eachMonthOfInterval from "date-fns/eachMonthOfInterval";
import { debounce } from "debounce";
import { format, isSameYear, isValid } from "date-fns";

import { MonthPickerStyles } from "./MonthPickerStyles";
import DatePickerInput from "../DatePicker/DatePickerInput";
import { InlineValidation } from "../Validation";
import theme from "../theme";
import { Field } from "../Form";
import { InputFieldPropTypes, InputFieldDefaultProps } from "../Input/InputField.type";
import { Icon } from "../Icon";
import { registerDatePickerLocales, supportedDateLocales } from "../utils/datePickerLocales";

const DEFAULT_DATE_FORMAT = "MMM yyyy";
const DEFAULT_PLACEHOLDER = "Mon YYYY";

class MonthPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: props.selected,
      calendarDate: props.selected ? props.selected : new Date()
    };
    this.debounceAutocomplete = debounce(this.autoCompleteMonth, 400);
    registerDatePickerLocales();
  }

  setSelectedDate = date => {
    this.setState({
      selectedDate: date
    });
  };

  setCalendarDate = date => {
    if (date && isValid(date)) {
      this.setState({
        calendarDate: date
      });
    }
  };

  autoCompleteMonth = (value, currentDate) => {
    if (value.length > 2) {
      const STANDALONE_MONTH_FORMAT = "LLL";
      const { minDate, maxDate, locale } = this.props;
      const currentYear = Number(format(currentDate, "yyyy"));

      const months = eachMonthOfInterval({
        start: isSameYear(currentDate, minDate) ? minDate : new Date(currentYear, 1),
        end: isSameYear(currentDate, maxDate) ? maxDate : new Date(currentYear, 12)
      }).map(date => ({
        label: format(date, STANDALONE_MONTH_FORMAT, { locale: supportedDateLocales[locale] }),
        date
      }));

      const matchingMonth = months.filter(month => month.label.toLowerCase() === value.toLowerCase());

      if (matchingMonth.length) {
        this.handleSelectedDateChange(matchingMonth[0].date);
      }
    }
  };

  handleInputChange = event => {
    const { value } = event.target;
    const { onInputChange, disableAutocomplete } = this.props;
    const { calendarDate } = this.state;
    if (!disableAutocomplete) {
      this.debounceAutocomplete(value, calendarDate);
    }

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
    this.setCalendarDate(date);
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
      <DatePickerInput
        data-testid="month-picker-input"
        inputProps={customInputProps}
        dateFormat={dateFormat}
        onInputChange={this.handleInputChange}
      />
    );

    return (
      <Field className="nds-month-picker" data-testid="month-picker">
        <MonthPickerStyles />
        <ReactDatePicker
          selected={selectedDate}
          openToDate={selectedDate}
          dateFormat={dateFormat}
          onChange={this.handleSelectedDateChange}
          customInput={customInput}
          previousYearButtonLabel={<Icon icon="leftArrow" size={theme.space.x4} />}
          nextYearButtonLabel={<Icon icon="rightArrow" size={theme.space.x4} />}
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
  locale: PropTypes.string,
  disableAutocomplete: PropTypes.bool
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
  locale: undefined,
  disableAutocomplete: false
};

export default MonthPicker;
