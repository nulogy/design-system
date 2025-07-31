import React, { ReactNode } from "react";
import { ZIndexProps } from "styled-system";
import Box from "../Box/Box";
import Flex, { FlexProps } from "../Flex/Flex";
import EnvironmentBanner from "../Navigation/components/EnvironmentBanner/EnvironmentBanner";

interface ApplicationFrameProps extends FlexProps {
  navBar?: ReactNode;
  environment?: string;
  children?: ReactNode;
}

const ApplicationFrame = ({ navBar, children, environment, ...props }: ApplicationFrameProps) => {
  return (
    <Flex flexDirection="column" minHeight="100vh" {...props}>
      <Box position="sticky" top="0" zIndex={"navBar" as ZIndexProps["zIndex"]}>
        {environment && <EnvironmentBanner>{environment}</EnvironmentBanner>}
        {navBar}
      </Box>
      <Flex flexDirection="column" position="relative" flexGrow={1}>
        {children}
      </Flex>
    </Flex>
  );
};

export default ApplicationFrame;
