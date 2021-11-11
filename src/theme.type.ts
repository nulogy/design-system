type Colors = {
  black: string;
  blackBlue: string;
  darkBlue: string;
  blue: string;
  lightBlue: string;
  darkGrey: string;
  midGrey: string;
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
  categorical1: string;
  categorical2: string;
  categorical3: string;
  categorical4: string;
  categorical5: string;
  categorical6: string;
};

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
  light: number;
  normal: number;
  medium: number;
  bold: number;
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

type ZIndices = {
  content: number;
  tabsScollIndicator: number;
  tabsBar: number;
  overlay: number;
  tableHeader: number;
  modalHeaderAndFooter: number;
  openControl: number;
  sidebar: number;
  navBar: number;
};

export type DefaultNDSThemeType = {
  colors: Colors;
  fontSizes: FontSizes;
  lineHeights: LineHeights;
  fontWeights: FontWeights;
  space: Space;
  sizes: Space;
  fonts: Fonts;
  borders: Borders;
  shadows: Shadows;
  radii: Radii;
  breakpoints: Breakpoints;
  zIndices: ZIndices;
};

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type ThemeType = RecursivePartial<DefaultNDSThemeType>;
