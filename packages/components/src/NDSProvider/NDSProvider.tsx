import React, { useEffect } from "react";
import styled, { createGlobalStyle, ThemeProvider, CSSObject } from "styled-components";
import { I18nextProvider } from "react-i18next";
import NDSTheme from "../theme";
import i18n from "../i18n";
import { LocaleContext } from "./LocaleContext";
import { mergeThemes } from "./mergeThemes.util";
import { ThemeType } from "../theme.type";
const Reset = createGlobalStyle(() => {
  return {
    body: {
      margin: 0
    }
  };
});
const ModalStyleOverride = createGlobalStyle(({ theme, locale }: NDSProviderProps) => {
  const fontFamily = locale === "zh_CN" ? theme.fonts.sc : theme.fonts.base;
  return {
    ".ReactModal__Content": {
      fontFamily,
      button: {
        fontFamily
      },
      input: {
        fontFamily
      },
      textarea: {
        fontFamily
      }
    }
  };
});
const GlobalStyles: React.SFC<NDSProviderProps> = styled.div(
  ({ theme, locale }: any): CSSObject => {
    const fontFamily = locale === "zh_CN" ? theme.fonts.sc : theme.fonts.base;
    return {
      color: theme.colors.black,
      fontFamily,
      fontSize: theme.fontSizes.medium,
      lineHeight: theme.lineHeights.base,
      "-webkit-font-smoothing": "antialiased",
      "-moz-osx-font-smoothing": "grayscale",
      "*": {
        boxSizing: "border-box"
      },
      img: {
        maxWidth: "100%",
        height: "auto"
      },
      button: {
        fontFamily
      },
      input: {
        fontFamily
      },
      textarea: {
        fontFamily
      }
    };
  }
);
type NDSProviderProps = {
  theme?: ThemeType;
  locale?: string;
};
const NDSProvider: React.SFC<NDSProviderProps> = ({ theme, children, locale = "en_US" }) => {
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);
  const mergedTheme = mergeThemes(NDSTheme, theme);
  return (
    <LocaleContext.Provider value={{ locale }}>
      <Reset />
      <ModalStyleOverride theme={mergedTheme} locale={locale} />
      <GlobalStyles theme={mergedTheme} locale={locale}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={mergedTheme}>{children}</ThemeProvider>
        </I18nextProvider>
      </GlobalStyles>
    </LocaleContext.Provider>
  );
};
export default NDSProvider;
