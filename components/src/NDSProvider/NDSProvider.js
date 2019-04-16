import React from "react";
import PropTypes from "prop-types";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import defaultTheme from "../theme";

const GlobalStyles = createGlobalStyle(({ theme }) => ({
  "body": {
    margin: 0,
    color: theme.colors.black,
    fontFamily: theme.fonts.base,
    lineHeight: theme.lineHeights.base,
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
  },
  "button": {
    fontFamily: theme.fonts.base,
  },
  "*": {
    boxSizing: "border-box",
  },
  "img": {
    maxWidth: "100%",
    height: "auto",
  },
}));

const NDSProvider = ({ theme, children }) => (
  <React.Fragment>
    <GlobalStyles theme={ theme } />
    <ThemeProvider theme={ theme }>
      { children }
    </ThemeProvider>
  </React.Fragment>
);

NDSProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.shape({}),
};

NDSProvider.defaultProps = {
  theme: defaultTheme,
};

export default NDSProvider;
