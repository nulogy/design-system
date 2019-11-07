import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box } from "../Box";
import { Text } from "../Type";
import theme from "../theme";

const Prefix = styled(Text)`
  margin-right: ${theme.space.x1};
  margin-top: ${theme.space.x1};
`;

const MaybePrefix = ({ prefix, prefixWidth, children, ...props }) =>
  prefix ? (
    <Box width={prefixWidth}>
      <Prefix>{prefix}</Prefix>
    </Box>
  ) : (
    <>{children}</>
  );

MaybePrefix.propTypes = {
  prefix: PropTypes.string,
  prefixWidth: PropTypes.string,
  children: PropTypes.node
};

MaybePrefix.defaultProps = {
  prefix: null,
  children: null,
  prefixWidth: null
};

export default MaybePrefix;
