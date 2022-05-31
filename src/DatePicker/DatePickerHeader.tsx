import React from "react";
import { Flex } from "../Flex";
import { Text } from "../Type";
import { ControlIcon } from "../Button";
import { localizedFormat } from "../utils/localized-date-fns";

type DatePickerHeaderProps = {
  date: any;
  decreaseMonth: (...args: any[]) => any;
  increaseMonth: (...args: any[]) => any;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
  locale?: string;
};

const DatePickerHeader: React.FC<DatePickerHeaderProps> = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  locale,
}) => {
  return (
    <Flex justifyContent="space-between" alignItems="center" py="half" px="x1">
      <ControlIcon
        icon="leftArrow"
        label="go to previous month"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      />
      <Text
        fontWeight="bold"
        color="blackBlue"
        px="x1"
        ml="half"
        fontSize="large"
        style={{ textTransform: "capitalize" }}
      >
        {localizedFormat(date, "MMMM yyyy", locale)}
      </Text>
      <ControlIcon
        icon="rightArrow"
        label="go to next month"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      />
    </Flex>
  );
};
DatePickerHeader.defaultProps = {
  locale: undefined,
};
export default DatePickerHeader;
