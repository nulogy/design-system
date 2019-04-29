import React from "react";
import { storiesOf } from "@storybook/react";
import { Box } from "../Box";
import Flex from "./Flex";
import theme from "../theme";

const flexWrapperStyles = {
  boxSizing: "content-box",
  minHeight: "400px",
  padding: theme.space.x3,
  background: theme.colors.whiteGrey,
};

const boxStyles = {
  padding: theme.space.x6,
  background: theme.colors.grey,
  outline: `2px dotted ${theme.colors.darkGrey}`,
};

storiesOf("Flex", module)
  .add("Flex", () => (
    <Flex style={ flexWrapperStyles }>
      <Box style={ boxStyles }>1</Box>
      <Box style={ boxStyles }>2</Box>
      <Box style={ boxStyles }>3</Box>
      <Box style={ boxStyles }>4</Box>
      <Box style={ boxStyles }>5</Box>
    </Flex>
  )).add("flexDirection set to row-reverse", () => (
    <Flex flexDirection="row-reverse" style={ flexWrapperStyles }>
      <Box style={ boxStyles }>1</Box>
      <Box style={ boxStyles }>2</Box>
      <Box style={ boxStyles }>3</Box>
      <Box style={ boxStyles }>4</Box>
      <Box style={ boxStyles }>5</Box>
    </Flex>
  )).add("flexDirection set to column", () => (
    <Flex flexDirection="column" style={ flexWrapperStyles }>
      <Box style={ boxStyles }>1</Box>
      <Box style={ boxStyles }>2</Box>
      <Box style={ boxStyles }>3</Box>
      <Box style={ boxStyles }>4</Box>
      <Box style={ boxStyles }>5</Box>
    </Flex>
  ))
  .add("flexDirection set to column-reverse", () => (
    <Flex flexDirection="column-reverse" style={ flexWrapperStyles }>
      <Box style={ boxStyles }>1</Box>
      <Box style={ boxStyles }>2</Box>
      <Box style={ boxStyles }>3</Box>
      <Box style={ boxStyles }>4</Box>
      <Box style={ boxStyles }>5</Box>
    </Flex>
  ))
  .add("flexWrap set to no-wrap (default)", () => (
    <Box width={ 500 }>
      <Flex flexWrap="nowrap" style={ flexWrapperStyles }>
        <Box style={ boxStyles }>1</Box>
        <Box style={ boxStyles }>2</Box>
        <Box style={ boxStyles }>3</Box>
        <Box style={ boxStyles }>4</Box>
        <Box style={ boxStyles }>5</Box>
        <Box style={ boxStyles }>6</Box>
        <Box style={ boxStyles }>7</Box>
      </Flex>
    </Box>
  ))
  .add("flexWrap set to wrap", () => (
    <Box width={ 500 }>
      <Flex flexWrap="wrap" style={ flexWrapperStyles }>
        <Box style={ boxStyles }>1</Box>
        <Box style={ boxStyles }>2</Box>
        <Box style={ boxStyles }>3</Box>
        <Box style={ boxStyles }>4</Box>
        <Box style={ boxStyles }>5</Box>
        <Box style={ boxStyles }>6</Box>
        <Box style={ boxStyles }>7</Box>
      </Flex>
    </Box>
  ))
  .add("flexWrap set to wrap-reverse", () => (
    <Box width={ 500 }>
      <Flex flexWrap="wrap-reverse" style={ flexWrapperStyles }>
        <Box style={ boxStyles }>1</Box>
        <Box style={ boxStyles }>2</Box>
        <Box style={ boxStyles }>3</Box>
        <Box style={ boxStyles }>4</Box>
        <Box style={ boxStyles }>5</Box>
        <Box style={ boxStyles }>6</Box>
        <Box style={ boxStyles }>7</Box>
      </Flex>
    </Box>
  ))
  .add("justifyContent set to flex-start (default)", () => (
    <Flex justifyContent="flex-start" style={ flexWrapperStyles }>
      <Box style={ boxStyles }>1</Box>
      <Box style={ boxStyles }>2</Box>
      <Box style={ boxStyles }>3</Box>
      <Box style={ boxStyles }>4</Box>
      <Box style={ boxStyles }>5</Box>
    </Flex>
  ))
  .add("justifyContent set to flex-end", () => (
    <Flex justifyContent="flex-end" style={ flexWrapperStyles }>
      <Box style={ boxStyles }>1</Box>
      <Box style={ boxStyles }>2</Box>
      <Box style={ boxStyles }>3</Box>
      <Box style={ boxStyles }>4</Box>
      <Box style={ boxStyles }>5</Box>
    </Flex>
  ))
  .add("justifyContent set to center", () => (
    <Flex justifyContent="center" style={ flexWrapperStyles }>
      <Box style={ boxStyles }>1</Box>
      <Box style={ boxStyles }>2</Box>
      <Box style={ boxStyles }>3</Box>
      <Box style={ boxStyles }>4</Box>
      <Box style={ boxStyles }>5</Box>
    </Flex>
  ))
  .add("justifyContent set to space-between", () => (
    <Flex justifyContent="space-between" style={ flexWrapperStyles }>
      <Box style={ boxStyles }>1</Box>
      <Box style={ boxStyles }>2</Box>
      <Box style={ boxStyles }>3</Box>
      <Box style={ boxStyles }>4</Box>
      <Box style={ boxStyles }>5</Box>
    </Flex>
  ))
  .add("justifyContent set to space-around", () => (
    <Flex justifyContent="space-around" style={ flexWrapperStyles }>
      <Box style={ boxStyles }>1</Box>
      <Box style={ boxStyles }>2</Box>
      <Box style={ boxStyles }>3</Box>
      <Box style={ boxStyles }>4</Box>
      <Box style={ boxStyles }>5</Box>
    </Flex>
  ))
  .add("justifyContent set to space-evenly", () => (
    <Flex justifyContent="space-evenly" style={ flexWrapperStyles }>
      <Box style={ boxStyles }>1</Box>
      <Box style={ boxStyles }>2</Box>
      <Box style={ boxStyles }>3</Box>
      <Box style={ boxStyles }>4</Box>
      <Box style={ boxStyles }>5</Box>
    </Flex>
  ))
  .add("alignItems set to stretch (default)", () => (
    <Flex alignItems="stretch" style={ flexWrapperStyles }>
      <Box style={ boxStyles }>1</Box>
      <Box style={ boxStyles }>2</Box>
      <Box style={ boxStyles }>3</Box>
      <Box style={ boxStyles }>4</Box>
      <Box style={ boxStyles }>5</Box>
    </Flex>
  ))
  .add("alignItems set to flex-start", () => (
    <Flex alignItems="flex-start" style={ flexWrapperStyles }>
      <Box style={ boxStyles }>1</Box>
      <Box style={ boxStyles }>2</Box>
      <Box style={ boxStyles }>3</Box>
      <Box style={ boxStyles }>4</Box>
      <Box style={ boxStyles }>5</Box>
    </Flex>
  ))
  .add("alignItems set to center", () => (
    <Flex alignItems="center" style={ flexWrapperStyles }>
      <Box style={ boxStyles }>1</Box>
      <Box style={ boxStyles }>2</Box>
      <Box style={ boxStyles }>3</Box>
      <Box style={ boxStyles }>4</Box>
      <Box style={ boxStyles }>5</Box>
    </Flex>
  ))
  .add("alignItems set to flex-end", () => (
    <Flex alignItems="flex-end" style={ flexWrapperStyles }>
      <Box style={ boxStyles }>1</Box>
      <Box style={ boxStyles }>2</Box>
      <Box style={ boxStyles }>3</Box>
      <Box style={ boxStyles }>4</Box>
      <Box style={ boxStyles }>5</Box>
    </Flex>
  ))
  .add("With custom order", () => (
    <Flex style={ flexWrapperStyles }>
      <Box style={ boxStyles } order="1">1</Box>
      <Box style={ boxStyles } order="3">2</Box>
      <Box style={ boxStyles } order="2">3</Box>
      <Box style={ boxStyles } order="5">4</Box>
      <Box style={ boxStyles } order="4">5</Box>
    </Flex>
  ));
