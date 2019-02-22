import React from "react";
import { storiesOf } from "@storybook/react";
import { Box } from "../index";

storiesOf("Box", module)
  .add("Box", () => (
    <Box p="x3">
      Hello World
    </Box>
  ))
  .add("With a text colour", () => (
    <Box p="x3" color="blue">
      Hello World
    </Box>
  ))
  .add("With a background colour", () => (
    <Box p="x3" color="white" bg="blue">
     Hello World
    </Box>
  ))
  .add("With a set width", () => (
    <Box
      p="x3"
      width={ 1 / 2 }
      bg="whiteGrey"
    >
      Half Width
    </Box>
  ))
  .add("With a responsive width", () => (
    <Box
      p="x3"
      width={ { small: 1, medium: 1 / 2, large: 1 / 4 } }
      bg="whiteGrey"
    >
      Full width on small screens, 1/2 width on medium and 1/4 width on large
    </Box>
  ))
  .add("With padding", () => (
    <Box p="x2">
      <Box m="x1" p="x3" bg="whiteGrey">Padding</Box>
      <Box m="x1" p="x3" bg="whiteGrey">Padding top</Box>
      <Box m="x1" pr="x3" bg="whiteGrey">Padding right</Box>
      <Box m="x1" pb="x3" bg="whiteGrey">Padding bottom</Box>
      <Box m="x1" pl="x3" bg="whiteGrey">Padding left</Box>
      <Box m="x1" px="x3" bg="whiteGrey">Padding x</Box>
      <Box m="x1" py="x3" bg="whiteGrey">Padding y</Box>
    </Box>
  ))
  .add("With margin", () => (
    <Box p="x3">
      <Box m="x3" bg="whiteGrey">Margin</Box>
      <Box mt="x3" bg="whiteGrey">Margin top</Box>
      <Box mr="x3" bg="whiteGrey">Margin right</Box>
      <Box mb="x3" bg="whiteGrey">Margin bottom</Box>
      <Box ml="x3" bg="whiteGrey">Margin left</Box>
      <Box mx="x3" bg="whiteGrey">Margin x</Box>
      <Box my="x3" bg="whiteGrey">Margin y</Box>
    </Box>
  ))
  .add("With a shadow", () => (
    <Box boxShadow={ 0 }>Shadow</Box>
  ));
