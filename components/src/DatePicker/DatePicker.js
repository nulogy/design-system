import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./datepicker.css";
import DatePickerInput from "./DatePickerInput";
import DatePickerHeader from "./DatePickerHeader";

const DatePicker = ({ selected, onChange, dateFormat, onChangeInput }) => {
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
    <div className="nds-datepicker">
      <ReactDatePicker
        selected={selectedDate}
        dateFormat={dateFormat}
        onChange={handleSelectedDateChange}
        customInput={<DatePickerInput onInputChange={handleInputChange} />}
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
  onChangeInput: PropTypes.func
};

DatePicker.defaultProps = {
  selected: new Date(),
  dateFormat: "dd/MM/yyyy",
  onChange: undefined,
  onChangeInput: undefined
};

export default DatePicker;
