import { RecursivePartial } from "./utils/ts/recursivePartial";

interface Colors {
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
}

interface FontSizes {
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
}

interface LineHeights {
  base: string;
  smallTextBase: string;
  smallTextCompressed: string;
  relaxed: string;
  smallerText: string;
  heading1: string;
  heading2: string;
  heading3: string;
  heading4: string;
  title: string;
  sectionTitle: string;
  subsectionTitle: string;
}

interface FontWeights {
  light: number;
  normal: number;
  medium: number;
  bold: number;
}

interface Space {
  none: string;
  half: string;
  x0: string;
  x0_5: string;
  x1: string;
  x1_5: string;
  x2: string;
  x3: string;
  x4: string;
  x5: string;
  x6: string;
  x8: string;
}

interface Fonts {
  base: string;
  mono: string;
  sc: string;
}

type Borders = Array<any>;

interface Shadows {
  small: string;
  medium: string;
  large: string;
  focus: string;
  error: string;
}

interface Radii {
  small: string;
  medium: string;
  circle: string;
  rounded: string;
}

export interface Breakpoints {
  extraSmall: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
}

interface ZIndices {
  content: number;
  tabsScollIndicator: number;
  tabsBar: number;
  overlay: number;
  aboveOverlay: number;
  tableHeader: number;
  modalHeaderAndFooter: number;
  openControl: number;
  sidebar: number;
  navBar: number;
}

export interface DefaultNDSThemeType {
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
}

export type ThemeType = RecursivePartial<DefaultNDSThemeType>;
