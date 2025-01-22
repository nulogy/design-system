import React from "react";
import type { FieldProps } from "../../Form/Field";
import { InputFieldProps } from "../../Input/InputField";
import type { ReactDatePickerProps } from "react-datepicker";
import { SpaceProps } from "styled-system";

export type OmittedFieldProps = "onChange" | "onBlur" | "onFocus";

export interface BaseDatePickerProps extends SpaceProps {
  className?: string;
  dateFormat?: string;
  disableFlipping?: boolean;
  errorList?: string[];
  errorMessage?: string;
  inputProps?: InputFieldProps;
  locale?: string;
  maxDate?: Date;
  minDate?: Date;
  onBlur?: () => void;
  onChange?: (date: Date) => void;
  onFocus?: () => void;
  onInputChange?: (value: string) => void;
  onRefChange?: (node: any) => void;
  selected?: Date;
}
