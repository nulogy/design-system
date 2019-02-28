import React from "react";
import { storiesOf } from "@storybook/react";
import { Flex, Button } from "ComponentsRoot";
import MenuItem from "./MenuItem";

storiesOf("MenuItem", module)
  .add("MenuItem", () => (
    <Flex bg="blackBlue" justifyContent="center" alignItems="center" height="50px">
      <MenuItem
        id="menuItem1"
      >
        Menu Item
      </MenuItem>
    </Flex>
  ));
