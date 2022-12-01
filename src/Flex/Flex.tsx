import React, { CSSProperties } from "react";
import styled from "styled-components";
import { flexbox, system } from "styled-system";
import { Box } from "../Box";
import { BoxProps } from "../Box/Box";

export type FlexProps = BoxProps & {
  gap?: CSSProperties["gap"];
  rowGap?: CSSProperties["rowGap"];
  columnGap?: CSSProperties["columnGap"];
};

const Flex: React.FC<FlexProps> = styled(Box)(
  {
    display: "flex",
  },
  system({
    gap: {
      property: "gap",
      scale: "space",
    },
    rowGap: {
      property: "rowGap",
      scale: "space",
    },
    columnGap: {
      property: "columnGap",
      scale: "space",
    },
  }),
  flexbox
);

export default Flex;
