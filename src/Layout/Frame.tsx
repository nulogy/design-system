import React from "react";

import Box from "../Box/Box";
import Flex, { FlexProps } from "../Flex/Flex";
import { NAVBAR_HEIGHT } from "../BrandedNavBar/NavBar";

type FrameProps = FlexProps & {
  navBar: React.ReactNode;
  children: React.ReactNode;
};

const Frame = ({ navBar, children, ...props }: FrameProps) => (
  <Flex flexDirection="column" minHeight="100vh" {...props}>
    <Box position="fixed" width="100%" zIndex={"navBar" as any}>
      {navBar}
    </Box>
    <Box position="relative" top={NAVBAR_HEIGHT} flexGrow={1}>
      {children}
    </Box>
  </Flex>
);

export default Frame;
