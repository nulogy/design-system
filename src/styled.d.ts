import { DefaultNDSThemeType } from "./theme.type";

declare module "styled-components" {
  export interface DefaultTheme extends DefaultNDSThemeType {}
}
