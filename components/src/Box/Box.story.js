import React from "react";
import { storiesOf } from "@storybook/react";
import Box from "./Box";

storiesOf("Box", module)
  .add("Box", () => (
    <Box p={ 4 }>
      Hello World
    </Box>
  ))
  .add("With a text colour", () => (
    <Box p={ 4 } color="blue">
      Hello World
    </Box>
  ))
  .add("With a background colour", () => (
    <Box p={ 4 } color="white" bg="blue">
     Hello World
    </Box>
  ))
  .add("With a set width", () => (
    <Box
      p={ 4 }
      width={ 1 / 2 }
      bg="whiteGrey"
    >
      Half Width
    </Box>
  ))
  .add("With a responsive width", () => (
    <Box
      p={ 4 }
      width={ [1, 1 / 2, 1 / 4] }
      bg="whiteGrey"
    >
      Full width on small screens, 1/2 width on medium and 1/4 width on large
    </Box>
  ))
  .add("With padding", () => (
    <Box p={ 3 }>
      <Box m={ 2 } p={ 4 } bg="whiteGrey">Padding</Box>
      <Box m={ 2 } pt={ 4 } bg="whiteGrey">Padding top</Box>
      <Box m={ 2 } pr={ 4 } bg="whiteGrey">Padding right</Box>
      <Box m={ 2 } pb={ 4 } bg="whiteGrey">Padding bottom</Box>
      <Box m={ 2 } pl={ 4 } bg="whiteGrey">Padding left</Box>
      <Box m={ 2 } px={ 4 } bg="whiteGrey">Padding x</Box>
      <Box m={ 2 } py={ 4 } bg="whiteGrey">Padding y</Box>
    </Box>
  ))
  .add("With margin", () => (
    <Box p={ 4 }>
      <Box m={ 4 } bg="whiteGrey">Margin</Box>
      <Box mt={ 4 } bg="whiteGrey">Margin top</Box>
      <Box mr={ 4 } bg="whiteGrey">Margin right</Box>
      <Box mb={ 4 } bg="whiteGrey">Margin bottom</Box>
      <Box ml={ 4 } bg="whiteGrey">Margin left</Box>
      <Box mx={ 4 } bg="whiteGrey">Margin x</Box>
      <Box my={ 4 } bg="whiteGrey">Margin y</Box>
    </Box>
  ))
  .add("With a shadow", () => (
    <Box boxShadow={ 0 }>Shadow</Box>
  ));
