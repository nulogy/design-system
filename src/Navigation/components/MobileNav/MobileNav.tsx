import React from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { NulogyLogo } from "../shared/NulogyLogo";
import { BaseNavigationProps } from "../../Navigation";
import { NavigationMenuList, NavigationMenuRoot, NavigationMenuTrigger } from "../shared/components";
import { NulogyAppSwitcher } from "../AppSwitcher/NulogyAppSwitcher";
import { Icon } from "../../../Icon";
import NavigationMenuContent from "../shared/NavigationMenuContent";
import UserMenu from "../UserMenu/UserMenu";
import { Divider } from "../../../Divider";
type MobileNavProps = BaseNavigationProps;
import MobileMenuItem from "./MobileMenuItem";
import { UserMenuItemsList } from "../DesktopNav/DesktopNav";

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
        <RadixNavigationMenu.Item>
          <NavigationMenuTrigger>
            <Icon icon="menu" />
          </NavigationMenuTrigger>
          <NavigationMenuContent right={0}>
            <UserMenu.Container>
              {primaryNavigation.map((item) => (
                <MobileMenuItem menuItem={item} key={item.key} />
              ))}

              <Divider my="x3" />

              {secondaryNavigation.map((item) => (
                <MobileMenuItem menuItem={item} key={item.key} />
              ))}

              <Divider my="x3" />

              {userMenu.controls()}

              <UserMenuItemsList>
                {userMenu.menuItems.map((item) => (
                  <UserMenu.Item key={item.key} item={item} />
                ))}
              </UserMenuItemsList>
            </UserMenu.Container>
          </NavigationMenuContent>
        </RadixNavigationMenu.Item>
      </NavigationMenuList>
    </NavigationMenuRoot>
  );
}
