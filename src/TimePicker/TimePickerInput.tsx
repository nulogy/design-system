// @ts-nocheck
import styled from "styled-components";
import { InputField } from "../Input/InputField";

const TimePickerInput = styled(InputField)(({ dropdownIsOpen }) => ({
  ...(dropdownIsOpen && {
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
  }),
}));

export default TimePickerInput;
