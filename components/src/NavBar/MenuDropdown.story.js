import React from "react";
import { storiesOf } from "@storybook/react";
import { Flex } from "ComponentsRoot";
import MenuDropdown from "./MenuDropdown";

const menuData = [
  { text: "Submenu Item 1", subText: "details", href: "/" },
  { text: "Submenu Item 2", subText: "details", href: "/" },
  { text: "Submenu Item 3", subText: "details", href: "/" },
];

const menuDataDeeper = [
  {text: "Submenu Link", subText: "details", href: "/"},
  {
    text: "Submenu Dropdown", 
    subText: "details", 
    subMenuItems: [
      {text: "Submenu Link", subText: "details", href: "/"},
      {
        text: "Submenu Dropdown", 
        subText: "details", 
        subMenuItems: [
          {text: "Submenu Link", subText: "details", href: "/"},
        ]
      },
    ],
  },
];

storiesOf("MenuDropdown", module)
  .add("MenuDropdown", () => (
    <Flex bg="blackBlue" justifyContent="center" alignItems="center" p="x2">
      <MenuDropdown menuData={ menuData } id="menuDropdown1" labelText="Menu Dropdown"/>
    </Flex>
  ))
  .add("MenuDropdown with additional levels of data", () => (
    <Flex bg="blackBlue" justifyContent="center" alignItems="center" p="x2">
      <MenuDropdown menuData={ menuDataDeeper } id="menuDropdown1" labelText="Menu Dropdown"/>
    </Flex>
  ));
