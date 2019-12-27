import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { InputField } from "../Input/InputField";
import { InputFieldPropTypes, InputFieldDefaultProps } from "../Input/InputField.type";

const TimePickerInput = forwardRef(({ onChange, onClick, onInputChange, value, inputProps }, ref) => {
  const handleChange = e => {
    onInputChange(e);
    onChange(e);
  };

  const { placeholder } = inputProps;

  return (
    <InputField
      ref={ref}
      {...inputProps}
      value={value}
      placeholder={placeholder}
      icon="queryBuilder"
      onClick={onClick}
      onChange={handleChange}
    />
  );
});

TimePickerInput.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  inputProps: PropTypes.shape(InputFieldPropTypes)
};

TimePickerInput.defaultProps = {
  onClick: undefined,
  onChange: undefined,
  value: undefined,
  inputProps: InputFieldDefaultProps
};

export default TimePickerInput;
