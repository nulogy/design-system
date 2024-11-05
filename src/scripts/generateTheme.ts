import fs from "fs";
import path from "path";
import * as tokens from "@nulogy/tokens";
import { DefaultNDSThemeType } from "../theme.type";

const deviceBaseUnits = {
  tablet: 5.6,
  phone: 3.6,
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
    light: tokens.weight_font_light,
    normal: tokens.weight_font_normal,
    medium: tokens.weight_font_medium,
    bold: tokens.weight_font_bold,
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

const desktop: DefaultNDSThemeType = {
  ...BASE_THEME,
  fontSizes: {
    smaller: tokens.size_font_smaller,
    small: tokens.size_font_small,
    medium: tokens.size_font_medium,
    large: tokens.size_font_large,
    larger: tokens.size_font_larger,
    largest: tokens.size_font_largest,
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
    medium: baseUnit * 4.5,
    large: baseUnit * 5.25,
    larger: baseUnit * 6,
    largest: baseUnit * 7.5,
  } as const;

  const headings = {
    heading1: fontSizes.large,
    heading2: fontSizes.medium,
    heading3: fontSizes.small,
    heading4: fontSizes.smaller,
  } as const;

  const space = {
    none: px(0),
    half: px(baseUnit * 0.5),
    x0: px(0),
    x0_25: px(baseUnit * 0.25),
    x0_5: px(baseUnit * 0.5),
    x0_75: px(baseUnit * 0.75),
    x1: px(baseUnit * 1),
    x1_25: px(baseUnit * 1.25),
    x1_5: px(baseUnit * 1.5),
    x1_75: px(baseUnit * 1.75),
    x2: px(baseUnit * 2),
    x2_5: px(baseUnit * 2.5),
    x3: px(baseUnit * 3),
    x4: px(baseUnit * 4),
    x5: px(baseUnit * 5),
    x6: px(baseUnit * 6),
    x7: px(baseUnit * 7),
    x8: px(baseUnit * 8),
  };

  return {
    ...BASE_THEME,
    fontSizes: {
      ...pxs(fontSizes),
      ...pxs(headings),
    },
    lineHeights: {
      base: s((6 * baseUnit) / fontSizes.medium),
      baseRelaxed: s((7 * baseUnit) / fontSizes.medium),
      smallTextBase: s((5 * baseUnit) / fontSizes.small),
      smallTextCompressed: s((5 * baseUnit) / fontSizes.small),
      smallRelaxed: s((6 * baseUnit) / fontSizes.small),
      smallerText: s((4 * baseUnit) / fontSizes.smaller),
      smallerRelaxed: s((5 * baseUnit) / fontSizes.smaller),
      heading1: s((7 * baseUnit) / headings.heading1),
      heading2: s((6 * baseUnit) / headings.heading2),
      heading3: s((5 * baseUnit) / headings.heading3),
      heading4: s((4 * baseUnit) / headings.heading4),
      title: s((7 * baseUnit) / headings.heading1),
      sectionTitle: s((6 * baseUnit) / headings.heading2),
      subsectionTitle: s((5 * baseUnit) / headings.heading3),
    },
    space,
    sizes: space,
    radii: {
      small: px(baseUnit * 0.5),
      medium: px(baseUnit * 1),
      large: px(baseUnit * 2),
      circle: "50%",
      rounded: px(99999),
    },
    borders: [],
  };
}

const generatedThemes = {
  desktop,
  tablet: generateThemeConfig(deviceBaseUnits.tablet),
  phone: generateThemeConfig(deviceBaseUnits.phone),
};

const output = `// This file is auto-generated using scripts/generateTheme.ts
// Do not edit directly.
import { DefaultNDSThemeType } from "./theme.type";

type ThemeKey = "desktop" | "tablet" | "phone";

export const themes: Record<ThemeKey, DefaultNDSThemeType> = ${JSON.stringify(generatedThemes, null, 2)} as const;

export const { desktop, tablet, phone } = themes;
`;

const outputPath = path.join(__dirname, "..", "theme.ts");
fs.writeFileSync(outputPath, output, "utf8");

console.info(`Theme file generated at: ${outputPath}`);