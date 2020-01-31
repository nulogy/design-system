import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { space } from "styled-system";
import propTypes from "@styled-system/prop-types";
import { Field } from "../Form";
import { InputField } from "./InputField";
import { InlineValidation } from "../Validation";
import { InputFieldDefaultProps, InputFieldPropTypes } from "./InputField.type";

const Input = forwardRef(({ errorMessage, errorList, className, ...props }, ref) => (
  <Field className={className} ref={ref}>
    <InputField {...props} error={!!(errorMessage || errorList)} />
    <InlineValidation mt="x1" errorMessage={errorMessage} errorList={errorList} />
  </Field>
));

Input.propTypes = {
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  errorList: PropTypes.arrayOf(PropTypes.string),
  ...InputFieldPropTypes,
  ...propTypes.space
};

Input.defaultProps = {
  className: undefined,
  errorMessage: null,
  errorList: null,
  ...InputFieldDefaultProps
};

export default Input;
