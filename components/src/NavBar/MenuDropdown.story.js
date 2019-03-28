import React from "react";
import { storiesOf } from "@storybook/react";
import { Flex } from "ComponentsRoot";
import MenuDropdown from "./MenuDropdown";
import SubMenuLink from "./SubMenuLink";

storiesOf("MenuDropdown", module)
  .add("MenuDropdown", () => (
    <Flex bg="blackBlue" justifyContent="center" alignItems="center" p="x2">
      <MenuDropdown id="menuDropdown1" labelText="Menu Dropdown">
        <SubMenuItem href="/" name="Submenu Item 1" description="details" />
        <SubMenuItem href="/" name="Submenu Item 2" description="details" />
        <SubMenuItem href="/" name="Submenu Item 3" description="details" />
      </MenuDropdown>
    </Flex>
  ));
