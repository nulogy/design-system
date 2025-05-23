import React from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { MenuItem } from "../../../types";
import { Text } from "../../../../Type";
import { Icon } from "../../../../Icon";
import { Divider } from "../../../../Divider";
import { RadixNavigationMenuItem } from "../../shared/components";
import { NavigationMenuSubList } from "../../shared/NavigationMenuItem";
import { IndentedContainer, MobileNavigationButton, MobileNavigationLink, MenuItemGroupLabel } from "./styled";

interface MobileMenuItemProps {
  menuItem: MenuItem;
  /** Depth (root = 0). */
  level?: number;
}

export const MobileMenuItem = React.forwardRef<HTMLLIElement, MobileMenuItemProps>(
  ({ menuItem, level = 0, ...props }, forwardedRef) => {
    if (menuItem.mobileVisibility !== undefined && menuItem.mobileVisibility !== "navigationMenu") {
      return null;
    }

    /* -------------------------------------------------------------------
     * Separator
     * -----------------------------------------------------------------*/
    if (menuItem.type === "separator") {
      return (
        <RadixNavigationMenuItem ref={forwardedRef} {...props}>
          <IndentedContainer level={level}>
            <Divider secondary={level > 0} my="x2" />
          </IndentedContainer>
        </RadixNavigationMenuItem>
      );
    }

    /* -------------------------------------------------------------------
     * Custom render fragment
     * -----------------------------------------------------------------*/
    if (menuItem.type === "custom") {
      return (
        <RadixNavigationMenuItem ref={forwardedRef} {...props}>
          <IndentedContainer level={level}>
            {menuItem.render({ withinSubMenu: level > 0, level, withinMobileNav: true })}
          </IndentedContainer>
        </RadixNavigationMenuItem>
      );
    }

    /* -------------------------------------------------------------------
     * Helpers shared by link & button
     * -----------------------------------------------------------------*/
    const hasIcon = "icon" in menuItem;
    const hasLabel = "label" in menuItem && !!menuItem.label;
    const hasTooltip = "tooltip" in menuItem && !!menuItem.tooltip;

    const IconFragment = hasIcon ? <Icon icon={menuItem.icon} size="x3" aria-hidden /> : null;

    // Determine the text to display: use label if available, otherwise use tooltip if icon is present
    const labelText = hasLabel ? menuItem.label : hasIcon && hasTooltip ? menuItem.tooltip : null;

    const LabelFragment = labelText ? (
      <Text fontSize="small" lineHeight="smallTextCompressed">
        {labelText}
      </Text>
    ) : null;

    /* -------------------------------------------------------------------
     * Link
     * -----------------------------------------------------------------*/
    if (menuItem.type === "link") {
      return (
        <RadixNavigationMenuItem ref={forwardedRef} {...props}>
          <IndentedContainer level={level}>
            <MobileNavigationLink asChild>
              {menuItem.element ? (
                React.cloneElement(menuItem.element, {
                  ...menuItem.props,
                  children: (
                    <>
                      {IconFragment}
                      {LabelFragment}
                    </>
                  ),
                })
              ) : (
                <a {...menuItem.props}>
                  {IconFragment}
                  {LabelFragment}
                </a>
              )}
            </MobileNavigationLink>
          </IndentedContainer>
        </RadixNavigationMenuItem>
      );
    }

    /* -------------------------------------------------------------------
     * Button
     * -----------------------------------------------------------------*/
    if (menuItem.type === "button") {
      const hasItems = !!menuItem.items && menuItem.items.length > 0;

      // Button with nested items – show group label then children
      if (hasItems) {
        return (
          <RadixNavigationMenuItem ref={forwardedRef} {...props}>
            {LabelFragment && (
              <IndentedContainer level={level}>
                <MenuItemGroupLabel>{labelText}</MenuItemGroupLabel>
              </IndentedContainer>
            )}
            <RadixNavigationMenu.Sub orientation="vertical">
              <NavigationMenuSubList>
                {(menuItem.items || []).map((item) => (
                  <MobileMenuItem key={item.key} menuItem={item} level={level + 1} />
                ))}
              </NavigationMenuSubList>
            </RadixNavigationMenu.Sub>
          </RadixNavigationMenuItem>
        );
      }

      // Simple button with no children
      return (
        <RadixNavigationMenuItem ref={forwardedRef} {...props}>
          <IndentedContainer level={level}>
            <MobileNavigationButton {...("props" in menuItem ? menuItem.props : {})}>
              {IconFragment}
              {LabelFragment}
            </MobileNavigationButton>
          </IndentedContainer>
        </RadixNavigationMenuItem>
      );
    }

    return null;
  }
);

MobileMenuItem.displayName = "MobileMenuItem";
