import React from "react";
import { Box, Flex as NDSFlex } from "../index";
import styled from "styled-components";

const Flex = ({ children, ...props }) => (
  <NDSFlex
    padding="x3"
    bg="whiteGrey"
    minHeight="400px"
    style={{
      boxSizing: "content-box",
    }}
    {...props}
  >
    {children}
  </NDSFlex>
);

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.space.x6,
  background: theme.colors.grey,
  outline: `2px dotted ${theme.colors.darkGrey}`,
}));

export default {
  title: "Components/Flex",
};

export const _Flex = () => (
  <Flex
    style={{
      boxSizing: "content-box",
    }}
    padding="x3"
    bg="whiteGrey"
  >
    <StyledBox>1</StyledBox>
    <StyledBox>2</StyledBox>
    <StyledBox>3</StyledBox>
    <StyledBox>4</StyledBox>
    <StyledBox>5</StyledBox>
  </Flex>
);

export const FlexDirectionSetToRowReverse = () => (
  <Flex
    style={{
      boxSizing: "content-box",
    }}
    flexDirection="row-reverse"
    padding="x3"
    bg="whiteGrey"
  >
    <StyledBox>1</StyledBox>
    <StyledBox>2</StyledBox>
    <StyledBox>3</StyledBox>
    <StyledBox>4</StyledBox>
    <StyledBox>5</StyledBox>
  </Flex>
);

FlexDirectionSetToRowReverse.story = {
  name: "flexDirection set to row-reverse",
};

export const FlexDirectionSetToColumn = () => (
  <Flex flexDirection="column">
    <StyledBox>1</StyledBox>
    <StyledBox>2</StyledBox>
    <StyledBox>3</StyledBox>
    <StyledBox>4</StyledBox>
    <StyledBox>5</StyledBox>
  </Flex>
);

FlexDirectionSetToColumn.story = {
  name: "flexDirection set to column",
};

export const FlexDirectionSetToColumnReverse = () => (
  <Flex flexDirection="column-reverse">
    <StyledBox>1</StyledBox>
    <StyledBox>2</StyledBox>
    <StyledBox>3</StyledBox>
    <StyledBox>4</StyledBox>
    <StyledBox>5</StyledBox>
  </Flex>
);

FlexDirectionSetToColumnReverse.story = {
  name: "flexDirection set to column-reverse",
};

export const FlexWrapSetToNoWrapDefault = () => (
  <Box width={500}>
    <Flex flexWrap="nowrap">
      <StyledBox>1</StyledBox>
      <StyledBox>2</StyledBox>
      <StyledBox>3</StyledBox>
      <StyledBox>4</StyledBox>
      <StyledBox>5</StyledBox>
      <StyledBox>6</StyledBox>
      <StyledBox>7</StyledBox>
    </Flex>
  </Box>
);

FlexWrapSetToNoWrapDefault.story = {
  name: "flexWrap set to no-wrap (default)",
};

export const FlexWrapSetToWrap = () => (
  <Box width={500}>
    <Flex flexWrap="wrap">
      <StyledBox>1</StyledBox>
      <StyledBox>2</StyledBox>
      <StyledBox>3</StyledBox>
      <StyledBox>4</StyledBox>
      <StyledBox>5</StyledBox>
      <StyledBox>6</StyledBox>
      <StyledBox>7</StyledBox>
    </Flex>
  </Box>
);

FlexWrapSetToWrap.story = {
  name: "flexWrap set to wrap",
};

export const FlexWrapSetToWrapReverse = () => (
  <Box width={500}>
    <Flex flexWrap="wrap-reverse">
      <StyledBox>1</StyledBox>
      <StyledBox>2</StyledBox>
      <StyledBox>3</StyledBox>
      <StyledBox>4</StyledBox>
      <StyledBox>5</StyledBox>
      <StyledBox>6</StyledBox>
      <StyledBox>7</StyledBox>
    </Flex>
  </Box>
);

FlexWrapSetToWrapReverse.story = {
  name: "flexWrap set to wrap-reverse",
};

export const JustifyContentSetToFlexStartDefault = () => (
  <Flex justifyContent="flex-start">
    <StyledBox>1</StyledBox>
    <StyledBox>2</StyledBox>
    <StyledBox>3</StyledBox>
    <StyledBox>4</StyledBox>
    <StyledBox>5</StyledBox>
  </Flex>
);

