import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { display, themeGet } from "styled-system";
import { Text, SubsectionTitle } from "../Type";
import { BrandingText } from "../Branding";
import MenuLink from "./MenuLink";
import theme from "../theme";

const BrandingWrap = styled.div(
  {
    marginTop: `-${theme.space.x1}`,
    marginBottom: theme.space.x3,
    marginLeft: theme.space.x3,
    color: theme.colors.white
  },
  ({ color }) => ({
    color: themeGet(`colors.${color}`, color)(color),
    active: {
      color: themeGet(`colors.${color}`, color)(color)
    },
    visited: {
      color: themeGet(`colors.${color}`, color)(color)
    }
  })
);

const getPaddingLeft = layer => `${24 * layer + 24}px`;

const ApplyMenuLinkStyles = styled.li(({ color, hoverColor, hoverBackground, layer }) => ({
  display: "block",
  marginBottom: theme.space.x1,
  "*": {
    display: "block",
    color: themeGet(`colors.${color}`, color)(color),
    fontSize: layer === 0 ? theme.fontSizes.large : theme.fontSizes.medium,
    lineHeight: layer === 0 ? theme.lineHeights.subsectionTitle : theme.lineHeights.base,
    padding: layer === 0 ? `${theme.space.x1} ${theme.space.x3}` : `${theme.space.x1} ${theme.space.x2}`,
    paddingLeft: getPaddingLeft(layer),
    borderRadius: "0",
    textDecoration: "none",
    "&:hover, &:focus": {
      outline: "none",
      color: themeGet(`colors.${hoverColor}`, hoverColor)(hoverColor),
      backgroundColor: themeGet(`colors.${hoverBackground}`, hoverBackground)(hoverBackground)
    },
    "&:disabled": {
      opacity: ".5"
    }
  }
}));

ApplyMenuLinkStyles.propTypes = {
  layer: PropTypes.number,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  hoverBackground: PropTypes.string
};

ApplyMenuLinkStyles.defaultProps = {
  layer: 0,
  color: theme.colors.white,
  hoverColor: theme.colors.lightBlue,
  hoverBackground: theme.colors.black
};

const MobileMenuLink = styled(MenuLink)(
  {
    width: "100%",
    borderRadius: "0"
  },
  ({ layer }) => ({
    fontSize: layer === 0 ? theme.fontSizes.large : theme.fontSizes.medium,
    lineHeight: layer === 0 ? theme.lineHeights.subsectionTitle : theme.lineHeights.base,
    padding: layer === 0 ? `${theme.space.x1} ${theme.space.x3}` : `${theme.space.x1} ${theme.space.x2}`,
    paddingLeft: getPaddingLeft(layer)
  })
);

const SubMenuItemsList = styled.ul({
  listStyle: "none",
  paddingLeft: "0",
  margin: "0"
});

const renderMenuLink = (menuItem, linkOnClick, themeColorObject, layer) => (
  <li key={menuItem.name} style={{ display: "block", marginBottom: theme.space.x1 }}>
    <MobileMenuLink layer={layer} {...themeColorObject} onClick={linkOnClick} href={menuItem.href}>
      {menuItem.name}
    </MobileMenuLink>
  </li>
);

const renderCustom = (menuItem, linkOnClick, themeColorObject, layer) => (
  <ApplyMenuLinkStyles key={menuItem.name} {...themeColorObject} layer={layer} onClick={linkOnClick}>
    {menuItem.render()}
  </ApplyMenuLinkStyles>
);

const renderSubMenu = (menuItem, linkOnClick, themeColorObject, layer) => (
  <li key={menuItem.name} style={{ display: "block" }}>
    <SubMenu menuItem={menuItem} layer={layer} themeColorObject={themeColorObject} linkOnClick={linkOnClick} />
  </li>
);

const getRenderFunction = menuItem => {
  if (menuItem.items) {
    return renderSubMenu;
  } else if (menuItem.render) {
    return renderCustom;
  } else {
    return renderMenuLink;
  }
};

const renderMenuItems = (menuItems, linkOnClick, themeColorObject, layer) =>
  menuItems.map(menuItem => {
    const render = getRenderFunction(menuItem);
    return render(menuItem, linkOnClick, themeColorObject, layer);
  });

const renderTopLayerMenuItems = (menuData, linkOnClick, themeColorObject) =>
  renderMenuItems(menuData, linkOnClick, themeColorObject, 0);

const getSubMenuHeading = (layer, color, name) =>
  layer === 0 ? (
    <SubsectionTitle mb={theme.space.x1} color={color}>
      {name}
    </SubsectionTitle>
  ) : (
    <Text mb={theme.space.x1} color={color} py={theme.space.x1} style={{ paddingLeft: getPaddingLeft(layer) }}>
      {name}
    </Text>
  );

const SubMenu = ({ menuItem, linkOnClick, themeColorObject, layer }) => (
  <>
    {getSubMenuHeading(layer, themeColorObject && themeColorObject.mobileMenuHeading, menuItem.name)}
    <SubMenuItemsList>{renderMenuItems(menuItem.items, linkOnClick, themeColorObject, layer + 1)}</SubMenuItemsList>
  </>
);

SubMenu.propTypes = {
  layer: PropTypes.number.isRequired,
  menuItem: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  linkOnClick: PropTypes.func,
  themeColorObject: PropTypes.shape({})
};

SubMenu.defaultProps = {
  linkOnClick: null,
  themeColorObject: undefined
};

const Menu = styled.ul(() => ({
  margin: "0",
  padding: `${theme.space.x1} 0`,
  zIndex: "10",
  width: "100%",
  color: theme.colors.white,
  [`${SubsectionTitle}`]: {
    padding: `${theme.space.x1} 0 ${theme.space.x1} ${theme.space.x3}`
  }
}));

const Nav = styled.nav(
  ({ backgroundColor }) => ({
    backgroundColor
  }),
  {
    minHeight: "calc(100vh - 72px)"
  }
);

const BaseMobileMenu = ({ menuData, closeMenu, subtext, includeSubtext, themeColorObject, ...props }) => (
  <Nav backgroundColor={themeColorObject && themeColorObject.background} {...props}>
    {subtext && includeSubtext && (
      <BrandingWrap color={themeColorObject && themeColorObject.color}>
        <BrandingText>{subtext}</BrandingText>
      </BrandingWrap>
    )}
    <Menu>
      {menuData.primaryMenu && renderTopLayerMenuItems(menuData.primaryMenu, closeMenu, themeColorObject)}
      {menuData.secondaryMenu && renderTopLayerMenuItems(menuData.secondaryMenu, closeMenu, themeColorObject)}
    </Menu>
  </Nav>
);

BaseMobileMenu.propTypes = {
  menuData: PropTypes.shape({
    primaryMenu: PropTypes.arrayOf(PropTypes.shape({})),
    secondaryMenu: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  subtext: PropTypes.string,
  includeSubtext: PropTypes.bool,
  closeMenu: PropTypes.func,
  themeColorObject: PropTypes.shape({})
};

BaseMobileMenu.defaultProps = {
  menuData: null,
  subtext: null,
  includeSubtext: false,
  closeMenu: () => {},
  themeColorObject: undefined
};

const MobileMenu = styled(BaseMobileMenu)(display);

export default MobileMenu;
