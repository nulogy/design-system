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
  search,
  desktopSrc,
  alt,
  ...props
}) => (
  <Box { ...props }>
    <Branding desktopSrc={ desktopSrc } alt={ alt } />
    <nav>
      <Flex justifyContent="space-between" alignContent="flex-end">
        <Flex alignItems="center">
          <DesktopMenu menuData={ menuData.primaryMenu } />
        </Flex>
        <Box width={1}>
          <Flex style={{"float": "right"}}>
            {search && <Flex maxWidth="18em" px="x3"><NavBarSearch /></Flex>}
            <DesktopMenu menuData={ menuData.secondaryMenu } />
          </Flex>
        </Box>
      </Flex>
    </nav>
  </Box>
);

MediumNavBar.propTypes = {
  alt: PropTypes.string,
  desktopSrc: PropTypes.string,
  search: PropTypes.bool,
  menuData: PropTypes.shape({
    "primary": PropTypes.shape({}),
    "secondary": PropTypes.shape({}),
  }),
};

MediumNavBar.defaultProps = {
  alt: null,
  desktopSrc: undefined,
  menuData: null,
  search: false,
};

const SmallNavBar = withMenuState(({
  menuData,
  search,
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
        {search && <Flex maxWidth="18em" alignItems="center" px="0"><NavBarSearch /></Flex>}
        <MobileMenu menuData={ menuData } menuState={ menuState } display="block" />
      </Flex>
    </nav>
  </Box>
));

const BaseNavBar = ({
  menuData,
  search,
  ...props
}) => (
  <header { ...props }>
    <MediumNavBar search = {search} menuData={ menuData } display={ { small: "none", medium: "none", large: "flex" } } style={ navBarStyles } />
    <SmallNavBar search = {search} menuData={ menuData } display={ { small: "flex", medium: "flex", large: "none" } } style={ navBarStyles } />
  </header>
);

BaseNavBar.propTypes = {
  menuData: PropTypes.shape({
    "primary": PropTypes.shape({}),
    "secondary": PropTypes.shape({}),
  }),
  className: PropTypes.string,
  search: PropTypes.bool,
};

BaseNavBar.defaultProps = {
  menuData: null,
  className: null,
  search: false,
};

const NavBar = styled(BaseNavBar)({
  "nav": {
    flexGrow: "1",
    margin: `0 0 0 ${theme.space.x3}`,
  },
});

export default NavBar;
