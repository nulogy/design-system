type Colors = {
  black: string;
  blackblue: string;
  darkBlue: string;
  blue: string;
  lightBlue: string;
  darkGrey: string;
  grey: string;
  lightGrey: string;
  whiteGrey: string;
  white: string;
  yellow: string;
  lightYellow: string;
  green: string;
  lightGreen: string;
  red: string;
  lightRed: string;
};
type ColorsOptions = keyof Colors;

type FontSizes = {
  smaller: string;
  small: string;
  medium: string;
  large: string;
  larger: string;
  largest: string;
  heading1: string;
  heading2: string;
  heading3: string;
  heading4: string;
};

type LineHeights = {
  base: string;
  smallTextBase: string;
  smallTextCompressed: string;
  smallerText: string;
  heading1: string;
  heading2: string;
  heading3: string;
  heading4: string;
  title: string;
  sectionTitle: string;
  subsectionTitle: string;
};

type FontWeights = {
  light: string;
  normal: string;
  medium: string;
  bold: string;
};

type Space = {
  none: string;
  half: string;
  x1: string;
  x2: string;
  x3: string;
  x4: string;
  x5: string;
  x6: string;
  x8: string;
};

type Fonts = {
  base: string;
  mono: string;
  sc: string;
};

type Borders = Array<any>;

type Shadows = {
  small: string;
  medium: string;
  large: string;
  focus: string;
  error: string;
};

type Radii = {
  small: string;
  medium: string;
  circle: string;
};

type Breakpoints = {
  extraSmall: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
};

type ZIndex = {
  content: string;
  tabsScollIndicator: string;
  tabsBar: string;
  overlay: string;
};

export type ThemeType: { [key: string]: string } = {
  colors: Colors;
  fontSizes: FontSizes;
  lineheights: LineHeights;
  fontWeights: FontWeights;
  space: Space;
  fonts: Fonts;
  borders: Borders;
  shadows: Shadows;
  radii: Radii;
  breakpoints: Breakpoints;
  zIndex: ZIndex;
};
