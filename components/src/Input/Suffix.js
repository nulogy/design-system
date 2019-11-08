import React from "react";
import PropTypes from "prop-types";
import { Box } from "../Box";
import { Text } from "../Type";

const Suffix = ({ suffix, suffixWidth, ...props }) =>
  suffix && (
    <Box width={suffixWidth} pt="x1" pb="x1" pl="x1">
      <Text {...props}>{suffix}</Text>
    </Box>
  );

Suffix.propTypes = {
  suffix: PropTypes.string,
  suffixWidth: PropTypes.string,
  children: PropTypes.node
};

Suffix.defaultProps = {
  suffix: null,
  children: null,
  suffixWidth: null
};

export default Suffix;
