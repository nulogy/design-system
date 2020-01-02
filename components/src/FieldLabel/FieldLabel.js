import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import PropTypes from "prop-types";
import { Box } from "../Box";
import RequirementText from "./RequirementText";
import HelpText from "./HelpText";
import theme from "../theme";

const labelTextStyles = {
  fontSize: theme.fontSizes.small,
  fontWeight: theme.fontWeights.bold,
  lineHeight: theme.lineHeights.smallTextBase
};

const Label = styled.label(space, ({ color }) => ({
  color: theme.colors[color] || color,
  display: "inline-block"
}));

Label.propTypes = {
  color: PropTypes.string
};

Label.defaultProps = {
  color: theme.colors.black
};

const BaseFieldLabel = ({ labelText, requirementText, helpText, children, ...props }) => (
  <Label style={{ display: "block" }} {...props}>
    <Box mb={children && "x1"}>
      <span style={labelTextStyles}>{labelText}</span>
      {requirementText && <RequirementText>{requirementText}</RequirementText>}
      {helpText && <HelpText>{helpText}</HelpText>}
    </Box>
    {children}
  </Label>
);

export const FieldLabelProps = {
  labelText: PropTypes.string.isRequired,
  children: PropTypes.node,
  requirementText: PropTypes.string,
  helpText: PropTypes.node,
  id: PropTypes.string,
  ...space.PropTypes
};

export const FieldLabelDefaultProps = {
  children: null,
  requirementText: null,
  helpText: null,
  id: undefined
};

BaseFieldLabel.propTypes = FieldLabelProps;

BaseFieldLabel.defaultProps = FieldLabelDefaultProps;

const FieldLabel = styled(BaseFieldLabel)({});

export default FieldLabel;
