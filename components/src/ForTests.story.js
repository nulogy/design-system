import React from "react";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import { NavBar as NDSNavBar } from ".";

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

storiesOf("ForTests", module).add("NavBar", () => <NavBar menuData={{ primaryMenu, secondaryMenu, search }} />);
