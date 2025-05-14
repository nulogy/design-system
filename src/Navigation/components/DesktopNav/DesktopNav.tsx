import React from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { useTranslation } from "react-i18next";
import { Box, Divider, Flex, TruncatedText, VerticalDivider } from "../../..";
import { BaseNavigationProps } from "../../Navigation";
import { NavigationMenuItem, NavigationMenuSubList } from "../NavigationMenuItem";
import UserMenu from "../UserMenu/UserMenu";
import {
  CaretDown,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuRoot,
  RadixNavigationMenuItem,
} from "../shared/components";
import NavigationMenuContent from "../shared/NavigationMenuContent";
import { NulogyAppSwitcher } from "../AppSwitcher/NulogyAppSwitcher";
import { useResponsiveMenu } from "../../hooks/useResponsiveMenu";
import { NulogyLogo } from "../NulogyLogo/NulogyLogo";
import { NavigationLogoLink } from "../NulogyLogo/NavigationLogoLink";
import MoreMenuItem, { HiddenNavigationMenuItem } from "./parts/MoreMenuItem";

type DesktopNavProps = BaseNavigationProps;

export default function DesktopNav({
  primaryNavigation = [],
  secondaryNavigation = [],
  appSwitcher,
  secondaryLogo,
  primaryLogo,
  userMenu,
}: DesktopNavProps) {
  const { t } = useTranslation();
  const userMenuExists = !!userMenu;
  const { menuItems, moreMenu, hiddenMenuItem, primaryMenuRef, secondaryMenuRef, hiddenButtonRef } =
    useResponsiveMenu(primaryNavigation);

  const hasUserMenuContent =
    userMenuExists && (userMenu.header || userMenu.controls || (userMenu.menuItems && userMenu.menuItems.length > 0));

  return (
    <NavigationMenuRoot>
      {/* ----------------------- Primary -------------------------------- */}
      <NavigationMenuList ref={primaryMenuRef}>
        <NulogyAppSwitcher config={appSwitcher} />

        <RadixNavigationMenuItem display="flex">
          {primaryLogo ?? (
            <NavigationLogoLink href="/" aria-label="Nulogy Logo">
              <NulogyLogo />
            </NavigationLogoLink>
          )}
        </RadixNavigationMenuItem>

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

        {secondaryLogo && <RadixNavigationMenuItem display="flex">{secondaryLogo}</RadixNavigationMenuItem>}
        {secondaryLogo && userMenuExists && <VerticalDivider />}

        {/* ----------------------- User Menu ------------------------------ */}
        {userMenuExists && (
          <RadixNavigationMenu.Item>
            <NavigationMenuTrigger py="x1" disabled={!hasUserMenuContent} aria-label={t("User menu")}>
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
              {hasUserMenuContent && <CaretDown icon="downArrow" size="x2" aria-hidden />}
            </NavigationMenuTrigger>
            {hasUserMenuContent && (
              <NavigationMenuContent right={0} p="none">
                {userMenu.header && <UserMenu.Header {...userMenu.header} />}
                {(userMenu.controls || (userMenu.menuItems && userMenu.menuItems.length > 0)) && (
                  <UserMenu.Container p="none" display="flex" flexDirection="column">
                    {userMenu.controls && <Box p="x2">{userMenu.controls({ withinMobileNav: false })}</Box>}
                    {userMenu.controls && userMenu.menuItems && userMenu.menuItems.length > 0 && (
                      <Box px="x2">
                        <Divider my="x2" />
                      </Box>
                    )}
                    {userMenu.menuItems && userMenu.menuItems.length > 0 && (
                      <Box px="none">
                        <NavigationMenuSubList>
                          {userMenu.menuItems.map((item) => (
                            <UserMenu.Item key={item.key} item={item} />
                          ))}
                        </NavigationMenuSubList>
                      </Box>
                    )}
                  </UserMenu.Container>
                )}
              </NavigationMenuContent>
            )}
          </RadixNavigationMenu.Item>
        )}
      </NavigationMenuList>
    </NavigationMenuRoot>
  );
}
