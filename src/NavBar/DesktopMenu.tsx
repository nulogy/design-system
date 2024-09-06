import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import type { CSSObject } from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import theme from "../theme";
import MenuTrigger from "./MenuTrigger";

const getSharedStyles = (color): CSSObject => ({
  display: "flex",
  alignItems: "center",
  gap: theme.space.half,
  color: themeGet(`colors.${color}`, color)(color),
  textDecoration: "none",
  border: "none",
  backgroundColor: "transparent",
  verticalAlign: "middle",
  lineHeight: theme.lineHeights.base,
  fontSize: `${theme.fontSizes.medium}`,
  padding: `${theme.space.x1} ${theme.space.x2}`,
  borderRadius: theme.radii.medium,
});

const ApplyMenuLinkStyles = styled.div<{
  hoverColor: string;
  hoverBackground: string;
}>(({ color, hoverColor, hoverBackground }) => ({
  "*": {
    ...getSharedStyles(color),
    transition: ".2s",
    "&:hover, &:focus": {
      outline: "none",
      color: themeGet(`colors.${hoverColor}`, hoverColor)(hoverColor),
      backgroundColor: themeGet(`colors.${hoverBackground}`, hoverBackground)(hoverBackground),
      cursor: "pointer",
    },
    "&:disabled": {
      opacity: ".5",
    },
    "&:focus": {
      boxShadow: theme.shadows.focus,
    },
  },
}));

ApplyMenuLinkStyles.propTypes = {
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  hoverBackground: PropTypes.string,
};

ApplyMenuLinkStyles.defaultProps = {
  color: theme.colors.white,
  hoverColor: theme.colors.lightBlue,
  hoverBackground: theme.colors.black,
};

const MenuLink = styled.a<{ hoverColor: string; hoverBackground: string }>(
  ({ color, hoverColor, hoverBackground }) => ({
    ...getSharedStyles(color),
    transition: ".2s",
    "&:hover, &:focus": {
      outline: "none",
      color: themeGet(`colors.${hoverColor}`, hoverColor)(hoverColor),
      backgroundColor: themeGet(`colors.${hoverBackground}`, hoverBackground)(hoverBackground),
      cursor: "pointer",
    },
    "&:disabled": {
      opacity: ".5",
    },
    "&:focus": {
      boxShadow: theme.shadows.focus,
    },
  })
);

const MenuText = styled.div<{ textColor: string }>(({ textColor }) => ({
  ...getSharedStyles(textColor),
}));

const Nav = styled.nav({
  display: "flex",
});

const renderMenuTrigger = (menuItem, themeColorObject) => (
  <div key={menuItem.name}>
    <MenuTrigger name={menuItem.name} aria-label={menuItem.ariaLabel} menuData={menuItem.items} {...themeColorObject} />
  </div>
);

const renderMenuLink = (menuItem, themeColorObject) => (
  <div key={menuItem.name}>
    <MenuLink href={menuItem.href} as={menuItem.as} to={menuItem.to} {...themeColorObject}>
      {menuItem.name}
    </MenuLink>
  </div>
);

const renderCustom = (menuItem, themeColorObject) => (
  <ApplyMenuLinkStyles {...themeColorObject} key={menuItem.name}>
    {menuItem.render()}
  </ApplyMenuLinkStyles>
);

const renderText = (menuItem, themeColorObject) => (
  <MenuText key={menuItem.name} {...themeColorObject}>
    {menuItem.name}
  </MenuText>
);

const getRenderFunction = (menuItem) => {
  if (menuItem.items) {
    return renderMenuTrigger;
  } else if (menuItem.href || menuItem.to) {
    return renderMenuLink;
  } else if (menuItem.render) {
    return renderCustom;
  } else {
    return renderText;
  }
};

const renderMenuItem = (menuItem, themeColorObject) => getRenderFunction(menuItem)(menuItem, themeColorObject);

const BaseDesktopMenu = ({ menuData, themeColorObject, ...props }) => (
  <Nav {...props}>{menuData.map((menuItem) => renderMenuItem(menuItem, themeColorObject))}</Nav>
);

BaseDesktopMenu.propTypes = {
  menuData: PropTypes.arrayOf(PropTypes.shape({})),
  themeColorObject: PropTypes.shape({}),
};

const DesktopMenu = styled(BaseDesktopMenu)({
  "> div": {
    ":not(:last-of-type)": {
      marginRight: theme.space.x1,
    },
  },
});

export default DesktopMenu;
