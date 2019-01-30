import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { space } from "styled-system";
import theme from "../theme";
import Flex from "../Flex/Flex";
import Box from "../Box/Box";
import Text from "../Type/Text";
import { SubsectionTitle } from "../Type/Headings";
import Icon from "../Icon/Icon";


const Stack = styled.div`
  ${space}

  border: solid 1px lime;

 ${ Flex } div &:last-child {
   border: solid 1px red;
   margin-bottom: 0;
`;

Stack.propTypes = {
  ...space.propTypes,
};

const HeaderValidation = ({
  title,
  message,
  children,
}) => (
    <Flex color="red">
      <Icon name="error" size={ theme.space[6] } mr={ theme.space[3] } />
      <div>
        <SubsectionTitle mb={ theme.space[0] }>{ title }</SubsectionTitle>
        <Stack mb={ theme.space[2] }>
          <Text mb={ theme.space[0] }>{ message }</Text>
        </Stack>
        { children }
      </div>
    </Flex>
);

HeaderValidation.defaultProps = {
  children: null
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
