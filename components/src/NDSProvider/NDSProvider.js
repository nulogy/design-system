import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "../theme";

const Reset = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400,500,600');
  @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono');

  body {
    margin: 0;
    color: ${theme.colors.black};
  }
  `;

export const GlobalStyles = styled.div`
    font-family: ${theme.fonts.base};
    line-height: ${theme.lineHeights.base};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

  * {
    box-sizing: border-box;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

const NDSProvider = ({ ...props }) => (
  <React.Fragment>
    <Reset />
    <ThemeProvider theme={ theme }>
      <GlobalStyles { ...props } />
    </ThemeProvider>
  </React.Fragment>
);

export default NDSProvider;
