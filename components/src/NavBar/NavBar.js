import React from "react";
import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import { Flex } from "../Flex";
import { Icon } from "../Icon";
import NavBarSearch from "../NavBarSearch/NavBarSearch";
import Branding from "./Branding";
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

const MediumNavBar = ({ menuData, desktopSrc, alt, style, ...props }) => (
  <header {...props}>
    <Flex style={style}>
      <Branding />
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
            <div style={{ maxWidth: "18em" }}>
              <NavBarSearch {...menuData.search} />
            </div>
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
  alt: PropTypes.string,
  desktopSrc: PropTypes.string,
  menuData: PropTypes.shape({}),
  style: PropTypes.shape({})
};

MediumNavBar.defaultProps = {
  alt: null,
  desktopSrc: undefined,
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
      mobileSrc,
      alt,
      style,
      ...props
    } = this.props;
    return (
      <>
        <LockBody isOpen={isOpen} />
        <SmallHeader ref={this.navRef} isOpen={isOpen} {...props}>
          <Flex style={style}>
            <Branding />
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
          {isOpen && <MobileMenu menuData={menuData} closeMenu={closeMenu} />}
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
  mobileSrc: PropTypes.string,
  alt: PropTypes.string,
  style: PropTypes.shape({})
};

SmallNavBarNoState.defaultProps = {
  menuData: null,
  mobileSrc:
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDM2LjQgMzEuMyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMzYuNCAzMS4zIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOiNGRkJCMDA7fTwvc3R5bGU+PHRpdGxlPkJyZW5kaW5nPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzIgLTIwKSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzIgMTYpIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDQpIj48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzAuNywxLjFsNS43LDIuM3YyMC41YzAsNC40LTUuNCw1LjItOS4xLDUuN2MyLjEtMC41LDMuNC0xLjEsMy40LTUuN1Y1LjdMMjUsMy40TDMwLjcsMS4xeiAgICAgICBNNi44LDI4LjRWMTUuOWMwLTEuMywwLjktMi43LDIuMS0zLjJsNS45LTIuNXY4bDUuNywzLjRjMS4xLDAuNiwzLjQsMC42LDMuNC0xLjF2LTMuNGwtMi4zLTEuMVYwTDQuMyw2LjRDMS45LDcuMywwLDEwLDAsMTIuNSAgICAgIHYxOC44TDYuOCwyOC40eiIvPjwvZz48L2c+PC9nPjwvc3ZnPg==",
  alt: undefined,
  style: null
};

const SmallNavBar = withMenuState(SmallNavBarNoState);

const navBarStyles = {
  background: theme.colors.blackBlue,
  padding: `${theme.space.x2} ${theme.space.x3}`
};

const BaseNavBar = withWindowDimensions(({ menuData, breakpoint, windowDimensions: { windowWidth }, ...props }) => {
  if (windowWidth >= breakpoint) {
    return <MediumNavBar {...props} menuData={menuData} style={navBarStyles} />;
  } else {
    return <SmallNavBar {...props} menuData={menuData} style={navBarStyles} />;
  }
});

BaseNavBar.propTypes = {
  menuData: PropTypes.shape({
    primaryMenu: PropTypes.arrayOf(isValidMenuItem),
    secondaryMenu: PropTypes.arrayOf(isValidMenuItem),
    search: PropTypes.shape({
      onSubmit: PropTypes.func
    })
  }),
  className: PropTypes.string,
  breakpoint: PropTypes.number
};

BaseNavBar.defaultProps = {
  menuData: null,
  className: null,
  breakpoint: 1024
};

const NavBar = styled(BaseNavBar)({});

export default NavBar;
