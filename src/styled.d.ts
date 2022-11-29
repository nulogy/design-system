import {} from "styled-components";
import theme from "./theme";
// import { ThemeType } from "./theme.type";

declare module "styled-components" {
  type Theme = typeof theme;
  export interface DefaultTheme extends Theme {}
  // export interface DefaultTheme extends ThemeType {}
}

declare module "styled-system";
