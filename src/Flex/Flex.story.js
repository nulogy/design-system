import React from "react";
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

export default {
  title: "Components/Flex"
};

export const _Flex = () => (
  <Flex style={modernFlexWrapperStyles}>
    <Box style={boxStyles}>1</Box>
    <Box style={boxStyles}>2</Box>
    <Box style={boxStyles}>3</Box>
    <Box style={boxStyles}>4</Box>
    <Box style={boxStyles}>5</Box>
  </Flex>
);

export const FlexDirectionSetToRowReverse = () => (
  <Flex flexDirection="row-reverse" style={modernFlexWrapperStyles}>
    <Box style={boxStyles}>1</Box>
    <Box style={boxStyles}>2</Box>
    <Box style={boxStyles}>3</Box>
    <Box style={boxStyles}>4</Box>
    <Box style={boxStyles}>5</Box>
  </Flex>
);

FlexDirectionSetToRowReverse.story = {
  name: "flexDirection set to row-reverse"
};

export const FlexDirectionSetToColumn = () => (
  <Flex flexDirection="column" style={modernFlexWrapperStyles}>
    <Box style={boxStyles}>1</Box>
    <Box style={boxStyles}>2</Box>
    <Box style={boxStyles}>3</Box>
    <Box style={boxStyles}>4</Box>
    <Box style={boxStyles}>5</Box>
  </Flex>
);

FlexDirectionSetToColumn.story = {
  name: "flexDirection set to column"
};

export const FlexDirectionSetToColumnReverse = () => (
  <Flex flexDirection="column-reverse" style={modernFlexWrapperStyles}>
    <Box style={boxStyles}>1</Box>
    <Box style={boxStyles}>2</Box>
    <Box style={boxStyles}>3</Box>
    <Box style={boxStyles}>4</Box>
    <Box style={boxStyles}>5</Box>
  </Flex>
);

FlexDirectionSetToColumnReverse.story = {
  name: "flexDirection set to column-reverse"
};

export const FlexWrapSetToNoWrapDefault = () => (
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
);

FlexWrapSetToNoWrapDefault.story = {
  name: "flexWrap set to no-wrap (default)"
};

export const FlexWrapSetToWrap = () => (
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
);

FlexWrapSetToWrap.story = {
  name: "flexWrap set to wrap"
};

export const FlexWrapSetToWrapReverse = () => (
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
);

FlexWrapSetToWrapReverse.story = {
  name: "flexWrap set to wrap-reverse"
};

export const JustifyContentSetToFlexStartDefault = () => (
  <Flex justifyContent="flex-start" style={modernFlexWrapperStyles}>
    <Box style={boxStyles}>1</Box>
    <Box style={boxStyles}>2</Box>
    <Box style={boxStyles}>3</Box>
    <Box style={boxStyles}>4</Box>
    <Box style={boxStyles}>5</Box>
  </Flex>
);

JustifyContentSetToFlexStartDefault.story = {
  name: "justifyContent set to flex-start (default)"
};

export const JustifyContentSetToFlexEnd = () => (
  <Flex justifyContent="flex-end" style={modernFlexWrapperStyles}>
    <Box style={boxStyles}>1</Box>
    <Box style={boxStyles}>2</Box>
    <Box style={boxStyles}>3</Box>
    <Box style={boxStyles}>4</Box>
    <Box style={boxStyles}>5</Box>
  </Flex>
);

JustifyContentSetToFlexEnd.story = {
  name: "justifyContent set to flex-end"
};

export const JustifyContentSetToCenter = () => (
  <Flex justifyContent="center" style={modernFlexWrapperStyles}>
    <Box style={boxStyles}>1</Box>
    <Box style={boxStyles}>2</Box>
    <Box style={boxStyles}>3</Box>
    <Box style={boxStyles}>4</Box>
    <Box style={boxStyles}>5</Box>
  </Flex>
);

JustifyContentSetToCenter.story = {
  name: "justifyContent set to center"
};

