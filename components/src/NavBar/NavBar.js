import React from "react";
import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import { Flex } from "../Flex";
import { Box } from "../Box";
import { Icon } from "../Icon";
import { Link } from "../Link";
import NavBarSearch from "../NavBarSearch/NavBarSearch";
import { Branding } from "../Branding";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { withMenuState } from "./withMenuState";
import isValidMenuItem from "./isValidMenuItem";
import theme from "../theme";
import { subPx, withWindowDimensions } from "../utils";

const LockBody = createGlobalStyle(({ isOpen }) => ({
  body: {
    height: isOpen ? "100%" : null,
    overflow: isOpen ? "hidden" : null
  }
}));

const MediumNavBar = ({ menuData, subtext, style, ...props }) => (
  <header {...props}>
    <Flex style={style}>
      <Link
        underline={false}
        style={{ display: "block", height: subtext ? "56px" : "40px" }}
        my={subtext ? "-8px" : null}
        href="/"
      >
        <Branding logoColor="white" subtext={subtext} />
      </Link>
      <Flex
        justifyContent="space-between"
        alignContent="flex-end"
        style={{ flexGrow: "1", margin: `0 0 0 ${theme.space.x3}` }}
      >
        {menuData.primaryMenu && (
          <DesktopMenu
            style={{ paddingRight: theme.space.x3 }}
            aria-labelledby="primary-navigation"
            menuData={menuData.primaryMenu}
          />
        )}
        <Flex style={{ float: "right" }}>
          {menuData.search && (
            <Box maxWidth="18em" mr={menuData.secondaryMenu ? theme.space.x1 : theme.space.none}>
              <NavBarSearch {...menuData.search} />
            </Box>
          )}
          {menuData.secondaryMenu && (
            <DesktopMenu aria-labelledby="secondary-navigation" pl="x2" menuData={menuData.secondaryMenu} />
          )}
        </Flex>
      </Flex>
    </Flex>
  </header>
);

MediumNavBar.propTypes = {
  subtext: PropTypes.string,
  menuData: PropTypes.shape({}),
  style: PropTypes.shape({})
};

MediumNavBar.defaultProps = {
  subtext: null,
  menuData: null,
  style: null
};

const MobileMenuTrigger = styled.button({
  color: theme.colors.white,
  background: "none",
  border: "none",
  padding: `${subPx(theme.space.x1)} ${theme.space.x1}`,
  marginLeft: theme.space.x1,
  borderRadius: theme.radii.medium,
  transition: ".2s",
  height: theme.space.x5,
  "&:hover, &:focus": {
    outline: "none",
    color: theme.colors.lightBlue,
    backgroundColor: theme.colors.black,
    cursor: "pointer"
  }
});

const SmallHeader = styled.header(({ isOpen }) =>
  isOpen
    ? {
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: "100",
        overflow: "scroll",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0"
      }
    : null
);

/* eslint-disable react/destructuring-assignment */
class SmallNavBarNoState extends React.Component {
  constructor() {
    super();
    this.navRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.menuState.isOpen && !prevProps.menuState.isOpen) this.navRef.current.scrollTop = 0;
  }

  render() {
    const {
      menuData,
      menuState: { isOpen, handleMenuToggle, closeMenu },
      windowWidth,
      breakpointCollapseLogo,
      smallScreen = windowWidth < parseInt(breakpointCollapseLogo, 10),
      subtext,
      style,
      ...props
    } = this.props;
    return (
      <>
        <LockBody isOpen={isOpen} />
        <SmallHeader ref={this.navRef} isOpen={isOpen} {...props}>
          <Flex style={style}>
            <Link
              style={{ display: "block", height: subtext && !smallScreen ? "56px" : "40px" }}
              my={subtext && !smallScreen ? "-8px" : null}
              underline={false}
              href="/"
            >
              <Branding
                logoColor="white"
                logoType={smallScreen ? "lettermark" : "wordmark"}
                subtext={smallScreen ? null : subtext}
              />
            </Link>
            <Flex justifyContent="flex-end" style={{ flexGrow: "1", margin: `0 0 0 ${theme.space.x3}` }}>
              {menuData.search && (
                <Flex maxWidth="18em" alignItems="center" px="0">
                  <NavBarSearch {...menuData.search} />
                </Flex>
              )}
              {(menuData.primaryMenu || menuData.secondaryMenu) && (
                <MobileMenuTrigger
                  onClick={() => {
                    handleMenuToggle();
                  }}
                  aria-expanded={isOpen ? true : null}
                >
                  {isOpen ? <Icon icon="close" title="Close Menu" /> : <Icon icon="menu" title="Open Menu" />}
                </MobileMenuTrigger>
              )}
            </Flex>
          </Flex>
          {isOpen && (
            <MobileMenu subtext={subtext} includesubtext={smallScreen} menuData={menuData} closeMenu={closeMenu} />
          )}
        </SmallHeader>
      </>
    );
  }
}
/* eslint-enable react/destructuring-assignment */

SmallNavBarNoState.propTypes = {
  menuState: PropTypes.shape({
    isOpen: PropTypes.bool,
    handleMenuToggle: PropTypes.func,
    closeMenu: PropTypes.func
  }).isRequired,
  menuData: PropTypes.shape({}),
  subtext: PropTypes.string,
  style: PropTypes.shape({}),
  breakpointCollapseLogo: PropTypes.number,
  windowWidth: PropTypes.number,
  smallScreen: PropTypes.bool
};

SmallNavBarNoState.defaultProps = {
  menuData: null,
  subtext: null,
  style: null,
  breakpointCollapseLogo: theme.breakpoints.small,
  windowWidth: undefined,
  smallScreen: undefined
};

const SmallNavBar = withMenuState(SmallNavBarNoState);

const navBarStyles = {
  background: theme.colors.blackBlue,
  padding: `${theme.space.x2} ${theme.space.x3}`
};

const BaseNavBar = withWindowDimensions(
  ({ menuData, breakpointCollapseItems, windowDimensions: { windowWidth }, ...props }) => {
    if (windowWidth >= parseInt(breakpointCollapseItems, 10)) {
      return <MediumNavBar {...props} menuData={menuData} style={navBarStyles} />;
    } else {
      return <SmallNavBar {...props} windowWidth={windowWidth} menuData={menuData} style={navBarStyles} />;
    }
  }
);

BaseNavBar.propTypes = {
  menuData: PropTypes.shape({
    primaryMenu: PropTypes.arrayOf(isValidMenuItem),
    secondaryMenu: PropTypes.arrayOf(isValidMenuItem),
    search: PropTypes.shape({
      onSubmit: PropTypes.func
    })
  }),
  className: PropTypes.string,
  breakpointCollapseItems: PropTypes.number
};

BaseNavBar.defaultProps = {
  menuData: null,
  className: null,
  breakpointCollapseItems: theme.breakpoints.medium
};

const NavBar = styled(BaseNavBar)({});

export default NavBar;
