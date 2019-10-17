import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Text } from "../Type";
import { Link } from "../Link";
import theme from "../theme";

const HelpTextContent = styled(Text)({
  fontSize: theme.fontSizes.small,
  lineHeight: theme.lineHeights.smallTextBase,

  [`${Link}`]: {
    fontSize: theme.fontSizes.small
  }
});

const HelpText = props => <HelpTextContent {...props} />;

HelpText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

HelpText.defaultProps = {
  children: null
};

export default HelpText;
