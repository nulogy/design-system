import React from "react";
import PropTypes from "prop-types";
import { Box } from "../Box";
import { Text } from "../Type";

const Sufix = ({ sufix, sufixWidth, children, ...props }) =>
  sufix ? (
    <Box width={sufixWidth} pt="x1" pb="x1" pl="x1">
      <Text {...props}>{sufix}</Text>
    </Box>
  ) : (
    <>{children}</>
  );

Sufix.propTypes = {
  sufix: PropTypes.string,
  sufixWidth: PropTypes.string,
  children: PropTypes.node
};

Sufix.defaultProps = {
  sufix: null,
  children: null,
  sufixWidth: null
};

export default Sufix;
