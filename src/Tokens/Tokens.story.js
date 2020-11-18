import React from "react";

import { Text, Box, Flex, Heading3 } from "..";
import Theme from "../theme";

export default {
  title: "Tokens",
};

const Palette = ({ colour, name }) => {
  return (
    <Box width={{ extraSmall: 1, small: 1 / 6 }}>
      <Box
        mr="x2"
        mb="x2"
        boxShadow="medium"
        overflow="hidden"
        borderRadius="small"
      >
        <Box
          pt={{ extraSmall: "x4", small: "x8" }}
          pb={{ extraSmall: "x4", small: "x8" }}
          mb="x1"
          bg={colour}
        />
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

export const Colors = () => (
  <Flex flexWrap="wrap">
    {Object.keys(Theme.colors).map((color) => (
      <Palette key={color} colour={Theme.colors[color]} name={color} />
    ))}
  </Flex>
);

export const FontSizes = () => (
  <Box>
    {Object.keys(Theme.fontSizes).map((fontSize) => (
      <Text mb="x2" fontSize={fontSize}>
        {fontSize}: {Theme.fontSizes[fontSize]}
      </Text>
    ))}
  </Box>
);

export const LineHeights = () => (
  <Box maxWidth="500px">
    {Object.keys(Theme.lineHeights).map((lineHeight) => (
      <>
        <Heading3>{lineHeight}</Heading3>
        <Box mb="x1">
          <Text lineHeight={lineHeight}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <Text lineHeight={lineHeight}>
            Maecenas at urna egestas, dignissim risus ut, posuere lorem. Orci
            varius natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus.
          </Text>
        </Box>
      </>
    ))}
  </Box>
);

export const FontWeights = () => (
  <Box>
    {Object.keys(Theme.fontWeights).map((fontWeight) => (
      <Text mb="x2" fontWeight={fontWeight}>
        {fontWeight}: {Theme.fontWeights[fontWeight]}
      </Text>
    ))}
  </Box>
);

export const SpaceAndSize = () => (
  <Box>
    {Object.keys(Theme.space).map((space) => (
      <Flex mb="x2" alignItems="center" width="300px">
        <Flex width="80px" justifyContent="flex-end" mr="x1">
          <Box bg="lightGrey" height={space} width={space} />
        </Flex>
        <Text>
          {space} ({Theme.space[space]})
        </Text>
      </Flex>
    ))}
  </Box>
);

export const Font = () => (
  <Box>
    {Object.keys(Theme.fonts).map((font) => (
      <Text mb="x2" fontFamily={font}>
        {font}: {Theme.fonts[font]}
      </Text>
    ))}
  </Box>
);

export const Shadows = () => (
  <Box>
    {Object.keys(Theme.shadows).map((shadow) => (
      <Box mb="x2" p="x1" borderRadius="small" boxShadow={shadow}>
        {shadow}: {Theme.shadows[shadow]}
      </Box>
    ))}
  </Box>
);

export const Radii = () => (
  <Flex maxWidth="300px" flexDirection="column" alignItems="center">
    {Object.keys(Theme.radii).map((radius) => (
      <Flex
        mb="x2"
        p="x1"
        borderRadius={radius}
        bg="blue"
        color="white"
        size={radius === "circle" ? "200px" : "100%"}
        alignItems="center"
        justifyContent="center"
      >
        {radius}: {Theme.radii[radius]}
      </Flex>
    ))}
  </Flex>
);

export const Breakpoints = () => (
  <Box>
    {Object.keys(Theme.breakpoints).map((breakpoint) => (
      <Text mb="x2">
        {breakpoint}: {Theme.breakpoints[breakpoint]}
      </Text>
    ))}
  </Box>
);
