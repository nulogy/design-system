import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { Divider, Flex, TruncatedText } from "../../..";
import { VerticalDivider } from "../../..";
import { BaseNavigationProps } from "../../Navigation";
import { NavigationMenuItem } from "../NavigationMenuItem";
import UserMenu from "../UserMenu/UserMenu";
import { CaretDown, NavigationMenuList, NavigationMenuTrigger } from "../shared/components";
import { NavigationMenuRoot } from "../shared/components";
import { SecondaryMenu } from "../SecondaryMenu/SecondaryMenu";
import { NulogyAppSwitcher } from "../AppSwitcher/NulogyAppSwitcher";
import { useResponsiveMenu } from "../../hooks/useResponsiveMenu";
import { NulogyLogo } from "../shared/NulogyLogo";
import { MenuItems } from "../../types";

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
  primaryNavigation,
  secondaryNavigation,
  appSwitcher,
  secondaryLogo,
  primaryAppUrl,
  userMenu,
}: DesktopNavProps) {
  const { menuItems, moreMenu, hiddenMenuItem, primaryMenuRef, secondaryMenuRef, hiddenButtonRef } =
    useResponsiveMenu(primaryNavigation);

  return (
    <NavigationMenuRoot>
      <NavigationMenuList ref={primaryMenuRef}>
        <NulogyAppSwitcher config={appSwitcher} />
        <RadixNavigationMenu.Item>
          <NulogyLogo url={primaryAppUrl || "/"} />
        </RadixNavigationMenu.Item>
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.key} item={item} />
        ))}
        {moreMenu.length > 0 && <MoreMenuItem moreMenu={moreMenu} />}
        <HiddenNavigationMenuItem ref={hiddenButtonRef} item={hiddenMenuItem} />
      </NavigationMenuList>

      {/* Secondary menu*/}
      <NavigationMenuList ref={secondaryMenuRef}>
        <SecondaryMenu menuItems={secondaryNavigation} />
        <VerticalDivider />
        {secondaryLogo && secondaryLogo}
        <VerticalDivider />
        <RadixNavigationMenu.Item>
          <NavigationMenuTrigger>
            <Flex flexDirection="column" alignItems="flex-start">
              <TruncatedText showTooltip={false} fontSize="smaller" lineHeight="smallerText" fontWeight="normal">
                {userMenu.triggerText.title}
              </TruncatedText>
              <TruncatedText showTooltip={false} fontSize="smaller" lineHeight="smallerText" fontWeight="normal">
                {userMenu.triggerText.subtitle1}
              </TruncatedText>
              <TruncatedText showTooltip={false} fontSize="smaller" lineHeight="smallerText" fontWeight="normal">
                {userMenu.triggerText.subtitle2}
              </TruncatedText>
            </Flex>
            <CaretDown icon="downArrow" size="x2" aria-hidden />
          </NavigationMenuTrigger>
          <UserMenu.Root right={0} position="absolute">
            <UserMenu.Header {...userMenu.header} />
            <UserMenu.Content>
              <RadixNavigationMenu.Sub orientation="vertical">
                {/* {userMenuInputs} */}
                <Divider my="x3" />
                {userMenu.menuItems.map((item) => (
                  <UserMenu.Item key={item.key} item={item} />
                ))}
              </RadixNavigationMenu.Sub>
            </UserMenu.Content>
          </UserMenu.Root>
        </RadixNavigationMenu.Item>
      </NavigationMenuList>
    </NavigationMenuRoot>
  );
}

const HiddenNavigationMenuItem = styled(NavigationMenuItem)({
  visibility: "hidden",
  position: "absolute",
});
