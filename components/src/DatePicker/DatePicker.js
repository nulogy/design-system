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

const DatePickerInput = ({ value, onClick }) => (
  <>
    <Input value={value} onClick={onClick} />
    <StyledDateInputIcon icon="calendarToday" size={theme.space.x2} />
  </>
);
class DatePicker extends React.Component {
  state = {
    startDate: new Date()
  };

  handleStartDateChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    const { startDate } = this.state;

    return (
      <ReactDatePicker selected={startDate} onChange={this.handleStartDateChange} customInput={<DatePickerInput />} />
    );
  }
}

DatePicker.propTypes = {};

DatePicker.defaultProps = {};

export default DatePicker;
