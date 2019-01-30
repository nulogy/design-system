import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "../theme";

const Reset = createGlobalStyle`body {
  margin: 0;
  color: ${theme.colors.black};
}`;

export const GlobalStyles = styled.div`
    font-family: 'IBM Plex Sans';
    line-height: 1.5;
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
