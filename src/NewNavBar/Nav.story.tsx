import React from "react";
import { MenuItems } from "./NavigationMenuItem";
import Nav from "./Nav";

function Link(props: { href: string; body: string }) {
  return <a href={props.href}>{props.body}</a>;
}

export const menu_items: MenuItems = [
  // This is hard, I will come back later
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  {
    label: "Order management",
    type: "button",
    component: Link,
    props: { body: "Yep" },
  },
  {
    label: "Analytics",
    type: "button",
    items: [
      {
        label: "Sub Analytics",
        type: "button",
        items: [
          {
            label: "2nd sub analytics",
            type: "button",
            items: [
              {
                label: "3rd sub analytics",
                type: "button",
                items: [
                  {
                    label: "4th sub analytics",
                    type: "link",
                  },
                ],
              },
            ],
          },
          {
            label: "2nd sub analytics 2",
            type: "button",
            items: [
              {
                label: "3rd sub analytics",
                type: "button",
                items: [
                  {
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
        label: "Sub Analytics 2",
        type: "button",
        items: [
          {
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
    label: "Inventory management",
    type: "link",
    props: {
      href: "/yoyo",
    },
  },
  {
    label: "Invoices",
    type: "link",
  },
  {
    label: "Items",
    type: "link",
  },
  {
    label: "Imports and exports",
    type: "link",
  },
];

export default {
  title: "Components/NavigationMenu",
  parameters: {
    layout: "fullscreen",
  },
};

export const NavigationMenu = () => {
  return <Nav menuItems={menu_items} />;
};
