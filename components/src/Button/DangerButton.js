import styled from "styled-components";
import { darken } from "polished";
import theme from "../theme";
import { Button } from "../index";

const DangerButton = styled(Button)(({ disabled }) => ({
  color: theme.colors.white,
  borderColor: theme.colors.red,
  backgroundColor: theme.colors.red,
  "&:hover, &:focus": {
    outline: "none",
    backgroundColor: disabled ? null : darken(0.1, theme.colors.red),
    borderColor: disabled ? null : darken(0.1, theme.colors.red),
  },
}));

export default DangerButton;
