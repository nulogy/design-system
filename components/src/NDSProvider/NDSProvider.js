import React from "react";
import PropTypes from "prop-types";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import defaultTheme from "../theme";

const Reset = createGlobalStyle({
  body: {
    margin: 0
  }
});

const GlobalStyles = styled.div(({ theme }) => ({
  color: theme.colors.black,
  fontFamily: theme.fonts.base,
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

const NDSProvider = ({ theme, children }) => (
  <React.Fragment>
    <Reset />
    <GlobalStyles theme={theme}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </GlobalStyles>
  </React.Fragment>
);

NDSProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.shape({})
};

NDSProvider.defaultProps = {
  theme: defaultTheme
};

export default NDSProvider;
