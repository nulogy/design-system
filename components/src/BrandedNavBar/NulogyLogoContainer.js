import React from "react";
import PropTypes from "prop-types";
import NulogyLogo from "./NulogyLogo";
import { Flex } from "../Flex";
import { Box } from "../Box";
import { Text } from "../Type";

export const NulogyLogoContainer = ({ subText }) => (
  <Flex
    boxShadow="small"
    borderRadius="medium"
    px="x1"
    py="half"
    alignItems="center"
    flexDirection={subText ? "column" : "row"}
    minHeight="36px"
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

NulogyLogoContainer.propTypes = {
  subText: PropTypes.string
};

NulogyLogoContainer.defaultProps = {
  subText: undefined
};
