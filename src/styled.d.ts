import type { CSSProp } from "styled-components";
import { DefaultNDSThemeType } from "./theme/theme.type";
import {} from "react";

declare module "styled-components" {
  export interface DefaultTheme extends DefaultNDSThemeType {}
}

declare module "react" {
  interface Attributes {
    css?: CSSProp | undefined;
  }
}
