import React from "react";
import { storiesOf } from "@storybook/react";
import { Flex } from "ComponentsRoot";
import MenuTrigger from "./MenuTrigger";

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

const menuDataDeeperNoSubText = [
  {text: "Submenu Link", href: "/"},
  {
    text: "Submenu Dropdown", 
    subMenuItems: [
      {text: "Submenu Link", href: "/"},
      {
        text: "Submenu Dropdown", 
        subMenuItems: [
          {text: "Submenu Link", href: "/"},
        ]
      },
    ],
  },
];

storiesOf("MenuTrigger", module)
  .add("MenuTrigger", () => (
    <Flex bg="blackBlue" justifyContent="center" alignItems="center" p="x2">
      <MenuTrigger menuData={ menuData } id="menuDropdown1" labelText="Menu Dropdown"/>
    </Flex>
  ))
  .add("MenuTrigger with deeper submenus", () => (
    <Flex bg="blackBlue" justifyContent="center" alignItems="center" p="x2">
      <MenuTrigger menuData={ menuDataDeeper } id="menuDropdown1" labelText="Menu Dropdown"/>
    </Flex>
  ))  
  .add("MenuTrigger with deeper submenus and no subText", () => (
    <Flex bg="blackBlue" justifyContent="center" alignItems="center" p="x2">
      <MenuTrigger menuData={ menuDataDeeperNoSubText } id="menuDropdown1" labelText="Menu Dropdown"/>
    </Flex>
  ));
