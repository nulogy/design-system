import React from "react";
import styled, { createGlobalStyle, ThemeProvider as StyledThemeProvider } from "styled-components";
import theme from "../theme";

const Reset = createGlobalStyle`body {
  margin: 0;
}`;

export const GlobalStyles = styled.div`
    font-family: 'IBM Plex Sans';
    line-height: 1.5;

  * {
    box-sizing: border-box; 
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

const ThemeProvider = ({ ...props }) => (
  <React.Fragment>
    <Reset />
    <StyledThemeProvider theme={ theme }>
      <GlobalStyles { ...props } />
    </StyledThemeProvider>
  </React.Fragment>
);

export default ThemeProvider;
