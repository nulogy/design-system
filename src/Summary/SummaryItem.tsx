import React from "react";
import styled from "styled-components";
import { Flex } from "../Flex";
import { Text } from "../Type";
import useMediaQuery from "../hooks/useMediaQuery";
import { useSummaryContext } from "./SummaryContext";

type SummaryItemProps = {
  value: number | string;
  status: React.ReactNode;
};

const SummaryItemWrapper = styled(Flex)<{ breakpoint: number }>(({ theme, breakpoint }) => ({
  gap: theme.space.half,
  flexDirection: "column",

  [`@media (max-width: ${breakpoint}px)`]: {
    flexDirection: "row",
  },
}));

const SummaryItem: React.FC<SummaryItemProps> = ({ value, status, ...rest }) => {
  const { breakpoint } = useSummaryContext();
  const matches = useMediaQuery(`(max-width: ${breakpoint}px)`);

  delete rest["children"];

  return (
    <SummaryItemWrapper breakpoint={breakpoint} {...rest}>
      <Text fontWeight="medium" fontSize={!matches ? "heading4" : undefined}>
        {value}
      </Text>
      {status}
    </SummaryItemWrapper>
  );
};

export default SummaryItem;
