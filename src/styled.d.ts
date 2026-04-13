import { DefaultNDSThemeType } from "./theme/theme.type";

declare module "styled-components" {
  export interface DefaultTheme extends DefaultNDSThemeType {}
}
