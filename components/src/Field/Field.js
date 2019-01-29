import React from "react";
import PropTypes from "prop-types";
import Label from "./Label";
import RequirementText from "./RequirementText";
import HelpText from "./HelpText";
import FormatText from "./FormatText";

const Field = ({
  labelText, 
  requirementText, 
  helpText, 
  formatText,
  children, 
  ...labelProps,
}) => {
  return (
    <Label mb = { 10 } { ...labelProps }>
      {labelText}
      <RequirementText>{requirementText}</RequirementText>
      <HelpText>{helpText}</HelpText>
      <FormatText>{formatText}</FormatText>
      {children}
    </Label>
  );
};

Field.propTypes = {
  labelText: PropTypes.string.isRequired,
  requirementText: PropTypes.string,
  helpText: PropTypes.string,
  formatText: PropTypes.string,
  children: PropTypes.node,
};

Field.defaultProps = {
  requirementText: null,
  helpText: null,
  formatText: null,
};

export default Field;
