import { autoUpdate, flip, offset, shift, size, useFloating } from "@floating-ui/react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import React from "react";
import { useTheme } from "styled-components";
import { Divider } from "../../../Divider";
import { Flex } from "../../../Flex";
import { Icon } from "../../../Icon";
import type { MenuItem } from "../../types";
import { CaretRight } from "../shared/components";
import { SubMenuContent, SubMenuItem, SubMenuItemButton, SubMenuItemLink, SubMenuList } from "./parts/styled";

type Props = {
  item: MenuItem;
  level: number;
};

export function MenuSubItem({ item, level }: Props) {
  const theme = useTheme();

  // Position the submenu flyout with floating-ui so it stays within the
  // viewport: flip/shift off the edges and cap its height to the available
  // space (it scrolls via overflow-y) instead of running off-screen.
  const { refs, floatingStyles } = useFloating({
    placement: "right-start",
    strategy: "fixed",
    // Position via top/left rather than a transform so the flyout is not a
    // containing block for deeper (fixed) flyouts — they need to escape its
    // overflow-x: hidden.
    transform: false,
    middleware: [
      offset({ crossAxis: -parseFloat(theme.space.x1), mainAxis: -parseFloat(theme.space.half) }),
      flip({ fallbackAxisSideDirection: "start" }),
      shift({ padding: parseFloat(theme.space.x1) }),
      size({
        padding: parseFloat(theme.space.x1),
        apply({ availableHeight, elements }) {
          elements.floating.style.maxHeight = `${availableHeight}px`;
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  /* ---------------------------------------------------------------------
   * Separator
   * -------------------------------------------------------------------*/
  if (item.type === "separator") {
    return <Divider my="x1" mx="x1" width="auto" />;
  }

  /* ---------------------------------------------------------------------
   * Custom render
   * -------------------------------------------------------------------*/
  if (item.type === "custom") {
    return (
      <RadixNavigationMenu.Item key={item.key}>
        {item.render({ withinSubMenu: true, level, withinMobileNav: false })}
      </RadixNavigationMenu.Item>
    );
  }

  /* ---------------------------------------------------------------------
   * Default render
   * -------------------------------------------------------------------*/
  const hasIcon = "icon" in item;
  const isLink = item.type === "link";
  const hasSubMenu = item.type === "button" && !!item.items && item.items.length > 0;

  const content = (
    <>
      {hasIcon && (
        <Flex alignItems="center" gap="x1">
          <Icon icon={item.icon} size="x3" aria-hidden />
          <span>{item.label ?? item.tooltip}</span>
        </Flex>
      )}
      {"label" in item && item.label && !hasIcon && <span>{item.label}</span>}
      {hasSubMenu && <CaretRight aria-hidden size="x2" />}
    </>
  );

  return (
    <SubMenuItem key={item.key} value={"label" in item ? item.label : item.key}>
      {isLink ? (
        <SubMenuItemLink asChild>
          {item.element ? (
            React.cloneElement(item.element, {
              ...item.props,
              children: content,
            })
          ) : (
            <a {...item.props}>{content}</a>
          )}
        </SubMenuItemLink>
      ) : (
        <>
          <SubMenuItemButton ref={refs.setReference} {...item.props}>
            {content}
          </SubMenuItemButton>
          {hasSubMenu && (
            <SubMenuContent
              ref={refs.setFloating}
              style={{ ...floatingStyles, overflowX: "hidden", overflowY: "auto" }}
            >
              <RadixNavigationMenu.Sub orientation="vertical">
                <SubMenuList>
                  {item.items?.map((subItem) => (
                    <MenuSubItem key={subItem.key} item={subItem} level={level + 1} />
                  ))}
                </SubMenuList>
              </RadixNavigationMenu.Sub>
            </SubMenuContent>
          )}
        </>
      )}
    </SubMenuItem>
  );
}
