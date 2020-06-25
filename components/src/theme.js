import * as tokens from "@nulogy/tokens";

export default {
  colors: {
    black: tokens.color_base_black,
    blackBlue: tokens.color_base_black_blue,
    darkBlue: tokens.color_base_dark_blue,
    blue: tokens.color_base_blue,
    lightBlue: tokens.color_base_light_blue,
    darkGrey: tokens.color_base_dark_grey,
    grey: tokens.color_base_grey,
    lightGrey: tokens.color_base_light_grey,
    whiteGrey: tokens.color_base_white_grey,
    white: tokens.color_base_white,
    yellow: tokens.color_base_yellow,
    lightYellow: tokens.color_base_light_yellow,
    green: tokens.color_base_green,
    lightGreen: tokens.color_base_light_green,
    red: tokens.color_base_red,
    lightRed: tokens.color_base_light_red
  },
  fontSizes: {
    smaller: tokens.size_font_smaller,
    small: tokens.size_font_small,
    medium: tokens.size_font_medium,
    large: tokens.size_font_large,
    larger: tokens.size_font_larger,
    largest: tokens.size_font_largest
  },
  lineHeights: {
    base: tokens.line_height_base,
    title: tokens.line_height_title,
    sectionTitle: tokens.line_height_section_title,
    subsectionTitle: tokens.line_height_subsection_title,
    smallTextBase: tokens.line_height_small_text_base,
    smallTextCompressed: tokens.line_height_small_text_compressed,
    smallerText: tokens.line_height_smaller_text
  },
  fontWeights: {
    light: tokens.weight_font_light,
    normal: tokens.weight_font_normal,
    medium: tokens.weight_font_medium,
    bold: tokens.weight_font_bold
  },
  space: {
    none: tokens.size_base_none,
    half: tokens.size_base_half,
    x1: tokens.size_base_x_1,
    x2: tokens.size_base_x_2,
    x3: tokens.size_base_x_3,
    x4: tokens.size_base_x_4,
    x5: tokens.size_base_x_5,
    x6: tokens.size_base_x_6,
    x8: tokens.size_base_x_8
  },
  fonts: {
    base: tokens.font_family_base,
    mono: tokens.font_family_mono,
    sc: tokens.font_family_sc
  },
  borders: [],
  shadows: {
    small: tokens.shadow_box_small,
    medium: tokens.shadow_box_medium,
    large: tokens.shadow_box_large,
    focus: tokens.shadow_focus,
    error: tokens.shadow_error
  },
  radii: {
    small: tokens.radius_border_small,
    medium: tokens.radius_border_medium,
    circle: tokens.radius_border_circle
  },
  breakpoints: {
    extraSmall: tokens.size_breakpoint_extra_small,
    small: tokens.size_breakpoint_small,
    medium: tokens.size_breakpoint_medium,
    large: tokens.size_breakpoint_large,
    extraLarge: tokens.size_breakpoint_extra_large
  },
  zIndex: {
    content: tokens.z_index_content,
    tabsScollIndicator: tokens.z_index_tabs_scroll_indicator,
    tabsBar: tokens.z_index_tabs_bar,
    overlay: tokens.z_index_overlay
  }
};
