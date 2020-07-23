import React from "react";
import PropTypes from "prop-types";
import { Box } from "../Box";
import { Text } from "../Type";

const Prefix = ({ prefix, prefixWidth, ...props }) =>
  prefix && (
    <Box width={prefixWidth} pt="x1" pr="x1" pb="x1">
      <Text {...props}>{prefix}</Text>
    </Box>
  );

Prefix.propTypes = {
  prefix: PropTypes.string,
  prefixWidth: PropTypes.string,
  children: PropTypes.node
};

Prefix.defaultProps = {
  prefix: null,
  children: null,
  prefixWidth: null
};

export default Prefix;
