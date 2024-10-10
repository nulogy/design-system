import * as React from "react"
import type { MenuItems } from "../components/menu-item"
import { AppSwitcher } from "../components/app-switcher"

function Link(props: { href: string; body: string }) {
  return <a href={props.href}>{props.body}</a>
}

export const menuItems: MenuItems = [
  // This is hard, I will come back later
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  {
    label: "Order management",
    type: "fragment",
    props: { to: "foo" },
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
      href: "/",
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
]

export const DefaultAppSwitcher = () => (
  <AppSwitcher.Menu>
    <AppSwitcher.Item href="/">
      <AppSwitcher.Title>Connections</AppSwitcher.Title>
      <AppSwitcher.Description>Multi-tiered bandwidth-monitored process improvement</AppSwitcher.Description>
    </AppSwitcher.Item>
    <AppSwitcher.Item href="/">
      <AppSwitcher.Title>Digital quality control</AppSwitcher.Title>
      <AppSwitcher.Description>Cloned global attitude fully-configurable motivating support</AppSwitcher.Description>
    </AppSwitcher.Item>
    <AppSwitcher.Item href="/">
      <AppSwitcher.Title>Production scheduling</AppSwitcher.Title>
      <AppSwitcher.Description>
        Assimilated 24 hour capability operative demand-driven model object-based zero tolerance model
        fully-configurable regional analyzer
      </AppSwitcher.Description>
    </AppSwitcher.Item>
    <AppSwitcher.Item href="/">
      <AppSwitcher.Title>Shop floor control</AppSwitcher.Title>
      <AppSwitcher.Description>Persevering mobile capacity synchronised intangible core</AppSwitcher.Description>
    </AppSwitcher.Item>
    <AppSwitcher.Item href="/">
      <AppSwitcher.Title>Supplier collaboration</AppSwitcher.Title>
      <AppSwitcher.Description>
        Function-based coherent process improvement cloned encompassing info-mediates
      </AppSwitcher.Description>
    </AppSwitcher.Item>
  </AppSwitcher.Menu>
)
