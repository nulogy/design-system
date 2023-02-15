import React from "react";
import styled from "styled-components";
import { Icon } from "../Icon";
import { DefaultNDSThemeType } from "../theme.type";
import MenuTrigger from "./MenuTrigger";
import type { MenuType } from "./MenuTrigger";

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

const MenuLink = styled.a(({ color, hoverColor, hoverBackground, theme }: MenuLinkProps) => ({
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
}));

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

const renderMenuTrigger = (menuItem, themeColorObject, layer, menuType) => (
  <div key={menuItem.key ?? menuItem.name}>
    <MenuTrigger
      menuType={menuType}
      name={menuItem.name}
      aria-label={menuItem.ariaLabel}
      menuData={menuItem.items}
      trigger={menuItem.trigger}
      layer={layer}
      {...themeColorObject}
    />
  </div>
);

const renderMenuLink = (menuItem, themeColorObject) => {
  const linkProps = {
    href: menuItem.href,
    to: menuItem.to,
    as: menuItem.as,
    target: menuItem.openInNew ? "_blank" : undefined,
  };

  return (
    <div key={menuItem.key ?? menuItem.name}>
      <MenuLink {...linkProps} {...themeColorObject}>
        {menuItem.name}
        {menuItem.openInNew && <Icon size="16px" mb="-2px" ml="4px" icon="openInNew" />}
      </MenuLink>
    </div>
  );
};

const renderCustom = (menuItem, _themeColorObject, layer) => (
  <div key={menuItem.key ?? menuItem.name}>{menuItem.render({ size: "medium", layer })}</div>
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

const renderMenuItem = (menuItem, themeColorObject, layer, menuType) =>
  getRenderFunction(menuItem)(menuItem, themeColorObject, layer, menuType);

export type DesktopMenuProps = {
  menuData: any[];
  menuType: MenuType;
  themeColorObject: any;
};

const BaseDesktopMenu = React.forwardRef<HTMLElement, DesktopMenuProps>(
  ({ menuData, menuType, themeColorObject, ...props }, ref) => (
    <Nav {...props} ref={ref}>
      {menuData.map((menuItem) => renderMenuItem(menuItem, themeColorObject, 0, menuType))}
    </Nav>
  )
);

const DesktopMenu = styled(BaseDesktopMenu)({
  "> div": {
    ":not(:last-of-type)": {
      marginRight: "8px",
    },
  },
});

export default DesktopMenu;
