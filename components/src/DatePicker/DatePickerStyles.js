import { createGlobalStyle } from "styled-components";
import theme from "../theme";

export const DatePickerStyles = createGlobalStyle({
  ".nds-date-picker": {
    ".react-datepicker__input-container": {
      position: "relative",
      width: "184px"
    },
    ".react-datepicker__header": {
      backgroundColor: theme.colors.white,
      borderBottom: "none",
      borderTopLeftRadius: theme.radii.medium,
      borderTopRightRadius: theme.radii.medium,
      p: {
        fontSize: theme.fontSizes.large,
        paddingRight: theme.space.x1,
        paddingLeft: theme.space.x1
      }
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
      border: "1px solid #216beb",
      boxShadow: "0px 0px 5px 0px rgba(33, 107, 235, 0.9)",
      borderRadius: theme.radii.medium,
      display: "inline-block",
      position: "relative",
      padding: theme.space.x2
    },
    ".react-datepicker__day-name": {
      textTransform: "uppercase",
      fontSize: "10px"
    },
    ".react-datepicker__day": {
      padding: theme.colors.x1,
      fontSize: theme.fontSizes.medium,
      borderRadius: theme.radii.medium,
      "&:hover": {
        backgroundColor: theme.colors.lightBlue,
        color: theme.colors.black
      }
    },
    ".react-datepicker__day--today": {
      fontWeight: theme.fontWeights.bold
    },
    ".react-datepicker__day--outside-month": {
      color: theme.colors.darkGrey,
      fontSize: theme.fontSizes.smaller
    },
    ".react-datepicker__day, .react-datepicker__month-text, .react-datepicker__quarter-text": {
      cursor: "pointer"
    },
    ".react-datepicker__day--disabled:hover,.react-datepicker__month-text--disabled:hover,.react-datepicker__quarter-text--disabled:hover": {
      backgroundColor: "transparent"
    },
    ".react-datepicker__day-names, .react-datepicker__week": {
      whiteSpace: "nowrap"
    },
    ".react-datepicker__day-name, .react-datepicker__day": {
      display: "inline-block",
      width: theme.space.x4,
      lineHeight: theme.space.x4,
      color: theme.colors.darkGrey,
      textAlign: "center",
      margin: "0.166rem"
    },
    ".react-datepicker__day--selected": {
      color: theme.colors.white,
      background: theme.colors.darkBlue
    }
  }
});
