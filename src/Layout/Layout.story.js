import React, { useState } from "react";
import {
  Frame,
  BrandedNavBar,
  Icon,
  Breadcrumbs,
  Link,
  Heading2,
  Text,
  Page,
  SideBar,
  Select,
  PrimaryButton,
  Box,
} from "..";

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
  title: "Components/Layout",
};

export const _Frame = () => (
  <Frame
    navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}
  ></Frame>
);

export const _Page = () => (
  <Page
    breadcrumbs={
      <Breadcrumbs>
        <Link href="/">Home</Link>
        <Link href="/">Materials</Link>
      </Breadcrumbs>
    }
    title="Materials Overview"
  >
    <>
      <Text fontFamily="mono" fontSize="small">
        // content
      </Text>
    </>
  </Page>
);

export const _Layout = () => (
  <Frame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}>
    <Page
      breadcrumbs={
        <Breadcrumbs>
          <Link href="/">Home</Link>
          <Link href="/">Materials</Link>
        </Breadcrumbs>
      }
      title="Materials Overview"
    >
      <>
        <Text fontFamily="mono" fontSize="small">
          // content
        </Text>
      </>
    </Page>
  </Frame>
);

export const NoPageTitle = () => (
  <Frame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}>
    <Page
      breadcrumbs={
        <Breadcrumbs>
          <Link href="/">Home</Link>
          <Link href="/">Materials</Link>
        </Breadcrumbs>
      }
    >
      <Text fontFamily="mono" fontSize="small">
        // content
      </Text>
    </Page>
  </Frame>
);

export const NoBreadcrumbs = () => (
  <Frame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}>
    <Page title="Materials Overview">
      <>
        <Heading2>Overview</Heading2>
        <Text>I am main content.</Text>
      </>
    </Page>
  </Frame>
);

const ExampleSideBar = ({ isOpen, onClose }) => (
  <SideBar
    isOpen={isOpen}
    title="Filters"
    onClose={onClose}
    footer={<PrimaryButton>Apply</PrimaryButton>}
  >
    <Select options={[]} labelText="Delivery:" />
    <Select options={[]} labelText="Delivery:" />
    <Select options={[]} labelText="Delivery:" />
    <Select options={[]} labelText="Delivery:" />
    <Select options={[]} labelText="Delivery:" />
    <Select options={[]} labelText="Delivery:" />
    <Select options={[]} labelText="Delivery:" />
    <Select options={[]} labelText="Delivery:" />
    <Select options={[]} labelText="Delivery:" />
    <Select options={[]} labelText="Delivery:" />
    <Select options={[]} labelText="Delivery:" />
    <Select options={[]} labelText="Last Delivery:" />
  </SideBar>
);

export const WithSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };
  const closeSideBar = () => {
    setIsOpen(false);
  };

  return (
    <Frame
      navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}
      overflowX="hidden"
      // transform setting is for storybook display only
      transform="translateZ(0)"
    >
      <Page
        breadcrumbs={
          <Breadcrumbs>
            <Link href="/">Home</Link>
            <Link href="/">Materials</Link>
          </Breadcrumbs>
        }
        title="Materials Overview"
        sideBar={<ExampleSideBar isOpen={isOpen} onClose={closeSideBar} />}
      >
        <>
          <Box minWidth="300px">
            <PrimaryButton onClick={toggleSideBar}>
              Toggle SideBar
            </PrimaryButton>
          </Box>
        </>
      </Page>
    </Frame>
  );
};
