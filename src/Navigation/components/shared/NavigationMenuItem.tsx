import React from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import styled from "styled-components";
import { Text } from "../../../Type";
import type { MenuItem } from "../../types";
import { Icon } from "../../../Icon";
import { VerticalDivider } from "../../../VerticalDivider";
import { Divider } from "../../../Divider";
import { Tooltip } from "../../../Tooltip2";
import { MenuSubItem } from "../MenuSubItem/MenuSubItem";
import { SubMenuContent } from "../MenuSubItem/parts/styled";
import { CaretDown, NavigationMenuLink, NavigationMenuTrigger, RadixNavigationMenuItem } from "./components";

export interface NavigationMenuItemProps extends RadixNavigationMenu.NavigationMenuItemProps {
  item: MenuItem;
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
          {item.render({ withinSubMenu: level > 0, level, withinMobileNav: false })}
        </RadixNavigationMenuItem>
      );
    }

    const hasIcon = "icon" in item;
    const isLink = item.type === "link";
    const hasSubMenu = item.type === "button" && !!item.items && item.items.length > 0;
    const hasLabel = "label" in item && item.label;

    const hasIconOnly = hasIcon && !hasLabel;
    const hasTooltip = hasIconOnly && Boolean(item.tooltip);

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

    if (isLink) {
      const Item = (
        <RadixNavigationMenuItem ref={forwardedRef} {...props}>
          <NavigationMenuLink
            asChild
            aria-label={hasIconOnly && item.tooltip ? item.tooltip : item.label}
            borderRadius={hasIconOnly ? "rounded" : undefined}
            p={hasIcon ? "x1" : undefined}
          >
            {item.element ? (
              React.cloneElement(item.element, { ...item.props, children: Content })
            ) : (
              <a {...item.props}>{Content}</a>
            )}
          </NavigationMenuLink>
        </RadixNavigationMenuItem>
      );

      return hasTooltip ? (
        <Tooltip sideOffset={0} content={item.tooltip}>
          {Item}
        </Tooltip>
      ) : (
        Item
      );
    }

    const Item = (
      <RadixNavigationMenuItem ref={forwardedRef} {...props}>
        <NavigationMenuTrigger
          asChild
          position="relative"
          aria-label={hasIconOnly && item.tooltip ? item.tooltip : hasLabel ? item.label : undefined}
          borderRadius={hasIconOnly ? "rounded" : undefined}
          p={hasIcon ? "x1" : undefined}
        >
          <Button {...item.props}>{Content}</Button>
        </NavigationMenuTrigger>

        {hasSubMenu && (
          <SubMenuContent>
            <RadixNavigationMenu.Sub orientation="vertical">
              <NavigationMenuSubList>
                {item.items?.map((sub) => <MenuSubItem key={sub.key} item={sub} level={level + 1} />)}
              </NavigationMenuSubList>
            </RadixNavigationMenu.Sub>
          </SubMenuContent>
        )}
      </RadixNavigationMenuItem>
    );

    return hasTooltip ? (
      <Tooltip sideOffset={0} content={item.tooltip}>
        {Item}
      </Tooltip>
    ) : (
      Item
    );
  }
);

NavigationMenuItem.displayName = "NavigationMenuItem";

export const NavigationMenuSubList = styled(RadixNavigationMenu.List)`
  list-style: none;
  margin: 0;
  padding: 0;

  & > ${Divider}:first-child {
    display: none;
  }
`;

const Button = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button">>(
  ({ onPointerEnter: _, onPointerLeave: __, onPointerMove: ___, ...props }, forwardedRef) => {
    return <button {...props} ref={forwardedRef} />;
  }
);

Button.displayName = "Button";
