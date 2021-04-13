import React from "react";
import { Box } from "../Box";
import { BoxProps } from "../Box/Box";

type DividerProps = BoxProps & {
  children?: React.ReactNode;
};

const Divider = (props: DividerProps) => (
  <Box as="hr" borderTop="1px solid" borderColor="lightGrey" {...props}></Box>
);

export default Divider;
