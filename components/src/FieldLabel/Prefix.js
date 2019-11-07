import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box } from "../Box";
import { Text } from "../Type";
import theme from "../theme";

const Prefix = ({ prefix, prefixWidth, children, ...props }) =>
  prefix ? (
    <Box width={prefixWidth} pt="x1" pr="x1" pb="x1">
      <Text {...props}>{prefix}</Text>
    </Box>
  ) : (
    <>{children}</>
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
