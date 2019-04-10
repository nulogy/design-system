import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Box,
  Icon,
  SubsectionTitle,
  Text,
} from "ComponentsRoot";
import SubMenuLink from "./SubMenuLink";
import MenuLink from "./MenuLink";
import theme from "../theme";
import { subPx } from "../Utils";

const SubMenuItemsList = styled.ul(({ isTopLayer }) => ({
  listStyle: "none",
  paddingLeft: "0",
  margin: "0",
  marginBottom: isTopLayer ? theme.space.x4 : theme.space.x2,
}));

const MenuLinkStyles = styled.li({
  "& *": {
    display: "block",
    color: theme.colors.white,
    fontSize: theme.fontSizes.large,
    lineHeight: theme.lineHeights.sectionTitle,
    width: "100%",
    justifyContent: "flex-start",
    padding: `${theme.space.x2} ${theme.space.x3} ${theme.space.x2} ${theme.space.x3}`,
    marginBottom: theme.space.x4,
    borderRadius: "0",
    textDecoration: "none",
    "&:hover, &:focus": {
      outline: "none",
      backgroundColor: theme.colors.black,
    },
    "&:disabled": {
      opacity: ".5",
    },
  },
});

const SubMenuLinkStyles = styled.li(({layer})=>({
  color: theme.colors.black,
  justifyContent: "center",
  alignItems: "center",
  textDecoration: "none",
  lineHeight: theme.lineHeights.base,
  transition: ".2s",
  fontSize: theme.fontSizes.medium,
  "& *": {
    display: "block",
    color: theme.colors.white,
    textDecoration: "none",
    padding: `${theme.space.x1} ${theme.space.x2}`,
    paddingLeft: `${(24 * layer) + 24}px`,
    "&:hover, &:focus": {
      outline: "none",
      backgroundColor: theme.colors.black,
    },
    "&:disabled": {
      opacity: ".5",
    },
  },
}));

const isSubMenu = menuItem => (menuItem.items);

const renderMenuItems = (menuItems, layer) => menuItems.map(menuItem => {
  if (isSubMenu(menuItem)) {
    return (
      <li key={ menuItem.name }>
        <SubMenu menuItem={ menuItem } layer={ layer } />
      </li>
    );
  } else if (layer === 0) {
    return (renderMenuLink(menuItem));
  } else {
    return (renderSubMenuLink(menuItem, layer));
  }
});

const renderMenuLink = menuItem => {
  if( menuItem.href ) {
    return (
      <li key={ menuItem.name } >
        <MenuLink href={ menuItem.href }>
          {menuItem.name}
        </MenuLink>
      </li>
    );
  } else if ( menuItem.link ) {
    return (
      <MenuLinkStyles key={menuItem.name}>
        {menuItem.link}
      </MenuLinkStyles>
    );
  } else {
    return(<div style={{color: "red"}}>Data Missing</div>) 
  } 
}

const renderSubMenuLink = (menuItem, layer) => {
  if( menuItem.href ) {
    return (
      <li key={ menuItem.name }>
        <SubMenuLink style={ { paddingLeft: `${(24 * layer) + 24}px` } } nameColor="white" descriptionColor="grey" hoverColor="black" { ...menuItem } />
      </li>
    );
  } else if ( menuItem.link ) {
    console.log(layer);
    console.log(`${(24 * layer) + 24}px`);
    return (
      <SubMenuLinkStyles key={menuItem.name} layer={layer}>
        {menuItem.link}
      </SubMenuLinkStyles>
    );
  } else {
    return(<div style={{color: "red"}}>Data Missing</div>) 
  } 
}

const renderTopLayerMenuItems = menuData => renderMenuItems(menuData, 0);

const SubMenu = ({ menuItem, layer }) => (
  <>
    { layer === 0
    && (
    <SubsectionTitle color="grey" style={ { paddingLeft: `${(24 * layer) + 24}px` } } key={ menuItem.name }>
      {menuItem.name}
    </SubsectionTitle>
    )}
    { layer > 0
    && (
    <Text color="grey" mt={ theme.space.x2 } mb={ theme.space.x1 } style={ { paddingLeft: `${(24 * layer) + 24}px` } } key={ menuItem.name }>
      {menuItem.name}
    </Text>
    )}
    <SubMenuItemsList isTopLayer={ layer === 0 }>
      {renderMenuItems(menuItem.items, layer + 1)}
    </SubMenuItemsList>
  </>
);

SubMenu.propTypes = {
  layer: PropTypes.number.isRequired,
  menuItem: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const Menu = styled.ul(() => (
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
      padding: `0 ${theme.space.x3}`,
      marginBottom: theme.space.x2,
    },
    [`${SubMenuLink}`]: {
      maxWidth: "100%",
      "a": {
        padding: `${theme.space.x1} ${theme.space.x3} ${theme.space.x1} ${theme.space.x3}`,
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
      padding: `${theme.space.x2} ${theme.space.x3} ${theme.space.x2} ${theme.space.x3}`,
      marginBottom: theme.space.x4,
      borderRadius: "0",
    },
  }));

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
            { menuData.primaryMenu && renderTopLayerMenuItems(menuData.primaryMenu) }
            { menuData.secondaryMenu && renderTopLayerMenuItems(menuData.secondaryMenu) }
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
