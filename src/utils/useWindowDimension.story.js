import React from "react";
import { Box } from "../Box";
import { Flex } from "../Flex";
import { Heading4, Text } from "../Type";
import useWindowDimensions from "./useWindowDimensions";

export default {
  title: "utils/useWindowDimensions",
};

export const _UseWindowDimensions = () => {
  const { width, height, widthBreakpoints } = useWindowDimensions();
  return (
    <Box width="400px">
      <Heading4>Current window dimensions:</Heading4>
      <Flex fontSize="large" justifyContent="space-between" my="half">
        <Text>width:</Text>
        <Text>{String(width)}</Text>
      </Flex>
      <Flex fontSize="large" justifyContent="space-between" my="half">
        <Text>height:</Text>
        <Text>{String(height)}</Text>
      </Flex>
      <hr></hr>
      <Box mt="x1">
        {Object.keys(widthBreakpoints).map((key) => (
          <Flex justifyContent="space-between" my="half" key={key}>
            <Text>{key}:</Text>
            <Text>{String(widthBreakpoints[key])}</Text>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};
