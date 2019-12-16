import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { Input } from "../Input";

const TimePickerInput = forwardRef(({ onChange, onClick, onInputChange, value, inputProps }, ref) => {
  const handleChange = e => {
    onInputChange(e);
    onChange(e);
  };

  return (
    <Input
      ref={ref}
      {...inputProps}
      value={value}
      placeholder={inputProps.placeholder}
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
  inputProps: PropTypes.shape({})
};

TimePickerInput.defaultProps = {
  onClick: undefined,
  onChange: undefined,
  value: undefined,
  inputProps: undefined
};

export default TimePickerInput;
