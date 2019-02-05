import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Box from "../Box/Box";
import Label from "./Label";
import RequirementText from "./RequirementText";
import HelpText from "./HelpText";
import FormatText from "./FormatText";

const BaseField = ({
  labelText,
  requirementText,
  helpText,
  formatText,
  children,
  ...labelProps
}) => (
  <Label { ...labelProps }>
    <Box mb={ 2 }>
      {labelText}
      <RequirementText>{requirementText}</RequirementText>
      <HelpText>{helpText}</HelpText>
      <FormatText>{formatText}</FormatText>
    </Box>
    {children}
  </Label>
);

const Field = styled(BaseField)``;

Field.propTypes = {
  labelText: PropTypes.string.isRequired,
  requirementText: PropTypes.string,
  helpText: PropTypes.string,
  formatText: PropTypes.string,
  children: PropTypes.node,
};

Field.defaultProps = {
  children: [],
  requirementText: null,
  helpText: null,
  formatText: null,
};

export default Field;
