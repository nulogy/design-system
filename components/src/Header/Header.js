import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Flex,
  Box,
  HeaderSearch,
  Icon,
} from "ComponentsRoot";
import Branding from "./Branding";
import Nav, { MenuTrigger } from "./Nav";
import MenuItem from "./MenuItem";
import theme from "../theme";

const BaseHeader = ({
  className,
  ...props,
}) => (
  <Box className={className} py="x2" px="x3" pl="x4">
    <header { ...props }>
      <Branding />
      <nav>
        <Flex justifyContent={ { small: "flex-end", medium: "flex-end", large: "space-between" } }>
          <Flex alignItems="center" px={ { small: "0", medium: "0", large: "x3" } } mx={ { small: "0", medium: "0", large: "x2" } } flexGrow={ { small: "0", medium: "0", large: "1" } }>
            <HeaderSearch />
          </Flex>
          <MenuTrigger display={ { small: "block", medium: "block", large: "none" } } />
          <Flex alignItems="center" order={ { small: "0", medium: "0", large: "-1" } }>
            <Nav className="primary" />
          </Flex>
          <Nav className="secondary" />
        </Flex>
      </nav>
    </header>
  </Box>
);

const Header = styled(BaseHeader)(
  {
    background: theme.colors.blackBlue,
    "header": {
      display: "flex",
      alignItems: "center",
      "nav": {
        flexGrow: "1",
        margin: `0 0 0 ${theme.space.x3}`
      },
    },
  },
);

BaseHeader.propTypes = {
  className: PropTypes.string,
};

BaseHeader.defaultProps = {
  className: null,
};

export default Header;
