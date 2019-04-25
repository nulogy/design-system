import styled from "styled-components";
import { darken } from "polished";
import Button from "./Button";
import theme from "../theme";

const PrimaryButton = styled(Button)(({ disabled }) => ({
  color: theme.colors.white,
  borderColor: theme.colors.blue,
  backgroundColor: theme.colors.blue,
  "&:hover, &:focus": {
    outline: "none",
    backgroundColor: disabled ? null : darken(0.1, theme.colors.blue),
    borderColor: disabled ? null : darken(0.1, theme.colors.blue),
  },
}));

export default PrimaryButton;
