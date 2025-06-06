import { RecursivePartial } from "../utils/ts/recursivePartial";

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
  base: string;
  large: string;
  larger: string;
  largest: string;
  heading1: string;
  heading2: string;
  heading3: string;
  heading4: string;
  xxs: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

interface LineHeights {
  base: string;
  baseRelaxed: string;
  smallTextBase: string;
  smallRelaxed: string;
  smallTextCompressed: string;
  smallerText: string;
  smallerRelaxed: string;
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
  x0_25: string;
  x0_5: string;
  x0_75: string;
  x1: string;
  x1_25: string;
  x1_5: string;
  x1_75: string;
  x2: string;
  x2_5: string;
  x3: string;
  x4: string;
  x5: string;
  x6: string;
  x7: string;
  x8: string;
  x9: string;
  x10: string;
  x11: string;
  x12: string;
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
  large: string;
  circle: string;
  rounded: string;
}

export interface Breakpoints {
  extraSmall: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
  phonePortrait: string;
  phoneLandscape: string;
  tabletPortrait: string;
  tabletLandscape: string;
  laptop: string;
  desktop: string;
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
