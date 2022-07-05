import styled, { CSSObject, useTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { Icon } from "../Icon";
import { DefaultNDSThemeType } from "../theme.type";
import { Flex } from "../Flex";
import NavBarSearch from "../NavBarSearch/NavBarSearch";
import { PreventBodyElementScrolling, subPx, withMenuState, WithMenuStateProps } from "../utils";
import BrandLogoContainer, { BrandLogoContainerProps } from "./BrandLogoContainer";
import EnvironmentBanner from "./EnvironmentBanner";
import MobileMenu from "./MobileMenu";
import NavBarBackground from "./NavBarBackground";

type MobileMenuTriggerProps = {
  color?: string;
  hoverColor?: string;
  hoverBackground?: string;
  theme?: DefaultNDSThemeType;
};

const MobileMenuTrigger = styled.button(({ color, hoverColor, hoverBackground, theme }: MobileMenuTriggerProps) => ({
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
}));

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
  themeColorObject: any;
  environment?: "development" | "training";
  navBarHeight: string;
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
  themeColorObject,
  navBarHeight,
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
      breakpointLower={breakpoints ? breakpoints[breakpointLower] : breakpointLower}
      {...props}
    >
      {environment && <EnvironmentBanner>{environment}</EnvironmentBanner>}
      <NavBarBackground backgroundColor="white" height={navBarHeight}>
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

export type SmallNavBarProps = SmallNavBarNoStateProps & WithMenuStateProps;

export default SmallNavBar;
