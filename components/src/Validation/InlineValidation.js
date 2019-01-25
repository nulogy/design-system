import React from "react";
import PropTypes from "prop-types";
import theme from "../theme";
import Text from "../Type/Text";
import Icon from "../Icon/Icon";
import Flex from "../Flex/Flex";
import Box from "../Box/Box";
import icons from "../../icons/icons.json";

export const iconNames = Object.keys(icons);

const InlineValidation = props => {
  const {
    color,
    icon,
    message,
    children,
  } = props;
  return (
    <Box color={ color }>
      <Flex my={ 2 }>
        <Icon { ...icon } />
        <Text mb={ 0 }>{message}</Text>
      </Flex>
      {children}
    </Box>
  );
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

InlineValidation.propTypes = {
  message: PropTypes.string.isRequired,
  icon: PropTypes.shape({}),
  color: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default InlineValidation;
