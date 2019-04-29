import React from "react";
import { storiesOf } from "@storybook/react";
import Flex from "../Flex/Flex";
import MenuTrigger from "./MenuTrigger";

const menuData = [
  { name: "Submenu Link 1", href: "/" },
  { name: "Submenu Link 2", href: "/" },
  { name: "Submenu Link 3", href: "/" },
];

const menuDataLayered = [
  { name: "Submenu", href: "/" },
  {
    name: "Submenu",
    items: [
      { name: "Submenu", href: "/" },
      {
        name: "Submenu",
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
      <MenuTrigger menuData={ menuData } id="menuTrigger1" name="Menu Trigger" />
    </Flex>
  ))
  .add("MenuTrigger with more layers", () => (
    <Flex bg="blackBlue" justifyContent="center" alignItems="center" p="x2">
      <MenuTrigger menuData={ menuDataLayered } id="menuTrigger1" name="Menu Trigger" />
    </Flex>
  ));
