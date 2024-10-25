import styled from "styled-components";
import { addStyledProps } from "../StyledProps";
import { Flex } from "../Flex";

const CardSet = styled(Flex)(
  ({ theme }) => ({
    flexDirection: "column",
    gap: theme.space.x1,
  }),
  addStyledProps
);

export default CardSet;
