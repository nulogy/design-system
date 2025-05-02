import React from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import styled from "styled-components";
import type { UserMenuItem as UserMenuItemType } from "../../types";
import { CaretRight } from "../shared/components";
import { addStyledProps, StyledProps } from "../../../StyledProps";
import { Header } from "./parts/Header";

interface UserMenuItemProps extends RadixNavigationMenu.NavigationMenuItemProps {
  item: UserMenuItemType;
}

const UserMenuLink = styled(RadixNavigationMenu.Link)(({ theme }) => ({
  display: "block",
  width: "100%",
  textDecoration: "none",
  color: theme.colors.darkGrey,
  fontSize: theme.fontSizes.small,
  fontWeight: theme.fontWeights.bold,
  lineHeight: theme.lineHeights.smallTextBase,
  padding: `${theme.space.x1_5} 0`,
  "&:hover, &:focus": {
    backgroundColor: theme.colors.lightBlue,
    outline: "none",
  },
}));

const UserMenuTrigger = styled(RadixNavigationMenu.Trigger)(({ theme }) => ({
  background: "none",
  border: "none",
  outline: "none",
  userSelect: "none",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  color: theme.colors.darkGrey,
  fontSize: theme.fontSizes.small,
  fontWeight: theme.fontWeights.bold,
  lineHeight: theme.lineHeights.smallTextBase,
  padding: `${theme.space.x1_5} 0`,
  textAlign: "left",
  "&:hover, &:focus": {
    backgroundColor: theme.colors.lightBlue,
    outline: "none",
  },
}));

const SubMenuContent = styled(RadixNavigationMenu.Content)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: `calc(100% + ${theme.space.x2})`,
  width: "max-content",
  minWidth: "150px",
  background: theme.colors.white,
  borderRadius: theme.radii.medium,
  boxShadow: theme.shadows.medium,
  padding: theme.space.x1,
  listStyle: "none",
}));

const SubMenuList = styled(RadixNavigationMenu.List)({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

const Item = React.forwardRef<HTMLLIElement, UserMenuItemProps>(({ item, ...props }, forwardedRef) => {
  return (
    <RadixNavigationMenu.Item ref={forwardedRef} {...props} style={{ position: "relative" }}>
      {item.type === "link" && <UserMenuLink {...item.props}>{item.label}</UserMenuLink>}
      {item.type === "button" && (
        <>
          <UserMenuTrigger {...item.props}>
            {item.label}
            {item.items && item.items.length > 0 && <CaretRight aria-hidden size="x2" />}
          </UserMenuTrigger>
          {item.items && item.items.length > 0 && (
            <SubMenuContent>
              <RadixNavigationMenu.Sub orientation="vertical">
                <SubMenuList>
                  {item.items.map((subItem) => (
                    <Item key={subItem.key} item={subItem} />
                  ))}
                </SubMenuList>
              </RadixNavigationMenu.Sub>
            </SubMenuContent>
          )}
        </>
      )}
      {item.type === "render" && item.render()}
    </RadixNavigationMenu.Item>
  );
});

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
};

export default UserMenu;
