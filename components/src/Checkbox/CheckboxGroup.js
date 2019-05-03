import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box } from "../Box";
import Checkbox from "./Checkbox";
import { HelpText, RequirementText } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import { Fieldset } from "../Form";

const getCheckboxButtons = props => {
  const checkboxButtons = React.Children.map(props.children, checkbox => {
    const { value, disabled, required, ...checkboxProps } = checkbox.props;
    return (
      <Checkbox
        {...checkboxProps}
        value={value}
        disabled={props.disabled || disabled}
        required={props.required || required}
        name={props.name}
        defaultChecked={props.defaultValue ? props.defaultValue.includes(value) : undefined}
        checked={props.checkedValue ? props.checkedValue.includes(value) : undefined}
        onChange={props.onChange}
      />
    );
  });
  return checkboxButtons;
};

const BaseCheckboxGroup = ({ className, error, labelText, helpText, requirementText, ...props }) => (
  <Fieldset role="group" className={className} hasHelpText={!!helpText}>
    <Box mb="x1">
      <legend>
        {labelText}
        {requirementText && <RequirementText>{requirementText}</RequirementText>}
      </legend>
      {helpText && <HelpText>{helpText}</HelpText>}
    </Box>
    {getCheckboxButtons(props)}
    {error && <InlineValidation mt="x1" message={error} />}
  </Fieldset>
);

BaseCheckboxGroup.propTypes = {
  error: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.shape({
      type: PropTypes.oneOf([Checkbox])
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf([Checkbox])
      })
    )
  ]).isRequired,
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  checkedValue: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  className: PropTypes.string,
  helpText: PropTypes.string,
  requirementText: PropTypes.string
};

BaseCheckboxGroup.defaultProps = {
  error: null,
  defaultValue: undefined,
  checkedValue: undefined,
  onChange: undefined,
  className: null,
  helpText: null,
  requirementText: null
};

const CheckboxGroup = styled(BaseCheckboxGroup)({});

export default CheckboxGroup;
