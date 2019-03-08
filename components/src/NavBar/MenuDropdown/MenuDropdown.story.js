import React from "react";
import { storiesOf } from "@storybook/react";
import { Flex } from "ComponentsRoot";
import MenuDropdown from "./MenuDropdown";
import SubMenuItem from "../SubMenuItem";

storiesOf("MenuDropdown", module)
  .add("MenuDropdown", () => (
    <Flex bg="blackBlue" justifyContent="center" alignItems="center" p="x2">
      <MenuDropdown id="menuDropdown1" labelText="Menu Dropdown">
        <SubMenuItem href="/" subText="details">Submenu Item 1</SubMenuItem>
        <SubMenuItem href="/" subText="details">Submenu Item 2</SubMenuItem>
        <SubMenuItem href="/" subText="details">Submenu Item 3</SubMenuItem>
      </MenuDropdown>
    </Flex>
  ));
