import React from "react";
import { Box } from "../Box";
import { Text } from "../Type";
import { TextProps } from "../Type/Text";

interface SuffixProps extends TextProps {
  suffix?: string;
  suffixWidth?: string;
}

export default function Suffix({ suffix, suffixWidth, ...props }: SuffixProps) {
  return suffix ? (
    <Box width={suffixWidth} pt="x1" pb="x1" pl="x1">
      <Text {...props}>{suffix}</Text>
    </Box>
  ) : null;
}
