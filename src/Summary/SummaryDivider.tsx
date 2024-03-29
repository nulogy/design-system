import React from "react";
import styled from "styled-components";
import { Box } from "../Box";
import numberFromDimension from "../utils/numberFromDimension";
import { useSummaryContext } from "./SummaryContext";

const Divider = styled(Box)<{ breakpoint: number }>(({ theme, breakpoint }) => ({
  display: "block",
  alignSelf: "stretch",
  width: 1,
  marginRight: theme.space.x1,
  marginLeft: theme.space.x1,
  background: theme.colors.grey,

  [`@media (max-width: ${breakpoint}px)`]: {
    display: "none",
  },
}));

const SummaryDivider = (props) => {
  const { breakpoint } = useSummaryContext();

  return <Divider breakpoint={numberFromDimension(breakpoint)} {...props} />;
};

export default SummaryDivider;
