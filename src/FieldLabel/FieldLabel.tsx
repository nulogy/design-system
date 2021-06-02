import React from "react";
import styled from "styled-components";
import { space, color } from "styled-system";
import PropTypes from "prop-types";
import { Box } from "../Box";
import RequirementText from "./RequirementText";
import HelpText from "./HelpText";
import { FieldLabelProps, FieldLabelDefaultProps } from "./FieldLabel.type";

const Label = styled.label(space, color, () => ({
  display: "inline-block",
}));

Label.propTypes = {
  color: PropTypes.string,
};

Label.defaultProps = {
  color: "black",
};

const LabelText = styled.span(({ theme }) => ({
  fontSize: theme.fontSizes.small,
  fontWeight: theme.fontWeights.bold,
  lineHeight: theme.lineHeights.smallTextCompressed,
}));

const FieldLabel = ({
  labelText,
  requirementText,
  helpText,
  children,
  ...props
}) => (
  <Label style={{ display: "block" }} {...props}>
    <Box mb={children && "x1"} data-testid="field-label">
      <LabelText data-testid="label-text">{labelText}</LabelText>
      {requirementText && (
        <RequirementText data-testid="requirement-text">
          {requirementText}
        </RequirementText>
      )}
      {helpText && <HelpText data-testid="help-text">{helpText}</HelpText>}
    </Box>
    {children}
  </Label>
);

FieldLabel.propTypes = FieldLabelProps;

FieldLabel.defaultProps = FieldLabelDefaultProps;

export default FieldLabel;
