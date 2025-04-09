import React from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { Icon } from "../../../Icon";
import {
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuIconLink,
  NavigationMenuIconTrigger,
} from "../shared/components";
import { MenuItems } from "../../types";

interface Props {
  menuItems: MenuItems;
}

export function SecondaryMenu({ menuItems }: Props) {
  return (
    <>
      {menuItems.map((item) => {
        if (item.type === "custom") {
          return <RadixNavigationMenu.Item key={item.key}>{item.render()}</RadixNavigationMenu.Item>;
        }

        const hasIcon = "icon" in item;
        const isLink = item.type === "link";

        return (
          <RadixNavigationMenu.Item key={item.key}>
            {isLink ? (
              hasIcon ? (
                <NavigationMenuIconLink {...item.props}>
                  <Icon icon={item.icon} size="x3" />
                  {item.label}
                </NavigationMenuIconLink>
              ) : (
                <NavigationMenuLink {...item.props}>{item.label}</NavigationMenuLink>
              )
            ) : hasIcon ? (
              <NavigationMenuIconTrigger>
                <Icon icon={item.icon} size="x3" />
                {item.label}
              </NavigationMenuIconTrigger>
            ) : (
              <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
            )}
          </RadixNavigationMenu.Item>
        );
      })}
    </>
  );
}
