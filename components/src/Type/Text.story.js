import React from "react";
import { storiesOf } from "@storybook/react";
import { Text, Box } from "ComponentsRoot";

storiesOf("Text", module)
  .add("Text", () => (
    <Text>Default text</Text>
  ))
  .add("With a color", () => (
    <Text color="blue">Small text</Text>
  ))
  .add("With a size", () => (
    <Text fontSize="small">Small text</Text>
  ))
  .add("With a custom margin", () => (
    <React.Fragment>
      <Text mb="x3">Default text</Text>
      <Text>Default text</Text>
    </React.Fragment>
  ))
  .add("Set to inline", () => (
    <React.Fragment>
      <Text inline mr="x1">Default text</Text>
      <Text inline>Default text</Text>
    </React.Fragment>
  ))
  .add("Set to disabled", () => (
    <React.Fragment>
      <Box bg="white" p="x2" m="x2">
        <Text disabled>Default text</Text>
      </Box>
      <Box bg="darkBlue" p="x2" m="x2">
        <Text color="white" disabled>Default text</Text>
      </Box>
      <Box bg="black" p="x2" m="x2">
        <Text color="white" disabled>Default text</Text>
      </Box>
    </React.Fragment>
  ));
