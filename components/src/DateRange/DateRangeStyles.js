import { createGlobalStyle } from "styled-components";
import theme from "../theme";

export const DateRangeStyles = createGlobalStyle({
  ".nds-date-picker": {
    ".react-datepicker__day.nds-datepicker-day--in-range": {
      backgroundColor: theme.colors.whiteGrey,
      color: theme.colors.black,
      borderRadius: 0
    },
    ".react-datepicker__day.nds-datepicker-day--start-date,  .react-datepicker__day.nds-datepicker-day--end-date": {
      color: theme.colors.white,
      background: theme.colors.darkBlue,
      borderRadius: theme.radii.medium,
      cursor: "initial",
      "&:hover": {
        color: theme.colors.white,
        background: theme.colors.darkBlue
      }
    }
  }
});
