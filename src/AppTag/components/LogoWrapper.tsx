import { styled } from "styled-components";
import { appTagColors } from "../constants";
import type { AppTagType } from "../types";

export const LogoWrapper = styled.span<{ $type?: AppTagType }>(
	({ theme, $type }) => {
		const color = theme.colors[appTagColors[$type].primary];

		return {
			background: color,
			display: "inline-block",
			padding: theme.space.half,
			borderRadius: theme.radii.circle,
			lineHeight: 0,
		};
	},
);
