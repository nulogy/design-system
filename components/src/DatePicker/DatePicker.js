import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import theme from "../theme";
import { Input } from "../Input";
import { Icon } from "../Icon";

const StyledDateInputIcon = styled(Icon)({
  position: "absolute",
  right: "8px",
  color: theme.colors.darkGrey,
  top: "50%",
  transform: "translateY(-50%)",
  pointerEvents: "none"
});

const DatePickerInput = ({ value, onClick, onChange, selectedDate }) => (
  <>
    <Input value={formatDate(selectedDate)} onClick={onClick} onChange={onChange} />
    <StyledDateInputIcon icon="calendarToday" size={theme.space.x2} />
  </>
);

const formatDate = date => format(date, "DD/MM/YYYY");

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleSelectedDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={this.handleSelectedDateChange}
      customInput={<DatePickerInput selectedDate={selectedDate} />}
    />
  );
};

DatePicker.propTypes = {};

DatePicker.defaultProps = {};

export default DatePicker;
