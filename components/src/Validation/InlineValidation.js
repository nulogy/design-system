import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Text } from "../Type";
import { Icon } from "../Icon";
import { Flex } from "../Flex";
import mapErrorsToList from "./mapErrorsToList";

const Wrapper = styled.div(({ theme }) => ({
  [`${Text}`]: {
    marginBottom: theme.space.x1
  },
  "> *:last-child": {
    marginBottom: 0
  }
}));

const InlineValidation = ({ className, errorMessage, errorList, children, ...boxProps }) =>
  errorMessage || errorList ? (
    <Flex className={className} color="red" {...boxProps}>
      <Icon icon="error" mr="x1" />
      <Wrapper>
        {errorMessage && <Text>{errorMessage}</Text>}
        {mapErrorsToList(errorList)}
        {children}
      </Wrapper>
    </Flex>
  ) : null;

InlineValidation.propTypes = {
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  errorList: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

InlineValidation.defaultProps = {
  className: undefined,
  errorMessage: null,
  errorList: null,
  children: null
};

export default InlineValidation;
