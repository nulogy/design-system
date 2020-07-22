import { createGlobalStyle } from "styled-components";

export const DatePickerStyles = createGlobalStyle(({ theme }) => ({
  ".nds-date-picker": {
    ".react-datepicker__input-container": {
      width: "184px",
      input: {
        position: "relative"
      }
    },
    ".react-datepicker__header": {
      backgroundColor: theme.colors.white,
      borderBottom: "none",
      borderTopLeftRadius: theme.radii.medium,
      borderTopRightRadius: theme.radii.medium
    },
    ".react-datepicker__triangle": {
      display: "none"
    },
    ".react-datepicker-popper": {
      zIndex: 1
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
      display: "inline-block",
      position: "relative",
      padding: theme.space.x1,
      paddingTop: theme.space.x2
    },
    ".react-datepicker__day-names": {
      paddingTop: theme.space.x2,
      ".react-datepicker__day-name": {
        textTransform: "uppercase",
        fontSize: theme.fontSizes.smaller,
        display: "inline-block",
        width: theme.space.x5,
        color: theme.colors.darkGrey,
        textAlign: "center"
      }
    },
    ".react-datepicker__day": {
      padding: theme.colors.x2,
      fontSize: theme.fontSizes.medium,
      borderRadius: theme.radii.medium,
      color: theme.colors.darkGrey,
      border: "2px solid transparent",
      display: "inline-block",
      lineHeight: theme.space.x4,
      textAlign: "center",
      width: "28px",
      margin: theme.space.half,
      boxSizing: "content-box",
      "&:hover": {
        backgroundColor: theme.colors.lightBlue,
        color: theme.colors.black
      },
      "&--today": {
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.black
      },
      "&--outside-month": {
        color: theme.colors.darkGrey,
        fontSize: theme.fontSizes.smaller
      },
      "&--disabled": {
        color: theme.colors.grey,
        "&:hover": {
          color: theme.colors.grey
        }
      }
    },
    ".react-datepicker__day, .react-datepicker__month-text, .react-datepicker__quarter-text": {
      "&[aria-disabled='false']": {
        cursor: "pointer"
      }
    },
    ".react-datepicker__day--disabled:hover,.react-datepicker__month-text--disabled:hover,.react-datepicker__quarter-text--disabled:hover": {
      backgroundColor: "transparent"
    },
    ".react-datepicker__day-names, .react-datepicker__week": {
      whiteSpace: "nowrap"
    },
    ".react-datepicker__day--selected": {
      color: theme.colors.white,
      background: theme.colors.darkBlue,
      border: `2px solid ${theme.colors.darkBlue}`,
      lineHeight: theme.space.x4,
      cursor: "initial",
      "&:hover": {
        color: theme.colors.white,
        background: theme.colors.darkBlue
      }
    }
  }
}));
