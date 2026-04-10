import { styled, useTheme } from "styled-components";
import { Box } from "../Box";
import type { BoxProps } from "../Box/Box";
import numberFromDimension from "../utils/numberFromDimension";
import { SummaryContextProvider } from "./SummaryContext";

type SummaryProps = Omit<BoxProps, "as"> & {
	breakpoint?: number | string;
};

const SummaryWrapper = styled(Box)<{ breakpoint: number }>(
	({ theme, breakpoint }) => ({
		display: "flex",
		background: theme.colors.white,
		gap: theme.space.x2,
		paddingTop: theme.space.x1,
		paddingBottom: theme.space.x1,
		paddingLeft: theme.space.x2,
		paddingRight: theme.space.x2,
		borderRadius: theme.radii.medium,
		width: "fit-content",

		[`@media (max-width: ${breakpoint}px)`]: {
			background: "none",
			flexFlow: "wrap",
			padding: 0,
			paddingTop: theme.space.x2,
			rowGap: 0,
		},
	}),
);

function Summary({ breakpoint, children, ...rest }: SummaryProps) {
	const theme = useTheme();
	breakpoint ||= theme.breakpoints.medium;

	const breakpointPx = numberFromDimension(breakpoint);

	return (
		<SummaryContextProvider breakpoint={breakpointPx}>
			<SummaryWrapper breakpoint={breakpointPx} {...rest}>
				{children}
			</SummaryWrapper>
		</SummaryContextProvider>
	);
}

export default Summary;
