import React from "react";
import {
  ApplicationFrame,
  BrandedNavBar,
  Icon,
  Breadcrumbs,
  Link,
  Text,
  Page,
  StatusIndicator,
} from "..";
import Header from "./Header";

const primaryMenu = [
  {
    name: "Order Management",
    items: [
      { name: "Dashboard", href: "/" },
      { name: "Moves", href: "/" },
      { name: "Pick Lists", href: "/" },
      { name: "Receive Orders", href: "/" },
      { name: "Receipts", href: "/" },
      { name: "Ship Orders", href: "/" },
      { name: "Shipments", href: "/" },
      { name: "Item Lists", href: "/" },
      { name: "Cycle Counts", href: "/" },
      { name: "Blind Counts", href: "/" },
      { name: "Inbound Stock Transfer Orders", href: "/" },
      { name: "Inbound Stock Transfers", href: "/" },
      { name: "Outbound Stock Transfers", href: "/" },
    ],
  },

  {
    name: "Analytics",
    items: [
      { name: "Dashboard", href: "/" },
      { name: "Moves", href: "/" },
      { name: "Pick Lists", href: "/" },
      { name: "Receive Orders", href: "/" },
      { name: "Receipts", href: "/" },
      { name: "Ship Orders", href: "/" },
      { name: "Shipments", href: "/" },
      { name: "Item Lists", href: "/" },
      { name: "Cycle Counts", href: "/" },
      { name: "Blind Counts", href: "/" },
      { name: "Inbound Stock Transfer Orders", href: "/" },
      { name: "Inbound Stock Transfers", href: "/" },
      { name: "Outbound Stock Transfers", href: "/" },
    ],
  },
  {
    name: "Materials Overview",
    items: [
      {
        name: "Production",
        items: [
          { name: "Dashboard", href: "/" },
          {
            name: "Projects",
            items: [
              { name: "Cycle Counts", href: "/" },
              { name: "Blind Counts", href: "/" },
            ],
          },
          {
            name: "Jobs",
            items: [
              { name: "Job 1", href: "/" },
              { name: "Job 2", href: "/" },
            ],
          },
        ],
      },
      { name: "Item cart", href: "/" },
      { name: "Inventory", href: "/" },
    ],
  },
  { name: "Items", href: "/" },
];

const secondaryMenu = [
  {
    name: <Icon icon="user"></Icon>,
    items: [
      { name: "Profile", href: "/" },
      { name: "Preferences", href: "/" },
      { name: "Logout", href: "/" },
    ],
  },
];

export default {
  title: "Components/Page",
  parameters: {
    layout: "fullscreen",
  },
};

export const _Page = () => (
  <Page
    header={
      <Header
        breadcrumbs={
          <Breadcrumbs>
            <Link href="/">Home</Link>
            <Link href="/">Materials</Link>
          </Breadcrumbs>
        }
        title="Materials Overview"
      >
        <StatusIndicator type="informative">Beta</StatusIndicator>
      </Header>
    }
  >
    <Text fontFamily="mono" fontSize="small">
      content
    </Text>
  </Page>
);

export const withNavBar = () => (
  <ApplicationFrame
    navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}
  >
    <Page
      header={
        <Header
          breadcrumbs={
            <Breadcrumbs>
              <Link href="/">Home</Link>
              <Link href="/">Materials</Link>
            </Breadcrumbs>
          }
          title="Materials Overview"
        >
          <StatusIndicator type="informative">Beta</StatusIndicator>
        </Header>
      }
    >
      <Text fontFamily="mono" fontSize="small">
        content
      </Text>
    </Page>
  </ApplicationFrame>
);

withNavBar.story = {
  title: "With navigation bar",
};
