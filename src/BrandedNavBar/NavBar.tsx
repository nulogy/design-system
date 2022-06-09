import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled, { CSSObject } from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { Flex } from "../Flex";
import { Box } from "../Box";
import { Icon } from "../Icon";
import { Link } from "../Link";
import NavBarSearch from "../NavBarSearch/NavBarSearch";
import { Branding } from "../Branding";
import { PreventBodyElementScrolling, subPx, withMenuState } from "../utils";
import { DefaultNDSThemeType } from "../theme.type";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { NulogyLogoContainer } from "./NulogyLogoContainer";
import isValidMenuItem from "./isValidMenuItem";
import EnvironmentBanner from "./EnvironmentBanner";

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

type NavBarBackgroundProps = {
  backgroundColor?: string;
  theme?: DefaultNDSThemeType;
};

const NavBarBackground = styled(Flex)(
  ({ backgroundColor, theme }: NavBarBackgroundProps): CSSObject => ({
    background: backgroundColor,
    padding: `0 ${theme.space.x3}`,
    borderBottom: `1px solid ${theme.colors.lightGrey}`,
    alignItems: "center",
    height: NAVBAR_HEIGHT,
    zIndex: theme.zIndices.navBar,
    position: "relative",
  })
);

type BrandLogoContainerProps = {
  logoSrc?: string;
  brandingLinkHref?: string;
  brandingLinkTo?: string;
  brandingLinkComponent?: React.ElementType;
  subtext?: string;
};

const BrandLogoContainer = ({
  logoSrc,
  brandingLinkHref,
  brandingLinkTo,
  brandingLinkComponent,
  subtext,
}: BrandLogoContainerProps) => {
  return (
    <Box maxWidth={MAX_LOGO_WIDTH} maxHeight={MAX_LOGO_HEIGHT}>
      <Link
        aria-label="Home"
        href={brandingLinkHref}
        to={brandingLinkTo}
        as={brandingLinkComponent}
        underline={false}
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

type MediumNavBarProps = BrandLogoContainerProps & {
  subtext?: string;
  menuData?: any;
  brandingLinkHref?: string;
  brandingLinkTo?: string;
  brandingLinkComponent?: React.ElementType;
  environment?: "development" | "training";
};

const MediumNavBar = ({
  menuData,
  subtext,
  environment,
  logoSrc,
  brandingLinkHref = "/",
  brandingLinkTo,
  brandingLinkComponent,
  ...props
}: MediumNavBarProps) => {
  const { t } = useTranslation();
  return (
    <>
      {environment && <EnvironmentBanner>{environment}</EnvironmentBanner>}
      <header {...props}>
        <NavBarBackground backgroundColor="white">
          <BrandLogoContainer
            logoSrc={logoSrc}
            brandingLinkHref={brandingLinkHref}
            brandingLinkTo={brandingLinkTo}
            brandingLinkComponent={brandingLinkComponent}
            subtext={subtext}
          />
          <Flex
            justifyContent="space-between"
            alignContent="flex-end"
            flexGrow={1}
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

type MobileMenuTriggerProps = {
  color?: string;
  hoverColor?: string;
  hoverBackground?: string;
  theme?: DefaultNDSThemeType;
};

const MobileMenuTrigger = styled.button(
  ({ color, hoverColor, hoverBackground, theme }: MobileMenuTriggerProps) => ({
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

type SmallHeaderProps = {
  isOpen?: boolean;
  theme?: DefaultNDSThemeType;
  breakpointLower?: string | number;
};

const SmallHeader = styled.header(
  ({ isOpen, theme }: SmallHeaderProps): CSSObject =>
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

type SmallNavBarNoStateProps = BrandLogoContainerProps & {
  menuState?: any;
  menuData?: any;
  subtext?: string;
  brandingLinkHref?: string;
  brandingLinkTo?: string;
  breakpointLower?: number | string;
  width?: number;
  themeColor?: "blue" | "white";
  environment?: "development" | "training";
};

/* eslint-disable react/destructuring-assignment */
const SmallNavBarNoState = ({
  menuData,
  menuState: { isOpen, toggleMenu, closeMenu },
  subtext,
  brandingLinkHref = "/",
  brandingLinkTo,
  environment,
  logoSrc,
  breakpointLower = "small",
  ...props
}: SmallNavBarNoStateProps) => {
  const navRef = React.useRef(null);

  useEffect(() => {
    if (navRef && navRef.current) {
      navRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  const { breakpoints } = useTheme();
  return (
    <SmallHeader
      ref={navRef}
      isOpen={isOpen}
      breakpointLower={
        breakpoints ? breakpoints[breakpointLower] : breakpointLower
      }
      {...props}
    >
      {environment && <EnvironmentBanner>{environment}</EnvironmentBanner>}
      <NavBarBackground backgroundColor="white">
        <BrandLogoContainer
          logoSrc={logoSrc}
          brandingLinkHref={brandingLinkHref}
          brandingLinkTo={brandingLinkTo}
          subtext={subtext}
        />
        <Flex justifyContent="flex-end" ml="x3" flexGrow={1}>
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
};
/* eslint-enable react/destructuring-assignment */

const SmallNavBar = withMenuState(SmallNavBarNoState);

const SelectNavBarBasedOnWidth = ({
  width,
  defaultOpen,
  breakpointUpper,
  ...props
}: any) => {
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

type BaseNavBarProps = {
  menuData?: any;
  className?: string;
  breakpointUpper?: number | string;
  environment?: "training" | "development" | undefined;
  subtext?: string;
  brandingLinkHref?: string;
  logoSrc?: string;
};

const BaseNavBar = ({
  environment,
  breakpointUpper = "medium",
  ...props
}: BaseNavBarProps) => {
  const { breakpoints } = useTheme();
  return (
    <ReactResizeDetector handleWidth>
      <SelectNavBarBasedOnWidth
        breakpointUpper={breakpoints[breakpointUpper] || breakpointUpper}
        {...props}
        environment={environment}
      />
    </ReactResizeDetector>
  );
};

const NavBar = styled(BaseNavBar)({});

export default NavBar;
