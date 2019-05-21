import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Text } from "../Type";
import { Icon } from "../Icon";
import { Flex } from "../Flex";
import { mapErrorsToList } from ".";
import theme from "../theme";

const Wrapper = styled.div({
  [`${Text}`]: {
    marginBottom: theme.space.x1
  },
  "> *:last-child": {
    marginBottom: 0
  }
});

const InlineValidation = ({ errorMessage, errorList, children, ...boxProps }) =>
  errorMessage || errorList ? (
    <Flex color={theme.colors.red} {...boxProps}>
      <Icon icon="error" mr="x1" />
      <Wrapper>
        {errorMessage && <Text>{errorMessage}</Text>}
        {mapErrorsToList(errorList)}
        {children}
      </Wrapper>
    </Flex>
  ) : null;

InlineValidation.propTypes = {
  errorMessage: PropTypes.string,
  errorList: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

InlineValidation.defaultProps = {
  errorMessage: null,
  errorList: null,
  children: null
};

export default InlineValidation;
