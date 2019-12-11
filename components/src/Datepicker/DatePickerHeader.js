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
  <Flex justifyContent="space-between">
    <Text fontWeight="bold" color={theme.colors.blackBlue} px="x1" pb="x1" fontSize="large">
      {format(date, "MMMM yyyy")}
    </Text>
    <Flex>
      <StyledNavigationButton
        icon="leftArrow"
        label="go to previous month"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      />
      <StyledNavigationButton
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
