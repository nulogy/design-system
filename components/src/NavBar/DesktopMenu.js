import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MenuTrigger from "./MenuTrigger";
import MenuLink from "./MenuLink";
import theme from "../theme";

const ApplyMenuLinkStyles = styled.div(({ themeColors }) => ({
  "*": {
    display: "block",
    color: (themeColors && themeColors.color) || theme.colors.white,
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
      color: (themeColors && themeColors.hoverColor) || theme.colors.lightBlue,
      backgroundColor: (themeColors && themeColors.hoverBackground) || theme.colors.black,
      cursor: "pointer"
    },
    "&:disabled": {
      opacity: ".5"
    }
  }
}));

const Nav = styled.nav({
  display: "flex"
});

const renderMenuTrigger = (menuItem, themeColors) => (
  <div key={menuItem.name}>
    <MenuTrigger themeColors={themeColors} name={menuItem.name} menuData={menuItem.items} />
  </div>
);

const renderMenuLink = (menuItem, themeColors) => (
  <div key={menuItem.name}>
    <MenuLink themeColors={themeColors} href={menuItem.href}>
      {menuItem.name}
    </MenuLink>
  </div>
);

const renderCustom = (menuItem, themeColors) => (
  <ApplyMenuLinkStyles themeColors={themeColors} key={menuItem.name}>
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
