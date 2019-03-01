import React from "react";
import { storiesOf } from "@storybook/react";
import { Header } from "ComponentsRoot";

const menuData = {
  "primary": {
    "Menu Item 1": {
      "SubMenu Item 1.1": {
        href: "/",
        subText: "subText",
      },
      "SubMenu Item 1.2": {
        href: "/",
        subText: "subText",
      },
      "SubMenu Item 1.3": {
        href: "/",
        subText: "subText",
      },
    },
    "Menu Item 2": {
      "SubMenu Item 2.1": {
        href: "/",
        subText: "subText",
      },
      "SubMenu Item 2.2": {
        href: "/",
        subText: "subText",
      },
      "SubMenu Item 2.3": {
        href: "/",
        subText: "subText",
      },
    },
    "Menu Item 3": {
      "SubMenu Item 3.1": {
        href: "/",
        subText: "subText",
      },
      "SubMenu Item 3.2": {
        href: "/",
        subText: "subText",
      },
      "SubMenu Item 3.3": {
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
