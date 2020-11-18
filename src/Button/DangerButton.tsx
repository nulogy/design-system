import styled from "styled-components";
import { darken } from "polished";
import Button, { ButtonProps } from "./Button";
import { ThemeType } from "../theme.type";

type DangerButtonProps = ButtonProps & {
  disabled: boolean;
  theme?: ThemeType;
};
const DangerButton = styled(Button)(
  ({ disabled, theme }: DangerButtonProps) => ({
    color: theme.colors.white,
    borderColor: theme.colors.red,
    backgroundColor: theme.colors.red,
    "&:hover": {
      backgroundColor: disabled ? undefined : darken(0.1, theme.colors.red),
      borderColor: disabled ? undefined : darken(0.1, theme.colors.red),
    },
    "&:focus": {
      outline: "none",
      backgroundColor: theme.colors.red,
      borderColor: theme.colors.blue,
      boxShadow: theme.shadows.focus,
      "&:hover": {
        backgroundColor: darken(0.1, theme.colors.red),
      },
    },
  })
);
export default DangerButton;
