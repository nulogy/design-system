import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import {
  Flex,
  Text,
  SubsectionTitle,
  Icon,
} from "../index";

const Wrapper = styled.div({
  [`${Text}`]: {
    marginBottom: theme.space[2],
  },
  "> *:last-child": {
    marginBottom: 0,
  },
});

const BaseHeaderValidation = ({
  title,
  message,
  children,
  ...boxProps
}) => (
  <Flex color="red" { ...boxProps }>
    <Icon icon="error" size={ theme.space[6] } mr={ theme.space[3] } />
    <Wrapper>
      <SubsectionTitle mb={ theme.space[0] }>{ title }</SubsectionTitle>
      <Text>{ message }</Text>
      { children }
    </Wrapper>
  </Flex>
);

const HeaderValidation = styled(BaseHeaderValidation)({});

BaseHeaderValidation.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

BaseHeaderValidation.defaultProps = {
  children: null,
};

export default HeaderValidation;
