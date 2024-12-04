import React from "react";
import { BackButton } from "./components/BackButton";
import { Menu } from "./components/Menu";
import { MenuItem } from "./components/MenuItem";
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
  BackButton,
  Menu,
  MenuItem,
};
