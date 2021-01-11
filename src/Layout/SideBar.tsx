import React from "react";

import { Box } from "../Box";
import { Flex } from "../Flex";
import { IconicButton } from "../Button";
import { Heading3 } from "../Type";
import { AnimatedBoxProps, AnimatedBox } from "../Box/Box";

type SideBarProps = AnimatedBoxProps & {
  children?: React.ReactNode;
  onClose?: (arg: any) => any;
  title?: string;
  isOpen?: boolean;
  footer?: React.ReactNode;
};

const SideBar = ({
  p = "x3",
  width = "400px",
  children,
  onClose,
  title,
  isOpen,
  footer,
  ...props
}: SideBarProps) => {
  const variants = {
    open: {
      x: 0,
      transition: {
        duration: 0.25,
        when: "beforeChildren",
      },
    },
    closed: {
      x: "100%",
      transition: {
        duration: 0.25,
      },
    },
  };

  const childVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };
  return (
    <AnimatedBox
      p={p}
      bg="white"
      display="flex"
      flexDirection="column"
      height="100%"
      boxShadow="large"
      borderLeftWidth="1px"
      borderLeftStyle="solid"
      borderLeftColor="lightGrey"
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      initial="closed"
      position="fixed"
      top="0"
      right="0"
      width={width}
      zIndex="navBar"
      overflow="scroll"
      style={{ overflowBehaviour: "contain" }}
      {...props}
    >
      <Flex justifyContent="space-between" alignItems="flex-start">
        {title && <Heading3>{title}</Heading3>}
        <IconicButton icon="close" onClick={onClose}></IconicButton>
      </Flex>
      <AnimatedBox variants={childVariants} flexGrow={1}>
        <Box overflowY="auto">{children}</Box>
      </AnimatedBox>
      {footer && (
        <Box position="sticky"
          backgroundColor="white"
          borderTopWidth="1px"
          borderTopStyle="solid"
          borderTopColor="lightGrey"
          alignSelf="flex-end"
          width="100%"
          pt="x2">
          {footer}
        </Box>
      )}
    </AnimatedBox>
  );
};

export default SideBar;
