import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Box,
  Flex,
  NavBarSearch,
} from "ComponentsRoot";
import Branding from "./Branding";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { withMenuState } from "./withMenuState";
import theme from "../theme";

const navBarStyles = {
  background: theme.colors.blackBlue,
  paddingTop: theme.space.x2,
  paddingRight: theme.space.x3,
  paddingBottom: theme.space.x2,
  paddingLeft: theme.space.x4,
};

const MediumNavBar = ({
  menuData,
  desktopSrc,
  alt,
  ...props
}) => (
  <Box { ...props }>
    <Branding desktopSrc={ desktopSrc } alt={ alt } />
    <nav>
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <DesktopMenu menuData={ menuData.primaryMenu } />
        </Flex>
        <Flex alignItems="center">
          <Flex maxWidth="18em" px="x3">
            <NavBarSearch />
          </Flex>
          <DesktopMenu menuData={ menuData.secondaryMenu } />
        </Flex>
      </Flex>
    </nav>
  </Box>
);

const SmallNavBar = withMenuState(({
  menuData,
  menuState,
  mobileSrc,
  alt,
  style,
  ...props
}) => (
  <Box { ...props } style={ Object.assign({}, { height: menuState.isOpen ? "100vh" : null, position: "relative", overflow: "auto" }, style) }>
    <Branding mobileSrc={ mobileSrc } alt={ alt } />
    <nav>
      <Flex justifyContent="flex-end">
        <Flex maxWidth="18em" alignItems="center" px="0">
          <NavBarSearch />
        </Flex>
        <MobileMenu menuData={ menuData.primaryMenu } menuState={ menuState } display="block" />
      </Flex>
    </nav>
  </Box>
));

const BaseNavBar = ({
  menuData,
  desktopSrc,
  mobileSrc,
  alt,
  ...props
}) => (
  <header { ...props }>
    <MediumNavBar menuData={ menuData } display={ { small: "none", medium: "none", large: "flex" } } style={ navBarStyles } />
    <SmallNavBar menuData={ menuData } display={ { small: "flex", medium: "flex", large: "none" } } style={ navBarStyles } />
  </header>
);

BaseNavBar.propTypes = {
  menuData: PropTypes.shape({
    "primary": PropTypes.shape({}),
    "secondary": PropTypes.shape({}),
  }),
  alt: PropTypes.string,
  className: PropTypes.string,
};

BaseNavBar.defaultProps = {
  menuData: null,
  alt: undefined,
  className: null,
};

const NavBar = styled(BaseNavBar)({
  "nav": {
    flexGrow: "1",
    margin: `0 0 0 ${theme.space.x3}`,
  },
});

export default NavBar;
