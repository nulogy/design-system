import { type CSSObject, styled } from "styled-components";
import { addStyledProps } from "../StyledProps";
import type { TextProps } from "../Type";
import { Text } from "../Type";

const DropdownText = styled(Text)<TextProps>(
	({ theme }): CSSObject => ({
		color: theme.colors.darkGrey,
		fontWeight: theme.fontWeights.medium,
		display: "block",
		width: "100%",
		border: "none",
		textAlign: "left",
		backgroundColor: "transparent",
		transition: ".2s",
		padding: `${theme.space.x1} ${theme.space.x2}`,
	}),
	addStyledProps,
);

export default DropdownText;
