import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import Text from "../Type/Text";
import Icon from "../Icon/Icon";
import Flex from "../Flex/Flex";
import Box from "../Box/Box";
import icons from "../../icons/icons.json";

export const iconNames = Object.keys(icons);

const InlineValidation = props => (
  <Box color={ props.color }>
    <Flex my={ 2 }>
      <Icon {...props.icon} size={ theme.space[4] } mr={ 1 } />
      <Text mb={ 0 }>{props.message}</Text>
    </Flex>
    {props.children}
  </Box>
);

InlineValidation.defaultProps = {
  color: "red",
  icon: { name: "error" },
};

InlineValidation.propTypes = {
  icon: PropTypes.shape({}).isRequired,
  message: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default InlineValidation;
