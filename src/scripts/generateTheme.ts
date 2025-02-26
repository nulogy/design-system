import fs from "fs";
import path from "path";
import * as tokens from "@nulogy/tokens";
import { DefaultNDSThemeType } from "../theme";

const deviceBaseUnits = {
  tablet: 5.6,
  phone: 3.6,
  desktop: 4,
} as const;

const px = (value: number) => `${value}px`;
const s = String;

const BASE_THEME = {
  colors: {
    black: tokens.color_base_black,
    blackBlue: tokens.color_base_black_blue,
    darkBlue: tokens.color_base_dark_blue,
    blue: tokens.color_base_blue,
    lightBlue: tokens.color_base_light_blue,
    darkGrey: tokens.color_base_dark_grey,
    midGrey: tokens.color_base_mid_grey,
    grey: tokens.color_base_grey,
    lightGrey: tokens.color_base_light_grey,
    whiteGrey: tokens.color_base_white_grey,
    white: tokens.color_base_white,
    yellow: tokens.color_base_yellow,
    lightYellow: tokens.color_base_light_yellow,
    green: tokens.color_base_green,
    lightGreen: tokens.color_base_light_green,
    red: tokens.color_base_red,
    lightRed: tokens.color_base_light_red,
    categorical1: tokens.color_base_categorical_1,
    categorical2: tokens.color_base_categorical_2,
    categorical3: tokens.color_base_categorical_3,
    categorical4: tokens.color_base_categorical_4,
    categorical5: tokens.color_base_categorical_5,
    categorical6: tokens.color_base_categorical_6,
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 600,
  },
  fonts: {
    base: tokens.font_family_base,
    mono: tokens.font_family_mono,
    sc: tokens.font_family_sc,
  },
  shadows: {
    small: tokens.shadow_box_small,
    medium: tokens.shadow_box_medium,
    large: tokens.shadow_box_large,
    focus: tokens.shadow_focus,
    error: tokens.shadow_error,
  },
  breakpoints: {
    extraSmall: tokens.size_breakpoint_extra_small,
    small: tokens.size_breakpoint_small,
    medium: tokens.size_breakpoint_medium,
    large: tokens.size_breakpoint_large,
    extraLarge: tokens.size_breakpoint_extra_large,

    phonePortrait: "320px",
    phoneLandscape: "640px",
    tabletPortrait: "768px",
    tabletLandscape: "1024px",
    laptop: "1280px",
    desktop: "1440px",
  },
  zIndices: {
    content: tokens.z_indices_content,
    tabsScollIndicator: tokens.z_indices_tabs_scroll_indicator,
    tabsBar: tokens.z_indices_tabs_bar,
    overlay: tokens.z_indices_overlay,
    aboveOverlay: tokens.z_indices_above_overlay,
    tableHeader: tokens.z_indices_table_header,
    modalHeaderAndFooter: tokens.z_indices_modal_header_and_footer,
    openControl: tokens.z_indices_open_control,
    navBar: tokens.z_indices_nav_bar,
    sidebar: tokens.z_indices_sidebar,
  },
};

const legacy: DefaultNDSThemeType = {
  ...BASE_THEME,
  fontSizes: {
    smaller: tokens.size_font_smaller,
    small: tokens.size_font_small,
    medium: tokens.size_font_medium,
    large: tokens.size_font_large,
    larger: tokens.size_font_larger,
    largest: tokens.size_font_largest,
    base: tokens.size_font_medium,
    xxs: tokens.size_font_smaller,
    xs: tokens.size_font_smaller,
    sm: tokens.size_font_small,
    md: tokens.size_font_medium,
    lg: tokens.size_font_large,
    xl: tokens.size_font_larger,
    xxl: tokens.size_font_largest,
    heading1: tokens.size_font_heading_1,
    heading2: tokens.size_font_heading_2,
    heading3: tokens.size_font_heading_3,
    heading4: tokens.size_font_heading_4,
  },
  lineHeights: {
    baseRelaxed: s((7 * 4) / 16),
    smallRelaxed: s((6 * 4) / 14),
    smallerRelaxed: s((5 * 4) / 12),
    base: tokens.line_height_base,
    smallTextBase: tokens.line_height_small_text_base,
    smallTextCompressed: tokens.line_height_small_text_compressed,
    smallerText: tokens.line_height_smaller_text,
    heading1: tokens.line_height_heading_1,
    heading2: tokens.line_height_heading_2,
    heading3: tokens.line_height_heading_3,
    heading4: tokens.line_height_heading_4,
    title: tokens.line_height_heading_1,
    sectionTitle: tokens.line_height_heading_2,
    subsectionTitle: tokens.line_height_heading_3,
  },
  space: {
    none: tokens.size_base_none,
    half: tokens.size_base_half,
    x0: tokens.size_base_none,
    x0_25: "2px",
    x0_5: tokens.size_base_half,
    x0_75: "6px",
    x1: tokens.size_base_x_1,
    x1_25: "10px",
    x1_5: "12px",
    x1_75: "14px",
    x2: tokens.size_base_x_2,
    x2_5: "20px",
    x3: tokens.size_base_x_3,
    x4: tokens.size_base_x_4,
    x5: tokens.size_base_x_5,
    x6: tokens.size_base_x_6,
    x7: "56px",
    x8: tokens.size_base_x_8,
    x9: "72px",
    x10: "80px",
    x11: "88px",
    x12: "96px",
  },
  sizes: {
    none: tokens.size_base_none,
    half: tokens.size_base_half,
    x0: tokens.size_base_none,
    x0_25: "2px",
    x0_5: tokens.size_base_half,
    x0_75: "6px",
    x1: tokens.size_base_x_1,
    x1_25: "10px",
    x1_5: "12px",
    x1_75: "14px",
    x2: tokens.size_base_x_2,
    x2_5: "20px",
    x3: tokens.size_base_x_3,
    x4: tokens.size_base_x_4,
    x5: tokens.size_base_x_5,
    x6: tokens.size_base_x_6,
    x7: "56px",
    x8: tokens.size_base_x_8,
    x9: "72px",
    x10: "80px",
    x11: "88px",
    x12: "96px",
  },
  radii: {
    small: tokens.radius_border_small,
    medium: tokens.radius_border_medium,
    large: "8px",
    circle: tokens.radius_border_circle,
    rounded: "9999px",
  },
  borders: [],
};

