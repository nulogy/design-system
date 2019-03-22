import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { transparentize } from "polished";
import { space } from "styled-system";
import { Field, FieldLabel, InlineValidation } from "ComponentsRoot";
import theme from "../theme";
import { subPx } from "../Utils";

const inputStyles = {
  disabled: {
    color: transparentize(0.6667, theme.colors.black),
    borderColor: theme.colors.lightGrey,
    backgroundColor: theme.colors.whiteGrey,
  },
  error: {
    color: theme.colors.red,
    borderColor: theme.colors.red,
  },
  default: {
    color: theme.colors.black,
    borderColor: theme.colors.grey,
  },
};

const getInputStyle = props => {
  if (props.disabled) { return inputStyles.disabled; }
  if (props.error) { return inputStyles.error; }

  return inputStyles.default;
};

const StyledInput = styled.input(
  space,
  {
    width: "100%",
    border: "1px solid",
    borderRadius: theme.radii.medium,
    padding: subPx(theme.space.x1),
    fontSize: theme.fontSizes.medium,
    fontFamily: theme.fonts.base,
    lineHeight: theme.lineHeights.base,
    "&:focus": {
      outline: "none",
      color: theme.colors.black,
      borderColor: theme.colors.blue,
      boxShadow: `0 0 3px ${theme.colors.blue}`,
    },
    "::placeholder": {
      color: transparentize(0.4, theme.colors.black),
    },
  },
  props => (getInputStyle(props))
);

StyledInput.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  required: PropTypes.bool,
  ...space.PropTypes,
};

StyledInput.defaultProps = {
  disabled: false,
  error: null,
  required: false,
};

const Input = ({
  error,
  required,
  labelText,
  requirementText,
  helpText,
  id,
  ...props
}) => (
  <Field>
    {labelText && <FieldLabel htmlFor={ id } labelText={ labelText } requirementText={ requirementText } helpText={ helpText } mb="x1" />}
    <StyledInput aria-invalid={!!error} aria-required={required} id={ id } error={ error } { ...props } />
    {error && <InlineValidation mt="x1" message={ error } />}
  </Field>
);

Input.propTypes = {
  error: PropTypes.string,
  helpText: PropTypes.string,
  labelText: PropTypes.string,
  id: PropTypes.string.isRequired,
  requirementText: PropTypes.string,
};

Input.defaultProps = {
  error: null,
  helpText: null,
  labelText: null,
  requirementText: null,
};

export default Input;
