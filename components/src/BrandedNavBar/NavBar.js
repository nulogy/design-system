import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
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
import { NulogyLogoContainer } from "./NulogyLogoContainer";
import isValidMenuItem from "./isValidMenuItem";
import NDSTheme from "../theme";
import { PreventBodyElementScrolling, subPx, withMenuState } from "../utils";

const themeColorObject = {
  color: "darkBlue",
  hoverColor: "blackBlue",
  background: "white",
  hoverBackground: "whiteGrey",
  textColor: "blackBlue",
  logoColor: "blue"
};

const NavBarBackground = styled(Flex)(({ backgroundColor, theme }) => ({
  background: backgroundColor,
  padding: `${theme.space.x1} ${theme.space.x3}`,
  boxShadow: theme.shadows.large,
  alignItems: "center"
}));

const TrainingBar = () => (
  <Box bg="darkBlue" textAlign="center">
    <Text fontSize="10px" letterSpacing="0.5px" fontWeight="bold" color="white" textTransform="uppercase" py="2px">
      Training
    </Text>
  </Box>
);

const BrandLogoContainer = ({ logo, brandingLinkHref, subtext }) => {
  return (
    <Link aria-label="Nulogy logo" underline={false} href={brandingLinkHref}>
      {logo && logo}
      {!logo && <Branding logoColor="blue" subtext={subtext} />}
    </Link>
        {logo && <img src={logo} alt="" />}
  );
};

BrandLogoContainer.propTypes = {
  logo: PropTypes.string,
  brandingLinkHref: PropTypes.string,
  subtext: PropTypes.string
};

BrandLogoContainer.defaultProps = {
  logo: undefined,
  brandingLinkHref: undefined,
  subtext: undefined
};

const MediumNavBar = ({ menuData, subtext, showTraining, logo, brandingLinkHref, ...props }) => {
  const { t } = useTranslation();
  return (
    <>
      {showTraining && <TrainingBar />}
      <header {...props}>
        <NavBarBackground backgroundColor="white">
          <BrandLogoContainer logo={logo} brandingLinkHref={brandingLinkHref} subtext={subtext} />
          <Flex justifyContent="space-between" alignContent="flex-end" flexGrow="1" ml="x3" alignItems="center">
            {menuData.primaryMenu && (
              <DesktopMenu
                themeColorObject={themeColorObject}
                aria-label={t("primary navigation")}
                menuData={menuData.primaryMenu}
              />
            )}
            <Flex justifySelf="flex-end" alignItems="center">
              {menuData.secondaryMenu && (
                <DesktopMenu
                  themeColorObject={themeColorObject}
                  aria-label={t("secondary navigation")}
                  menuData={menuData.secondaryMenu}
                />
              )}
              {logo && (
                <Box pl="x3">
                  <NulogyLogoContainer subText={subtext} />
                </Box>
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
  ...BrandLogoContainer.propTypes,
  subtext: PropTypes.string,
  menuData: PropTypes.shape(MenuDataPropTypes)
};

MediumNavBar.defaultProps = {
  ...BrandLogoContainer.defaultProps,
  subtext: null,
  brandingLinkHref: "/",
  menuData: null
};

const MobileMenuTrigger = styled.button(({ color, hoverColor, hoverBackground, theme }) => ({
  color: theme.colors[color] || color,
  background: "none",
  border: "none",
  padding: `${subPx(theme.space.x1)} ${theme.space.x1}`,
  marginLeft: theme.space.x1,
  borderRadius: theme.radii.medium,
  transition: ".2s",
  height: theme.space.x5,
  "&:hover, &:focus": {
    outline: "none",
    color: theme.colors[hoverColor] || hoverColor,
    backgroundColor: theme.colors[hoverBackground] || hoverBackground,
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
        zIndex: NDSTheme.zIndex.overlay,
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
      logo,
      ...props
    } = this.props;
    return (
      <SmallHeader ref={this.navRef} isOpen={isOpen} {...props}>
        {showTraining && <TrainingBar />}
        <NavBarBackground backgroundColor="white">
          <BrandLogoContainer logo={logo} brandingLinkHref={brandingLinkHref} subtext={subtext} />
          <Flex justifyContent="flex-end" ml="x3" flexGrow="1">
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
              logo={logo}
            />
          </PreventBodyElementScrolling>
        )}
      </SmallHeader>
    );
  }
}
/* eslint-enable react/destructuring-assignment */

SmallNavBarNoState.propTypes = {
  ...BrandLogoContainer.propTypes,
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
  ...BrandLogoContainer.defaultProps,
  menuData: null,
  subtext: null,
  brandingLinkHref: "/",
  breakpointLower: NDSTheme.breakpoints.small,
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
  showTraining: PropTypes.bool,
  logo: PropTypes.node
};

BaseNavBar.defaultProps = {
  menuData: null,
  className: undefined,
  breakpointUpper: NDSTheme.breakpoints.medium,
  showTraining: false,
  logo: undefined
};

const NavBar = styled(BaseNavBar)({});

export default NavBar;
