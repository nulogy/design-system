import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import theme from "../theme";

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
    return <ReactDatePicker selected={startDate} onChange={this.handleStartDateChange} />;
  }
}

DatePicker.propTypes = {};

DatePicker.defaultProps = {};

export default DatePicker;
