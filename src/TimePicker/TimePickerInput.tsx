import styled from "styled-components";
import { InputField, InputFieldProps } from "../Input/InputField";

type TimePickerInputProps = InputFieldProps & { dropdownIsOpen: boolean };

const TimePickerInput = styled(InputField)<TimePickerInputProps>(({ dropdownIsOpen }) => ({
  ...(dropdownIsOpen && {
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
  }),
}));

export default TimePickerInput;
