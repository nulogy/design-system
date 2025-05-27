import React from "react";
import { ZIndexProps } from "styled-system";
import Box from "../Box/Box";
import Flex, { FlexProps } from "../Flex/Flex";
import EnvironmentBanner from "../Navigation/components/EnvironmentBanner/EnvironmentBanner";

type ApplicationFrameProps = FlexProps & {
  navBar?: React.ReactNode;
  environment?: string;
  children?: React.ReactNode;
};

const ApplicationFrame = ({ navBar, children, environment, ...props }: ApplicationFrameProps) => {
  return (
    <Flex flexDirection="column" minHeight="100vh" {...props}>
      <Box zIndex={"navBar" as ZIndexProps["zIndex"]}>
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
