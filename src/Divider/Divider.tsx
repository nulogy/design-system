import React from "react";
import { Box } from "../Box";
import { BoxProps } from "../Box/Box";

type DividerProps = BoxProps;

const Divider = ({ borderColor = "lightGrey", ...props }: DividerProps) => (
  <Box as="hr" borderTop="1px solid" borderColor={borderColor} {...props} />
);

export default Divider;
