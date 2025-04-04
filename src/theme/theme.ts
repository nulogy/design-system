import * as tokens from "@nulogy/tokens";
import { DefaultNDSThemeType } from "./theme.type";

type ThemeKey = "legacy" | "experimental" | "tablet" | "phone";

export const themes: Record<ThemeKey, DefaultNDSThemeType> = {
  legacy: {
    colors: {
      black: tokens.DESKTOP_COLOR_BASE_BLACK,
      blackBlue: tokens.DESKTOP_COLOR_BASE_BLACK_BLUE,
      darkBlue: tokens.DESKTOP_COLOR_BASE_DARK_BLUE,
      blue: tokens.DESKTOP_COLOR_BASE_BLUE,
      lightBlue: tokens.DESKTOP_COLOR_BASE_LIGHT_BLUE,
      darkGrey: tokens.DESKTOP_COLOR_BASE_DARK_GREY,
      midGrey: tokens.DESKTOP_COLOR_BASE_MID_GREY,
      grey: tokens.DESKTOP_COLOR_BASE_GREY,
      lightGrey: tokens.DESKTOP_COLOR_BASE_LIGHT_GREY,
      whiteGrey: tokens.DESKTOP_COLOR_BASE_WHITE_GREY,
      white: tokens.DESKTOP_COLOR_BASE_WHITE,
      yellow: tokens.DESKTOP_COLOR_BASE_YELLOW,
      lightYellow: tokens.DESKTOP_COLOR_BASE_LIGHT_YELLOW,
      green: tokens.DESKTOP_COLOR_BASE_GREEN,
      lightGreen: tokens.DESKTOP_COLOR_BASE_LIGHT_GREEN,
      red: tokens.DESKTOP_COLOR_BASE_RED,
      lightRed: tokens.DESKTOP_COLOR_BASE_LIGHT_RED,
      categorical1: tokens.DESKTOP_COLOR_CATEGORICAL_1,
      categorical2: tokens.DESKTOP_COLOR_CATEGORICAL_2,
      categorical3: tokens.DESKTOP_COLOR_CATEGORICAL_3,
      categorical4: tokens.DESKTOP_COLOR_CATEGORICAL_4,
      categorical5: tokens.DESKTOP_COLOR_CATEGORICAL_5,
      categorical6: tokens.DESKTOP_COLOR_CATEGORICAL_6,
    },
    fontWeights: {
      light: tokens.DESKTOP_FONT_WEIGHT_LIGHT,
      normal: tokens.DESKTOP_FONT_WEIGHT_NORMAL,
      medium: tokens.DESKTOP_FONT_WEIGHT_MEDIUM,
      bold: tokens.DESKTOP_FONT_WEIGHT_BOLD,
    },
    fonts: {
      base: tokens.DESKTOP_FONT_FAMILY_BASE,
      mono: tokens.DESKTOP_FONT_FAMILY_MONO,
      sc: tokens.DESKTOP_FONT_FAMILY_SC,
    },
    shadows: {
      small: tokens.DESKTOP_SHADOW_SMALL,
      medium: tokens.DESKTOP_SHADOW_MEDIUM,
      large: tokens.DESKTOP_SHADOW_LARGE,
      focus: tokens.DESKTOP_SHADOW_FOCUS,
      error: tokens.DESKTOP_SHADOW_ERROR,
    },
    breakpoints: {
      extraSmall: tokens.DESKTOP_BREAKPOINTS_BASE_EXTRA_SMALL,
      small: tokens.DESKTOP_BREAKPOINTS_BASE_SMALL,
      medium: tokens.DESKTOP_BREAKPOINTS_BASE_MEDIUM,
      large: tokens.DESKTOP_BREAKPOINTS_BASE_LARGE,
      extraLarge: tokens.DESKTOP_BREAKPOINTS_BASE_EXTRA_LARGE,
      phonePortrait: tokens.DESKTOP_BREAKPOINTS_SEMANTIC_PHONE_PORTRAIT,
      phoneLandscape: tokens.DESKTOP_BREAKPOINTS_SEMANTIC_PHONE_LANDSCAPE,
      tabletPortrait: tokens.DESKTOP_BREAKPOINTS_SEMANTIC_TABLET_PORTRAIT,
      tabletLandscape: tokens.DESKTOP_BREAKPOINTS_SEMANTIC_TABLET_LANDSCAPE,
      laptop: tokens.DESKTOP_BREAKPOINTS_SEMANTIC_LAPTOP,
      desktop: tokens.DESKTOP_BREAKPOINTS_SEMANTIC_DESKTOP,
    },
    zIndices: {
      content: tokens.DESKTOP_Z_INDEX_CONTENT,
      tabsScollIndicator: tokens.DESKTOP_Z_INDEX_TABS_SCROLL_INDICATOR,
      tabsBar: tokens.DESKTOP_Z_INDEX_TABS_BAR,
      overlay: tokens.DESKTOP_Z_INDEX_OVERLAY,
      aboveOverlay: tokens.DESKTOP_Z_INDEX_ABOVE_OVERLAY,
      tableHeader: tokens.DESKTOP_Z_INDEX_TABLE_HEADER,
      modalHeaderAndFooter: tokens.DESKTOP_Z_INDEX_MODAL_HEADER_AND_FOOTER,
      openControl: tokens.DESKTOP_Z_INDEX_OPEN_CONTROL,
      navBar: tokens.DESKTOP_Z_INDEX_NAV_BAR,
      sidebar: tokens.DESKTOP_Z_INDEX_SIDEBAR,
    },
    fontSizes: {
      smaller: "12px",
      small: "14px",
      medium: "16px",
      large: "24px",
      larger: "30px",
      largest: "32px",
      base: "16px",
      xxs: "12px",
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "24px",
      xl: "30px",
      xxl: "32px",
      heading1: "32px",
      heading2: "30px",
      heading3: "24px",
      heading4: "18px",
    },
    lineHeights: {
      baseRelaxed: "1.75",
      smallRelaxed: "1.7142857142857142",
      smallerRelaxed: "1.6666666666666667",
      base: "1.5",
      smallTextBase: "1.71428571",
      smallTextCompressed: "1.14285714",
      smallerText: "1.33333333",
      heading1: "1.25",
      heading2: "1.33",
      heading3: "1.33",
      heading4: "1.33",
      title: "1.25",
      sectionTitle: "1.33",
      subsectionTitle: "1.33",
    },
    space: {
      none: tokens.DESKTOP_SPACE_NONE,
      half: tokens.DESKTOP_SPACE_HALF,
      x0: tokens.DESKTOP_SPACE_X_0,
      x0_25: tokens.DESKTOP_SPACE_X_0_25,
      x0_5: tokens.DESKTOP_SPACE_X_0_5,
      x0_75: tokens.DESKTOP_SPACE_X_0_75,
      x1: tokens.DESKTOP_SPACE_X_1,
      x1_25: tokens.DESKTOP_SPACE_X_1_25,
      x1_5: tokens.DESKTOP_SPACE_X_1_5,
      x1_75: tokens.DESKTOP_SPACE_X_1_75,
      x2: tokens.DESKTOP_SPACE_X_2,
      x2_5: tokens.DESKTOP_SPACE_X_2_5,
      x3: tokens.DESKTOP_SPACE_X_3,
      x4: tokens.DESKTOP_SPACE_X_4,
      x5: tokens.DESKTOP_SPACE_X_5,
      x6: tokens.DESKTOP_SPACE_X_6,
      x7: tokens.DESKTOP_SPACE_X_7,
      x8: tokens.DESKTOP_SPACE_X_8,
      x9: tokens.DESKTOP_SPACE_X_9,
      x10: tokens.DESKTOP_SPACE_X_10,
      x11: tokens.DESKTOP_SPACE_X_11,
      x12: tokens.DESKTOP_SPACE_X_12,
    },
    sizes: {
      none: tokens.DESKTOP_SPACE_NONE,
      half: tokens.DESKTOP_SPACE_HALF,
      x0: tokens.DESKTOP_SPACE_X_0,
      x0_25: tokens.DESKTOP_SPACE_X_0_25,
      x0_5: tokens.DESKTOP_SPACE_X_0_5,
      x0_75: tokens.DESKTOP_SPACE_X_0_75,
      x1: tokens.DESKTOP_SPACE_X_1,
      x1_25: tokens.DESKTOP_SPACE_X_1_25,
      x1_5: tokens.DESKTOP_SPACE_X_1_5,
      x1_75: tokens.DESKTOP_SPACE_X_1_75,
      x2: tokens.DESKTOP_SPACE_X_2,
      x2_5: tokens.DESKTOP_SPACE_X_2_5,
      x3: tokens.DESKTOP_SPACE_X_3,
      x4: tokens.DESKTOP_SPACE_X_4,
      x5: tokens.DESKTOP_SPACE_X_5,
      x6: tokens.DESKTOP_SPACE_X_6,
      x7: tokens.DESKTOP_SPACE_X_7,
      x8: tokens.DESKTOP_SPACE_X_8,
      x9: tokens.DESKTOP_SPACE_X_9,
      x10: tokens.DESKTOP_SPACE_X_10,
      x11: tokens.DESKTOP_SPACE_X_11,
      x12: tokens.DESKTOP_SPACE_X_12,
    },
    radii: {
      small: tokens.DESKTOP_BORDER_RADIUS_SMALL,
      medium: tokens.DESKTOP_BORDER_RADIUS_MEDIUM,
      large: tokens.DESKTOP_BORDER_RADIUS_LARGE,
      circle: tokens.DESKTOP_BORDER_RADIUS_CIRCLE,
      rounded: tokens.DESKTOP_BORDER_RADIUS_ROUNDED,
    },
    borders: [],
  },
  experimental: {
    colors: {
      black: tokens.DESKTOP_COLOR_BASE_BLACK,
      blackBlue: tokens.DESKTOP_COLOR_BASE_BLACK_BLUE,
      darkBlue: tokens.DESKTOP_COLOR_BASE_DARK_BLUE,
      blue: tokens.DESKTOP_COLOR_BASE_BLUE,
      lightBlue: tokens.DESKTOP_COLOR_BASE_LIGHT_BLUE,
      darkGrey: tokens.DESKTOP_COLOR_BASE_DARK_GREY,
      midGrey: tokens.DESKTOP_COLOR_BASE_MID_GREY,
      grey: tokens.DESKTOP_COLOR_BASE_GREY,
      lightGrey: tokens.DESKTOP_COLOR_BASE_LIGHT_GREY,
      whiteGrey: tokens.DESKTOP_COLOR_BASE_WHITE_GREY,
      white: tokens.DESKTOP_COLOR_BASE_WHITE,
      yellow: tokens.DESKTOP_COLOR_BASE_YELLOW,
      lightYellow: tokens.DESKTOP_COLOR_BASE_LIGHT_YELLOW,
      green: tokens.DESKTOP_COLOR_BASE_GREEN,
      lightGreen: tokens.DESKTOP_COLOR_BASE_LIGHT_GREEN,
      red: tokens.DESKTOP_COLOR_BASE_RED,
      lightRed: tokens.DESKTOP_COLOR_BASE_LIGHT_RED,
      categorical1: tokens.DESKTOP_COLOR_CATEGORICAL_1,
      categorical2: tokens.DESKTOP_COLOR_CATEGORICAL_2,
      categorical3: tokens.DESKTOP_COLOR_CATEGORICAL_3,
      categorical4: tokens.DESKTOP_COLOR_CATEGORICAL_4,
      categorical5: tokens.DESKTOP_COLOR_CATEGORICAL_5,
      categorical6: tokens.DESKTOP_COLOR_CATEGORICAL_6,
    },
    fontWeights: {
      light: tokens.DESKTOP_FONT_WEIGHT_LIGHT,
      normal: tokens.DESKTOP_FONT_WEIGHT_NORMAL,
      medium: tokens.DESKTOP_FONT_WEIGHT_MEDIUM,
      bold: tokens.DESKTOP_FONT_WEIGHT_BOLD,
    },
    fonts: {
      base: tokens.DESKTOP_FONT_FAMILY_BASE,
      mono: tokens.DESKTOP_FONT_FAMILY_MONO,
      sc: tokens.DESKTOP_FONT_FAMILY_SC,
    },
    shadows: {
      small: tokens.DESKTOP_SHADOW_SMALL,
      medium: tokens.DESKTOP_SHADOW_MEDIUM,
      large: tokens.DESKTOP_SHADOW_LARGE,
      focus: tokens.DESKTOP_SHADOW_FOCUS,
      error: tokens.DESKTOP_SHADOW_ERROR,
    },
    breakpoints: {
      extraSmall: tokens.DESKTOP_BREAKPOINTS_BASE_EXTRA_SMALL,
      small: tokens.DESKTOP_BREAKPOINTS_BASE_SMALL,
      medium: tokens.DESKTOP_BREAKPOINTS_BASE_MEDIUM,
      large: tokens.DESKTOP_BREAKPOINTS_BASE_LARGE,
      extraLarge: tokens.DESKTOP_BREAKPOINTS_BASE_EXTRA_LARGE,
      phonePortrait: tokens.DESKTOP_BREAKPOINTS_SEMANTIC_PHONE_PORTRAIT,
      phoneLandscape: tokens.DESKTOP_BREAKPOINTS_SEMANTIC_PHONE_LANDSCAPE,
      tabletPortrait: tokens.DESKTOP_BREAKPOINTS_SEMANTIC_TABLET_PORTRAIT,
      tabletLandscape: tokens.DESKTOP_BREAKPOINTS_SEMANTIC_TABLET_LANDSCAPE,
      laptop: tokens.DESKTOP_BREAKPOINTS_SEMANTIC_LAPTOP,
      desktop: tokens.DESKTOP_BREAKPOINTS_SEMANTIC_DESKTOP,
    },
    zIndices: {
      content: tokens.DESKTOP_Z_INDEX_CONTENT,
      tabsScollIndicator: tokens.DESKTOP_Z_INDEX_TABS_SCROLL_INDICATOR,
      tabsBar: tokens.DESKTOP_Z_INDEX_TABS_BAR,
      overlay: tokens.DESKTOP_Z_INDEX_OVERLAY,
      aboveOverlay: tokens.DESKTOP_Z_INDEX_ABOVE_OVERLAY,
      tableHeader: tokens.DESKTOP_Z_INDEX_TABLE_HEADER,
      modalHeaderAndFooter: tokens.DESKTOP_Z_INDEX_MODAL_HEADER_AND_FOOTER,
      openControl: tokens.DESKTOP_Z_INDEX_OPEN_CONTROL,
      navBar: tokens.DESKTOP_Z_INDEX_NAV_BAR,
      sidebar: tokens.DESKTOP_Z_INDEX_SIDEBAR,
    },
    fontSizes: {
      smaller: tokens.DESKTOP_FONT_SIZE_STANDARD_SMALLER,
      small: tokens.DESKTOP_FONT_SIZE_STANDARD_SMALL,
      medium: tokens.DESKTOP_FONT_SIZE_STANDARD_MEDIUM,
      large: tokens.DESKTOP_FONT_SIZE_STANDARD_LARGE,
      larger: tokens.DESKTOP_FONT_SIZE_STANDARD_LARGER,
      largest: tokens.DESKTOP_FONT_SIZE_STANDARD_LARGEST,
      base: tokens.DESKTOP_FONT_SIZE_SEMANTIC_BASE,
      xxs: tokens.DESKTOP_FONT_SIZE_EXPERIMENTAL_XXS,
      xs: tokens.DESKTOP_FONT_SIZE_EXPERIMENTAL_XS,
      sm: tokens.DESKTOP_FONT_SIZE_EXPERIMENTAL_SM,
      md: tokens.DESKTOP_FONT_SIZE_EXPERIMENTAL_MD,
      lg: tokens.DESKTOP_FONT_SIZE_EXPERIMENTAL_LG,
      xl: tokens.DESKTOP_FONT_SIZE_EXPERIMENTAL_XL,
      xxl: tokens.DESKTOP_FONT_SIZE_EXPERIMENTAL_XXL,
      heading1: tokens.DESKTOP_FONT_SIZE_SEMANTIC_HEADING_1,
      heading2: tokens.DESKTOP_FONT_SIZE_SEMANTIC_HEADING_2,
      heading3: tokens.DESKTOP_FONT_SIZE_SEMANTIC_HEADING_3,
      heading4: tokens.DESKTOP_FONT_SIZE_SEMANTIC_HEADING_4,
    },
    lineHeights: {
      base: tokens.DESKTOP_LINE_HEIGHT_BASE,
      baseRelaxed: tokens.DESKTOP_LINE_HEIGHT_BASE_RELAXED,
      smallTextBase: tokens.DESKTOP_LINE_HEIGHT_SMALL_TEXT_BASE,
      smallTextCompressed: tokens.DESKTOP_LINE_HEIGHT_SMALL_TEXT_COMPRESSED,
      smallRelaxed: tokens.DESKTOP_LINE_HEIGHT_SMALL_RELAXED,
      smallerText: tokens.DESKTOP_LINE_HEIGHT_SMALLER_TEXT,
      smallerRelaxed: tokens.DESKTOP_LINE_HEIGHT_SMALLER_RELAXED,
      heading1: tokens.DESKTOP_LINE_HEIGHT_HEADING_1,
      heading2: tokens.DESKTOP_LINE_HEIGHT_HEADING_2,
      heading3: tokens.DESKTOP_LINE_HEIGHT_HEADING_3,
      heading4: tokens.DESKTOP_LINE_HEIGHT_HEADING_4,
      title: tokens.DESKTOP_LINE_HEIGHT_TITLE,
      sectionTitle: tokens.DESKTOP_LINE_HEIGHT_SECTION_TITLE,
      subsectionTitle: tokens.DESKTOP_LINE_HEIGHT_SUBSECTION_TITLE,
    },
    space: {
      none: tokens.DESKTOP_SPACE_NONE,
      x0: tokens.DESKTOP_SPACE_X_0,
      x0_25: tokens.DESKTOP_SPACE_X_0_25,
      half: tokens.DESKTOP_SPACE_HALF,
      x0_5: tokens.DESKTOP_SPACE_X_0_5,
      x0_75: tokens.DESKTOP_SPACE_X_0_75,
      x1: tokens.DESKTOP_SPACE_X_1,
      x1_25: tokens.DESKTOP_SPACE_X_1_25,
      x1_5: tokens.DESKTOP_SPACE_X_1_5,
      x1_75: tokens.DESKTOP_SPACE_X_1_75,
      x2: tokens.DESKTOP_SPACE_X_2,
      x2_5: tokens.DESKTOP_SPACE_X_2_5,
      x3: tokens.DESKTOP_SPACE_X_3,
      x4: tokens.DESKTOP_SPACE_X_4,
      x5: tokens.DESKTOP_SPACE_X_5,
      x6: tokens.DESKTOP_SPACE_X_6,
      x7: tokens.DESKTOP_SPACE_X_7,
      x8: tokens.DESKTOP_SPACE_X_8,
      x9: tokens.DESKTOP_SPACE_X_9,
      x10: tokens.DESKTOP_SPACE_X_10,
      x11: tokens.DESKTOP_SPACE_X_11,
      x12: tokens.DESKTOP_SPACE_X_12,
    },
    sizes: {
      none: tokens.DESKTOP_SPACE_NONE,
      x0: tokens.DESKTOP_SPACE_X_0,
      x0_25: tokens.DESKTOP_SPACE_X_0_25,
      half: tokens.DESKTOP_SPACE_HALF,
      x0_5: tokens.DESKTOP_SPACE_X_0_5,
      x0_75: tokens.DESKTOP_SPACE_X_0_75,
      x1: tokens.DESKTOP_SPACE_X_1,
      x1_25: tokens.DESKTOP_SPACE_X_1_25,
      x1_5: tokens.DESKTOP_SPACE_X_1_5,
      x1_75: tokens.DESKTOP_SPACE_X_1_75,
      x2: tokens.DESKTOP_SPACE_X_2,
      x2_5: tokens.DESKTOP_SPACE_X_2_5,
      x3: tokens.DESKTOP_SPACE_X_3,
      x4: tokens.DESKTOP_SPACE_X_4,
      x5: tokens.DESKTOP_SPACE_X_5,
      x6: tokens.DESKTOP_SPACE_X_6,
      x7: tokens.DESKTOP_SPACE_X_7,
      x8: tokens.DESKTOP_SPACE_X_8,
      x9: tokens.DESKTOP_SPACE_X_9,
      x10: tokens.DESKTOP_SPACE_X_10,
      x11: tokens.DESKTOP_SPACE_X_11,
      x12: tokens.DESKTOP_SPACE_X_12,
    },
    radii: {
      small: tokens.DESKTOP_BORDER_RADIUS_SMALL,
      medium: tokens.DESKTOP_BORDER_RADIUS_MEDIUM,
      large: tokens.DESKTOP_BORDER_RADIUS_LARGE,
      circle: tokens.DESKTOP_BORDER_RADIUS_CIRCLE,
      rounded: tokens.DESKTOP_BORDER_RADIUS_ROUNDED,
    },
    borders: [],
  },
  tablet: {
    colors: {
      black: tokens.TABLET_COLOR_BASE_BLACK,
      blackBlue: tokens.TABLET_COLOR_BASE_BLACK_BLUE,
      darkBlue: tokens.TABLET_COLOR_BASE_DARK_BLUE,
      blue: tokens.TABLET_COLOR_BASE_BLUE,
      lightBlue: tokens.TABLET_COLOR_BASE_LIGHT_BLUE,
      darkGrey: tokens.TABLET_COLOR_BASE_DARK_GREY,
      midGrey: tokens.TABLET_COLOR_BASE_MID_GREY,
      grey: tokens.TABLET_COLOR_BASE_GREY,
      lightGrey: tokens.TABLET_COLOR_BASE_LIGHT_GREY,
      whiteGrey: tokens.TABLET_COLOR_BASE_WHITE_GREY,
      white: tokens.TABLET_COLOR_BASE_WHITE,
      yellow: tokens.TABLET_COLOR_BASE_YELLOW,
      lightYellow: tokens.TABLET_COLOR_BASE_LIGHT_YELLOW,
      green: tokens.TABLET_COLOR_BASE_GREEN,
      lightGreen: tokens.TABLET_COLOR_BASE_LIGHT_GREEN,
      red: tokens.TABLET_COLOR_BASE_RED,
      lightRed: tokens.TABLET_COLOR_BASE_LIGHT_RED,
      categorical1: tokens.TABLET_COLOR_CATEGORICAL_1,
      categorical2: tokens.TABLET_COLOR_CATEGORICAL_2,
      categorical3: tokens.TABLET_COLOR_CATEGORICAL_3,
      categorical4: tokens.TABLET_COLOR_CATEGORICAL_4,
      categorical5: tokens.TABLET_COLOR_CATEGORICAL_5,
      categorical6: tokens.TABLET_COLOR_CATEGORICAL_6,
    },
    fontWeights: {
      light: tokens.TABLET_FONT_WEIGHT_LIGHT,
      normal: tokens.TABLET_FONT_WEIGHT_NORMAL,
      medium: tokens.TABLET_FONT_WEIGHT_MEDIUM,
      bold: tokens.TABLET_FONT_WEIGHT_BOLD,
    },
    fonts: {
      base: tokens.TABLET_FONT_FAMILY_BASE,
      mono: tokens.TABLET_FONT_FAMILY_MONO,
      sc: tokens.TABLET_FONT_FAMILY_SC,
    },
    shadows: {
      small: tokens.TABLET_SHADOW_SMALL,
      medium: tokens.TABLET_SHADOW_MEDIUM,
      large: tokens.TABLET_SHADOW_LARGE,
      focus: tokens.TABLET_SHADOW_FOCUS,
      error: tokens.TABLET_SHADOW_ERROR,
    },
    breakpoints: {
      extraSmall: tokens.TABLET_BREAKPOINTS_BASE_EXTRA_SMALL,
      small: tokens.TABLET_BREAKPOINTS_BASE_SMALL,
      medium: tokens.TABLET_BREAKPOINTS_BASE_MEDIUM,
      large: tokens.TABLET_BREAKPOINTS_BASE_LARGE,
      extraLarge: tokens.TABLET_BREAKPOINTS_BASE_EXTRA_LARGE,
      phonePortrait: tokens.TABLET_BREAKPOINTS_SEMANTIC_PHONE_PORTRAIT,
      phoneLandscape: tokens.TABLET_BREAKPOINTS_SEMANTIC_PHONE_LANDSCAPE,
      tabletPortrait: tokens.TABLET_BREAKPOINTS_SEMANTIC_TABLET_PORTRAIT,
      tabletLandscape: tokens.TABLET_BREAKPOINTS_SEMANTIC_TABLET_LANDSCAPE,
      laptop: tokens.TABLET_BREAKPOINTS_SEMANTIC_LAPTOP,
      desktop: tokens.TABLET_BREAKPOINTS_SEMANTIC_DESKTOP,
    },
    zIndices: {
      content: tokens.TABLET_Z_INDEX_CONTENT,
      tabsScollIndicator: tokens.TABLET_Z_INDEX_TABS_SCROLL_INDICATOR,
      tabsBar: tokens.TABLET_Z_INDEX_TABS_BAR,
      overlay: tokens.TABLET_Z_INDEX_OVERLAY,
      aboveOverlay: tokens.TABLET_Z_INDEX_ABOVE_OVERLAY,
      tableHeader: tokens.TABLET_Z_INDEX_TABLE_HEADER,
      modalHeaderAndFooter: tokens.TABLET_Z_INDEX_MODAL_HEADER_AND_FOOTER,
      openControl: tokens.TABLET_Z_INDEX_OPEN_CONTROL,
      navBar: tokens.TABLET_Z_INDEX_NAV_BAR,
      sidebar: tokens.TABLET_Z_INDEX_SIDEBAR,
    },
    fontSizes: {
      smaller: tokens.TABLET_FONT_SIZE_STANDARD_SMALLER,
      small: tokens.TABLET_FONT_SIZE_STANDARD_SMALL,
      medium: tokens.TABLET_FONT_SIZE_STANDARD_MEDIUM,
      large: tokens.TABLET_FONT_SIZE_STANDARD_LARGE,
      larger: tokens.TABLET_FONT_SIZE_STANDARD_LARGER,
      largest: tokens.TABLET_FONT_SIZE_STANDARD_LARGEST,
      xxs: tokens.TABLET_FONT_SIZE_EXPERIMENTAL_XXS,
      xs: tokens.TABLET_FONT_SIZE_EXPERIMENTAL_XS,
      sm: tokens.TABLET_FONT_SIZE_EXPERIMENTAL_SM,
      md: tokens.TABLET_FONT_SIZE_EXPERIMENTAL_MD,
      lg: tokens.TABLET_FONT_SIZE_EXPERIMENTAL_LG,
      xl: tokens.TABLET_FONT_SIZE_EXPERIMENTAL_XL,
      xxl: tokens.TABLET_FONT_SIZE_EXPERIMENTAL_XXL,
      heading1: tokens.TABLET_FONT_SIZE_SEMANTIC_HEADING_1,
      heading2: tokens.TABLET_FONT_SIZE_SEMANTIC_HEADING_2,
      heading3: tokens.TABLET_FONT_SIZE_SEMANTIC_HEADING_3,
      heading4: tokens.TABLET_FONT_SIZE_SEMANTIC_HEADING_4,
      base: tokens.TABLET_FONT_SIZE_SEMANTIC_BASE,
    },
    lineHeights: {
      base: tokens.TABLET_LINE_HEIGHT_BASE,
      baseRelaxed: tokens.TABLET_LINE_HEIGHT_BASE_RELAXED,
      smallTextBase: tokens.TABLET_LINE_HEIGHT_SMALL_TEXT_BASE,
      smallTextCompressed: tokens.TABLET_LINE_HEIGHT_SMALL_TEXT_COMPRESSED,
      smallRelaxed: tokens.TABLET_LINE_HEIGHT_SMALL_RELAXED,
      smallerText: tokens.TABLET_LINE_HEIGHT_SMALLER_TEXT,
      smallerRelaxed: tokens.TABLET_LINE_HEIGHT_SMALLER_RELAXED,
      heading1: tokens.TABLET_LINE_HEIGHT_HEADING_1,
      heading2: tokens.TABLET_LINE_HEIGHT_HEADING_2,
      heading3: tokens.TABLET_LINE_HEIGHT_HEADING_3,
      heading4: tokens.TABLET_LINE_HEIGHT_HEADING_4,
      title: tokens.TABLET_LINE_HEIGHT_TITLE,
      sectionTitle: tokens.TABLET_LINE_HEIGHT_SECTION_TITLE,
      subsectionTitle: tokens.TABLET_LINE_HEIGHT_SUBSECTION_TITLE,
    },
    space: {
      none: tokens.TABLET_SPACE_NONE,
      x0: tokens.TABLET_SPACE_X_0,
      x0_25: tokens.TABLET_SPACE_X_0_25,
      half: tokens.TABLET_SPACE_HALF,
      x0_5: tokens.TABLET_SPACE_X_0_5,
      x0_75: tokens.TABLET_SPACE_X_0_75,
      x1: tokens.TABLET_SPACE_X_1,
      x1_25: tokens.TABLET_SPACE_X_1_25,
      x1_5: tokens.TABLET_SPACE_X_1_5,
      x1_75: tokens.TABLET_SPACE_X_1_75,
      x2: tokens.TABLET_SPACE_X_2,
      x2_5: tokens.TABLET_SPACE_X_2_5,
      x3: tokens.TABLET_SPACE_X_3,
      x4: tokens.TABLET_SPACE_X_4,
      x5: tokens.TABLET_SPACE_X_5,
      x6: tokens.TABLET_SPACE_X_6,
      x7: tokens.TABLET_SPACE_X_7,
      x8: tokens.TABLET_SPACE_X_8,
      x9: tokens.TABLET_SPACE_X_9,
      x10: tokens.TABLET_SPACE_X_10,
      x11: tokens.TABLET_SPACE_X_11,
      x12: tokens.TABLET_SPACE_X_12,
    },
    sizes: {
      none: tokens.TABLET_SPACE_NONE,
      x0: tokens.TABLET_SPACE_X_0,
      x0_25: tokens.TABLET_SPACE_X_0_25,
      half: tokens.TABLET_SPACE_HALF,
      x0_5: tokens.TABLET_SPACE_X_0_5,
      x0_75: tokens.TABLET_SPACE_X_0_75,
      x1: tokens.TABLET_SPACE_X_1,
      x1_25: tokens.TABLET_SPACE_X_1_25,
      x1_5: tokens.TABLET_SPACE_X_1_5,
      x1_75: tokens.TABLET_SPACE_X_1_75,
      x2: tokens.TABLET_SPACE_X_2,
      x2_5: tokens.TABLET_SPACE_X_2_5,
      x3: tokens.TABLET_SPACE_X_3,
      x4: tokens.TABLET_SPACE_X_4,
      x5: tokens.TABLET_SPACE_X_5,
      x6: tokens.TABLET_SPACE_X_6,
      x7: tokens.TABLET_SPACE_X_7,
      x8: tokens.TABLET_SPACE_X_8,
      x9: tokens.TABLET_SPACE_X_9,
      x10: tokens.TABLET_SPACE_X_10,
      x11: tokens.TABLET_SPACE_X_11,
      x12: tokens.TABLET_SPACE_X_12,
    },
    radii: {
      small: tokens.TABLET_BORDER_RADIUS_SMALL,
      medium: tokens.TABLET_BORDER_RADIUS_MEDIUM,
      large: tokens.TABLET_BORDER_RADIUS_LARGE,
      circle: tokens.TABLET_BORDER_RADIUS_CIRCLE,
      rounded: tokens.TABLET_BORDER_RADIUS_ROUNDED,
    },
    borders: [],
  },
  phone: {
    colors: {
      black: tokens.PHONE_COLOR_BASE_BLACK,
      blackBlue: tokens.PHONE_COLOR_BASE_BLACK_BLUE,
      darkBlue: tokens.PHONE_COLOR_BASE_DARK_BLUE,
      blue: tokens.PHONE_COLOR_BASE_BLUE,
      lightBlue: tokens.PHONE_COLOR_BASE_LIGHT_BLUE,
      darkGrey: tokens.PHONE_COLOR_BASE_DARK_GREY,
      midGrey: tokens.PHONE_COLOR_BASE_MID_GREY,
      grey: tokens.PHONE_COLOR_BASE_GREY,
      lightGrey: tokens.PHONE_COLOR_BASE_LIGHT_GREY,
      whiteGrey: tokens.PHONE_COLOR_BASE_WHITE_GREY,
      white: tokens.PHONE_COLOR_BASE_WHITE,
      yellow: tokens.PHONE_COLOR_BASE_YELLOW,
      lightYellow: tokens.PHONE_COLOR_BASE_LIGHT_YELLOW,
      green: tokens.PHONE_COLOR_BASE_GREEN,
      lightGreen: tokens.PHONE_COLOR_BASE_LIGHT_GREEN,
      red: tokens.PHONE_COLOR_BASE_RED,
      lightRed: tokens.PHONE_COLOR_BASE_LIGHT_RED,
      categorical1: tokens.PHONE_COLOR_CATEGORICAL_1,
      categorical2: tokens.PHONE_COLOR_CATEGORICAL_2,
      categorical3: tokens.PHONE_COLOR_CATEGORICAL_3,
      categorical4: tokens.PHONE_COLOR_CATEGORICAL_4,
      categorical5: tokens.PHONE_COLOR_CATEGORICAL_5,
      categorical6: tokens.PHONE_COLOR_CATEGORICAL_6,
    },
    fontWeights: {
      light: tokens.PHONE_FONT_WEIGHT_LIGHT,
      normal: tokens.PHONE_FONT_WEIGHT_NORMAL,
      medium: tokens.PHONE_FONT_WEIGHT_MEDIUM,
      bold: tokens.PHONE_FONT_WEIGHT_BOLD,
    },
    fonts: {
      base: tokens.PHONE_FONT_FAMILY_BASE,
      mono: tokens.PHONE_FONT_FAMILY_MONO,
      sc: tokens.PHONE_FONT_FAMILY_SC,
    },
    shadows: {
      small: tokens.PHONE_SHADOW_SMALL,
      medium: tokens.PHONE_SHADOW_MEDIUM,
      large: tokens.PHONE_SHADOW_LARGE,
      focus: tokens.PHONE_SHADOW_FOCUS,
      error: tokens.PHONE_SHADOW_ERROR,
    },
    breakpoints: {
      extraSmall: tokens.PHONE_BREAKPOINTS_BASE_EXTRA_SMALL,
      small: tokens.PHONE_BREAKPOINTS_BASE_SMALL,
      medium: tokens.PHONE_BREAKPOINTS_BASE_MEDIUM,
      large: tokens.PHONE_BREAKPOINTS_BASE_LARGE,
      extraLarge: tokens.PHONE_BREAKPOINTS_BASE_EXTRA_LARGE,
      phonePortrait: tokens.PHONE_BREAKPOINTS_SEMANTIC_PHONE_PORTRAIT,
      phoneLandscape: tokens.PHONE_BREAKPOINTS_SEMANTIC_PHONE_LANDSCAPE,
      tabletPortrait: tokens.PHONE_BREAKPOINTS_SEMANTIC_TABLET_PORTRAIT,
      tabletLandscape: tokens.PHONE_BREAKPOINTS_SEMANTIC_TABLET_LANDSCAPE,
      laptop: tokens.PHONE_BREAKPOINTS_SEMANTIC_LAPTOP,
      desktop: tokens.PHONE_BREAKPOINTS_SEMANTIC_DESKTOP,
    },
    zIndices: {
      content: tokens.PHONE_Z_INDEX_CONTENT,
      tabsScollIndicator: tokens.PHONE_Z_INDEX_TABS_SCROLL_INDICATOR,
      tabsBar: tokens.PHONE_Z_INDEX_TABS_BAR,
      overlay: tokens.PHONE_Z_INDEX_OVERLAY,
      aboveOverlay: tokens.PHONE_Z_INDEX_ABOVE_OVERLAY,
      tableHeader: tokens.PHONE_Z_INDEX_TABLE_HEADER,
      modalHeaderAndFooter: tokens.PHONE_Z_INDEX_MODAL_HEADER_AND_FOOTER,
      openControl: tokens.PHONE_Z_INDEX_OPEN_CONTROL,
      navBar: tokens.PHONE_Z_INDEX_NAV_BAR,
      sidebar: tokens.PHONE_Z_INDEX_SIDEBAR,
    },
    fontSizes: {
      smaller: tokens.PHONE_FONT_SIZE_STANDARD_SMALLER,
      small: tokens.PHONE_FONT_SIZE_STANDARD_SMALL,
      medium: tokens.PHONE_FONT_SIZE_STANDARD_MEDIUM,
      large: tokens.PHONE_FONT_SIZE_STANDARD_LARGE,
      larger: tokens.PHONE_FONT_SIZE_STANDARD_LARGER,
      largest: tokens.PHONE_FONT_SIZE_STANDARD_LARGEST,
      xxs: tokens.PHONE_FONT_SIZE_EXPERIMENTAL_XXS,
      xs: tokens.PHONE_FONT_SIZE_EXPERIMENTAL_XS,
      sm: tokens.PHONE_FONT_SIZE_EXPERIMENTAL_SM,
      md: tokens.PHONE_FONT_SIZE_EXPERIMENTAL_MD,
      lg: tokens.PHONE_FONT_SIZE_EXPERIMENTAL_LG,
      xl: tokens.PHONE_FONT_SIZE_EXPERIMENTAL_XL,
      xxl: tokens.PHONE_FONT_SIZE_EXPERIMENTAL_XXL,
      heading1: tokens.PHONE_FONT_SIZE_SEMANTIC_HEADING_1,
      heading2: tokens.PHONE_FONT_SIZE_SEMANTIC_HEADING_2,
      heading3: tokens.PHONE_FONT_SIZE_SEMANTIC_HEADING_3,
      heading4: tokens.PHONE_FONT_SIZE_SEMANTIC_HEADING_4,
      base: tokens.PHONE_FONT_SIZE_SEMANTIC_BASE,
    },
    lineHeights: {
      base: tokens.PHONE_LINE_HEIGHT_BASE,
      baseRelaxed: tokens.PHONE_LINE_HEIGHT_BASE_RELAXED,
      smallTextBase: tokens.PHONE_LINE_HEIGHT_SMALL_TEXT_BASE,
      smallTextCompressed: tokens.PHONE_LINE_HEIGHT_SMALL_TEXT_COMPRESSED,
      smallRelaxed: tokens.PHONE_LINE_HEIGHT_SMALL_RELAXED,
      smallerText: tokens.PHONE_LINE_HEIGHT_SMALLER_TEXT,
      smallerRelaxed: tokens.PHONE_LINE_HEIGHT_SMALLER_RELAXED,
      heading1: tokens.PHONE_LINE_HEIGHT_HEADING_1,
      heading2: tokens.PHONE_LINE_HEIGHT_HEADING_2,
      heading3: tokens.PHONE_LINE_HEIGHT_HEADING_3,
      heading4: tokens.PHONE_LINE_HEIGHT_HEADING_4,
      title: tokens.PHONE_LINE_HEIGHT_TITLE,
      sectionTitle: tokens.PHONE_LINE_HEIGHT_SECTION_TITLE,
      subsectionTitle: tokens.PHONE_LINE_HEIGHT_SUBSECTION_TITLE,
    },
    space: {
      none: tokens.PHONE_SPACE_NONE,
      x0: tokens.PHONE_SPACE_X_0,
      x0_25: tokens.PHONE_SPACE_X_0_25,
      half: tokens.PHONE_SPACE_HALF,
      x0_5: tokens.PHONE_SPACE_X_0_5,
      x0_75: tokens.PHONE_SPACE_X_0_75,
      x1: tokens.PHONE_SPACE_X_1,
      x1_25: tokens.PHONE_SPACE_X_1_25,
      x1_5: tokens.PHONE_SPACE_X_1_5,
      x1_75: tokens.PHONE_SPACE_X_1_75,
      x2: tokens.PHONE_SPACE_X_2,
      x2_5: tokens.PHONE_SPACE_X_2_5,
      x3: tokens.PHONE_SPACE_X_3,
      x4: tokens.PHONE_SPACE_X_4,
      x5: tokens.PHONE_SPACE_X_5,
      x6: tokens.PHONE_SPACE_X_6,
      x7: tokens.PHONE_SPACE_X_7,
      x8: tokens.PHONE_SPACE_X_8,
      x9: tokens.PHONE_SPACE_X_9,
      x10: tokens.PHONE_SPACE_X_10,
      x11: tokens.PHONE_SPACE_X_11,
      x12: tokens.PHONE_SPACE_X_12,
    },
    sizes: {
      none: tokens.PHONE_SPACE_NONE,
      x0: tokens.PHONE_SPACE_X_0,
      x0_25: tokens.PHONE_SPACE_X_0_25,
      half: tokens.PHONE_SPACE_HALF,
      x0_5: tokens.PHONE_SPACE_X_0_5,
      x0_75: tokens.PHONE_SPACE_X_0_75,
      x1: tokens.PHONE_SPACE_X_1,
      x1_25: tokens.PHONE_SPACE_X_1_25,
      x1_5: tokens.PHONE_SPACE_X_1_5,
      x1_75: tokens.PHONE_SPACE_X_1_75,
      x2: tokens.PHONE_SPACE_X_2,
      x2_5: tokens.PHONE_SPACE_X_2_5,
      x3: tokens.PHONE_SPACE_X_3,
      x4: tokens.PHONE_SPACE_X_4,
      x5: tokens.PHONE_SPACE_X_5,
      x6: tokens.PHONE_SPACE_X_6,
      x7: tokens.PHONE_SPACE_X_7,
      x8: tokens.PHONE_SPACE_X_8,
      x9: tokens.PHONE_SPACE_X_9,
      x10: tokens.PHONE_SPACE_X_10,
      x11: tokens.PHONE_SPACE_X_11,
      x12: tokens.PHONE_SPACE_X_12,
    },
    radii: {
      small: tokens.PHONE_BORDER_RADIUS_SMALL,
      medium: tokens.PHONE_BORDER_RADIUS_MEDIUM,
      large: tokens.PHONE_BORDER_RADIUS_LARGE,
      circle: tokens.PHONE_BORDER_RADIUS_CIRCLE,
      rounded: tokens.PHONE_BORDER_RADIUS_ROUNDED,
    },
    borders: [],
  },
};

export const { legacy, experimental, tablet, phone } = themes;
