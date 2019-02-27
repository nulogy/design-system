import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, HeaderSearch } from "ComponentsRoot";

storiesOf("HeaderSearch", module)
  .add("HeaderSearch", () => (
    <Box p="x3" bg="blackBlue">
      <HeaderSearch />
    </Box>
  ))
  .add("With custom id", () => (
    <Box p="x3" bg="blackBlue">
      <HeaderSearch name="global-search-2" />
    </Box>
  ));
