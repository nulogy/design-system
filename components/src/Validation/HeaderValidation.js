import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Flex } from "../Flex";
import { Text, SubsectionTitle } from "../Type";
import { Icon } from "../Icon";
import theme from "../theme";

const Wrapper = styled.div({
  [`${Text}`]: {
    marginBottom: theme.space.x1,
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
    <Icon icon="error" size={ theme.space.x6 } mr={ theme.space.x2 } />
    <Wrapper>
      <SubsectionTitle mb="none">{ title }</SubsectionTitle>
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
