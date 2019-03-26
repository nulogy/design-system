import React from "react";
import { storiesOf } from "@storybook/react";
import { NavBar } from "ComponentsRoot";

const primaryMenu = [
  {
    text: "Dashboard",
    subMenuItems: [
      { text: "Customers", subText: "subText", href: "/", },
      { text: "Invoices", subText: "subText", href: "/", },
      { text: "Projects", subText: "subText", href: "/", },
      { text: "Items", subText: "subText", href: "/", },
      { text: "Vendors", subText: "subText", href: "/", },
      { text: "Carriers", subText: "subText", href: "/", },
    ],
  },
  {
    text: "Inspector",
    subMenuItems: [
      { text: "Integration", subText: "subText", href: "/", },
      { text: "Site configuration", subText: "subText", href: "/", },
      { text: "Company configuration", subText: "subText", href: "/", },
    ],
  },
  {
    text: "Reports",
    subMenuItems: [
      { text: "Production", subText: "subText", href: "/", },
      { text: "Item cart", subText: "subText", href: "/", },
      { text: "Inventory", subText: "subText", href: "/", },
    ],
  },
  {
    text: "Sheets",
    subMenuItems: [
      { text: "Item locator", subText: "subText", href: "/", },
      { text: "Ship orders", subText: "subText", href: "/", },
    ],
  },
  { text: "Link", href: "/", },
];

const secondaryMenu = [
  {
    text: "User",
    subMenuItems: [
      { text: "Profile", subText: "subText", href: "/", },
      { text: "Preferences", subText: "subText", href: "/", },
      { text: "Logout", subText: "subText", href: "/", },
    ],
  },
  {
    text: "Settings",
    subMenuItems: [
      { text: "Permissions", subText: "subText", href: "/", },
      { text: "Manage account", subText: "subText", href: "/", },
    ],
  },
];

const search = {
  onSubmit: () => {},
};

storiesOf("NavBar", module)
  .add("NavBar", () => (
    <NavBar menuData={ { primaryMenu, secondaryMenu, search } } />
  ))
  .add("Without search", () => (
    <NavBar menuData={ { primaryMenu, secondaryMenu } } />
  ))
  .add("Without secondary menu", () => (
    <NavBar menuData={ { primaryMenu, search } } />
  ))
  .add("Without search and secondary menu", () => (
    <NavBar menuData={ { primaryMenu } } />
  ))
  .add("Without search and primary menu", () => (
    <NavBar menuData={ { secondaryMenu } } />
  ))
  .add("With branding only", () => (
    <NavBar menuData={ {} } />
  ));;
