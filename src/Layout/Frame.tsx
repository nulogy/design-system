import React from "react"

import { Box, Flex } from "../index";

type FrameProps = {
  navBar: React.ReactNode,
  children: React.ReactNode
}


const Frame = ({ navBar, children }: FrameProps) =>
  <Flex flexDirection="column" minHeight="100vh" border="1px solid blue">
    { navBar }
    <Box position="relative" flexGrow={1}>
      {children}
    </Box>
  </Flex>;


export default Frame;