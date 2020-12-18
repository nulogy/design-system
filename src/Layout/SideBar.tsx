import React from "react";

import { Box, Flex, IconicButton } from "../index";
import { Heading3 } from "../Type";
import { AnimatedBoxProps, AnimatedBox } from "../Box/Box";

type SideBarProps = AnimatedBoxProps & {
  children: React.ReactNode;
  onClose: (arg: any) => any;
  title: string;
  isOpen: boolean;
};

const SideBar = ({
  p = "x3",
  width = "400px",
  children,
  onClose,
  title,
  isOpen,
  ...props
}: SideBarProps) => {
  const variants = {
    open: { x: 0 },
    closed: { x: "100%" },
  };
  return (
    <AnimatedBox
      p={p}
      top="0"
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      transition={{ duration: 0.5 }}
      bg="white"
      right="0"
      height="100%"
      position="absolute"
      width={width}
      borderLeftWidth="1px"
      borderLeftStyle="solid"
      borderLeftColor="lightGrey"
      {...props}
    >
      <Flex justifyContent="space-between">
        {title && <Heading3>{title}</Heading3>}
        <IconicButton icon="close" onClick={onClose}></IconicButton>
      </Flex>
      <Box>{children}</Box>
    </AnimatedBox>
  );
};

export default SideBar;
