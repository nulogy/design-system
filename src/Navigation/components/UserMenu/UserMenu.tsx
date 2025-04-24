import React from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import styled from "styled-components";
import { UserMenuItem } from "../../types";
import NavigationMenuContent from "../shared/NavigationMenuContent";
import { Header } from "./parts/Header";

interface UserMenuItemProps extends RadixNavigationMenu.NavigationMenuItemProps {
  item: UserMenuItem;
}

const RenderItem = ({ item }: UserMenuItemProps) => {
  if (item.type === "render") {
    return item.render();
  }

  return null;
};

const LinkItem = ({ item }: UserMenuItemProps) => {
  if (item.type === "link") {
    return <UserMenuLink {...item.props}>{item.label}</UserMenuLink>;
  }

  return null;
};

const ButtonItem = ({ item }: UserMenuItemProps) => {
  if (item.type === "button") {
    return (
      <>
        <UserMenuTrigger>{item.label}</UserMenuTrigger>
        {item.items && (
          <RadixNavigationMenu.Content onPointerMove={(event) => event.preventDefault()}>
            <RadixNavigationMenu.Sub orientation="vertical">
              <RadixNavigationMenu.List style={{ listStyle: "none", padding: "0" }}>
                {item.items?.map((subItem) => <Item key={subItem.key} item={subItem} />)}
              </RadixNavigationMenu.List>
            </RadixNavigationMenu.Sub>
          </RadixNavigationMenu.Content>
        )}
      </>
    );
  }
  return null;
};

export const Item = React.forwardRef<HTMLLIElement, UserMenuItemProps>(({ item, ...props }, forwardedRef) => {
  return (
    <RadixNavigationMenu.Item ref={forwardedRef} {...props}>
      <RenderItem item={item} />
      <LinkItem item={item} />
      <ButtonItem item={item} />
    </RadixNavigationMenu.Item>
  );
});

const UserMenuLink = styled(RadixNavigationMenu.Link)(({ theme }) => ({
  display: "block",
  textDecoration: "none",
  color: theme.colors.darkGrey,
  fontSize: theme.fontSizes.small,
  fontWeight: theme.fontWeights.bold,
  lineHeight: theme.lineHeights.smallTextBase,
  paddingTop: theme.space.x1_5,
  paddingBottom: theme.space.x1_5,
}));

const UserMenuTrigger = styled(RadixNavigationMenu.Trigger)(({ theme }) => ({
  background: "none",
  border: "none",
  outline: "none",
  userSelect: "none",
  display: "block",
  color: theme.colors.darkGrey,
  fontSize: theme.fontSizes.small,
  fontWeight: theme.fontWeights.bold,
  lineHeight: theme.lineHeights.smallTextBase,
  padding: theme.space.none,
  paddingTop: theme.space.x1_5,
  paddingBottom: theme.space.x1_5,
  textAlign: "left",
  width: "100%",
}));

export const UserMenu = {
  Root: styled(NavigationMenuContent)({
    padding: 0,
    overflow: "hidden",
  }),
  Content: styled("div")({
    padding: 16,
  }),
  Header,
  Item,
};

export default UserMenu;
