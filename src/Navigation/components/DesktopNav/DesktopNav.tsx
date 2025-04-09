import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import equal from "deep-equal";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Flex, TruncatedText } from "../../..";
import Logo from "../../icons/Logo";
import { VerticalDivider } from "../../..";
import { NavigationProps } from "../../Navigation";
import { NavigationMenuItem } from "../NavigationMenuItem";
import UserMenu, { HorizontalDivider } from "../UserMenu";
import { CaretDown, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../shared/components";
import { NavigationMenuRoot } from "../shared/components";
import { SecondaryMenu } from "../SecondaryMenu/SecondaryMenu";
import { NulogyAppSwitcher } from "../AppSwitcher/NulogyAppSwitcher";
import { MenuItems, MenuItem } from "../../types";

const MIN_DISTANCE_BETWEEN_MENUS = 64;

type MenuState = {
  menuItems: MenuItems;
  hiddenMenu: MenuItems;
  hiddenMenuItem: MenuItem | null;
};

type DesktopNavProps = Omit<NavigationProps, "breakpoint">;

export default function DesktopNav({
  primaryNavigation,
  secondaryNavigation,
  appSwitcher,
  secondaryLogo,
}: DesktopNavProps) {
  const [menuState, setMenuState] = useState<MenuState>({
    menuItems: primaryNavigation,
    hiddenMenu: [],
    hiddenMenuItem: {
      key: "hidden-menu-item",
      label: "",
      type: "button",
    },
  });
  const primaryMenuRef = useRef<HTMLUListElement>(null);
  const secondaryMenuRef = useRef<HTMLUListElement>(null);
  const hiddenButtonRef = useRef<HTMLDivElement>(null);

  const calculateDistance = useCallback(() => {
    if (!primaryMenuRef.current || !secondaryMenuRef.current || !hiddenButtonRef.current) {
      return false;
    }

    const primaryRect = primaryMenuRef.current.getBoundingClientRect();
    const secondaryRect = secondaryMenuRef.current.getBoundingClientRect();
    const hiddenButtonWidth = hiddenButtonRef.current.getBoundingClientRect().width;
    const distance = secondaryRect.left - primaryRect.right;

    if (distance < MIN_DISTANCE_BETWEEN_MENUS && menuState.menuItems.length > 0) {
      // Going down:
      // Remove the last element from menuItems...
      const lastItem = menuState.menuItems[menuState.menuItems.length - 1];
      const newMenuItems = menuState.menuItems.slice(0, -1);
      // ...and add it to the beginning of hiddenMenu so that the original order is maintained.
      const newHiddenMenu = [lastItem, ...menuState.hiddenMenu];

      // Only update state if there's a difference
      if (!equal(newMenuItems, menuState.menuItems) || !equal(newHiddenMenu, menuState.hiddenMenu)) {
        setMenuState({
          menuItems: newMenuItems,
          hiddenMenu: newHiddenMenu,
          hiddenMenuItem: lastItem,
        });
      }
    } else if (
      Math.floor(distance - hiddenButtonWidth - 8) > MIN_DISTANCE_BETWEEN_MENUS &&
      menuState.hiddenMenu.length > 0
    ) {
      // Going up:
      // Remove the first element from hiddenMenu (the top element)...
      const firstHiddenItem = menuState.hiddenMenu[0];
      const newHiddenMenu = menuState.hiddenMenu.slice(1);
      // ...and add it to the end of menuItems.
      const newMenuItems = [...menuState.menuItems, firstHiddenItem];

      if (!equal(newHiddenMenu, menuState.hiddenMenu) || !equal(newMenuItems, menuState.menuItems)) {
        setMenuState({
          menuItems: newMenuItems,
          hiddenMenu: newHiddenMenu,
          hiddenMenuItem: firstHiddenItem,
        });
      }
    }
  }, [menuState]);

  useLayoutEffect(() => {
    calculateDistance();

    window.addEventListener("resize", calculateDistance);
    return () => {
      window.removeEventListener("resize", calculateDistance);
    };
  }, [calculateDistance]);

  return (
    <div>
      <NavigationMenuRoot
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          padding: "0px 16px",
          backgroundColor: "white",
          borderBottom: "1px solid #E4E7EB",
        }}
      >
        <NavigationMenuList ref={primaryMenuRef}>
          <NulogyAppSwitcher config={appSwitcher} />
          <NavigationMenu.Item>
            <NavigationMenuLink
              href="/"
              style={{
                marginRight: "16px",
                marginLeft: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Logo />
            </NavigationMenuLink>
          </NavigationMenu.Item>

          {menuState.menuItems.map((item) => (
            <NavigationMenuItem key={item.key} item={item} />
          ))}
          {menuState.hiddenMenu.length > 0 && (
            <NavigationMenuItem
              item={{
                label: "More",
                type: "button",
                items: menuState.hiddenMenu,
              }}
            />
          )}
          <NavigationMenuItem
            style={{ visibility: "hidden", position: "absolute" }}
            ref={hiddenButtonRef}
            item={menuState.hiddenMenuItem}
          />
        </NavigationMenuList>

        {/* Secondary menu*/}
        <NavigationMenuList ref={secondaryMenuRef}>
          <SecondaryMenu menuItems={secondaryNavigation} />
          <VerticalDivider />
          {secondaryLogo && secondaryLogo}
          <VerticalDivider />
          <NavigationMenu.Item>
            <NavigationMenuTrigger
              onPointerMove={(event) => event.preventDefault()}
              onPointerLeave={(event) => event.preventDefault()}
              style={{
                display: "flex",
              }}
            >
              <Flex flexDirection="column" alignItems="flex-start">
                <TruncatedText showTooltip={false} fontSize="smaller" lineHeight="smallerText" fontWeight="normal">
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
            <NavigationMenu.Content
              onPointerMove={(event) => event.preventDefault()}
              onPointerLeave={(event) => event.preventDefault()}
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
              }}
            >
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
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenuList>
      </NavigationMenuRoot>
    </div>
  );
}
