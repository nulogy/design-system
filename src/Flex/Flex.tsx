import { styled } from "styled-components";
import { Box } from "../Box";
import type { BoxProps } from "../Box/Box";
import type { GapProps } from "../StyledProps";
import { gap } from "../StyledProps";

export interface FlexProps extends BoxProps, GapProps {}

const Flex = styled(Box)<FlexProps>(
	{
		display: "flex",
	},
	gap,
);

const InlineFlex = styled(Box)<FlexProps>(
	{
		display: "inline-flex",
	},
	gap,
);

export default Flex;

export { InlineFlex };
