import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import PropTypes from "prop-types";
import theme from "../theme";
import RequirementText from "./RequirementText";
import HelpText from "./HelpText";
import FormatText from "./FormatText";

const Label = styled.label`
  font-size: ${theme.fontSizes[1]};
  display: inline-block;
  ${space}
`;

const FieldWrapper = styled.div`
  ${space}
  > * {
    margin-bottom: ${theme.space[2]};
  }
  > *:last-child {
  margin-bottom: 0;
  }
`;

FieldWrapper.propTypes = {
  ...space.propTypes,
};

const BaseField = ({
  labelText,
  requirementText,
  helpText,
  htmlFor,
  formatText,
  children,
  m, mt, mr, mb, ml, mx, my,
  ...fieldProps
}) => (
  <FieldWrapper
    { ...fieldProps }
    m={ m } mt={ mt } mr={ mr }
    mb={ mb } ml={ ml } mx={ mx }
    my={ my }
  >
    <Label style={ { display: "block" } } mb={ 2 } htmlFor={htmlFor}>
      {labelText}
      {requirementText && (<RequirementText>{requirementText}</RequirementText>)}
      {helpText && (<HelpText>{helpText}</HelpText>)}
      {formatText && (<FormatText>{formatText}</FormatText>)}
    </Label>
    {children}
  </FieldWrapper>
);

BaseField.propTypes = {
  labelText: PropTypes.string.isRequired,
  requirementText: PropTypes.string,
  helpText: PropTypes.string,
  htmlFor: PropTypes.string,
  formatText: PropTypes.string,
  children: PropTypes.node,
  ...space.PropTypes,
};

BaseField.defaultProps = {
  children: [],
  requirementText: null,
  helpText: null,
  formatText: null,
};

const Field = styled(BaseField)`
`;

export default Field;
