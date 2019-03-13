import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Radio } from "ComponentsRoot";
import theme from "../theme";
import HelpText from "../Field/HelpText";
import RequirementText from "../Field/RequirementText";


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
        disabled={ props.disabled || disabled }
        name={ props.name }
        value={ value }
        defaultChecked={ value === props.defaultValue ? true : undefined }
        checked={ props.checkedValue && (value === props.checkedValue) }
        onChange={ props.onChange }
        required={ props.required}
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
  </Fieldset>
);

BaseRadioGroup.propTypes = {
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
  defaultValue: undefined,
  checkedValue: undefined,
  onChange: undefined,
  className: null,
  helpText: null,
  requirementText: null,
};

const RadioGroup = styled(BaseRadioGroup)({});

export default RadioGroup;
