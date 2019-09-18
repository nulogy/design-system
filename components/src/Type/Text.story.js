import React from "react";
import { storiesOf } from "@storybook/react";
import { Text } from ".";
import { Box } from "../Box";

storiesOf("Text", module)
  .add("Text", () => <Text>Default text</Text>)
  .add("With a color", () => <Text color="blue">Blue text</Text>)
  .add("With a size", () => (
    <>
      <Box bg="whiteGrey" p="x2" mb="x3">
        <Text>Default (16px/24px)</Text>
      </Box>
      <Box bg="whiteGrey" p="x2" mb="x3">
        <Text fontSize="small" lineHeight="smallTextBase">
          Small (14px/24px)
        </Text>
        <Text fontSize="small" lineHeight="smallTextCompressed">
          Small Compressed (14px/16px)
        </Text>
      </Box>
      <Box bg="whiteGrey" p="x2" mb="x3">
        <Text fontSize="smaller" lineHeight="smallerText">
          Smaller (12px/16px)
        </Text>
      </Box>
    </>
  ))
  .add("With a custom margin", () => (
    <>
      <Text mb="x3">Text 24px bottom margin.</Text>
      <Text>Text with default (0px) bottom margin.</Text>
    </>
  ))
  .add("Set to inline", () => (
    <>
      <Text inline mr="x1">
        Inline text
      </Text>
      <Text inline>Inline text</Text>
    </>
  ))
  .add("Set to disabled", () => (
    <>
      <Box bg="white" p="x2" m="x2">
        <Text disabled>Disabled text</Text>
      </Box>
      <Box bg="darkBlue" p="x2" m="x2">
        <Text color="white" disabled>
          Disabled text
        </Text>
      </Box>
      <Box bg="black" p="x2" m="x2">
        <Text color="white" disabled>
          Disabled text
        </Text>
      </Box>
    </>
  ));
