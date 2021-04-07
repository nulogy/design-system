import React, { useEffect } from "react";
import styled, {
  createGlobalStyle,
  ThemeProvider,
  CSSObject,
} from "styled-components";
import { I18nextProvider } from "react-i18next";
import NDSTheme from "../theme";
import i18n from "../i18n";
import { ThemeType, DefaultNDSThemeType } from "../theme.type";
import { LocaleContext } from "./LocaleContext";
import { mergeThemes } from "./mergeThemes.util";

type NDSProviderProps = {
  theme?: ThemeType;
  locale?: string;
  disableGlobalStyles?: boolean;
  children?: any;
};

const Reset = createGlobalStyle(() => {
  return {
    body: {
      margin: 0,
    },
  };
});
type GlobalStylesProps = {
  theme?: DefaultNDSThemeType;
  locale?: string;
};

const ModalStyleOverride = createGlobalStyle(
  ({ theme, locale }: GlobalStylesProps) => {
    const fontFamily = locale === "zh_CN" ? theme.fonts.sc : theme.fonts.base;
    return {
      ".ReactModal__Content": {
        fontFamily,
        button: {
          fontFamily,
        },
        input: {
          fontFamily,
        },
        textarea: {
          fontFamily,
        },
      },
    };
  }
);
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

type AllNDSGlobalStylesProps = {
  theme?: DefaultNDSThemeType;
  locale?: string;
  disableGlobalStyles?: boolean;
  children?: any;
};

const AllNDSGlobalStyles = ({
  theme,
  locale,
  disableGlobalStyles,
  children,
}: AllNDSGlobalStylesProps) =>
  !disableGlobalStyles ? (
    <>
      <Reset />
      <ModalStyleOverride theme={theme} locale={locale} />
      <GlobalStyles theme={theme} locale={locale}>
        {children}
      </GlobalStyles>
    </>
  ) : (
    children
  );

const NDSProvider = ({
  theme,
  children,
  disableGlobalStyles = false,
  locale = "en_US",
}: NDSProviderProps) => {
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);
  const mergedTheme = mergeThemes(NDSTheme, theme);
  return (
    <LocaleContext.Provider value={{ locale }}>
      <AllNDSGlobalStyles
        theme={mergedTheme}
        locale={locale}
        disableGlobalStyles={disableGlobalStyles}
      >
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={mergedTheme}>{children}</ThemeProvider>
        </I18nextProvider>
      </AllNDSGlobalStyles>
    </LocaleContext.Provider>
  );
};
export default NDSProvider;
