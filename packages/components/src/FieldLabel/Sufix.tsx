import React from "react";
import { Box } from "../Box";
import { Text } from "../Type";

const Sufix: React.SFC<any> = ({ sufix, sufixWidth, children, ...props }) =>
  sufix ? (
    <Box width={sufixWidth} pt="x1" pb="x1" pl="x1">
      <Text {...props}>{sufix}</Text>
    </Box>
  ) : (
    <>{children}</>
  );
Sufix.defaultProps = {
  sufix: null,
  children: null,
  sufixWidth: null
};
export default Sufix;
