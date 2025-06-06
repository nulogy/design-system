import React from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { useTheme } from "styled-components";
import { Icon } from "../../../Icon";
import { MenuItem } from "../../types";
import { CaretRight } from "../shared/components";
import { Flex } from "../../../Flex";
import { Divider } from "../../../Divider";
import { SubMenuContent, SubMenuItem, SubMenuItemButton, SubMenuItemLink, SubMenuList } from "./parts/styled";

type Props = {
  item: MenuItem;
  level: number;
};

export function MenuSubItem({ item, level }: Props) {
  const theme = useTheme();

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
            React.cloneElement(item.element, { ...item.props, children: content })
          ) : (
            <a {...item.props}>{content}</a>
          )}
        </SubMenuItemLink>
      ) : (
        <>
          <SubMenuItemButton {...item.props}>{content}</SubMenuItemButton>
          {hasSubMenu && (
            <SubMenuContent left={`calc(100% - ${theme.space.half})`} top={`calc(-1 * ${theme.space.x1})`}>
              <RadixNavigationMenu.Sub orientation="vertical">
                <SubMenuList>
                  {item.items?.map((subItem) => <MenuSubItem key={subItem.key} item={subItem} level={level + 1} />)}
                </SubMenuList>
              </RadixNavigationMenu.Sub>
            </SubMenuContent>
          )}
        </>
      )}
    </SubMenuItem>
  );
}
