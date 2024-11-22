import React from "react";
import Box from "../Box/Box";
import Flex, { FlexProps } from "../Flex/Flex";
import EnvironmentBanner from "../BrandedNavBar/EnvironmentBanner";

type ApplicationFrameProps = FlexProps & {
  navBar?: React.ReactNode;
  environment?: string;
  children?: React.ReactNode;
};

const ApplicationFrame = ({ navBar, children, environment, ...props }: ApplicationFrameProps) => {
  return (
    <Flex flexDirection="column" minHeight="100vh" {...props}>
      <Box position="sticky" top="0" zIndex={"navBar" as any}>
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