JustifyContentSetToFlexStartDefault.story = {
  name: "justifyContent set to flex-start (default)",
};

export const JustifyContentSetToFlexEnd = () => (
  <Flex justifyContent="flex-end">
    <StyledBox>1</StyledBox>
    <StyledBox>2</StyledBox>
    <StyledBox>3</StyledBox>
    <StyledBox>4</StyledBox>
    <StyledBox>5</StyledBox>
  </Flex>
);

JustifyContentSetToFlexEnd.story = {
  name: "justifyContent set to flex-end",
};

export const JustifyContentSetToCenter = () => (
  <Flex justifyContent="center">
    <StyledBox>1</StyledBox>
    <StyledBox>2</StyledBox>
    <StyledBox>3</StyledBox>
    <StyledBox>4</StyledBox>
    <StyledBox>5</StyledBox>
  </Flex>
);

JustifyContentSetToCenter.story = {
  name: "justifyContent set to center",
};

export const JustifyContentSetToSpaceBetween = () => (
  <Flex justifyContent="space-between">
    <StyledBox>1</StyledBox>
    <StyledBox>2</StyledBox>
    <StyledBox>3</StyledBox>
    <StyledBox>4</StyledBox>
    <StyledBox>5</StyledBox>
  </Flex>
);

JustifyContentSetToSpaceBetween.story = {
  name: "justifyContent set to space-between",
};

export const JustifyContentSetToSpaceAround = () => (
  <Flex justifyContent="space-around">
    <StyledBox>1</StyledBox>
    <StyledBox>2</StyledBox>
    <StyledBox>3</StyledBox>
    <StyledBox>4</StyledBox>
    <StyledBox>5</StyledBox>
  </Flex>
);

JustifyContentSetToSpaceAround.story = {
  name: "justifyContent set to space-around",
};

export const JustifyContentSetToSpaceEvenly = () => (
  <Flex justifyContent="space-evenly">
    <StyledBox>1</StyledBox>
    <StyledBox>2</StyledBox>
    <StyledBox>3</StyledBox>
    <StyledBox>4</StyledBox>
    <StyledBox>5</StyledBox>
  </Flex>
);

JustifyContentSetToSpaceEvenly.story = {
  name: "justifyContent set to space-evenly",
};

export const AlignItemsSetToStretchDefault = () => (
  <Flex alignItems="stretch">
    <StyledBox>1</StyledBox>
    <StyledBox>2</StyledBox>
    <StyledBox>3</StyledBox>
    <StyledBox>4</StyledBox>
    <StyledBox>5</StyledBox>
  </Flex>
);

AlignItemsSetToStretchDefault.story = {
  name: "alignItems set to stretch (default)",
};

export const AlignItemsSetToFlexStart = () => (
  <Flex alignItems="flex-start">
    <StyledBox>1</StyledBox>
    <StyledBox>2</StyledBox>
    <StyledBox>3</StyledBox>
    <StyledBox>4</StyledBox>
    <StyledBox>5</StyledBox>
  </Flex>
);

AlignItemsSetToFlexStart.story = {
  name: "alignItems set to flex-start",
};

export const AlignItemsSetToCenter = () => (
  <Flex alignItems="center">
    <StyledBox>1</StyledBox>
    <StyledBox>2</StyledBox>
    <StyledBox>3</StyledBox>
    <StyledBox>4</StyledBox>
    <StyledBox>5</StyledBox>
  </Flex>
);

AlignItemsSetToCenter.story = {
  name: "alignItems set to center",
};

export const AlignItemsSetToFlexEnd = () => (
  <Flex alignItems="flex-end">
    <StyledBox>1</StyledBox>
    <StyledBox>2</StyledBox>
    <StyledBox>3</StyledBox>
    <StyledBox>4</StyledBox>
    <StyledBox>5</StyledBox>
  </Flex>
);

AlignItemsSetToFlexEnd.story = {
  name: "alignItems set to flex-end",
};

export const WithCustomOrder = () => (
  <Flex>
    <StyledBox order={1}>1</StyledBox>
    <StyledBox order={3}>2</StyledBox>
    <StyledBox order={2}>3</StyledBox>
    <StyledBox order={5}>4</StyledBox>
    <StyledBox order={4}>5</StyledBox>
  </Flex>
);

WithCustomOrder.story = {
  name: "With custom order",
};
