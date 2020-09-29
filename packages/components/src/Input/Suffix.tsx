import React from "react";
import { Box } from "../Box";
import { Text } from "../Type";
import { TextProps } from "../Type/Text";

type SuffixProps = TextProps & {
  suffix?: string;
  suffixWidth?: string;
};

const Suffix = ({ suffix, suffixWidth, ...props }: SuffixProps) =>
  suffix ? (
    <Box width={suffixWidth} pt="x1" pb="x1" pl="x1">
      <Text {...props}>{suffix}</Text>
    </Box>
  ) : null;
Suffix.defaultProps = {
  suffix: null,
  children: null,
  suffixWidth: null
};
export default Suffix;
