import React from "react";
import styled from "styled-components";
import type { CSSObject } from "styled-components";
import { display } from "styled-system";
import { Text } from "../Type";
import { Flex } from "../Flex";
import { BrandingText } from "../Branding";
import { DropdownLink, DropdownText } from "../DropdownMenu";
import { Icon } from "../Icon";
import { Link } from "../Link";
import { addStyledProps } from "../StyledProps";
import NulogyLogo from "./NulogyLogo";
import { TriggerFunctionProps } from "./TriggerFunctionProps";
import { useScrollLock } from "../utils/useScrollLock";

const borderStyle = "1px solid #e4e7eb";

const BrandingWrap = styled.div(({ theme }) => ({
  marginLeft: theme.space.x3,
  color: theme.colors.white,
  marginBottom: theme.space.x1,
}));

// eslint-disable-next-line no-mixed-operators
const getPaddingLeft = (layer) => `${24 * layer + 24}px`;

const getSharedStyles = (theme): CSSObject => ({
  display: "flex",
  alignItems: "center",
  gap: theme.space.half,
  textDecoration: "none",
  border: "none",
  backgroundColor: "transparent",
  fontSize: theme.fontSizes.large,
  fontWeight: theme.fontWeights.medium,
  lineHeight: theme.lineHeights.heading3,
  padding: `${theme.space.x1} ${theme.space.x3}`,
});

const TopLevelLink = styled(Link)(
  ({ theme }) => ({
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
  }),
  addStyledProps
);

const TopLevelText = styled(Text)(
  ({ theme }) => ({
    ...getSharedStyles(theme),
    color: theme.colors.blackBlue,
  }),
  addStyledProps
);

const SubMenuItemsList = styled.ul({
  listStyle: "none",
  paddingLeft: "0",
  margin: "0",
});

const renderMenuLink = (menuItem, linkOnClick, themeColorObject, layer) => {
  const sharedLinkProps = {
    onClick: linkOnClick,
    href: menuItem.href,
    as: menuItem.as,
    to: menuItem.to,
    // eslint-disable-next-line no-mixed-operators
    pl: layer === 0 ? getPaddingLeft(layer) : `${24 * layer + 20}px`,
    mb: "x1",
    target: menuItem.openInNew ? "_blank" : undefined,
  };
  const topLevel = layer === 0;

  return (
    <li key={menuItem.key ?? menuItem.name}>
      {topLevel ? (
        <TopLevelLink {...sharedLinkProps}>
          {menuItem.name}
          {menuItem.openInNew && <Icon size={topLevel ? "x3" : "x2"} icon="openInNew" />}
        </TopLevelLink>
      ) : (
        <DropdownLink {...sharedLinkProps}>
          {menuItem.name}
          {menuItem.openInNew && <Icon size={topLevel ? "x3" : "x2"} icon="openInNew" />}
        </DropdownLink>
      )}
    </li>
  );
};

const renderCustom = (menuItem, linkOnClick, themeColorObject, layer) => (
  <li key={menuItem.key ?? menuItem.name}>{menuItem.render({ size: "small", onItemClick: linkOnClick, layer })}</li>
);

const renderSubMenu = (menuItem, linkOnClick, themeColorObject, layer) => (
  <li key={menuItem.key ?? menuItem.name} style={{ display: "block" }}>
    <SubMenu menuItem={menuItem} layer={layer} themeColorObject={themeColorObject} linkOnClick={linkOnClick} />
  </li>
);

const renderText = (menuItem, linkOnClick, themeColorObject, layer) => {
  const MenuText = layer === 0 ? TopLevelText : DropdownText;
  return (
    <li key={menuItem.key ?? menuItem.name}>
      <MenuText pl={getPaddingLeft(layer)} mb="x1">
        {menuItem.name}
      </MenuText>
    </li>
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
    <TopLevelText as="h3" mb="x1">
      {name}
    </TopLevelText>
  ) : (
    <DropdownText mb="x1" pl={getPaddingLeft(layer)}>
      {name}
    </DropdownText>
  );

type ThemeColorObject = {
  textColor?: string;
  background?: string;
  logoColor?: "white" | "blue";
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

const SubMenu = ({ menuItem, linkOnClick, themeColorObject, layer }: SubMenuProps) => {
  const defaultRender = () => getSubMenuHeading(layer, menuItem.name);
  return (
    <>
      {menuItem.trigger ? menuItem.trigger({ size: "small", defaultRender, layer }) : defaultRender()}
      <SubMenuItemsList>{renderMenuItems(menuItem.items, linkOnClick, themeColorObject, layer + 1)}</SubMenuItemsList>
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
  [`${TopLevelText}`]: {
    padding: `${theme.space.x1} 0 ${theme.space.x1} ${theme.space.x3}`,
  },
}));

type NavProps = {
  backgroundColor: string;
};

const Nav = styled.nav<NavProps>(
  ({ backgroundColor }) => ({
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
  showNulogyLogo?: boolean;
};

const BaseMobileMenu = ({
  menuData,
  closeMenu,
  subtext,
  themeColorObject,
  showNulogyLogo,
  ...props
}: BaseMobileMenuProps) => {
  useScrollLock();

  return (
    <Nav backgroundColor={themeColorObject && themeColorObject.background} {...props}>
      <BrandingWrap>
        <BrandingText logoColor={themeColorObject?.logoColor} />
      </BrandingWrap>
      <Menu>
        {menuData.primaryMenu && renderTopLayerMenuItems(menuData.primaryMenu, closeMenu, themeColorObject)}
        {menuData.secondaryMenu && renderTopLayerMenuItems(menuData.secondaryMenu, closeMenu, themeColorObject)}
      </Menu>
      {showNulogyLogo && (
        <Flex textAlign="center" borderTop={borderStyle} height="40px" alignItems="center" justifyContent="center">
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
};

/** @deprecated The BrandedNavBar component is deprecated. Use the Navigation component instead. */
const MobileMenu = styled(BaseMobileMenu)(display);

export default MobileMenu;
