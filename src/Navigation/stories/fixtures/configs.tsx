import React from "react";
import { Icon, StatusIndicator } from "../../..";
import type { UserMenu, MenuItems } from "../../types";
import { AppSwitcherConfig } from "../../components/AppSwitcher/NulogyAppSwitcher";
import { NavigationMenuTrigger } from "../../components/shared/components";
import Menu from "../../components/shared/Menu";

// The main menu can be a icon, icon and label, link, button, custom panel, or dropdown
export const primaryMenu: MenuItems = [
  {
    key: "order-management",
    label: "Order management",
    type: "button",
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
                items: [
                  {
                    key: "4th-sub-analytics",
                    label: "4th sub analytics",
                    type: "link",
                  },
                ],
              },
            ],
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
                    type: "link",
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
    key: "inventory-management",
    label: "Inventory management",
    type: "link",
    props: {
      href: "/yoyo",
    },
  },
  {
    key: "invoices",
    label: "Invoices",
    type: "link",
  },
  {
    key: "items",
    label: "Items",
    type: "link",
  },
  {
    key: "imports-and-exports",
    label: "Imports and exports",
    type: "link",
  },
];

export const appSwitcher: AppSwitcherConfig = {
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
  controls: [
    {
      key: "profile",
      label: "profile",
      control: () => <div>profile</div>,
    },
    {
      key: "settings",
      label: "settings",
      control: () => <div>settings</div>,
    },
    // {
    //   key: "site",
    //   render: () => <div>site</div>,
    // },
  ],
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
      ],
    },
    {
      key: "production",
      label: "Production",
      type: "render",
      render: () => <button style={{ fontWeight: "bold", color: "red" }}>production</button>,
    },
  ],
};

// The icons can be a link, button, custom panel, or dropdown
export const secondaryMenu: MenuItems = [
  {
    key: "settings",
    type: "button",
    icon: "settings",
    tooltip: "Settings",
    props: {
      style: {
        padding: "x2",
      },
    },
  },
  {
    key: "home",
    type: "custom",
    render: () => (
      <>
        <NavigationMenuTrigger>
          <Icon icon="home" size="x3" />
          <span>Home</span>
        </NavigationMenuTrigger>
        <Menu padding="none">Something here</Menu>
      </>
    ),
  },
  {
    key: "autoAwesome",
    type: "button",
    icon: "autoAwesome",
    items: [
      {
        key: "autoAwesome",
        type: "link",
        icon: "autoAwesome",
        tooltip: "AutoAwesome",
      },
      {
        key: "autoAwesome",
        type: "custom",
        render: () => <div>Icon</div>,
      },
    ],
  },
];
