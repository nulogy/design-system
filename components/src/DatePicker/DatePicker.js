import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactDatePicker from "react-datepicker";

import { DatePickerStyles } from "./DatePickerStyles";
import DatePickerInput from "./DatePickerInput";
import DatePickerHeader from "./DatePickerHeader";

const DEFAULT_DATE_FORMAT = "dd MMM yyyy";
const DEFAULT_PLACEHOLDER = "DD Mon YYYY";

const DatePicker = ({ selected, onChange, dateFormat, onChangeInput, inputProps }) => {
  const [selectedDate, setSelectedDate] = useState(selected);

  const handleSelectedDateChange = date => {
    if (onChange) {
      onChange(date);
    }
    setSelectedDate(date);
  };
  const handleInputChange = event => {
    const { value } = event.target;
    if (onChangeInput) {
      onChangeInput(value);
    }
  };

  const customInputProps = {
    ...inputProps,
    placeholder: inputProps.placeholder || (dateFormat === DEFAULT_DATE_FORMAT ? DEFAULT_PLACEHOLDER : dateFormat)
  };

  return (
    <div className="nds-date-picker">
      <DatePickerStyles />
      <ReactDatePicker
        selected={selectedDate}
        dateFormat={dateFormat}
        onChange={handleSelectedDateChange}
        customInput={
          <DatePickerInput inputProps={customInputProps} dateFormat={dateFormat} onInputChange={handleInputChange} />
        }
        renderCustomHeader={DatePickerHeader}
        disabledKeyboardNavigation
        strictParsing
      />
    </div>
  );
};

DatePicker.propTypes = {
  selected: PropTypes.instanceOf(Date),
  dateFormat: PropTypes.string,
  onChange: PropTypes.func,
  onChangeInput: PropTypes.func,
  inputProps: PropTypes.shape({})
};

DatePicker.defaultProps = {
  selected: undefined,
  dateFormat: DEFAULT_DATE_FORMAT,
  onChange: undefined,
  onChangeInput: undefined,
  inputProps: {}
};

export default DatePicker;
