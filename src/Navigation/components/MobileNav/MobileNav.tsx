import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Logo from "../../icons/Logo";
import { NavigationProps } from "../../Navigation";
import UserMenu from "../UserMenu/UserMenu";
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
} from "../shared/components";
import { MenuItem, MenuItems } from "../../types";
import { NulogyAppSwitcher } from "../AppSwitcher/NulogyAppSwitcher";
import { Divider } from "../../../index";
type MobileNavProps = Omit<NavigationProps, "breakpoint">;

export default function MobileNav({ primaryNavigation, appSwitcher }: MobileNavProps) {
  return (
    <NavigationMenuRoot
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        padding: "12px 16px",
        backgroundColor: "white",
        borderBottom: "1px solid #E4E7EB",
      }}
    >
      <NavigationMenuList>
        <NulogyAppSwitcher config={appSwitcher} />
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
                {/* {children && (
                  <>
                    <div style={{ padding: "32px 16px" }}>{children}</div>
                    <HorizontalDivider />
                  </>
                )} */}

                <MobileNavigationMenu menu={primaryNavigation} />

                <Divider my="x3" />

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
}

const MobileNavigationMenu = ({ menu }: { menu: MenuItems }) => {
  return (
    <>
      {menu.map((item) => (
        <MobileMenuItem menuItem={item} key={item.key} />
      ))}
    </>
  );
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
