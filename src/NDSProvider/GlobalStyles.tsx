import styled, { CSSObject } from "styled-components";
import { DefaultNDSThemeType } from "../theme.type";

export type GlobalStylesProps = {
  theme?: DefaultNDSThemeType;
  locale?: string;
};

const GlobalStyles = styled.div(
  ({ theme, locale }: GlobalStylesProps): CSSObject => {
    const fontFamily = locale === "zh_CN" ? theme.fonts.sc : theme.fonts.base;
    return {
      color: theme.colors.black,
      fontFamily,
      fontSize: theme.fontSizes.medium,
      lineHeight: theme.lineHeights.base,
      "-webkit-font-smoothing": "antialiased",
      "-moz-osx-font-smoothing": "grayscale",
      "*": {
        boxSizing: "border-box",
      },
      img: {
        maxWidth: "100%",
        height: "auto",
      },
      button: {
        fontFamily,
      },
      input: {
        fontFamily,
      },
      textarea: {
        fontFamily,
      },
    };
  }
);

export default GlobalStyles;
