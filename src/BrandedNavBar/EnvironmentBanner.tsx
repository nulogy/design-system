import React from "react";
import { Box } from "../Box";
import { Text } from "../Type";

type EnvironmentBannerProps = {
  children?: React.ReactNode;
};

const EnvironmentBanner = ({ children }: EnvironmentBannerProps) => (
  <Box bg="darkBlue" textAlign="center">
    <Text
      fontSize={`${FONT_SIZE}px`}
      letterSpacing="0.5px"
      fontWeight="bold"
      color="white"
      textTransform="uppercase"
      py={`${PADDING_Y}px`}
    >
      {children}
    </Text>
  </Box>
);

export default EnvironmentBanner;
