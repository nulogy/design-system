import React from "react";
import PropTypes from "prop-types";
import {
  Box, Flex, NDSProvider,
} from "@nulogy/components";
import { Helmet } from "react-helmet";
import { Navigation } from "./Nav";
import theme from "../../../components/src/theme";

import HighlightStyles from "./HighlightStyles";

const Layout = ({ children }) => (
  <NDSProvider theme={ theme }>
    <Flex pb="x2">
      <Helmet titleTemplate="%s | Nulogy Design System">
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>Welcome</title>
        <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono" rel="stylesheet" />
      </Helmet>
      <HighlightStyles />
      <Navigation />
      <Box px="x3" maxWidth="620px" m="0 auto">
        {children}
      </Box>
    </Flex>
  </NDSProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
