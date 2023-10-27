import styled, { CSSObject } from "styled-components";
import { darken } from "polished";
import Button, { ButtonProps } from "./Button";

const WarningButton: React.FC<any> = styled(Button)(
  ({ disabled, theme }: ButtonProps): CSSObject => ({
    color: theme.colors.white,
    borderColor: theme.colors.yellow,
    backgroundColor: theme.colors.yellow,
    "&:hover": {
      backgroundColor: disabled ? undefined : darken(0.1, theme.colors.yellow),
      borderColor: disabled ? undefined : darken(0.1, theme.colors.yellow),
    },
    "&:focus": {
      outline: "none",
      borderColor: theme.colors.yellow,
      boxShadow: theme.shadows.focus,
      backgroundColor: theme.colors.yellow,
      "&:hover": {
        backgroundColor: darken(0.1, theme.colors.yellow),
      },
    },
  })
);
export default WarningButton;
