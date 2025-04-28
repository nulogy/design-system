import React from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import styled from "styled-components";
import { Text } from "../../Type";
import type { MenuItem } from "../types";
import { Icon } from "../../Icon";
import { VerticalDivider } from "../../VerticalDivider";
import { CaretDown, NavigationMenuLink, NavigationMenuTrigger } from "./shared/components";
import { MenuSubItem } from "./MenuSubItem/MenuSubItem";
import { SubMenuContent } from "./MenuSubItem/parts/styled";

interface NavigationMenuItemProps extends RadixNavigationMenu.NavigationMenuItemProps {
  item: MenuItem;
  /** Depth (root = 0). Set internally. */
  level?: number;
}

/**
 * A single Radix <NavigationMenu.Item> that can represent any MenuItem variant.
 */
export const NavigationMenuItem = React.forwardRef<HTMLLIElement, NavigationMenuItemProps>(
  ({ item, level = 0, ...props }, forwardedRef) => {
    if (item.type === "separator") {
      return (
        <RadixNavigationMenuItem ref={forwardedRef} {...props}>
          <VerticalDivider mx="x1" />
        </RadixNavigationMenuItem>
      );
    }

    /* ---------------------------------------------------------------------
     * Handle "custom” items
     * -------------------------------------------------------------------*/
    if (item.type === "custom") {
      return (
        <RadixNavigationMenuItem ref={forwardedRef} {...props}>
          {item.render({ withinSubMenu: level > 0, level })}
        </RadixNavigationMenuItem>
      );
    }

    const hasIcon = "icon" in item;
    const isLink = item.type === "link";
    const hasSubMenu = item.type === "button" && !!item.items && item.items.length > 0;
    const hasLabel = "label" in item && item.label;

    /* Shared inner content */
    const Content = (
      <>
        {hasIcon && <Icon icon={item.icon} size="x3" aria-hidden />}
        {"label" in item && item.label && (
          <Text fontSize="small" lineHeight="smallTextCompressed">
            {item.label}
          </Text>
        )}
        {hasSubMenu && <CaretDown aria-hidden size="x2" />}
      </>
    );

    /* Render link */
    if (isLink) {
      return (
        <RadixNavigationMenuItem ref={forwardedRef} {...props}>
          <NavigationMenuLink
            borderRadius={hasLabel ? undefined : "rounded"}
            p={hasIcon ? "x1" : undefined}
            {...item.props}
          >
            {Content}
          </NavigationMenuLink>
        </RadixNavigationMenuItem>
      );
    }

    /* Render button + optional submenu */
    return (
      <RadixNavigationMenuItem ref={forwardedRef} {...props}>
        <NavigationMenuTrigger
          borderRadius={hasLabel ? undefined : "rounded"}
          p={hasIcon ? "x1" : undefined}
          {...item.props}
        >
          {Content}
        </NavigationMenuTrigger>

        {hasSubMenu && (
          <SubMenuContent onPointerMove={(e) => e.preventDefault()} onPointerLeave={(e) => e.preventDefault()}>
            <RadixNavigationMenu.Sub orientation="vertical">
              <NavigationMenuSubList>
                {item.items?.map((sub) => <MenuSubItem key={sub.key} item={sub} level={level + 1} />)}
              </NavigationMenuSubList>
            </RadixNavigationMenu.Sub>
          </SubMenuContent>
        )}
      </RadixNavigationMenuItem>
    );
  }
);

const NavigationMenuSubList = styled(RadixNavigationMenu.List)`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const RadixNavigationMenuItem = styled(RadixNavigationMenu.Item)`
  position: relative;
`;
