import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { InputField, InputFieldDefaultProps, InputFieldProps } from "../../../Input/InputField";
import { ComponentVariant } from "../../../NDSProvider/ComponentVariantContext";

interface InputProps extends InputFieldProps {
  placeholder?: string;
}

type DatePickerInputProps = React.ComponentPropsWithRef<"input"> & {
  variant?: ComponentVariant;
  dateFormat?: string;
  inputProps?: InputProps;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onDownKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onEnterKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const DatePickerInput = forwardRef<HTMLInputElement, DatePickerInputProps>(
  (
    {
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
      variant,
      "aria-label": ariaLabel,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const { placeholder, ...inputFieldProps } = inputProps;

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
        onBlur={onBlur}
        onFocus={onFocus}
        ref={ref}
        variant={variant}
        aria-label={ariaLabel || t("select a date")}
        autoComplete="off"
        value={value}
        placeholder={placeholder}
        iconRight="calendarToday"
        iconRightSize="x2"
        onClick={onClick}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        {...inputFieldProps}
      />
    );
  }
);
export default DatePickerInput;
