import React from "react";
import PropTypes from "prop-types";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "../theme";

const GlobalStyles = createGlobalStyle({
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
});

const NDSProvider = ({ children }) => (
  <React.Fragment>
    <GlobalStyles />
    <ThemeProvider theme={ theme }>
      { children }
    </ThemeProvider>
  </React.Fragment>
);

NDSProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NDSProvider;
