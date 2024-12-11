import { IconName } from "@nulogy/icons";
import { motion } from "framer-motion";
import React, { ComponentProps } from "react";
import { Flex } from "../../Flex";
import { Icon } from "../../Icon";
import { Text } from "../../Type";
import { TileLink } from "../TopBar.styled";

const MotionText = motion(Text);

interface MenuItemLinkProps extends ComponentProps<typeof TileLink> {
  title: string;
  description?: string;
  icon: IconName;
}

export function MenuItemLink({ description, title, icon, ...props }: MenuItemLinkProps) {
  return (
    <TileLink {...props}>
      <Icon icon={icon} size="x3" />
      <Flex flexDirection="column" justifyContent="center">
        <MotionText fontWeight="medium" fontSize="md" lineHeight="base">
          {title}
        </MotionText>
        <MotionText fontSize="xs">{description}</MotionText>
      </Flex>
    </TileLink>
  );
}
