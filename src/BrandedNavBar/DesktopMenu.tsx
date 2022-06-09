import React from "react";
import styled from "styled-components";
import { DefaultNDSThemeType } from "../theme.type";
import MenuTrigger from "./MenuTrigger";

const getSharedStyles = (color, theme) => {
  return {
    display: "block",
    color: theme.colors[color] || color,
    textDecoration: "none",
    border: "none",
    backgroundColor: "transparent",
    verticalAlign: "middle",
    lineHeight: theme.lineHeights.base,
    fontSize: `${theme.fontSizes.medium}`,
    padding: `${theme.space.x1} ${theme.space.x2}`,
    borderRadius: theme.radii.medium,
  };
};

type MenuLinkProps = {
  color?: string;
  hoverColor?: string;
  hoverBackground?: string;
  theme?: DefaultNDSThemeType;
};

const MenuLink = styled.a(
  ({ color, hoverColor, hoverBackground, theme }: MenuLinkProps) => ({
    ...getSharedStyles(color, theme),
    fontWeight: theme.fontWeights.medium,
    transition: ".2s",
    "&:hover, &:focus": {
      outline: "none",
      color: theme.colors[hoverColor] || hoverColor,
      backgroundColor: theme.colors[hoverBackground] || hoverBackground,
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

type MenuTextProps = {
  textColor?: string;
  theme?: DefaultNDSThemeType;
};

const MenuText = styled.div(({ textColor, theme }: MenuTextProps) => ({
  ...getSharedStyles(textColor, theme),
  fontWeight: theme.fontWeights.medium,
}));

const Nav = styled.nav({
  display: "flex",
  alignItems: "center",
});

const renderMenuTrigger = (menuItem, themeColorObject) => (
  <div key={menuItem.key ?? menuItem.name}>
    <MenuTrigger
      name={menuItem.name}
      aria-label={menuItem.ariaLabel}
      menuData={menuItem.items}
      {...themeColorObject}
    />
  </div>
);

const renderMenuLink = (menuItem, themeColorObject) => (
  <div key={menuItem.key ?? menuItem.name}>
    <MenuLink
      href={menuItem.href}
      to={menuItem.to}
      as={menuItem.as}
      {...themeColorObject}
    >
      {menuItem.name}
    </MenuLink>
  </div>
);

const renderCustom = (menuItem) => (
  <div key={menuItem.key ?? menuItem.name}>{menuItem.render()}</div>
);

const renderText = (menuItem, themeColorObject) => (
  <MenuText key={menuItem.key ?? menuItem.name} {...themeColorObject}>
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

const renderMenuItem = (menuItem, themeColorObject) =>
  getRenderFunction(menuItem)(menuItem, themeColorObject);

type BaseDesktopMenuProps = {
  menuData: any[];
  themeColorObject: any;
};

const BaseDesktopMenu = ({
  menuData,
  themeColorObject,
  ...props
}: BaseDesktopMenuProps) => (
  <Nav {...props}>
    {menuData.map((menuItem) => renderMenuItem(menuItem, themeColorObject))}
  </Nav>
);

const DesktopMenu = styled(BaseDesktopMenu)({
  "> div": {
    ":not(:last-of-type)": {
      marginRight: "8px",
    },
  },
});

export default DesktopMenu;
