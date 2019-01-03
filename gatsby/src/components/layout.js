import React from 'react'
// import { NavItem, Nav, NavLink} from '../components/Nav'
import styled, {ThemeProvider} from 'styled-components'
import {Box, Flex} from '@nulogy/components'
import theme from '../../../components/src/theme'
import '../../../css/dist/nds.css';

import logo from '../images/nulogy.svg'

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1250px;
`

Container.defaultProps = {
  theme: theme
}

export default ({ children }) => (
  <ThemeProvider theme={theme}>
  <Box>
    <Box bg='blackBlue' align='center' p={3}>
    <Box pl={4} pr={4} maxWidth={1000} m='auto'>
    <Flex>
      <Box width={1/2}>
        <a href="/"><img src={logo} alt="Logo" width="56px" /></a>
      </Box>
      <Box width={1/2} textAlign='right'>
      <ul>
        <li style={{'display': 'inline'}}><a style={{'color': '#fff', paddingRight: '24px', 'textDecoration': 'none'}} href="/style/colour">Visual Style</a></li>
        <li style={{'display': 'inline'}}><a style={{'color': '#fff', paddingRight: '24px', 'textDecoration': 'none'}} href="/components">Components</a></li>
        <li style={{'display': 'inline'}}><a a style={{'color': '#fff', paddingRight: '24px', 'textDecoration': 'none'}} href="/tokens">Tokens</a></li>
        <li style={{'display': 'inline'}}><a a style={{'color': '#fff', paddingRight: '24px', 'textDecoration': 'none'}} href="/resources">Resources</a></li>
      </ul>
      </Box>
      </Flex>
      </Box>
    </Box>
      <Box pt={6} pl={4} pr={4} maxWidth={1000} m='auto'>
        {children}
      </Box>
    </Box>
  </ThemeProvider>
)


// <Nav>
// <NavItem>
//   <a href="#">Visual Style</a>
//   <Nav>
//     <NavItem><a href="/style/colour">Colour</a></NavItem>
//     <NavItem><a href="/style/typography">Typography</a></NavItem>
//     <NavItem><a href="/style/spacing">Spacing</a></NavItem>
//     <NavItem><a href="/style/iconography">Iconography</a></NavItem>
//   </Nav>
// </NavItem>
// <NavItem><a href="#">Components</a>
// </NavItem>
// <NavItem><a href="/tokens">Tokens</a></NavItem>
// <NavItem><a href="/guides/designers">Designers Guide</a></NavItem>
// <NavItem><a href="/guides/developers">Developers Guide</a></NavItem>
// </Nav>