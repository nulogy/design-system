import React, { useState, useRef } from "react";
import {
  ApplicationFrame,
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

export const _ApplicationFrame = () => (
  <ApplicationFrame
    navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}
  ></ApplicationFrame>
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
    headerContent={<PrimaryButton type="informative">Beta</PrimaryButton>}
  >
    <>
      <Text fontFamily="mono" fontSize="small">
        // content
      </Text>
    </>
  </Page>
);

export const _Layout = () => (
  <ApplicationFrame
    navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}
  >
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
  </ApplicationFrame>
);

export const NoPageTitle = () => (
  <ApplicationFrame
    navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}
  >
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
  </ApplicationFrame>
);

export const NoBreadcrumbs = () => (
  <ApplicationFrame
    navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}
  >
    <Page title="Materials Overview">
      <>
        <Heading2>Overview</Heading2>
        <Text>I am main content.</Text>
      </>
    </Page>
  </ApplicationFrame>
);

const ExampleSideBar = ({ isOpen, onClose, ...props }) => (
  <SideBar
    isOpen={isOpen}
    title="Filters"
    onClose={onClose}
    footer={<PrimaryButton>Apply</PrimaryButton>}
    {...props}
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
  const triggerRef = useRef(null);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };
  const closeSideBar = () => {
    setIsOpen(false);
  };

  return (
    <ApplicationFrame
      navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}
      overflowX="hidden"
    >
      <Page
        breadcrumbs={
          <Breadcrumbs>
            <Link href="/">Home</Link>
            <Link href="/">Materials</Link>
          </Breadcrumbs>
        }
        title="Materials Overview"
      >
        <Box minWidth="300px">
          <PrimaryButton onClick={toggleSideBar} ref={triggerRef} id="openSideBarTrigger">
            Toggle SideBar
          </PrimaryButton>
          <Box height="3000px" width="100%" bg="lightBlue" mt="x3" p="x2">Space for more content</Box>
        </Box>
        <ExampleSideBar
          isOpen={isOpen}
          onClose={closeSideBar}
          triggerRef={triggerRef}
          aria-controls="openSideBarTrigger"
        />
      </Page>
    </ApplicationFrame>
  );
};

export const WithSideBarOpenByDefault = () => {
  const [isOpen, setIsOpen] = useState(true);
  const triggerRef = useRef(null);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };
  const closeSideBar = () => {
    setIsOpen(false);
  };

  return (
    <ApplicationFrame
      navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}
      overflowX="hidden"
    >
      <Page
        breadcrumbs={
          <Breadcrumbs>
            <Link href="/">Home</Link>
            <Link href="/">Materials</Link>
          </Breadcrumbs>
        }
        title="Materials Overview"
      >
        <Box minWidth="300px">
          <PrimaryButton onClick={toggleSideBar} ref={triggerRef} id="openSideBarTrigger">
            Toggle SideBar
          </PrimaryButton>
          <Box height="3000px" width="100%" bg="lightBlue" mt="x3" p="x2">Space for more content</Box>
        </Box>
        <ExampleSideBar
          isOpen={isOpen}
          onClose={closeSideBar}
          triggerRef={triggerRef}
          aria-controls="openSideBarTrigger"
        />
      </Page>
    </ApplicationFrame>
  );
};
