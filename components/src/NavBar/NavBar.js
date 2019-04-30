import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box } from "../Box";
import { Flex } from "../Flex";
import { Icon } from "../Icon";
import NavBarSearch from "../NavBarSearch/NavBarSearch";
import Branding from "./Branding";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { withMenuState } from "./withMenuState";
import isValidMenuItem from "./isValidMenuItem";
import theme from "../theme";
import { subPx } from "../Utils"

const MediumNavBar = ({
  menuData,
  desktopSrc,
  alt,
  ...props
}) => (
  <Box { ...props }>
    <Branding desktopSrc={ desktopSrc } alt={ alt } />
    <Flex justifyContent="space-between" alignContent="flex-end" style={ { flexGrow: "1", margin: `0 0 0 ${theme.space.x3}` } }>
      {menuData.primaryMenu && 
      <Flex alignItems="center" pr="x3" >
        <DesktopMenu menuData={ menuData.primaryMenu } />
      </Flex>
      }
      <Box width={ 1 }>
        <Flex style={ { "float": "right" } }>
          {menuData.search && 
          <Flex maxWidth="18em">
            <NavBarSearch { ...menuData.search } />
          </Flex>
          }
          {menuData.secondaryMenu && 
          <DesktopMenu pl="x2" menuData={ menuData.secondaryMenu } />
          }
        </Flex>
      </Box>
    </Flex>
  </Box>
);

MediumNavBar.propTypes = {
  alt: PropTypes.string,
  desktopSrc: PropTypes.string,
  menuData: PropTypes.shape({}),
};

MediumNavBar.defaultProps = {
  alt: null,
  desktopSrc: undefined,
  menuData: null,
};

const MobileMenuTrigger = styled.button(
  {
    color: theme.colors.white,
    background: "none",
    border: "none",
    padding: `${subPx(theme.space.x1)} ${theme.space.x1}`,
    marginLeft: theme.space.x1,
    borderRadius: theme.radii.medium,
    transition: ".2s",
    "&:hover, &:focus": {
      outline: "none",
      color: theme.colors.lightBlue,
      backgroundColor: theme.colors.black,
      cursor: "pointer",
    },
  }
);

const SmallNavBar = withMenuState(({
  menuData,
  menuState: { isOpen, handleMenuToggle, closeMenu },  
  mobileSrc,
  alt,
  style,
  ...props
}) => (
  <>
  <Box { ...props } style={ Object.assign({}, { position: "relative", overflow: "auto" }, style) }>
    <Branding mobileSrc={ mobileSrc } alt={ alt } />
    <Flex justifyContent="flex-end" style={ { flexGrow: "1", margin: `0 0 0 ${theme.space.x3}` } }>
      {menuData.search && 
        <Flex maxWidth="18em" alignItems="center" px="0">
          <NavBarSearch { ...menuData.search } />
        </Flex>
      }
      {(menuData.primaryMenu || menuData.secondaryMenu) && 
        <MobileMenuTrigger onClick={ handleMenuToggle } aria-expanded={ isOpen ? true : null }>
          {
          isOpen
            ? <Icon icon="close" title="Close Menu" />
            : <Icon icon="menu" title="Open Menu" />
          }
        </MobileMenuTrigger>
      }
    </Flex>
  </Box>
      {(isOpen) && 
        <nav>
          <MobileMenu menuData={ menuData } closeMenu={ closeMenu }/>
        </nav>
      }
    </>
));

const navBarStyles = {
  background: theme.colors.blackBlue,
  padding: `${theme.space.x2} ${theme.space.x3}`,
};

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
    "primaryMenu": PropTypes.arrayOf(isValidMenuItem),
    "secondaryMenu": PropTypes.arrayOf(isValidMenuItem),
    "search": PropTypes.shape({
      "onSubmit": PropTypes.func,
    }),
  }),
  className: PropTypes.string,
};

BaseNavBar.defaultProps = {
  menuData: null,
  className: null,
};

const NavBar = styled(BaseNavBar)({});

export default NavBar;
