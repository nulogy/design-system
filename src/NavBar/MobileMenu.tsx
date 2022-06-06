import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { display } from "styled-system";
import { themeGet } from "@styled-system/theme-get";
import { Text, Heading3 } from "../Type";
import { BrandingText } from "../Branding";
import theme from "../theme";

const BrandingWrap = styled.div({
  marginTop: `-${theme.space.x1}`,
  marginBottom: theme.space.x3,
  marginLeft: theme.space.x3,
  color: theme.colors.white,
});

const getPaddingLeft = (layer) => `${24 * layer + 24}px`;

const getSharedStyles = ({ color, layer }) => ({
  display: "block",
  color: themeGet(`colors.${color}`, color)(color),
  textDecoration: "none",
  border: "none",
  backgroundColor: "transparent",
  borderRadius: theme.radii.medium,
  fontSize: layer === 0 ? theme.fontSizes.large : theme.fontSizes.medium,
  lineHeight: layer === 0 ? theme.lineHeights.heading3 : theme.lineHeights.base,
  padding:
    layer === 0
      ? `${theme.space.x1} ${theme.space.x3}`
      : `${theme.space.x1} ${theme.space.x2}`,
  paddingLeft: getPaddingLeft(layer),
  marginBottom: theme.space.x1,
});

const ApplyMenuLinkStyles = styled.li<{
  hoverColor: string;
  hoverBackground: string;
  layer?: number;
}>(({ color, hoverColor, hoverBackground, layer }) => ({
  display: "block",
  "*": {
    ...getSharedStyles({ color, layer }),
    textDecoration: "none",
    "&:hover, &:focus": {
      outline: "none",
      color: themeGet(`colors.${hoverColor}`, hoverColor)(hoverColor),
      backgroundColor: themeGet(
        `colors.${hoverBackground}`,
        hoverBackground
      )(hoverBackground),
    },
    "&:disabled": {
      opacity: ".5",
    },
    "&:focus": {
      boxShadow: theme.shadows.focus,
    },
  },
}));

ApplyMenuLinkStyles.propTypes = {
  layer: PropTypes.number,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  hoverBackground: PropTypes.string,
};

ApplyMenuLinkStyles.defaultProps = {
  layer: 0,
  color: theme.colors.white,
  hoverColor: theme.colors.lightBlue,
  hoverBackground: theme.colors.black,
};

const MenuLink = styled.a<{
  hoverColor: string;
  hoverBackground: string;
  layer: number;
}>(({ color, hoverColor, hoverBackground, layer }) => ({
  ...getSharedStyles({ color, layer }),
  width: "100%",
  borderRadius: "0",
  transition: ".2s",
  "&:hover, &:focus": {
    outline: "none",
    color: themeGet(`colors.${hoverColor}`, hoverColor)(hoverColor),
    backgroundColor: themeGet(
      `colors.${hoverBackground}`,
      hoverBackground
    )(hoverBackground),
    cursor: "pointer",
  },
  "&:focus": {
    boxShadow: theme.shadows.focus,
  },
  "&:disabled": {
    opacity: ".5",
  },
}));

const MenuText = styled.li<{
  textColor: string;
  layer: number;
}>(({ textColor, layer }) => ({
  ...getSharedStyles({ color: textColor, layer }),
}));

const SubMenuItemsList = styled.ul({
  listStyle: "none",
  paddingLeft: "0",
  margin: "0",
});

const renderMenuLink = (menuItem, linkOnClick, themeColorObject, layer) => (
  <li
    key={menuItem.name}
    style={{ display: "block", marginBottom: theme.space.x1 }}
  >
    <MenuLink
      layer={layer}
      {...themeColorObject}
      onClick={linkOnClick}
      href={menuItem.href}
      to={menuItem.to}
      as={menuItem.as}
    >
      {menuItem.name}
    </MenuLink>
  </li>
);

const renderCustom = (menuItem, linkOnClick, themeColorObject, layer) => (
  <ApplyMenuLinkStyles
    key={menuItem.name}
    {...themeColorObject}
    layer={layer}
    onClick={linkOnClick}
  >
    {menuItem.render()}
  </ApplyMenuLinkStyles>
);

const renderSubMenu = (menuItem, linkOnClick, themeColorObject, layer) => (
  <li key={menuItem.name} style={{ display: "block" }}>
    <SubMenu
      menuItem={menuItem}
      layer={layer}
      themeColorObject={themeColorObject}
      linkOnClick={linkOnClick}
    />
  </li>
);

