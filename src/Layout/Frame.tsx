import React from "react";

import Box from "../Box/Box";
import Flex, { FlexProps } from "../Flex/Flex";

type FrameProps = FlexProps & {
  navBar: React.ReactNode;
  children: React.ReactNode;
};

const Frame = ({ navBar, children, ...props }: FrameProps) => (
  <Flex flexDirection="column" minHeight="100vh" {...props}>
    {navBar}
    <Box position="relative" flexGrow={1}>
      {children}
    </Box>
  </Flex>
);

export default Frame;
