import React from "react";
import { storiesOf } from "@storybook/react";
import { Box } from "../Box";
import { Flex } from "../Flex";
import Branding from "./Branding";

storiesOf("Branding", module).add("Branding", () => (
  <Flex>
    <Box width={1 / 2}>
      <Branding />
      <br />
      <br />
      <Branding letterMark />
      <br />
      <br />
      <Branding solutionName="Operational Solution" />
      <br />
      <br />
      <Branding large />
      <br />
      <br />
      <Branding large solutionName="Operational Solution" />
      <br />
      <br />
      <Branding large letterMark />
    </Box>
    <Box bg="black" width={1 / 2}>
      <Branding light />
      <br />
      <br />
      <Branding light letterMark />
      <br />
      <br />
      <Branding light solutionName="Operational Solution" />
      <br />
      <br />
      <Branding light large />
      <br />
      <br />
      <Branding light large solutionName="Operational Solution" />
      <br />
      <br />
      <Branding light large letterMark />
    </Box>
  </Flex>
));
