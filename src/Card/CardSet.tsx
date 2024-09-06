import styled from "styled-components";
import { space } from "styled-system";
import { Flex } from "../Flex";

const CardSet = styled(Flex)(
  ({ theme }) => ({
    flexDirection: "column",
    gap: theme.space.x1,
  }),
  space
);

export default CardSet;
