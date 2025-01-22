import { SpaceProps } from "styled-system";
import { InputFieldProps } from "../../Input/InputField";
import { ReactDatePickerProps } from "react-datepicker";

export type OmittedFieldProps = "onChange" | "onBlur" | "onFocus";

export interface BaseDatePickerProps extends SpaceProps {
  className?: string;
  dateFormat?: string;
  disableFlipping?: boolean;
  errorList?: string[];
  errorMessage?: string;
  highlightDates?: ReactDatePickerProps["highlightDates"];
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
