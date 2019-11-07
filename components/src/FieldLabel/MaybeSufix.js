import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box } from "../Box";
import { Text } from "../Type";
import theme from "../theme";

const Sufix = styled(Text)`
  margin-left: ${theme.space.x1};
  margin-top: ${theme.space.x1};
`;

const MaybeSufix = ({ sufix, sufixWidth, children, ...props }) =>
  sufix ? (
    <Box width={sufixWidth}>
      <Sufix>{sufix}</Sufix>
    </Box>
  ) : (
    <>{children}</>
  );

MaybeSufix.propTypes = {
  sufix: PropTypes.string,
  sufixWidth: PropTypes.string,
  children: PropTypes.node
};

MaybeSufix.defaultProps = {
  sufix: null,
  children: null,
  sufixWidth: null
};

export default MaybeSufix;
