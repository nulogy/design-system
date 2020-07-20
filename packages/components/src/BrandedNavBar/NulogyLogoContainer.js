import React from "react";
import PropTypes from "prop-types";
import NulogyLogo from "./NulogyLogo";
import { Flex } from "../Flex";
import { Box } from "../Box";
import { Text } from "../Type";

const borderStyle = "1px solid #e4e7eb";

export const NulogyLogoContainer = ({ subText, height }) => (
  <Flex
    px="x1"
    py="half"
    alignItems="center"
    // boxShadow="small"
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

NulogyLogoContainer.propTypes = {
  subText: PropTypes.string,
  height: PropTypes.string.isRequired
};

NulogyLogoContainer.defaultProps = {
  subText: undefined
};
