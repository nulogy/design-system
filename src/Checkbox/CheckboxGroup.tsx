import React from "react";
import styled from "styled-components";
import { HelpText, RequirementText } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import { Fieldset } from "../Form";
import Checkbox from "./Checkbox";

interface CheckboxGroupProps {
  errorMessage?: string;
  errorList?: string[];
  labelText: string;
  name: string;
  defaultValue?: string[];
  checkedValue?: string[];
  onChange?: (...args: any[]) => any;
  className?: string;
  id?: string;
  helpText?: React.ReactNode;
  requirementText?: string;
  required?: boolean;
  disabled?: boolean;
}

const getCheckboxButtons = (props) => {
  const checkboxButtons = React.Children.map(props.children, (checkbox) => {
    const { value, disabled, required, onChange, ...checkboxProps } =
      checkbox.props;
    return (
      <Checkbox
        {...checkboxProps}
        value={value}
        disabled={props.disabled || disabled}
        error={!!(props.errorMessage || props.errorList)}
        required={props.required || required}
        name={props.name}
        defaultChecked={
          props.defaultValue ? props.defaultValue.includes(value) : undefined
        }
        checked={
          props.checkedValue ? props.checkedValue.includes(value) : undefined
        }
        onChange={props.onChange || onChange}
      />
    );
  });
  return checkboxButtons;
};

const LabelText = styled.span<any>(({ theme }) => ({
  fontSize: theme.fontSizes.small,
  fontWeight: theme.fontWeights.bold,
  lineHeight: theme.lineHeights.smallTextBase,
}));

const Legend = styled.legend(({ theme }) => ({
  marginBottom: theme.space.x1,
}));

const CheckboxGroup: React.SFC<CheckboxGroupProps> = ({
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
        {requirementText && (
          <RequirementText>{requirementText}</RequirementText>
        )}
      </Legend>
      {helpText && <HelpText>{helpText}</HelpText>}
      {getCheckboxButtons(otherProps)}
      <InlineValidation
        mt="x1"
        errorMessage={errorMessage}
        errorList={errorList}
      />
    </Fieldset>
  );
};

CheckboxGroup.defaultProps = {
  errorMessage: undefined,
  errorList: undefined,
  defaultValue: undefined,
  checkedValue: undefined,
  onChange: undefined,
  className: undefined,
  id: undefined,
  helpText: undefined,
  requirementText: undefined,
  disabled: false,
};

export default CheckboxGroup;
