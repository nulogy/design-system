import styled from "styled-components";
import Button, { ButtonProps } from "./Button";
const QuietButton = styled(Button)(({ theme }: ButtonProps) => ({
  color: theme.colors.blue,
  borderColor: "transparent",
  backgroundColor: "transparent",
}));
export default QuietButton;
