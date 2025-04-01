import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Logo from "../icons/Logo";
import UserMenu, { HorizontalDivider } from "./UserMenu";
import Navigation from "./AppSwitcher";
import { NavigationMenuLink, NavigationMenuList, NavigationMenuRoot, NavigationMenuTrigger } from "./DesktopNav";
import { MenuItem, MenuItems } from "./NavigationMenuItem";

export const NulogyAppSwitcher = () => (
  <Navigation.AppSwitcher.Menu>
    <Navigation.AppSwitcher.Item href="/">
      <Navigation.AppSwitcher.Title>Connections</Navigation.AppSwitcher.Title>
      <Navigation.AppSwitcher.Description>
        Multi-tiered bandwidth-monitored process improvement
      </Navigation.AppSwitcher.Description>
    </Navigation.AppSwitcher.Item>
    <Navigation.AppSwitcher.Item href="/">
      <Navigation.AppSwitcher.Title>Digital quality control</Navigation.AppSwitcher.Title>
      <Navigation.AppSwitcher.Description>
        Cloned global attitude fully-configurable motivating support
      </Navigation.AppSwitcher.Description>
    </Navigation.AppSwitcher.Item>
    <Navigation.AppSwitcher.Item href="/">
      <Navigation.AppSwitcher.Title>Production scheduling</Navigation.AppSwitcher.Title>
      <Navigation.AppSwitcher.Description>
        Assimilated 24 hour capability operative demand-driven model object-based zero tolerance model
        fully-configurable regional analyzer
      </Navigation.AppSwitcher.Description>
    </Navigation.AppSwitcher.Item>
    <Navigation.AppSwitcher.Item href="/">
      <Navigation.AppSwitcher.Title>Introduction</Navigation.AppSwitcher.Title>
      <Navigation.AppSwitcher.Description>
        Build high-quality, accessible design systems and web apps.
      </Navigation.AppSwitcher.Description>
    </Navigation.AppSwitcher.Item>
    <Navigation.AppSwitcher.Item href="/">
      <Navigation.AppSwitcher.Title>Introduction</Navigation.AppSwitcher.Title>
      <Navigation.AppSwitcher.Description>
        Build high-quality, accessible design systems and web apps.
      </Navigation.AppSwitcher.Description>
    </Navigation.AppSwitcher.Item>
  </Navigation.AppSwitcher.Menu>
);

const MobileNav = ({
  primaryMenu,
  children,
}: // secondaryMenu,
{
  primaryMenu: MenuItems;
  children?: React.ReactNode;
  // secondaryMenu: unknown;
}) => {
  return (
    <NavigationMenuRoot
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        padding: "12px 16px",
        backgroundColor: "white",
      }}
    >
      <NavigationMenuList>
        <NavigationMenu.Item>
          <NavigationMenuTrigger
            onPointerMove={(event) => event.preventDefault()}
            onPointerLeave={(event) => event.preventDefault()}
            style={{
              padding: "8px",
              borderRadius: 9999,
            }}
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
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenu.Item>
          <NavigationMenuTrigger
            onPointerMove={(event) => event.preventDefault()}
            onPointerLeave={(event) => event.preventDefault()}
            style={{
              padding: "8px",
              borderRadius: 9999,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="#434D59" />
            </svg>
          </NavigationMenuTrigger>
          <NavigationMenu.Content
            onPointerMove={(event) => event.preventDefault()}
            onPointerLeave={(event) => event.preventDefault()}
            style={{ position: "absolute", top: "calc(100% + 8px)", right: 0 }}
          >
            <UserMenu>
              <UserMenu.Header headerEmail="michael.scott@dundermifflin.com" headerName="Michael Scott" />
              <UserMenu.Content>
                {children && (
                  <>
                    <div style={{ padding: "32px 16px" }}>{children}</div>
                    <HorizontalDivider />
                  </>
                )}

                <MobileNavigationMenu menu={primaryMenu} />

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
  );
};

const MobileNavigationMenu = ({ menu }: { menu: MenuItems }) => {
  return menu.map((item) => <MobileMenuItem menuItem={item} key={item.label} />);
};

const MobileMenuItem = ({ menuItem }: { menuItem: MenuItem }) => {
  if (menuItem.type === "button") {
    if (menuItem.items) {
      return (
        <>
          <p
            style={{
              color: "#6C7784",
              fontFamily: "IBM Plex Sans",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "16px /* 114.286% */",
              margin: 0,
              paddingTop: 8 + 4,
              paddingBottom: 8 + 4,
            }}
          >
            {menuItem.label}
          </p>
          <div style={{ paddingLeft: 16 }}>
            <MobileNavigationMenu menu={menuItem.items} />
          </div>
        </>
      );
    } else {
      return (
        <NavigationMenu.Trigger
          onPointerMove={(event) => event.preventDefault()}
          onPointerLeave={(event) => event.preventDefault()}
          {...menuItem.props}
          style={{
            background: "none",
            border: "none",
            outline: "none",
            userSelect: "none",
            display: "block",
            color: "var(--ui-dark-grey, #434D59)",
            fontFamily: "IBM Plex Sans",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "16px /* 114.286% */",
            padding: 0,
            paddingTop: 8 + 4,
            paddingBottom: 8 + 4,
            textAlign: "left",
          }}
        >
          {menuItem.label}
        </NavigationMenu.Trigger>
      );
    }
  } else {
    return (
      <NavigationMenu.Link
        {...menuItem.props}
        onPointerMove={(event) => event.preventDefault()}
        onPointerLeave={(event) => event.preventDefault()}
        style={{
          display: "block",
          color: "var(--ui-dark-grey, #434D59)",
          fontFamily: "IBM Plex Sans",
          fontSize: "14px",
          textDecoration: "none",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "16px /* 114.286% */",
          paddingTop: 8 + 4,
          paddingBottom: 8 + 4,
        }}
      >
        {menuItem.label}
      </NavigationMenu.Link>
    );
  }
};

export default MobileNav;
