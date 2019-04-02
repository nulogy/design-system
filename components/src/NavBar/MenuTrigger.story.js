import React from "react";
import { storiesOf } from "@storybook/react";
import { Flex } from "ComponentsRoot";
import MenuTrigger from "./MenuTrigger";

const menuData = [
  { name: "Submenu Item 1", description: "details", href: "/" },
  { name: "Submenu Item 2", description: "details", href: "/" },
  { name: "Submenu Item 3", description: "details", href: "/" },
];

const menuDataDeeper = [
  { name: "Submenu Link", description: "details", href: "/" },
  {
    name: "Submenu Trigger",
    description: "details",
    items: [
      { name: "Submenu Link", description: "details", href: "/" },
      {
        name: "Submenu Trigger",
        description: "details",
        items: [
          { name: "Submenu Link", description: "details", href: "/" },
        ],
      },
    ],
  },
  {
    name: "Dropdown with a long name1",
    description: "details",
    items: [
      { name: "Submenu Link", description: "details", href: "/" },
      {
        name: "Submenu Trigger",
        description: "details",
        items: [
          { name: "Submenu Link", description: "details", href: "/" },
        ],
      },
    ],
  },
  {
    name: "Submenu Dropdown",
    description: "details details details details details details details ",
    items: [
      { name: "Submenu Link", description: "details", href: "/" },
      {
        name: "Submenu Trigger",
        description: "details",
        items: [
          { name: "Submenu Link", description: "details", href: "/" },
        ],
      },
    ],
  },
];

const menuDataDeeperNoDescription = [
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

storiesOf("MenuTrigger", module)
  .add("MenuTrigger", () => (
    <Flex bg="blackBlue" justifyContent="center" alignItems="center" p="x2">
      <MenuTrigger menuData={ menuData } id="menuTrigger1" labelText="Menu Trigger" />
    </Flex>
  ))
  .add("MenuTrigger with deeper submenus", () => (
    <Flex bg="blackBlue" justifyContent="center" alignItems="center" p="x2">
      <MenuTrigger menuData={ menuDataDeeper } id="menuTrigger1" labelText="Menu Trigger" />
    </Flex>
  ))
  .add("MenuTrigger with deeper submenus and no description", () => (
    <Flex bg="blackBlue" justifyContent="center" alignItems="center" p="x2">
      <MenuTrigger menuData={ menuDataDeeperNoDescription } id="menuTrigger1" labelText="Menu Trigger" />
    </Flex>
  ));
