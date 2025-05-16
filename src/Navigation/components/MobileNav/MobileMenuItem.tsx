import React from "react";
import { MenuItem } from "../../types";
import { Text } from "../../../Type";
import { Icon } from "../../../Icon";
import { Divider } from "../../../Divider";
import { RadixNavigationMenuItem } from "../shared/components";
import { IndentedContainer, MobileNavigationButton, MobileNavigationLink, MenuItemGroupLabel } from "./styled";

/* ---------------------------------------------------------------------
 * Component
 * -------------------------------------------------------------------*/

interface MobileMenuItemProps {
  menuItem: MenuItem;
  /** Depth (root = 0). */
  level?: number;
}

export const MobileMenuItem = React.forwardRef<HTMLLIElement, MobileMenuItemProps>(
  ({ menuItem, level = 0, ...props }, forwardedRef) => {
    // Proceed only if mobileVisibility is "navigationMenu" or not specified
    if (menuItem.mobileVisibility !== undefined && menuItem.mobileVisibility !== "navigationMenu") {
      return null;
    }

    /* -------------------------------------------------------------------
     * Separator
     * -----------------------------------------------------------------*/
    if (menuItem.type === "separator") {
      return (
        <IndentedContainer level={level}>
          <Divider secondary={level > 0} my="x2" />
        </IndentedContainer>
      );
    }

    /* -------------------------------------------------------------------
     * Custom render fragment
     * -----------------------------------------------------------------*/
    if (menuItem.type === "custom") {
      return (
        <IndentedContainer level={level}>
          <RadixNavigationMenuItem ref={forwardedRef} {...props}>
            {menuItem.render({ withinSubMenu: level > 0, level, withinMobileNav: true })}
          </RadixNavigationMenuItem>
        </IndentedContainer>
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
        <IndentedContainer level={level}>
          <MobileNavigationLink {...("props" in menuItem ? menuItem.props : {})}>
            {IconFragment}
            {LabelFragment}
          </MobileNavigationLink>
        </IndentedContainer>
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
          <>
            {LabelFragment && (
              <IndentedContainer level={level}>
                <MenuItemGroupLabel>{LabelFragment}</MenuItemGroupLabel>
              </IndentedContainer>
            )}
            {(menuItem.items || []).map((item) => (
              <MobileMenuItem key={item.key} menuItem={item} level={level + 1} />
            ))}
          </>
        );
      }

      // Simple button with no children
      return (
        <IndentedContainer level={level}>
          <MobileNavigationButton {...("props" in menuItem ? menuItem.props : {})}>
            {IconFragment}
            {LabelFragment}
          </MobileNavigationButton>
        </IndentedContainer>
      );
    }

    return null;
  }
);

MobileMenuItem.displayName = "MobileMenuItem";
