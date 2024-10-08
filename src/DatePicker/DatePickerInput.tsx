import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { InputField, InputFieldDefaultProps, InputFieldProps } from "../Input/InputField";
import { ComponentSize } from "../NDSProvider/ComponentSizeContext";

interface InputProps extends InputFieldProps {
  placeholder?: string;
}

type DatePickerInputProps = Omit<React.ComponentPropsWithRef<"input">, "size"> & {
  size?: ComponentSize;
  dateFormat?: string;
  inputProps?: InputProps;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onDownKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onEnterKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const DatePickerInput = forwardRef<HTMLInputElement, DatePickerInputProps>(
  (
    {
      disabled,
      onChange,
      onClick,
      onBlur,
      onFocus,
      onInputChange,
      value,
      inputProps = InputFieldDefaultProps,
      onUpKeyPress,
      onDownKeyPress,
      onEnterKeyPress,
      size,
      "aria-label": ariaLabel,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const { placeholder, ...inputFieldProps } = inputProps;
    inputFieldProps.disabled = disabled;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onInputChange(event);
      if (onChange) {
        onChange(event);
      }
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case "ArrowUp":
          if (onUpKeyPress) onUpKeyPress(event);
          break;

        case "ArrowDown":
          if (onDownKeyPress) onDownKeyPress(event);
          break;

        case "Enter":
          if (onEnterKeyPress) onEnterKeyPress(event);
          break;
      }
    };

    return (
      <InputField
        disabled={disabled}
        onBlur={onBlur}
        onFocus={onFocus}
        ref={ref}
        size={size}
        aria-label={ariaLabel || t("select a date")}
        autoComplete="off"
        value={value}
        placeholder={placeholder}
        icon="calendarToday"
        onClick={onClick}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        {...inputFieldProps}
      />
    );
  }
);
export default DatePickerInput;
