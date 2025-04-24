import React from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import styled from "styled-components";
import type { MenuItem } from "../types";
import { CaretDown, NavigationMenuLink, NavigationMenuTrigger } from "./shared/components";
import { MenuSubItem } from "./MenuSubItem/MenuSubItem";
import { SubMenuContent } from "./MenuSubItem/parts/styled";

interface NavigationMenuItemProps extends RadixNavigationMenu.NavigationMenuItemProps {
  item: MenuItem;
}

export const NavigationMenuItem = React.forwardRef<HTMLLIElement, NavigationMenuItemProps>(
  ({ item, ...props }, forwardedRef) => {
    return (
      <RadixNavigationMenuItem ref={forwardedRef} {...props}>
        {item.type === "button" ? (
          <>
            <NavigationMenuTrigger py="x1_5" px="x1">
              {item.label}
              {item.items && <CaretDown icon="downArrow" aria-hidden size="x2" />}
            </NavigationMenuTrigger>
            {item.items && (
              <SubMenuContent
                onPointerMove={(event) => event.preventDefault()}
                onPointerLeave={(event) => event.preventDefault()}
              >
                <RadixNavigationMenu.Sub orientation="vertical">
                  <NavigationMenuList>
                    {item.items?.map((subItem) => <MenuSubItem key={subItem.key} item={subItem} />)}
                  </NavigationMenuList>
                </RadixNavigationMenu.Sub>
              </SubMenuContent>
            )}
          </>
        ) : item.type === "link" ? (
          <NavigationMenuLink py="x1_5" px="x1" {...item.props}>
            {item.label}
          </NavigationMenuLink>
        ) : (
          // Custom menu items are rendered in UserMenu.tsx
          <React.Fragment>{item.render()}</React.Fragment>
        )}
      </RadixNavigationMenuItem>
    );
  }
);

const NavigationMenuList = styled(RadixNavigationMenu.List)`
  padding: 0px;
  list-style: none;
`;

const RadixNavigationMenuItem = styled(RadixNavigationMenu.Item)`
  position: relative;
`;
