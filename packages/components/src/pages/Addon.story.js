import React from "react";
import styled from "styled-components";
import { Box, Text, Flex, Heading3 } from "@nulogy/components";

const ThemeInput = styled.input(({ theme }) => ({
  fontFamily: `${theme.fonts.mono} !important`,
  padding: 0,
  fontSize: theme.fontSizes.small,
  border: 0,
  borderBottom: "1px solid #000",
  transition: ".2s",
  "&:focus": {
    outline: "none",
    boxShadow: "1px 1px 1px 0px rgba(0,0,0,1)"
  },
  lineHeight: theme.lineHeights.base
}));

const ThemeKey = styled(Text)(({ theme }) => ({
  display: "inline-block",
  width: "110px",
  fontSize: theme.fontSizes.small,
  fontFamily: `${theme.fonts.mono} !important`,
  marginRight: theme.space.x3
}));

export const Default = () => (
  <>
    <Box mb="x3">
      <Heading3 as="h2" fontWeight="light">
        colours
      </Heading3>
      <Flex alignItems="center" mb="x1">
        <ThemeKey>black</ThemeKey>
        <ThemeInput defaultValue="#000000" />
      </Flex>
      <Flex alignItems="center" mb="x1">
        <ThemeKey>blackBlue</ThemeKey>
        <ThemeInput defaultValue="#ffffff" />
      </Flex>
      <Flex alignItems="center" mb="x1">
        <ThemeKey>black</ThemeKey>
        <ThemeInput defaultValue="#000000" />
      </Flex>
      <Flex alignItems="center" mb="x1">
        <ThemeKey>blackBlue</ThemeKey>
        <ThemeInput defaultValue="#ffffff" />
      </Flex>
    </Box>
    <Box mb="x3">
      <Heading3 as="h2" fontWeight="light">
        fontSizes
      </Heading3>
      <Flex alignItems="center" mb="x1">
        <ThemeKey>smaller</ThemeKey>
        <ThemeInput defaultValue="24px" />
      </Flex>
      <Flex alignItems="center" mb="x1">
        <ThemeKey>blackBlue</ThemeKey>
        <ThemeInput defaultValue="14px" />
      </Flex>
    </Box>
  </>
);

export default {
  title: "Pages/Addon"
};
