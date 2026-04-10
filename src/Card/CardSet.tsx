import { styled } from "styled-components";
import { Flex } from "../Flex";
import { addStyledProps } from "../StyledProps";

const CardSet = styled(Flex)(
	({ theme }) => ({
		flexDirection: "column",
		gap: theme.space.x1,
	}),
	addStyledProps,
);

export default CardSet;
