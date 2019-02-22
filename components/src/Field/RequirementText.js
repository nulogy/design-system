import React from "react";
import PropTypes from "prop-types";
import { Text } from "../index";

const RequirementText = props => (
  <Text
    inline ml={ 2 } fontSize="12px"
    color="darkGrey" { ...props }
  />
);

RequirementText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

RequirementText.defaultProps = {
  children: null,
};

export default RequirementText;
