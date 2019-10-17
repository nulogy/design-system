import React from "react";
import { storiesOf } from "@storybook/react";
import { StatusIndicator } from ".";
import { Text, SectionTitle, SubsectionTitle } from "../Type";
import { Box } from "../Box";

storiesOf("StatusIndicator", module)
  .add("All", () => (
    <>
      <StatusIndicator type="neutral" mr="half">
        Neutral
      </StatusIndicator>
      <StatusIndicator type="quiet" mr="half">
        Quiet
      </StatusIndicator>
      <StatusIndicator type="informative" mr="half">
        Informative
      </StatusIndicator>
      <StatusIndicator type="success" mr="half">
        Success
      </StatusIndicator>
      <StatusIndicator type="warning" mr="half">
        Warning
      </StatusIndicator>
      <StatusIndicator type="danger" mr="half">
        Danger
      </StatusIndicator>
    </>
  ))

  .add("Neutral", () => <StatusIndicator type="quiet">Neutral</StatusIndicator>)
  .add("Quiet", () => <StatusIndicator type="quiet">Quiet</StatusIndicator>)
  .add("Informative", () => <StatusIndicator type="informative">Informative</StatusIndicator>)
  .add("Success", () => <StatusIndicator type="success">Success</StatusIndicator>)
  .add("Warning", () => <StatusIndicator type="warning">Warning</StatusIndicator>)
  .add("Danger", () => <StatusIndicator type="danger">Danger</StatusIndicator>)
  .add("Following text", () => (
    <>
      <Box m="x3">
        <SectionTitle inline mr="x1">
          Label
        </SectionTitle>
        <StatusIndicator>Status</StatusIndicator>
      </Box>
      <Box m="x3">
        <SubsectionTitle inline mr="x1">
          Label
        </SubsectionTitle>
        <StatusIndicator>Status</StatusIndicator>
      </Box>
      <Box m="x3">
        <Text inline mr="x1">
          Label
        </Text>
        <StatusIndicator>Status</StatusIndicator>
      </Box>
      <Box m="x3">
        <Text fontSize="small" inline mr="x1">
          Label
        </Text>
        <StatusIndicator>Status</StatusIndicator>
      </Box>
      <Box m="x3">
        <Text fontSize="smaller" inline mr="x1">
          Label
        </Text>
        <StatusIndicator>Status</StatusIndicator>
      </Box>
    </>
  ));
