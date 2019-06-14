import styled from "styled-components";
import { darken } from "polished";
import Button from "./Button";
import theme from "../theme";

const PrimaryButton = styled(Button)(({ disabled }) => ({
  color: theme.colors.white,
  borderColor: theme.colors.blue,
  backgroundColor: theme.colors.blue,
  "&:hover, &:focus": {
    backgroundColor: disabled ? null : darken(0.1, theme.colors.blue),
    borderColor: disabled ? null : darken(0.1, theme.colors.blue)
  },
  "&:focus": {
    outline: "none",
    borderColor: theme.colors.blue,
    boxShadow: theme.shadows.focus
  }
}));

export default PrimaryButton;
