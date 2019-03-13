import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import PropTypes from "prop-types";
import { RequirementText, HelpText } from "ComponentsRoot";
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
  ...props
}) => (
  <Label style={ { display: "block" } } htmlFor={ htmlFor } { ...props }>
    {labelText}
    {requirementText && (<RequirementText>{requirementText}</RequirementText>)}
    {helpText && (<HelpText>{helpText}</HelpText>)}
  </Label>
);

BaseFieldLabel.propTypes = {
  labelText: PropTypes.string.isRequired,
  requirementText: PropTypes.string,
  helpText: PropTypes.string,
  htmlFor: PropTypes.string,
  id: PropTypes.string,
  ...space.PropTypes,
};

BaseFieldLabel.defaultProps = {
  requirementText: null,
  helpText: null,
  htmlFor: undefined,
  id: undefined,
};

const FieldLabel = styled(BaseFieldLabel)({});

export default FieldLabel;
