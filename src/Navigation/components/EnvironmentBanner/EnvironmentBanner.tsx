import React from "react";
import { Box } from "../../../Box";
import { Text } from "../../../Type";

export type EnvironmentBannerProps = {
  children?: React.ReactNode;
};

const EnvironmentBanner = ({ children }: EnvironmentBannerProps) => (
  <Box bg="darkBlue" textAlign="center">
    <Text fontSize="10px" letterSpacing="0.5px" fontWeight="bold" color="white" textTransform="uppercase" py="2px">
      {children}
    </Text>
  </Box>
);

export default EnvironmentBanner;
