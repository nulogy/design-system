import { SpaceProps } from "styled-system";
import { InputFieldProps } from "../../Input/InputField";
import { ReactDatePickerProps } from "react-datepicker";
import { FieldProps } from "../../Form/Field";

type OmittedFieldProps = "onChange" | "onBlur" | "onFocus";

export interface DatePickerProps extends Omit<FieldProps, OmittedFieldProps> {
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
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (date: Date) => void;
  onInputChange?: (value: string) => void;
  selected?: Date;
}
