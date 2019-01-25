import React from "react";
import PropTypes from "prop-types";
import theme from "../theme.js";
import Text from "../Type/Text.js";
import Box from "../Box/Box.js";

const LabelText = props => (
  <Text 
    display="inline" 
    mb={ 0 } 
    fontSize={ theme.fontSizes[1] }
  >
    {props.children}
  </Text>
)

const RequirementText = props => (
  <Text 
    display="inline" 
    mb={ 0 } 
    ml={ 2 }
    fontSize="12px"
    color="darkGrey"
  >
    {props.children}
  </Text>
)

const HelpText = props => (
  <Text 
    mb={ 0 } 
    fontSize={ theme.fontSizes[0] }
    lineHeight={ theme.lineHeights.smallTextBase }
  >
  {props.children}
  </Text>
)

const FormatText = props => (
  <Text 
    mb={ 0 } 
    fontSize="12px"
    lineHeight="16px"
    color="darkGrey"
  >
  {props.children}
  </Text>
)

const Label = props => {
  const {
    labelText,
    requirementText,
    helpText,
    formatText,
  } = props;
  return(
    <Box { ...props }>
      <LabelText>{labelText}</LabelText>
      <RequirementText>{requirementText}</RequirementText>
      <HelpText>{helpText}</HelpText>
      <FormatText>{formatText}</FormatText>
    </Box>
  )
};

Label.propTypes = {
  labelText: PropTypes.string.isRequired,
  requirementText: PropTypes.string,
  helpText: PropTypes.string,
  formatText: PropTypes.string,
};

Label.defaultProps = {
  requirementText: null,
  helpText: null,
  formatText: null,
};

export default Label;
