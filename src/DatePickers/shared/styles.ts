import { type CSSObject, createGlobalStyle } from "styled-components";
import type { DefaultNDSThemeType } from "../../theme";

// Mirrors the locale → font resolution in NDSProvider/GlobalStyles.
const resolveFontFamily = (theme: DefaultNDSThemeType, locale?: string) => {
  const localeFontMap: Record<string, string> = {
    zh_CN: theme.fonts.sc,
    ja_JP: theme.fonts.jp,
  };
  return (locale && localeFontMap[locale]) || theme.fonts.base;
};

// WeekPicker-only overrides, scoped to the same `#nds-date-picker-portal` node as
// the base calendar rules below. These are returned as flat top-level keys (rather
// than nested under a `#nds-date-picker-portal` object) so they merge with — instead
// of colliding with — the base rules: JS objects can't hold two `#nds-date-picker-portal`
// keys, and react-datepicker adds no week-picker-specific container class to nest under.
// Equal specificity to the base rules, but emitted afterwards, so these win on ties.
//
// These live in DatePickerStyles rather than a separate `createGlobalStyle` on purpose:
// two `createGlobalStyle`s built from an object/function with empty static template
// parts share a styledComponentId, so styled-components v6 dedupes them and only one
// ever injects. Folding the week rules in here guarantees WeekPicker renders a single
// global style that carries both the base layout and the week overrides.
const weekPickerRules = (theme: DefaultNDSThemeType): CSSObject => {
  // ONE column model, shared by the header row and the day grid so that header cell N
  // and body cell N have identical left/right edges and every weekday label centers
  // over its column of numbers. The geometry (content width + horizontal padding, all
  // content-box) is defined once here and reused by both rows to keep them in lockstep.
  // Column widths are token-derived (not variant-specific magic numbers) because the
  // day cells themselves are the same size in every component variant.
  const columnWidth = `calc(${theme.space.x3} + ${theme.space.half})`; // day-cell content width
  const columnPadX = `calc(${theme.space.half} + 2px)`; // default horizontal padding per cell
  const mondayPadLeft = theme.space.x3; // Monday is nudged right to clear the week-number rail
  const railPadLeft = theme.space.x1; // week-number rail (column 0) left padding
  const railPadRight = theme.space.x3; // week-number rail right padding, before the divider

  return {
    // Cell shape shared by the day cells and the week-number rail.
    "#nds-date-picker-portal .react-datepicker__day, #nds-date-picker-portal .react-datepicker__week-number": {
      fontSize: theme.fontSizes.base,
      borderRadius: theme.radii.large,
      color: theme.colors.darkGrey,
      display: "inline-block",
      boxSizing: "content-box",
      lineHeight: theme.lineHeights.base,
      textAlign: "center",
      width: columnWidth,
      margin: 0,
      border: "none",
      paddingLeft: columnPadX,
      paddingRight: columnPadX,
      paddingTop: theme.space.x1_5,
      paddingBottom: theme.space.x1_5,
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
    "#nds-date-picker-portal .react-datepicker__day--selected, #nds-date-picker-portal .react-datepicker__week-number--selected":
      {
        color: theme.colors.white,
        cursor: "initial",
        "&:hover": {
          color: theme.colors.white,
          background: theme.colors.darkBlue,
        },
      },
    // Header cells adopt the same column model as the day grid. Scoped under
    // `.react-datepicker__day-names` to out-specify the base `.react-datepicker__day-name`
    // width rule below.
    "#nds-date-picker-portal .react-datepicker__day-names .react-datepicker__day-name": {
      boxSizing: "content-box",
      width: columnWidth,
      margin: 0,
      paddingLeft: columnPadX,
      paddingRight: columnPadX,
      paddingTop: theme.space.x1,
      paddingBottom: theme.space.x1_5,
    },
    "#nds-date-picker-portal .react-datepicker__day-names": {
      marginBottom: -1,
    },
    // Column 0 — the week-number rail: the header "W" cell and the body week-number
    // cell share width + padding + divider border so the column lines up. (`:first-child`
    // and the plain `.react-datepicker__week-number` also out-specify the shared rules.)
    "#nds-date-picker-portal .react-datepicker__day-names .react-datepicker__day-name:first-child, #nds-date-picker-portal .react-datepicker__week-number":
      {
        width: columnWidth,
        paddingLeft: railPadLeft,
        paddingRight: railPadRight,
        borderRight: `1px solid ${theme.colors.grey}`,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
    // The rail reads as greyed-out until its week is clickable.
    "#nds-date-picker-portal .react-datepicker__week-number": {
      color: theme.colors.grey,
      "&--clickable:not(:has(~ .react-datepicker__day--disabled))": {
        color: theme.colors.darkGrey,
        cursor: "pointer",
      },
    },
    // Column 1 — Monday: the header cell and the body cell share the same left offset,
    // so the extra padding lands identically in both rows.
    "#nds-date-picker-portal .react-datepicker__day-names .react-datepicker__day-name:nth-child(2), #nds-date-picker-portal .react-datepicker__day:nth-child(2)":
      {
        paddingLeft: mondayPadLeft,
      },
    // The whole week row is the interactive/selectable unit, not the individual day.
    "#nds-date-picker-portal .react-datepicker__week": {
      borderRadius: theme.radii.large,
      "&:not(:has(.react-datepicker__day--disabled)):hover": {
        backgroundColor: theme.colors.lightBlue,
      },
      "&--selected .react-datepicker__day": {
        "&:hover": {
          backgroundColor: theme.colors.darkBlue,
          color: theme.colors.white,
        },
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
  };
};

export const DatePickerStyles = createGlobalStyle<{
  locale?: string;
  // When set, the calendar is a WeekPicker and gets the week-specific overrides above.
  weekPicker?: boolean;
}>(({ theme, locale, weekPicker }) => ({
  // react-datepicker v9 renders each day name as a visible short label plus a
  // `.react-datepicker__sr-only` span holding the full weekday name for screen
  // readers. Its own stylesheet hides that span; since NDS ships bespoke styles
  // (and doesn't import react-datepicker's CSS) we must hide it ourselves,
  // otherwise the full day names render visibly and overlap the header row.
  ".react-datepicker__sr-only": {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: "0",
  },
  ".nds-date-picker": {
    ".react-datepicker-wrapper": {
      width: "fit-content",
    },
    ".react-datepicker__input-container": {
      input: {
        position: "relative",
      },
    },
  },
  // The calendar renders in a portal (`portalId` in BasePicker), so its styles are
  // scoped to that portal node.
  "#nds-date-picker-portal": {
    // A Radix modal sets `pointer-events: none` on everything outside its dialog. The
    // calendar is portaled to the body, outside the dialog, so re-enable interaction
    // here — otherwise day clicks pass through to the overlay and close the modal.
    pointerEvents: "auto",
    // The calendar is portaled to document.body, outside NDSProvider's GlobalStyles
    // font wrapper, so it can't inherit the NDS font — it must declare it explicitly,
    // otherwise the calendar falls back to the browser default (serif).
    fontFamily: resolveFontFamily(theme, locale),
    ".react-datepicker__header": {
      backgroundColor: theme.colors.white,
      borderBottom: "none",
      borderTopLeftRadius: theme.radii.medium,
      borderTopRightRadius: theme.radii.medium,
    },
    ".react-datepicker__triangle": {
      display: "none",
    },
    ".react-datepicker-popper": {
      zIndex: theme.zIndices.aboveOverlay,
    },
    ".react-datepicker-popper[data-placement^='bottom']": {
      marginTop: "0",
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
    },
    ".react-datepicker__day-names": {
      paddingTop: theme.space.x2,
      ".react-datepicker__day-name": {
        textTransform: "uppercase",
        fontSize: theme.fontSizes.smaller,
        display: "inline-block",
        width: theme.space.x5,
        color: theme.colors.darkGrey,
        textAlign: "center",
      },
    },
    ".react-datepicker__day": {
      fontSize: theme.fontSizes.base,
      borderRadius: theme.radii.medium,
      color: theme.colors.darkGrey,
      border: "2px solid transparent",
      display: "inline-block",
      lineHeight: theme.space.x4,
      textAlign: "center",
      width: `calc(${theme.space.x3} + ${theme.space.half})`,
      margin: theme.space.half,
      boxSizing: "content-box",
      "&:hover": {
        backgroundColor: theme.colors.lightBlue,
        color: theme.colors.black,
      },
      "&--today": {
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.black,
      },
      "&--outside-month": {
        color: theme.colors.midGrey,
        fontSize: theme.fontSizes.small,
      },
      "&--disabled": {
        color: theme.colors.grey,
        "&:hover": {
          color: theme.colors.grey,
        },
      },
      "&--highlighted": {
        backgroundColor: theme.colors.darkBlue,
        color: theme.colors.white,
        "&:hover": {
          backgroundColor: theme.colors.darkBlue,
          color: theme.colors.white,
        },
      },
    },
    ".react-datepicker__day, .react-datepicker__month-text, .react-datepicker__quarter-text": {
      "&[aria-disabled='false']": {
        cursor: "pointer",
      },
    },
    ".react-datepicker__month-text--today": {
      fontWeight: theme.fontWeights.bold,
      color: theme.colors.black,
    },
    ".react-datepicker__day--disabled:hover,.react-datepicker__month-text--disabled:hover,.react-datepicker__quarter-text--disabled:hover":
      {
        backgroundColor: "transparent",
      },
    ".react-datepicker__day-names, .react-datepicker__week": {
      whiteSpace: "nowrap",
    },
    ".react-datepicker__day--selected": {
      color: theme.colors.white,
      background: theme.colors.darkBlue,
      border: `2px solid ${theme.colors.darkBlue}`,
      lineHeight: theme.space.x4,
      cursor: "initial",
      "&:hover": {
        color: theme.colors.white,
        background: theme.colors.darkBlue,
      },
    },

    ".react-datepicker__aria-live": {
      position: "absolute",
      clipPath: "circle(0)",
      border: "0",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0",
      width: "1px",
      whiteSpace: "nowrap",
    },
    ".react-datepicker:has(.react-datepicker__month)": {
      padding: theme.space.x2,
    },
    ".react-datepicker__monthPicker": {
      display: "grid",
      padding: theme.space.x1,
      gridTemplateColumns: "repeat(3, 1fr)",
      columnGap: theme.space.x4,
      rowGap: theme.space.x1,
    },
    ".react-datepicker__month-wrapper": {
      display: "contents",
      width: "fit-content",
    },
    ".react-datepicker__month-text": {
      padding: theme.space.x1,
      fontSize: theme.fontSizes.base,
      color: theme.colors.darkGrey,
      borderRadius: theme.radii.medium,
      textAlign: "center",
      "&:not(.react-datepicker__month-text--disabled):hover": {
        backgroundColor: theme.colors.lightBlue,
        color: theme.colors.darkGrey,
      },
      "&--disabled": {
        userSelect: "none",
        color: theme.colors.grey,
        "&:hover": {
          color: theme.colors.grey,
        },
      },
    },
    ".react-datepicker__month-text--selected": {
      backgroundColor: theme.colors.darkBlue,
      color: theme.colors.white,
      "&:hover": {
        backgroundColor: theme.colors.darkBlue,
        color: theme.colors.white,
      },
    },
  },
  // Appended after the base `#nds-date-picker-portal` block so week overrides win on
  // equal-specificity ties. Empty object for non-week pickers (DatePicker/MonthPicker).
  ...(weekPicker ? weekPickerRules(theme) : {}),
}));
