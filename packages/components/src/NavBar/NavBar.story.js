import React from "react";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import { NavBar as NDSNavBar } from "../index";
import { Icon } from "../Icon";

const ResetStorybookView = styled.div({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh"
});

const NavBar = props => (
  <ResetStorybookView>
    <NDSNavBar {...props} />
  </ResetStorybookView>
);

const primaryMenu = [
  {
    name: "Dashboard",
    items: [
      { name: "Customers", href: "/" },
      { name: "Invoices", href: "/" },
      { name: "Projects", href: "/" },
      { name: "Items", href: "/" },
      { name: "Vendors", href: "/" },
      { name: "Carriers", href: "/" }
    ]
  },

  {
    name: "Inspector",
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
      { name: "Outbound Stock Transfers", href: "/" }
    ]
  },
  {
    name: "Operations",
    items: [
      {
        name: "Production",
        items: [
          { name: "Dashboard", href: "/" },
          {
            name: "Projects",
            items: [{ name: "Cycle Counts", href: "/" }, { name: "Blind Counts", href: "/" }]
          },
          { name: "Jobs", items: [{ name: "Job 1", href: "/" }, { name: "Job 2", href: "/" }] }
        ]
      },
      { name: "Item cart", href: "/" },
      { name: "Inventory", href: "/" }
    ]
  },
  { name: "Link", href: "/" }
];

const primaryMenuCustomLinks = [
  {
    name: "Dashboard",
    items: [
      {
        name: "Invoices",
        items: [
          {
            name: "NormalLink",
            href: "/"
          },
          {
            name: "CustomLink",
            render: () => <a href="/">CustomLink</a>
          }
        ]
      },
      {
        name: "Projects",
        href: "/"
      },
      {
        name: "Customers",
        render: () => <a href="/">Customers CustomLink</a>
      }
    ]
  },
  {
    name: "Inspector",
    href: "/"
  },
  {
    name: "Custom Link",
    render: () => <a href="/">Custom Link</a>
  }
];

const primaryMenuText = [
  {
    name: "Dashboard",
    items: [
      {
        name: "MenuTrigger",
        items: [
          {
            name: "NormalLink",
            href: "/"
          },
          {
            name: "Just Text"
          }
        ]
      },
      {
        name: "NormalLink",
        href: "/"
      },
      {
        name: "Just Text"
      }
    ]
  },
  {
    name: "NormalLink",
    href: "/"
  },
  {
    name: "Just Text"
  }
];

const secondaryMenu = [
  {
    name: "User@Nulogy.com",
    items: [{ name: "Profile", href: "/" }, { name: "Preferences", href: "/" }, { name: "Logout", href: "/" }]
  },
  {
    name: "Settings",
    items: [{ name: "Permissions", href: "/" }, { name: "Manage account", href: "/" }]
  }
];

const secondaryMenuCustomLinks = [
  {
    name: "User@Nulogy.com",
    items: [{ name: "Profile", href: "/" }, { name: "Preferences", href: "/" }, { name: "Logout", href: "/" }]
  },
  {
    name: <Icon icon="settings" />,
    ariaLabel: "Settings",
    items: [{ name: "Permissions", href: "/" }, { name: "Manage account", href: "/" }]
  }
];

const search = {
  onSubmit: () => {}
};

storiesOf("Components/NavBar", module)
  .add("NavBar", () => <NavBar menuData={{ primaryMenu, secondaryMenu, search }} />)
  .add("Without search", () => <NavBar menuData={{ primaryMenu, secondaryMenu }} />)
  .add("Without secondary menu", () => <NavBar menuData={{ primaryMenu, search }} />)
  .add("Without search and secondary menu", () => <NavBar menuData={{ primaryMenu }} />)
  .add("Without search and primary menu", () => <NavBar menuData={{ secondaryMenu }} />)
  .add("With branding only", () => <NavBar menuData={{}} />)
  .add("With custom link components", () => (
    <NavBar menuData={{ primaryMenu: primaryMenuCustomLinks, secondaryMenu: secondaryMenuCustomLinks, search }} />
  ))
  .add("With text in the menu", () => <NavBar menuData={{ primaryMenu: primaryMenuText }} />)
  .add("With subtext", () => (
    <NavBar subtext="Logo Subtext" menuData={{ primaryMenu: primaryMenuCustomLinks, search }} />
  ))
  .add("With alternative branding link", () => (
    <NavBar brandingLinkHref="/portal" menuData={{ primaryMenu: primaryMenuCustomLinks }} />
  ))
  .add("With alternate themeColor", () => (
    <NavBar subtext="Logo Subtext" menuData={{ primaryMenu: primaryMenuCustomLinks }} themeColor="white" />
  ));
