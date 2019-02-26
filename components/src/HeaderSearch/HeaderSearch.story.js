import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, HeaderSearch } from "ComponentsRoot";

storiesOf("HeaderSearch", module)
  .add("HeaderSearch", () => (
    <Box p="x2" bg="blackBlue">
      <HeaderSearch />
    </Box>
  ));
