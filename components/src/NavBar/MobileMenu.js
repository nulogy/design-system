import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { display } from "styled-system";
import { themeGet } from "styled-system";
import { Text, SubsectionTitle } from "../Type";
import { BrandingText } from "../Branding";
import SubMenuLink from "./SubMenuLink";
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
    color: themeGet(`colors.${color}`, color)(color)
    active: {
      color: themeGet(`colors.${color}`, color)(color)
    },
    visited: {
      color: themeGet(`colors.${color}`, color)(color)
    }
  }),
);

const ApplyMenuLinkStyles = styled.li({
  display: "block",
  marginBottom: theme.space.x1,
  "*": {
    display: "block",
    color: theme.colors.white,
    fontSize: theme.fontSizes.large,
    lineHeight: theme.lineHeights.subsectionTitle,
    padding: `${theme.space.x1} ${theme.space.x3} ${theme.space.x1} ${theme.space.x3}`,
    borderRadius: "0",
    textDecoration: "none",
    "&:hover, &:focus": {
      outline: "none",
      backgroundColor: theme.colors.black
    },
    "&:disabled": {
      opacity: ".5"
    }
  }
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

const renderMenuLink = (menuItem, linkOnClick, themeColors, layer) => (
  <li key={menuItem.name} style={{ display: "block", marginBottom: theme.space.x1 }}>
    <MobileMenuLink layer={layer} {...themeColors} onClick={linkOnClick} href={menuItem.href}>
      {menuItem.name}
    </MobileMenuLink>
  </li>
);

const renderCustom = (menuItem, linkOnClick, themeColors, layer) => (
  <ApplyMenuLinkStyles key={menuItem.name} {...themeColors} layer={layer} onClick={linkOnClick}>
    {menuItem.render()}
  </ApplyMenuLinkStyles>
);

const renderSubMenu = (menuItem, linkOnClick, themeColors, layer) => (
  <li key={menuItem.name} style={{ display: "block" }}>
    <SubMenu menuItem={menuItem} layer={layer} themeColors={themeColors} linkOnClick={linkOnClick} />
  </li>
);

const getRenderFunction = (menuItem, layer) => {
  if (menuItem.items) {
    return renderSubMenu;
  } else if (menuItem.render) {
    return renderCustom;
  } else {
    return renderMenuLink;
  }
};

const renderMenuItems = (menuItems, linkOnClick, themeColors, layer) =>
  menuItems.map(menuItem => {
    const render = getRenderFunction(menuItem, layer);
    return render(menuItem, linkOnClick, themeColors, layer);
  });

const renderTopLayerMenuItems = (menuData, linkOnClick, themeColors) =>
  renderMenuItems(menuData, linkOnClick, themeColors, 0);

const SubMenu = ({ menuItem, linkOnClick, themeColors, layer }) => (
  <>
    {layer === 0 && (
      <SubsectionTitle mb={theme.space.x1} color={themeColors && themeColors.mobileMenuHeading} key={menuItem.name}>
        {menuItem.name}
      </SubsectionTitle>
    )}
    {layer > 0 && (
      <Text
        mb={theme.space.x1}
        color={themeColors && themeColors.mobileMenuHeading}
        py={theme.space.x1}
        style={{ paddingLeft: `${24 * layer + 24}px` }}
        key={menuItem.name}
      >
        {menuItem.name}
      </Text>
    )}
    <SubMenuItemsList>{renderMenuItems(menuItem.items, linkOnClick, themeColors, layer + 1)}</SubMenuItemsList>
  </>
);

SubMenu.propTypes = {
  layer: PropTypes.number.isRequired,
  menuItem: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  linkOnClick: PropTypes.func
};

SubMenu.defaultProps = {
  linkOnClick: null
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
    backgroundColor: backgroundColor
  }),
  {
    minHeight: "calc(100vh - 72px)"
  }
);

const BaseMobileMenu = ({ menuData, closeMenu, subtext, includeSubtext, themeColors, ...props }) => (
  <Nav backgroundColor={themeColors && themeColors.background} {...props}>
    {subtext && includeSubtext && (
      <BrandingWrap color={themeColors && themeColors.color}>
        <BrandingText>{subtext}</BrandingText>
      </BrandingWrap>
    )}
    <Menu>
      {menuData.primaryMenu && renderTopLayerMenuItems(menuData.primaryMenu, closeMenu, themeColors)}
      {menuData.secondaryMenu && renderTopLayerMenuItems(menuData.secondaryMenu, closeMenu, themeColors)}
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
  closeMenu: PropTypes.func
};

BaseMobileMenu.defaultProps = {
  menuData: null,
  subtext: null,
  includeSubtext: true,
  closeMenu: () => {}
};

const MobileMenu = styled(BaseMobileMenu)(display);

export default MobileMenu;
