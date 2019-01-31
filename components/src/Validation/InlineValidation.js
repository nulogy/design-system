import React from "react";
import PropTypes from "prop-types";
import theme from "../theme";
import Text from "../Type/Text";
import Icon from "../Icon/Icon";
import Flex from "../Flex/Flex";
import Box from "../Box/Box";

const InlineValidation = ({
  color,
  icon,
  message,
  children,
  ...boxProps
}) => (
  <Flex color={ color } mb={ 2 } { ...boxProps }>
    <Icon { ...icon } />
    <Box>
      <Text mb={ 0 }>{message}</Text>
      {children}
    </Box>
  </Flex>
);


InlineValidation.propTypes = {
  message: PropTypes.string.isRequired,
  icon: PropTypes.shape({}),
  color: PropTypes.string,
  children: PropTypes.node,
};

InlineValidation.defaultProps = {
  color: "red",
  icon: {
    name: "error",
    size: theme.space[4],
    mr: 1,
  },
  children: [],
};

export default InlineValidation;
