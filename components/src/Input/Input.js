import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { transparentize } from "polished";
import { space } from "styled-system";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
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
  {
    display: "block",
    width: "100%",
    border: "1px solid",
    borderRadius: theme.radii.medium,
    padding: subPx(theme.space.x1),
    fontSize: theme.fontSizes.medium,
    fontFamily: theme.fonts.base,
    lineHeight: theme.lineHeights.base,
    margin: theme.space.none,
    minHeight: theme.space.x5,
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
  space,
  props => (getInputStyle(props))
);

const Input = ({
  error,
  required,
  labelText,
  requirementText,
  helpText,
  ...props
}) => (
  <Field>
    <MaybeFieldLabel labelText={ labelText } requirementText={ requirementText } helpText={ helpText }>
      <StyledInput aria-invalid={ !!error } aria-required={ required } error={ error } { ...props } />
    </MaybeFieldLabel>
    {error && <InlineValidation mt="x1" message={ error } />}
  </Field>
);

Input.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  required: PropTypes.bool,
  labelText: PropTypes.string,
  helpText: PropTypes.string,
  requirementText: PropTypes.string,
  ...space.PropTypes,
};

Input.defaultProps = {
  disabled: false,
  error: null,
  required: false,
  labelText: null,
  helpText: null,
  requirementText: null,
};

export default Input;
