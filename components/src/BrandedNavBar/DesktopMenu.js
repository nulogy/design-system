import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
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
    borderRadius: theme.radii.medium
  };
};

const ApplyMenuLinkStyles = styled.div(({ color, hoverColor, hoverBackground, theme }) => ({
  "*": {
    ...getSharedStyles(color, theme),
    transition: ".2s",
    "&:hover, &:focus": {
      outline: "none",
      color: theme.colors.hoverColor || hoverColor,
      backgroundColor: theme.colors.hoverBackground || hoverBackground,
      cursor: "pointer"
    },
    "&:disabled": {
      opacity: ".5"
    },
    "&:focus": {
      boxShadow: theme.shadows.focus
    }
  }
}));

ApplyMenuLinkStyles.propTypes = {
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  hoverBackground: PropTypes.string
};

ApplyMenuLinkStyles.defaultProps = {
  color: "white",
  hoverColor: "lightBlue",
  hoverBackground: "black"
};

const MenuLink = styled.a(({ color, hoverColor, hoverBackground, theme }) => ({
  ...getSharedStyles(color, theme),
  transition: ".2s",
  "&:hover, &:focus": {
    outline: "none",
    color: theme.colors.hoverColor || hoverColor,
    backgroundColor: theme.colors.hoverBackground || hoverBackground,
    cursor: "pointer"
  },
  "&:disabled": {
    opacity: ".5"
  },
  "&:focus": {
    boxShadow: theme.shadows.focus
  }
}));

const MenuText = styled.div(({ textColor, theme }) => ({
  ...getSharedStyles(textColor, theme)
}));

const Nav = styled.nav({
  display: "flex"
});

const renderMenuTrigger = (menuItem, themeColorObject) => (
  <div key={menuItem.name}>
    <MenuTrigger name={menuItem.name} aria-label={menuItem.ariaLabel} menuData={menuItem.items} {...themeColorObject} />
  </div>
);

const renderMenuLink = (menuItem, themeColorObject) => (
  <div key={menuItem.name}>
    <MenuLink href={menuItem.href} {...themeColorObject}>
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

const getRenderFunction = menuItem => {
  if (menuItem.items) {
    return renderMenuTrigger;
  } else if (menuItem.href) {
    return renderMenuLink;
  } else if (menuItem.render) {
    return renderCustom;
  } else {
    return renderText;
  }
};

const renderMenuItem = (menuItem, themeColorObject) => getRenderFunction(menuItem)(menuItem, themeColorObject);

const BaseDesktopMenu = ({ menuData, themeColorObject, ...props }) => (
  <Nav {...props}>{menuData.map(menuItem => renderMenuItem(menuItem, themeColorObject))}</Nav>
);

BaseDesktopMenu.propTypes = {
  menuData: PropTypes.arrayOf(PropTypes.shape({})),
  themeColorObject: PropTypes.shape({})
};

BaseDesktopMenu.defaultProps = {
  menuData: null,
  themeColorObject: null
};

const DesktopMenu = styled(BaseDesktopMenu)({
  div: {
    ":not(:last-of-type)": {
      marginRight: "8px"
    }
  }
});

export default DesktopMenu;
