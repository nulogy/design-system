import React from "react";
import styled from "styled-components";
import { display } from "styled-system";
import { Text, Heading3 } from "../Type";
import { Flex } from "../Flex";
import { BrandingText } from "../Branding";
import { DefaultNDSThemeType } from "../theme.type";
import { DropdownLink, DropdownText, DropdownButton } from "../DropdownMenu";
import { Link } from "../Link";
import { LinkProps } from "../Link/Link";
import NulogyLogo from "./NulogyLogo";
import { TriggerFunctionProps } from "./TriggerFunctionProps";

const borderStyle = "1px solid #e4e7eb";

const BrandingWrap = styled.div(({ theme }) => ({
  marginLeft: theme.space.x3,
  color: theme.colors.white,
  marginBottom: theme.space.x1,
}));

// eslint-disable-next-line no-mixed-operators
const getPaddingLeft = (layer) => `${24 * layer + 24}px`;

const getSharedStyles = (theme) => ({
  display: "block",
  textDecoration: "none",
  border: "none",
  backgroundColor: "transparent",
  fontSize: theme.fontSizes.large,
  fontWeight: theme.fontWeights.medium,
  lineHeight: theme.lineHeights.heading3,
  marginBottom: theme.space.x1,
  padding: `${theme.space.x1} ${theme.space.x3}`,
  paddingLeft: getPaddingLeft(0),
});

const TopLevelLink = styled(Link)(({ theme }) => ({
  ...getSharedStyles(theme),
  color: theme.colors.darkBlue,
  "&:visited": {
    color: theme.colors.darkBlue,
  },
  width: "100%",
  borderRadius: "0",
  transition: ".2s",
  "&:hover, &:focus": {
    outline: "none",
    color: theme.colors.blackBlue,
    backgroundColor: theme.colors.whiteGrey,
    cursor: "pointer",
  },
  "&:focus": {
    boxShadow: theme.shadows.focus,
  },
  "&:disabled": {
    opacity: ".5",
  },
}));

const TopLevelText = styled(Text)(({ theme }) => ({
  ...getSharedStyles(theme),
  color: theme.colors.blackBlue,
}));

type ChildIndentingLiProps = {
  layer?: number;
  theme?: DefaultNDSThemeType;
  key?: string;
};

const ChildIndentingLi = styled.li(
  ({ layer, theme }: ChildIndentingLiProps) => ({
    marginBottom: theme.space.x1,
    [`> ${DropdownButton}, > ${DropdownLink}`]: {
      // eslint-disable-next-line no-mixed-operators
      paddingLeft: `${24 * layer + 20}px`,
    },
    [`> ${DropdownText}`]: {
      paddingLeft: getPaddingLeft(layer),
    },
  })
);

const SubMenuItemsList = styled.ul({
  listStyle: "none",
  paddingLeft: "0",
  margin: "0",
});

const renderMenuLink = (menuItem, linkOnClick, themeColorObject, layer) => {
  const MenuLink: React.FC<LinkProps> =
    layer === 0 ? TopLevelLink : DropdownLink;
  return (
    <ChildIndentingLi layer={layer} key={menuItem.key ?? menuItem.name}>
      <MenuLink
        onClick={linkOnClick}
        href={menuItem.href}
        as={menuItem.as}
        to={menuItem.to}
      >
        {menuItem.name}
      </MenuLink>
    </ChildIndentingLi>
  );
};

const renderCustom = (menuItem, linkOnClick, themeColorObject, layer) => (
  <ChildIndentingLi layer={layer} key={menuItem.key ?? menuItem.name}>
    {menuItem.render({ size: "small", onItemClick: linkOnClick, layer })}
  </ChildIndentingLi>
);

const renderSubMenu = (menuItem, linkOnClick, themeColorObject, layer) => (
  <li key={menuItem.key ?? menuItem.name} style={{ display: "block" }}>
    <SubMenu
      menuItem={menuItem}
      layer={layer}
      themeColorObject={themeColorObject}
      linkOnClick={linkOnClick}
    />
  </li>
);

const renderText = (menuItem, linkOnClick, themeColorObject, layer) => {
  const MenuText = layer === 0 ? TopLevelText : DropdownText;
  return (
    <ChildIndentingLi layer={layer} key={menuItem.key ?? menuItem.name}>
      <MenuText>{menuItem.name}</MenuText>
    </ChildIndentingLi>
  );
};

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

const getSubMenuHeading = (layer, name) =>
  layer === 0 ? (
    <TopLevelText as="h3">{name}</TopLevelText>
  ) : (
    <DropdownText mb="x1" style={{ paddingLeft: getPaddingLeft(layer) }}>
      {name}
    </DropdownText>
  );

type ThemeColorObject = {
  textColor?: string;
  background?: string;
  logoColor?: string;
};

type MenuItem = {
  items?: any[];
  name?: string;
  trigger?: (props: TriggerFunctionProps) => React.ReactNode;
};

type SubMenuProps = {
  layer?: number;
  menuItem?: MenuItem;
  linkOnClick?: Function;
  themeColorObject?: ThemeColorObject;
};

const SubMenu = ({
  menuItem,
  linkOnClick,
  themeColorObject,
  layer,
}: SubMenuProps) => {
  const defaultRender = () => getSubMenuHeading(layer, menuItem.name);
  return (
    <>
      {menuItem.trigger
        ? menuItem.trigger({ size: "small", defaultRender, layer })
        : defaultRender()}
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
};

const Menu = styled.ul(({ theme }) => ({
  listStyle: "none",
  margin: "0",
  padding: `${theme.space.x1} 0`,
  zIndex: theme.zIndices.content,
  width: "100%",
  color: theme.colors.white,
  [`${Heading3}`]: {
    padding: `${theme.space.x1} 0 ${theme.space.x1} ${theme.space.x3}`,
  },
}));

type NavProps = {
  backgroundColor: string;
};

const Nav = styled.nav(
  ({ backgroundColor }: NavProps) => ({
    backgroundColor,
  }),
  {
    minHeight: "calc(100vh - 72px)",
  }
);

type MenuData = {
  primaryMenu?: any[];
  secondaryMenu?: any[];
};

type BaseMobileMenuProps = {
  menuData: MenuData;
  subtext?: string;
  closeMenu?: Function;
  themeColorObject?: ThemeColorObject;
  logoSrc?: string;
};

const BaseMobileMenu = ({
  menuData,
  closeMenu,
  subtext,
  themeColorObject,
  logoSrc,
  ...props
}: BaseMobileMenuProps) => (
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

const MobileMenu = styled(BaseMobileMenu)(display);

export default MobileMenu;
