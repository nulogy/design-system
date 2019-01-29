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
          <SubsectionTitle mb={ 0 }>{ title }</SubsectionTitle>
          <Text mb={ theme.space[0] }>{ message }</Text>
        </Box>
      </Flex>
      {children}
    </Box>
  );
};

HeaderValidation.defaultProps = {
  children: [{
     mb: 0,
     pl: 7,
  }]
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
