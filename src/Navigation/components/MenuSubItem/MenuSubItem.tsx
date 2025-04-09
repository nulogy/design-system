import React from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { useTheme } from "styled-components";
import { Icon } from "../../../Icon";
import { MenuItem } from "../../types";
import { CaretRight } from "../shared/components";
import { SubMenuContent, SubMenuItem, SubMenuItemButton, SubMenuItemLink, SubMenuList } from "./parts/styled";

type Props = {
  item: MenuItem;
};

export function MenuSubItem({ item }: Props) {
  const theme = useTheme();

  if (item.type === "custom") {
    return <RadixNavigationMenu.Item key={item.key}>{item.render()}</RadixNavigationMenu.Item>;
  }

  const hasIcon = "icon" in item;
  const isLink = item.type === "link";
  const hasSubMenu = item.type === "button" && !!item.items && item.items.length > 0;

  const content = (
    <>
      {hasIcon && <Icon icon={item.icon} size="x2" aria-hidden />}
      {"label" in item && item.label && <span>{item.label}</span>}
      {hasSubMenu && <CaretRight aria-hidden size="x2" />}
    </>
  );

  return (
    <SubMenuItem key={item.key} value={"label" in item ? item.label : item.key}>
      {isLink ? (
        <SubMenuItemLink style={{ padding: "12px 8px" }} {...item.props}>
          {content}
        </SubMenuItemLink>
      ) : (
        <>
          <SubMenuItemButton py="x1_5" px="x1" {...item.props}>
            {content}
          </SubMenuItemButton>
          {hasSubMenu && (
            <SubMenuContent left={`calc(100% + ${theme.space.half})`} top={`calc(-1 * ${theme.space.x1})`}>
              <RadixNavigationMenu.Sub orientation="vertical">
                <SubMenuList>
                  {item.items?.map((subItem) => <MenuSubItem key={subItem.key} item={subItem} />)}
                </SubMenuList>
              </RadixNavigationMenu.Sub>
            </SubMenuContent>
          )}
        </>
      )}
    </SubMenuItem>
  );
}
