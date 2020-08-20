import React, { forwardRef } from "react";
import { Field } from "../Form";
import { InputField, InputFieldProps } from "./InputField";
import { InlineValidation } from "../Validation";
import { RefObject } from "react";

type InputProps = InputFieldProps & {
  errorMessage?: string;
  helpText?: React.ReactNode;
  errorList?: string[];
  className?: string;
};

const Input: React.SFC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ errorMessage, errorList, className, ...props }, ref) => (
    <Field className={className}>
      <InputField {...props} error={!!(errorMessage || errorList)} ref={ref} />
      <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
    </Field>
  )
);

export default Input;