const renderText = (menuItem, linkOnClick, themeColorObject, layer) => (
  <MenuText key={menuItem.name} layer={layer} {...themeColorObject}>
    {menuItem.name}
  </MenuText>
);

const getRenderFunction = (menuItem) => {
  if (menuItem.items) {
    return renderSubMenu;
  } else if (menuItem.href || menuItem.to) {
    return renderMenuLink;
  } else if (menuItem.render) {
    return renderCustom;
  } else {
    return renderText;
  }
};

const renderMenuItems = (menuItems, linkOnClick, themeColorObject, layer) =>
  menuItems.map((menuItem) => {
    const render = getRenderFunction(menuItem);
    return render(menuItem, linkOnClick, themeColorObject, layer);
  });

const renderTopLayerMenuItems = (menuData, linkOnClick, themeColorObject) =>
  renderMenuItems(menuData, linkOnClick, themeColorObject, 0);

const getSubMenuHeading = (layer, color, name) =>
  layer === 0 ? (
    <Heading3 mb={theme.space.x1} color={color}>
      {name}
    </Heading3>
  ) : (
    <Text
      mb={theme.space.x1}
      color={color}
      py={theme.space.x1}
      style={{ paddingLeft: getPaddingLeft(layer) }}
    >
      {name}
    </Text>
  );

const SubMenu = ({ menuItem, linkOnClick, themeColorObject, layer }) => (
  <>
    {getSubMenuHeading(
      layer,
      themeColorObject && themeColorObject.textColor,
      menuItem.name
    )}
    <SubMenuItemsList>
      {renderMenuItems(
        menuItem.items,
        linkOnClick,
        themeColorObject,
        layer + 1
      )}
    </SubMenuItemsList>
  </>
);

const ThemeColorObjectPropTypes = {
  textColor: PropTypes.string,
  background: PropTypes.string,
  logoColor: PropTypes.string,
};

SubMenu.propTypes = {
  layer: PropTypes.number.isRequired,
  menuItem: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})),
    name: PropTypes.string.isRequired,
  }).isRequired,
  linkOnClick: PropTypes.func,
  themeColorObject: PropTypes.shape(ThemeColorObjectPropTypes),
};

SubMenu.defaultProps = {
  linkOnClick: null,
  themeColorObject: undefined,
};

const Menu = styled.ul(() => ({
  margin: "0",
  padding: `${theme.space.x1} 0`,
  zIndex: theme.zIndices.content,
  width: "100%",
  color: theme.colors.white,
  [`${Heading3}`]: {
    padding: `${theme.space.x1} 0 ${theme.space.x1} ${theme.space.x3}`,
  },
}));

const Nav = styled.nav<{
  backgroundColor: string;
}>(
  ({ backgroundColor }) => ({
    backgroundColor,
  }),
  {
    minHeight: "calc(100vh - 72px)",
  }
);

const BaseMobileMenu = ({
  menuData,
  closeMenu,
  subtext,
  includeSubtext,
  themeColorObject,
  ...props
}) => (
  <Nav
    backgroundColor={themeColorObject && themeColorObject.background}
    {...props}
  >
    {subtext && includeSubtext && (
      <BrandingWrap>
        <BrandingText
          logoColor={themeColorObject && themeColorObject.logoColor}
        >
          {subtext}
        </BrandingText>
      </BrandingWrap>
    )}
    <Menu>
      {menuData.primaryMenu &&
        renderTopLayerMenuItems(
          menuData.primaryMenu,
          closeMenu,
          themeColorObject
        )}
      {menuData.secondaryMenu &&
        renderTopLayerMenuItems(
          menuData.secondaryMenu,
          closeMenu,
          themeColorObject
        )}
    </Menu>
  </Nav>
);

BaseMobileMenu.propTypes = {
  menuData: PropTypes.shape({
    primaryMenu: PropTypes.arrayOf(PropTypes.shape({})),
    secondaryMenu: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  subtext: PropTypes.string,
  includeSubtext: PropTypes.bool,
  closeMenu: PropTypes.func,
  themeColorObject: PropTypes.shape(ThemeColorObjectPropTypes),
};

BaseMobileMenu.defaultProps = {
  menuData: null,
  subtext: null,
  includeSubtext: false,
  closeMenu: () => {},
  themeColorObject: undefined,
};

const MobileMenu = styled(BaseMobileMenu)(display);

export default MobileMenu;
