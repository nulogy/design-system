import React from "react";
import { storiesOf } from "@storybook/react";
import { Box, Flex, Text } from "../index";
import theme from "../theme";

const baseFlexWrapperStyles = {
  boxSizing: "content-box",
  padding: theme.space.x3,
  background: theme.colors.whiteGrey
};

const modernFlexWrapperStyles = {
  ...baseFlexWrapperStyles,
  minHeight: "400px"
};

const boxStyles = {
  padding: theme.space.x6,
  background: theme.colors.grey,
  outline: `2px dotted ${theme.colors.darkGrey}`
};

storiesOf("Flex", module)
  .add("Flex", () => (
    <Flex style={modernFlexWrapperStyles}>
      <Box style={boxStyles}>1</Box>
      <Box style={boxStyles}>2</Box>
      <Box style={boxStyles}>3</Box>
      <Box style={boxStyles}>4</Box>
      <Box style={boxStyles}>5</Box>
    </Flex>
  ))
  .add("flexDirection set to row-reverse", () => (
    <Flex flexDirection="row-reverse" style={modernFlexWrapperStyles}>
      <Box style={boxStyles}>1</Box>
      <Box style={boxStyles}>2</Box>
      <Box style={boxStyles}>3</Box>
      <Box style={boxStyles}>4</Box>
      <Box style={boxStyles}>5</Box>
    </Flex>
  ))
  .add("flexDirection set to column", () => (
    <Flex flexDirection="column" style={modernFlexWrapperStyles}>
      <Box style={boxStyles}>1</Box>
      <Box style={boxStyles}>2</Box>
      <Box style={boxStyles}>3</Box>
      <Box style={boxStyles}>4</Box>
      <Box style={boxStyles}>5</Box>
    </Flex>
  ))
  .add("flexDirection set to column-reverse", () => (
    <Flex flexDirection="column-reverse" style={modernFlexWrapperStyles}>
      <Box style={boxStyles}>1</Box>
      <Box style={boxStyles}>2</Box>
      <Box style={boxStyles}>3</Box>
      <Box style={boxStyles}>4</Box>
      <Box style={boxStyles}>5</Box>
    </Flex>
  ))
  .add("flexWrap set to no-wrap (default)", () => (
    <Box width={500}>
      <Flex flexWrap="nowrap" style={modernFlexWrapperStyles}>
        <Box style={boxStyles}>1</Box>
        <Box style={boxStyles}>2</Box>
        <Box style={boxStyles}>3</Box>
        <Box style={boxStyles}>4</Box>
        <Box style={boxStyles}>5</Box>
        <Box style={boxStyles}>6</Box>
        <Box style={boxStyles}>7</Box>
      </Flex>
    </Box>
  ))
  .add("flexWrap set to wrap", () => (
    <Box width={500}>
      <Flex flexWrap="wrap" style={modernFlexWrapperStyles}>
        <Box style={boxStyles}>1</Box>
        <Box style={boxStyles}>2</Box>
        <Box style={boxStyles}>3</Box>
        <Box style={boxStyles}>4</Box>
        <Box style={boxStyles}>5</Box>
        <Box style={boxStyles}>6</Box>
        <Box style={boxStyles}>7</Box>
      </Flex>
    </Box>
  ))
  .add("flexWrap set to wrap-reverse", () => (
    <Box width={500}>
      <Flex flexWrap="wrap-reverse" style={modernFlexWrapperStyles}>
        <Box style={boxStyles}>1</Box>
        <Box style={boxStyles}>2</Box>
        <Box style={boxStyles}>3</Box>
        <Box style={boxStyles}>4</Box>
        <Box style={boxStyles}>5</Box>
        <Box style={boxStyles}>6</Box>
        <Box style={boxStyles}>7</Box>
      </Flex>
    </Box>
  ))
  .add("justifyContent set to flex-start (default)", () => (
    <Flex justifyContent="flex-start" style={modernFlexWrapperStyles}>
      <Box style={boxStyles}>1</Box>
      <Box style={boxStyles}>2</Box>
      <Box style={boxStyles}>3</Box>
      <Box style={boxStyles}>4</Box>
      <Box style={boxStyles}>5</Box>
    </Flex>
  ))
  .add("justifyContent set to flex-end", () => (
    <Flex justifyContent="flex-end" style={modernFlexWrapperStyles}>
      <Box style={boxStyles}>1</Box>
      <Box style={boxStyles}>2</Box>
      <Box style={boxStyles}>3</Box>
      <Box style={boxStyles}>4</Box>
      <Box style={boxStyles}>5</Box>
    </Flex>
  ))
  .add("justifyContent set to center", () => (
    <Flex justifyContent="center" style={modernFlexWrapperStyles}>
      <Box style={boxStyles}>1</Box>
      <Box style={boxStyles}>2</Box>
      <Box style={boxStyles}>3</Box>
      <Box style={boxStyles}>4</Box>
      <Box style={boxStyles}>5</Box>
    </Flex>
  ))
  .add("justifyContent set to space-between", () => (
    <Flex justifyContent="space-between" style={modernFlexWrapperStyles}>
      <Box style={boxStyles}>1</Box>
      <Box style={boxStyles}>2</Box>
      <Box style={boxStyles}>3</Box>
      <Box style={boxStyles}>4</Box>
      <Box style={boxStyles}>5</Box>
    </Flex>
  ))
  .add("justifyContent set to space-around", () => (
    <Flex justifyContent="space-around" style={modernFlexWrapperStyles}>
      <Box style={boxStyles}>1</Box>
      <Box style={boxStyles}>2</Box>
      <Box style={boxStyles}>3</Box>
      <Box style={boxStyles}>4</Box>
      <Box style={boxStyles}>5</Box>
    </Flex>
  ))
  .add("justifyContent set to space-evenly", () => (
    <Flex justifyContent="space-evenly" style={modernFlexWrapperStyles}>
      <Box style={boxStyles}>1</Box>
      <Box style={boxStyles}>2</Box>
      <Box style={boxStyles}>3</Box>
      <Box style={boxStyles}>4</Box>
      <Box style={boxStyles}>5</Box>
    </Flex>
  ))
  .add("alignItems set to stretch (default)", () => (
    <Flex alignItems="stretch" style={modernFlexWrapperStyles}>
      <Box style={boxStyles}>1</Box>
      <Box style={boxStyles}>2</Box>
      <Box style={boxStyles}>3</Box>
      <Box style={boxStyles}>4</Box>
      <Box style={boxStyles}>5</Box>
    </Flex>
  ))
  .add("alignItems set to flex-start", () => (
    <Flex alignItems="flex-start" style={modernFlexWrapperStyles}>
      <Box style={boxStyles}>1</Box>
      <Box style={boxStyles}>2</Box>
      <Box style={boxStyles}>3</Box>
      <Box style={boxStyles}>4</Box>
      <Box style={boxStyles}>5</Box>
    </Flex>
  ))
  .add("alignItems set to center", () => (
    <Flex alignItems="center" style={modernFlexWrapperStyles}>
      <Box style={boxStyles}>1</Box>
      <Box style={boxStyles}>2</Box>
      <Box style={boxStyles}>3</Box>
      <Box style={boxStyles}>4</Box>
      <Box style={boxStyles}>5</Box>
    </Flex>
  ))
  .add("alignItems set to flex-end", () => (
    <Flex alignItems="flex-end" style={modernFlexWrapperStyles}>
      <Box style={boxStyles}>1</Box>
      <Box style={boxStyles}>2</Box>
      <Box style={boxStyles}>3</Box>
      <Box style={boxStyles}>4</Box>
      <Box style={boxStyles}>5</Box>
    </Flex>
  ))
  .add("With custom order", () => (
    <Flex style={modernFlexWrapperStyles}>
      <Box style={boxStyles} order="1">
        1
      </Box>
      <Box style={boxStyles} order="3">
        2
      </Box>
      <Box style={boxStyles} order="2">
        3
      </Box>
      <Box style={boxStyles} order="5">
        4
      </Box>
      <Box style={boxStyles} order="4">
        5
      </Box>
    </Flex>
  ))
  .add("IE11 minHeight solution 1", () => (
    <>
      <Flex style={baseFlexWrapperStyles} height="400px">
        <Box style={boxStyles}>1</Box>
        <Box style={boxStyles}>2</Box>
        <Box style={boxStyles}>3</Box>
        <Box style={boxStyles}>4</Box>
        <Box style={boxStyles}>5</Box>
      </Flex>
      <Text my="x2">This solution involves using height instead min-height.</Text>
    </>
  ))
  .add("IE11 minHeight solution 2", () => (
    <>
      <Flex flexDirection="column">
        <Flex style={modernFlexWrapperStyles}>
          <Box style={boxStyles}>1</Box>
          <Box style={boxStyles}>2</Box>
          <Box style={boxStyles}>3</Box>
          <Box style={boxStyles}>4</Box>
          <Box style={boxStyles}>5</Box>
        </Flex>
      </Flex>
      <Text my="x2">
        This solution involves wrapping Flex element with another Flex element with column direction..
      </Text>
    </>
  ));
