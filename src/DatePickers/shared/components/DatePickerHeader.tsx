import React from "react";
import { useTranslation } from "react-i18next";
import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { Flex } from "../../../Flex";
import { Text } from "../../../Type";
import { ControlIcon } from "../../../Button";
import { localizedFormat } from "../../../utils/localized-date-fns";

type Props = {
  date: Date;
  decreaseMonth: React.MouseEventHandler<HTMLButtonElement>;
  increaseMonth: React.MouseEventHandler<HTMLButtonElement>;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
  locale?: string;
};

export function DatePickerHeader({
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

export function MonthDatePickerHeader({
  date,
  increaseYear,
  decreaseYear,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  locale,
}: ReactDatePickerCustomHeaderProps & { locale?: string }) {
  const { t } = useTranslation();

  return (
    <Flex justifyContent="space-between" alignItems="center" pb="x1_5">
      <ControlIcon
        icon="leftArrow"
        label={t("go to previous year")}
        onClick={decreaseYear}
        disabled={prevMonthButtonDisabled}
      />
      <Text fontWeight="bold" color="blackBlue" px="x8" fontSize="large" style={{ textTransform: "capitalize" }}>
        {localizedFormat(date, "yyyy", locale)}
      </Text>
      <ControlIcon
        icon="rightArrow"
        label={t("go to next year")}
        onClick={increaseYear}
        disabled={nextMonthButtonDisabled}
      />
    </Flex>
  );
}
