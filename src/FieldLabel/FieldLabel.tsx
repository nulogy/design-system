import React from "react";
import { Box } from "../Box";
import { Flex } from "../Flex";
import HelpText from "./HelpText";
import Label from "./Label";
import LabelText from "./LabelText";
import RequirementText from "./RequirementText";
import { FieldLabelProps, FieldLabelDefaultProps } from "./FieldLabel.type";
import FramedIcon from "./FramedIcon";

const FieldLabel = ({ labelText, requirementText, helpText, hint, children, ...props }: FieldLabelProps) => (
  <Label display="block" {...props}>
    <Box mb={children && "x1"} data-testid="field-label">
      <Flex alignItems="center">
        <Flex alignItems="baseline">
          <LabelText data-testid="label-text">{labelText}</LabelText>
          {requirementText && <RequirementText data-testid="requirement-text">{requirementText}</RequirementText>}
        </Flex>
        {hint && (
          <Flex display="inline-flex" ml="half">
            <FramedIcon iconSize="20px" icon="info" tooltip={hint} />
          </Flex>
        )}
      </Flex>
      {helpText && <HelpText data-testid="help-text">{helpText}</HelpText>}
    </Box>
    {children}
  </Label>
);

FieldLabel.defaultProps = FieldLabelDefaultProps;

export default FieldLabel;
