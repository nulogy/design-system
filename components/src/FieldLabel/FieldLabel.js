import React from "react";
import styled from "styled-components";
import { space, color } from "styled-system";
import PropTypes from "prop-types";
import { Box } from "../Box";
import RequirementText from "./RequirementText";
import HelpText from "./HelpText";
import { FieldLabelProps, FieldLabelDefaultProps } from "./FieldLabel.type";

const Label = styled.label(space, color, () => ({
  display: "inline-block"
}));

Label.propTypes = {
  color: PropTypes.string
};

Label.defaultProps = {
  color: "black"
};

const LabelText = styled.span(({ theme }) => ({
  fontSize: theme.fontSizes.small,
  fontWeight: theme.fontWeights.bold,
  lineHeight: theme.lineHeights.smallTextCompressed
}));

const BaseFieldLabel = ({ labelText, requirementText, helpText, children, ...props }) => (
  <Label style={{ display: "block" }} {...props}>
    <Box mb={children && "x1"} data-testid="field-label">
      <LabelText>{labelText}</LabelText>
      {requirementText && <RequirementText>{requirementText}</RequirementText>}
      {helpText && <HelpText>{helpText}</HelpText>}
    </Box>
    {children}
  </Label>
);

BaseFieldLabel.propTypes = FieldLabelProps;

BaseFieldLabel.defaultProps = FieldLabelDefaultProps;

const FieldLabel = styled(BaseFieldLabel)({});

export default FieldLabel;
