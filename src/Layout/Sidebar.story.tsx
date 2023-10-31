import { text } from "@storybook/addon-knobs";
import React, { useState, useRef } from "react";
import {
  ApplicationFrame,
  BrandedNavBar,
  Icon,
  Breadcrumbs,
  Link,
  Page,
  Sidebar,
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
  title: "Components/Sidebar",
  parameters: {
    layout: "fullscreen",
    chromatic: { delay: 300 }, // time for sidebar animation
  },
};

const ExampleSidebar = ({ isOpen, onClose, ...props }) => (
  <Sidebar isOpen={isOpen} title="Filters" onClose={onClose} footer={<PrimaryButton>Apply</PrimaryButton>} {...props}>
    <Select options={[{ label: "first option", value: 1 }]} labelText="Delivery:" />
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
  </Sidebar>
);

export const _Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />} overflowX="hidden">
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
          <PrimaryButton onClick={toggleSidebar} ref={triggerRef} id="openSidebarTrigger">
            Open Sidebar
          </PrimaryButton>
          <Box height="3000px" width="50%" bg="lightBlue" mt="x3" p="x2">
            Space for more content
          </Box>
        </Box>
        <ExampleSidebar
          isOpen={isOpen}
          onClose={closeSidebar}
          triggerRef={triggerRef}
          aria-controls="openSidebarTrigger"
        />
      </Page>
    </ApplicationFrame>
  );
};

export const WithoutOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />} overflowX="hidden">
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
          <PrimaryButton onClick={toggleSidebar} ref={triggerRef} id="openSidebarTrigger">
            Open Sidebar
          </PrimaryButton>
          <Box height="3000px" width="100%" bg="lightBlue" mt="x3" p="x2">
            Space for more content
            <input />
          </Box>
        </Box>
        <ExampleSidebar
          isOpen={isOpen}
          onClose={closeSidebar}
          triggerRef={triggerRef}
          aria-controls="openSidebarTrigger"
          overlay={false}
        />
      </Page>
    </ApplicationFrame>
  );
};

export const OpenByDefault = () => {
  const [isOpen, setIsOpen] = useState(true);
  const triggerRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />} overflowX="hidden">
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
          <PrimaryButton onClick={toggleSidebar} ref={triggerRef} id="openSidebarTrigger">
            Open Sidebar
          </PrimaryButton>
          <Box height="3000px" width="100%" bg="lightBlue" mt="x3" p="x2">
            Space for more content
          </Box>
        </Box>
        <ExampleSidebar
          isOpen={isOpen}
          onClose={closeSidebar}
          triggerRef={triggerRef}
          aria-controls="openSidebarTrigger"
        />
      </Page>
    </ApplicationFrame>
  );
};

export const WithCustomOffset = () => {
  const [isOpen, setIsOpen] = useState(true);
  const triggerRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />} overflowX="hidden">
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
          <PrimaryButton onClick={toggleSidebar} ref={triggerRef} id="openSidebarTrigger">
            Open Sidebar
          </PrimaryButton>
          <Box height="3000px" width="100%" bg="lightBlue" mt="x3" p="x2">
            Space for more content
          </Box>
        </Box>
        <ExampleSidebar
          isOpen={isOpen}
          onClose={closeSidebar}
          triggerRef={triggerRef}
          aria-controls="openSidebarTrigger"
          offset={text("offset", "400px")}
          duration={text("duration", "0.5")}
        />
      </Page>
    </ApplicationFrame>
  );
};

export const DontCloseOnOutsideClick = () => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />} overflowX="hidden">
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
          <PrimaryButton onClick={toggleSidebar} ref={triggerRef} id="openSidebarTrigger">
            Open Sidebar
          </PrimaryButton>
          <Box height="3000px" width="100%" bg="lightBlue" mt="x3" p="x2">
            Space for more content
          </Box>
        </Box>
        <ExampleSidebar
          isOpen={isOpen}
          onClose={closeSidebar}
          triggerRef={triggerRef}
          aria-controls="openSideBarTrigger"
          closeOnOutsideClick={false}
        />
      </Page>
    </ApplicationFrame>
  );
};

export const WithoutCloseButton = () => {
  const [isOpen, setIsOpen] = useState(true);
  const triggerRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />} overflowX="hidden">
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
          <PrimaryButton onClick={toggleSidebar} ref={triggerRef} id="openSidebarTrigger">
            Open Sidebar
          </PrimaryButton>
          <Box height="3000px" width="50%" bg="lightBlue" mt="x3" p="x2">
            Space for more content
          </Box>
        </Box>
        <ExampleSidebar
          hideCloseButton
          isOpen={isOpen}
          onClose={closeSidebar}
          triggerRef={triggerRef}
          aria-controls="openSidebarTrigger"
        />
      </Page>
    </ApplicationFrame>
  );
};

export const WithALongTitle = () => {
  const [isOpen, setIsOpen] = useState(true);
  const triggerRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />} overflowX="hidden">
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
          <PrimaryButton onClick={toggleSidebar} ref={triggerRef} id="openSidebarTrigger">
            Open Sidebar
          </PrimaryButton>
          <Box height="3000px" width="50%" bg="lightBlue" mt="x3" p="x2">
            Space for more content
          </Box>
        </Box>
        <ExampleSidebar
          title="A very very very very very very very long title"
          isOpen={isOpen}
          onClose={closeSidebar}
          triggerRef={triggerRef}
          aria-controls="openSidebarTrigger"
        />
      </Page>
    </ApplicationFrame>
  );
};

export const WithDifferentWidths = () => {
  const [width, setWidth] = useState({ value: "xs", label: "Extra small (xs)" });

  const options = [
    { value: "xs", label: "Extra small (xs) - Default" },
    { value: "s", label: "Small (s)" },
    { value: "m", label: "Medium (m)" },
    { value: "l", label: "Large (l)" },
    { value: "xl", label: "Extra large (xl)" },
    { value: "700px", label: "Custom value (700px)" },
    { value: "75ch", label: "Custom value (75ch)" },
    { value: "100%", label: "Custom value (100%)" },
  ];

  return (
    <Sidebar hideCloseButton top={0} height="100%" width={width.value} isOpen title={`${width.label} sidebar`}>
      <Select
        value={width.value}
        options={options}
        onChange={(s: string) => {
          const [option] = options.filter(({ value }) => value === s);
          setWidth(option);
        }}
        labelText="Sidebar size"
      />
    </Sidebar>
  );
};
