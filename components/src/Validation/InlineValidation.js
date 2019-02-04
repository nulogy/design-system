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
  <Box color={ theme.colors.red } mb={ 2 } { ...boxProps }>
    <Flex>
      <Icon name="error" />
      <Text mb={ 0 } ml={ 1 }>{message}</Text>
    </Flex>
    {children}
  </Box>
);

InlineValidation.propTypes = {
  message: PropTypes.string.isRequired,
  children: PropTypes.node,
};

InlineValidation.defaultProps = {
  children: [],
};

export default InlineValidation;
