import React from "react";
import PropTypes from "prop-types";
import theme from "../theme";
import Text from "../Type/Text";

const HelpText = props => (
  <Text
    mb={ 0 }
    fontSize={ theme.fontSizes[0] }
    lineHeight={ theme.lineHeights.smallTextBase }
    { ...props }
  />
);

HelpText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

HelpText.defaultProps = {
  children: null,
};

export default HelpText;
