import { createGlobalStyle } from "styled-components";
import { isBefore, addDays, differenceInDays } from "date-fns";

const START_DATE_CLASS = "nds-datepicker-day--start-date";
const END_DATE_CLASS = "nds-datepicker-day--end-date";
const IN_RANGE_CLASS = "nds-datepicker-day--in-range";
const TWO_DAY_RANGE_CLASS = "nds-datepicker-two-day-range";

const getAllDaysInRange = (startDate, endDate) => {
  if (endDate && startDate && isBefore(startDate, endDate)) {
    const days = Array(differenceInDays(new Date(endDate), new Date(startDate)) + 1);
    return days.fill(0).map((_, i) => addDays(new Date(startDate), i));
  }
  return [];
};

export const highlightDates = (startDate, endDate) => {
  const datesInRange = getAllDaysInRange(startDate, endDate);
  return [
    {
      [START_DATE_CLASS]: [new Date(startDate)],
    },
    {
      [END_DATE_CLASS]: [new Date(endDate)],
    },
    {
      [IN_RANGE_CLASS]: datesInRange,
    },
    {
      [TWO_DAY_RANGE_CLASS]: datesInRange.length === 2 ? datesInRange : [],
    },
  ];
};

export const DateRangeStyles = createGlobalStyle(({ theme }) => ({
  ".nds-date-picker": {
    [`.react-datepicker__day.${IN_RANGE_CLASS}`]: {
      backgroundColor: theme.colors.whiteGrey,
      color: theme.colors.black,
      borderRadius: 0,
      marginRight: 0,
      marginLeft: 0,
      paddingRight: theme.space.half,
      paddingLeft: theme.space.half,
    },
    [`.react-datepicker__day.${START_DATE_CLASS}.${TWO_DAY_RANGE_CLASS}`]: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    [`.react-datepicker__day.${END_DATE_CLASS}.${TWO_DAY_RANGE_CLASS}`]: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    [`.react-datepicker__day.${START_DATE_CLASS},  .react-datepicker__day.${END_DATE_CLASS}`]: {
      color: theme.colors.white,
      background: theme.colors.darkBlue,
      borderRadius: theme.radii.medium,
      cursor: "initial",
      "&:hover": {
        color: theme.colors.white,
        background: theme.colors.darkBlue,
      },
    },
  },
}));