export const JustifyContentSetToSpaceBetween = () => (
  <Flex justifyContent="space-between" style={modernFlexWrapperStyles}>
    <Box style={boxStyles}>1</Box>
    <Box style={boxStyles}>2</Box>
    <Box style={boxStyles}>3</Box>
    <Box style={boxStyles}>4</Box>
    <Box style={boxStyles}>5</Box>
  </Flex>
);

JustifyContentSetToSpaceBetween.story = {
  name: "justifyContent set to space-between"
};

export const JustifyContentSetToSpaceAround = () => (
  <Flex justifyContent="space-around" style={modernFlexWrapperStyles}>
    <Box style={boxStyles}>1</Box>
    <Box style={boxStyles}>2</Box>
    <Box style={boxStyles}>3</Box>
    <Box style={boxStyles}>4</Box>
    <Box style={boxStyles}>5</Box>
  </Flex>
);

JustifyContentSetToSpaceAround.story = {
  name: "justifyContent set to space-around"
};

export const JustifyContentSetToSpaceEvenly = () => (
  <Flex justifyContent="space-evenly" style={modernFlexWrapperStyles}>
    <Box style={boxStyles}>1</Box>
    <Box style={boxStyles}>2</Box>
    <Box style={boxStyles}>3</Box>
    <Box style={boxStyles}>4</Box>
    <Box style={boxStyles}>5</Box>
  </Flex>
);

JustifyContentSetToSpaceEvenly.story = {
  name: "justifyContent set to space-evenly"
};

export const AlignItemsSetToStretchDefault = () => (
  <Flex alignItems="stretch" style={modernFlexWrapperStyles}>
    <Box style={boxStyles}>1</Box>
    <Box style={boxStyles}>2</Box>
    <Box style={boxStyles}>3</Box>
    <Box style={boxStyles}>4</Box>
    <Box style={boxStyles}>5</Box>
  </Flex>
);

AlignItemsSetToStretchDefault.story = {
  name: "alignItems set to stretch (default)"
};

export const AlignItemsSetToFlexStart = () => (
  <Flex alignItems="flex-start" style={modernFlexWrapperStyles}>
    <Box style={boxStyles}>1</Box>
    <Box style={boxStyles}>2</Box>
    <Box style={boxStyles}>3</Box>
    <Box style={boxStyles}>4</Box>
    <Box style={boxStyles}>5</Box>
  </Flex>
);

AlignItemsSetToFlexStart.story = {
  name: "alignItems set to flex-start"
};

export const AlignItemsSetToCenter = () => (
  <Flex alignItems="center" style={modernFlexWrapperStyles}>
    <Box style={boxStyles}>1</Box>
    <Box style={boxStyles}>2</Box>
    <Box style={boxStyles}>3</Box>
    <Box style={boxStyles}>4</Box>
    <Box style={boxStyles}>5</Box>
  </Flex>
);

AlignItemsSetToCenter.story = {
  name: "alignItems set to center"
};

export const AlignItemsSetToFlexEnd = () => (
  <Flex alignItems="flex-end" style={modernFlexWrapperStyles}>
    <Box style={boxStyles}>1</Box>
    <Box style={boxStyles}>2</Box>
    <Box style={boxStyles}>3</Box>
    <Box style={boxStyles}>4</Box>
    <Box style={boxStyles}>5</Box>
  </Flex>
);

AlignItemsSetToFlexEnd.story = {
  name: "alignItems set to flex-end"
};

export const WithCustomOrder = () => (
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
);

WithCustomOrder.story = {
  name: "With custom order"
};

export const Ie11MinHeightSolution1 = () => (
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
);

Ie11MinHeightSolution1.story = {
  name: "IE11 minHeight solution 1"
};

export const Ie11MinHeightSolution2 = () => (
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
    <Text my="x2">This solution involves wrapping Flex element with another Flex element with column direction..</Text>
  </>
);

Ie11MinHeightSolution2.story = {
  name: "IE11 minHeight solution 2"
};
