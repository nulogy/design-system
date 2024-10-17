import React, { useContext } from "react";
import { CSSObject, ThemeContext } from "styled-components";
import { HelpText, RequirementText } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import { Fieldset } from "../Form";
import { DefaultNDSThemeType } from "../theme.type";
import Radio from "./Radio";

interface RadioGroupProps {
  className?: string;
  id?: string;
  errorMessage?: string;
  errorList?: string[];
  labelText?: string;
  helpText?: string;
  required?: boolean;
  requirementText?: string;
  children?: any;
  name?: string;
  disabled?: boolean;
  defaultValue?: string;
  checkedValue?: string;
  default?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioGroup({
  className,
  id,
  errorMessage,
  errorList,
  labelText,
  helpText,
  requirementText,
  ...props
}: RadioGroupProps) {
  const otherProps = { ...props, errorMessage, errorList };
  const themeContext = useContext(ThemeContext);

  return (
    <Fieldset className={className} id={id}>
      <legend style={{ marginBottom: themeContext.space.x1 }}>
        <span style={labelTextStyles(themeContext)}>{labelText}</span>
        {requirementText && <RequirementText>{requirementText}</RequirementText>}
      </legend>
      {helpText && <HelpText>{helpText}</HelpText>}
      {getRadioButtons(otherProps)}
      <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
    </Fieldset>
  );
}

const labelTextStyles = (theme: DefaultNDSThemeType): CSSObject => ({
  fontSize: theme.fontSizes.small,
  fontWeight: Number(theme.fontWeights.bold),
  lineHeight: theme.lineHeights.smallTextBase,
});

const getRadioButtons = (props: any) => {
  const radioButtons = React.Children.map(props.children, (radio) => {
    const { value, disabled, required, onChange, ...radioProps } = radio.props;
    return (
      <Radio
        {...radioProps}
        value={value}
        disabled={props.disabled || disabled}
        error={!!(props.errorMessage || props.errorList)}
        required={props.required || required}
        name={props.name}
        defaultChecked={value === props.defaultValue ? true : undefined}
        checked={props.checkedValue && value === props.checkedValue}
        onChange={props.onChange || onChange}
      />
    );
  });

  return radioButtons;
};
