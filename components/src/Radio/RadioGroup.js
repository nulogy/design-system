import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Radio,
  HelpText,
  InlineValidation,
  RequirementText,
} from "ComponentsRoot";
import theme from "../theme";

const getRadioButtons = props => {
  const radioButtons = React.Children.map(props.children, radio => {
    const {
      value,
      disabled,
      required,
      ...radioProps
    } = radio.props;
    return (
      <Radio
        { ...radioProps }
        value={ value }
        disabled={ props.disabled || disabled }
        required={ props.required || required }
        name={ props.name }
        defaultChecked={ value === props.defaultValue ? true : undefined }
        checked={ props.checkedValue && (value === props.checkedValue) }
        onChange={ props.onChange }
      />
    );
  });
  return (radioButtons);
};

const internalSpacingStyles = hasHelpText => {
  if (hasHelpText) {
    return ({
      "p": {
        marginBottom: theme.space.x1,
      },
    });
  } else {
    return ({
      "legend": {
        marginBottom: theme.space.x1,
      },
    });
  }
};

const Fieldset = styled.fieldset({
  padding: 0,
  border: 0,
  margin: 0,
  "legend": {
    padding: 0,
  },
},
({ hasHelpText }) => (
  internalSpacingStyles(hasHelpText)
),);

const BaseRadioGroup = ({
  className,
  error,
  labelText,
  helpText,
  requirementText,
  ...props
}) => (
  <Fieldset role="radiogroup" className={ className } hasHelpText={ !!helpText }>
    <legend>
      { labelText }
      { requirementText && (<RequirementText>{requirementText}</RequirementText>) }
    </legend>
    { helpText && (<HelpText>{helpText}</HelpText>) }
    { getRadioButtons(props) }
    {error && <InlineValidation mt="x1" message={ error } />}
  </Fieldset>
);

BaseRadioGroup.propTypes = {
  error: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.shape({
      type: PropTypes.oneOf([Radio]),
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf([Radio]),
      })
    ),
  ]).isRequired,
  defaultValue: PropTypes.string,
  checkedValue: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  helpText: PropTypes.string,
  requirementText: PropTypes.string,
};

BaseRadioGroup.defaultProps = {
  error: null,
  defaultValue: undefined,
  checkedValue: undefined,
  onChange: undefined,
  className: null,
  helpText: null,
  requirementText: null,
};

const RadioGroup = styled(BaseRadioGroup)({});

export default RadioGroup;
