import React from "react";
import { useTheme } from "styled-components";
import { Text, Box, Flex, Heading3 } from "..";

export default {
  title: "Tokens",
};

const Palette = ({ colour, name }) => {
  return (
    <Box width={{ extraSmall: 1, small: 1 / 6 }}>
      <Box mr="x2" mb="x2" boxShadow="medium" overflow="hidden" borderRadius="small">
        <Box pt={{ extraSmall: "x4", small: "x8" }} pb={{ extraSmall: "x4", small: "x8" }} mb="x1" bg={colour} />
        <Text mb="half" px="x1">
          {name}
        </Text>
        <Text fontSize="small" px="x1" pb="x1">
          {colour}
        </Text>
      </Box>
    </Box>
  );
};

export const Colors = () => {
  const theme = useTheme();

  return (
    <Flex flexWrap="wrap">
      {Object.keys(theme.colors).map((color) => (
        <Palette key={color} colour={theme.colors[color]} name={color} />
      ))}
    </Flex>
  );
};

export const FontSizes = () => {
  const theme = useTheme();

  return (
    <Box>
      {Object.keys(theme.fontSizes).map((fontSize) => (
        <Text key={fontSize} mb="x2" fontSize={fontSize}>
          {fontSize}: {theme.fontSizes[fontSize]}
        </Text>
      ))}
    </Box>
  );
};

export const LineHeights = () => {
  const theme = useTheme();

  return (
    <Box maxWidth="500px">
      {Object.keys(theme.lineHeights).map((lineHeight) => (
        <>
          <Heading3>{lineHeight}</Heading3>
          <Box mb="x1">
            <Text lineHeight={lineHeight}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
            <Text lineHeight={lineHeight}>
              Maecenas at urna egestas, dignissim risus ut, posuere lorem. Orci varius natoque penatibus et magnis dis
              parturient montes, nascetur ridiculus mus.
            </Text>
          </Box>
        </>
      ))}
    </Box>
  );
};

export const FontWeights = () => {
  const theme = useTheme();
  return (
    <Box>
      {Object.keys(theme.fontWeights).map((fontWeight) => (
        <Text key={fontWeight} mb="x2" fontWeight={fontWeight}>
          {fontWeight}: {theme.fontWeights[fontWeight]}
        </Text>
      ))}
    </Box>
  );
};

export const SpaceAndSize = () => {
  const theme = useTheme();

  return (
    <Box>
      {Object.keys(theme.space).map((space) => (
        <Flex key={space} mb="x2" alignItems="center" width="300px">
          <Flex width="80px" justifyContent="flex-end" mr="x1">
            <Box bg="lightGrey" height={space} width={space} />
          </Flex>
          <Text>
            {space} ({theme.space[space]})
          </Text>
        </Flex>
      ))}
    </Box>
  );
};

export const Font = () => {
  const theme = useTheme();
  return (
    <Box>
      {Object.keys(theme.fonts).map((font) => (
        <Text key={font} mb="x2" fontFamily={font}>
          {font}: {theme.fonts[font]}
        </Text>
      ))}
    </Box>
  );
};

export const Shadows = () => {
  const theme = useTheme();
  return (
    <Box>
      {Object.keys(theme.shadows).map((shadow) => (
        <Box key={shadow} mb="x2" p="x1" borderRadius="small" boxShadow={shadow}>
          {shadow}: {theme.shadows[shadow]}
        </Box>
      ))}
    </Box>
  );
};

export const Radii = () => {
  const theme = useTheme();
  return (
    <Flex maxWidth="300px" flexDirection="column" alignItems="center">
      {Object.keys(theme.radii).map((radius) => (
        <Flex
          key={radius}
          mb="x2"
          p="x1"
          borderRadius={radius}
          bg="blue"
          color="white"
          size={radius === "circle" ? "200px" : "100%"}
          alignItems="center"
          justifyContent="center"
        >
          {radius}: {theme.radii[radius]}
        </Flex>
      ))}
    </Flex>
  );
};

export const Breakpoints = () => {
  const theme = useTheme();

  return (
    <Box>
      {Object.keys(theme.breakpoints)
        .filter((bp) => bp !== "map")
        .map((breakpoint) => (
          <Text mb="x2" key={breakpoint}>
            {breakpoint}: {theme.breakpoints[breakpoint]}
          </Text>
        ))}
    </Box>
  );
};
