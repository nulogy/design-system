import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { Input } from "..";

const DatePickerInput = forwardRef(({ onChange, onInputChange, ...props }, ref) => {
  const handleChange = e => {
    onInputChange(e);
    onChange(e);
  };

  return <Input ref={ref} {...props} icon="calendarToday" onChange={handleChange} />;
});

DatePickerInput.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  onInputChange: PropTypes.func.isRequired
};

DatePickerInput.defaultProps = {
  onClick: undefined,
  onChange: undefined,
  value: undefined
};

export default DatePickerInput;
