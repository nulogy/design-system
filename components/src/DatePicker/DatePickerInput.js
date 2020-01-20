import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { InputField } from "../Input/InputField";
import { InputFieldDefaultProps, InputFieldPropTypes } from "../Input/InputField.type";

const DatePickerInput = forwardRef(
  ({ onChange, onClick, onInputChange, value, inputProps, onUpKeyPress, onDownKeyPress }, ref) => {
    const handleChange = e => {
      onInputChange(e);
      onChange(e);
    };

    const handleKeyDown = event => {
      if (event.keyCode === 38) {
        onUpKeyPress(event);
      } else if (event.keyCode === 40) {
        onDownKeyPress(event);
      }
    };

    return (
      <InputField
        ref={ref}
        {...inputProps}
        value={value}
        placeholder={inputProps.placeholder}
        icon="calendarToday"
        onClick={onClick}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
    );
  }
);

DatePickerInput.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onUpKeyPress: PropTypes.func,
  onDownKeyPress: PropTypes.func,
  value: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  dateFormat: PropTypes.string.isRequired,
  inputProps: PropTypes.shape(InputFieldPropTypes)
};

DatePickerInput.defaultProps = {
  onClick: undefined,
  onChange: undefined,
  onUpKeyPress: undefined,
  onDownKeyPress: undefined,
  value: undefined,
  inputProps: InputFieldDefaultProps
};

export default DatePickerInput;
