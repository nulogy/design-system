import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Checkbox,
  HelpText,
  RequirementText,
} from "ComponentsRoot";
import theme from "../theme";

const getCheckboxButtons = props => {
  const checkboxButtons = React.Children.map(props.children, checkbox => {
    const {
      value,
      disabled,
      required,
      ...checkboxProps
    } = checkbox.props;
    return (
      <Checkbox
        { ...checkboxProps }
        value={ value }
        disabled={ props.disabled || disabled }
        required={ props.required || required }
        name={ props.name }
        defaultChecked={ props.defaultValue ? props.defaultValue.includes(value) : undefined }
        checked={ props.checkedValue ? props.checkedValue.includes(value) : undefined }
        onChange={ props.onChange }
      />
    );
  });
  return (checkboxButtons);
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

const BaseCheckboxGroup = ({
  className,
  labelText,
  helpText,
  requirementText,
  ...props
}) => (
  <Fieldset className={ className } hasHelpText={ !!helpText }>
    <legend>
      { labelText }
      { requirementText && (<RequirementText>{requirementText}</RequirementText>) }
    </legend>
    { helpText && (<HelpText>{helpText}</HelpText>) }
    { getCheckboxButtons(props) }
  </Fieldset>
);

BaseCheckboxGroup.propTypes = {
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.shape({
      type: PropTypes.oneOf([Checkbox]),
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf([Checkbox]),
      })
    ),
  ]).isRequired,
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  checkedValue: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  className: PropTypes.string,
  helpText: PropTypes.string,
  requirementText: PropTypes.string,
};

BaseCheckboxGroup.defaultProps = {
  defaultValue: undefined,
  checkedValue: undefined,
  onChange: undefined,
  className: null,
  helpText: null,
  requirementText: null,
};

const CheckboxGroup = styled(BaseCheckboxGroup)({});

export default CheckboxGroup;
