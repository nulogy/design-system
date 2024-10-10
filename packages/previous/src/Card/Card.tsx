import React from "react";
import { Box } from "../Box";
import { BoxProps } from "../Box/Box";

export default function Card({
  children = [],
  borderRadius = "medium",
  boxShadow = "small",
  bg = "whiteGrey",
  py = "x2",
  px = "x2",
  position = "relative",
  ...props
}: BoxProps) {
  return (
    <Box borderRadius={borderRadius} boxShadow={boxShadow} bg={bg} py={py} px={px} position={position} {...props}>
      {children}
    </Box>
  );
}
