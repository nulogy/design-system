import React from "react";
import { Box } from "../Box";
import { BoxProps } from "../Box/Box";

export default function Card({
  borderRadius = "medium",
  boxShadow = "small",
  py = "x2",
  px = "x2",
  position = "relative",
  children,
  ...props
}: BoxProps) {
  return (
    <Box
      border="1px solid"
      borderColor="lightGrey"
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      py={py}
      px={px}
      position={position}
      {...props}
    >
      {children}
    </Box>
  );
}
