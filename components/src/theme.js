import * as tokens from '@nulogy/tokens'

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
      green: tokens.color_base_green,
      lightGreen: tokens.color_base_light_green,
      red: tokens.color_base_red,
      lightRed: tokens.color_base_light_red,
    },
    fontSizes: [
        tokens.size_font_small,
        tokens.size_font_medium,
        tokens.size_font_large,
        tokens.size_font_larger,
        tokens.size_font_largest
    ],
    lineHeights: {
        base: tokens.line_height_base,
        title: tokens.line_height_title,
        sectionTitle: tokens.line_height_section_title,
        subsectionTitle: tokens.line_height_subsection_title,
        smallTextBase: tokens.line_height_small_text_base,
        smallTextCompressed: tokens.line_height_small_text_compressed,
    },
    fontWeights: [
      tokens.weight_font_light,
      tokens.weight_font_normal,
      tokens.weight_font_medium,
      tokens.weight_font_bold
    ],
    space: [
        tokens.size_base_half,
        tokens.size_base_x_1,
        tokens.size_base_x_2,
        tokens.size_base_x_3,
        tokens.size_base_x_4,
        tokens.size_base_x_6,
        tokens.size_base_x_8
    ],
    fonts: {
      base: tokens.font_family_base,
      mono: tokens.font_family_mono
    },
    borders: [],
    boxShadows: [tokens.shadow_box_small],
    radii: [tokens.radius_background_small, tokens.radius_background_medium],
    breakpoints: [tokens.size_breakpoint_small, tokens.size_breakpoint_medium, tokens.size_breakpoint_large]
  }
