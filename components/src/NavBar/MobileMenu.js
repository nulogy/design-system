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

const ApplyMenuLinkStyles = styled.li({
  "& *": {
    display: "block",
    color: theme.colors.white,
    fontSize: theme.fontSizes.large,
    lineHeight: theme.lineHeights.sectionTitle,
    width: "100%",
    justifyContent: "flex-start",
    padding: `${theme.space.x2} ${theme.space.x3} ${theme.space.x2} ${theme.space.x3}`,
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

const MobileMenuLink = styled(MenuLink)({
  fontSize: theme.fontSizes.large,
  lineHeight: theme.lineHeights.sectionTitle,
  width: "100%",
  justifyContent: "flex-start",
  padding: `${theme.space.x2} ${theme.space.x3} ${theme.space.x2} ${theme.space.x3}`,
  borderRadius: "0",
});

const ApplySubMenuLinkStyles = styled.li(({ layer }) => ({
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

const MobileSubMenuLink = styled(SubMenuLink)({
  maxWidth: "100%",
  "a": {
    marginBottom: theme.space.x1,
    transition: ".2s",
    "&:hover, &:focus": {
      backgroundColor: theme.colors.black,
    },
  },
});

const SubMenuItemsList = styled.ul({
  listStyle: "none",
  paddingLeft: "0",
  margin: "0",
});

const renderMenuLink = (menuItem, linkOnClick) => {
  if (menuItem.href) {
    return (
      <li key={ menuItem.name } onClick={ linkOnClick }>
        <MobileMenuLink href={ menuItem.href }>
          {menuItem.name}
        </MobileMenuLink>
      </li>
    );
  } else if (menuItem.link) {
    return (
      <ApplyMenuLinkStyles key={ menuItem.name } onClick={ linkOnClick }>
        {menuItem.link}
      </ApplyMenuLinkStyles>
    );
  } else {
    return (<div style={ { color: "red" } }>Data Missing</div>);
  }
};

const renderSubMenuLink = (menuItem, linkOnClick, layer) => {
  if (menuItem.href) {
    return (
      <li key={ menuItem.name } onClick={ linkOnClick }>
        <MobileSubMenuLink style={ { paddingLeft: `${(24 * layer) + 24}px` } } nameColor="white" descriptionColor="grey" hoverColor="black" { ...menuItem } />
      </li>
    );
  } else if (menuItem.link) {
    return (
      <ApplySubMenuLinkStyles key={ menuItem.name } layer={ layer } onClick={ linkOnClick }>
        {menuItem.link}
      </ApplySubMenuLinkStyles>
    );
  } else {
    return (<div style={ { color: "red" } }>Data Missing</div>);
  }
};

const isSubMenu = menuItem => (menuItem.items);

const renderMenuItems = (menuItems, linkOnClick, layer) => menuItems.map(menuItem => {
  if (isSubMenu(menuItem)) {
    return (
      <li key={ menuItem.name }>
        <SubMenu menuItem={ menuItem } layer={ layer } linkOnClick={ linkOnClick } />
      </li>
    );
  } else if (layer === 0) {
    return (renderMenuLink(menuItem, linkOnClick));
  } else {
    return (renderSubMenuLink(menuItem, linkOnClick, layer));
  }
});

const renderTopLayerMenuItems = (menuData, linkOnClick) => renderMenuItems(menuData, linkOnClick, 0);

const SubMenu = ({ menuItem, linkOnClick, layer }) => (
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
    <SubMenuItemsList>
      {renderMenuItems(menuItem.items, linkOnClick, layer + 1)}
    </SubMenuItemsList>
  </>
);

SubMenu.propTypes = {
  layer: PropTypes.number.isRequired,
  menuItem: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  linkOnClick: PropTypes.func,
};

SubMenu.defaultProps = {
  linkOnClick: null,
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
  }));

const MobileMenuTrigger = styled.button(
  {
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
  }
);

const MobileMenuBase = ({
  menuData,
  menuState: { isOpen, handleMenuToggle, closeMenu },
  ...props
}) => (
  <Box { ...props } display={ { small: "block", medium: "block", large: "none" } }>
    <MobileMenuTrigger onClick={ handleMenuToggle } aria-expanded={ isOpen ? true : null }>
      {
      isOpen
        ? <Icon icon="close" title="Close Menu" />
        : <Icon icon="menu" title="Open Menu" />
      }
    </MobileMenuTrigger>

    {
      isOpen
        && (
          <Menu>
            { menuData.primaryMenu && renderTopLayerMenuItems(menuData.primaryMenu, closeMenu) }
            { menuData.secondaryMenu && renderTopLayerMenuItems(menuData.secondaryMenu, closeMenu) }
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

const MobileMenu = styled(MobileMenuBase)({});

export default MobileMenu;
