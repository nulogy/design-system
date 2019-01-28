import React from "react";
import PropTypes from "prop-types";
import theme from "../theme";
import Text from "../Type/Text";
import Box from "../Box/Box";

export const LabelText = props => (
  <Text
    display="inline"
    mb={ 0 }
    fontSize={ theme.fontSizes[1] }
    { ...props }
  />
);

LabelText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

LabelText.defaultProps = {
  children: null,
};

export const RequirementText = props => (
  <Text
    display="inline"
    mb={ 0 }
    ml={ 2 }
    fontSize="12px"
    color="darkGrey"
    { ...props }
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

export const HelpText = props => (
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

export const FormatText = props => (
  <Text
    mb={ 0 }
    fontSize="12px"
    lineHeight="16px"
    color="darkGrey"
    { ...props }
  />
);

FormatText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

FormatText.defaultProps = {
  children: null,
};

const Label = ({
  labelText, 
  requirementText, 
  helpText, 
  formatText, 
  ...boxProps,
}) => {
  return (
    <Box { ...boxProps }>
      <LabelText>{labelText}</LabelText>
      <RequirementText>{requirementText}</RequirementText>
      <HelpText>{helpText}</HelpText>
      <FormatText>{formatText}</FormatText>
    </Box>
  );
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
