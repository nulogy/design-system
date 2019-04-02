import React from "react";
import { storiesOf } from "@storybook/react";
import { Flex } from "ComponentsRoot";
import MenuTrigger from "./MenuTrigger";

const menuData = [
  { name: "Submenu Link 1", description: "description", href: "/" },
  { name: "Submenu Link 2", description: "description", href: "/" },
  { name: "Submenu Link 3", description: "description", href: "/" },
];

const menuDataLayered = [
  { name: "Submenu Link", href: "/" },
  {
    name: "Submenu Trigger",
    items: [
      { name: "Submenu Link", href: "/" },
      {
        name: "Submenu Trigger",
        items: [
          { name: "Submenu Link", href: "/" },
        ],
      },
    ],
  },
];

const menuDataEdgeCases = [
  { name: "Submenu Link", description: "description", href: "/" },
  {
    name: "Submenu Trigger",
    description: "description",
    items: [
      { name: "Submenu Link", description: "description", href: "/" },
      {
        name: "Submenu Trigger",
        description: "description",
        items: [
          { name: "Submenu Link", description: "description", href: "/" },
        ],
      },
    ],
  },
  {
    name: "Trigger with a very long name",
    description: "description",
    items: [
      { name: "Submenu Link", description: "description", href: "/" },
      {
        name: "Submenu Trigger",
        description: "description",
        items: [
          { name: "Submenu Link", description: "description", href: "/" },
        ],
      },
    ],
  },
  {
    name: "Submenu Trigger",
    description: "description description description description",
    items: [
      { name: "Submenu Link", description: "description", href: "/" },
      {
        name: "Submenu Trigger",
        description: "description",
        items: [
          { name: "Submenu Link", description: "description", href: "/" },
        ],
      },
    ],
  },
];

storiesOf("MenuTrigger", module)
  .add("MenuTrigger", () => (
    <Flex bg="blackBlue" justifyContent="center" alignItems="center" p="x2">
      <MenuTrigger menuData={ menuData } id="menuTrigger1" name="Menu Trigger" />
    </Flex>
  ))
  .add("MenuTrigger with more layers", () => (
    <Flex bg="blackBlue" justifyContent="center" alignItems="center" p="x2">
      <MenuTrigger menuData={ menuDataLayered } id="menuTrigger1" name="Menu Trigger" />
    </Flex>
  ))
  .add("MenuTrigger with text edge cases", () => (
    <Flex bg="blackBlue" justifyContent="center" alignItems="center" p="x2">
      <MenuTrigger menuData={ menuDataEdgeCases } id="menuTrigger1" name="Menu Trigger" />
    </Flex>
  ));
