import { IconName } from "@nulogy/icons";
import { motion } from "framer-motion";
import React, { ComponentProps } from "react";
import { Flex } from "../../Flex";
import { Icon } from "../../Icon";
import { Text } from "../../Type";
import { StyledMenuItem, TileLink } from "../TopBar.styled";

const MotionText = motion(Text);

const fadeInVariants = {
  hidden: {
    opacity: 0,
    y: -15,
    scale: 0.9,
    transition: {
      ease: "easeOut",
      duration: 0.25,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
};

interface MenuItemProps extends ComponentProps<typeof TileLink> {
  title: string;
  description?: string;
  icon: IconName;
}

export function MenuItem({ description, title, icon, ...props }: MenuItemProps) {
  return (
    <StyledMenuItem>
      <TileLink initial="hidden" animate="visible" exit="hidden" variants={fadeInVariants} {...props}>
        <Icon icon={icon} size="x3" />
        <Flex flexDirection="column" justifyContent="center">
          <MotionText fontWeight="medium" fontSize="md" lineHeight="base">
            {title}
          </MotionText>
          <MotionText fontSize="xs">{description}</MotionText>
        </Flex>
      </TileLink>
    </StyledMenuItem>
  );
}

export type MenuItems = MenuItemProps[];
