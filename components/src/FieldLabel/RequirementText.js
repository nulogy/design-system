import React from "react";
import PropTypes from "prop-types";
import { Text } from "../Type";

const RequirementText = props => <Text inline ml="x1" fontSize="12px" color="darkGrey" {...props} />;

RequirementText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

RequirementText.defaultProps = {
  children: null
};

export default RequirementText;
