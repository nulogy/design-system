import React from "react";
import { storiesOf } from "@storybook/react";
import { Flex } from "ComponentsRoot";
import MenuDropdown from "./MenuDropdown";
import SubMenuItem from "../SubMenuItem";

storiesOf("MenuDropdown", module)
  .add("MenuDropdown", () => (
    <Flex bg="blackBlue" justifyContent="center" alignItems="center" p="x2">
      <MenuDropdown id="menuDropdown1" labelText="Menu Dropdown">
        <SubMenuItem href="/" text="Submenu Item 1" subText="details" />
        <SubMenuItem href="/" text="Submenu Item 2" subText="details" />
        <SubMenuItem href="/" text="Submenu Item 3" subText="details" />
      </MenuDropdown>
    </Flex>
  ));
