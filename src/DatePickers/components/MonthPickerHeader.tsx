import React from "react";
import { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import { useTranslation } from "react-i18next";
import { ControlIcon } from "../../Button";
import { Flex } from "../../Flex";
import { localizedFormat } from "../../utils/localized-date-fns";
import { Text } from "../../Type";

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
