import React from "react";
import PropTypes from "prop-types";
import { Box, NDSProvider } from "@nulogy/components";
import { Helmet } from "react-helmet";
import { Navigation } from "./Nav";

import HighlightStyles from "./HighlightStyles";

const Layout = ({ children }) => (
  <NDSProvider locale="en_US">
    <Box>
      <Helmet titleTemplate="%s | Nulogy Design System">
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>Welcome</title>
        <link
          href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400,500,600"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono"
          rel="stylesheet"
        />
      </Helmet>
      <HighlightStyles />
      <Navigation />
      <Box ml={{ extraSmall: 0, medium: "220px" }}>
        <Box
          pt={{ extraSmall: 0, medium: "x8" }}
          px="x3"
          maxWidth="740px"
          m="0 auto"
        >
          {children}
        </Box>
      </Box>
    </Box>
  </NDSProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
