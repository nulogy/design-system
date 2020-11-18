// @ts-nocheck
import React, { Component } from "react";
import ReactDatePicker from "react-datepicker";
import eachMonthOfInterval from "date-fns/eachMonthOfInterval";
import { debounce } from "debounce";
import { format, isSameYear, isValid } from "date-fns";
import { MonthPickerStyles } from "./MonthPickerStyles";
import DatePickerInput from "../DatePicker/DatePickerInput";
import { InlineValidation } from "../Validation";
import NDStheme from "../theme";
import { Field } from "../Form";
import { InputFieldDefaultProps } from "../Input/InputField.type";
import { Icon } from "../Icon";
import { registerDatePickerLocales } from "../utils/datePickerLocales";
import { LocaleContext } from "../NDSProvider/LocaleContext";
import { localizedFormat } from "../utils/localized-date-fns";

const DEFAULT_DATE_FORMAT = "MMM yyyy";
const DEFAULT_PLACEHOLDER = "Mon YYYY";
type MonthPickerProps = {
  selected?: any;
  dateFormat?: string;
  onChange?: (...args: any[]) => any;
  onInputChange?: (...args: any[]) => any;
  inputProps?: any;
  errorMessage?: string;
  errorList?: string[];
  minDate?: any;
  maxDate?: any;
  disableAutocomplete?: boolean;
  "aria-label"?: string;
  locale: any;
};
type MonthPickerState = {
  selectedDate: any;
  calendarDate: any;
};
class MonthPicker extends Component<MonthPickerProps, MonthPickerState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: props.selected,
      calendarDate: props.selected ? props.selected : new Date(),
    };
    this.debounceAutocomplete = debounce(this.autoCompleteMonth, 400);
    registerDatePickerLocales();
  }
  setSelectedDate = (date) => {
    this.setState({
      selectedDate: date,
    });
  };
  setCalendarDate = (date) => {
    if (date && isValid(date)) {
      this.setState({
        calendarDate: date,
      });
    }
  };
  autoCompleteMonth = (value, currentDate, locale) => {
    if (value.length > 2) {
      const STANDALONE_MONTH_FORMAT = "LLL";
      const { minDate, maxDate } = this.props;
      const currentYear = Number(format(currentDate, "yyyy"));
      const months = eachMonthOfInterval({
        start: isSameYear(currentDate, minDate)
          ? minDate
          : new Date(currentYear, 1),
        end: isSameYear(currentDate, maxDate)
          ? maxDate
          : new Date(currentYear, 12),
      }).map((date) => ({
        label: localizedFormat(date, STANDALONE_MONTH_FORMAT, locale),
        date,
      }));
      const matchingMonth = months.filter(
        (month) => month.label.toLowerCase() === value.toLowerCase()
      );
      if (matchingMonth.length) {
        this.handleSelectedDateChange(matchingMonth[0].date);
      }
    }
  };
  handleInputChange = (event, locale) => {
    const { value } = event.target;
    const { onInputChange, disableAutocomplete } = this.props;
    const { calendarDate } = this.state;
    if (!disableAutocomplete) {
      this.debounceAutocomplete(value, calendarDate, locale);
    }
    if (onInputChange) {
      onInputChange(value);
    }
  };
  handleSelectedDateChange = (date) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(date);
    }
    this.setSelectedDate(date);
    this.setCalendarDate(date);
  };
  render() {
    const {
      dateFormat,
      errorMessage,
      errorList,
      inputProps,
      minDate,
      maxDate,
      "aria-label": ariaLabel,
    } = this.props;
    const { selectedDate } = this.state;
    const customInputProps = {
      ...inputProps,
      error: !!(errorMessage || errorList),
      placeholder:
        inputProps.placeholder ||
        (dateFormat === DEFAULT_DATE_FORMAT ? DEFAULT_PLACEHOLDER : dateFormat),
    };
    return (
      <Field className="nds-month-picker" data-testid="month-picker">
        <MonthPickerStyles />
        <LocaleContext.Consumer>
          {({ locale }) => {
            return (
              <ReactDatePicker
                selected={selectedDate}
                openToDate={selectedDate}
                dateFormat={dateFormat}
                onChange={this.handleSelectedDateChange}
                // prettier-ignore
                customInput={(<DatePickerInput aria-label={ariaLabel} inputProps={customInputProps} dateFormat={dateFormat} onInputChange={e => this.handleInputChange(e, locale)} />)}
                previousYearButtonLabel={
                  <Icon icon="leftArrow" size={NDStheme.space.x4} />
                }
                nextYearButtonLabel={
                  <Icon icon="rightArrow" size={NDStheme.space.x4} />
                }
                excludeDates={[selectedDate]}
                disabledKeyboardNavigation
                minDate={minDate}
                maxDate={maxDate}
                locale={locale}
                strictParsing
                showMonthYearPicker
              />
            );
          }}
        </LocaleContext.Consumer>
        <InlineValidation
          mt="x1"
          errorMessage={errorMessage}
          errorList={errorList}
        />
      </Field>
    );
  }
}
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
  disableAutocomplete: false,
  "aria-label": undefined,
};
export default MonthPicker;
