import React from "react";
import { Text } from ".";
import { Box } from "../Box";

export default {
  title: "Components/Text"
};

export const _Text = () => <Text>Default text</Text>;
export const WithAColor = () => <Text color="blue">Blue text</Text>;

WithAColor.story = {
  name: "With a color"
};

export const WithASize = () => (
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
);

WithASize.story = {
  name: "With a size"
};

export const WithACustomMargin = () => (
  <>
    <Text mb="x3">Text 24px bottom margin.</Text>
    <Text>Text with default (0px) bottom margin.</Text>
  </>
);

WithACustomMargin.story = {
  name: "With a custom margin"
};

export const SetToInline = () => (
  <>
    <Text inline mr="x1">
      Inline text
    </Text>
    <Text inline>Inline text</Text>
  </>
);

SetToInline.story = {
  name: "Set to inline"
};

export const SetToDisabled = () => (
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
);

SetToDisabled.story = {
  name: "Set to disabled"
};
