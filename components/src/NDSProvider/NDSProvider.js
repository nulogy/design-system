import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "../theme";

const Reset = createGlobalStyle(
  {
    "body": {
      margin: 0,
      color: theme.colors.black,
    },
    "button": {
      fontFamily: theme.fonts.base,
    },
  }
);

export const GlobalStyles = styled.div({
  fontFamily: theme.fonts.base,
  lineHeight: theme.lineHeights.base,
  "-webkit-font-smoothing": "antialiased",
  "-moz-osx-font-smoothing": "grayscale",
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
    <Reset />
    <GlobalStyles />
    <ThemeProvider theme={ theme }>
      { children }
    </ThemeProvider>
  </React.Fragment>
);

export default NDSProvider;
