import styled from "styled-components";
import { darken } from "polished";
import Button from "./Button";
import theme from "../theme";

const DangerButton = styled(Button)(({ disabled }) => ({
  color: theme.colors.white,
  borderColor: theme.colors.red,
  backgroundColor: theme.colors.red,
  "&:hover, &:focus": {
    backgroundColor: disabled ? null : darken(0.1, theme.colors.red),
    borderColor: disabled ? null : darken(0.1, theme.colors.red)
  },
  "&:focus": {
    outline: "none",
    borderColor: theme.colors.blue,
    boxShadow: `0 0 3px ${theme.colors.blue}`
  }
}));

export default DangerButton;
