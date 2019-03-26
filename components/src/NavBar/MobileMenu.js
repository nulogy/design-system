import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Box,
  Icon,
  SubsectionTitle,
} from "ComponentsRoot";
import SubMenuItem from "./SubMenuItem";
import MenuLink from "./MenuLink";
import SubMenuItems from "./MenuDropdown/SubMenuItems";
import theme from "../theme";
import { subPx } from "../Utils";

const isSubMenu = menuItem => (menuItem.subMenuItems);

const SubMenu = ({ menuItem }) => (
  <div>
    <SubsectionTitle key={ menuItem.text }>{menuItem.text}</SubsectionTitle>
    <SubMenuItems>
      {
        menuItem.subMenuItems.map(subMenuItem => (
          <SubMenuItem textColor="white" subTextColor="grey" key={ subMenuItem.text } { ...subMenuItem } />
        ))
      }
    </SubMenuItems>
  </div>
);

SubMenu.propTypes = {
  menuItem: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
};

const renderMenuItems = menuItems => menuItems.map(menuItem => {
  if (isSubMenu(menuItem)) {
    return <SubMenu key={ menuItem.text } menuItem={ menuItem } />;
  } else {
    return (
      <MenuLink key={ menuItem.text } href={ menuItem.href }>
        {menuItem.text}
      </MenuLink>
    );
  }
});

const MobileMenuBase = ({
  menuData,
  menuState: { isOpen, handleMenuToggle },
  ...props
}) => (
  <Box { ...props } display={ { small: "block", medium: "block", large: "none" } }>
    <button onClick={ handleMenuToggle } aria-expanded={ isOpen ? true : null }>
      {
      isOpen
        ? <Icon icon="close" title="Close Menu" />
        : <Icon icon="menu" title="Open Menu" />
    }
    </button>

    {
      isOpen
        && (
          <Menu>
            { renderMenuItems(menuData.primaryMenu) }
            { renderMenuItems(menuData.secondaryMenu) }
          </Menu>
        )
    }
  </Box>
);

MobileMenuBase.propTypes = {
  menuData: PropTypes.shape({}),
  menuState: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    handleMenuToggle: PropTypes.func.isRequired,
  }).isRequired,
};

MobileMenuBase.defaultProps = {
  menuData: null,
};

const Menu = styled(Box)(() => (
  {
    position: "absolute",
    left: "0",
    top: "72px",
    padding: `${theme.space.x4} 0`,
    zIndex: "10",
    width: "100%",
    backgroundColor: theme.colors.blackBlue,
    color: theme.colors.white,
    [`${SubsectionTitle}`]: {
      padding: `0 ${theme.space.x4}`,
      marginBottom: theme.space.x2,
    },
    [`${SubMenuItems}`]: {
      marginBottom: theme.space.x4,
    },
    [`${SubMenuItem}`]: {
      maxWidth: "100%",
      "a": {
        padding: `${theme.space.x1} ${theme.space.x6}`,
        marginBottom: theme.space.x1,
        transition: ".2s",
        "&:hover, &:focus": {
          backgroundColor: theme.colors.black,
        },
      },
    },
    [`${MenuLink}`]: {
      fontSize: theme.fontSizes.large,
      lineHeight: theme.lineHeights.sectionTitle,
      width: "100%",
      justifyContent: "flex-start",
      padding: `${theme.space.x2} ${theme.space.x4}`,
      marginBottom: theme.space.x4,
      borderRadius: "0",
    },
  }));

const MobileMenu = styled(MobileMenuBase)(
  {
    "button": {
      color: theme.colors.white,
      background: "none",
      border: "none",
      padding: `${subPx(theme.space.x1)} ${theme.space.x1}`,
      marginLeft: theme.space.x1,
      borderRadius: theme.radii.medium,
      transition: ".2s",
      "&:hover, &:focus": {
        outline: "none",
        color: theme.colors.lightBlue,
        backgroundColor: theme.colors.black,
        cursor: "pointer",
      },
    },
  },
);

export default MobileMenu;
