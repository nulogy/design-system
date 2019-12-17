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
      width: "100%"
    },
    ".react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box": {
      textAlign: "left",
      width: "100%",
      margin: "0 0",
      borderRadius: theme.radii.medium,
      overflow: "hidden",
      "ul.react-datepicker__time-list": {
        maxHeight: "353px",
        height: "auto",
        listStyle: "none",
        margin: 0,
        overflowY: "scroll",
        overflow: "hidden",
        paddingRight: 0,
        paddingLeft: 0,
        width: "100%",
        boxSizing: "content-box"
      },
      "ul.react-datepicker__time-list .react-datepicker__time-list-item": {
        padding: theme.colors.x2,
        fontSize: theme.fontSizes.medium,
        color: theme.colors.darkGrey,
        fontFamily: theme.fonts.base,
        paddingTop: theme.space.x1,
        paddingBottom: theme.space.x1,
        paddingLeft: theme.space.x2,
        height: "auto",
        "&:hover": {
          backgroundColor: theme.colors.lightBlue,
          color: theme.colors.black
        },
        "&--selected": {
          color: theme.colors.white,
          background: theme.colors.darkBlue,
          fontWeight: "normal",
          cursor: "initial",
          "&:hover": {
            color: theme.colors.white,
            background: theme.colors.darkBlue
          }
        }
      }
    }
  }
});
