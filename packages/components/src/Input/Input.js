import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { Field } from "../Form";
import { InputField } from "./InputField";
import { InlineValidation } from "../Validation";
import { InputFieldDefaultProps, InputFieldPropTypes } from "./InputField.type";

const Input = forwardRef(({ errorMessage, errorList, className, ...props }, ref) => (
  <Field className={className}>
    <InputField {...props} error={!!(errorMessage || errorList)} ref={ref} />
    <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
  </Field>
));

Input.propTypes = {
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  errorList: PropTypes.arrayOf(PropTypes.string),
  ...InputFieldPropTypes
};

Input.defaultProps = {
  className: undefined,
  errorMessage: null,
  errorList: null,
  ...InputFieldDefaultProps
};

export default Input;
