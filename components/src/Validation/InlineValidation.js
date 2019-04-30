import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Text } from "../Type";
import { Icon } from "../Icon";
import { Flex } from "../Flex";
import theme from "../theme";

const Wrapper = styled.div({
  [`${Text}`]: {
    marginBottom: theme.space.x1,
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
    <Icon icon="error" mr="x1" />
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
