import React from "react";
import { storiesOf } from "@storybook/react";
import { NavBar } from "ComponentsRoot";

const menuData = {
  "primaryMenu": [
    {
      text: "Dashboard",
      subMenuItems: [
        {
          text: "Customers",
          subText: "subText",
          href: "/",
        },
        {
          text: "Invoices",
          subText: "subText",
          href: "/",
        },
        {
          text: "Projects",
          subText: "subText",
          href: "/",
        },
        {
          text: "Items",
          subText: "subText",
          href: "/",
        },
        {
          text: "Vendors",
          subText: "subText",
          href: "/",
        },
        {
          text: "Carriers",
          subText: "subText",
          href: "/",
        },
      ],
    },
    {
      text: "Inspector",
      subMenuItems: [
        {
          text: "Integration",
          subText: "subText",
          href: "/",
        },
        {
          text: "Site configuration",
          subText: "subText",
          href: "/",
        },
        {
          text: "Company configuration",
          subText: "subText",
          href: "/",
        },
      ],
    },
    {
      text: "Reports",
      subMenuItems: [
        {
          text: "Production",
          subText: "subText",
          href: "/",
        },
        {
          text: "Item cart",
          subText: "subText",
          href: "/",
        },
        {
          text: "Inventory",
          subText: "subText",
          href: "/",
        },
      ],
    },
    {
      text: "Sheets",
      subMenuItems: [
        {
          text: "Item locator",
          subText: "subText",
          href: "/",
        },
        {
          text: "Ship orders",
          subText: "subText",
          href: "/",
        },
      ],
    },
    {
      text: "Link",
      href: "/",
    },
  ],
  "secondaryMenu": [
    {
      text: "User",
      subMenuItems: [
        {
          text: "Profile",
          subText: "subText",
          href: "/",
        },
        {
          text: "Preferences",
          subText: "subText",
          href: "/",
        },
        {
          text: "Logout",
          subText: "subText",
          href: "/",
        },
      ],
    },
    {
      text: "Settings",
      subMenuItems: [
        {
          text: "Permissions",
          subText: "subText",
          href: "/",
        },
        {
          text: "Manage account",
          subText: "subText",
          href: "/",
        },
      ],
    },
  ],
};

storiesOf("NavBar", module)
  .add("NavBar", () => (
    <NavBar menuData={ menuData } search />
  ))
  .add("Without search", () => (
    <NavBar menuData={ menuData } />
  ))
  .add("Without secondary menu", () => (
    <NavBar search menuData={ menuData } />
  ))
  .add("Without search and secondary menu", () => (
    <NavBar menuData={ menuData } />
  ))
  .add("Withbrending only", () => (
    <NavBar menuData={ menuData } />
  ));;
