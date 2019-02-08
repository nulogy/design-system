import styled from "styled-components";
import { darken } from "polished";
import Button from "./Button";
import theme from "../theme";

const DangerButton = styled(Button)`
  color: ${theme.colors.white};
  border-color: ${theme.colors.red};
  background-color: ${theme.colors.red};

  &:hover, &:focus {
    outline: none;
    background-color: ${props => (props.disabled ? null : darken(0.1, theme.colors.red))};
    border-color: ${props => (props.disabled ? null : darken(0.1, theme.colors.red))};
  }
`;

DangerButton.defaultProps = {
  theme,
};

export default DangerButton;
