import React from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { IconName } from "@nulogy/icons";

type UserMenuInfo = {
  title: string;
  subtitle1: string;
  subtitle2: string;
};

interface SimpleControl {
  key: string;
  label: string;
  control: () => JSX.Element;
}

interface RenderControl {
  key: string;
  render: () => JSX.Element;
}

type ControlItem = SimpleControl | RenderControl;

interface LinkUserMenuItem {
  key: string;
  label: string;
  type: "link";
  props: React.ComponentPropsWithoutRef<"a">;
}

interface ButtonUserMenuItem {
  key: string;
  label: string;
  type: "button";
  props?: React.ComponentPropsWithoutRef<"button">;
  items?: UserMenuItem[];
}

interface RenderUserMenuItem {
  key: string;
  label: string;
  render: () => JSX.Element;
}

type UserMenuItem = LinkUserMenuItem | ButtonUserMenuItem | RenderUserMenuItem;

export interface UserMenu {
  triggerText: UserMenuInfo;
  header: UserMenuInfo;
  controls: ControlItem[];
  menuitems: UserMenuItem[];
}

/*
| Menu Item 
*/

export type MenuItemBase = {
  key: string;
};

type WithIcon = {
  icon: IconName;
  label?: string;
  tooltip?: string;
};

type WithLabel = {
  label: string;
};

type CustomMenuItem = {
  type: "custom";
  render: () => JSX.Element;
};

type MenuItemButton = {
  type: "button";
  items?: MenuItem[];
  props?: React.ComponentPropsWithoutRef<typeof RadixNavigationMenu.Trigger>;
} & (WithIcon | WithLabel);

type MenuItemLink = {
  type: "link";
  props?: React.ComponentPropsWithoutRef<typeof RadixNavigationMenu.Link>;
} & (WithIcon | WithLabel);

export type MenuItem = MenuItemBase & (CustomMenuItem | MenuItemButton | MenuItemLink);

export type MenuItems = MenuItem[];
