import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import theme from "../theme";
import { Input } from "../Input";

const DatePickerInput = ({ value, onClick }) => <Input labelText="Date" value={value} onClick={onClick} />;
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
