import React from "react";
import { Box } from "../Box";
import { Icon } from "../Icon";
import { Tooltip } from "../Tooltip";
import HelpText from "./HelpText";
import Label from "./Label";
import RequirementText from "./RequirementText";
import { FieldLabelProps } from "./FieldLabel.type";
import { LabelContent, LabelText } from "./LabelText";

export default function FieldLabel({
  labelText,
  requirementText,
  helpText,
  hint,
  children,
  ...props
}: FieldLabelProps) {
  return (
    <Label display="block" {...props}>
      <Box mb={children && "x1"} data-testid="field-label">
        <LabelContent data-testid="label-content">
          <LabelText data-testid="label-text">{labelText}</LabelText>
          {requirementText && (
            <RequirementText ml="none" data-testid="requirement-text">
              {requirementText}
            </RequirementText>
          )}
          {hint && (
            <Tooltip tooltip={hint}>
              <Icon color="darkGrey" size="x2" icon="info" />
            </Tooltip>
          )}
        </LabelContent>
        {helpText && <HelpText data-testid="help-text">{helpText}</HelpText>}
      </Box>
      {children}
    </Label>
  );
}
