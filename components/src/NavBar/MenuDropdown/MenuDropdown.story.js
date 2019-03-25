import React from "react";
import { storiesOf } from "@storybook/react";
import { Flex } from "ComponentsRoot";
import MenuDropdown from "./MenuDropdown";
import SubMenuItem from "../SubMenuItem";

storiesOf("MenuDropdown", module)
  .add("MenuDropdown", () => (
    <Flex bg="blackBlue" justifyContent="center" alignItems="center" p="x2">
      <MenuDropdown id="menuDropdown1" labelText="Menu Dropdown">
        <SubMenuItem href="/" text="Submeu Item 1" subText="details" />
        <SubMenuItem href="/" text="Submeu Item 2" subText="details" />
        <SubMenuItem href="/" text="Submeu Item 3" subText="details" />
      </MenuDropdown>
    </Flex>
  ));
