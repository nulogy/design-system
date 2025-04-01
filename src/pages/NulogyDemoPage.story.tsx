import React, { useState } from "react";
import { BrandedNavBar, Header, Table, Sidebar, Box, Flex, Link, Icon, Text, NDSProvider } from "..";
import { legacy as theme } from "../theme/theme";

export default {
  title: "Examples/NulogyDemoPage",
  parameters: {
    layout: "fullscreen",
  },
};

// Data based on src/BrandedNavBar/NavBar.story.tsx examples
const primaryMenuData = [
  {
    name: "Dashboard",
    items: [{ name: "Dashboard", href: "/" }],
  },
  {
    name: "Items",
    items: [
      { name: "Item 1", href: "/" },
      { name: "Item 2", href: "/" },
      { name: "Item 3", href: "/" },
    ],
  },
  {
    name: "Settings",
    items: [{ name: "Permissions", href: "/" }],
  },
];

const secondaryMenuData = [
  {
    name: "User",
    items: [
      { name: "Profile", href: "/" },
      { name: "Preferences", href: "/" },
      { name: "Logout", href: "/" },
    ],
  },
  {
    name: <Icon icon="help" />,
    ariaLabel: "Help",
    key: "Help",
    items: [{ name: "Help", href: "/" }],
  },
];

// Data based on src/Table/Table.story.tsx example
const tableColumns = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3" },
  { label: "Column 4", dataKey: "c4" },
  { label: "Column 5", dataKey: "c5" },
];

const tableData = [
  { c1: "row 1 cell 1", c2: "r1c2", c3: "r1c3", c4: "r1c4", c5: "r1c5", id: "r1" },
  { c1: "row 2 cell 1", c2: "r2c2", c3: "r2c3", c4: "r2c4", c5: "r2c5", id: "r2" },
  { c1: "row 3 cell 1", c2: "r3c2", c3: "r3c3", c4: "r3c4", c5: "r3c5", id: "r3" },
];

// Data based on src/Layout/Sidebar.story.tsx example
const sidebarLinks = [
  { name: "Home", href: "/" },
  { name: "Page 1", href: "/page1" },
  { name: "Page 2", href: "/page2" },
];

export const NulogyDemoPage = () => {
  // State for Sidebar based on src/Layout/Sidebar.story.tsx
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <NDSProvider theme={theme}>
      <Box>
        {/* BrandedNavBar */}
        <BrandedNavBar
          menuData={{
            primaryMenu: primaryMenuData,
            secondaryMenu: secondaryMenuData,
          }}
        />

        {/* Header */}
        <Header title="Page Title" />

        {/* Main Content Area Layout */}
        <Flex alignItems="stretch">
          {/* Sidebar */}
          <Sidebar
            isOpen={isSidebarOpen}
            title="Navigation"
            onClose={closeSidebar}
            footer={
              <Box p="x2">
                <Text fontSize="small" color="darkGrey">
                  Sidebar Footer
                </Text>
              </Box>
            }
          >
            <Box py="x2" px="x3">
              {sidebarLinks.map((link) => (
                <Link key={link.name} href={link.href} display="block" py="x1">
                  {link.name}
                </Link>
              ))}
            </Box>
          </Sidebar>

          {/* Table (within main content area) */}
          <Box flexGrow={1} p="x3">
            <Table columns={tableColumns} rows={tableData} keyField="id" />
          </Box>
        </Flex>
      </Box>
    </NDSProvider>
  );
};
