import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { I18nextProvider } from "react-i18next";
import defaultTheme from "../theme";
import i18n from "../i18n";

const Reset = createGlobalStyle({
  body: {
    margin: 0
  }
});

const GlobalStyles = styled.div(({ theme }) => ({
  color: theme.colors.black,
  fontFamily: theme.fonts.base,
  fontSize: theme.fontSizes.medium,
  lineHeight: theme.lineHeights.base,
  "-webkit-font-smoothing": "antialiased",
  "-moz-osx-font-smoothing": "grayscale",
  button: {
    fontFamily: theme.fonts.base
  },
  "*": {
    boxSizing: "border-box"
  },
  img: {
    maxWidth: "100%",
    height: "auto"
  }
}));

const NDSProvider = ({ theme, children, locale }) => {
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <>
      <Reset />
      <GlobalStyles theme={theme}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </I18nextProvider>
      </GlobalStyles>
    </>
  );
};

NDSProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.shape({}),
  locale: PropTypes.string
};

NDSProvider.defaultProps = {
  theme: defaultTheme,
  locale: "en"
};

export default NDSProvider;
