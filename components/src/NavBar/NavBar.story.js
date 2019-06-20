import React from "react";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import { NavBar as NDSNavBar } from "../index";

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
      { name: "Integration", href: "/" },
      { name: "Site configuration", href: "/" },
      { name: "Company configuration", href: "/" }
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
          { name: "Jobs", href: "/" }
        ]
      },
      { name: "Item cart", href: "/" },
      { name: "Inventory", href: "/" }
    ]
  },
  {
    name: "Sheets",
    items: [{ name: "Item locator", href: "/" }, { name: "Ship orders", href: "/" }]
  },
  { name: "Link", href: "/" }
];

const primaryMenuCustomLinks = [
  {
    name: "MenuTrigger",
    items: [
      {
        name: "MenuTrigger",
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
    name: "NormalLink",
    href: "/"
  },
  {
    name: "CustomLink",
    render: () => <a href="/">CustomLink</a>
  }
];

const secondaryMenu = [
  {
    name: "User",
    items: [{ name: "Profile", href: "/" }, { name: "Preferences", href: "/" }, { name: "Logout", href: "/" }]
  },
  {
    name: "Settings",
    items: [{ name: "Permissions", href: "/" }, { name: "Manage account", href: "/" }]
  }
];

const search = {
  onSubmit: () => {}
};

storiesOf("NavBar", module)
  .add("NavBar", () => <NavBar menuData={{ primaryMenu, secondaryMenu, search }} />)
  .add("Without search", () => <NavBar menuData={{ primaryMenu, secondaryMenu }} />)
  .add("Without secondary menu", () => <NavBar menuData={{ primaryMenu, search }} />)
  .add("Without search and secondary menu", () => <NavBar menuData={{ primaryMenu }} />)
  .add("Without search and primary menu", () => <NavBar menuData={{ secondaryMenu }} />)
  .add("With branding only", () => <NavBar menuData={{}} />)
  .add("With custom link components", () => <NavBar menuData={{ primaryMenu: primaryMenuCustomLinks }} />)
  .add("With subtext", () => (
    <NavBar subtext="Logo Subtext" menuData={{ primaryMenu: primaryMenuCustomLinks, search }} />
  ))
  .add("With alternate themeColor", () => (
    <NavBar subtext="Logo Subtext" menuData={{ primaryMenu: primaryMenuCustomLinks }} themeColor="white" />
  ));
