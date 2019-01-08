import React from 'react'
import styled, {createGlobalStyle, ThemeProvider as StyledThemeProvider} from 'styled-components'
import theme from '../theme.js'

const Reset = createGlobalStyle`body {
  margin: 0;
}`

export const GlobalStyles = styled.div`
    font-family: 'IBM Plex Sans';
    line-height: 1.5;

  * {
    box-sizing: border-box; 
  }
`

const ThemeProvider = ({ ...props }) => {
  return (
    <React.Fragment>
      <Reset />
      <StyledThemeProvider theme={theme}>
        <GlobalStyles {...props} />
      </StyledThemeProvider>
    </React.Fragment>
  )
}

export default ThemeProvider