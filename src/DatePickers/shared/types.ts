import React from "react";
import type { FieldProps } from "../../Form/Field";
import { InputFieldProps } from "../../Input/InputField";

export type OmittedFieldProps = "onChange" | "onBlur" | "onFocus";

export interface BaseDatePickerProps extends Omit<FieldProps, OmittedFieldProps> {
  onChange?: (date: Date) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  dateFormat?: string;
  onInputChange?: (value: string) => void;
  inputProps?: InputFieldProps;
  errorMessage?: string;
  errorList?: string[];
  minDate?: Date;
  maxDate?: Date;
  disableFlipping?: boolean;
  selected?: Date | null;
  locale?: string;
}
