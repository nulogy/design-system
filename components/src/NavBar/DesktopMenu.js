import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MenuTrigger from "./MenuTrigger";
import MenuLink from "./MenuLink";
import theme from "../theme";

const ApplyMenuLinkStyles = styled.div({
  "*": {
    display: "block",
    color: theme.colors.white,
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
      color: theme.colors.lightBlue,
      backgroundColor: theme.colors.black,
      cursor: "pointer",
    },
    "&:disabled": {
      opacity: ".5",
    },
  },
});

const Nav = styled.nav({
  display: "flex",
});

const renderMenuTrigger = menuItem => (
  <div key={ menuItem.name }>
    <MenuTrigger name={ menuItem.name } menuData={ menuItem.items } />
  </div>
);

const renderMenuLink = menuItem => (
  <div key={ menuItem.name }>
    <MenuLink href={ menuItem.href }>
      {menuItem.name}
    </MenuLink>
  </div>
);

const renderCustom = menuItem => (
  <ApplyMenuLinkStyles key={ menuItem.name }>
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
    return (() => (null));
  }
};

const renderMenuItem = menuItem => (getRenderFunction(menuItem)(menuItem));

const BaseDesktopMenu = ({
  menuData,
  ...props
}) => (
  <Nav { ...props }>
    {menuData.map(renderMenuItem)}
  </Nav>
);

BaseDesktopMenu.propTypes = {
  menuData: PropTypes.arrayOf(PropTypes.shape({})),
};

BaseDesktopMenu.defaultProps = {
  menuData: null,
};

const DesktopMenu = styled(BaseDesktopMenu)(
  {
    "div": {
      ":not(:last-of-type)": {
        marginRight: theme.space.x1,
      },
    },
  },
);

export default DesktopMenu;
