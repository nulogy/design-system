import React, { forwardRef } from "react";
import propTypes from "@styled-system/prop-types";
import { getSubset, omitSubset } from "../utils/subset";
import { Field } from "../Form";
import { InputField, InputFieldProps } from "./InputField";
import { InlineValidation } from "../Validation";

type InputProps = InputFieldProps & {
  errorMessage?: string;
  helpText?: React.ReactNode;
  errorList?: string[];
  className?: string;
};

const Input: React.SFC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ errorMessage, errorList, className, ...props }, ref) => {
    const spaceProps = getSubset(props, propTypes.space);
    const restProps = omitSubset(props, propTypes.space);
    return <Field className={className} {...spaceProps}>
      <InputField {...restProps} error={!!(errorMessage || errorList)} ref={ref} />
      <InlineValidation
        mt="x1"
        errorMessage={errorMessage}
        errorList={errorList}
      />
    </Field>
  }
);

export default Input;
