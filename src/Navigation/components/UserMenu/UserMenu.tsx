import React from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import styled from "styled-components";
import type { UserMenuItem as UserMenuItemType } from "../../types";
import { CaretRight, RadixNavigationMenuItem } from "../shared/components";
import { addStyledProps, StyledProps } from "../../../StyledProps";
import { DefaultNDSThemeType } from "../../../theme/theme.type";
import { IndentedContainer } from "../MobileNav/parts/styled";
import { Header } from "./parts/Header";

interface UserMenuItemProps extends RadixNavigationMenu.NavigationMenuItemProps {
  item: UserMenuItemType;
}

const baseUserMenuItemStyles = (theme: DefaultNDSThemeType) => ({
  width: "100%",
  color: theme.colors.darkGrey,
  fontSize: theme.fontSizes.small,
  fontWeight: theme.fontWeights.bold,
  lineHeight: theme.lineHeights.smallTextBase,
  paddingTop: theme.space.x1_5,
  paddingBottom: theme.space.x1_5,
  paddingLeft: theme.space.x2,
  paddingRight: theme.space.x2,
  "&:hover, &:focus": {
    backgroundColor: theme.colors.lightBlue,
    outline: "none",
  },
});

const UserMenuLink = styled(RadixNavigationMenu.Link)(
  ({ theme }) => ({
    ...baseUserMenuItemStyles(theme),
    display: "block",
    textDecoration: "none",
  }),
  addStyledProps
);

const UserMenuTrigger = styled(RadixNavigationMenu.Trigger)(
  ({ theme }) => ({
    ...baseUserMenuItemStyles(theme),
    background: "none",
    border: "none",
    userSelect: "none",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "left",
  }),
  addStyledProps
);

const SubMenuContent = styled(RadixNavigationMenu.Content)(({ theme }) => ({
  position: "absolute",
  top: `calc(-1 * ${theme.space.x1})`,
  right: "100%",
  width: "max-content",
  minWidth: "150px",
  background: theme.colors.white,
  borderRadius: theme.radii.medium,
  boxShadow: theme.shadows.medium,
  padding: theme.space.none,
  listStyle: "none",
}));

const SubMenuList = styled(RadixNavigationMenu.List)(({ theme }) => ({
  listStyle: "none",
  paddingLeft: theme.space.none,
  paddingRight: theme.space.none,
  paddingTop: theme.space.x1,
  paddingBottom: theme.space.x1,
  margin: 0,
}));

const Item = React.forwardRef<HTMLLIElement, UserMenuItemProps & { level?: number }>(
  ({ item, level = 0, ...props }, forwardedRef) => {
    return (
      <RadixNavigationMenuItem ref={forwardedRef} {...props}>
        {item.type === "link" && <UserMenuLink {...item.props}>{item.label}</UserMenuLink>}
        {item.type === "button" && (
          <>
            <UserMenuTrigger {...item.props}>
              {item.label}
              {"items" in item && item.items && item.items.length > 0 && <CaretRight aria-hidden size="x2" />}
            </UserMenuTrigger>
            {"items" in item && item.items && item.items.length > 0 && (
              <SubMenuContent>
                <RadixNavigationMenu.Sub orientation="vertical">
                  <SubMenuList>
                    {item.items.map((subItem) => (
                      <Item key={subItem.key} item={subItem} level={level + 1} />
                    ))}
                  </SubMenuList>
                </RadixNavigationMenu.Sub>
              </SubMenuContent>
            )}
          </>
        )}
        {item.type === "custom" && item.render({ level, withinMobileNav: false })}
      </RadixNavigationMenuItem>
    );
  }
);

Item.displayName = "Item";

const MobileItem = React.forwardRef<HTMLLIElement, UserMenuItemProps & { level?: number }>(
  ({ item, level = 0, ...props }, forwardedRef) => {
    const hasSubItems = "items" in item && item.items && item.items.length > 0;

    const content = (
      <>
        {item.type === "link" && (
          <IndentedContainer level={level}>
            <UserMenuLink {...item.props}>{item.label}</UserMenuLink>
          </IndentedContainer>
        )}
        {item.type === "button" && (
          <IndentedContainer level={level}>
            <UserMenuTrigger {...item.props}>{item.label}</UserMenuTrigger>
          </IndentedContainer>
        )}
        {item.type === "custom" && item.render({ level, withinMobileNav: true })}
      </>
    );

    if (item.type === "button" && hasSubItems) {
      return (
        <>
          <RadixNavigationMenuItem ref={forwardedRef} {...props}>
            {content}
          </RadixNavigationMenuItem>
          {item.items.map((subItem) => (
            <MobileItem key={subItem.key} item={subItem} level={level + 1} />
          ))}
        </>
      );
    }

    return (
      <RadixNavigationMenuItem ref={forwardedRef} {...props}>
        {content}
      </RadixNavigationMenuItem>
    );
  }
);

MobileItem.displayName = "MobileItem";

const Container = styled(RadixNavigationMenu.Sub).attrs({
  orientation: "vertical",
})<StyledProps>(
  ({ theme }) => ({
    padding: theme.space.x2,
  }),
  addStyledProps
);

const UserMenu = {
  Header,
  Container,
  Item,
  MobileItem,
};

export default UserMenu;
