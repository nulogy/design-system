import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Box, Flex, NDSProvider,
} from "@nulogy/components";
import { Helmet } from "react-helmet";
import { Navigation } from "./Nav";
import theme from "../../../components/src/theme";

import HighlightStyles from "./HighlightStyles";

const ScrollContainer = styled.div({
  height: "100vh",
  width: "100%",
  "@media screen and (min-width: 1024px)": {
    overflow: "auto",
  },
});

const Layout = ({ children }) => (
  <NDSProvider theme={ theme }>
    <Flex flexDirection={ { small: "column", large: "row" } }>
      <Helmet titleTemplate="%s | Nulogy Design System">
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>Welcome</title>
        <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono" rel="stylesheet" />
      </Helmet>
      <HighlightStyles />
      <Navigation />
      <ScrollContainer>
        <Box pt={ { small: 0, large: "x8" } } px="x3" maxWidth="620px" m="0 auto">
          {children}
        </Box>
      </ScrollContainer>
    </Flex>
  </NDSProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;


// take off height/width/overflow
// remove intro padding on small screen
