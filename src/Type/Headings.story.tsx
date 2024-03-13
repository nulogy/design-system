import React from "react";
import { Text, Heading1, Heading2, Heading3, Heading4, StatusIndicator } from "../index";
import { Flex } from "../Flex";

export default {
  title: "Components/Headings",
};

export const Headings = () => (
  <Flex flexDirection="column">
    <Heading1>Heading 1</Heading1>
    <Heading2>Heading 2</Heading2>
    <Heading3>Heading 3</Heading3>
    <Heading4>Heading 4</Heading4>
  </Flex>
);

export const WithACustomMargin = () => (
  <>
    <Heading1 mb="x6">Heading1</Heading1>
    <Text>Lorem ipsum</Text>
  </>
);

export const Inline = () => (
  <>
    <Heading1 inline>Heading1</Heading1>
    <StatusIndicator ml="x2" type="informative">
      Status
    </StatusIndicator>
  </>
);
