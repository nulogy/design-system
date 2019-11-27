import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { eachDayOfInterval } from "date-fns/esm";
import { isBefore } from "date-fns";
import theme from "../theme";

const getHighlightedDates = (startDate, endDate) => {
  if (!startDate && endDate) {
    return [endDate];
  }
  if (startDate && !endDate) {
    return [startDate];
  }
  if (startDate && endDate) {
    return eachDayOfInterval({ start: startDate, end: endDate });
  }
  return [];
};

const filterDatesBefore = dateToCompare => date => {
  return isBefore(dateToCompare, date);
};

class DatePicker extends React.Component {
  state = {
    startDate: new Date("November 20, 2019 03:24:00"),
    endDate: null
  };

  handleStartDateChange = date => {
    console.log("on change fired");
    this.setState({
      startDate: date
    });
  };

  handleEndDateChange = date => {
    this.setState({
      endDate: date
    });
  };

  handleRawChange = e => {
    const value = event.target.value;
    console.log(value);
    if (value === "TODAY") {
      this.setState({
        startDate: new Date("November 17, 2019 03:24:00")
      });
    }
  };

  render() {
    const { startDate, endDate } = this.state;
    return (
      <>
        <ReactDatePicker
          selected={startDate}
          highlightDates={getHighlightedDates(startDate, endDate)}
          onChange={this.handleStartDateChange}
          onChangeRaw={this.handleRawChange}
          monthsShown={2}
        />
        <ReactDatePicker
          selected={endDate}
          filterDate={filterDatesBefore(startDate)}
          monthsShown={2}
          highlightDates={getHighlightedDates(startDate, endDate)}
          onChange={this.handleEndDateChange}
        />
      </>
    );
  }
}

DatePicker.propTypes = {};

DatePicker.defaultProps = {};

export default DatePicker;
