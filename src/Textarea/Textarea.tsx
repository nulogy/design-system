import React, { forwardRef } from "react";
import propTypes from "@styled-system/prop-types";
import { Field } from "../Form";
import { MaybeFieldLabel } from "../FieldLabel";
import { InlineValidation } from "../Validation";
import { getSubset, omitSubset } from "../utils/subset";
import { useComponentSize } from "../NDSProvider/ComponentSizeContext";
import StyledTextarea from "./StyledTextarea";
import { StyledTextareaProps } from "./StyledTextarea";

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
  isResizeable?: boolean;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
      isResizeable = true,
      size,
      ...props
    },
    ref
  ) => {
    const componentSize = useComponentSize(size);
    const spaceProps = getSubset(props, propTypes.space);
    const restProps = omitSubset(props, propTypes.space);

    return (
      <Field className={className} {...spaceProps}>
        <MaybeFieldLabel labelText={labelText} requirementText={requirementText} helpText={helpText}>
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
            isResizeable={isResizeable}
            size={componentSize}
            {...restProps}
          />
        </MaybeFieldLabel>
        <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
      </Field>
    );
  }
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
