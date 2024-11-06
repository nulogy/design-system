import React, { forwardRef } from "react";
import propTypes from "@styled-system/prop-types";
import { LayoutProps, SpaceProps } from "styled-system";
import { getSubset, omitSubset } from "../utils/subset";
import { Field } from "../Form";
import { InlineValidation } from "../Validation";
import { InputField, InputFieldProps } from "./InputField";

interface InputProps extends InputFieldProps, SpaceProps, LayoutProps {
  errorMessage?: string;
  errorList?: string[];
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ errorMessage, errorList, className, ...props }, ref) => {
  const spaceProps = getSubset(props, propTypes.space);
  const layoutProps = getSubset(props, propTypes.space);
  const restProps = omitSubset(props, propTypes.space);

  return (
    <Field className={className} {...spaceProps} {...layoutProps}>
      <InputField {...restProps} error={!!(errorMessage || errorList)} ref={ref} />
      <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
    </Field>
  );
});

export default Input;
