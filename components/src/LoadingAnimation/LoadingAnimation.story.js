import React from "react";
import { storiesOf } from "@storybook/react";
import { LoadingAnimation } from ".";
import { Overlay, Box, Flex, Text, ControlIcon, Alert } from "../index";

storiesOf("LoadingAnimation", module)
  .add("Active", () => <LoadingAnimation>Example</LoadingAnimation>)
  .add("Inactive", () => <LoadingAnimation inactive>Example</LoadingAnimation>)
  .add("Page example - active", () => (
    <Overlay flexDirection="column" m={{ extraSmall: "x2", small: "x3" }}>
      <Flex flexGrow="2" flexDirection="column" justifyContent="center" margin="auto" mb="x4">
        <Text mb="x2" fontWeight="medium" textAlign="right">
          1/4
        </Text>
        <Box mb="x1">
          <LoadingAnimation />
        </Box>
        <Text fontSize="small" color="darkGrey">
          Applying action ...
        </Text>
      </Flex>
      <Flex justifyContent="center" mb="x1">
        <ControlIcon icon="refresh" disabled mr="x1">
          Retry
        </ControlIcon>
        <ControlIcon icon="close">Abort</ControlIcon>
      </Flex>
    </Overlay>
  ))
  .add("Page example - inactive", () => (
    <Overlay flexDirection="column" m={{ extraSmall: "x2", small: "x3" }}>
      <Flex flexGrow="2" flexDirection="column" justifyContent="center" margin="auto" mb="x4">
        <Text mb="x2" fontWeight="medium" color="grey" textAlign="right">
          1/4
        </Text>
        <Box mb="x1">
          <LoadingAnimation inactive />
        </Box>
        <Text fontSize="small" color="grey">
          Applying action ...
        </Text>
      </Flex>
      <Alert type="warning" mb="x2" position="absolute" bottom="x8">
        This action takes longer than expected. Try again...
      </Alert>
      <Flex justifyContent="center" mb="x1">
        <ControlIcon icon="refresh" mr="x1">
          Retry
        </ControlIcon>
        <ControlIcon icon="close">Abort</ControlIcon>
      </Flex>
    </Overlay>
  ));
