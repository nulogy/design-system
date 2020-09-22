import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { I18nextProvider } from "react-i18next";
import NDSTheme from "../theme";
import i18n from "../i18n";
import { LocaleContext } from "./LocaleContext";
import { mergeThemes } from "./mergeThemes.util";

const Reset = createGlobalStyle(() => {
  return {
    body: {
      margin: 0
    }
  };
});

const ModalStyleOverride = createGlobalStyle(({ theme, locale }) => {
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

const GlobalStyles = styled.div(({ theme, locale }) => {
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
});

const NDSProvider = ({ theme, children, locale = "en_US" }) => {
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);
  const mergedTheme = mergeThemes(NDSTheme, theme);

  return (
    <LocaleContext.Provider value={{ locale }}>
      <Reset theme={mergedTheme} locale={locale} />
      <ModalStyleOverride theme={mergedTheme} locale={locale} />
      <GlobalStyles theme={mergedTheme} locale={locale}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={mergedTheme}>{children}</ThemeProvider>
        </I18nextProvider>
      </GlobalStyles>
    </LocaleContext.Provider>
  );
};

NDSProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.shape({}),
  locale: PropTypes.string
};

NDSProvider.defaultProps = {
  theme: undefined,
  locale: "en_US"
};

export default NDSProvider;
