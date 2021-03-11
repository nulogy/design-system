import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { display } from "styled-system";
import { themeGet } from "@styled-system/theme-get";
import { Text, Heading3 } from "../Type";
import { Flex } from "../Flex";
import { BrandingText } from "../Branding";
import NulogyLogo from "./NulogyLogo";

const borderStyle = "1px solid #e4e7eb";

const BrandingWrap = styled.div(({ theme }) => ({
  marginLeft: theme.space.x3,
  color: theme.colors.white,
  marginBottom: theme.space.x1,
}));

const getPaddingLeft = (layer) => `${24 * layer + 24}px`;

const getSharedStyles = ({ color, layer, theme }) => ({
  display: "block",
  color: theme.colors[color] || color,
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
  "&:visited": {
    color: theme.colors[color] || color,
  },
  "&:hover": {
    color: "#434d59", // darkGrey
    background: "#f0f2f5", // whiteGrey
  },
});

const ApplyMenuLinkStyles = styled.li(
  ({ color, hoverColor, hoverBackground, layer, theme }) => ({
    display: "block",
    "button, a": {
      ...getSharedStyles({ color, layer, theme }),
      textDecoration: "none",
      "&:hover, &:focus": {
        outline: "none",
        color: theme.colors[hoverColor] || hoverColor,
        backgroundColor: theme.colors[hoverBackground] || hoverBackground,
      },
      "&:disabled": {
        opacity: ".5",
      },
      "&:focus": {
        boxShadow: theme.shadows.focus,
      },
    },
  })
);

ApplyMenuLinkStyles.propTypes = {
  layer: PropTypes.number,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  hoverBackground: PropTypes.string,
};

ApplyMenuLinkStyles.defaultProps = {
  layer: 0,
  color: "white",
  hoverColor: "lightBlue",
  hoverBackground: "black",
};

const MenuLink = styled.a(
  ({ color, hoverColor, hoverBackground, layer, theme }) => ({
    ...getSharedStyles({ color, layer, theme }),
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
  })
);

const MenuText = styled.li(({ textColor, layer, theme }) => ({
  ...getSharedStyles({ color: textColor, layer, theme }),
}));

const SubMenuItemsList = styled.ul({
  listStyle: "none",
  paddingLeft: "0",
  margin: "0",
});

const StyledLi = styled.li(({ theme }) => ({
  marginBottom: theme.space.x1,
  display: "block",
}));

const renderMenuLink = (menuItem, linkOnClick, themeColorObject, layer) => (
  <StyledLi key={menuItem.name}>
    <MenuLink
      layer={layer}
      {...themeColorObject}
      onClick={linkOnClick}
      href={menuItem.href}
      as={menuItem.as}
      to={menuItem.to}
    >
      {menuItem.name}
    </MenuLink>
  </StyledLi>
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
    <Heading3 mb="x1" color={color}>
      {name}
    </Heading3>
  ) : (
    <Text
      mb="x1"
      color={color}
      py="x1"
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

const Menu = styled.ul(({ theme }) => ({
  margin: "0",
  padding: `${theme.space.x1} 0`,
  zIndex: theme.zIndex.content,
  width: "100%",
  color: theme.colors.white,
  [`${Heading3}`]: {
    padding: `${theme.space.x1} 0 ${theme.space.x1} ${theme.space.x3}`,
  },
}));

const Nav = styled.nav(
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
  themeColorObject,
  logoSrc,
  ...props
}) => (
  <Nav
    backgroundColor={themeColorObject && themeColorObject.background}
    {...props}
  >
    <BrandingWrap>
      <BrandingText
        logoColor={themeColorObject && themeColorObject.logoColor}
      />
    </BrandingWrap>
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
    {logoSrc && (
      <Flex
        textAlign="center"
        borderTop={borderStyle}
        height="40px"
        alignItems="center"
        justifyContent="center"
      >
        <NulogyLogo />
        {subtext && (
          <Text
            fontSize="8px"
            lineHeight="0"
            color="darkGrey"
            fontWeight="medium"
            textTransform="uppercase"
            letterSpacing=".5px"
          >
            {subtext}
          </Text>
        )}
      </Flex>
    )}
  </Nav>
);

BaseMobileMenu.propTypes = {
  menuData: PropTypes.shape({
    primaryMenu: PropTypes.arrayOf(PropTypes.shape({})),
    secondaryMenu: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  subtext: PropTypes.string,
  closeMenu: PropTypes.func,
  themeColorObject: PropTypes.shape(ThemeColorObjectPropTypes),
  logoSrc: PropTypes.string,
};

BaseMobileMenu.defaultProps = {
  menuData: null,
  subtext: null,
  closeMenu: () => {},
  themeColorObject: undefined,
  logoSrc: undefined,
};

const MobileMenu = styled(BaseMobileMenu)(display);

export default MobileMenu;
