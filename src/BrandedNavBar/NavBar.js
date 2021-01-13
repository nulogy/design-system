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
import NDSTheme from "../theme";
import { PreventBodyElementScrolling, subPx, withMenuState } from "../utils";
import { deprecatedProp } from "../utils/deprecatedProp";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { NulogyLogoContainer } from "./NulogyLogoContainer";
import isValidMenuItem from "./isValidMenuItem";
import EnvironmentBanner from './EnvironmentBanner';

const MAX_LOGO_WIDTH = "184px";
const MAX_LOGO_HEIGHT = "36px";
export const NAVBAR_HEIGHT = "56px";

const themeColorObject = {
  color: "darkBlue",
  hoverColor: "blackBlue",
  background: "white",
  hoverBackground: "whiteGrey",
  textColor: "blackBlue",
  logoColor: "blue",
};

const NavBarBackground = styled(Flex)(({ backgroundColor, theme }) => ({
  background: backgroundColor,
  padding: `0 ${theme.space.x3}`,
  boxShadow: theme.shadows.large,
  alignItems: "center",
  height: NAVBAR_HEIGHT,
  zIndex: theme.zIndex.navBar,
  position: "relative",
}));




const BrandLogoContainer = ({ logoSrc, brandingLinkHref, subtext }) => {
  return (
    <Box maxWidth={MAX_LOGO_WIDTH} maxHeight={MAX_LOGO_HEIGHT}>
      <Link
        aria-label="Home"
        underline={false}
        href={brandingLinkHref}
        style={{ display: "block" }}
      >
        {logoSrc && (
          <img
            src={logoSrc}
            style={{ maxWidth: MAX_LOGO_WIDTH, maxHeight: MAX_LOGO_HEIGHT }}
            alt=""
          />
        )}
        {!logoSrc && (
          <Branding
            size={subtext ? "small" : "medium"}
            logoColor="blue"
            subtext={subtext}
          />
        )}
      </Link>
    </Box>
  );
};

BrandLogoContainer.propTypes = {
  logoSrc: PropTypes.string,
  brandingLinkHref: PropTypes.string,
  subtext: PropTypes.string,
};

BrandLogoContainer.defaultProps = {
  logoSrc: undefined,
  brandingLinkHref: undefined,
  subtext: undefined,
};

const MediumNavBar = ({
  menuData,
  subtext,
  environment,
  logoSrc,
  brandingLinkHref,
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <>
      {environment && <EnvironmentBanner>{environment}</EnvironmentBanner>}
      <header {...props}>
        <NavBarBackground backgroundColor="white">
          <BrandLogoContainer
            logoSrc={logoSrc}
            brandingLinkHref={brandingLinkHref}
            subtext={subtext}
          />
          <Flex
            justifyContent="space-between"
            alignContent="flex-end"
            flexGrow="1"
            ml="x3"
            alignItems="center"
          >
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
              {logoSrc && (
                <Box pl="x3">
                  <NulogyLogoContainer
                    height={NAVBAR_HEIGHT}
                    subText={subtext}
                  />
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
    onSubmit: PropTypes.func,
  }),
};

MediumNavBar.propTypes = {
  ...BrandLogoContainer.propTypes,
  subtext: PropTypes.string,
  menuData: PropTypes.shape(MenuDataPropTypes),
};

MediumNavBar.defaultProps = {
  ...BrandLogoContainer.defaultProps,
  subtext: null,
  brandingLinkHref: "/",
  menuData: null,
};

const MobileMenuTrigger = styled.button(
  ({ color, hoverColor, hoverBackground, theme }) => ({
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
      cursor: "pointer",
    },
    "&:focus": {
      boxShadow: theme.shadows.focus,
    },
  })
);

const SmallHeader = styled.header(({ isOpen, theme }) =>
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
        bottom: "0",
        backgroundColor: theme.colors.white,
      }
    : null
);

const pixelDigitsFrom = (pixelString) => parseInt(pixelString, 10);

const MenuIcon = ({ isOpen }) => {
  const { t } = useTranslation();
  const icon = isOpen ? "close" : "menu";
  const title = isOpen ? t("close menu") : t("open menu");
  return <Icon icon={icon} title={title} />;
};

MenuIcon.propTypes = {
  isOpen: PropTypes.bool,
};

MenuIcon.defaultProps = {
  isOpen: false,
};

/* eslint-disable react/destructuring-assignment */
class SmallNavBarNoState extends React.Component {
  constructor() {
    super();
    this.navRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.menuState.isOpen && !prevProps.menuState.isOpen)
      this.navRef.current.scrollTop = 0;
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
      environment,
      logoSrc,
      ...props
    } = this.props;
    return (
      <SmallHeader ref={this.navRef} isOpen={isOpen} {...props}>
        {environment && <EnvironmentBanner>{environment}</EnvironmentBanner>}
        <NavBarBackground backgroundColor="white">
          <BrandLogoContainer
            logoSrc={logoSrc}
            brandingLinkHref={brandingLinkHref}
            subtext={subtext}
          />
          <Flex justifyContent="flex-end" ml="x3" flexGrow="1">
            {menuData.search && (
              <Flex maxWidth="18em" alignItems="center" px="0">
                <NavBarSearch {...menuData.search} />
              </Flex>
            )}
            {(menuData.primaryMenu || menuData.secondaryMenu) && (
              <MobileMenuTrigger
                {...themeColorObject}
                onClick={toggleMenu}
                aria-expanded={isOpen ? true : null}
              >
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
              menuData={menuData}
              closeMenu={closeMenu}
              logoSrc={logoSrc}
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
    closeMenu: PropTypes.func,
  }).isRequired,
  menuData: PropTypes.shape(MenuDataPropTypes),
  subtext: PropTypes.string,
  brandingLinkHref: PropTypes.string,
  breakpointLower: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.number,
  themeColor: PropTypes.oneOf(["blue", "white"]),
};

SmallNavBarNoState.defaultProps = {
  ...BrandLogoContainer.defaultProps,
  menuData: null,
  subtext: null,
  brandingLinkHref: "/",
  breakpointLower: NDSTheme.breakpoints.small,
  width: undefined,
  themeColor: undefined,
};

const SmallNavBar = withMenuState(SmallNavBarNoState);

const SelectNavBarBasedOnWidth = ({
  width,
  defaultOpen,
  breakpointUpper,
  ...props
}) => {
  const currentWidth =
    width || (typeof window !== "undefined" && window.innerWidth);

  if (currentWidth >= pixelDigitsFrom(breakpointUpper)) {
    return <MediumNavBar {...props} />;
  } else {
    return (
      <SmallNavBar {...props} width={currentWidth} defaultOpen={defaultOpen} />
    );
  }
};

const BaseNavBar = ({ showTraining, environment, ...props }) => {
  const environmentValue = showTraining ? "training" : environment;
  return (
    <ReactResizeDetector handleWidth>
      <SelectNavBarBasedOnWidth {...props} environment={environmentValue} />
    </ReactResizeDetector>
  );
};

BaseNavBar.propTypes = {
  menuData: PropTypes.shape(MenuDataPropTypes),
  className: PropTypes.string,
  breakpointUpper: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  showTraining: deprecatedProp(PropTypes.bool, "environment"),
  environment: PropTypes.oneOf(["training", "development", undefined]),
  logoSrc: PropTypes.string,
};

BaseNavBar.defaultProps = {
  menuData: null,
  className: undefined,
  breakpointUpper: NDSTheme.breakpoints.medium,
  environment: undefined,
  showTraining: undefined,
  logoSrc: undefined,
};

const NavBar = styled(BaseNavBar)({});

export default NavBar;
