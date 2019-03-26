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
  padding: `${theme.space.x2} ${theme.space.x3}`,
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
      <Flex justifyContent="space-between" alignContent="flex-end">
        {menuData.primaryMenu && <Flex alignItems="center"><DesktopMenu menuData={ menuData.primaryMenu } /></Flex>}
        <Box width={ 1 }>
          <Flex style={ { "float": "right" } }>
            { menuData.search && <Flex maxWidth="18em" px="x3"><NavBarSearch { ...menuData.search } /></Flex>}
            {menuData.secondaryMenu && <DesktopMenu menuData={ menuData.secondaryMenu } />}
          </Flex>
        </Box>
      </Flex>
    </nav>
  </Box>
);

MediumNavBar.propTypes = {
  alt: PropTypes.string,
  desktopSrc: PropTypes.string,
  menuData: PropTypes.shape({
    "primary": PropTypes.shape({}),
    "secondary": PropTypes.shape({}),
  }),
};

MediumNavBar.defaultProps = {
  alt: null,
  desktopSrc: undefined,
  menuData: null,
};

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
        {menuData.search && <Flex maxWidth="18em" alignItems="center" px="0"><NavBarSearch { ...menuData.search } /></Flex>}
        {
          (menuData.primaryMenu || menuData.secondaryMenu)
            && <MobileMenu menuData={ menuData } menuState={ menuState } display="block" />
        }
      </Flex>
    </nav>
  </Box>
));

const BaseNavBar = ({
  menuData,
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
  className: PropTypes.string,
};

BaseNavBar.defaultProps = {
  menuData: null,
  className: null,
};

const NavBar = styled(BaseNavBar)({
  "nav": {
    flexGrow: "1",
    margin: `0 0 0 ${theme.space.x3}`,
  },
});

export default NavBar;
