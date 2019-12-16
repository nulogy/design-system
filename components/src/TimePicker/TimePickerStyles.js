import { createGlobalStyle } from "styled-components";
import theme from "../theme";

export const TimePickerStyles = createGlobalStyle({
  ".nds-time-picker": {
    ".react-datepicker__header--time": {
      display: "none"
    },
    ".react-datepicker__triangle": {
      display: "none"
    },
    ".react-datepicker-popper[data-placement^='bottom']": {
      marginTop: "0"
    },
    ".react-datepicker": {
      backgroundColor: theme.colors.white,
      outline: "none",
      border: `1px solid ${theme.colors.blue}`,
      boxShadow: theme.shadows.focus,
      borderRadius: theme.radii.medium,
      position: "relative",
      minWidth: "184px"
    },
    ".react-datepicker__time-container": {
      width: "100%",
      ".react-datepicker__time .react-datepicker__time-box": {
        width: "100%",
        margin: "0 0"
      }
    },
    ".react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list .react-datepicker__time-list-item": {
      padding: theme.colors.x2,
      fontSize: theme.fontSizes.medium,
      color: theme.colors.darkGrey,
      height: "auto",
      "&:hover": {
        backgroundColor: theme.colors.lightBlue,
        color: theme.colors.black
      },
      "&--selected": {
        color: theme.colors.white,
        background: theme.colors.darkBlue,
        cursor: "initial",
        "&:hover": {
          color: theme.colors.white,
          background: theme.colors.darkBlue
        }
      }
    }
  }
});
