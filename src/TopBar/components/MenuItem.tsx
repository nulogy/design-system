import React from "react";
import { StyledMenuItem } from "../TopBar.styled";

const fadeInVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(8px)",
    y: -16,
    scale: 0.95,
    transition: {
      ease: "easeOut",
      duration: 0.25,
    },
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.75,
    },
  },
};

export function MenuItem({ children }: React.PropsWithChildren<{}>) {
  return (
    <StyledMenuItem
      data-testid="topbar-menu-item"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeInVariants}
    >
      {children}
    </StyledMenuItem>
  );
}
