import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import ReactResizeDetector from "react-resize-detector";
import { useTranslation } from "react-i18next";
import { Flex } from "../Flex";
import { Box } from "../Box";
import { Icon } from "../Icon";
import { Link } from "../Link";
import NavBarSearch from "../NavBarSearch/NavBarSearch";
import { Branding } from "../Branding";
import theme from "../theme";
import { PreventBodyElementScrolling, subPx, withMenuState } from "../utils";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import isValidMenuItem from "./isValidMenuItem";

const themeColors = {
  blue: {
    color: theme.colors.white,
    hoverColor: theme.colors.lightBlue,
    background: theme.colors.blackBlue,
    hoverBackground: theme.colors.black,
    textColor: theme.colors.grey,
    logoColor: "white",
  },
  white: {
    color: theme.colors.darkBlue,
    hoverColor: theme.colors.blackBlue,
    background: theme.colors.white,
    hoverBackground: theme.colors.whiteGrey,
    textColor: theme.colors.blackBlue,
    logoColor: "blue",
  },
};

const getThemeColor = (themeColor) =>
  themeColors[themeColor] || themeColors.blue;

const NavBarBackground = styled(Flex)(({ backgroundColor }) => ({
  background: backgroundColor,
  padding: `${theme.space.x2} ${theme.space.x3}`,
}));

const BrandingLink = ({ to, href, children, ...props }) => (
  <Link href={href} to={to} {...props}>
    {children}
  </Link>
);

const MediumNavBar = ({
  menuData,
  themeColor,
  subtext,
  brandingLinkHref,
  brandingLinkTo,
  brandingLinkComponent,
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <header {...props}>
      <NavBarBackground backgroundColor={getThemeColor(themeColor).background}>
        <BrandingLink
          aria-label="Nulogy logo"
          underline={false}
          display="block"
          height={subtext ? "56px" : "40px"}
          my={subtext ? "-8px" : null}
          href={brandingLinkHref}
          as={brandingLinkComponent}
          to={brandingLinkTo}
        >
          <Branding
            logoColor={getThemeColor(themeColor).logoColor}
            subtext={subtext}
          />
        </BrandingLink>
        <Flex
          justifyContent="space-between"
          alignContent="flex-end"
          style={{ flexGrow: "1", margin: `0 0 0 ${theme.space.x3}` }}
        >
          {menuData.primaryMenu && (
            <DesktopMenu
              themeColorObject={getThemeColor(themeColor)}
              style={{ paddingRight: theme.space.x3 }}
              aria-label={t("primary navigation")}
              menuData={menuData.primaryMenu}
            />
          )}
          <Flex style={{ float: "right" }}>
            {menuData.search && (
              <Box
                maxWidth="18em"
                mr={menuData.secondaryMenu ? theme.space.x1 : theme.space.none}
              >
                <NavBarSearch {...menuData.search} />
              </Box>
            )}
            {menuData.secondaryMenu && (
              <DesktopMenu
                themeColorObject={getThemeColor(themeColor)}
                aria-label={t("secondary navigation")}
                menuData={menuData.secondaryMenu}
              />
            )}
          </Flex>
        </Flex>
      </NavBarBackground>
    </header>
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
  subtext: PropTypes.string,
  brandingLinkHref: PropTypes.string,
  menuData: PropTypes.shape(MenuDataPropTypes),
  brandingLinkTo: PropTypes.string,
  themeColor: PropTypes.oneOf(["blue", "white"]),
};

MediumNavBar.defaultProps = {
  subtext: null,
  brandingLinkHref: "/",
  brandingLinkTo: undefined,
  menuData: null,
  themeColor: undefined,
};

const MobileMenuTrigger = styled.button(
  ({ color, hoverColor, hoverBackground }) => ({
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
      backgroundColor: themeGet(
        `colors.${hoverBackground}`,
        hoverBackground
      )(hoverBackground),
      cursor: "pointer",
    },
    "&:focus": {
      boxShadow: theme.shadows.focus,
    },
  })
);

const SmallHeader = styled.header(({ isOpen }) =>
  isOpen
    ? {
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: theme.zIndices.overlay,
        overflow: "scroll",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
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
      brandingLinkTo,
      themeColor,
      ...props
    } = this.props;
    return (
      <SmallHeader ref={this.navRef} isOpen={isOpen} {...props}>
        <NavBarBackground
          backgroundColor={getThemeColor(themeColor).background}
        >
          <BrandingLink
            aria-label="Nulogy logo"
            display="block"
            height={subtext && !this.isSmallScreen() ? "56px" : "40px"}
            my={subtext && !this.isSmallScreen() ? "-8px" : null}
            underline={false}
            href={brandingLinkHref}
            to={brandingLinkTo}
          >
            <Branding
              logoColor={getThemeColor(themeColor).logoColor}
              logoType={this.isSmallScreen() ? "lettermark" : "wordmark"}
              subtext={this.isSmallScreen() ? null : subtext}
            />
          </BrandingLink>
          <Flex
            justifyContent="flex-end"
            style={{ flexGrow: "1", margin: `0 0 0 ${theme.space.x3}` }}
          >
            {menuData.search && (
              <Flex maxWidth="18em" alignItems="center" px="0">
                <NavBarSearch {...menuData.search} />
              </Flex>
            )}
            {(menuData.primaryMenu || menuData.secondaryMenu) && (
              <MobileMenuTrigger
                {...getThemeColor(themeColor)}
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
              themeColorObject={getThemeColor(themeColor)}
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
    closeMenu: PropTypes.func,
  }).isRequired,
  menuData: PropTypes.shape(MenuDataPropTypes),
  subtext: PropTypes.string,
  brandingLinkHref: PropTypes.string,
  brandingLinkTo: PropTypes.string,
  breakpointLower: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.number,
  themeColor: PropTypes.oneOf(["blue", "white"]),
};

SmallNavBarNoState.defaultProps = {
  menuData: null,
  subtext: null,
  brandingLinkHref: "/",
  brandingLinkTo: undefined,
  breakpointLower: theme.breakpoints.small,
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

const NavBar = (props) => (
  <ReactResizeDetector handleWidth>
    <SelectNavBarBasedOnWidth {...props} />
  </ReactResizeDetector>
);

NavBar.propTypes = {
  menuData: PropTypes.shape(MenuDataPropTypes),
  className: PropTypes.string,
  breakpointUpper: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  themeColor: PropTypes.oneOf(["blue", "white"]),
};

NavBar.defaultProps = {
  menuData: null,
  className: undefined,
  breakpointUpper: theme.breakpoints.medium,
  themeColor: "blue",
};

export default NavBar;
