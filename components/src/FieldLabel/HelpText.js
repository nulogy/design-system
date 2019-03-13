import React from "react";
import PropTypes from "prop-types";
import { Text } from "ComponentsRoot";
import theme from "../theme";

const HelpText = props => (
  <Text
    fontSize={ theme.fontSizes.small } lineHeight={ theme.lineHeights.smallTextBase }
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
