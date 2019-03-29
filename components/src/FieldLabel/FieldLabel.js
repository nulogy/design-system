import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import PropTypes from "prop-types";
import { Box, RequirementText, HelpText } from "ComponentsRoot";
import theme from "../theme";

const Label = styled.label(
  space,
  {
    display: "inline-block",
    fontSize: theme.fontSizes.medium,
  }
);

const BaseFieldLabel = ({
  labelText,
  requirementText,
  helpText,
  htmlFor,
  children,
  ...props
}) => (
  <Label style={ { display: "block" } } htmlFor={ htmlFor } { ...props }>
    <Box mb={children && "x1"}> 
      {labelText}
      {requirementText && (<RequirementText>{requirementText}</RequirementText>)}
      {helpText && (<HelpText>{helpText}</HelpText>)}
    </Box>
    {children}
  </Label>
);

BaseFieldLabel.propTypes = {
  labelText: PropTypes.string.isRequired,
  children: PropTypes.node,
  requirementText: PropTypes.string,
  helpText: PropTypes.string,
  htmlFor: PropTypes.string,
  id: PropTypes.string,
  ...space.PropTypes,
};

BaseFieldLabel.defaultProps = {
  children: null,
  requirementText: null,
  helpText: null,
  htmlFor: undefined,
  id: undefined,
};

const FieldLabel = styled(BaseFieldLabel)({});

export default FieldLabel;
