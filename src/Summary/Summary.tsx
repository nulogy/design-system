import React from "react";
import styled from "styled-components";
import numberFromDimension from "../utils/numberFromDimension";
import { Box } from "../Box";
import theme from "../theme";
import { BoxProps } from "../Box/Box";
import { SummaryContextProvider } from "./SummaryContext";

type SummaryProps = Omit<BoxProps, "as"> & {
  breakpoint?: number | string;
};

const SummaryWrapper = styled(Box)<{ breakpoint: number }>(({ theme, breakpoint }) => ({
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
}));

const DEFAULT_BREAKPOINT = theme.breakpoints.medium;

const Summary: React.FC<SummaryProps> = ({ breakpoint = DEFAULT_BREAKPOINT, children, ...rest }) => {
  const breakpointPx = numberFromDimension(breakpoint);

  return (
    <SummaryContextProvider breakpoint={breakpointPx}>
      <SummaryWrapper breakpoint={breakpointPx} {...rest}>
        {children}
      </SummaryWrapper>
    </SummaryContextProvider>
  );
};

export default Summary;
