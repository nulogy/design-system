import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import * as allLocales from "date-fns/locale";

import theme from "../theme";

import { Flex } from "../Flex";
import { Text } from "../Type";
import { ControlIcon } from "../Button";

const DatePickerHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  locale
}) => (
  <Flex justifyContent="space-between" alignItems="center" py="half" px="x1">
    <ControlIcon
      icon="leftArrow"
      label="go to previous month"
      onClick={decreaseMonth}
      disabled={prevMonthButtonDisabled}
    />
    <Text fontWeight="bold" color={theme.colors.blackBlue} px="x1" ml="half" fontSize="large">
      {format(date, "MMMM yyyy", { locale: allLocales[locale] })}
    </Text>
    <ControlIcon
      icon="rightArrow"
      label="go to next month"
      onClick={increaseMonth}
      disabled={nextMonthButtonDisabled}
    />
  </Flex>
);

DatePickerHeader.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  decreaseMonth: PropTypes.func.isRequired,
  increaseMonth: PropTypes.func.isRequired,
  prevMonthButtonDisabled: PropTypes.bool.isRequired,
  nextMonthButtonDisabled: PropTypes.bool.isRequired,
  locale: PropTypes.string
};

DatePickerHeader.defaultProps = {
  locale: undefined
};

export default DatePickerHeader;
