import styled, { CSSObject } from "styled-components";
import { darken } from "polished";
import Button, { ButtonProps } from "./Button";

const PrimaryButton: React.FC<any> = styled(Button)(
  ({ disabled, theme }: ButtonProps): CSSObject => ({
    color: theme.colors.white,
    borderColor: theme.colors.blue,
    backgroundColor: theme.colors.blue,
    "&:hover": {
      backgroundColor: disabled ? undefined : darken(0.1, theme.colors.blue),
      borderColor: disabled ? undefined : darken(0.1, theme.colors.blue),
    },
    "&:focus": {
      outline: "none",
      borderColor: theme.colors.blue,
      boxShadow: theme.shadows.focus,
      backgroundColor: theme.colors.blue,
      "&:hover": {
        backgroundColor: darken(0.1, theme.colors.blue),
      },
    },
  })
);
export default PrimaryButton;
