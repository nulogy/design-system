import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import styled from "styled-components";

import theme from "../theme";
import { Text, Flex, ControlIcon } from "..";

const StyledNavigationButton = styled(ControlIcon)({
  marginLeft: theme.space.x2
});

const DatePickerHeader = ({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
  <Flex justifyContent="space-between" alignItems="center" py="half">
    <Text fontWeight="bold" color={theme.colors.blackBlue} px="x1" ml="half" fontSize="large">
      {format(date, "MMMM yyyy")}
    </Text>
    <Flex pr="x2">
      <StyledNavigationButton
        icon="leftArrow"
        // size={theme.space.x5}
        label="go to previous month"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      />
      <StyledNavigationButton
        icon="rightArrow"
        // size={theme.space.x5}
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
