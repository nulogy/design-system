import React from "react";
import { storiesOf } from "@storybook/react";
import Box from "../Box/Box";
import Text from "../Type/Text";
import Grid from "./Grid";

storiesOf("Grid", module)
  .add("Responsive with Grid", () => (
    <Grid
      gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
      gridGap="24px"
    >
      <Box p={ 4 } bg="black">
        <Text color="white">Card 1</Text>
      </Box>
      <Box p={ 4 } bg="darkGrey">
        <Text color="white">Card 2</Text>
      </Box>
      <Box p={ 4 } bg="grey">
        <Text>Card 3</Text>
      </Box>
      <Box p={ 4 } bg="whiteGrey">
        <Text>Card 4</Text>
      </Box>
    </Grid>
  ))
  .add("Layout with Grid", () => (
    <Grid
      gridTemplateColumns="128px 1fr"
      gridTemplateRows="64px 1fr 40px"
      gridTemplateAreas="
      'header header'
      'sidebar main'
      'footer footer'"
    >
      <Box p={ 2 } style={ { gridArea: "header" } } bg="black">
        <Text color="white">Header</Text>
      </Box>
      <Box p={ 2 } style={ { gridArea: "main" } } bg="whiteGrey">
        <Text>Main</Text>
      </Box>
      <Box p={ 2 } style={ { gridArea: "sidebar" } } bg="grey">
        <Text>Sidebar</Text>
      </Box>
      <Box p={ 2 } style={ { gridArea: "footer" } } bg="whiteGrey">
        <Text>Footer</Text>
      </Box>
    </Grid>
  ));
