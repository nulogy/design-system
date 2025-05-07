import React from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { BaseNavigationProps } from "../../Navigation";
import {
  NavigationMenuLink,
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
import { NavigationMenuItem, NavigationMenuSubList } from "../NavigationMenuItem";
import { NulogyLogo } from "../NulogyLogo/NulogyLogo";
import { MobileMenuItem } from "./MobileMenuItem";

type MobileNavProps = BaseNavigationProps;

export default function MobileNav({
  primaryNavigation = [],
  secondaryNavigation = [],
  appSwitcher,
  primaryLogo,
  userMenu,
}: MobileNavProps) {
  return (
    <NavigationMenuRoot>
      <NavigationMenuList>
        <NulogyAppSwitcher config={appSwitcher} />
        <RadixNavigationMenuItem display="flex">
          {primaryLogo ?? (
            // @todo translate the aria-label
            <NavigationMenuLink href="/" aria-label="Nulogy Logo">
              <NulogyLogo app="connections" />
            </NavigationMenuLink>
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
            <NavigationMenuTrigger>
              <Icon icon="menu" />
            </NavigationMenuTrigger>
            <NavigationMenuContent right={0}>
              <UserMenu.Container p="none" display="flex" flexDirection="column" gap="x4">
                {primaryNavigation.length > 0 && (
                  <Box px="x2">
                    {primaryNavigation.map((item) => (
                      <NavigationMenuSubList key={item.key}>
                        <MobileMenuItem menuItem={item} />
                      </NavigationMenuSubList>
                    ))}
                  </Box>
                )}
                {secondaryNavigation.length > 0 && (
                  <Box px="x2">
                    {secondaryNavigation.map((item) => (
                      <MobileMenuItem menuItem={item} key={item.key} />
                    ))}
                  </Box>
                )}
                {userMenu && (
                  <>
                    {userMenu.header && (
                      <Box px="x2">
                        <UserMenu.Header {...userMenu.header} containerProps={{ borderRadius: "large" }} />
                      </Box>
                    )}
                    {userMenu.controls && <Box px="x2">{userMenu.controls()}</Box>}
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
            </NavigationMenuContent>
          </RadixNavigationMenu.Item>
        </NavigationMenuList>
      )}
    </NavigationMenuRoot>
  );
}
