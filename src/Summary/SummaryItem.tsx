import type React from "react";
import { styled } from "styled-components";
import { Flex } from "../Flex";
import type { FlexProps } from "../Flex/Flex";
import useMediaQuery from "../hooks/useMediaQuery";
import { Text } from "../Type";
import { useSummaryContext } from "./SummaryContext";

type SummaryItemProps = Omit<FlexProps, "as"> & {
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

function SummaryItem({ value, status, ...rest }: SummaryItemProps) {
  const { breakpoint } = useSummaryContext();
  const matches = useMediaQuery(`(max-width: ${breakpoint}px)`);

  delete rest.children;

  return (
    <SummaryItemWrapper breakpoint={breakpoint} {...rest}>
      <Text fontWeight="medium" fontSize={!matches ? "heading4" : undefined}>
        {value}
      </Text>
      {status}
    </SummaryItemWrapper>
  );
}

export default SummaryItem;
