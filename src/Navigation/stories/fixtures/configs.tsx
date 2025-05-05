import React from "react";
import { Flex, Icon, Select, StatusIndicator } from "../../..";
import type { UserMenu, MenuItems } from "../../types";
import { AppSwitcherConfig } from "../../components/AppSwitcher/NulogyAppSwitcher";
import { NavigationMenuTrigger } from "../../components/shared/components";
import NavigationMenuContent from "../../components/shared/NavigationMenuContent";

// The main menu can be an:
// [x] icon
// [x] icon and label
// [x] link
// [x] button
// [x] custom panel
// [x] dropdown

export const primaryMenu: MenuItems = [
  {
    key: "order-management",
    label: "Order management",
    type: "button",
    props: {
      onClick: () => {
        alert("you clicked order management");
      },
    },
  },
  {
    key: "analytics",
    label: "Analytics",
    type: "button",
    items: [
      {
        key: "analytics",
        label: "Sub Analytics",
        type: "button",
        items: [
          {
            key: "2nd-sub-analytics",
            label: "2nd sub analytics",
            type: "button",
            items: [
              {
                key: "3rd-sub-analytics",
                label: "3rd sub analytics",
                type: "button",
                // mobileVisibility: "navigationBar",
                items: [
                  {
                    key: "home",
                    type: "custom",
                    render: ({ withinSubMenu, level }) => (
                      <>
                        <NavigationMenuTrigger>
                          <Icon icon="home" size="x3" />
                          <span>Custom Panel</span>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent padding="none">
                          We are {withinSubMenu ? "" : "not"} within a subMenu.{" "}
                          {withinSubMenu ? `this deep: ${level}` : ""}
                        </NavigationMenuContent>
                      </>
                    ),
                  },
                ],
              },
            ],
          },
          {
            key: "settings-home-separator",
            type: "separator",
          },
          {
            key: "2nd-sub-analytics-2",
            label: "2nd sub analytics 2",
            type: "button",
            items: [
              {
                key: "3rd-sub-analytics-2",
                label: "3rd sub analytics",
                type: "button",
                items: [
                  {
                    key: "4th-sub-analytics-2",
                    label: "4th sub analytics",
                    type: "button",
                    props: {
                      onClick: () => {
                        alert("you clicked 4th sub analytics");
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        key: "sub-analytics-2",
        label: "Sub Analytics 2",
        type: "button",
        items: [
          {
            key: "2nd-sub-analytics-3",
            label: "2nd sub analytics",
            type: "link",
            props: {
              href: "https://www.google.com",
            },
          },
        ],
      },
    ],
  },
  {
    key: "analytics-invenotry-management-separator",
    type: "separator",
  },
  {
    key: "inventory-management",
    label: "Inventory management",
    type: "link",
    props: {
      href: "https://www.google.com",
    },
  },
  {
    key: "invoices",
    label: "Invoices",
    type: "button",
    props: {
      onClick: () => {
        alert("you clicked invoices");
      },
    },
  },
  {
    key: "invoices-item-separator",
    type: "separator",
  },
  {
    key: "items",
    label: "Items",
    type: "button",
    props: {
      onClick: () => {
        alert("you clicked items");
      },
    },
  },
  {
    key: "imports-and-exports",
    icon: "chatBubble",
    tooltip: "imports and exports",
    type: "button",
    props: {
      onClick: () => {
        alert("you clicked imports and exports");
      },
    },
  },
];

export const appSwitcher: AppSwitcherConfig = {
  apps: {
    "production-scheduling": {
      url: "https://www.google.com",
      indicator: <StatusIndicator type="informative">new</StatusIndicator>,
    },
    "supplier-collaboration": {
      url: "https://www.google.com",
    },
    "digital-quality-inspection": {
      url: "https://www.google.com",
    },
    "shop-floor": {
      url: "https://www.google.com",
    },
    "smart-factory": {
      url: "https://www.google.com",
    },
    connections: {
      url: "https://www.google.com",
    },
  },
};

/*
 The usermenu needs to accept 3 meta data
 and the usermenu header needs to accept a title and subtitle
*/
export const userMenu: UserMenu = {
  triggerText: {
    title: "michael.scott@dundermifflin.com",
    subtitle1: "Dunder Mifflin",
    subtitle2: "Scranton, PA",
  },
  header: {
    title: "Michael Scott",
    subtitle1: "michael.scott@dundermifflin.com",
  },
  controls: () => (
    <Flex gap="x2" flexDirection="column" width="100%">
      <Select
        defaultValue={["eaches"]}
        options={[
          { value: "eaches", label: "Eaches" },
          { value: "cases", label: "Cases" },
          { value: "pallets", label: "Pallets" },
        ]}
        labelText="Default"
      />
      <Select
        defaultValue={["eaches"]}
        options={[
          { value: "eaches", label: "Eaches" },
          { value: "cases", label: "Cases" },
          { value: "pallets", label: "Pallets" },
        ]}
        labelText="Base"
      />
    </Flex>
  ),
  menuItems: [
    {
      key: "preferences",
      label: "Preferences",
      type: "link",
      props: {
        href: "/preferences",
      },
    },
    {
      key: "finance",
      label: "Finance",
      type: "button",
      props: {
        onClick: () => {
          console.log("finance");
        },
      },
    },
    {
      key: "browse_as",
      label: "Browse as",
      type: "button",
      items: [
        {
          key: "foooooo",
          label: "foooooo",
          type: "button",
        },
        {
          key: "baaaaar",
          label: "baaaaar",
          type: "button",
        },
        {
          key: "baaaaaz",
          label: "baaaaaz",
          type: "button",
          items: [
            {
              key: "baaaaaz",
              label: "baaaaaz",
              type: "button",
              items: [
                {
                  key: "baaaaaz",
                  type: "render",
                  render: () => <div>This is a custom panel inside the user menu</div>,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "production",
      type: "render",
      render: () => <button style={{ fontWeight: "bold", color: "red" }}>production</button>,
    },
  ],
};

export const secondaryMenu: MenuItems = [
  {
    key: "settings",
    type: "button",
    icon: "settings",
    tooltip: "Settings",
    mobileVisibility: "navigationBar",
    props: {
      style: {
        padding: "x2",
      },
      onClick: () => {
        alert("you clicked settings");
      },
    },
  },
  {
    key: "settings-home-separator",
    type: "separator",
  },
  {
    key: "home",
    type: "custom",
    render: ({ withinSubMenu, withinMobileNav }) => (
      <>
        <NavigationMenuTrigger>
          <Icon icon="home" size="x3" />
          <span>Custom Panel</span>
        </NavigationMenuTrigger>
        <NavigationMenuContent padding="none" bg="whiteGrey">
          This is a custom panel. I am rendered{" "}
          {withinMobileNav ? "within the mobile navigation" : "within the desktop navigation"}. I am{" "}
          {withinSubMenu ? "inside" : "not inside"} a submenu.
        </NavigationMenuContent>
      </>
    ),
  },
  {
    key: "magic",
    type: "button",
    icon: "autoAwesome",
    label: "Magic",
    items: [
      {
        key: "autoAwesome",
        type: "link",
        icon: "autoAwesome",
        tooltip: "AutoAwesome",
        props: {
          href: "https://www.google.com",
        },
      },
      {
        key: "custom-div",
        type: "custom",
        render: ({ withinMobileNav, withinSubMenu }) => (
          <div>
            This is a custom panel. I am rendered{" "}
            {withinMobileNav ? "within the mobile navigation" : "within the desktop navigation"}. I am{" "}
            {withinSubMenu ? "inside" : "not inside"} a submenu.
          </div>
        ),
      },
    ],
  },
];
