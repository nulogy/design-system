import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Checkbox from "./Checkbox";
import { HelpText, RequirementText } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import { Fieldset, Legend, LabelText } from "../Form";

const getCheckboxButtons = props => {
  const checkboxButtons = React.Children.map(props.children, checkbox => {
    const { value, disabled, required, onChange, ...checkboxProps } = checkbox.props;
    return (
      <Checkbox
        {...checkboxProps}
        value={value}
        disabled={props.disabled || disabled}
        error={!!(props.errorMessage || props.errorList)}
        required={props.required || required}
        name={props.name}
        defaultChecked={props.defaultValue ? props.defaultValue.includes(value) : undefined}
        checked={props.checkedValue ? props.checkedValue.includes(value) : undefined}
        onChange={props.onChange || onChange}
      />
    );
  });
  return checkboxButtons;
};

const BaseCheckboxGroup = ({
  className,
  id,
  errorMessage,
  errorList,
  labelText,
  helpText,
  requirementText,
  ...props
}) => {
  const otherProps = { ...props, errorMessage, errorList };
  return (
    <Fieldset className={className} id={id} hasHelpText={!!helpText}>
      <Legend>
        <LabelText>{labelText}</LabelText>
        {requirementText && <RequirementText>{requirementText}</RequirementText>}
      </Legend>
      {helpText && <HelpText>{helpText}</HelpText>}
      {getCheckboxButtons(otherProps)}
      <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
    </Fieldset>
  );
};

BaseCheckboxGroup.propTypes = {
  errorMessage: PropTypes.string,
  errorList: PropTypes.arrayOf(PropTypes.string),
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
  id: PropTypes.string,
  helpText: PropTypes.node,
  requirementText: PropTypes.string
};

BaseCheckboxGroup.defaultProps = {
  errorMessage: null,
  errorList: null,
  defaultValue: undefined,
  checkedValue: undefined,
  onChange: undefined,
  className: undefined,
  id: undefined,
  helpText: null,
  requirementText: null
};

const CheckboxGroup = styled(BaseCheckboxGroup)({});

export default CheckboxGroup;
