import { darken } from "polished";
import { type CSSObject, styled } from "styled-components";
import Button, { type ButtonProps } from "./Button";

const PrimaryButton = styled(Button)(
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
	}),
);
export default PrimaryButton;
