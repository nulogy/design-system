import styled from "styled-components";
import { darken } from "polished";
import Button from "./Button";
import theme from "../theme";

const PrimaryButton = styled(Button)`
    color: ${theme.colors.white};
    border-color: ${theme.colors.blue};
    background-color: ${theme.colors.blue};

  &:hover {
    background-color: ${props => (props.disabled ? null : darken(0.1, theme.colors.blue))};
    border-color: ${props => (props.disabled ? null : darken(0.1, theme.colors.blue))};
  }
`;

PrimaryButton.defaultProps = {
  theme,
};

export default PrimaryButton;
