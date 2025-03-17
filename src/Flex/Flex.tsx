import { CSSProperties } from "react";
import styled from "styled-components";
import { system } from "styled-system";
import { Box } from "../Box";
import { BoxProps } from "../Box/Box";

export type FlexProps = BoxProps & {
  gap?: CSSProperties["gap"];
  rowGap?: CSSProperties["rowGap"];
  columnGap?: CSSProperties["columnGap"];
};

const gap = system({
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
});

const Flex = styled(Box)<FlexProps>(
  {
    display: "flex",
  },
  gap
);

const InlineFlex = styled(Box)<FlexProps>(
  {
    display: "inline-flex",
  },
  gap
);

export default Flex;

export { InlineFlex };
