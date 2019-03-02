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
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import MenuItem from "./MenuItem";
import theme from "../theme";

const BaseHeader = ({
  menuData,
  ...props
}) => (
  <header { ...props }>
    <Branding />
    <nav>
      <Flex justifyContent={ { small: "flex-end", medium: "flex-end", large: "space-between" } }>
        <Flex>
          <Flex alignItems="center">
            <DesktopMenu menuData={ menuData.primary } display={ { small: "none", medium: "none", large: "flex" } } />
          </Flex>
          <Flex maxWidth="18em" alignItems="center" px={ { small: "0", medium: "0", large: "x3" } } flexGrow={ { small: "0", medium: "0", large: "1" } }>
            <HeaderSearch />
          </Flex>
        </Flex>
        <DesktopMenu menuData={ menuData.secondary } display={ { small: "none", medium: "none", large: "flex" } } />
        <MobileMenu display={ { small: "block", medium: "block", large: "none" } } />
      </Flex>
    </nav>
  </header>
);

const Header = styled(BaseHeader)({
  background: theme.colors.blackBlue,
  paddingTop: theme.space.x2,
  paddingRight: theme.space.x3,
  paddingBottom: theme.space.x2,
  paddingLeft: theme.space.x4,
  display: "flex",
  alignItems: "center",
  "nav": {
    flexGrow: "1",
    margin: `0 0 0 ${theme.space.x3}`,
  },
});

BaseHeader.propTypes = {
  className: PropTypes.string,
};

BaseHeader.defaultProps = {
  className: null,
};

export default Header;
