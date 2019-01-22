import React from 'react'
import {NavItem, Nav} from '../components/Nav'
import ThemeProvider from '../../../components/src/ThemeProvider/ThemeProvider'
import {Box, Flex, Link, Text} from '@nulogy/components'
import theme from '../../../components/src/theme'
import { Helmet } from 'react-helmet'

import logo from '../images/nulogy.svg'

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <Box pb={3}>
      <Helmet titleTemplate="%s | Nulogy Design System">
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>Welcome</title>
      </Helmet>
      <Box bg='blackBlue' align='center' mb={3} p={3}>
        <Box pl={4} pr={4} maxWidth={960} m='auto'>
          <Flex>
            <Box width={1/4}>
              <Link href="/"><img src={logo} alt="Logo" width="56px" /></Link>
            </Box>
            <Box width={3/4} textAlign={'right'}>
              <Link href='/style/colour' mr={3} color='white' hover='white' >Visual Style</Link>
              <Link href='/components/buttons' color='white' hover='white'>Components</Link>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Flex width={960} m='auto'>
        <Box pt={7} width={'30%'}>
          <Nav>
              <Text color='darkGrey' fontWeight={2}>Visual Style</Text>
                <NavItem><Link href="/style/colour" underline={false}>Colour</Link></NavItem>            
                <NavItem><Link href="/style/typography" underline={false}>Typography</Link></NavItem>
                <NavItem><Link href="/style/spacing" underline={false}>Spacing</Link></NavItem>
            </Nav>
            <Nav>
              <Text color='darkGrey' fontWeight={2}>Components</Text>
              <NavItem><Link href="/components/buttons" underline={false}>Buttons</Link></NavItem>
              <NavItem><Link href="/components/checkbox" underline={false}>Checkbox</Link></NavItem>
              <NavItem><Link href="/components/form" underline={false}>Form</Link></NavItem>
              <NavItem><Link href="/components/icons" underline={false}>Icons</Link></NavItem>
              <NavItem><Link href="/components/radio-button" underline={false}>Radio button</Link></NavItem>
              <NavItem><Link href="/components/select" underline={false}>Select</Link></NavItem>
              <NavItem><Link href="/components/table" underline={false}>Table</Link></NavItem>
              <NavItem><Link href="/components/text-input" underline={false}>Text input</Link></NavItem>
              <NavItem><Link href="/components/toggle" underline={false}>Toggle</Link></NavItem>
            </Nav>
            <Nav>
              <Text color='darkGrey' fontWeight={2}>Resources</Text>
              <NavItem><Link href="/guides/get-started" underline={false}>Get started</Link></NavItem>
              <NavItem><Link href="https://github.com/nulogy/design-system" underline={false}>Github</Link></NavItem>
              <NavItem><Link href="/tokens" underline={false}>Tokens</Link></NavItem>
              <NavItem><Link href="/guides/reading-list" underline={false}>Reading list</Link></NavItem>
            </Nav>
        </Box>
        <Box width={'70%'}>
        {children}
        </Box>        
      </Flex>
    </Box>
  </ThemeProvider>
)
