import React from "react";
import { Box, Flex as NDSFlex } from "../index";
import { styled } from "styled-components";

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

export const FlexDirectionSetToRowReverse = {
  render: () => (
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
  ),

  name: "flexDirection set to row-reverse",
};

export const FlexDirectionSetToColumn = {
  render: () => (
    <Flex flexDirection="column">
      <StyledBox>1</StyledBox>
      <StyledBox>2</StyledBox>
      <StyledBox>3</StyledBox>
      <StyledBox>4</StyledBox>
      <StyledBox>5</StyledBox>
    </Flex>
  ),

  name: "flexDirection set to column",
};

export const FlexDirectionSetToColumnReverse = {
  render: () => (
    <Flex flexDirection="column-reverse">
      <StyledBox>1</StyledBox>
      <StyledBox>2</StyledBox>
      <StyledBox>3</StyledBox>
      <StyledBox>4</StyledBox>
      <StyledBox>5</StyledBox>
    </Flex>
  ),

  name: "flexDirection set to column-reverse",
};

export const FlexWrapSetToNoWrapDefault = {
  render: () => (
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
  ),

  name: "flexWrap set to no-wrap (default)",
};

export const FlexWrapSetToWrap = {
  render: () => (
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
  ),

  name: "flexWrap set to wrap",
};

export const FlexWrapSetToWrapReverse = {
  render: () => (
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
  ),

  name: "flexWrap set to wrap-reverse",
};

export const JustifyContentSetToFlexStartDefault = {
  render: () => (
    <Flex justifyContent="flex-start">
      <StyledBox>1</StyledBox>
      <StyledBox>2</StyledBox>
      <StyledBox>3</StyledBox>
      <StyledBox>4</StyledBox>
      <StyledBox>5</StyledBox>
    </Flex>
  ),

  name: "justifyContent set to flex-start (default)",
};

export const JustifyContentSetToFlexEnd = {
  render: () => (
    <Flex justifyContent="flex-end">
      <StyledBox>1</StyledBox>
      <StyledBox>2</StyledBox>
      <StyledBox>3</StyledBox>
      <StyledBox>4</StyledBox>
      <StyledBox>5</StyledBox>
    </Flex>
  ),

  name: "justifyContent set to flex-end",
};

export const JustifyContentSetToCenter = {
  render: () => (
    <Flex justifyContent="center">
      <StyledBox>1</StyledBox>
      <StyledBox>2</StyledBox>
      <StyledBox>3</StyledBox>
      <StyledBox>4</StyledBox>
      <StyledBox>5</StyledBox>
    </Flex>
  ),

  name: "justifyContent set to center",
};

export const JustifyContentSetToSpaceBetween = {
  render: () => (
    <Flex justifyContent="space-between">
      <StyledBox>1</StyledBox>
      <StyledBox>2</StyledBox>
      <StyledBox>3</StyledBox>
      <StyledBox>4</StyledBox>
      <StyledBox>5</StyledBox>
    </Flex>
  ),

  name: "justifyContent set to space-between",
};

export const JustifyContentSetToSpaceAround = {
  render: () => (
    <Flex justifyContent="space-around">
      <StyledBox>1</StyledBox>
      <StyledBox>2</StyledBox>
      <StyledBox>3</StyledBox>
      <StyledBox>4</StyledBox>
      <StyledBox>5</StyledBox>
    </Flex>
  ),

  name: "justifyContent set to space-around",
};

export const JustifyContentSetToSpaceEvenly = {
  render: () => (
    <Flex justifyContent="space-evenly">
      <StyledBox>1</StyledBox>
      <StyledBox>2</StyledBox>
      <StyledBox>3</StyledBox>
      <StyledBox>4</StyledBox>
      <StyledBox>5</StyledBox>
    </Flex>
  ),

  name: "justifyContent set to space-evenly",
};

export const AlignItemsSetToStretchDefault = {
  render: () => (
    <Flex alignItems="stretch">
      <StyledBox>1</StyledBox>
      <StyledBox>2</StyledBox>
      <StyledBox>3</StyledBox>
      <StyledBox>4</StyledBox>
      <StyledBox>5</StyledBox>
    </Flex>
  ),

  name: "alignItems set to stretch (default)",
};

export const AlignItemsSetToFlexStart = {
  render: () => (
    <Flex alignItems="flex-start">
      <StyledBox>1</StyledBox>
      <StyledBox>2</StyledBox>
      <StyledBox>3</StyledBox>
      <StyledBox>4</StyledBox>
      <StyledBox>5</StyledBox>
    </Flex>
  ),

  name: "alignItems set to flex-start",
};

export const AlignItemsSetToCenter = {
  render: () => (
    <Flex alignItems="center">
      <StyledBox>1</StyledBox>
      <StyledBox>2</StyledBox>
      <StyledBox>3</StyledBox>
      <StyledBox>4</StyledBox>
      <StyledBox>5</StyledBox>
    </Flex>
  ),

  name: "alignItems set to center",
};

export const AlignItemsSetToFlexEnd = {
  render: () => (
    <Flex alignItems="flex-end">
      <StyledBox>1</StyledBox>
      <StyledBox>2</StyledBox>
      <StyledBox>3</StyledBox>
      <StyledBox>4</StyledBox>
      <StyledBox>5</StyledBox>
    </Flex>
  ),

  name: "alignItems set to flex-end",
};

export const WithCustomOrder = {
  render: () => (
    <Flex>
      <StyledBox order={1}>1</StyledBox>
      <StyledBox order={3}>2</StyledBox>
      <StyledBox order={2}>3</StyledBox>
      <StyledBox order={5}>4</StyledBox>
      <StyledBox order={4}>5</StyledBox>
    </Flex>
  ),

  name: "With custom order",
};
