import React from "react";
import { Box } from "../Box";
import { Flex } from "../Flex";
import HelpText from "./HelpText";
import Label from "./Label";
import LabelText from "./LabelText";
import RequirementText from "./RequirementText";
import { FieldLabelProps } from "./FieldLabel.type";
import { Tooltip } from "../Tooltip";
import { Icon } from "../Icon";

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
        <LabelText data-testid="label-text" //</Box>display="flex" flexWrap="wrap" gap="half" 
        >
          <span>{labelText}</span>
          {requirementText && (
            <RequirementText data-testid="requirement-text" ml="none">
              {requirementText}
            </RequirementText>
          )}
          {hint && (
            <Tooltip tooltip={hint}>
              <Icon color="darkGrey" size="x2" icon="info" />
            </Tooltip>
          )}
        </LabelText>

        {helpText && <HelpText data-testid="help-text">{helpText}</HelpText>}
      </Box>
      {children}
    </Label>
  );
}
