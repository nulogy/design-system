import React from "react";
import { Box } from "../Box";
import { BoxProps } from "../Box/Box";

const Divider = ({ borderColor = "lightGrey", ...props }: BoxProps) => (
  <Box as="hr" borderTop="1px solid" borderColor={borderColor} {...props} />
);

export default Divider;
