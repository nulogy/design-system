import styled from "styled-components";
import { darken } from "polished";
import Button from "./Button";

const DangerButton = styled(Button)(({ disabled, theme }) => ({
  color: theme.colors.white,
  borderColor: theme.colors.red,
  backgroundColor: theme.colors.red,
  "&:hover": {
    backgroundColor: disabled ? null : darken(0.1, theme.colors.red),
    borderColor: disabled ? null : darken(0.1, theme.colors.red)
  },
  "&:focus": {
    outline: "none",
    backgroundColor: theme.colors.red,
    borderColor: theme.colors.blue,
    boxShadow: theme.shadows.focus,
    "&:hover": {
      backgroundColor: darken(0.1, theme.colors.red)
    }
  }
}));

export default DangerButton;
