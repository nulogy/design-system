import React from 'react'
import {NavItem, Nav} from '../components/Nav'
import ThemeProvider from '../../../components/src/ThemeProvider/ThemeProvider'
import {Box, Flex, Link, Text} from '@nulogy/components'
import theme from '../../../components/src/theme'
import { Helmet } from 'react-helmet'

import logo from '../images/nulogy.svg'

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <Box>
      <Helmet titleTemplate="%s | Nulogy Design System">
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>Welcome</title>
      </Helmet>
      <Box bg='blackBlue' align='center' mb={3} p={3}>
        <Box pl={4} pr={4} maxWidth={1240} m='auto'>
          <Flex>
            <Box width={1/4}>
              <Link href="/"><img src={logo} alt="Logo" width="56px" /></Link>
            </Box>
            <Box width={3/4} textAlign='right'>
              <Link href='/style/colour' mr={3} color='white'>Visual Style</Link>
              <Link href='/components/buttons' color='white'>Components</Link>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Flex maxWidth={1240} m='auto'>
        <Box pt={6} width={'20%'}>
          <Nav>
              <Text color='darkGrey' fontWeight={2}>Visual Style</Text>
                <NavItem><Link href="/style/colour" underline={false}>Colour</Link></NavItem>            
                <NavItem><Link href="/style/typography" underline={false}>Typography</Link></NavItem>
                <NavItem><Link href="/style/spacing" underline={false}>Spacing</Link></NavItem>
            </Nav>
            <Nav>
              <Text color='darkGrey' fontWeight={2}>Components</Text>
              <NavItem><Link href="/components/buttons" underline={false}>Buttons</Link></NavItem>
            </Nav>
            <Nav>
              <Text color='darkGrey' fontWeight={2}>Resources</Text>
              <NavItem><Link href="/" underline={false}>Getting started</Link></NavItem>
              <NavItem><Link href="https://github.com/nulogy/design-system" underline={false}>Github</Link></NavItem>
            </Nav>
        </Box>
        <Box width={'80%'}>
        {children}
        </Box>        
      </Flex>
    </Box>
  </ThemeProvider>
)
