import React from "react";
import { Box } from "../Box";
import { Flex } from "../Flex";
import HelpText from "./HelpText";
import Label from "./Label";
import LabelText from "./LabelText";
import RequirementText from "./RequirementText";
import { FieldLabelProps } from "./FieldLabel.type";
import FramedIcon from "./FramedIcon";

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
        <Flex alignItems="center">
          <Flex>
            <LabelText data-testid="label-text">{labelText}</LabelText>
            {requirementText && <RequirementText data-testid="requirement-text">{requirementText}</RequirementText>}
          </Flex>
          {hint && (
            <Flex display="inline-flex" ml="x0_25">
              <FramedIcon iconSize="x2" icon="info" tooltip={hint} />
            </Flex>
          )}
        </Flex>
        {helpText && <HelpText data-testid="help-text">{helpText}</HelpText>}
      </Box>
      {children}
    </Label>
  );
}
