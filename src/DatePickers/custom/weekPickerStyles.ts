import { createGlobalStyle } from "styled-components";

export const WeekPickerStyles = createGlobalStyle(({ theme }) => ({
  ".nds-date-picker": {
    ".react-datepicker__week-number": {
      marginRight: theme.space.x2,
    },
    ".react-datepicker__day, .react-datepicker__week-number": {
      fontSize: theme.fontSizes.base,
      borderRadius: theme.radii.large,
      color: theme.colors.darkGrey,
      border: "2px solid transparent",
      display: "inline-block",
      lineHeight: theme.lineHeights.base,
      textAlign: "center",
      width: `calc(${theme.space.x3} + ${theme.space.half})`,
      margin: theme.space.half,
      boxSizing: "content-box",
      "&--today": {
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.black,
      },
      "&--disabled": {
        color: theme.colors.grey,
        "&:hover": {
          color: theme.colors.grey,
        },
      },
    },
    ".react-datepicker__day--selected, .react-datepicker__week-number--selected": {
      color: theme.colors.white,
      lineHeight: theme.lineHeights.base,
      cursor: "initial",
      "&:hover": {
        color: theme.colors.white,
        background: theme.colors.darkBlue,
      },
    },
  },

  ".nds-date-picker .react-datepicker__week-number": {
    border: "none",
    margin: theme.space.none,
    borderRight: `1px solid ${theme.colors.grey}`,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingLeft: theme.space.x1,
    paddingRight: theme.space.x3,
    paddingTop: theme.space.x1_5,
    paddingBottom: theme.space.x1_5,

    "&--clickable": {
      cursor: "pointer",
    },
  },

  ".nds-date-picker .react-datepicker__day-names .react-datepicker__day-name": {
    paddingTop: theme.space.x1,
    paddingBottom: theme.space.x1_5,

    "&:first-child": {
      width: 61,
      paddingLeft: theme.space.x1,
      paddingRight: theme.space.x3,
      borderRight: `1px solid ${theme.colors.grey}`,
    },

    "&:nth-child(2)": {
      width: 61,
      paddingLeft: theme.space.x3,
      paddingRight: theme.space.x3,
    },
  },

  ".nds-date-picker .react-datepicker__day-names": {
    marginBottom: -1,
  },

  ".nds-date-picker .react-datepicker__day": {
    margin: 0,
    border: "none",
    paddingRight: `calc(${theme.space.half} + 2px)`,
    paddingLeft: `calc(${theme.space.half} + 2px)`,
    paddingTop: theme.space.x1_5,
    paddingBottom: theme.space.x1_5,
    "&:nth-child(2)": {
      marginLeft: theme.space.none,
      paddingLeft: theme.space.x3,
    },
  },

  ".nds-date-picker .react-datepicker__week": {
    borderRadius: theme.radii.large,
    "&:hover": {
      backgroundColor: theme.colors.lightBlue,
    },

    "&--selected, &:has(.react-datepicker__day--selected)": {
      backgroundColor: theme.colors.darkBlue,

      ".react-datepicker__day, .react-datepicker__week-number": {
        color: theme.colors.white,
      },

      "&:hover": {
        background: theme.colors.darkBlue,
        color: theme.colors.white,
      },
    },
  },
}));
