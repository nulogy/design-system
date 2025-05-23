import React from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { RadixNavigationMenuItem } from "../../shared/components";
import { IndentedContainer } from "../../MobileNav/parts/styled";
import { SubMenuList } from "../../MenuSubItem/parts/styled";
import { UserMenuLink, UserMenuTrigger } from "./styled";
import { UserMenuItemProps } from "./Item";

const MobileItem = React.forwardRef<HTMLLIElement, UserMenuItemProps & { level?: number }>(
  ({ item, level = 0, ...props }, forwardedRef) => {
    const hasSubItems = "items" in item && item.items && item.items.length > 0;

    const content = (
      <>
        {item.type === "link" && (
          <IndentedContainer level={level}>
            <UserMenuLink asChild $isMobile>
              {item.element ? (
                React.cloneElement(item.element, {
                  ...item.props,
                  children: item.label,
                })
              ) : (
                <a {...item.props}>{item.label}</a>
              )}
            </UserMenuLink>
          </IndentedContainer>
        )}
        {item.type === "button" && (
          <IndentedContainer level={level}>
            <UserMenuTrigger {...item.props} $isMobile>
              {item.label}
            </UserMenuTrigger>
          </IndentedContainer>
        )}
        {item.type === "custom" && item.render({ level, withinMobileNav: true })}
      </>
    );

    if (item.type === "button" && hasSubItems) {
      return (
        <RadixNavigationMenuItem ref={forwardedRef} {...props}>
          {content}
          <RadixNavigationMenu.Sub orientation="vertical">
            <SubMenuList>
              {item.items.map((subItem) => (
                <MobileItem key={subItem.key} item={subItem} level={level + 1} />
              ))}
            </SubMenuList>
          </RadixNavigationMenu.Sub>
        </RadixNavigationMenuItem>
      );
    }

    return (
      <RadixNavigationMenuItem ref={forwardedRef} {...props}>
        {content}
      </RadixNavigationMenuItem>
    );
  }
);

MobileItem.displayName = "MobileItem";

export default MobileItem;
