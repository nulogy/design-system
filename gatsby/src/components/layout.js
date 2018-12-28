// TO-DO: https://www.npmjs.com/package/gatsby-plugin-layout

import React from 'react'
import { NavItem, Nav, NavLink} from '../components/Nav'
import styled, {ThemeProvider} from 'styled-components'
import { Flex } from '../../../components/src/Flex'
import { Box } from '../../../components/src/Box'
import theme from '../../../components/src/theme'
import '../../../css/dist/nds.css';

import logo from '../images/nulogy.svg'

export default ({ children }) => (
  <Flex style={{borderTop: '32px solid #011E38', paddingTop: '64px'}}>
    <Box p={`0 48px 64px 48px`} width={1/4} color='white' bg='blackBlue'>
      <a href="/"><img src={logo} alt="Logo" width="112px" /></a>
      <Nav>
        <NavItem>
          <a href="#">Style</a>
          <Nav>
            <NavItem><a href="/style/colour">Colour</a></NavItem>
            <NavItem><a href="#">Typography</a></NavItem>
            <NavItem><a href="#">Spacing</a></NavItem>
            <NavItem><a href="#">Iconography</a></NavItem>
          </Nav>
        </NavItem>
        <NavItem>
          <a href="#">Components</a>
          <Nav>
            <NavItem><a href="#">Buttons</a></NavItem>
            <NavItem><a href="#">Form</a></NavItem>
            <NavItem><a href="#">Table</a></NavItem>
          </Nav>
        </NavItem>
        <NavItem><a href="#">Tokens</a></NavItem>
        <NavItem><a href="#">Designers Guide</a></NavItem>
        <NavItem><a href="#">Developers Guide</a></NavItem>
      </Nav>
    </Box>
    <Box p={`48px 48px 48px 0`} width={3/4}>
    {children}
    </Box>
  </Flex>
)