function pxs<T extends Record<string, number>>(config: T): { [K in keyof T]: string } {
  return Object.entries(config).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: `${value}px`,
    }),
    {}
  ) as { [K in keyof T]: string };
}

function generateThemeConfig(baseUnit: number): DefaultNDSThemeType {
  const fontSizes = {
    smaller: baseUnit * 3,
    small: baseUnit * 3.75,
    medium: baseUnit * 3.75,
    large: baseUnit * 5.25,
    larger: baseUnit * 6,
    largest: baseUnit * 7.5,

    xxs: baseUnit * 2.25,
    xs: baseUnit * 3,
    sm: baseUnit * 3.75,
    md: baseUnit * 4.5,
    lg: baseUnit * 5.25,
    xl: baseUnit * 6,
    xxl: baseUnit * 7.5,
  } as const;

  const semanticFontSizes = {
    heading1: fontSizes.larger,
    heading2: fontSizes.large,
    heading3: fontSizes.md,
    heading4: fontSizes.small,
    base: fontSizes.small,
  } as const;

  const space = {
    none: px(0),
    x0: px(0),
    x0_25: px(baseUnit * 0.5),
    half: px(baseUnit * 1),
    x0_5: px(baseUnit * 1),
    x0_75: px(baseUnit * 1.5),
    x1: px(baseUnit * 2),
    x1_25: px(baseUnit * 2.5),
    x1_5: px(baseUnit * 3),
    x1_75: px(baseUnit * 3.5),
    x2: px(baseUnit * 4),
    x2_5: px(baseUnit * 5),
    x3: px(baseUnit * 6),
    x4: px(baseUnit * 8),
    x5: px(baseUnit * 10),
    x6: px(baseUnit * 12),
    x7: px(baseUnit * 14),
    x8: px(baseUnit * 16),
    x9: px(baseUnit * 18),
    x10: px(baseUnit * 20),
    x11: px(baseUnit * 22),
    x12: px(baseUnit * 24),
  };

  return {
    ...BASE_THEME,
    fontSizes: {
      ...pxs(fontSizes),
      ...pxs(semanticFontSizes),
    },
    lineHeights: {
      base: s((5 * baseUnit) / semanticFontSizes.base),
      baseRelaxed: s((6 * baseUnit) / semanticFontSizes.base),
      smallTextBase: s((5 * baseUnit) / fontSizes.small),
      smallTextCompressed: s((5 * baseUnit) / fontSizes.small),
      smallRelaxed: s((6 * baseUnit) / fontSizes.small),
      smallerText: s((4 * baseUnit) / fontSizes.smaller),
      smallerRelaxed: s((5 * baseUnit) / fontSizes.smaller),
      heading1: s((8 * baseUnit) / semanticFontSizes.heading1),
      heading2: s((7 * baseUnit) / semanticFontSizes.heading2),
      heading3: s((6 * baseUnit) / semanticFontSizes.heading3),
      heading4: s((5 * baseUnit) / semanticFontSizes.heading4),
      title: s((8 * baseUnit) / semanticFontSizes.heading1),
      sectionTitle: s((7 * baseUnit) / semanticFontSizes.heading2),
      subsectionTitle: s((6 * baseUnit) / semanticFontSizes.heading3),
    },
    space,
    sizes: space,
    radii: {
      small: px(baseUnit * 0.5),
      medium: px(baseUnit * 1),
      large: px(baseUnit * 2),
      circle: "50%",
      rounded: px(9999),
    },
    borders: [],
  };
}

const generatedThemes = {
  legacy,
  experimental: generateThemeConfig(deviceBaseUnits.desktop),
  tablet: generateThemeConfig(deviceBaseUnits.tablet),
  phone: generateThemeConfig(deviceBaseUnits.phone),
};

const output = `// This file is auto-generated using "yarn generate:theme"
// Do not edit directly.
import { DefaultNDSThemeType } from "./theme.type";

type ThemeKey = "legacy" | "experimental" | "tablet" | "phone";

export const themes: Record<ThemeKey, DefaultNDSThemeType> = ${JSON.stringify(generatedThemes, null, 2)};

export const { legacy, experimental, tablet, phone } = themes;
`;

const outputPath = path.join(__dirname, "..", "theme/theme.ts");
fs.writeFileSync(outputPath, output, "utf8");

console.info(`Theme file generated at: ${outputPath}`);
