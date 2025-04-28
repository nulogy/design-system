import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { Divider, Flex, TruncatedText, VerticalDivider } from "../../..";
import { BaseNavigationProps } from "../../Navigation";
import { NavigationMenuItem } from "../NavigationMenuItem";
import UserMenuComponent from "../UserMenu/UserMenu";
import { CaretDown, NavigationMenuList, NavigationMenuTrigger, NavigationMenuRoot } from "../shared/components";
import NavigationMenuContent from "../shared/NavigationMenuContent";
import { NulogyAppSwitcher } from "../AppSwitcher/NulogyAppSwitcher";
import { useResponsiveMenu } from "../../hooks/useResponsiveMenu";
import { NulogyLogo } from "../shared/NulogyLogo";
import type { MenuItems, MenuItem as MenuItemType } from "../../types";

function MoreMenuItem({ moreMenu }: { moreMenu: MenuItems }) {
  const { t } = useTranslation();

  return (
    <NavigationMenuItem
      item={{
        key: "nds-primary-menu-more-item",
        label: t("more"),
        type: "button",
        items: moreMenu,
      }}
    />
  );
}

type DesktopNavProps = BaseNavigationProps;

export default function DesktopNav({
  primaryNavigation = [],
  secondaryNavigation = [],
  appSwitcher,
  secondaryLogo,
  primaryAppUrl,
  userMenu,
}: DesktopNavProps) {
  const userMenuExists = !!userMenu;
  const { menuItems, moreMenu, hiddenMenuItem, primaryMenuRef, secondaryMenuRef, hiddenButtonRef } =
    useResponsiveMenu(primaryNavigation);

  return (
    <NavigationMenuRoot>
      {/* ----------------------- Primary -------------------------------- */}
      <NavigationMenuList ref={primaryMenuRef}>
        <NulogyAppSwitcher config={appSwitcher} />

        <RadixNavigationMenu.Item>
          <NulogyLogo url={primaryAppUrl || "/"} />
        </RadixNavigationMenu.Item>

        {menuItems.map((item) => (
          <NavigationMenuItem key={item.key} item={item} />
        ))}

        {moreMenu.length > 0 && <MoreMenuItem moreMenu={moreMenu} />}

        {hiddenMenuItem && <HiddenNavigationMenuItem ref={hiddenButtonRef} item={hiddenMenuItem} />}
      </NavigationMenuList>

      {/* ----------------------- Secondary ------------------------------ */}
      <NavigationMenuList ref={secondaryMenuRef}>
        {secondaryNavigation.map((item) => (
          <NavigationMenuItem key={item.key} item={item} />
        ))}

        {secondaryNavigation.length > 0 && userMenuExists && <VerticalDivider />}

        {secondaryLogo && <>{secondaryLogo}</>}
        {secondaryLogo && userMenuExists && <VerticalDivider />}

        {/* ----------------------- User Menu ------------------------------ */}
        {userMenuExists && (
          <RadixNavigationMenu.Item>
            <NavigationMenuTrigger>
              <Flex flexDirection="column" alignItems="flex-start">
                <TruncatedText showTooltip={false} fontSize="smaller" lineHeight="smallerText" fontWeight="normal">
                  {userMenu.triggerText.title}
                </TruncatedText>
                {userMenu.triggerText.subtitle1 && (
                  <TruncatedText showTooltip={false} fontSize="smaller" lineHeight="smallerText" fontWeight="normal">
                    {userMenu.triggerText.subtitle1}
                  </TruncatedText>
                )}
                {userMenu.triggerText.subtitle2 && (
                  <TruncatedText showTooltip={false} fontSize="smaller" lineHeight="smallerText" fontWeight="normal">
                    {userMenu.triggerText.subtitle2}
                  </TruncatedText>
                )}
              </Flex>
              <CaretDown icon="downArrow" size="x2" aria-hidden />
            </NavigationMenuTrigger>
            <NavigationMenuContent right={0} p="none">
              <UserMenuComponent.Header {...userMenu.header} />
              <UserMenuComponent.Container>
                {userMenu.controls()}
                <Divider my="x3" />
                <RadixNavigationMenu.List style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {userMenu.menuItems.map((itm) => (
                    <UserMenuComponent.Item key={itm.key} item={itm} />
                  ))}
                </RadixNavigationMenu.List>
              </UserMenuComponent.Container>
            </NavigationMenuContent>
          </RadixNavigationMenu.Item>
        )}
      </NavigationMenuList>
    </NavigationMenuRoot>
  );
}

/* Hidden item used by responsive-menu hook */
const HiddenNavigationMenuItem = styled(NavigationMenuItem)<{ item: MenuItemType }>`
  position: absolute;
  visibility: hidden;
`;
