import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactDatePicker from "react-datepicker";

import { DatePickerStyles } from "./DatePickerStyles";
import DatePickerInput from "./DatePickerInput";
import DatePickerHeader from "./DatePickerHeader";

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

  return (
    <div className="nds-date-picker">
      <DatePickerStyles />
      <ReactDatePicker
        selected={selectedDate}
        dateFormat={dateFormat}
        onChange={handleSelectedDateChange}
        customInput={<DatePickerInput {...inputProps} onInputChange={handleInputChange} />}
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
  selected: new Date(),
  dateFormat: "dd/MM/yyyy",
  onChange: undefined,
  onChangeInput: undefined,
  inputProps: undefined
};

export default DatePicker;
