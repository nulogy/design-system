import { styled } from "styled-components";
import Button, { type ButtonProps } from "./Button";

const QuietButton = styled(Button)(({ theme }: ButtonProps) => ({
	color: theme.colors.blue,
	borderColor: "transparent",
	backgroundColor: "transparent",
}));
export default QuietButton;
