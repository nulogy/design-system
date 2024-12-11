import React from "react";
import { BackLink } from "./components/BackLink";
import { Menu } from "./components/Menu";
import { MenuItem } from "./components/MenuItem";
import { MenuItemLink } from "./components/MenuItemLink";
import { PageTitle } from "./components/PageTitle";
import { Header, Navigation, NavigationItemsList } from "./TopBar.styled";

export interface TopBarProps {
  children?: React.ReactNode;
}

export default function Root({ children }: TopBarProps) {
  return (
    <Header>
      <Navigation>
        <NavigationItemsList>{children}</NavigationItemsList>
      </Navigation>
    </Header>
  );
}

export const TopBar = {
  Root,
  PageTitle,
  BackLink,
  Menu,
  MenuItem,
  MenuItemLink,
};
