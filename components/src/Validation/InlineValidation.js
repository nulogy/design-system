import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import { Text, Icon, Flex } from "../index";

const Wrapper = styled.div({
  [`${Text}`]: {
    marginBottom: theme.space[2],
  },
  "> *:last-child": {
    marginBottom: 0,
  },
});

const InlineValidation = ({
  message,
  children,
  ...boxProps
}) => (
  <Flex color={ theme.colors.red } { ...boxProps }>
    <Icon icon="error" mr={ 2 } />
    <Wrapper>
      <Text>{message}</Text>
      {children}
    </Wrapper>
  </Flex>
);

InlineValidation.propTypes = {
  message: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

InlineValidation.defaultProps = {
  children: null,
};

export default InlineValidation;
