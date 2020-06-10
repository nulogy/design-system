import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import ReactResizeDetector from "react-resize-detector";
import { useTranslation } from "react-i18next";
import { Flex } from "../Flex";
import { Box } from "../Box";
import { Text } from "../Type";
import { Icon } from "../Icon";
import { Link } from "../Link";
import NavBarSearch from "../NavBarSearch/NavBarSearch";
import { Branding } from "../Branding";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import isValidMenuItem from "./isValidMenuItem";
import theme from "../theme";
import { PreventBodyElementScrolling, subPx, withMenuState } from "../utils";

const themeColorObject = {
  color: "darkBlue",
  hoverColor: "blackBlue",
  background: "white",
  hoverBackground: "whiteGrey",
  textColor: "blackBlue",
  logoColor: "blue"
};

const NavBarBackground = styled(Flex)(({ backgroundColor }) => ({
  background: backgroundColor,
  padding: `${theme.space.x2} ${theme.space.x3}`
}));

const TrainingBar = () => (
  <Box bg="darkBlue" textAlign="center">
    <Text fontSize="10px" letterSpacing="0.5px" fontWeight="bold" color="white" textTransform="uppercase">
      Training
    </Text>
  </Box>
);

const MediumNavBar = ({ menuData, themeColor, subtext, showTraining, brandingLinkHref, ...props }) => {
  const { t } = useTranslation();
  return (
    <>
      {showTraining && <TrainingBar />}
      <header {...props}>
        <NavBarBackground backgroundColor="white">
          <Link
            aria-label="Nulogy logo"
            underline={false}
            style={{ display: "block", height: subtext ? "56px" : "40px" }}
            my={subtext ? "-8px" : null}
            href={brandingLinkHref}
          >
            <Branding logoColor="blue" subtext={subtext} />
          </Link>
          <Flex
            justifyContent="space-between"
            alignContent="flex-end"
            style={{ flexGrow: "1", margin: `0 0 0 ${theme.space.x3}` }}
          >
            {menuData.primaryMenu && (
              <DesktopMenu
                themeColorObject={themeColorObject}
                style={{ paddingRight: theme.space.x3 }}
                aria-label={t("primary navigation")}
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
                  themeColorObject={themeColorObject}
                  aria-label={t("secondary navigation")}
                  menuData={menuData.secondaryMenu}
                />
              )}
            </Flex>
          </Flex>
        </NavBarBackground>
      </header>
    </>
  );
};

const MenuDataPropTypes = {
  primaryMenu: PropTypes.arrayOf(isValidMenuItem),
  secondaryMenu: PropTypes.arrayOf(isValidMenuItem),
  search: PropTypes.shape({
    onSubmit: PropTypes.func
  })
};

MediumNavBar.propTypes = {
  subtext: PropTypes.string,
  brandingLinkHref: PropTypes.string,
  menuData: PropTypes.shape(MenuDataPropTypes),
  themeColor: PropTypes.oneOf(["blue", "white"])
};

MediumNavBar.defaultProps = {
  subtext: null,
  brandingLinkHref: "/",
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
    boxShadow: theme.shadows.focus
  }
}));

const SmallHeader = styled.header(({ isOpen }) =>
  isOpen
    ? {
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: theme.zIndex.overlay,
        overflow: "scroll",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0"
      }
    : null
);

const pixelDigitsFrom = pixelString => parseInt(pixelString, 10);

const MenuIcon = ({ isOpen }) => {
  const { t } = useTranslation();
  const icon = isOpen ? "close" : "menu";
  const title = isOpen ? t("close menu") : t("open menu");
  return <Icon icon={icon} title={title} />;
};

MenuIcon.propTypes = {
  isOpen: PropTypes.bool
};

MenuIcon.defaultProps = {
  isOpen: false
};

