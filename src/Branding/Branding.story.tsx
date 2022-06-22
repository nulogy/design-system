import React from "react";
import { Box, Flex, Branding } from "../index";

export default {
  title: "Components/Branding",
};

export const _Branding = () => (
  <>
    <Flex>
      <Box width={1 / 2} p="x2">
        <Branding size="small" />
        <br />
        <br />
        <Branding />
        <br />
        <br />
        <Branding logoType="lettermark" />
        <br />
        <br />
        <Branding subtext="Logo Subtext" />
        <br />
        <br />
        <Branding withLine subtext="Logo Subtext" />
        <br />
        <br />
        <Branding size="large" />
        <br />
        <br />
        <Branding size="large" logoType="lettermark" />
        <br />
        <br />
        <Branding size="large" subtext="Logo Subtext" />
        <br />
        <br />
        <Branding withLine size="large" subtext="Logo Subtext" />
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
        <Branding logoColor="white" withLine subtext="Logo Subtext" />
        <br />
        <br />
        <Branding logoColor="white" size="large" />
        <br />
        <br />
        <Branding logoColor="white" size="large" logoType="lettermark" />
        <br />
        <br />
        <Branding logoColor="white" size="large" subtext="Logo Subtext" />
        <br />
        <br />
        <Branding withLine logoColor="white" size="large" subtext="Logo Subtext" />
      </Box>
    </Flex>
    <Flex my="x2" justifyContent="space-between">
      <Branding subtext="Left Align" alignment="left" />
      <Branding subtext="Center Align" alignment="center" />
      <Branding subtext="Right Align" alignment="right" />
    </Flex>
    <Flex my="x2" justifyContent="space-between">
      <Branding withLine subtext="Left Align" alignment="left" />
      <Branding withLine subtext="Center Align" alignment="center" />
      <Branding withLine subtext="Right Align" alignment="right" />
    </Flex>
    <Flex my="x2" justifyContent="space-between">
      <Branding size="large" subtext="Left Align" alignment="left" />
      <Branding size="large" subtext="Center Align" alignment="center" />
      <Branding size="large" subtext="Right Align" alignment="right" />
    </Flex>
    <Flex my="x2" justifyContent="space-between">
      <Branding size="large" withLine subtext="Left Align" alignment="left" />
      <Branding size="large" withLine subtext="Center Align" alignment="center" />
      <Branding size="large" withLine subtext="Right Align" alignment="right" />
    </Flex>
  </>
);
