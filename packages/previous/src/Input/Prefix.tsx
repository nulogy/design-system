import React from "react";
import { Box } from "../Box";
import { Text } from "../Type";
import { TextProps } from "../Type/Text";

type PrefixProps = TextProps & {
  prefix?: string;
  prefixWidth?: string;
};

const Prefix = ({ prefix, prefixWidth, ...props }: PrefixProps) =>
  prefix ? (
    <Box width={prefixWidth} pt="x1" pr="x1" pb="x1">
      <Text {...props}>{prefix}</Text>
    </Box>
  ) : null;

export default Prefix;
