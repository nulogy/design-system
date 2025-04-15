import React from "react";
import styled from "styled-components";
import { HelpText, RequirementText } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import { Fieldset } from "../Form";
import { Icon } from "../Icon";
import { Tooltip } from "../Tooltip";
import LabelText from "../FieldLabel/LabelText";
import Checkbox from "./Checkbox";

interface CheckboxGroupProps {
  children?: React.ReactNode;
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
  hint?: string;
}

export default function CheckboxGroup({
  className,
  id,
  errorMessage,
  errorList,
  labelText,
  helpText,
  requirementText,
  hint,
  ...props
}: CheckboxGroupProps) {
  const otherProps = { ...props, errorMessage, errorList };
  return (
    <Fieldset className={className} id={id}>
      <Legend>
        <LabelText>
          <span>{labelText}</span>

          {requirementText && <RequirementText ml="none">{requirementText}</RequirementText>}

          {hint && (
            <Tooltip tooltip={hint}>
              <Icon color="darkGrey" size="x2" icon="info" />
            </Tooltip>
          )}
        </LabelText>
      </Legend>
      {helpText && <HelpText>{helpText}</HelpText>}
      {getCheckboxButtons(otherProps)}
      <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
    </Fieldset>
  );
}

const getCheckboxButtons = (props) => {
  const checkboxButtons = React.Children.map(props.children, (checkbox) => {
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

const Legend = styled.legend(({ theme }) => ({
  marginBottom: theme.space.x1,
}));
