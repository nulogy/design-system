import React from "react";
import { Box } from "../Box";
import HelpText from "./HelpText";
import Label from "./Label";
import LabelText from "./LabelText";
import RequirementText from "./RequirementText";
import { FieldLabelProps, FieldLabelDefaultProps } from "./FieldLabel.type";

const FieldLabel = ({
  labelText,
  requirementText,
  helpText,
  children,
  ...props
}: FieldLabelProps) => (
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

FieldLabel.defaultProps = FieldLabelDefaultProps;

export default FieldLabel;
