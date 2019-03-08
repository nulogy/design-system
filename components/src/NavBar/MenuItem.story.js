import React from "react";
import { storiesOf } from "@storybook/react";
import { Flex } from "ComponentsRoot";
import MenuItem from "./MenuItem";

storiesOf("MenuItem", module)
  .add("MenuItem", () => (
    <Flex bg="blackBlue" justifyContent="center" alignItems="center" p="x2">
      <MenuItem href="/">Menu Item 1</MenuItem>
    </Flex>
  ));
