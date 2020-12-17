import React from "react";

import { Box, Flex,  IconicButton } from "../index";
import { Heading3 } from "../Type";
import { BoxProps } from '../Box/Box';

type SideBarProps = BoxProps & {
  children: React.ReactNode,
  onClose: (arg: any) => any,
  title: string,
  isOpen: boolean
}


const SideBar = ({ p = "x3", width = "400px", children, onClose, title, isOpen, ...props }: SideBarProps) => {
  const xPosition = isOpen ? "0px" : `${width}`;
  return <Box
    p={p}
    top="0"
    transform={`translateX(${xPosition})`}
    transition="transform 1s linear"
    right="0"
    height="100%"
    position="absolute"
    width={width}
    borderLeftWidth="1px"
    borderLeftStyle="solid"
    borderLeftColor="lightGrey"
    {...props}>
    <Flex justifyContent="space-between">
      {title && <Heading3>{title}</Heading3>}
      <IconicButton icon="close" onClick={onClose}></IconicButton>
    </Flex>
    <Box>
      {children}
    </Box>
  </Box>
}

export default SideBar;