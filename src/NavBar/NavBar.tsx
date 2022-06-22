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
import { subPx } from "../utils";
import { DefaultNDSThemeType } from "../theme.type";
import DesktopMenu from "./DesktopMenu";
import isValidMenuItem from "./isValidMenuItem";
import SmallNavBar from "./SmallNavBar";

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

export const getThemeColor = (themeColor) => themeColors[themeColor] || themeColors.blue;

export const NavBarBackground = styled(Flex)<{
  backgroundColor: string;
  theme?: DefaultNDSThemeType;
}>(({ backgroundColor, theme }) => ({
  background: backgroundColor,
  padding: `${theme.space.x2} ${theme.space.x3}`,
}));

export const BrandingLink = ({ to, href, children, ...props }) => (
  <Link href={href} to={to} {...props}>
    {children}
  </Link>
);

type MediumNavBarProps = {
  subtext?: string;
  menuData?: any;
  themeColor?: string;
  brandingLinkHref?: string;
  brandingLinkTo?: string;
  brandingLinkComponent?: React.ElementType;
  environment?: "development" | "training";
};

const MediumNavBar: React.FC<MediumNavBarProps> = ({
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
          <Branding logoColor={getThemeColor(themeColor).logoColor} subtext={subtext} />
        </BrandingLink>
        <Flex
          justifyContent="space-between"
          alignContent="flex-end"
          style={{ flexGrow: 1, margin: `0 0 0 ${theme.space.x3}` }}
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
              <Box maxWidth="18em" mr={menuData.secondaryMenu ? theme.space.x1 : theme.space.none}>
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

export const MenuDataPropTypes = {
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

export const MobileMenuTrigger = styled.button<{
  hoverColor: string;
  hoverBackground: string;
}>(({ color, hoverColor, hoverBackground }) => ({
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
    cursor: "pointer",
  },
  "&:focus": {
    boxShadow: theme.shadows.focus,
  },
}));

export const SmallHeader = styled.header<{ isOpen: boolean }>(({ isOpen }) =>
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

export const pixelDigitsFrom = (pixelString) => parseInt(pixelString, 10);

export const MenuIcon = ({ isOpen }) => {
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

const SelectNavBarBasedOnWidth = ({ width, defaultOpen, breakpointUpper, ...props }) => {
  const currentWidth = width || (typeof window !== "undefined" && window.innerWidth);

  if (currentWidth >= pixelDigitsFrom(breakpointUpper)) {
    return <MediumNavBar {...props} />;
  } else {
    return (
      // @ts-ignore
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
