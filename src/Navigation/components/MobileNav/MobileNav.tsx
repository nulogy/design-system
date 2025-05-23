import React from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { useTranslation } from "react-i18next";
import { BaseNavigationProps } from "../../Navigation";
import {
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  RadixNavigationMenuItem,
} from "../shared/components";
import { NulogyAppSwitcher } from "../AppSwitcher/NulogyAppSwitcher";
import { Icon } from "../../../Icon";
import NavigationMenuContent from "../shared/NavigationMenuContent";
import UserMenu from "../UserMenu/UserMenu";
import { Box } from "../../../Box";
import { getNavigationBarItems } from "../utils/getNavigationBarItems";
import { NavigationMenuItem, NavigationMenuSubList } from "../shared/NavigationMenuItem";
import { NulogyLogo } from "../NulogyLogo/NulogyLogo";
import { NavigationLogoLink } from "../shared/NavigationLogoLink";
import { MobileMenuItem } from "./parts/MobileMenuItem";
import { MobileSecondaryLogoContainer } from "./parts/styled";

type MobileNavProps = BaseNavigationProps;

export default function MobileNav({
  primaryNavigation = [],
  secondaryNavigation = [],
  appSwitcher,
  primaryLogo,
  secondaryLogo,
  userMenu,
}: MobileNavProps) {
  const { t } = useTranslation();

  return (
    <NavigationMenuRoot>
      <NavigationMenuList>
        <NulogyAppSwitcher config={appSwitcher} />
        <RadixNavigationMenuItem display="flex">
          {primaryLogo ?? (
            <NavigationLogoLink href="/" aria-label={t("nulogy logo")}>
              <NulogyLogo />
            </NavigationLogoLink>
          )}
        </RadixNavigationMenuItem>
      </NavigationMenuList>
      {(primaryNavigation.length > 0 || secondaryNavigation.length > 0 || userMenu) && (
        <NavigationMenuList>
          {getNavigationBarItems([...primaryNavigation, ...secondaryNavigation]).map((item) => (
            <RadixNavigationMenu.Item key={item.key}>
              <NavigationMenuItem item={item} />
            </RadixNavigationMenu.Item>
          ))}
          <RadixNavigationMenu.Item>
            <NavigationMenuTrigger aria-label={t("toggle mobile menu")}>
              <Icon icon="menu" />
            </NavigationMenuTrigger>
            <NavigationMenuContent right={0}>
              <UserMenu.Container p="none" display="flex" flexDirection="column" gap="x4">
                {primaryNavigation.length > 0 && (
                  <Box px="x2">
                    <RadixNavigationMenu.Sub orientation="vertical">
                      <NavigationMenuSubList>
                        {primaryNavigation.map((item) => (
                          <MobileMenuItem menuItem={item} key={item.key} />
                        ))}
                      </NavigationMenuSubList>
                    </RadixNavigationMenu.Sub>
                  </Box>
                )}
                {secondaryNavigation.length > 0 && (
                  <Box px="x2">
                    <RadixNavigationMenu.Sub orientation="vertical">
                      <NavigationMenuSubList>
                        {secondaryNavigation.map((item) => (
                          <MobileMenuItem menuItem={item} key={item.key} />
                        ))}
                      </NavigationMenuSubList>
                    </RadixNavigationMenu.Sub>
                  </Box>
                )}
                {userMenu && (
                  <>
                    {userMenu.header && (
                      <Box px="x2">
                        <UserMenu.Header {...userMenu.header} containerProps={{ borderRadius: "large" }} />
                      </Box>
                    )}
                    {userMenu.controls && <Box px="x2">{userMenu.controls({ withinMobileNav: true })}</Box>}
                    {userMenu.menuItems && userMenu.menuItems.length > 0 && (
                      <Box px="none">
                        <NavigationMenuSubList>
                          {userMenu.menuItems.map((item) => (
                            <UserMenu.MobileItem key={item.key} item={item} />
                          ))}
                        </NavigationMenuSubList>
                      </Box>
                    )}
                  </>
                )}
              </UserMenu.Container>

              {secondaryLogo && (
                <MobileSecondaryLogoContainer>
                  <NavigationMenuSubList>
                    <RadixNavigationMenuItem>{secondaryLogo}</RadixNavigationMenuItem>
                  </NavigationMenuSubList>
                </MobileSecondaryLogoContainer>
              )}
            </NavigationMenuContent>
          </RadixNavigationMenu.Item>
        </NavigationMenuList>
      )}
    </NavigationMenuRoot>
  );
}
