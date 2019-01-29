import React from "react";
import PropTypes from "prop-types";
import theme from "../theme";
import Flex from "../Flex/Flex";
import Box from "../Box/Box";
import Text from "../Type/Text";
import { SubsectionTitle } from "../Type/Headings";
import Icon from "../Icon/Icon";

const HeaderValidation = props => {
  const {
    title,
    message,
    children,
  } = props;
  return (
    <Box color="red" >
      <Flex mb={ theme.space[2] }>
        <Icon name="error" size={ theme.space[6] } mr={ theme.space[3] } />
        <Box>
          <SubsectionTitle mb={ 0 }>{ props.title }</SubsectionTitle>
          <Text mb={ theme.space[0] }>{ props.message }</Text>
        </Box>
      </Flex>
      {props.children}
    </Box>
  );
};

HeaderValidation.defaultProps = {
  children: []
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
