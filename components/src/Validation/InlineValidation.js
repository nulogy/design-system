import React from "react";
import PropTypes from "prop-types";
import theme from "../theme";
import Text from "../Type/Text";
import Icon from "../Icon/Icon";
import Flex from "../Flex/Flex";
import Box from "../Box/Box";

const InlineValidation = ({
  message,
  children,
  ...boxProps
}) => (
  <Flex color={ theme.colors.red } mb={ 2 } { ...boxProps }>
    <Icon icon="error" mr={ 2 } />
    <Box>
      <Text mb={ 0 }>{message}</Text>
      {children}
    </Box>
  </Flex>
);

InlineValidation.propTypes = {
  message: PropTypes.string.isRequired,
  children: PropTypes.node,
};

InlineValidation.defaultProps = {
  children: [],
};

export default InlineValidation;
