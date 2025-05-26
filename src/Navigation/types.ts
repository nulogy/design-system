import React from "react";
import { IconName } from "@nulogy/icons";

/* -------------------------------------------------------------------
 * User Menu
 * -----------------------------------------------------------------*/
export interface UserMenu {
  triggerText: UserMenuInfo;
  header?: UserMenuInfo;
  controls?: (props: { withinMobileNav: boolean }) => JSX.Element;
  menuItems?: UserMenuItem[];
}

export type UserMenuInfo = {
  title: string;
  subtitle1?: string;
  subtitle2?: string;
};

export type UserMenuItem = BaseUserMenuItem & (LinkUserMenuItem | ButtonUserMenuItem | CustomUserMenuItem);

interface BaseUserMenuItem {
  key: string;
}

interface LinkUserMenuItem {
  label: string;
  type: "link";
  props?: React.ComponentPropsWithoutRef<"a">;
  element?: JSX.Element;
}

interface ButtonUserMenuItem {
  label: string;
  type: "button";
  props?: React.ComponentPropsWithoutRef<"button">;
  items?: UserMenuItem[];
}

interface CustomUserMenuItem {
  type: "custom";
  render: (props: { level: number; withinMobileNav: boolean }) => JSX.Element;
}

/* -------------------------------------------------------------------
 * Menu Items
 * -----------------------------------------------------------------*/

export type MenuItem = MenuItemBase & (CustomMenuItem | MenuItemButton | MenuItemLink | MenuItemSeparator);

export type MenuItems = MenuItem[];

type MobileVisibility =
  /**
   * Show on the navigation bar, just before the mobile navigation menu trigger
   */
  | "navigationBar"
  /**
   * Show inside the mobile navigation menu (default behavior)
   */
  | "navigationMenu"
  /**
   * Hide item completely
   */
  | "hidden";

export type MenuItemBase = {
  mobileVisibility?: MobileVisibility;
  key: string;
};

type WithIcon = {
  icon: IconName;
  tooltip: string;
  label?: string;
};

type WithLabel = {
  label: string;
};

type CustomMenuItem = {
  type: "custom";
  render: (props: { withinSubMenu: boolean; level: number; withinMobileNav: boolean }) => JSX.Element;
};

type MenuItemButton = {
  type: "button";
  items?: MenuItem[];
  props?: React.ComponentPropsWithoutRef<"button">;
} & (WithIcon | WithLabel);

type MenuItemLink = {
  type: "link";
  element?: JSX.Element;
  props?: React.ComponentPropsWithoutRef<"a">;
} & (WithIcon | WithLabel);

type MenuItemSeparator = {
  type: "separator";
};
