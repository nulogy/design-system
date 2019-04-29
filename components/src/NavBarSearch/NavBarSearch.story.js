import React from "react";
import { storiesOf } from "@storybook/react";
import { Box } from "../Box";
import NavBarSearch from "./NavBarSearch";

storiesOf("NavBarSearch", module)
  .add("NavBarSearch", () => (
    <Box p="x3" bg="blackBlue">
      <NavBarSearch />
    </Box>
  ))
  .add("With custom name", () => (
    <Box p="x3" bg="blackBlue">
      <NavBarSearch name="global-search-2" />
    </Box>
  ));
