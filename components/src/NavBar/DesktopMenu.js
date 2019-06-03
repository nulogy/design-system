import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import { themeGet } from "styled-system";
import MenuTrigger from "./MenuTrigger";
import MenuLink from "./MenuLink";

const ApplyMenuLinkStyles = styled.div(({ color, hoverColor, hoverBackground }) => ({
  "*": {
    display: "block",
    color: themeGet(`colors.${color}`, color)(color),
    textDecoration: "none",
    border: "none",
    backgroundColor: "transparent",
    verticalAlign: "middle",
    lineHeight: theme.lineHeights.base,
    transition: ".2s",
    fontSize: `${theme.fontSizes.medium}`,
    padding: `${theme.space.x1} ${theme.space.x2}`,
    borderRadius: theme.radii.medium,
    "&:hover, &:focus": {
      outline: "none",
      color: themeGet(`colors.${hoverColor}`, hoverColor)(hoverColor),
      backgroundColor: themeGet(`colors.${hoverBackground}`, hoverBackground)(hoverBackground),
      cursor: "pointer"
    },
    "&:disabled": {
      opacity: ".5"
    }
  }
}));

ApplyMenuLinkStyles.propTypes = {
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  hoverBackground: PropTypes.string
};

ApplyMenuLinkStyles.defaultProps = {
  color: theme.colors.white,
  hoverColor: theme.colors.lightBlue,
  hoverBackground: theme.colors.black
};

const Nav = styled.nav({
  display: "flex"
});

const renderMenuTrigger = (menuItem, themeColors) => (
  <div key={menuItem.name}>
    <MenuTrigger name={menuItem.name} menuData={menuItem.items} {...themeColors} />
  </div>
);

const renderMenuLink = (menuItem, themeColors) => (
  <div key={menuItem.name}>
    <MenuLink href={menuItem.href} {...themeColors}>
      {menuItem.name}
    </MenuLink>
  </div>
);

const renderCustom = (menuItem, themeColors) => (
  <ApplyMenuLinkStyles {...themeColors} key={menuItem.name}>
    {menuItem.render()}
  </ApplyMenuLinkStyles>
);

const getRenderFunction = menuItem => {
  if (menuItem.items) {
    return renderMenuTrigger;
  } else if (menuItem.href) {
    return renderMenuLink;
  } else if (menuItem.render) {
    return renderCustom;
  } else {
    return () => null;
  }
};

const renderMenuItem = (menuItem, themeColors) => getRenderFunction(menuItem)(menuItem, themeColors);

const BaseDesktopMenu = ({ menuData, themeColors, ...props }) => (
  <Nav {...props}>{menuData.map(menuItem => renderMenuItem(menuItem, themeColors))}</Nav>
);

BaseDesktopMenu.propTypes = {
  menuData: PropTypes.arrayOf(PropTypes.shape({}))
};

BaseDesktopMenu.defaultProps = {
  menuData: null
};

const DesktopMenu = styled(BaseDesktopMenu)({
  div: {
    ":not(:last-of-type)": {
      marginRight: theme.space.x1
    }
  }
});

export default DesktopMenu;
