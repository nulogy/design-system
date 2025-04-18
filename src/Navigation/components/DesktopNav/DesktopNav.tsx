import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Flex, TruncatedText } from "../../..";
import { VerticalDivider } from "../../..";
import { BaseNavigationProps } from "../../Navigation";
import { NavigationMenuItem } from "../NavigationMenuItem";
import UserMenu, { HorizontalDivider } from "../UserMenu";
import { CaretDown, NavigationMenuList, NavigationMenuTrigger } from "../shared/components";
import { NavigationMenuRoot } from "../shared/components";
import { SecondaryMenu } from "../SecondaryMenu/SecondaryMenu";
import { NulogyAppSwitcher } from "../AppSwitcher/NulogyAppSwitcher";
import { useResponsiveMenu } from "../../hooks/useResponsiveMenu";
import { NulogyLogo } from "../shared/NulogyLogo";

type DesktopNavProps = BaseNavigationProps;

export default function DesktopNav({
  primaryNavigation,
  secondaryNavigation,
  appSwitcher,
  secondaryLogo,
  primaryAppUrl,
  userMenu,
}: DesktopNavProps) {
  const { t } = useTranslation();
  const { menuItems, hiddenMenu, hiddenMenuItem, primaryMenuRef, secondaryMenuRef, hiddenButtonRef } =
    useResponsiveMenu(primaryNavigation);

  return (
    <NavigationMenuRoot>
      <NavigationMenuList ref={primaryMenuRef}>
        <NulogyAppSwitcher config={appSwitcher} />
        <NavigationMenu.Item>
          <NulogyLogo url={primaryAppUrl || "/"} />
        </NavigationMenu.Item>

        {menuItems.map((item) => (
          <NavigationMenuItem key={item.key} item={item} />
        ))}
        {hiddenMenu.length > 0 && (
          <NavigationMenuItem
            item={{
              key: "nds-built-in-responsive-menu-more-item",
              label: t("more"),
              type: "button",
              items: hiddenMenu,
            }}
          />
        )}
        <HiddenNavigationMenuItem ref={hiddenButtonRef} item={hiddenMenuItem} />
      </NavigationMenuList>

      {/* Secondary menu*/}
      <NavigationMenuList ref={secondaryMenuRef}>
        <SecondaryMenu menuItems={secondaryNavigation} />
        <VerticalDivider />
        {secondaryLogo && secondaryLogo}
        <VerticalDivider />
        <NavigationMenu.Item>
          <NavigationMenuTrigger>
            <Flex flexDirection="column" alignItems="flex-start">
              <TruncatedText showTooltip={false} fontSize="smaller" lineHeight="smallerText" fontWeight="normal">
                {userMenu.triggerText.email}
                michael.scott@dundermifflin.com
              </TruncatedText>
              <TruncatedText showTooltip={false} fontSize="smaller" lineHeight="smallerText" fontWeight="normal">
                Dunder Mifflin
              </TruncatedText>
              <TruncatedText showTooltip={false} fontSize="smaller" lineHeight="smallerText" fontWeight="normal">
                Scranton, PA
              </TruncatedText>
            </Flex>
            <CaretDown icon="downArrow" size="x2" aria-hidden />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <UserMenu>
              <UserMenu.Header headerEmail="michael.scott@dundermifflin.com" headerName="Michael Scott" />
              <UserMenu.Content>
                {/* {userMenuInputs} */}
                <HorizontalDivider />
                <UserMenu.Options
                  options={[
                    {
                      label: "User account",
                      type: "button",
                    },
                    {
                      label: "Click me",
                      type: "button",
                      props: {
                        onClick: () => {
                          return undefined;
                        },
                      },
                    },
                    {
                      label: "Sign out",
                      type: "link",
                      props: { href: "" },
                    },
                  ]}
                />
              </UserMenu.Content>
            </UserMenu>
          </NavigationMenuContent>
        </NavigationMenu.Item>
      </NavigationMenuList>
    </NavigationMenuRoot>
  );
}

const HiddenNavigationMenuItem = styled(NavigationMenuItem)({
  visibility: "hidden",
  position: "absolute",
});

const NavigationMenuContent = styled(NavigationMenu.Content).attrs({
  onPointerMove: (event) => event.preventDefault(),
  onPointerLeave: (event) => event.preventDefault(),
})(({ theme }) => ({
  position: "absolute",
  top: `calc(100% + ${theme.space.x1})`,
  right: 0,
}));
