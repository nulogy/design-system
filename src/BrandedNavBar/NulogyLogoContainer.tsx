import React from "react";
import { Flex } from "../Flex";
import { Box } from "../Box";
import { Text } from "../Type";
import NulogyLogo from "./NulogyLogo";

const borderStyle = "1px solid #e4e7eb";

type NulogyLogoContainerProps = {
  subText?: string;
  height?: string;
};

/** @deprecated The BrandedNavBar component is deprecated. Use the Navigation component instead. */
export const NulogyLogoContainer = ({ subText, height }: NulogyLogoContainerProps) => (
  <Flex
    px="x1"
    py="half"
    alignItems="center"
    justifyContent="center"
    flexDirection={subText ? "column" : "row"}
    height={height}
    borderLeft={borderStyle}
    borderRight={borderStyle}
  >
    <Box width="76px" height="18px">
      <NulogyLogo />
    </Box>
    {subText && (
      <Text
        fontSize="8px"
        lineHeight="10px"
        color="darkGrey"
        fontWeight="medium"
        textTransform="uppercase"
        letterSpacing=".5px"
      >
        {subText}
      </Text>
    )}
  </Flex>
);