/* eslint-disable react/destructuring-assignment */
class SmallNavBarNoState extends React.Component {
  constructor() {
    super();
    this.navRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.menuState.isOpen && !prevProps.menuState.isOpen) this.navRef.current.scrollTop = 0;
  }

  isSmallScreen() {
    const { breakpointLower, width } = this.props;

    return width < pixelDigitsFrom(breakpointLower);
  }

  render() {
    const {
      menuData,
      menuState: { isOpen, toggleMenu, closeMenu },
      subtext,
      brandingLinkHref,
      showTraining,
      ...props
    } = this.props;
    return (
      <SmallHeader ref={this.navRef} isOpen={isOpen} {...props}>
        {showTraining && <TrainingBar />}
        <NavBarBackground backgroundColor="white">
          <Link
            aria-label="Nulogy logo"
            style={{ display: "block", height: subtext && !this.isSmallScreen() ? "56px" : "40px" }}
            my={subtext && !this.isSmallScreen() ? "-8px" : null}
            underline={false}
            href={brandingLinkHref}
          >
            <Branding
              logoColor="blue"
              logoType={this.isSmallScreen() ? "lettermark" : "wordmark"}
              subtext={this.isSmallScreen() ? null : subtext}
            />
          </Link>
          <Flex justifyContent="flex-end" style={{ flexGrow: "1", margin: `0 0 0 ${theme.space.x3}` }}>
            {menuData.search && (
              <Flex maxWidth="18em" alignItems="center" px="0">
                <NavBarSearch {...menuData.search} />
              </Flex>
            )}
            {(menuData.primaryMenu || menuData.secondaryMenu) && (
              <MobileMenuTrigger {...themeColorObject} onClick={toggleMenu} aria-expanded={isOpen ? true : null}>
                <MenuIcon isOpen={isOpen} />
              </MobileMenuTrigger>
            )}
          </Flex>
        </NavBarBackground>
        {isOpen && (
          <PreventBodyElementScrolling>
            <MobileMenu
              themeColorObject={themeColorObject}
              subtext={subtext}
              includeSubtext={this.isSmallScreen()}
              menuData={menuData}
              closeMenu={closeMenu}
            />
          </PreventBodyElementScrolling>
        )}
      </SmallHeader>
    );
  }
}
/* eslint-enable react/destructuring-assignment */

SmallNavBarNoState.propTypes = {
  menuState: PropTypes.shape({
    isOpen: PropTypes.bool,
    toggleMenu: PropTypes.func,
    closeMenu: PropTypes.func
  }).isRequired,
  menuData: PropTypes.shape(MenuDataPropTypes),
  subtext: PropTypes.string,
  brandingLinkHref: PropTypes.string,
  breakpointLower: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.number,
  themeColor: PropTypes.oneOf(["blue", "white"])
};

SmallNavBarNoState.defaultProps = {
  menuData: null,
  subtext: null,
  brandingLinkHref: "/",
  breakpointLower: theme.breakpoints.small,
  width: undefined,
  themeColor: undefined
};

const SmallNavBar = withMenuState(SmallNavBarNoState);

const SelectNavBarBasedOnWidth = ({ width, defaultOpen, breakpointUpper, ...props }) => {
  const currentWidth = width || (typeof window !== "undefined" && window.innerWidth);

  if (currentWidth >= pixelDigitsFrom(breakpointUpper)) {
    return <MediumNavBar {...props} />;
  } else {
    return <SmallNavBar {...props} width={currentWidth} defaultOpen={defaultOpen} />;
  }
};

const BaseNavBar = props => (
  <ReactResizeDetector handleWidth>
    <SelectNavBarBasedOnWidth {...props} />
  </ReactResizeDetector>
);

BaseNavBar.propTypes = {
  menuData: PropTypes.shape(MenuDataPropTypes),
  className: PropTypes.string,
  breakpointUpper: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  showTraining: PropTypes.bool
};

BaseNavBar.defaultProps = {
  menuData: null,
  className: undefined,
  breakpointUpper: theme.breakpoints.medium,
  showTraining: false
};

const NavBar = styled(BaseNavBar)({});

export default NavBar;
