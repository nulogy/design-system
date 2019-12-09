import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
import { format } from "date-fns";
import theme from "../theme";
import { Text, Flex, Input, Icon, ControlIcon } from "..";

const DATEPICKER_CSS_CLASS = "nds-datepicker";

const StyledDateInputIcon = styled(Icon)({
  position: "absolute",
  right: "8px",
  color: theme.colors.darkGrey,
  top: "50%",
  transform: "translateY(-50%)",
  pointerEvents: "none"
});

const DatePickerHeader = ({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
  <Flex justifyContent="space-between">
    <Text fontWeight="bold" color={theme.colors.blackBlue} pl={theme.space.x2} pr={theme.space.x3}>
      {format(date, "MMMM yyyy")}
    </Text>
    <Flex>
      <ControlIcon icon="leftArrow" onClick={decreaseMonth} disabled={prevMonthButtonDisabled} />
      <ControlIcon icon="rightArrow" onClick={increaseMonth} disabled={nextMonthButtonDisabled} />
    </Flex>
  </Flex>
);

DatePickerHeader.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  decreaseMonth: PropTypes.func.isRequired,
  increaseMonth: PropTypes.func.isRequired,
  prevMonthButtonDisabled: PropTypes.bool.isRequired,
  nextMonthButtonDisabled: PropTypes.bool.isRequired
};

const DatePickerInput = ({ onClick, onChange, onInputChange, value }) => {
  const handleChange = e => {
    onInputChange(e);
    onChange(e);
  };

  return (
    <>
      <Input value={value} onClick={onClick} onChange={handleChange} label="a label" />
      <StyledDateInputIcon icon="calendarToday" size={theme.space.x2} />
    </>
  );
};

DatePickerInput.propTypes = {
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.PropTypes.instanceOf(Date).isRequired,
  onInputChange: PropTypes.func.isRequired
};

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
    <div className={DATEPICKER_CSS_CLASS}>
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
