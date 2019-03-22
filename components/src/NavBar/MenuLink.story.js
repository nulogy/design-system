import React from "react";
import { storiesOf } from "@storybook/react";
import { Flex } from "ComponentsRoot";
import MenuLink from "./MenuLink";

storiesOf("MenuLink", module)
  .add("MenuLink", () => (
    <Flex bg="blackBlue" justifyContent="center" alignItems="center" p="x2">
      <MenuLink href="/">Menu Item 1</MenuLink>
    </Flex>
  ));
