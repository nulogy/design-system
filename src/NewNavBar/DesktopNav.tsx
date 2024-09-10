import React, { useLayoutEffect, useRef, useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import styled, { CSSProperties } from "styled-components";
import { Icon } from "../Icon";
import Logo from "./logos/Logo";
import SettingsIcon from "./icons/SettingsIcon";
import SignPostIcon from "./icons/SignpostIcon";
import SearchIcon from "./icons/SearchIcon";
import HelpIcon from "./icons/HelpIcon";
import CustomLogo from "./logos/CustomLogo";
import { MenuItem, MenuItems, NavigationMenuItem } from "./NavigationMenuItem";
import UserMenu, { HorizontalDivider } from "./UserMenu";
import { NulogyAppSwitcher } from "./MobileNav";
import { NAVBAR } from "./constants";

// Here is what is left:
// Loading the page, the menu is not working like it should
// likely because react renders twice in dev mode

function deleteLastElement<T>(array: T[]) {
  return array.slice(0, -1);
}

function getLastElement<T>(array: T[]) {
  return array[array.length - 1];
}

const DesktopNav = ({ primaryMenu, userMenuInputs }: { primaryMenu: MenuItems; userMenuInputs?: React.ReactNode }) => {
  const [hiddenMenuItem, setHiddenMenuItem] = useState<MenuItem>({
    label: "",
    type: "button",
  });

  const primaryMenuRef = useRef<HTMLUListElement>(null);
  const secondaryMenuRef = useRef<HTMLUListElement | null>(null);

  const hiddenButtonRef = useRef<HTMLDivElement | null>(null);

  const [menuItems, setMenuItems] = useState<MenuItems>(primaryMenu);
  const [hiddenMenu, setHiddenMenu] = useState<MenuItems>([]);

  const moreMenu: MenuItem = {
    label: "More",
    type: "button",
    items: hiddenMenu,
  };

  const calculateDistance = () => {
    if (primaryMenuRef.current && secondaryMenuRef.current && hiddenButtonRef.current) {
      const primaryMenuRect = primaryMenuRef.current.getBoundingClientRect();
      const secondaryMenuRect = secondaryMenuRef.current.getBoundingClientRect();
      const hiddenButtonWidth = hiddenButtonRef.current.getBoundingClientRect().width;

      const distance = secondaryMenuRect.left - primaryMenuRect.right;

      if (distance < NAVBAR.minDistanceBetweenMenus) {
        // going down
        if (menuItems.length) {
          const item = getLastElement(menuItems);
          setMenuItems(deleteLastElement(menuItems));
          setHiddenMenu((prevState) => [...prevState, item]);
          setHiddenMenuItem(item);
        }
      } else if (Math.floor(distance - hiddenButtonWidth - 8) > NAVBAR.minDistanceBetweenMenus) {
        // going up
        if (hiddenMenu.length > 0) {
          const lastItem = getLastElement(hiddenMenu);
          setHiddenMenu(deleteLastElement(hiddenMenu));
          setMenuItems((prevState) => [...prevState, lastItem]);
        }
      }
    }
  };

  useLayoutEffect(() => {
    calculateDistance(); // Initial calculation

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
          <NavigationMenu.Item>
            <NavigationMenuTrigger
              style={{
                padding: "8px",
                borderRadius: 9999,
              }}
              onPointerMove={(event) => event.preventDefault()}
              onPointerLeave={(event) => event.preventDefault()}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.65 20C5.18333 20 4.79167 19.8417 4.475 19.525C4.15833 19.2083 4 18.8167 4 18.35C4 17.8833 4.15833 17.4917 4.475 17.175C4.79167 16.8583 5.18333 16.7 5.65 16.7C6.11667 16.7 6.50833 16.8583 6.825 17.175C7.14167 17.4917 7.3 17.8833 7.3 18.35C7.3 18.8167 7.14167 19.2083 6.825 19.525C6.50833 19.8417 6.11667 20 5.65 20ZM12 20C11.5333 20 11.1417 19.8417 10.825 19.525C10.5083 19.2083 10.35 18.8167 10.35 18.35C10.35 17.8833 10.5083 17.4917 10.825 17.175C11.1417 16.8583 11.5333 16.7 12 16.7C12.4667 16.7 12.8583 16.8583 13.175 17.175C13.4917 17.4917 13.65 17.8833 13.65 18.35C13.65 18.8167 13.4917 19.2083 13.175 19.525C12.8583 19.8417 12.4667 20 12 20ZM18.35 20C17.8833 20 17.4917 19.8417 17.175 19.525C16.8583 19.2083 16.7 18.8167 16.7 18.35C16.7 17.8833 16.8583 17.4917 17.175 17.175C17.4917 16.8583 17.8833 16.7 18.35 16.7C18.8167 16.7 19.2083 16.8583 19.525 17.175C19.8417 17.4917 20 17.8833 20 18.35C20 18.8167 19.8417 19.2083 19.525 19.525C19.2083 19.8417 18.8167 20 18.35 20ZM5.65 13.65C5.18333 13.65 4.79167 13.4917 4.475 13.175C4.15833 12.8583 4 12.4667 4 12C4 11.5333 4.15833 11.1417 4.475 10.825C4.79167 10.5083 5.18333 10.35 5.65 10.35C6.11667 10.35 6.50833 10.5083 6.825 10.825C7.14167 11.1417 7.3 11.5333 7.3 12C7.3 12.4667 7.14167 12.8583 6.825 13.175C6.50833 13.4917 6.11667 13.65 5.65 13.65ZM12 13.65C11.5333 13.65 11.1417 13.4917 10.825 13.175C10.5083 12.8583 10.35 12.4667 10.35 12C10.35 11.5333 10.5083 11.1417 10.825 10.825C11.1417 10.5083 11.5333 10.35 12 10.35C12.4667 10.35 12.8583 10.5083 13.175 10.825C13.4917 11.1417 13.65 11.5333 13.65 12C13.65 12.4667 13.4917 12.8583 13.175 13.175C12.8583 13.4917 12.4667 13.65 12 13.65ZM18.35 13.65C17.8833 13.65 17.4917 13.4917 17.175 13.175C16.8583 12.8583 16.7 12.4667 16.7 12C16.7 11.5333 16.8583 11.1417 17.175 10.825C17.4917 10.5083 17.8833 10.35 18.35 10.35C18.8167 10.35 19.2083 10.5083 19.525 10.825C19.8417 11.1417 20 11.5333 20 12C20 12.4667 19.8417 12.8583 19.525 13.175C19.2083 13.4917 18.8167 13.65 18.35 13.65ZM5.65 7.3C5.18333 7.3 4.79167 7.14167 4.475 6.825C4.15833 6.50833 4 6.11667 4 5.65C4 5.18333 4.15833 4.79167 4.475 4.475C4.79167 4.15833 5.18333 4 5.65 4C6.11667 4 6.50833 4.15833 6.825 4.475C7.14167 4.79167 7.3 5.18333 7.3 5.65C7.3 6.11667 7.14167 6.50833 6.825 6.825C6.50833 7.14167 6.11667 7.3 5.65 7.3ZM12 7.3C11.5333 7.3 11.1417 7.14167 10.825 6.825C10.5083 6.50833 10.35 6.11667 10.35 5.65C10.35 5.18333 10.5083 4.79167 10.825 4.475C11.1417 4.15833 11.5333 4 12 4C12.4667 4 12.8583 4.15833 13.175 4.475C13.4917 4.79167 13.65 5.18333 13.65 5.65C13.65 6.11667 13.4917 6.50833 13.175 6.825C12.8583 7.14167 12.4667 7.3 12 7.3ZM18.35 7.3C17.8833 7.3 17.4917 7.14167 17.175 6.825C16.8583 6.50833 16.7 6.11667 16.7 5.65C16.7 5.18333 16.8583 4.79167 17.175 4.475C17.4917 4.15833 17.8833 4 18.35 4C18.8167 4 19.2083 4.15833 19.525 4.475C19.8417 4.79167 20 5.18333 20 5.65C20 6.11667 19.8417 6.50833 19.525 6.825C19.2083 7.14167 18.8167 7.3 18.35 7.3Z"
                  fill="#434D59"
                />
              </svg>
            </NavigationMenuTrigger>
            <NavigationMenu.Content
              onPointerMove={(event) => event.preventDefault()}
              onPointerLeave={(event) => event.preventDefault()}
              style={{ position: "absolute", top: "calc(100% + 8px)" }}
            >
              <NulogyAppSwitcher />
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenuLink
              style={{
                marginRight: "16px",
                marginLeft: "8px",
              }}
              href="/"
            >
              <Logo />
            </NavigationMenuLink>
          </NavigationMenu.Item>

          {menuItems.map((item) => (
            <NavigationMenuItem key={item.label} item={item} />
          ))}
          {hiddenMenu.length > 0 && <NavigationMenuItem item={moreMenu} />}
          <NavigationMenuItem
            style={{ visibility: "hidden", position: "absolute" }}
            ref={hiddenButtonRef}
            item={hiddenMenuItem}
          />
        </NavigationMenuList>

        {/* Secondary menu*/}
        <NavigationMenuList ref={secondaryMenuRef}>
          <NavigationMenu.Item>
            <NavigationMenuTrigger
              onPointerMove={(event) => event.preventDefault()}
              onPointerLeave={(event) => event.preventDefault()}
              style={{ paddingRight: 8, borderRadius: 9999 }}
            >
              <SearchIcon />
            </NavigationMenuTrigger>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenuTrigger
              onPointerMove={(event) => event.preventDefault()}
              onPointerLeave={(event) => event.preventDefault()}
              style={{ paddingRight: 8, borderRadius: 9999 }}
            >
              <SettingsIcon />
            </NavigationMenuTrigger>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenuTrigger
              onPointerMove={(event) => event.preventDefault()}
              onPointerLeave={(event) => event.preventDefault()}
              style={{ paddingRight: 8, borderRadius: 9999 }}
            >
              <SignPostIcon />
            </NavigationMenuTrigger>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenuTrigger
              onPointerMove={(event) => event.preventDefault()}
              onPointerLeave={(event) => event.preventDefault()}
              style={{ paddingRight: 8, borderRadius: 9999 }}
            >
              <HelpIcon />
            </NavigationMenuTrigger>
          </NavigationMenu.Item>
          <VerticalDivider />
          <CustomLogo />
          <VerticalDivider />
          <NavigationMenu.Item>
            <NavigationMenuTrigger
              onPointerMove={(event) => event.preventDefault()}
              onPointerLeave={(event) => event.preventDefault()}
              style={{
                display: "flex",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  fontWeight: "normal",
                  lineHeight: "16px",
                  fontSize: "12px",
                }}
              >
                <span>michael.scott@dundermifflin.com</span>
                <span>Dunder Mifflin</span>
                <span>Scranton, PA</span>
              </div>
              <Icon icon="cheveronDown" color="darkGrey" aria-hidden />
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
                  {userMenuInputs}
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
};

const VerticalDivider = styled("span")({
  display: "inline-block",
  height: 16,
  width: 1,
  margin: "0px 16px",
  backgroundColor: "#E4E7EB",
});

export const NavigationMenuRoot = styled(NavigationMenu.Root)({
  display: "block",

  "& > div": {
    display: "flex",
  },
});

export const NavigationMenuList = styled(NavigationMenu.List)({
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: "0px",
  listStyle: "none",
  margin: 0,
  gap: 8,
});

const itemStyles: CSSProperties = {
  padding: "8px",
  outline: "none",
  userSelect: "none",
  fontWeight: 500,
  fontSize: 14,
  borderRadius: "8px",
  lineHeight: "16px",
  color: "#434D59",
  transition: "background-color 250ms ease",
  whiteSpace: "nowrap",
};

export const NavigationMenuTrigger = styled(NavigationMenu.Trigger)({
  all: "unset",
  ...itemStyles,
  paddingRight: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
  "&:focus": { boxShadow: `0px 0px 5px 0px rgba(33, 107, 235, 0.90)` },
  "&:hover": { backgroundColor: "#E1EBFA" },
});

export const NavigationMenuLink = styled(NavigationMenu.Link)({
  ...itemStyles,
  display: "block",
  textDecoration: "none",
  fontSize: 14,
  lineHeight: "16px",
  "&:focus": { boxShadow: `0px 0px 5px 0px rgba(33, 107, 235, 0.90)` },
  "&:hover": { backgroundColor: "#E1EBFA" },
});

export default DesktopNav;
