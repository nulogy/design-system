import React from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { NulogyLogo } from "../shared/NulogyLogo";
import { BaseNavigationProps } from "../../Navigation";
import { NavigationMenuList, NavigationMenuRoot, NavigationMenuTrigger } from "../shared/components";
import { NulogyAppSwitcher } from "../AppSwitcher/NulogyAppSwitcher";
import { Icon } from "../../../Icon";
import NavigationMenuContent from "../shared/NavigationMenuContent";
import UserMenu from "../UserMenu/UserMenu";
import { Box } from "../../../Box";
import { getNavigationBarItems } from "../utils/getNavigationBarItems";
import { NavigationMenuItem, NavigationMenuSubList } from "../NavigationMenuItem";
import { MobileMenuItem } from "./MobileMenuItem";

type MobileNavProps = BaseNavigationProps;

export default function MobileNav({
  primaryNavigation,
  secondaryNavigation,
  appSwitcher,
  primaryAppUrl,
  userMenu,
}: MobileNavProps) {
  return (
    <NavigationMenuRoot>
      <NavigationMenuList>
        <NulogyAppSwitcher config={appSwitcher} />
        <RadixNavigationMenu.Item>
          <NulogyLogo url={primaryAppUrl || "/"} />
        </RadixNavigationMenu.Item>
      </NavigationMenuList>
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
              <Box px="x2">
                {primaryNavigation.map((item) => (
                  <NavigationMenuSubList key={item.key}>
                    <MobileMenuItem menuItem={item} />
                  </NavigationMenuSubList>
                ))}
              </Box>
              <Box px="x2">
                {secondaryNavigation.map((item) => (
                  <MobileMenuItem menuItem={item} key={item.key} />
                ))}
              </Box>
              <Box px="x2">
                <UserMenu.Header {...userMenu.header} containerProps={{ borderRadius: "large" }} />
              </Box>
              <Box px="x2">{userMenu.controls()}</Box>
              <Box px="none">
                <NavigationMenuSubList>
                  {userMenu.menuItems.map((item) => (
                    <UserMenu.MobileItem key={item.key} item={item} />
                  ))}
                </NavigationMenuSubList>
              </Box>
            </UserMenu.Container>
          </NavigationMenuContent>
        </RadixNavigationMenu.Item>
      </NavigationMenuList>
    </NavigationMenuRoot>
  );
}
