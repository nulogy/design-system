import * as tokens from '../../tokens/build/exports.js';

/* 
    
this is just to demo using styled system

we should actually be creating a proper transform in @tokens to create a theme file
https://amzn.github.io/style-dictionary/#/extending


theme.js 

const theme = {
  fontSizes: [
    12, 14, 16, 24, 32, 48, 64, 96, 128
  ],
  space: [
    // margin and padding
    0, 4, 8, 16, 32, 64, 128, 256
  ],
  colors: {
    blue: '#07c',
    red: '#e10',
  }
}

https://jxnblk.com/styled-system/
https://github.com/jxnblk/styled-system/blob/master/docs/api.md

*/ 

// theme.js
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
    space: [
        tokens.size_padding_half,
        tokens.size_padding_x_1,
        tokens.size_padding_x_2,
        tokens.size_padding_x_3,
        tokens.size_padding_x_4,
        tokens.size_padding_x_6,
        tokens.size_padding_x_8        
    ],
    fonts: {
      base: tokens.font_family_base, 
      mono: tokens.font_family_mono
    },
    borders: [],
    shadows: [],
    radii: [tokens.radius_background_small, tokens.radius_background_medium]

  }