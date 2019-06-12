import React from "react";
import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import { themeGet } from "styled-system";
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

const themeColors = {
  blue: {
    color: theme.colors.white,
    hoverColor: theme.colors.lightBlue,
    background: theme.colors.blackBlue,
    hoverBackground: theme.colors.black,
    mobileMenuHeading: theme.colors.grey,
    logoColor: "white"
  },
  white: {
    color: theme.colors.darkBlue,
    hoverColor: theme.colors.blackBlue,
    background: theme.colors.white,
    hoverBackground: theme.colors.whiteGrey,
    mobileMenuHeading: theme.colors.blackBlue,
    logoColor: "blue"
  }
};

const getThemeColor = themeColor => themeColors[themeColor] || themeColors.blue;

const NavBarBackground = styled(Flex)(({ backgroundColor }) => ({
  background: backgroundColor,
  padding: `${theme.space.x2} ${theme.space.x3}`
}));

const MediumNavBar = ({ menuData, themeColor, subtext, ...props }) => (
  <header {...props}>
    <NavBarBackground backgroundColor={getThemeColor(themeColor).background}>
      <Link
        underline={false}
        style={{ display: "block", height: subtext ? "56px" : "40px" }}
        my={subtext ? "-8px" : null}
        href="/"
      >
        <Branding logoColor={getThemeColor(themeColor).logoColor} subtext={subtext} />
      </Link>
      <Flex
        justifyContent="space-between"
        alignContent="flex-end"
        style={{ flexGrow: "1", margin: `0 0 0 ${theme.space.x3}` }}
      >
        {menuData.primaryMenu && (
          <DesktopMenu
            themeColorObject={getThemeColor(themeColor)}
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
            <DesktopMenu
              themeColorObject={getThemeColor(themeColor)}
              aria-labelledby="secondary-navigation"
              menuData={menuData.secondaryMenu}
            />
          )}
        </Flex>
      </Flex>
    </NavBarBackground>
  </header>
);

MediumNavBar.propTypes = {
  subtext: PropTypes.string,
  menuData: PropTypes.shape({}),
  themeColor: PropTypes.oneOf(["blue", "white"])
};

MediumNavBar.defaultProps = {
  subtext: null,
  menuData: null,
  themeColor: undefined
};

const MobileMenuTrigger = styled.button(({ color, hoverColor, hoverBackground }) => ({
  color: themeGet(`colors.${color}`, color)(color),
  background: "none",
  border: "none",
  padding: `${subPx(theme.space.x1)} ${theme.space.x1}`,
  marginLeft: theme.space.x1,
  borderRadius: theme.radii.medium,
  transition: ".2s",
  height: theme.space.x5,
  "&:hover, &:focus": {
    outline: "none",
    color: themeGet(`colors.${hoverColor}`, hoverColor)(hoverColor),
    backgroundColor: themeGet(`colors.${hoverBackground}`, hoverBackground)(hoverBackground),
    cursor: "pointer"
  },
  "&:focus": {
    boxShadow: `0 0 3px ${theme.colors.blue}`
  }
}));

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
      breakpointLower,
      smallScreen = windowWidth < parseInt(breakpointLower, 10),
      subtext,
      themeColor,
      ...props
    } = this.props;
    return (
      <>
        <LockBody isOpen={isOpen} />
        <SmallHeader ref={this.navRef} isOpen={isOpen} {...props}>
          <NavBarBackground backgroundColor={getThemeColor(themeColor).background}>
            <Link
              style={{ display: "block", height: subtext && !smallScreen ? "56px" : "40px" }}
              my={subtext && !smallScreen ? "-8px" : null}
              underline={false}
              href="/"
            >
              <Branding
                logoColor={getThemeColor(themeColor).logoColor}
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
                  {...getThemeColor(themeColor)}
                  onClick={() => {
                    handleMenuToggle();
                  }}
                  aria-expanded={isOpen ? true : null}
                >
                  {isOpen ? <Icon icon="close" title="Close Menu" /> : <Icon icon="menu" title="Open Menu" />}
                </MobileMenuTrigger>
              )}
            </Flex>
          </NavBarBackground>
          {isOpen && (
            <MobileMenu
              themeColorObject={getThemeColor(themeColor)}
              subtext={subtext}
              includeSubtext={smallScreen}
              menuData={menuData}
              closeMenu={closeMenu}
            />
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
  breakpointLower: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  windowWidth: PropTypes.number,
  smallScreen: PropTypes.bool,
  themeColor: PropTypes.oneOf(["blue", "white"])
};

SmallNavBarNoState.defaultProps = {
  menuData: null,
  subtext: null,
  breakpointLower: theme.breakpoints.small,
  windowWidth: undefined,
  smallScreen: undefined,
  themeColor: undefined
};

const SmallNavBar = withMenuState(SmallNavBarNoState);

const BaseNavBar = withWindowDimensions(
  ({ menuData, breakpointUpper, windowDimensions: { windowWidth }, ...props }) => {
    if (windowWidth >= parseInt(breakpointUpper, 10)) {
      return <MediumNavBar {...props} menuData={menuData} />;
    } else {
      return <SmallNavBar {...props} windowWidth={windowWidth} menuData={menuData} />;
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
  breakpointUpper: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  themeColor: PropTypes.oneOf(["blue", "white"])
};

BaseNavBar.defaultProps = {
  menuData: null,
  className: null,
  breakpointUpper: theme.breakpoints.medium,
  themeColor: "blue"
};

const NavBar = styled(BaseNavBar)({});

export default NavBar;
