import React from "react";
import styled, { useTheme } from "styled-components";
import numberFromDimension from "../utils/numberFromDimension";
import { Box } from "../Box";
import { BoxProps } from "../Box/Box";
import { SummaryContextProvider } from "./SummaryContext";
import { DefaultNDSThemeType } from "../theme";

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

const Summary: React.FC<React.PropsWithChildren<SummaryProps>> = ({ breakpoint, children, ...rest }) => {
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
};

export default Summary;
