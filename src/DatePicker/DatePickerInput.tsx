import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { InputField } from "../Input/InputField";
import { InputFieldDefaultProps } from "../Input/InputField.type";
type DatePickerInputProps = {
  onClick?: (...args: any[]) => any;
  onChange?: (...args: any[]) => any;
  onUpKeyPress?: (...args: any[]) => any;
  onDownKeyPress?: (...args: any[]) => any;
  onEnterKeyPress?: (...args: any[]) => any;
  onSpaceKeyPress?: (...args: any[]) => any;
  value?: string;
  onInputChange: (...args: any[]) => any;
  dateFormat?: string;
  inputProps?: any;
  "aria-label"?: string;
};
const DatePickerInput: React.SFC<DatePickerInputProps> = forwardRef(
  (
    {
      onChange,
      onClick,
      onInputChange,
      value,
      inputProps = InputFieldDefaultProps,
      onUpKeyPress,
      onDownKeyPress,
      onEnterKeyPress,
      "aria-label": ariaLabel,
    },
    ref
  ) => {
    const handleChange = (e) => {
      onInputChange(e);
      if (onChange) {
        onChange(e);
      }
    };
    const handleKeyDown = (event) => {
      if (event.keyCode === 38) {
        if (onUpKeyPress) onUpKeyPress(event);
      } else if (event.keyCode === 40) {
        if (onDownKeyPress) onDownKeyPress(event);
      } else if (event.keyCode === 13) {
        if (onEnterKeyPress) onEnterKeyPress(event);
      }
    };
    const { t } = useTranslation();
    return (
      <InputField
        ref={ref}
        aria-label={ariaLabel || t("select a date")}
        autoComplete="off"
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
export default DatePickerInput;
