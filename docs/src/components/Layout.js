import React from "react";
import PropTypes from "prop-types";
import {
  Box, Flex, Link, Text,
} from "@nulogy/components";
import { Helmet } from "react-helmet";
import { createGlobalStyle } from "styled-components";
import { NavItem, Nav } from "./Nav";
import NDSProvider from "../../../components/src/NDSProvider/NDSProvider";
import theme from "../../../components/src/theme";

import logo from "../images/nulogy.svg";
import HighlightStyles from "./HighlightStyles";

const TableStyles = createGlobalStyle`
  table {border: 1px solid #ccc;}
  td {
    border: 1px solid #ccc;
    padding: 8px;
  }
  thead {font-weight: bold;}
`;

const Layout = ({ children }) => (
  <NDSProvider theme={ theme }>
    <Box pb="x2">
      <Helmet titleTemplate="%s | Nulogy Design System">
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>Welcome</title>
        <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono" rel="stylesheet" />
      </Helmet>
      <HighlightStyles />
      <TableStyles />
      <Box
        bg="blackBlue" align="center" mb="x6"
        p="x2"
      >
        <Box
          pl="x3" pr="x3" maxWidth={ 960 }
          m="auto"
        >
          <Flex>
            <Box width={ 1 / 4 }>
              <Link href="/"><img src={ logo } alt="Logo" width="56px" /></Link>
            </Box>
            <Box width={ 3 / 4 } textAlign="right" style={ { position: "relative", top: "14px" } }>
              <Link href="/style/colour" mr="x2" color="white">Visual Style</Link>
              <Link href="/components/buttons" color="white">Components</Link>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Flex width={ 960 } m="auto">
        <Box width="30%">
          <Nav>
            <Text color="darkGrey" fontWeight="medium">Visual Style</Text>
            <NavItem><Link href="/style/colour" underline={ false }>Colour</Link></NavItem>
            <NavItem><Link href="/style/typography" underline={ false }>Typography</Link></NavItem>
            <NavItem><Link href="/style/spacing" underline={ false }>Spacing</Link></NavItem>
          </Nav>
          <Nav>
            <Text color="darkGrey" fontWeight="medium">Components</Text>
            <NavItem><Link href="/components/box" underline={ false }>Box</Link></NavItem>
            <NavItem><Link href="/components/buttons" underline={ false }>Buttons</Link></NavItem>
            <NavItem><Link href="/components/checkbox" underline={ false }>Checkbox</Link></NavItem>
            <NavItem><Link href="/components/flex" underline={ false }>Flex</Link></NavItem>
            <NavItem><Link href="/components/form" underline={ false }>Form</Link></NavItem>
            <NavItem><Link href="/components/headings" underline={ false }>Headings</Link></NavItem>
            <NavItem><Link href="/components/header-validation" underline={ false }>Header Validation</Link></NavItem>
            <NavItem><Link href="/components/iconic-button" underline={ false }>Iconic Button</Link></NavItem>
            <NavItem><Link href="/components/icon" underline={ false }>Icon</Link></NavItem>
            <NavItem><Link href="/components/link" underline={ false }>Link</Link></NavItem>
            <NavItem><Link href="/components/list" underline={ false }>List</Link></NavItem>
            <NavItem><Link href="/components/radio-button" underline={ false }>Radio</Link></NavItem>
            <NavItem><Link href="/components/select" underline={ false }>Select</Link></NavItem>
            <NavItem><Link href="/components/table" underline={ false }>Table</Link></NavItem>
            <NavItem><Link href="/components/text" underline={ false }>Text</Link></NavItem>
            <NavItem><Link href="/components/textarea" underline={ false }>Textarea</Link></NavItem>
            <NavItem><Link href="/components/text-input" underline={ false }>Text input</Link></NavItem>
            <NavItem><Link href="/components/toggle" underline={ false }>Toggle</Link></NavItem>
          </Nav>
          <Nav>
            <Text color="darkGrey" fontWeight="medium">Guides</Text>
            <NavItem><Link href="/guides/layout-model" underline={ false }>Layout Model</Link></NavItem>
          </Nav>
          <Nav>
            <Text color="darkGrey" fontWeight="medium">Resources</Text>
            <NavItem><Link href="/guides/designers" underline={ false }>For Designers</Link></NavItem>
            <NavItem><Link href="/guides/developers" underline={ false }>For Developers</Link></NavItem>
            <NavItem><Link href="https://github.com/nulogy/design-system" underline={ false }>Github</Link></NavItem>
            <NavItem><Link href="/tokens" underline={ false }>Tokens</Link></NavItem>
            <NavItem><Link href="/guides/reading-list" underline={ false }>Reading list</Link></NavItem>
          </Nav>
        </Box>
        <Box width="70%">
          {children}
        </Box>
      </Flex>
    </Box>
  </NDSProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
