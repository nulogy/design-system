import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { transparentize } from "polished";
import { space } from "styled-system";
import propTypes from "@styled-system/prop-types";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import { subPx } from "../utils";

const textareaStyles = theme => ({
  disabled: {
    color: transparentize(0.6667, theme.colors.black),
    borderColor: theme.colors.lightGrey,
    backgroundColor: theme.colors.whiteGrey
  },
  error: {
    color: theme.colors.red,
    borderColor: theme.colors.red
  },
  default: {
    color: theme.colors.black,
    borderColor: theme.colors.grey
  }
});

const getTextareaStyle = props => {
  const textareaStyleMap = textareaStyles(props.theme);
  if (props.disabled) {
    return textareaStyleMap.disabled;
  }
  if (props.error) {
    return textareaStyleMap.error;
  }
  return textareaStyleMap.default;
};

const StyledTextarea = styled.textarea(
  space,
  ({ theme }) => ({
    display: "block",
    width: "100%",
    border: "1px solid",
    borderRadius: theme.radii.medium,
    padding: subPx(theme.space.x1),
    fontSize: theme.fontSizes.medium,
    fontFamily: theme.fonts.base,
    lineHeight: theme.lineHeights.base,
    minHeight: theme.space.x5,
    minWidth: "20em",
    "&:focus": {
      outline: "none",
      color: theme.colors.black,
      borderColor: theme.colors.blue,
      boxShadow: theme.shadows.focus
    },
    "::placeholder": {
      color: transparentize(0.4, theme.colors.black)
    }
  }),
  props => getTextareaStyle(props)
);

const Textarea = ({
  errorMessage,
  errorList,
  error = !!(errorMessage || errorList),
  required,
  labelText,
  requirementText,
  helpText,
  id,
  className,
  rows,
  ...props
}) => (
  <Field className={className}>
    <MaybeFieldLabel labelText={labelText} requirementText={requirementText} helpText={helpText}>
      <StyledTextarea
        aria-invalid={error}
        aria-required={required}
        required={required}
        id={id}
        errorMessage={errorMessage}
        errorList={errorList}
        error={error}
        rows={rows}
        {...props}
      />
    </MaybeFieldLabel>
    <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
  </Field>
);

Textarea.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorList: PropTypes.arrayOf(PropTypes.string),
  required: PropTypes.bool,
  labelText: PropTypes.string,
  helpText: PropTypes.node,
  requirementText: PropTypes.string,
  rows: PropTypes.number,
  ...propTypes.space
};

Textarea.defaultProps = {
  className: undefined,
  id: null,
  disabled: false,
  errorMessage: null,
  errorList: null,
  required: false,
  labelText: null,
  helpText: null,
  requirementText: null,
  rows: 3
};

export default Textarea;
