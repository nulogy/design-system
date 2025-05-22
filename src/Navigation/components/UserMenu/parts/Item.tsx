import React from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import type { UserMenuItem as UserMenuItemType } from "../../../types";
import { CaretRight, RadixNavigationMenuItem } from "../../shared/components";
import { SubMenuList, SubMenuContent, UserMenuLink, UserMenuTrigger } from "./styled";

export interface UserMenuItemProps extends RadixNavigationMenu.NavigationMenuItemProps {
  item: UserMenuItemType;
}

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

export default Item;
