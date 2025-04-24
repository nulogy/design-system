import React from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { IconName } from "@nulogy/icons";

/*
  User menu 
*/
export interface UserMenu {
  triggerText: UserMenuInfo;
  header: UserMenuInfo;
  controls: ControlItem[];
  menuitems: UserMenuItem[];
}

// User menu info, used in the header and trigger text
export type UserMenuInfo = {
  title: string;
  subtitle1?: string;
  subtitle2?: string;
};

/*
  User menu controls
*/
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

/*
  User menu items
*/

interface LinkUserMenuItem {
  key: string;
  label: string;
  type: "link";
  props: React.ComponentPropsWithoutRef<typeof RadixNavigationMenu.Link>;
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
  type: "render";
  render: () => JSX.Element;
}

export type UserMenuItem = LinkUserMenuItem | ButtonUserMenuItem | RenderUserMenuItem;

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
