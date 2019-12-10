import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import theme from "../theme";
import { Text, Flex, ControlIcon } from "..";

const DatePickerHeader = ({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
  <Flex justifyContent="space-between">
    <Text fontWeight="bold" color={theme.colors.blackBlue} pl={theme.space.x2} pr={theme.space.x3}>
      {format(date, "MMMM yyyy")}
    </Text>
    <Flex>
      <ControlIcon
        icon="leftArrow"
        label="go to previous month"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      />
      <ControlIcon
        icon="rightArrow"
        label="go to next month"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      />
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

export default DatePickerHeader;
