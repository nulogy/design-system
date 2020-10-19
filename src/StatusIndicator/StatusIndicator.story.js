import React from "react";
import { StatusIndicator } from ".";
import { Text, Heading2, Heading3 } from "../Type";
import { Box } from "../Box";
import { Flex } from "../Flex";

export default {
  title: "Components/StatusIndicator"
};

export const All = () => (
  <>
    <StatusIndicator type="neutral" mr="half">
      Neutral
    </StatusIndicator>
    <StatusIndicator type="dark" mr="half">
      Dark
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
);

export const Neutral = () => <StatusIndicator type="neutral">Neutral</StatusIndicator>;
export const Dark = () => <StatusIndicator type="dark">Dark</StatusIndicator>;
export const Quiet = () => <StatusIndicator type="quiet">Quiet</StatusIndicator>;
export const Informative = () => <StatusIndicator type="informative">Informative</StatusIndicator>;
export const Success = () => <StatusIndicator type="success">Success</StatusIndicator>;
export const Warning = () => <StatusIndicator type="warning">Warning</StatusIndicator>;
export const Danger = () => <StatusIndicator type="danger">Danger</StatusIndicator>;

export const FollowingText = () => (
  <>
    <Box mb="x3">
      <Heading2 inline mr="x1">
        Label
      </Heading2>
      <StatusIndicator>Status</StatusIndicator>
    </Box>
    <Box mb="x3">
      <Heading3 inline mr="x1">
        Label
      </Heading3>
      <StatusIndicator>Status</StatusIndicator>
    </Box>
    <Box mb="x3">
      <Text inline mr="x1">
        Label
      </Text>
      <StatusIndicator>Status</StatusIndicator>
    </Box>
    <Box mb="x3">
      <Text fontSize="small" lineHeight="smallTextBase" inline mr="x1">
        Label
      </Text>
      <StatusIndicator>Status</StatusIndicator>
    </Box>
    <Box mb="x3">
      <Text fontSize="smaller" lineHeight="smallerText" inline mr="x1">
        Label
      </Text>
      <StatusIndicator>Status</StatusIndicator>
    </Box>
    <Box mb="x3">
      <Text inline mr="x1">
        Long label Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in eleifend metus, in tempus
        sapien. Morbi eget felis est. Nunc facilisis vel nisi nec ornare. Ut blandit ullamcorper enim sed fringilla.
        Quisque malesuada pharetra tincidunt. Mauris mauris tortor, maximus vitae tempor ac, tincidunt pharetra augue.
        In eget suscipit est. Suspendisse feugiat risus urna
      </Text>
      <StatusIndicator>Status</StatusIndicator>
    </Box>
  </>
);

FollowingText.story = {
  name: "Following text"
};

export const InsideFlex = () => (
  <>
    <Flex mb="x3">
      <Heading2 inline mr="x1" mb="0">
        Label
      </Heading2>
      <StatusIndicator>Status</StatusIndicator>
    </Flex>
    <Flex mb="x3">
      <Heading3 inline mr="x1" mb="0">
        Label
      </Heading3>
      <StatusIndicator>Status</StatusIndicator>
    </Flex>
    <Flex mb="x3">
      <Text inline mr="x1" mb="0">
        Label
      </Text>
      <StatusIndicator>Status</StatusIndicator>
    </Flex>
    <Flex mb="x3">
      <Text fontSize="small" lineHeight="smallTextBase" inline mr="x1" mb="0">
        Label
      </Text>
      <StatusIndicator>Status</StatusIndicator>
    </Flex>
    <Flex mb="x3">
      <Text fontSize="smaller" lineHeight="smallerText" inline mr="x1" mb="0">
        Label
      </Text>
      <StatusIndicator>Status</StatusIndicator>
    </Flex>
  </>
);

InsideFlex.story = {
  name: "Inside flex"
};
