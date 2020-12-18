import React from "react";

import { Box, Flex } from "../index";
import { FlexProps } from "../Flex/Flex";

type FrameProps = FlexProps & {
  navBar: React.ReactNode;
  children: React.ReactNode;
};

const Frame = ({ navBar, children, ...props }: FrameProps) => (
  <Flex flexDirection="column" minHeight="100vh" border="1px solid blue" {...props}>
    {navBar}
    <Box position="relative" flexGrow={1}>
      {children}
    </Box>
  </Flex>
);

export default Frame;
