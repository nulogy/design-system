import styled from "styled-components";
import { darken } from "polished";
import Button from "./Button";

const PrimaryButton = styled(Button)(({ disabled, theme }) => ({
  color: theme.colors.white,
  borderColor: theme.colors.blue,
  backgroundColor: theme.colors.blue,
  "&:hover": {
    backgroundColor: disabled ? null : darken(0.1, theme.colors.blue),
    borderColor: disabled ? null : darken(0.1, theme.colors.blue)
  },
  "&:focus": {
    outline: "none",
    borderColor: theme.colors.blue,
    boxShadow: theme.shadows.focus,
    backgroundColor: theme.colors.blue,
    "&:hover": {
      backgroundColor: darken(0.1, theme.colors.blue)
    }
  }
}));

export default PrimaryButton;
