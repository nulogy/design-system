import React from "react";
import { storiesOf } from "@storybook/react";
import { Header } from "ComponentsRoot";

const menuData = {
  "primary": {
    "Dashboard": {
      "Customers": {
        href: "/",
        subText: "subText",
      },
      "Invoices": {
        href: "/",
        subText: "subText",
      },
      "Projects": {
        href: "/",
        subText: "subText",
      },
      "Items": {
        href: "/",
        subText: "subText",
      },
      "Vendors": {
        href: "/",
        subText: "subText",
      },
      "Cariers": {
        href: "/",
        subText: "subText",
      },
    },
    "Inspector": {
      "Integration": {
        href: "/",
        subText: "subText",
      },
      "Site cofiguration": {
        href: "/",
        subText: "subText",
      },
      "Company configuration": {
        href: "/",
        subText: "subText",
      },
    },
    "Reports": {
      "Production": {
        href: "/",
        subText: "subText",
      },
      "Item cart": {
        href: "/",
        subText: "subText",
      },
      "Inventory": {
        href: "/",
        subText: "subText",
      },
    },
    "Sheets": {
      "Item locator": {
        href: "/",
        subText: "subText",
      },
      "Ship orders": {
        href: "/",
        subText: "subText",
      },
    },
    "Forms": {
      "Projects": {
        href: "/",
        subText: "subText",
      },
      "Jobs": {
        href: "/",
        subText: "subText",
      },
    },
  },
  "secondary": {
    "User": {
      "Profile": {
        href: "/",
      },
      "Preferences": {
        href: "/",
      },
      "Logout": {
        href: "/",
      },
    },
    "Settings": {
      "Permissions": {
        href: "/",
      },
      "Manage Account": {
        href: "/",
      },
    },
  },
};

storiesOf("Header", module)
  .add("Header", () => (
    <Header menuData={ menuData } />
  ));
