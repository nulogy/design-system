import React from "react";
import { Flex } from "../Flex";
import { Text } from "../Type";
import { ControlIcon } from "../Button";
import { localizedFormat } from "../utils/localized-date-fns";

type Props = {
  date: number;
  decreaseMonth: React.MouseEventHandler<HTMLButtonElement>;
  increaseMonth: React.MouseEventHandler<HTMLButtonElement>;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
  locale?: string;
};

export default function DatePickerHeader({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  locale,
}: Props) {
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
}
