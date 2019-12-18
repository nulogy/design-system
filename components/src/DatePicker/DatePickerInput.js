import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { InputField } from "../Input/InputField";
import { InputFieldDefaultProps, InputFieldPropTypes } from "../Input/InputField.type";

const DatePickerInput = forwardRef(({ onChange, onClick, onInputChange, value, inputProps }, ref) => {
  const handleChange = e => {
    onInputChange(e);
    onChange(e);
  };

  return (
    <InputField
      ref={ref}
      {...inputProps}
      value={value}
      placeholder={inputProps.placeholder}
      icon="calendarToday"
      onClick={onClick}
      onChange={handleChange}
    />
  );
});

DatePickerInput.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  dateFormat: PropTypes.string.isRequired,
  inputProps: PropTypes.shape(InputFieldPropTypes)
};

DatePickerInput.defaultProps = {
  onClick: undefined,
  onChange: undefined,
  value: undefined,
  inputProps: InputFieldDefaultProps
};

export default DatePickerInput;
