import styled, { CSSObject, useTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { Icon } from "../Icon";
import { DefaultNDSThemeType } from "../theme";
import { Flex } from "../Flex";
import NavBarSearch from "../NavBarSearch/NavBarSearch";
import { withMenuState, WithMenuStateProps, AcceptsMenuStateProps } from "../utils";
import EnvironmentBanner from "../Navigation/components/EnvironmentBanner/EnvironmentBanner";
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
  padding: theme.space.x1,
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

const SmallHeader = styled.header<SmallHeaderProps>(
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

/** @deprecated The BrandedNavBar component is deprecated. Use the Navigation component instead. */
export type RenderMenuButtonProps = {
  themeColorObject: any;
  onClick: () => void;
  ariaExpanded: true | null;
  isOpen: boolean;
};

type SmallNavBarNoStateProps = {
  menuData?: any;
  subtext?: string;
  breakpointLower?: number | string;
  width?: number;
  themeColor?: "blue" | "white";
  themeColorObject?: any;
  environment?: "development" | "training";
  navBarHeight: string;
  logo?: React.ReactElement;
  showNulogyLogo?: boolean;
  renderMenuButton?: (props: RenderMenuButtonProps) => React.ReactElement;
} & AcceptsMenuStateProps;

/* eslint-disable react/destructuring-assignment */
const SmallNavBarNoState = ({
  menuData,
  menuState: { isOpen, toggleMenu, closeMenu },
  subtext,
  environment,
  showNulogyLogo,
  breakpointLower = "small",
  themeColorObject,
  navBarHeight,
  logo,
  renderMenuButton,
  ...props
}: SmallNavBarNoStateProps) => {
  const navRef = React.useRef(null);

  useEffect(() => {
    if (navRef && navRef.current) {
      navRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  const { breakpoints } = useTheme();
  const ariaExpanded = isOpen ? true : null;
  return (
    <SmallHeader
      ref={navRef}
      isOpen={isOpen}
      breakpointLower={breakpoints ? breakpoints[breakpointLower] : breakpointLower}
      {...props}
    >
      {environment && <EnvironmentBanner>{environment}</EnvironmentBanner>}
      <NavBarBackground backgroundColor="white" height={navBarHeight}>
        {logo}
        <Flex justifyContent="flex-end" ml="x3" flexGrow={1}>
          {menuData.search && (
            <Flex maxWidth="18em" alignItems="center" px="0">
              <NavBarSearch {...menuData.search} />
            </Flex>
          )}
          {(menuData.primaryMenu || menuData.secondaryMenu) &&
            (renderMenuButton ? (
              renderMenuButton({
                themeColorObject: themeColorObject,
                onClick: toggleMenu,
                ariaExpanded,
                isOpen,
              })
            ) : (
              <MobileMenuTrigger {...themeColorObject} onClick={toggleMenu} aria-expanded={ariaExpanded}>
                <MenuIcon isOpen={isOpen} />
              </MobileMenuTrigger>
            ))}
        </Flex>
      </NavBarBackground>
      {isOpen && (
        <MobileMenu
          themeColorObject={themeColorObject}
          subtext={subtext}
          menuData={menuData}
          closeMenu={closeMenu}
          showNulogyLogo={showNulogyLogo}
        />
      )}
    </SmallHeader>
  );
};
/* eslint-enable react/destructuring-assignment */

const SmallNavBar = withMenuState(SmallNavBarNoState);

/** @deprecated The BrandedNavBar component is deprecated. Use the Navigation component instead. */
export type SmallNavBarProps = SmallNavBarNoStateProps & WithMenuStateProps;

/** @deprecated The BrandedNavBar component is deprecated. Use the Navigation component instead. */
export default SmallNavBar;
