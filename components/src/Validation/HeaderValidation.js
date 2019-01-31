import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { space } from "styled-system";
import theme from "../theme";
import Flex from "../Flex/Flex";
import Text from "../Type/Text";
import { SubsectionTitle } from "../Type/Headings";
import Icon from "../Icon/Icon";


const Wrapper = styled.div`
  ${space}
  ${Text} {
    margin-bottom: ${theme.space[2]};
  }
  > *:last-child {
   margin-bottom: 0;
 }
`;

Wrapper.propTypes = {
  ...space.propTypes,
};

const HeaderValidation = ({
  title,
  message,
  children,
}) => (
  <Flex color="red">
    <Icon name="error" size={ theme.space[6] } mr={ theme.space[3] } />
    <Wrapper>
      <SubsectionTitle mb={ theme.space[0] }>{ title }</SubsectionTitle>
      <Text mb={ theme.space[0] }>{ message }</Text>
      { children }
    </Wrapper>
  </Flex>
);

HeaderValidation.defaultProps = {
  children: null,
};

HeaderValidation.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default HeaderValidation;
