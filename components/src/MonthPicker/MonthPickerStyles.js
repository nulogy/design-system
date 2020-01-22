import { createGlobalStyle } from "styled-components";
import theme from "../theme";

export const MonthPickerStyles = createGlobalStyle({
  ".nds-month-picker": {
    ".react-datepicker__input-container": {
      width: "184px",
      input: {
        position: "relative"
      }
    },
    ".react-datepicker__header": {
      backgroundColor: theme.colors.white,
      borderBottom: "none",
      position: "absolute",
      top: theme.space.x2,
      fontWeight: theme.fontWeights.bold,
      color: theme.colors.blackBlue,
      fontSize: theme.fontSizes.large,
      left: "50%",
      transform: "translateX(-50%)",
      borderTopLeftRadius: theme.radii.medium,
      borderTopRightRadius: theme.radii.medium
    },
    ".react-datepicker__navigation": {
      background: "transparent",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      padding: 0,
      borderRadius: theme.radii.circle,
      color: theme.colors.darkGrey,
      "&:focus": {
        outline: "none",
        boxShadow: theme.shadows.focus
      },
      "&:hover:enabled": {
        cursor: "pointer",
        color: theme.colors.blackBlue,
        backgroundColor: theme.colors.lightGrey
      },
      "&--next": {
        position: "absolute",
        right: theme.space.x1
      },
      "&--previous": {
        position: "absolute",
        left: theme.space.x1
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
      border: `1px solid ${theme.colors.blue}`,
      boxShadow: theme.shadows.focus,
      borderRadius: theme.radii.medium,
      display: "inline-block",
      position: "relative",
      padding: theme.space.x1,
      paddingTop: theme.space.x2,
      width: "184px"
    },
    ".react-datepicker__month-wrapper": {
      display: "flex",
      justifyContent: "center"
    },
    ".react-datepicker__month": {
      marginTop: theme.space.x6,
      "&-text": {
        padding: theme.colors.x2,
        fontSize: theme.fontSizes.medium,
        borderRadius: theme.radii.medium,
        color: theme.colors.darkGrey,
        display: "inline-block",
        width: theme.space.x5,
        lineHeight: theme.space.x5,
        textAlign: "center",
        margin: `${theme.space.half} ${theme.space.x1}`,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: theme.colors.lightBlue,
          color: theme.colors.black
        }
      },
      "&--disabled": {
        color: theme.colors.grey,
        cursor: "auto",
        "&:hover": {
          color: theme.colors.grey,
          backgroundColor: "transparent"
        }
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
