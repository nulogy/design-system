import React from "react";
import { storiesOf } from "@storybook/react";
import { Box } from "../Box";
import { Flex } from "../Flex";
import Branding from "./Branding";

storiesOf("Branding", module).add("Branding", () => (
  <>
    <Flex>
      <Box width={1 / 2} p="x2">
        <Branding />
        <br />
        <br />
        <Branding logoType="lettermark" />
        <br />
        <br />
        <Branding subtext="Logo Subtext" />
        <br />
        <br />
        <Branding size="large" />
        <br />
        <br />
        <Branding size="large" logoType="lettermark" />
        <br />
        <br />
        <Branding size="large" subtext="Logo Subtext" />
      </Box>
      <Box bg="black" width={1 / 2} p="x2">
        <Branding logoColor="white" />
        <br />
        <br />
        <Branding logoColor="white" logoType="lettermark" />
        <br />
        <br />
        <Branding logoColor="white" subtext="Logo Subtext" />
        <br />
        <br />
        <Branding logoColor="white" size="large" />
        <br />
        <br />
        <Branding logoColor="white" size="large" logoType="lettermark" />
        <br />
        <br />
        <Branding logoColor="white" size="large" subtext="Logo Subtext" />
      </Box>
    </Flex>
    <Flex my="x2" justifyContent="space-between">
      <Branding subtext="Left Align" alignment="left" />
      <Branding subtext="Middle Align" alignment="middle" />
      <Branding subtext="Right Align" alignment="right" />
    </Flex>
  </>
));
