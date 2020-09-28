import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled, { CSSObject, ThemeContext } from "styled-components";

import Radio from "./Radio";
import { HelpText, RequirementText } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import { Fieldset } from "../Form";
import { ThemeType } from "../theme.type";

const labelTextStyles = (theme: ThemeType): CSSObject => ({
  fontSize: theme.fontSizes.small,
  fontWeight: Number(theme.fontWeights.bold),
  lineHeight: theme.lineHeights.smallTextBase
});

const getRadioButtons = (props: any) => {
  const radioButtons = React.Children.map(props.children, radio => {
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

type BaseRadioGroupProps = {
  className?: string;
  id?: string;
  errorMessage?: string;
  errorList?: string[];
  labelText?: string;
  helpText?: string;
  requirementText?: string;
};

const BaseRadioGroup = ({
  className,
  id,
  errorMessage,
  errorList,
  labelText,
  helpText,
  requirementText,
  ...props
}: BaseRadioGroupProps) => {
  const otherProps = { ...props, errorMessage, errorList };
  const themeContext = useContext(ThemeContext);

  return (
    <Fieldset className={className} id={id} hasHelpText={!!helpText}>
      <legend style={{ marginBottom: themeContext.space.x1 }}>
        <span style={labelTextStyles(themeContext)}>{labelText}</span>
        {requirementText && <RequirementText>{requirementText}</RequirementText>}
      </legend>
      {helpText && <HelpText>{helpText}</HelpText>}
      {getRadioButtons(otherProps)}
      <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
    </Fieldset>
  );
};

BaseRadioGroup.propTypes = {
  errorMessage: PropTypes.string,
  errorList: PropTypes.arrayOf(PropTypes.string),
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.shape({
      type: PropTypes.oneOf([Radio])
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf([Radio])
      })
    )
  ]).isRequired,
  defaultValue: PropTypes.string,
  checkedValue: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.string,
  helpText: PropTypes.node,
  requirementText: PropTypes.string
};

BaseRadioGroup.defaultProps = {
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

const RadioGroup = styled(BaseRadioGroup)({});

export default RadioGroup;
