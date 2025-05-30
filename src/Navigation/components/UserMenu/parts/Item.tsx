import React from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import type { UserMenuItem as UserMenuItemType } from "../../../types";
import { RadixNavigationMenuItem } from "../../shared/components";
import { UserMenuLink, UserMenuTrigger } from "./styled";

export interface UserMenuItemProps extends RadixNavigationMenu.NavigationMenuItemProps {
  item: UserMenuItemType;
}

const Item = React.forwardRef<HTMLLIElement, UserMenuItemProps & { level?: number }>(
  ({ item, level = 0, ...props }, forwardedRef) => {
    return (
      <RadixNavigationMenuItem ref={forwardedRef} {...props}>
        {item.type === "link" && (
          <UserMenuLink asChild>
            {item.element ? (
              React.cloneElement(item.element, {
                ...item.props,
                children: item.label,
              })
            ) : (
              <a {...item.props}>{item.label}</a>
            )}
          </UserMenuLink>
        )}
        {item.type === "button" && <UserMenuTrigger {...item.props}>{item.label}</UserMenuTrigger>}
        {item.type === "custom" && item.render({ level, withinMobileNav: false })}
      </RadixNavigationMenuItem>
    );
  }
);

Item.displayName = "Item";

export default Item;
