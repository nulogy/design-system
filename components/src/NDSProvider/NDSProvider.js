import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "../theme";

const Reset = createGlobalStyle(
  ["@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400,500,600');"],
  ["@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono');"],
  {
    "body": {
      margin: 0,
      color: theme.colors.black,
    },
  }
);

export const GlobalStyles = styled.div({
  fontFamily: "IBM Plex Sans",
  lineHeight: "1.5",
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

const NDSProvider = ({ ...props }) => (
  <React.Fragment>
    <Reset />
    <ThemeProvider theme={ theme }>
      <GlobalStyles { ...props } />
    </ThemeProvider>
  </React.Fragment>
);

export default NDSProvider;
