import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { InputField } from "../Input/InputField";
import { InputFieldDefaultProps, InputFieldPropTypes } from "../Input/InputField.type";

const DatePickerInput = forwardRef(
  (
    {
      onChange,
      onClick,
      onInputChange,
      value,
      inputProps,
      onUpKeyPress,
      onDownKeyPress,
      onEnterKeyPress,
      onSpaceKeyPress,
      ...props
    },
    ref
  ) => {
    const handleChange = e => {
      onInputChange(e);
      onChange(e);
    };

    const handleKeyDown = event => {
      if (event.keyCode === 38) {
        onUpKeyPress(event);
      } else if (event.keyCode === 40) {
        onDownKeyPress(event);
      } else if (event.keyCode === 13) {
        onEnterKeyPress(event);
      } else if (event.keyCode === 32) {
        onSpaceKeyPress(event);
      }
    };
    const { t } = useTranslation();

    return (
      <InputField
        ref={ref}
        aria-label={t("select a date")}
        {...inputProps}
        value={value}
        placeholder={inputProps.placeholder}
        icon="calendarToday"
        onClick={onClick}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

DatePickerInput.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onUpKeyPress: PropTypes.func,
  onDownKeyPress: PropTypes.func,
  onEnterKeyPress: PropTypes.func,
  onSpaceKeyPress: PropTypes.func,
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
  onEnterKeyPress: undefined,
  onSpaceKeyPress: undefined,
  value: undefined,
  inputProps: InputFieldDefaultProps
};

export default DatePickerInput;
