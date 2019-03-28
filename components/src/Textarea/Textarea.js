import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { transparentize } from "polished";
import { space } from "styled-system";
import { Field, FieldLabel, InlineValidation } from "ComponentsRoot";
import theme from "../theme";
import { subPx, withGeneratedId } from "../Utils";

const textareaStyles = {
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

const getTextareaStyle = props => {
  if (props.disabled) { return textareaStyles.disabled; }
  if (props.error) { return textareaStyles.error; }
  return textareaStyles.default;
};

const StyledTextarea = styled.textarea(
  space,
  {
    display: "block",
    width: "100%",
    border: "1px solid",
    borderRadius: theme.radii.medium,
    padding: subPx(theme.space.x1),
    fontSize: theme.fontSizes.medium,
    fontFamily: theme.fonts.base,
    lineHeight: theme.lineHeights.base,
    minHeight: "40px",
    minWidth: "20em",
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
  props => getTextareaStyle(props)
);

const Textarea = ({
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
    <StyledTextarea aria-invalid={ !!error } aria-required={ required } id={ id } error={ error } { ...props } />
    {error && <InlineValidation mt="x1" message={ error } />}
  </Field>
);

Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  required: PropTypes.bool,
  labelText: PropTypes.string,
  helpText: PropTypes.string,
  requirementText: PropTypes.string,
  rows: PropTypes.number,
  ...space.PropTypes,
};

Textarea.defaultProps = {
  disabled: false,
  error: null,
  required: false,
  labelText: null,
  helpText: null,
  requirementText: null,
  rows: 3,
};

export default withGeneratedId(Textarea);
