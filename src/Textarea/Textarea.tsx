import React, { forwardRef } from "react";
import styled from "styled-components";
import { transparentize } from "polished";
import { space } from "styled-system";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import { subPx } from "../utils";
import { ThemeType } from "../theme.type";

const textareaStyles = (theme) => ({
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
});
const getTextareaStyle = (props) => {
  const textareaStyleMap = textareaStyles(props.theme);
  if (props.disabled) {
    return textareaStyleMap.disabled;
  }
  if (props.error) {
    return textareaStyleMap.error;
  }
  return textareaStyleMap.default;
};

type StyledTextareaProps = React.ComponentPropsWithRef<"textarea"> & {
  theme?: ThemeType;
  errorMessage?: string;
  errorList?: string[];
  error?: boolean;
  rows?: number;
};
const StyledTextarea: React.SFC<StyledTextareaProps> = styled.textarea(
  space,
  ({ theme }) => ({
    display: "block",
    width: "100%",
    border: "1px solid",
    borderRadius: theme.radii.medium,
    padding: subPx(theme.space.x1),
    fontSize: theme.fontSizes.medium,
    lineHeight: theme.lineHeights.base,
    minHeight: theme.space.x5,
    minWidth: "20em",
    "&:focus": {
      outline: "none",
      color: theme.colors.black,
      borderColor: theme.colors.blue,
      boxShadow: theme.shadows.focus,
    },
    "::placeholder": {
      color: transparentize(0.4, theme.colors.black),
    },
  }),
  (props) => getTextareaStyle(props)
);
type TextareaProps = StyledTextareaProps & {
  className?: string;
  id?: string;
  disabled?: boolean;
  errorMessage?: string;
  error?: boolean;
  errorList?: string[];
  required?: boolean;
  labelText?: string;
  helpText?: React.ReactNode;
  requirementText?: string;
  rows?: number;
};
const Textarea: React.SFC<TextareaProps> = forwardRef(
  (
    {
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
    },
    ref
  ) => (
    <Field className={className}>
      <MaybeFieldLabel
        labelText={labelText}
        requirementText={requirementText}
        helpText={helpText}
      >
        <StyledTextarea
          aria-invalid={error}
          aria-required={required}
          required={required}
          id={id}
          ref={ref}
          errorMessage={errorMessage}
          errorList={errorList}
          error={error}
          rows={rows}
          {...props}
        />
      </MaybeFieldLabel>
      <InlineValidation
        mt="x1"
        errorMessage={errorMessage}
        errorList={errorList}
      />
    </Field>
  )
);
Textarea.defaultProps = {
  className: undefined,
  id: undefined,
  disabled: false,
  errorMessage: undefined,
  errorList: undefined,
  required: false,
  labelText: undefined,
  helpText: undefined,
  requirementText: undefined,
  rows: 3,
};
export default Textarea;
